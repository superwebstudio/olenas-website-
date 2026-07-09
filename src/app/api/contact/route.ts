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

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_EMAIL ?? 'tech@superweb.studio';
  const from =
    process.env.RESEND_FROM_EMAIL ?? 'Olena Aesthetics <onboarding@resend.dev>';

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

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Booking enquiry from ${name}`,
    html: `
      <h2 style="font-family: Georgia, serif; color: #2D6A4F;">New booking enquiry</h2>
      <table style="font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #2C2C2C;">
        <tr><td style="padding: 6px 16px 6px 0; color: #7A7370;">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 6px 16px 6px 0; color: #7A7370;">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding: 6px 16px 6px 0; color: #7A7370;">Phone</td><td>${escapeHtml(phone)}</td></tr>
        <tr><td style="padding: 6px 16px 6px 0; color: #7A7370;">Treatment</td><td>${escapeHtml(treatment)}</td></tr>
        <tr><td style="padding: 6px 16px 6px 0; color: #7A7370;">Preferred time</td><td>${escapeHtml(preferred)}</td></tr>
        <tr><td style="padding: 6px 16px 6px 0; color: #7A7370; vertical-align: top;">Message</td><td>${escapeHtml(message).replaceAll('\n', '<br>')}</td></tr>
      </table>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { error: error.message ?? 'Failed to send enquiry email' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
