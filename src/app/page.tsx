'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import heroImg from '@/images/header1.png';
import olenaProImg from '@/images/olena-professional.png';

/* ─── Inline SVG stars — fill always works ─── */
function StarIcon({ size = 14, color = '#C9A84C' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ fill: color, flexShrink: 0 }} aria-hidden="true">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

/* ─── Trust-strip icon replacements ─── */
function SparkleIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.8 7.2L21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-1.8z" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/* ─── Scroll-triggered fade ─── */
function FadeIn({ children, delay = 0, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(26px)',
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Data ─── */
const services = [
  {
    title: 'Microdermabrasion',
    description: 'Professional exfoliation and skin resurfacing — ideal alone or paired with RF in our packages.',
    href: '/treatments#skin-base-treatment',
  },
  {
    title: 'RF Microneedling',
    description: 'Radiofrequency microneedling for firmness, texture and collagen — zones priced from £130.',
    href: '/treatments#rf-microneedling',
  },
  {
    title: 'Laser Hair Removal',
    description: 'Clinical-grade laser for long-term hair reduction — safe protocols with a trained specialist.',
    href: '/treatments#laser-hair-removal',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'Olena is absolutely incredible. My skin has never looked better — the treatments are so professional and the results are stunning.',
    rating: 5,
  },
  {
    name: 'Anna K.',
    text: 'After just three laser sessions I noticed a massive difference. Olena takes such great care and makes you feel completely at ease.',
    rating: 5,
  },
  {
    name: 'Emily R.',
    text: 'The personalised approach is what sets Olena apart. She really listens and tailors every treatment. Highly recommend.',
    rating: 5,
  },
];

/* ═══════════════════════════════════════════ */
export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Full-bleed background image */}
        <div
          className="absolute inset-0"
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.9s ease 0.1s',
          }}
        >
          <Image
            src={heroImg}
            alt="Olena Shevchenko — Aesthetic Specialist"
            fill
            className="object-cover object-[72%_center] lg:object-[78%_center]"
            sizes="100vw"
            priority
          />
          {/* Mobile overlay — almost opaque on left, fades right */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(244,239,232,0.96) 0%, rgba(244,239,232,0.88) 55%, rgba(244,239,232,0.45) 100%)',
            }}
          />
          {/* Desktop overlay — strong on left, fades to transparent on right */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background: 'linear-gradient(to right, rgba(244,239,232,0.97) 0%, rgba(244,239,232,0.9) 30%, rgba(244,239,232,0.55) 55%, rgba(244,239,232,0.0) 80%)',
            }}
          />
        </div>

        {/* Content — text floats left on top of the bg */}
        <div className="relative flex-1 flex items-center site-container">
          <div
            className="flex flex-col justify-center py-36 lg:py-0 lg:pr-16 w-full lg:max-w-[52%]"
          >
            <div
              className="inline-flex items-center gap-3 mb-10"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'none' : 'translateY(10px)',
                transition: 'opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s',
              }}
            >
              <span className="text-[#C9A84C]" aria-hidden>✦</span>
              <span className="h-px w-10 bg-[#C9A84C]" />
              <span
                className="text-[0.62rem] tracking-[0.28em] uppercase text-[#2D6A4F]"
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
              >
                Advanced Aesthetic Treatments
              </span>
            </div>

            <h1
              className="text-[3.2rem] sm:text-[4rem] lg:text-[4.8rem] text-[#2C2C2C] leading-[1.05] mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'none' : 'translateY(18px)',
                transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
              }}
            >
              Reveal Your<br />
              <em className="text-[#2D6A4F]">Natural Beauty</em>
            </h1>

            {/* Gold rule */}
            <div
              className="h-px w-12 bg-[#C9A84C] mb-8"
              style={{
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.5s ease 0.5s',
              }}
            />

            <p
              className="text-[1rem] text-[#7A7370] max-w-sm mb-12"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                lineHeight: 1.85,
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'none' : 'translateY(14px)',
                transition: 'opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s',
              }}
            >
              Microdermabrasion, RF microneedling and laser hair removal — singles and value packages tailored to your goals (see Prices).
            </p>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'none' : 'translateY(14px)',
                transition: 'opacity 0.7s ease 0.75s, transform 0.7s ease 0.75s',
              }}
            >
              <Link href="/contact" className="btn btn-primary w-full justify-center text-center">
                Book Appointment <ArrowRight size={13} />
              </Link>
              <Link
                href="/treatments"
                className="btn w-full justify-center text-center bg-white/80 shadow-[0_2px_14px_rgba(44,44,44,0.08)] hover:shadow-[0_6px_22px_rgba(44,44,44,0.12)]"
                style={{ color: '#2C2C2C' }}
              >
                View Treatments
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="relative flex flex-col items-center gap-2 pb-10 pointer-events-none"
          style={{
            opacity: loaded ? 0.7 : 0,
            transition: 'opacity 0.6s ease 1.2s',
          }}
        >
          <span className="text-[0.55rem] tracking-[0.25em] uppercase text-[#7A7370]" style={{ fontFamily: "'Jost', sans-serif" }}>
            Scroll
          </span>
          <div
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, #C9A84C, transparent)' }}
          />
        </div>
      </section>

      {/* ══════════════ TRUST STRIP ══════════════ */}
      <section className="border-y border-[#40916C]/25 bg-[#2D6A4F] py-9">
        <div className="site-container">
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16 lg:gap-24">
            {[
              { label: 'Advanced Technology', Icon: SparkleIcon },
              { label: 'Certified Specialist', Icon: ShieldIcon },
              { label: 'Personalised Care', Icon: HeartIcon },
            ].map(({ label, Icon }) => (
              <div key={label} className="flex items-center gap-3 text-[#F9F6F0]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F9F6F0]/10 text-[#E8CF7A] ring-1 ring-[#C9A84C]/35">
                  <Icon />
                </span>
                <span
                  className="text-[0.65rem] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, color: '#F9F6F0' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section className="section-padding" style={{ backgroundColor: '#F4EFE8' }}>
        <div className="site-container">

          <FadeIn className="text-center mb-20">
            <p
              className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              What We Offer
            </p>
            <h2
              className="text-[2.8rem] sm:text-[3.5rem] text-[#2C2C2C] mb-14 sm:mb-16"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Our Treatments
            </h2>
            <div className="gold-divider" />
          </FadeIn>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 90}>
                <Link
                  href={s.href}
                  className="group flex flex-col p-7 bg-white shadow-[inset_0_3px_0_0_#2D6A4F,0_6px_28px_rgba(0,0,0,0.06)] hover:shadow-[inset_0_3px_0_0_#2D6A4F,0_14px_40px_rgba(45,106,79,0.12)] hover:-translate-y-0.5 transition-all duration-300 h-full rounded-sm"
                >
                  <p
                    className="text-[0.55rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5"
                    style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
                  >
                    0{i + 1}
                  </p>

                  <h3
                    className="text-[1.25rem] text-[#2C2C2C] mb-3 group-hover:text-[#2D6A4F] transition-colors duration-200"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                  >
                    {s.title}
                  </h3>

                  <p
                    className="text-sm text-[#7A7370] flex-1"
                    style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.8 }}
                  >
                    {s.description}
                  </p>

                  <span
                    className="inline-flex items-center gap-2 mt-6 text-[0.65rem] tracking-[0.15em] uppercase text-[#2D6A4F] group-hover:gap-3 transition-all duration-200"
                    style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
                  >
                    Book Now <ArrowRight size={12} />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={350} className="text-center mt-12">
            <Link
              href="/treatments"
              className="text-[0.68rem] tracking-[0.18em] uppercase text-[#7A7370] hover:text-[#2D6A4F] transition-colors inline-flex items-center gap-2"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
            >
              View all treatments <ArrowRight size={12} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════ ABOUT TEASER ══════════════ */}
      <section className="section-padding" style={{ backgroundColor: '#F4EFE8' }}>
        <div className="site-container grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Photo */}
          <FadeIn>
            <div className="mx-auto max-w-xl lg:max-w-none">
              <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] relative overflow-hidden rounded-sm shadow-[0_22px_56px_rgba(35,35,35,0.14)]">
                <Image
                  src={olenaProImg}
                  alt="Olena Shevchenko — Certified Aesthetic Specialist"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn delay={180}>
            <p
              className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              About Olena Shevchenko
            </p>
            <h2
              className="text-[2.6rem] sm:text-[3.2rem] text-[#2C2C2C] mb-6 leading-[1.1]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Passionate About<br />
              <em className="text-[#2D6A4F]">Your Skin Health</em>
            </h2>
            <div className="h-px w-10 bg-[#C9A84C] mb-8" />
            <p className="text-[1rem] text-[#7A7370] mb-5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
              With over 8 years of experience in advanced aesthetic treatments, I combine clinical expertise with a deeply personal approach. Every client is unique, and so is every treatment plan I create.
            </p>
            <p className="text-[1rem] text-[#7A7370] mb-10" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
              My mission is simple: to help you feel confident and comfortable in your own skin, using the safest, most effective technologies available.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[#2D6A4F] underline underline-offset-[6px] decoration-[#2D6A4F]/35 hover:decoration-[#2D6A4F] transition-colors"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecorationThickness: '1px' }}
            >
              Read My Story <ArrowRight size={13} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="section-padding" style={{ backgroundColor: '#222222' }}>
        <div className="site-container">

          <FadeIn className="text-center mb-28 sm:mb-32">
            <p
              className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              Client Love
            </p>
            <h2
              className="text-[2.8rem] sm:text-[3.5rem]"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#F9F6F0' }}
            >
              What Our Clients Say
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 110}>
                <div
                  className="flex flex-col p-6 sm:p-9 rounded-2xl sm:rounded-none relative"
                  style={{ backgroundColor: '#2b2b2b', boxShadow: '0 16px 40px rgba(0,0,0,0.35)' }}
                >
                  {/* Large quote mark */}
                  <span
                    className="absolute top-4 left-5 sm:top-6 sm:left-7 leading-none select-none"
                    style={{ fontSize: '3.1rem', color: '#C9A84C', fontFamily: "'Cormorant Garamond', serif", opacity: 0.35 }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5 mt-1">
                    {[0, 1, 2, 3, 4].map((j) => <StarIcon key={j} size={12} color="#C9A84C" />)}
                  </div>

                  {/* Review */}
                  <p
                    className="flex-1 mb-6"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: 'italic',
                      fontWeight: 400,
                      fontSize: '1.02rem',
                      lineHeight: 1.7,
                      color: '#ccc5be',
                    }}
                  >
                    {t.text}
                  </p>

                  {/* Divider + name */}
                  <div className="h-px w-8 mb-4" style={{ backgroundColor: '#C9A84C', opacity: 0.4 }} />
                  <p
                    className="text-[0.62rem] tracking-[0.22em] uppercase"
                    style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, color: '#C9A84C' }}
                  >
                    {t.name}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section
        className="section-padding"
        style={{
          backgroundColor: '#1B4332',
          backgroundImage:
            'radial-gradient(55% 55% at 25% 50%, rgba(201, 168, 76, 0.14) 0%, transparent 65%), radial-gradient(40% 40% at 75% 50%, rgba(201, 168, 76, 0.07) 0%, transparent 65%)',
        }}
      >
        <div className="site-container text-center">
          <FadeIn className="mx-auto max-w-xl">
            <p
              className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              Ready to Begin?
            </p>
            <h2
              className="text-[2.8rem] sm:text-[3.5rem] text-white mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Start Your Skin Journey Today
            </h2>
            <div className="gold-divider mb-10" />
            <p
              className="text-[1rem] mb-12"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.65)' }}
            >
              Book a personalised consultation and let us create the perfect treatment plan for your unique skin goals.
            </p>
            <Link href="/contact" className="btn btn-gold">
              Book Your Consultation <ArrowRight size={13} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
