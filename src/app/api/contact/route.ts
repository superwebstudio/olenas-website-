import { Resend } from 'resend';
import { NextResponse } from 'next/server';

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  treatment?: string;
  message?: string;
  preferred?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function formatMultiline(value: string) {
  return escapeHtml(value).replaceAll('\n', '<br>');
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_EMAIL ?? 'tech@superweb.studio';
  const from =
    process.env.RESEND_FROM_EMAIL ?? 'Shevchenko Aesthetics <hello@shevchenkoaesthetics.com>';

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email service is not configured. Add RESEND_API_KEY to .env.' },
      { status: 503 }
    );
  }

  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }

  const phone = body.phone?.trim() || 'Not provided';
  const treatment = body.treatment?.trim() || 'Not specified';
  const preferred = body.preferred?.trim() || 'Not specified';
  const message = body.message?.trim() || 'No message';

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeTreatment = escapeHtml(treatment);
  const safePreferred = escapeHtml(preferred);
  const safeMessage = formatMultiline(message);

  const enquiryDetailsHtml = `
    <table style="font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #2C2C2C; width: 100%;">
      <tr><td style="padding: 6px 16px 6px 0; color: #7A7370; vertical-align: top;">Name</td><td>${safeName}</td></tr>
      <tr><td style="padding: 6px 16px 6px 0; color: #7A7370; vertical-align: top;">Email</td><td>${safeEmail}</td></tr>
      <tr><td style="padding: 6px 16px 6px 0; color: #7A7370; vertical-align: top;">Phone</td><td>${safePhone}</td></tr>
      <tr><td style="padding: 6px 16px 6px 0; color: #7A7370; vertical-align: top;">Service</td><td>${safeTreatment}</td></tr>
      <tr><td style="padding: 6px 16px 6px 0; color: #7A7370; vertical-align: top;">Preferred day / time</td><td>${safePreferred}</td></tr>
      <tr><td style="padding: 6px 16px 6px 0; color: #7A7370; vertical-align: top;">Message</td><td>${safeMessage}</td></tr>
    </table>
  `;

  const resend = new Resend(apiKey);

  const { error: notifyError } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Booking enquiry from ${name}`,
    html: `
      <h2 style="font-family: Georgia, serif; color: #2D6A4F;">New booking enquiry</h2>
      ${enquiryDetailsHtml}
    `,
  });

  if (notifyError) {
    console.error('Resend notify error:', notifyError);
    return NextResponse.json(
      { error: notifyError.message ?? 'Failed to send enquiry email' },
      { status: 500 }
    );
  }

  const { error: ackError } = await resend.emails.send({
    from,
    to: [email],
    subject: "We've received your enquiry",
    html: `
      <div style="font-family: sans-serif; font-size: 14px; line-height: 1.7; color: #2C2C2C; max-width: 560px;">
        <h2 style="font-family: Georgia, serif; color: #2D6A4F; font-weight: 400; margin: 0 0 16px;">
          We've received your enquiry
        </h2>

        <p style="margin: 0 0 12px;">Hi ${safeName},</p>

        <p style="margin: 0 0 12px;">
          Thank you for getting in touch with Shevchenko Aesthetics.
          We've received your enquiry and will get back to you as soon as possible.
        </p>

        <h3 style="font-family: Georgia, serif; color: #2C2C2C; font-weight: 400; font-size: 18px; margin: 24px 0 12px;">
          Your enquiry
        </h3>

        ${enquiryDetailsHtml}

        <p style="margin: 24px 0 12px;">
          Please keep this email for your records. We'll be in touch shortly regarding your enquiry.
        </p>

        <p style="margin: 0;">
          Kind regards,<br>
          <strong>Shevchenko Aesthetics</strong>
        </p>
      </div>
    `,
  });

  if (ackError) {
    // Business notification already sent — don't fail the enquiry for the client.
    console.error('Resend acknowledgement error:', ackError);
  }

  return NextResponse.json({ success: true });
}
