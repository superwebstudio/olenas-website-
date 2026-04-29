'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import olenaImg from '@/images/olena.jpg';
import laserImg from '@/images/laser_hair_removal.jpg';
import armpitBeforeImg from '@/images/laser_hair_removal_armpit_before.jpg';
import armpitAfterImg from '@/images/laser_hair_removal_armpit_after.jpg';

type DetailCard = {
  title: string;
  body?: string;
  bullets?: string[];
};

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

function SoftCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#F8F5EF] rounded-2xl px-5 py-7 shadow-[0_10px_30px_rgba(45,106,79,0.055)] sm:px-8 sm:py-8 ${className}`}>
      {children}
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F]">
        <Check size={12} />
      </span>
      <span className="text-[0.95rem] text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.65 }}>{text}</span>
    </li>
  );
}

function TreatmentHeader({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  return (
    <FadeIn className="mb-10 sm:mb-14">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-[0.62rem] tracking-[0.3em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            {number}
          </p>
          <h2 className="text-[2.8rem] leading-none text-[#2C2C2C] sm:text-[3.5rem]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="max-w-sm text-[1rem] text-[#6D6763]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.75 }}>
            {subtitle}
          </p>
        )}
      </div>
    </FadeIn>
  );
}

function DetailCardView({ title, body, bullets }: DetailCard) {
  return (
    <SoftCard>
      <h3 className="mb-4 text-[1.65rem] leading-tight text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
        {title}
      </h3>
      {body && (
        <p className="mb-5 max-w-[68ch] text-[1rem] text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
          {body}
        </p>
      )}
      {bullets && (
        <ul className="space-y-3">
          {bullets.map((item) => <CheckItem key={item} text={item} />)}
        </ul>
      )}
    </SoftCard>
  );
}

function SummaryPanel({ title, text, areas, cta = 'Book this treatment' }: { title: string; text: string; areas?: string[]; cta?: string }) {
  return (
    <div className="lg:sticky lg:top-28">
      <h3 className="mb-5 text-[2rem] leading-tight text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
        {title}
      </h3>
      <p className="max-w-[64ch] text-[1rem] text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
        {text}
      </p>
      {areas && (
        <div className="mt-8">
          <p className="mb-4 text-[0.68rem] tracking-[0.22em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            Areas Treated
          </p>
          <ul className="space-y-3">
            {areas.map((area) => <CheckItem key={area} text={area} />)}
          </ul>
        </div>
      )}
      <Link href="/contact" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2D6A4F] px-6 py-3.5 text-[0.68rem] tracking-[0.16em] uppercase text-white transition-all duration-200 hover:bg-[#1B4332] sm:w-auto sm:justify-start sm:py-3" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
        {cta} <ArrowRight size={13} />
      </Link>
    </div>
  );
}

function ResultImage({ src, alt, label }: { src: StaticImageData; alt: string; label: string }) {
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F8F5EF]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 640px) 90vw, 280px" />
      </div>
      <p className="mt-3 text-center text-[0.62rem] tracking-[0.2em] uppercase text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>{label}</p>
    </div>
  );
}

