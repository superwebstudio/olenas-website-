'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import olenaImg from '@/images/olena.png';
import header1Img from '@/images/header1.png';

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
    title: 'Laser Hair Removal',
    description: 'Permanent reduction with medical-grade laser — safe on all skin types.',
    href: '/treatments#laser',
  },
  {
    title: 'Skin Rejuvenation',
    description: 'Microneedling, peels & RF to restore radiance and smooth texture.',
    href: '/treatments#rejuvenation',
  },
  {
    title: 'Facial Treatments',
    description: 'Bespoke facials tailored to your skin type — hydration to anti-ageing.',
    href: '/treatments#facials',
  },
  {
    title: 'Brow & Lash',
    description: 'Lamination, lifting and tinting to define and frame your features.',
    href: '/treatments#brow',
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
      <section className="relative min-h-screen bg-[#F4EFE8] flex flex-col">

        {/* Subtle radial glow — no overflow-hidden so scroll cue stays visible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 70% 60% at 20% 55%, rgba(45,106,79,0.07) 0%, transparent 70%),' +
              'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Content grid — image column wider than 50/50 so portrait hero crops less */}
        <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto w-full px-6 lg:px-12">

          {/* ── Left: Text (+ mobile hero portrait) ── */}
          <div className="flex flex-col justify-center py-36 lg:py-0 lg:pr-16 lg:col-span-5">
            <div
              className="relative w-full aspect-[3/4] max-h-[min(52vh,440px)] mb-10 lg:hidden overflow-hidden border border-[#E8E0D5]/90"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'none' : 'translateY(12px)',
                transition: 'opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s',
              }}
            >
              <Image
                src={header1Img}
                alt="Olena — Aesthetic Specialist"
                fill
                className="object-cover object-[center_20%]"
                sizes="100vw"
                priority
              />
            </div>

            <div
              className="inline-flex items-center gap-3 mb-10"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'none' : 'translateY(10px)',
                transition: 'opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s',
              }}
            >
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
              Professional laser, skin rejuvenation and personalised facial treatments — tailored to help you achieve healthy, confident-looking skin.
            </p>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mx-auto"
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
                className="btn w-full justify-center text-center"
                style={{ border: '1px solid rgba(44,44,44,0.25)', color: '#2C2C2C' }}
              >
                View Treatments
              </Link>
            </div>
          </div>

          {/* ── Right: Photo (wider column + calmer focal point than object-top) ── */}
          <div
            className="relative hidden lg:block lg:col-span-7 min-h-0"
            style={{
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.9s ease 0.4s',
            }}
          >
            {/* Photo fills full column height, no gap at bottom */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={olenaImg}
                alt="Olena — Aesthetic Specialist"
                fill
                className="object-cover object-[center_22%]"
                sizes="(max-width: 1280px) 58vw, 52vw"
                priority
              />
              {/* Subtle left-edge fade so photo bleeds into text area softly */}
              <div
                className="absolute inset-y-0 left-0 w-24 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, #F4EFE8, transparent)',
                }}
              />
            </div>

            {/* Stats badge floating bottom-left of image */}
            <div
              className="absolute bottom-12 left-0 -translate-x-1/2 bg-white border border-[#E8E0D5] px-7 py-5 shadow-sm z-10"
              style={{ minWidth: 160 }}
            >
              <div className="flex gap-1 mb-2">
                {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} size={11} />)}
              </div>
              <p className="text-xl text-[#2D6A4F]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>500+ Clients</p>
              <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#7A7370] mt-0.5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>8+ Years Experience</p>
            </div>
          </div>
        </div>

        {/* Scroll cue — below grid, anchored to bottom */}
        <div
          className="flex flex-col items-center gap-2 pb-10 pointer-events-none"
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
      <section style={{ backgroundColor: '#2D6A4F', padding: '2.75rem 1.5rem' }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-20">
          {[
            { label: 'Advanced Technology', Icon: SparkleIcon },
            { label: 'Certified Specialist', Icon: ShieldIcon },
            { label: 'Personalised Care',   Icon: HeartIcon  },
          ].map(({ label, Icon }) => (
            <div key={label} className="flex items-center gap-3 text-white">
              <span style={{ color: '#E0C068' }}><Icon /></span>
              <span
                className="text-[0.68rem] tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section className="section-padding" style={{ backgroundColor: '#F9F6F0' }}>
        <div className="max-w-6xl mx-auto">

          <FadeIn className="text-center mb-20">
            <p
              className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              What We Offer
            </p>
            <h2
              className="text-[2.8rem] sm:text-[3.5rem] text-[#2C2C2C] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Our Treatments
            </h2>
            <div className="gold-divider" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 90}>
                <Link
                  href={s.href}
                  className="group flex flex-col p-6 sm:p-8 rounded-xl bg-transparent border border-[#DED4C8]/85 hover:bg-[#F9F6F0]/55 hover:border-[#2D6A4F]/35 transition-all duration-300 h-full relative overflow-hidden"
                >
                  {/* Top slide-in accent */}
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-[#2D6A4F] group-hover:w-full transition-all duration-500" />

                  <div className="mb-5 sm:mb-6 h-px w-10 bg-[#C9A84C]/70" aria-hidden="true" />

                  <h3
                    className="text-[1.3rem] sm:text-[1.25rem] text-[#2C2C2C] mb-3 group-hover:text-[#2D6A4F] transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                  >
                    {s.title}
                  </h3>

                  {/* Single short line — no overflow */}
                  <p
                    className="text-sm text-[#7A7370] leading-relaxed flex-1"
                    style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.75 }}
                  >
                    {s.description}
                  </p>

                  <span
                    className="inline-flex items-center gap-1 mt-6 sm:mt-7 text-[0.62rem] tracking-[0.15em] uppercase text-[#2D6A4F]"
                    style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
                  >
                    Learn more <ChevronRight size={11} />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={350} className="text-center mt-14">
            <Link href="/treatments" className="btn btn-outline">
              All Treatments <ArrowRight size={13} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════ ABOUT TEASER ══════════════ */}
      <section className="section-padding" style={{ backgroundColor: '#F4EFE8' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Photo */}
          <FadeIn>
            <div className="relative" style={{ paddingBottom: '2rem' }}>
              <div className="aspect-[4/5] relative overflow-hidden border border-[#E8E0D5]">
                <Image
                  src={olenaImg}
                  alt="Olena — Aesthetic Specialist"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#C9A84C] z-10" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#C9A84C] z-10" />
              </div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-0 sm:-right-6 bg-[#2D6A4F] text-white px-6 py-4 z-10">
                <p className="text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>8+</p>
                <p className="text-[0.58rem] tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Years Exp.</p>
              </div>
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn delay={180}>
            <p
              className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              About Olena
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
              className="inline-flex items-center gap-2 text-[#2D6A4F] border-b border-[#2D6A4F]/35 pb-0.5 hover:border-[#2D6A4F] transition-colors"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
            >
              Read My Story <ArrowRight size={13} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="section-padding" style={{ backgroundColor: '#222222' }}>
        <div className="max-w-6xl mx-auto">

          <FadeIn className="text-center mb-20">
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
                  style={{ backgroundColor: '#2b2b2b', border: '1px solid #3f3f3f', boxShadow: '0 10px 24px rgba(0,0,0,0.18)' }}
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
        className="section-padding relative overflow-hidden"
        style={{ background: 'linear-gradient(140deg, #2D6A4F 0%, #1B4332 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 55% 55% at 25% 50%, rgba(201,168,76,0.14) 0%, transparent 65%),' +
              'radial-gradient(ellipse 40% 40% at 75% 50%, rgba(201,168,76,0.07) 0%, transparent 65%)',
          }}
        />

        <FadeIn className="relative text-center max-w-xl mx-auto">
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
      </section>
    </>
  );
}
