'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
    <li className="flex items-center justify-between px-5 sm:px-6 py-3.5 hover:bg-[#F9F6F0] transition-colors">
      <p className="text-sm text-[#2C2C2C]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}>{name}</p>
      <span className="text-lg text-[#2D6A4F] ml-4 shrink-0" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{price}</span>
    </li>
  );
}

function PriceCard({ title, icon, items, delay = 0 }: { title: string; icon: string; items: { name: string; price: string }[]; delay?: number }) {
  return (
    <FadeIn delay={delay}>
      <div className="rounded-xl bg-white overflow-hidden shadow-[0_12px_40px_rgba(34,34,34,0.08)]">
        <div className="px-5 sm:px-6 py-4 sm:py-5 bg-[#FAFAF7] flex items-center gap-3">
          <span className="text-xl text-[#C9A84C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{icon}</span>
          <h3 className="text-[1.2rem] sm:text-[1.4rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{title}</h3>
        </div>
        <ul className="divide-y divide-[#EDEAE4]">
          {items.map((item) => <PriceRow key={item.name} name={item.name} price={item.price} />)}
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
      {/* ── Hero ── */}
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
            Clear, honest pricing with no hidden fees. All prices are per session. A patch test is required prior to laser treatments at no extra charge.
          </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          LASER HAIR REMOVAL — WOMEN
      ════════════════════════════════ */}
      <section className="section-padding bg-[#F9F6F0]">
        <div className="site-container">
          <SectionHeading label="Per Session" title="Laser Hair Removal — Women" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
            <PriceCard
              title="Face"
              icon="✦"
              delay={80}
              items={[
                { name: 'Full Face', price: '€45' },
                { name: 'Upper Lip', price: '€20' },
                { name: 'Chin', price: '€20' },
                { name: 'Chin + Upper Lip', price: '€30' },
                { name: 'Sideburns', price: '€20' },
              ]}
            />
            <PriceCard
              title="Bikini"
              icon="◈"
              delay={160}
              items={[
                { name: 'Bikini', price: '€30' },
                { name: 'Brazilian', price: '€40' },
                { name: 'Hollywood', price: '€55' },
              ]}
            />
            <PriceCard
              title="Body"
              icon="❋"
              delay={240}
              items={[
                { name: 'Underarms', price: '€30' },
                { name: 'Half Arms', price: '€40' },
                { name: 'Full Arms', price: '€50' },
                { name: 'Half Legs', price: '€50' },
                { name: 'Full Legs', price: '€70' },
                { name: 'Abdomen', price: '€35' },
                { name: 'Abdomen Centre Line', price: '€20' },
                { name: 'Chest', price: '€50' },
                { name: 'Full Back', price: '€70' },
                { name: 'Lower Back', price: '€35' },
                { name: 'Buttocks', price: '€45' },
                { name: 'Areola', price: '€20' },
                { name: 'Fingers / Toes', price: '€10' },
              ]}
            />
          </div>

          <FadeIn delay={320}>
            <div className="rounded-xl bg-white overflow-hidden shadow-[0_12px_40px_rgba(34,34,34,0.08)]">
              <div className="px-5 sm:px-6 py-4 sm:py-5 bg-[#FAFAF7] flex items-center gap-3">
                <span className="text-xl text-[#C9A84C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>◇</span>
                <h3 className="text-[1.2rem] sm:text-[1.4rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Special Offers — Women</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 p-5 sm:p-6 pt-4">
                <ul className="divide-y divide-[#EDEAE4] rounded-lg overflow-hidden bg-[#FBFAF8]">
                  <PriceRow name="Underarms + Bikini" price="€45" />
                  <PriceRow name="Underarms + Brazilian" price="€55" />
                  <PriceRow name="Underarms + Hollywood" price="€65" />
                  <PriceRow name="Half Legs + Underarms + Bikini" price="€90" />
                  <PriceRow name="Half Legs + Underarms + Brazilian" price="€95" />
                </ul>
                <ul className="divide-y divide-[#EDEAE4] rounded-lg overflow-hidden bg-[#FBFAF8]">
                  <PriceRow name="Half Legs + Underarms + Hollywood" price="€115" />
                  <PriceRow name="Full Legs + Underarms + Bikini" price="€120" />
                  <PriceRow name="Full Legs + Underarms + Brazilian" price="€135" />
                  <PriceRow name="Full Legs + Underarms + Hollywood" price="€150" />
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════
          LASER HAIR REMOVAL — MEN
      ════════════════════════════════ */}
      <section className="section-padding bg-[#F4EFE8]">
        <div className="site-container">
          <SectionHeading label="Per Session" title="Laser Hair Removal — Men" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10">
            <PriceCard
              title="Face"
              icon="✦"
              delay={80}
              items={[
                { name: 'Beard', price: '€60' },
                { name: 'Cheeks', price: '€40' },
                { name: 'Neck (Front / Back)', price: '€50' },
              ]}
            />
            <PriceCard
              title="Body"
              icon="◈"
              delay={160}
              items={[
                { name: 'Underarms', price: '€45' },
                { name: 'Chest', price: '€80' },
                { name: 'Abdomen', price: '€60' },
                { name: 'Chest + Abdomen', price: '€120' },
                { name: 'Shoulders', price: '€60' },
                { name: 'Full Arms', price: '€80' },
                { name: 'Half Legs', price: '€100' },
                { name: 'Full Legs', price: '€140' },
                { name: 'Full Back', price: '€100' },
                { name: 'Buttocks', price: '€50' },
                { name: 'Bikini', price: '€90' },
              ]}
            />
          </div>

          <FadeIn delay={280}>
            <div className="rounded-xl bg-white overflow-hidden shadow-[0_12px_40px_rgba(34,34,34,0.08)]">
              <div className="px-5 sm:px-6 py-4 sm:py-5 bg-[#FAFAF7] flex items-center gap-3">
                <span className="text-xl text-[#C9A84C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>◇</span>
                <h3 className="text-[1.2rem] sm:text-[1.4rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Special Offers — Men</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 p-5 sm:p-6 pt-4">
                <ul className="divide-y divide-[#EDEAE4] rounded-lg overflow-hidden bg-[#FBFAF8]">
                  <PriceRow name="Chest + Abdomen + Shoulders" price="€160" />
                  <PriceRow name="Full Back + Arms" price="€160" />
                </ul>
                <ul className="divide-y divide-[#EDEAE4] rounded-lg overflow-hidden bg-[#FBFAF8]">
                  <PriceRow name="Full Back + Arms + Chest + Abdomen" price="€180" />
                  <PriceRow name="Full Body" price="€300" />
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════
          TATTOO REMOVAL + CARBON PEELING
      ════════════════════════════════ */}
      <section className="section-padding bg-[#F9F6F0]">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            <div>
              <FadeIn className="text-center mb-8">
                <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-3" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Per Session</p>
                <h2 className="text-[2rem] sm:text-[2.4rem] text-[#2C2C2C] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Tattoo Removal</h2>
                <div className="gold-divider" />
              </FadeIn>
              <PriceCard
                title="Tattoo & Permanent Makeup"
                icon="✦"
                delay={80}
                items={[
                  { name: 'Permanent Makeup Removal (30 min)', price: '€79' },
                  { name: 'Small Tattoo (1–5 cm)', price: '€60' },
                  { name: 'Medium Tattoo (6–15 cm) — Line Only', price: '€80' },
                  { name: 'Medium Tattoo (6–15 cm) — Colour / Shading', price: '€120' },
                  { name: 'Large Tattoo (16–25 cm) — Line Only', price: '€120' },
                  { name: 'Large Tattoo (16–25 cm) — Colour / Shading', price: '€160' },
                ]}
              />
            </div>

            <div>
              <FadeIn className="text-center mb-8">
                <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-3" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Per Session</p>
                <h2 className="text-[2rem] sm:text-[2.4rem] text-[#2C2C2C] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Carbon Peeling</h2>
                <div className="gold-divider" />
              </FadeIn>
              <PriceCard
                title="Hollywood Facial Peel"
                icon="◈"
                delay={120}
                items={[
                  { name: 'Full Face', price: '€50' },
                  { name: 'Neckline', price: '€45' },
                  { name: 'Full Face + Neckline', price: '€75' },
                ]}
              />
            </div>
          </div>

          <FadeIn delay={200} className="mt-10 text-center">
            <p className="text-sm text-[#7A7370] italic" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              * All prices are per session. A patch test is required prior to laser treatments at no extra charge.
              Multiple sessions are recommended for optimal results.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-[#F4EFE8] text-center">
        <div className="site-container text-center">
          <FadeIn className="mx-auto w-full max-w-2xl text-center">
          <p className="text-[1rem] text-[#7A7370] mb-10" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
            Not sure which option suits you? Book a free consultation and I will recommend the most effective plan for your goals.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Book Free Consultation <ArrowRight size={14} />
          </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
