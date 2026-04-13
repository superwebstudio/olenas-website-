'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
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

const categories = [
  {
    id: 'laser',
    label: 'Laser Hair Removal',
    accent: '#2D6A4F',
    icon: '✦',
    headline: 'Smooth, Lasting Results',
    intro: 'Our medical-grade laser technology targets hair follicles precisely, delivering permanent hair reduction safely on all skin tones. Say goodbye to razors and waxing.',
    treatments: [
      { name: 'Full Leg Laser', duration: '60 min', detail: 'Complete coverage from ankle to hip with our advanced diode laser.' },
      { name: 'Underarm Laser', duration: '15 min', detail: 'Fast, effective treatment for underarm hair. Minimal discomfort.' },
      { name: 'Bikini / Brazilian', duration: '20–30 min', detail: 'Full bikini line or intimate area — discreet and professional.' },
      { name: 'Face & Neck', duration: '20–30 min', detail: 'Upper lip, chin, sideburns and neck — precise and gentle.' },
      { name: 'Full Body Package', duration: '120 min', detail: 'Comprehensive full-body treatment with personalised settings for each area.' },
    ],
  },
  {
    id: 'rejuvenation',
    label: 'Skin Rejuvenation',
    accent: '#40916C',
    icon: '◈',
    headline: 'Restore Your Radiance',
    intro: 'Advanced skin treatments designed to address texture, tone, pigmentation and signs of ageing — revealing a brighter, more youthful complexion.',
    treatments: [
      { name: 'Microneedling', duration: '60 min', detail: 'Stimulates collagen production for firmer, smoother skin. Great for scars and pores.' },
      { name: 'Chemical Peel', duration: '45 min', detail: 'AHA/BHA peels to resurface skin, improve tone and tackle dullness and hyperpigmentation.' },
      { name: 'LED Light Therapy', duration: '30 min', detail: 'Non-invasive treatment that accelerates healing, reduces redness and boosts collagen.' },
      { name: 'Mesotherapy', duration: '45 min', detail: 'Microinjections of vitamins and hyaluronic acid to nourish and hydrate deep layers.' },
      { name: 'Radio Frequency Tightening', duration: '60 min', detail: 'Non-surgical skin tightening for face and body using targeted RF energy.' },
    ],
  },
  {
    id: 'facials',
    label: 'Facial Treatments',
    accent: '#C9A84C',
    icon: '❋',
    headline: 'Personalised Skin Care',
    intro: 'Bespoke facial protocols designed around your exact skin type and concerns. From deep cleansing to anti-ageing, every facial is uniquely tailored.',
    treatments: [
      { name: 'Signature Facial', duration: '75 min', detail: 'Our signature skin analysis and treatment — includes cleanse, exfoliation, mask and massage.' },
      { name: 'Anti-Ageing Facial', duration: '90 min', detail: 'Targets fine lines, loss of firmness and uneven texture with peptide-rich formulas.' },
      { name: 'Brightening Facial', duration: '75 min', detail: 'Vitamin C and enzyme-based treatment for glowing, even-toned skin.' },
      { name: 'Hydra Facial', duration: '60 min', detail: 'Deep cleanse, extraction and hydration in one powerful multi-step treatment.' },
      { name: 'Back Facial', duration: '60 min', detail: 'Deep cleansing facial adapted for back — ideal for breakouts, dryness or sun damage.' },
    ],
  },
  {
    id: 'brow',
    label: 'Brow & Lash',
    accent: '#7A7370',
    icon: '◇',
    headline: 'Frame Your Features',
    intro: 'Expertly shaped and styled brows and lashes to perfectly frame your face. From subtle definition to a bold, dramatic look.',
    treatments: [
      { name: 'Brow Lamination', duration: '45 min', detail: 'Lifts and sets brow hairs for a full, defined look that lasts 6–8 weeks.' },
      { name: 'Lash Lift & Tint', duration: '60 min', detail: 'Curls, lifts and darkens natural lashes — mascara-free results for up to 8 weeks.' },
      { name: 'Brow Tint & Shape', duration: '30 min', detail: 'Wax, thread and tint for perfectly defined, polished brows.' },
      { name: 'Lash Tint', duration: '20 min', detail: 'Darkens and defines natural lashes with a semi-permanent tint that lasts 3–4 weeks.' },
    ],
  },
];