export default function TreatmentsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero bg-white overflow-hidden">
        <div className="absolute inset-y-0 right-0 hidden md:block w-[34%] opacity-35">
          <Image src={olenaImg} alt="" fill sizes="34vw" className="object-cover object-top" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-l from-white/30 via-white/80 to-white" />
        </div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(45,106,79,0.12) 0%, transparent 60%)' }} />
        <div className="site-container relative text-center">
          <div className="relative mx-auto max-w-3xl">
          <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#2D6A4F] mb-5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            What We Offer
          </p>
          <h1 className="text-[2.8rem] sm:text-[3.5rem] text-[#2C2C2C] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Our <em className="text-[#2D6A4F]">Treatments</em>
          </h1>
          <div className="mx-auto mb-8 h-px w-12 bg-[#2D6A4F]" />
          <p className="text-[1.05rem] text-[#5F5A56] max-w-xl mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.9 }}>
            Advanced aesthetic treatments delivered with clinical expertise and a fully personalised approach.
          </p>
          </div>
        </div>
      </section>

      <section id="laser" className="bg-white pb-20 pt-14 sm:pb-28 sm:pt-20">
        <div className="site-container">
          <TreatmentHeader number="01" title="Laser Hair Removal" subtitle="Long-term reduction for smoother skin, with professional settings tailored to your skin and hair type." />

          <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <FadeIn delay={80}>
              <SummaryPanel
                title="Clinical-grade hair reduction"
                text="Laser energy is absorbed by pigment in the hair follicle, weakening its ability to grow new hair. Because hair grows in cycles, a course of sessions is needed for best results."
                areas={['Face & neck', 'Underarms', 'Bikini / Brazilian / Hollywood', 'Arms & legs', 'Chest, back & abdomen', 'Buttocks']}
              />
            </FadeIn>

            <div className="space-y-6">
              <FadeIn delay={140}>
                <DetailCardView
                  title="What changes over time"
                  bullets={[
                    'Hair becomes finer and lighter with each session',
                    'Growth slows down significantly over the course of treatment',
                    'Regrowth becomes progressively less noticeable',
                    'Long-term hair reduction, not just temporary removal',
                  ]}
                />
              </FadeIn>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FadeIn delay={190}>
                  <DetailCardView
                    title="After Treatment"
                    body="There is no downtime. Mild redness or slight swelling may appear and normally settles quickly. Treated hairs shed naturally over the following days."
                  />
                </FadeIn>
                <FadeIn delay={220}>
                  <DetailCardView
                    title="Aftercare"
                    bullets={[
                      'Avoid sun exposure and tanning beds',
                      'Avoid sauna or hot baths immediately after',
                      'Keep skin clean and hydrated',
                      'Use daily SPF on treated areas',
                    ]}
                  />
                </FadeIn>
              </div>

              <FadeIn delay={260}>
                <DetailCardView
                  title="Why Clients Choose It"
                  bullets={[
                    'Long-term hair reduction',
                    'Smoother, clearer skin',
                    'No ingrown hairs',
                    'No daily shaving or waxing',
                    'More confidence and comfort',
                  ]}
                />
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={300} className="mt-14 sm:mt-20">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-3 text-[0.62rem] tracking-[0.26em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Real Results</p>
              <h3 className="mb-10 text-[2.4rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Before &amp; After</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <ResultImage src={armpitBeforeImg} alt="Underarms before laser hair removal" label="Before" />
                <ResultImage src={armpitAfterImg} alt="Underarms after laser hair removal" label="After" />
                <ResultImage src={laserImg} alt="Laser hair removal treatment in progress" label="Treatment" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="rf-microneedling" className="bg-white pb-20 pt-14 sm:pb-28 sm:pt-20">
        <div className="site-container">
          <TreatmentHeader number="02" title="RF Microneedling" subtitle="Radiofrequency skin tightening for firmness, texture, fine lines and collagen stimulation." />

          <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <FadeIn delay={80}>
              <SummaryPanel
                title="Skin tightening without surgery"
                text="Ultra-fine needles and controlled radiofrequency energy work at precise depths to stimulate collagen and elastin. Results develop gradually as the skin regenerates."
                areas={['Face', 'Neck & jawline', 'Décolletage', 'Body areas with skin laxity']}
              />
            </FadeIn>

            <div className="space-y-6">
              <FadeIn delay={140}>
                <DetailCardView
                  title="How It Works"
                  body="The treatment improves skin structure from within, tightening and smoothing the skin over time. It is especially helpful for texture, scars, early laxity and fine lines."
                />
              </FadeIn>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[
                  { number: '49', title: 'Larger Areas', bullets: ['Improves overall skin texture', 'Tightens loose skin', 'Enhances overall skin tone'] },
                  { number: '25', title: 'Targeted Work', bullets: ['Works deeper into the skin', 'Ideal for wrinkles and acne scars', 'More focused correction'] },
                ].map((cartridge, index) => (
                  <FadeIn key={cartridge.number} delay={190 + index * 30}>
                    <SoftCard className="h-full">
                      <div className="mb-6 flex items-center gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2D6A4F] text-xl text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                          {cartridge.number}
                        </span>
                        <div>
                          <h3 className="text-[1.4rem] leading-tight text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Needle Cartridge</h3>
                          <p className="mt-1 text-[0.62rem] tracking-[0.2em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>{cartridge.title}</p>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {cartridge.bullets.map((item) => <CheckItem key={item} text={item} />)}
                      </ul>
                    </SoftCard>
                  </FadeIn>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FadeIn delay={260}>
                  <DetailCardView
                    title="Results Timeline"
                    bullets={[
                      'Initial improvement may appear within a few weeks',
                      'Full results develop around 4–8 weeks',
                      'Skin can continue improving over time',
                      'A course of sessions is recommended',
                    ]}
                  />
                </FadeIn>
                <FadeIn delay={290}>
                  <DetailCardView
                    title="Aftercare"
                    bullets={[
                      'Avoid sun exposure and use SPF daily',
                      'Avoid makeup for 24 hours',
                      'Avoid sauna, gym and hot showers for a few days',
                      'Keep skin hydrated with gentle skincare',
                    ]}
                  />
                </FadeIn>
              </div>

              <FadeIn delay={320}>
                <DetailCardView
                  title="Why Clients Choose It"
                  bullets={[
                    'Non-surgical skin tightening',
                    'Improved skin texture and tone',
                    'Reduction of fine lines and wrinkles',
                    'Effective for acne scars and uneven skin',
                    'Natural collagen stimulation',
                  ]}
                />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section id="tattoo-removal" className="bg-white pb-20 pt-14 sm:pb-28 sm:pt-20">
        <div className="site-container">
          <TreatmentHeader number="03" title="Tattoo Removal" subtitle="Laser removal for permanent makeup and small to large tattoos, including line work, colour and shading." />

          <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <FadeIn delay={80}>
              <SummaryPanel
                title="Precise laser pigment removal"
                text="Treatments are performed safely and effectively with professional laser technology. A consultation helps assess pigment depth, colour and the likely number of sessions."
                areas={['Permanent makeup', 'Small tattoos', 'Medium tattoos', 'Large tattoos', 'Line-only or shaded work']}
                cta="Book a consultation"
              />
            </FadeIn>

            <div className="space-y-4">
              {[
                { name: 'Permanent Makeup Removal', meta: '30 min', detail: 'For cosmetic tattoos including brows, liner and lips.' },
                { name: 'Small Tattoo', meta: '1–5 cm', detail: 'Precise targeting for small tattoos with minimal impact on surrounding skin.' },
                { name: 'Medium Tattoo — Line Only', meta: '6–15 cm', detail: 'Effective treatment for outline tattoos in the medium size range.' },
                { name: 'Medium Tattoo — Colour / Shading', meta: '6–15 cm', detail: 'Extended treatment for medium tattoos containing colour or shading.' },
                { name: 'Large Tattoo — Line Only', meta: '16–25 cm', detail: 'Full-coverage treatment for larger outline tattoos.' },
                { name: 'Large Tattoo — Colour / Shading', meta: '16–25 cm', detail: 'Comprehensive treatment for large coloured or shaded tattoos.' },
              ].map((item, index) => (
                <FadeIn key={item.name} delay={130 + index * 40}>
                  <div className="rounded-2xl bg-[#F8F5EF] px-5 py-6 transition-transform duration-200 hover:-translate-y-0.5 sm:p-7">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="text-[1.45rem] leading-tight text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{item.name}</h3>
                      <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>{item.meta}</p>
                    </div>
                    <p className="mt-2 max-w-[64ch] text-[0.95rem] text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.75 }}>{item.detail}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="carbon-peeling" className="bg-white pb-20 pt-14 sm:pb-28 sm:pt-20">
        <div className="site-container">
          <TreatmentHeader number="04" title="Carbon Peeling" subtitle="Also known as the Hollywood Facial Peel, designed for clearer pores, smoother texture and instant radiance." />

          <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <FadeIn delay={80}>
              <SummaryPanel
                title="Fresh, polished skin"
                text="A non-invasive laser treatment that deeply cleanses pores, helps reduce oiliness and improves skin radiance with zero downtime."
                areas={['Full face', 'Neckline', 'Full face + neckline']}
              />
            </FadeIn>

            <div className="space-y-6">
              <FadeIn delay={140}>
                <DetailCardView
                  title="Why Clients Choose It"
                  bullets={[
                    'Instant radiance and glow',
                    'Deep pore cleansing',
                    'Reduced oiliness and blackheads',
                    'Improved skin texture and tone',
                    'Zero downtime',
                  ]}
                />
              </FadeIn>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  { title: 'Full Face', text: 'Complete carbon peel treatment for a radiant, refreshed complexion.' },
                  { title: 'Neckline', text: 'Targeted peel for the neck and décolletage area.' },
                  { title: 'Face + Neckline', text: 'Combined treatment for a complete, glowing result.' },
                ].map((item, index) => (
                  <FadeIn key={item.title} delay={190 + index * 40}>
                    <SoftCard className="h-full">
                      <h3 className="mb-3 text-[1.4rem] leading-tight text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{item.title}</h3>
                      <p className="text-[0.95rem] text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.75 }}>{item.text}</p>
                    </SoftCard>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F5EF] py-16 text-center sm:py-24">
        <div className="site-container">
          <FadeIn className="mx-auto max-w-2xl">
          <p className="mb-4 text-[0.62rem] tracking-[0.28em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Need Advice?</p>
          <h2 className="mb-6 text-[2.8rem] leading-none text-[#2C2C2C] sm:text-[3.4rem]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            Not Sure Which Treatment?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[1rem] text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
            Book a free consultation and I will guide you to the treatment plan that best fits your skin, goals and schedule.
          </p>
          <Link href="/contact" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2D6A4F] px-7 py-3.5 text-[0.7rem] tracking-[0.16em] uppercase text-white transition-all duration-200 hover:bg-[#1B4332] sm:w-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            Book Free Consultation <ArrowRight size={14} />
          </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
