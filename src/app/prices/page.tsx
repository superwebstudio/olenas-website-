'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import olenaImg from '@/images/olena.png';

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

const pricingGroups = [
  {
    category: 'Laser Hair Removal',
    icon: '✦',
    items: [
      { name: 'Upper Lip', price: '€40', sessions: 'per session' },
      { name: 'Chin', price: '€40', sessions: 'per session' },
      { name: 'Underarms', price: '€55', sessions: 'per session' },
      { name: 'Bikini Line', price: '€65', sessions: 'per session' },
      { name: 'Brazilian / Hollywood', price: '€85', sessions: 'per session' },
      { name: 'Half Legs', price: '€90', sessions: 'per session' },
      { name: 'Full Legs', price: '€130', sessions: 'per session' },
      { name: 'Full Body Package', price: '€280', sessions: 'per session' },
    ],
  },
  {
    category: 'Skin Rejuvenation',
    icon: '◈',
    items: [
      { name: 'Microneedling (face)', price: '€150', sessions: 'per session' },
      { name: 'Chemical Peel', price: '€90', sessions: 'per session' },
      { name: 'LED Light Therapy', price: '€60', sessions: 'per session' },
      { name: 'Mesotherapy', price: '€180', sessions: 'per session' },
      { name: 'RF Skin Tightening (face)', price: '€140', sessions: 'per session' },
      { name: 'RF Skin Tightening (body)', price: '€160', sessions: 'per session' },
    ],
  },
  {
    category: 'Facial Treatments',
    icon: '❋',
    items: [
      { name: 'Signature Facial', price: '€85', sessions: '75 min' },
      { name: 'Anti-Ageing Facial', price: '€110', sessions: '90 min' },
      { name: 'Brightening Facial', price: '€95', sessions: '75 min' },
      { name: 'Hydra Facial', price: '€120', sessions: '60 min' },
      { name: 'Back Facial', price: '€90', sessions: '60 min' },
    ],
  },
  {
    category: 'Brow & Lash',
    icon: '◇',
    items: [
      { name: 'Brow Lamination', price: '€60', sessions: '45 min' },
      { name: 'Brow Tint & Shape', price: '€30', sessions: '30 min' },
      { name: 'Lash Lift & Tint', price: '€75', sessions: '60 min' },
      { name: 'Lash Tint', price: '€25', sessions: '20 min' },
      { name: 'Brow Lam + Lash Lift Combo', price: '€120', sessions: '90 min' },
    ],
  },
];

const packages = [
  {
    name: 'Starter',
    subtitle: 'Great for first-timers',
    price: '€199',
    period: 'package',
    includes: [
      '3 × Laser Hair Removal sessions (1 area)',
      '1 × Signature Facial',
      'Personalised aftercare plan',
      'Priority booking',
    ],
    highlight: false,
  },
  {
    name: 'Glow',
    subtitle: 'Most popular',
    price: '€399',
    period: 'package',
    includes: [
      '6 × Laser Hair Removal sessions (1 area)',
      '3 × Signature Facials',
      '1 × Chemical Peel',
      'Skin health assessment',
      'Home care product recommendations',
      'Priority booking',
    ],
    highlight: true,
  },
  {
    name: 'Prestige',
    subtitle: 'Complete transformation',
    price: '€750',
    period: 'package',
    includes: [
      '6 × Laser Hair Removal sessions (2 areas)',
      '6 × Treatments of your choice',
      '1 × Microneedling session',
      'Full skin analysis',
      'Tailored skincare regime',
      'Quarterly skin reviews',
      'VIP priority booking',
    ],
    highlight: false,
  },
];