export default function TreatmentsPage() {
  return (
    <>
      <section className="page-hero bg-[#F4EFE8] overflow-hidden">
        <div className="absolute inset-y-0 right-0 hidden md:block w-[34%] opacity-35">
          <Image src={olenaImg} alt="" fill sizes="34vw" className="object-cover object-top" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#F4EFE8]/30 via-[#F4EFE8]/70 to-[#F4EFE8]" />
        </div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(45,106,79,0.12) 0%, transparent 60%)' }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            What We Offer
          </p>
          <h1 className="text-[2.8rem] sm:text-[3.5rem] text-[#2C2C2C] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Our <em className="text-[#2D6A4F]">Treatments</em>
          </h1>
          <div className="gold-divider mb-8" />
          <p className="text-[1rem] text-[#7A7370] max-w-lg mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
            Advanced aesthetic and beauty treatments, all delivered with clinical expertise and a personalised approach.
          </p>
        </div>
      </section>

      {categories.map((cat, ci) => (
        <section key={cat.id} id={cat.id} className={`section-padding ${ci % 2 === 0 ? 'bg-[#F9F6F0]' : 'bg-[#F4EFE8]'}`}>
          <div className="max-w-6xl mx-auto">
            <FadeIn className="flex flex-col sm:flex-row sm:items-end gap-4 mb-14">
              <div>
                <span className="text-3xl text-[#C9A84C] mr-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{cat.icon}</span>
                <h2 className="inline text-[2.2rem] sm:text-[2.8rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {cat.label}
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <FadeIn delay={100} className="lg:col-span-1">
                <div className="sticky top-28">
                  <p className="text-[0.62rem] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, color: cat.accent }}>
                    Overview
                  </p>
                  <h3 className="text-2xl text-[#2C2C2C] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                    {cat.headline}
                  </h3>
                  <p className="text-sm text-[#7A7370] mb-8" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.8 }}>
                    {cat.intro}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[0.68rem] tracking-[0.15em] uppercase border-b pb-0.5 transition-colors duration-200"
                    style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, color: cat.accent, borderColor: cat.accent + '60' }}
                  >
                    Book this treatment <ArrowRight size={12} />
                  </Link>
                </div>
              </FadeIn>

              <div className="lg:col-span-2 space-y-4">
                {cat.treatments.map((t, ti) => (
                  <FadeIn key={t.name} delay={150 + ti * 80}>
                    <div className="group relative flex gap-3 p-5 sm:p-6 bg-white border border-[#E8E0D5] hover:border-[#2D6A4F]/30 transition-all duration-300 rounded-xl sm:rounded-none">
                      <div className="absolute left-0 top-0 h-full w-1 bg-[#2D6A4F]/0 transition-colors duration-300 group-hover:bg-[#2D6A4F]/80" />
                      <div className="shrink-0 flex items-center justify-center w-8 h-8 border border-[#E8E0D5] text-[#C9A84C] rounded-md sm:rounded-none">
                        <Sparkles size={12} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <h4 className="text-lg text-[#2C2C2C] group-hover:text-[#2D6A4F] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                            {t.name}
                          </h4>
                          <span className="flex items-center gap-1 text-[0.62rem] tracking-widest uppercase text-[#C9A84C] shrink-0" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                            <Clock size={11} /> {t.duration}
                          </span>
                        </div>
                        <p className="text-sm text-[#7A7370]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{t.detail}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section-padding bg-[#2D6A4F] text-center">
        <FadeIn className="max-w-xl mx-auto">
          <h2 className="text-[2.4rem] sm:text-[3rem] text-white mb-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Not Sure Which Treatment?
          </h2>
          <div className="gold-divider mb-8" />
          <p className="text-[1rem] mb-10" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.65)' }}>
            Book a free skin consultation and I will guide you to the perfect treatment plan for your goals.
          </p>
          <Link href="/contact" className="btn btn-gold">
            Book Free Consultation <ArrowRight size={14} />
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
