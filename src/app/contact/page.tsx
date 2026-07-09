'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const treatmentOptions = [
  'Laser Hair Removal',
  'RF Microneedling',
  'Tattoo Removal',
  'Carbon Peeling (Hollywood Peel)',
  'Not sure — need advice',
];

const hours = [
  { day: 'Monday – Friday', time: '9:00 am – 8:00 pm' },
  { day: 'Saturday', time: '10:00 am – 6:00 pm' },
  { day: 'Sunday', time: 'Closed' },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', treatment: '', message: '', preferred: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again or email directly.');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Could not send your enquiry. Please try again or email Elenaunice12@gmail.com directly.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    'w-full border-0 bg-white px-4 py-3.5 text-sm text-[#2C2C2C] placeholder:text-[#b0a89e] shadow-[0_1px_4px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/25 transition-[box-shadow] duration-200 rounded-lg sm:rounded-none';

  return (
    <>
      <section className="page-hero bg-[#F4EFE8]">
        <div className="site-container text-center">
          <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Get in Touch</p>
          <h1 className="text-[2.8rem] sm:text-[3.5rem] text-[#2C2C2C] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Book an <em className="text-[#2D6A4F]">Appointment</em></h1>
          <div className="gold-divider mb-8" />
          <p className="text-[1rem] text-[#7A7370] max-w-lg mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>Fill in the form below or contact me directly — I will get back to you within 24 hours.</p>
        </div>
      </section>

      <section className="section-padding bg-[#F9F6F0]">
        <div className="site-container grid grid-cols-1 lg:grid-cols-5 gap-12">
          <FadeIn className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-6" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                Contact Details
              </p>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-[#EDE8DF]/90 flex items-center justify-center shrink-0 rounded-lg sm:rounded-none shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                    <Phone size={14} className="text-[#2D6A4F]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-[#7A7370] mb-1" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Phone</p>
                    <a href="tel:+447909281859" className="text-sm text-[#2C2C2C] hover:text-[#2D6A4F] transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}>
                      +44 7909 281859
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-[#EDE8DF]/90 flex items-center justify-center shrink-0 rounded-lg sm:rounded-none shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                    <Mail size={14} className="text-[#2D6A4F]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-[#7A7370] mb-1" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Email</p>
                    <a href="mailto:Elenaunice12@gmail.com" className="text-sm text-[#2C2C2C] hover:text-[#2D6A4F] transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}>
                      Elenaunice12@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-[#EDE8DF]/90 flex items-center justify-center shrink-0 rounded-lg sm:rounded-none shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                    <MapPin size={14} className="text-[#2D6A4F]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-[#7A7370] mb-1" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Location</p>
                    <p className="text-sm text-[#2C2C2C]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}>Royal Mail House, Terminus Terrace</p>
                    <p className="text-xs text-[#7A7370] mt-0.5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Southampton SO14 3FD</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-[#EDE8DF]/90 flex items-center justify-center shrink-0 rounded-lg sm:rounded-none shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                    <InstagramIcon size={14} />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-[#7A7370] mb-1" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Instagram</p>
                    <a href="https://instagram.com/shevchenko_laserremoval" target="_blank" rel="noopener noreferrer" className="text-sm text-[#2C2C2C] hover:text-[#2D6A4F] transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}>
                      @shevchenko_laserremoval
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} className="text-[#C9A84C]" />
                <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                  Opening Hours
                </p>
              </div>
              <ul className="space-y-2">
                {hours.map(({ day, time }) => (
                  <li key={day} className="flex justify-between text-sm">
                    <span className="text-[#7A7370]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{day}</span>
                    <span className={time === 'Closed' ? 'text-[#C9A84C]' : 'text-[#2C2C2C]'} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}>{time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 sm:p-6 bg-[#F4EFE8] rounded-xl sm:rounded-none shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
              <p className="text-base text-[#2C2C2C] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>What to expect</p>
              {['I will reply within 24 hours', 'Free skin consultation included', 'Patch test arranged if needed', 'Flexible appointment times'].map((item) => (
                <div key={item} className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={13} className="text-[#2D6A4F] shrink-0" />
                  <span className="text-xs text-[#7A7370]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={150} className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[480px] text-center p-8 sm:p-10 rounded-xl sm:rounded-none shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                <div className="w-16 h-16 rounded-full bg-[#2D6A4F]/12 flex items-center justify-center mb-6">
                  <CheckCircle2 size={28} className="text-[#2D6A4F]" />
                </div>
                <h2 className="text-[1.8rem] text-[#2C2C2C] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
                  Thank You, {form.name.split(' ')[0]}!
                </h2>
                <div className="gold-divider mb-5" />
                <p className="text-[1rem] text-[#7A7370] max-w-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                  Your message has been received. I will be in touch within 24 hours to confirm your appointment. Looking forward to meeting you!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-5 rounded-xl sm:rounded-none shadow-[0_12px_40px_rgba(0,0,0,0.07)]">
                <h2 className="text-[1.8rem] text-[#2C2C2C] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Booking Enquiry
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-[#7A7370] mb-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Full Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className={inputClass} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }} />
                  </div>
                  <div>
                    <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-[#7A7370] mb-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-[#7A7370] mb-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+44 ..." className={inputClass} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }} />
                  </div>
                  <div>
                    <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-[#7A7370] mb-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Treatment Interest</label>
                    <select name="treatment" value={form.treatment} onChange={handleChange} className={`${inputClass} cursor-pointer`} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                      <option value="">Select a treatment…</option>
                      {treatmentOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-[#7A7370] mb-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Preferred Day / Time</label>
                  <input type="text" name="preferred" value={form.preferred} onChange={handleChange} placeholder="e.g. Weekday afternoons, Saturday morning…" className={inputClass} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }} />
                </div>

                <div>
                  <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-[#7A7370] mb-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Message / Questions</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell me about your skin concerns or any questions you have…" className={`${inputClass} resize-none`} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }} />
                </div>

                {error && (
                  <p className="text-sm text-center text-red-700 bg-red-50 px-4 py-3 rounded-lg" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}>
                    {error}
                  </p>
                )}

                <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? 'Sending…' : 'Send Booking Enquiry'}
                </button>

                <p className="text-[0.62rem] text-center text-[#b0a89e]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                  Your details are kept private and never shared with third parties.
                </p>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