export default function PricesPage() {
  return (
    <>
      <section className="page-hero bg-[#F4EFE8] overflow-hidden">
        <div className="absolute inset-y-0 right-0 hidden md:block w-[34%] opacity-35">
          <Image src={olenaImg} alt="" fill sizes="34vw" className="object-cover object-top" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#F4EFE8]/30 via-[#F4EFE8]/70 to-[#F4EFE8]" />
        </div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 40% 60%, rgba(201,168,76,0.15) 0%, transparent 60%)' }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            Transparent Pricing
          </p>
          <h1 className="text-[2.8rem] sm:text-[3.5rem] text-[#2C2C2C] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Treatment <em className="text-[#2D6A4F]">Prices</em>
          </h1>
          <div className="gold-divider mb-8" />
          <p className="text-[1rem] text-[#7A7370] max-w-lg mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
            Clear, honest pricing with no hidden fees. Packages available for the best value. All prices include a complimentary skin consultation.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#F9F6F0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {pricingGroups.map((group, gi) => (
              <FadeIn key={group.category} delay={gi * 80} className="mx-4 sm:mx-0">
                <div className="border border-[#E8E0D5] bg-white rounded-xl sm:rounded-none overflow-hidden shadow-[0_10px_24px_rgba(34,34,34,0.06)]">
                  <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-[#E8E0D5] flex items-center gap-3">
                    <span className="text-xl text-[#C9A84C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{group.icon}</span>
                    <h2 className="text-[1.4rem] sm:text-2xl text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                      {group.category}
                    </h2>
                  </div>
                  <ul className="divide-y divide-[#F4EFE8]">
                    {group.items.map((item) => (
                      <li key={item.name} className="flex items-center justify-between px-6 sm:px-8 py-4 hover:bg-[#F9F6F0] transition-colors">
                        <div>
                          <p className="text-sm text-[#2C2C2C]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400 }}>{item.name}</p>
                          <p className="text-[0.62rem] text-[#7A7370] tracking-wide" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{item.sessions}</p>
                        </div>
                        <span className="text-lg text-[#2D6A4F]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={300} className="mt-10 text-center">
            <p className="text-sm text-[#7A7370] italic" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              * Prices listed are per individual session. Package rates offer significant savings — see below.
              A patch test is required prior to laser treatments at no extra charge.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-[#F4EFE8]">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
              Best Value
            </p>
            <h2 className="text-[2.4rem] sm:text-[3rem] text-[#2C2C2C] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Treatment Packages
            </h2>
            <div className="gold-divider" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 pb-3 sm:pb-6">
            {packages.map((pkg, pi) => (
              <FadeIn key={pkg.name} delay={pi * 100} className="mx-4 sm:mx-0">
                <div className={`relative flex flex-col border rounded-xl sm:rounded-none overflow-hidden h-full ${
                  pkg.highlight ? 'border-[#2D6A4F] bg-[#2D6A4F]' : 'border-[#DCD2C5] bg-[#FFFDF9] shadow-[0_12px_28px_rgba(34,34,34,0.07)]'
                }`}>
                  <div className={`p-6 sm:p-8 border-b ${pkg.highlight ? 'border-[#40916C]' : 'border-[#E8E0D5]'}`}>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className={`text-[0.58rem] tracking-[0.2em] uppercase ${pkg.highlight ? 'text-[#C9A84C]' : 'text-[#7A7370]'}`} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                        {pkg.subtitle}
                      </p>
                      {pkg.highlight && (
                        <span className="text-[0.52rem] tracking-[0.2em] uppercase text-[#C9A84C] border border-[#C9A84C]/50 px-2 py-1">
                          Popular
                        </span>
                      )}
                    </div>
                    <h3 className={`text-[1.8rem] mb-1 ${pkg.highlight ? 'text-white' : 'text-[#2C2C2C]'}`} style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mt-3">
                      <span className={`text-[2.2rem] ${pkg.highlight ? 'text-white' : 'text-[#2D6A4F]'}`} style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
                        {pkg.price}
                      </span>
                      <span className={`text-xs ${pkg.highlight ? 'text-white/60' : 'text-[#7A7370]'}`} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                        / {pkg.period}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex-1">
                    <ul className="space-y-3">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check size={14} className={`mt-0.5 shrink-0 ${pkg.highlight ? 'text-[#C9A84C]' : 'text-[#2D6A4F]'}`} />
                          <span className={`text-sm ${pkg.highlight ? 'text-white/80' : 'text-[#7A7370]'}`} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <Link
                      href="/contact"
                      className={`btn w-full ${pkg.highlight ? 'btn-gold' : 'btn-outline'}`}
                    >
                      Get This Package
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#F9F6F0] text-center">
        <FadeIn className="max-w-2xl mx-auto">
          <p className="text-[1rem] text-[#7A7370] mb-10" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
            Not sure which option suits you? Book a free consultation and I will recommend the most effective and cost-efficient plan for your goals.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Book Free Consultation <ArrowRight size={14} />
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
