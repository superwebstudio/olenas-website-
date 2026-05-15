'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Gift, Sparkles } from 'lucide-react';

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

function PriceRow({ name, price }: { name: string; price: string }) {
  return (
    <li className="flex items-center justify-between gap-4 px-5 sm:px-6 py-3.5 hover:bg-[#F9F6F0] transition-colors">
      <p className="text-sm text-[#2C2C2C]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}>{name}</p>
      <span className="text-lg text-[#2D6A4F] shrink-0 text-right" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{price}</span>
    </li>
  );
}

function PriceIconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/14 text-[#9a7b2d] shadow-[0_0_22px_rgba(201,168,76,0.45)] ring-1 ring-[#C9A84C]/30">
      {children}
    </span>
  );
}

function SingleTreatmentsCard({ delay = 0 }: { delay?: number }) {
  return (
    <FadeIn delay={delay}>
      <div className="rounded-xl bg-white overflow-hidden shadow-[0_12px_40px_rgba(34,34,34,0.08)]">
        <div className="px-5 sm:px-6 py-4 sm:py-5 bg-[#FAFAF7] flex items-center gap-3">
          <PriceIconWrap>
            <Sparkles size={18} strokeWidth={1.75} />
          </PriceIconWrap>
          <h3 className="text-[1.2rem] sm:text-[1.4rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Single Treatments</h3>
        </div>
        <ul className="divide-y divide-[#EDEAE4]">
          <PriceRow name="Microdermabrasion" price="£60" />
          <PriceRow name="RF Microneedling (price depends on zone)" price="£130–£180" />
          <PriceRow name="Maintenance plan — follow-up sessions" price="from £50" />
        </ul>
      </div>
    </FadeIn>
  );
}

function PackageDealCard({
  title,
  badge,
  price,
  footnote,
  lines,
  delay = 0,
}: {
  title: string;
  badge?: string;
  price: string;
  footnote?: string;
  lines: string[];
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <div className="flex h-full flex-col rounded-xl border border-[#E8E0D5] bg-white p-6 shadow-[0_12px_40px_rgba(34,34,34,0.06)] sm:p-7">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {badge && (
            <span className="rounded-full bg-[#2D6A4F]/10 px-3 py-1 text-[0.58rem] tracking-[0.14em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
              {badge}
            </span>
          )}
        </div>
        <h3 className="mb-2 text-[1.35rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{title}</h3>
        <p className="mb-4 text-2xl text-[#2D6A4F]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{price}</p>
        {footnote && (
          <p className="mb-4 text-sm italic text-[#7A7370]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{footnote}</p>
        )}
        <ul className="mt-auto space-y-2 border-t border-[#EDEAE4] pt-4">
          {lines.map((line) => (
            <li key={line} className="flex gap-2 text-sm text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              <span className="text-[#C9A84C]" aria-hidden>✦</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <FadeIn className="text-center mb-10">
      <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-4" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>{label}</p>
      <h2 className="text-[2.2rem] sm:text-[2.8rem] text-[#2C2C2C] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{title}</h2>
      <div className="gold-divider" />
    </FadeIn>
  );
}

export default function PricesPage() {
  return (
    <>
      <section className="page-hero bg-[#F4EFE8]">
        <div className="site-container text-center">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
              Transparent Pricing
            </p>
            <h1 className="text-[2.8rem] sm:text-[3.5rem] text-[#2C2C2C] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Treatment <em className="text-[#2D6A4F]">Prices</em>
            </h1>
            <div className="gold-divider mb-8" />
            <p className="text-[1rem] text-[#7A7370] max-w-lg mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
              Clear pricing in GBP. RF microneedling is quoted by zone during consultation. Packages offer better value — see below.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#F9F6F0]">
        <div className="site-container max-w-3xl">
          <SectionHeading label="Pay per visit" title="Single Treatments" />
          <SingleTreatmentsCard delay={80} />
        </div>
      </section>

      <section className="section-padding bg-[#F4EFE8]">
        <div className="site-container">
          <SectionHeading label="Better value" title="Packages" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <PackageDealCard
              title="Essential Skin Reset"
              price="£160"
              footnote="instead of £180"
              lines={['1 × Microdermabrasion', '1 × RF Microneedling']}
              delay={80}
            />
            <PackageDealCard
              title="Skin Renewal Course"
              badge="Most popular"
              price="£420 – £480"
              lines={['3 × Microdermabrasion', '3 × RF Microneedling']}
              delay={120}
            />
            <PackageDealCard
              title="Advanced Skin Transformation"
              price="£750 – £950"
              lines={['6 × Microdermabrasion', '4–6 × RF Microneedling']}
              delay={160}
            />
            <PackageDealCard
              title="Maintenance Plan"
              price="from £50 per session"
              lines={['Scheduled follow-ups to protect your results — tailored after your course']}
              delay={200}
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#F9F6F0]">
        <div className="site-container max-w-3xl">
          <SectionHeading label="Limited-time" title="Current Offers" />
          <div className="space-y-5">
            <FadeIn delay={80}>
              <div className="rounded-xl border border-[#C9A84C]/35 bg-white p-6 shadow-[0_8px_28px_rgba(45,106,79,0.06)]">
                <div className="mb-2 flex items-center gap-2 text-[#2D6A4F]">
                  <Gift size={18} strokeWidth={1.6} />
                  <span className="text-[0.62rem] tracking-[0.22em] uppercase" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Offer 1 — First visit</span>
                </div>
                <p className="text-[1.05rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  Get £10–£20 off your first treatment
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <div className="rounded-xl border border-[#C9A84C]/35 bg-white p-6 shadow-[0_8px_28px_rgba(45,106,79,0.06)]">
                <div className="mb-2 flex items-center gap-2 text-[#2D6A4F]">
                  <Gift size={18} strokeWidth={1.6} />
                  <span className="text-[0.62rem] tracking-[0.22em] uppercase" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Offer 2 — Package bonus</span>
                </div>
                <p className="text-[1.05rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  Book a course and get 1 Microdermabrasion session free
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={160}>
              <div className="rounded-xl border border-[#C9A84C]/35 bg-white p-6 shadow-[0_8px_28px_rgba(45,106,79,0.06)]">
                <div className="mb-2 flex items-center gap-2 text-[#2D6A4F]">
                  <Gift size={18} strokeWidth={1.6} />
                  <span className="text-[0.62rem] tracking-[0.22em] uppercase" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Offer 3 — Availability</span>
                </div>
                <p className="text-[1.05rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  Limited spaces available each week — book early to secure your slot
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#2D6A4F] text-center">
        <div className="site-container text-center">
          <FadeIn className="mx-auto w-full max-w-2xl text-center">
            <p className="text-[1rem] text-[#c8e6d4] mb-10" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
              Not sure which option suits you? Book a consultation and we&apos;ll recommend the best single session or package for your goals.
            </p>
            <Link href="/contact" className="btn btn-gold">
              Book Free Consultation <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
