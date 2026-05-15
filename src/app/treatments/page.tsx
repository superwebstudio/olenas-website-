'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Heart, Shield, Sparkles } from 'lucide-react';
import frLifting1 from '@/images/FR-lifting-1.jpeg';
import frLifting2 from '@/images/FR-lifting-2.jpeg';
import rfLifting1 from '@/images/RF_lifting_1.jpeg';
import rfLifting2 from '@/images/RF_lifting_2.jpeg';
import rfLifting3 from '@/images/RF_lifting_3.jpeg';
import laserHair1 from '@/images/laser-hair-removal-1.jpeg';
import laserHair2 from '@/images/laser-hair-removal-2.jpeg';
import laserHair3 from '@/images/laser-hair-removal-3.jpeg';
import skinBefore from '@/images/skin_base_before.jpeg';
import skinAfter from '@/images/skin_base_after.jpeg';

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
    <div className={`rounded-2xl bg-white px-5 py-7 shadow-[0_10px_30px_rgba(45,106,79,0.08)] sm:px-8 sm:py-8 ${className}`}>
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
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-3 flex items-center gap-2 text-[0.62rem] tracking-[0.3em] uppercase text-[#C9A84C]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            <span className="text-[1rem] leading-none" aria-hidden>✦</span>
            <span>{number}</span>
          </p>
          <h2 className="text-[2.8rem] leading-none text-[#2C2C2C] sm:text-[3.5rem]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="max-w-2xl text-[1rem] text-[#6D6763]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.75 }}>
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
      <h3 className="mb-4 flex items-start gap-2 text-[1.65rem] leading-tight text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
        <span className="mt-1 text-[#C9A84C]" aria-hidden>✦</span>
        <span>{title}</span>
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
      <h3 className="mb-5 flex items-start gap-2 text-[2rem] leading-tight text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
        <span className="text-[#C9A84C]" aria-hidden>✦</span>
        <span>{title}</span>
      </h3>
      <p className="max-w-[64ch] text-[1rem] text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
        {text}
      </p>
      {areas && (
        <div className="mt-8">
          <p className="mb-4 text-[0.68rem] tracking-[0.22em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            Areas &amp; focus
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

function ResultImage({
  src,
  alt,
  label,
  aspectClassName = 'aspect-[4/5]',
  wrapperClassName = '',
  sizes = '(max-width: 640px) 90vw, min(896px, 90vw)',
}: {
  src: StaticImageData;
  alt: string;
  label: string;
  aspectClassName?: string;
  wrapperClassName?: string;
  sizes?: string;
}) {
  return (
    <div className={wrapperClassName}>
      <div className={`relative overflow-hidden rounded-2xl bg-[#F8F5EF] ${aspectClassName}`}>
        <Image src={src} alt={alt} fill className="object-cover object-center" sizes={sizes} />
      </div>
      <p className="mt-3 text-center text-[0.62rem] tracking-[0.2em] uppercase text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>{label}</p>
    </div>
  );
}

const trustItems = [
  { label: 'Advanced Technology', Icon: Sparkles },
  { label: 'Certified Specialist', Icon: Shield },
  { label: 'Personalised Care', Icon: Heart },
] as const;

export default function TreatmentsPage() {
  return (
    <>
      <section className="page-hero bg-[#1B4332]">
        <div className="site-container text-center">
          <p className="mb-5 text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            What We Offer
          </p>
          <h1 className="mb-6 text-[2.8rem] text-[#F9F6F0] sm:text-[3.5rem]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Our <em className="text-[#E8CF7A] not-italic">Treatments</em>
          </h1>
          <div className="gold-divider mb-8 opacity-90" />
          <p className="mx-auto max-w-xl text-[1.05rem] text-[#c8e6d4]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.9 }}>
            Microdermabrasion, RF microneedling and laser hair removal — personalised protocols and packages (see{' '}
            <Link href="/prices" className="underline decoration-[#E8CF7A]/50 underline-offset-4 hover:decoration-[#E8CF7A]">Prices</Link>
            ). No tattoo removal.
          </p>
        </div>
      </section>

      <section className="border-y border-[#40916C]/30 bg-[#2D6A4F] py-10">
        <div className="site-container">
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16 lg:gap-24">
            {trustItems.map(({ label, Icon }) => (
              <div key={label} className="flex items-center gap-3 text-[#F9F6F0]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F9F6F0]/10 text-[#E8CF7A] ring-1 ring-[#C9A84C]/35">
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <span className="text-[0.65rem] tracking-[0.2em] uppercase" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, color: '#F9F6F0' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Microdermabrasion / Skin Base ── */}
      <section id="skin-base-treatment" className="bg-[#F9F6F0] pb-20 pt-14 sm:pb-28 sm:pt-20">
        <div className="site-container">
          <TreatmentHeader
            number="01"
            title="Microdermabrasion & Skin Base"
            subtitle="Professional exfoliation and skin resurfacing to refine texture, brighten dullness and prep skin for RF or maintenance — aligned with our £60 single session on the Prices page."
          />

          <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <FadeIn delay={80}>
              <SummaryPanel
                title="Clarity without downtime"
                text="Microdermabrasion removes dead cells and smooths the surface for fresher-looking skin. Ideal on its own, before RF microneedling, or inside our Essential Skin Reset and course packages."
                areas={['Uneven texture & congestion', 'Fine dryness lines', 'Dull or tired-looking skin', 'Skin ready for collagen treatments']}
              />
            </FadeIn>

            <div className="space-y-6">
              <FadeIn delay={140}>
                <DetailCardView
                  title="What to expect"
                  bullets={[
                    'Comfortable treatment length with visible freshness afterwards',
                    'Plan tailored to your skin type and goals',
                  ]}
                />
              </FadeIn>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FadeIn delay={190}>
                  <DetailCardView
                    title="After your visit"
                    body="Mild warmth or pinkness usually settles quickly. Your therapist may recommend simple home care until your next visit."
                  />
                </FadeIn>
                <FadeIn delay={220}>
                  <DetailCardView
                    title="Aftercare"
                    bullets={[
                      'Use SPF daily',
                      'Avoid harsh scrubs until advised',
                    ]}
                  />
                </FadeIn>
              </div>
              <FadeIn delay={260}>
                <DetailCardView
                  title="Why clients choose it"
                  bullets={[
                    'Smoother, brighter-looking skin',
                    'Pairs perfectly with RF microneedling packages',
                  ]}
                />
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={300} className="mt-14 sm:mt-20">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-3 flex items-center justify-center gap-2 text-[0.62rem] tracking-[0.26em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                <span className="text-[#C9A84C]" aria-hidden>✦</span>
                Real Results
              </p>
              <h3 className="mb-10 text-[2.4rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Before &amp; After</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <ResultImage src={skinBefore} alt="Skin base treatment — before" label="Before treatment" aspectClassName="aspect-[4/3]" sizes="(max-width: 640px) 100vw, 50vw" />
                <ResultImage src={skinAfter} alt="Skin base treatment — after" label="After treatment" aspectClassName="aspect-[4/3]" sizes="(max-width: 640px) 100vw, 50vw" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── RF Microneedling (full Rod copy) ── */}
      <section id="rf-microneedling" className="border-t border-[#E8E0D5] bg-[#F4EFE8] pb-20 pt-14 sm:pb-28 sm:pt-20">
        <div className="site-container">
          <TreatmentHeader
            number="02"
            title="RF Microneedling"
            subtitle="Radiofrequency microneedling is an advanced, non-surgical treatment designed to improve skin firmness, texture and overall appearance. By combining microneedling with RF energy, collagen production is stimulated for tightening and a more youthful look over time."
          />

          {/* Consultation notice */}
          <FadeIn className="mb-12">
            <div
              className="flex items-start gap-4 rounded-2xl border border-[#C9A84C]/35 bg-[#FBF8F1] px-6 py-5 shadow-[0_4px_18px_rgba(201,168,76,0.1)]"
            >
              <span className="mt-0.5 shrink-0 text-[1.2rem] text-[#C9A84C]" aria-hidden>✦</span>
              <div>
                <p className="mb-1 text-[0.65rem] tracking-[0.22em] uppercase text-[#C9A84C]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                  Consultation required
                </p>
                <p className="text-[0.95rem] text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.75 }}>
                  A consultation is required prior to RF Microneedling treatment. This allows us to assess your skin, discuss your goals, and create a personalised plan to ensure the safest and most effective results for you.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <FadeIn delay={80}>
              <SummaryPanel
                title="Skin tightening without surgery"
                text="Ultra-fine needles deliver controlled radiofrequency at precise depths. Results develop gradually as the skin regenerates."
                areas={['Face', 'Neck', 'Jawline', 'Décolletage', 'Body areas with skin laxity']}
              />
            </FadeIn>

            <div className="space-y-10 sm:space-y-12">
              <FadeIn delay={140}>
                <DetailCardView
                  title="How it works"
                  body="The treatment uses ultra-fine needles combined with controlled radiofrequency energy to penetrate the skin at precise depths."
                  bullets={[
                    'Stimulates natural collagen and elastin production',
                    'Improves skin structure from within',
                    'Tightens and smooths the skin over time',
                  ]}
                />
              </FadeIn>
              <FadeIn delay={165}>
                <p className="text-[0.95rem] text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.75 }}>
                  Results are not instant — they build as the skin regenerates and rebuilds.
                </p>
              </FadeIn>

              <FadeIn delay={175}>
                <p className="flex items-center gap-2 text-[0.65rem] tracking-[0.24em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                  <span className="text-[#C9A84C]" aria-hidden>✦</span>
                  Needle cartridges: 49 vs 25
                </p>
              </FadeIn>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FadeIn delay={190}>
                  <SoftCard className="h-full">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2D6A4F] text-xl text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>49</span>
                      <div>
                        <h3 className="text-[1.35rem] leading-tight text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>49-needle cartridge</h3>
                        <p className="mt-1 text-[0.62rem] tracking-[0.2em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Larger areas</p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      <CheckItem text="Improves skin texture" />
                      <CheckItem text="Tightens loose skin" />
                      <CheckItem text="Enhances overall tone" />
                    </ul>
                  </SoftCard>
                </FadeIn>
                <FadeIn delay={220}>
                  <SoftCard className="h-full">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2D6A4F] text-xl text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>25</span>
                      <div>
                        <h3 className="text-[1.35rem] leading-tight text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>25-needle cartridge</h3>
                        <p className="mt-1 text-[0.62rem] tracking-[0.2em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Targeted work</p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      <CheckItem text="Works deeper into the skin" />
                      <CheckItem text="Ideal for wrinkles, acne scars and targeted zones" />
                      <CheckItem text="More focused correction" />
                    </ul>
                  </SoftCard>
                </FadeIn>
              </div>

              <FadeIn delay={235}>
                <DetailCardView
                  title="Personalised planning"
                  body="Using the correct cartridge allows for a fully personalised treatment plan based on your area and skin condition."
                />
              </FadeIn>

              <FadeIn delay={260}>
                <DetailCardView
                  title="What to expect after treatment"
                  body="Some downtime is expected while the skin recovers. You may experience redness, mild swelling and sensitivity — usually improving within a few days. Skin may feel slightly rough or tight during healing; this is normal during regeneration."
                />
              </FadeIn>

              <FadeIn delay={280}>
                <DetailCardView
                  title="Aftercare guidelines"
                  bullets={[
                    'Avoid sun exposure and always use SPF',
                    'Do not apply makeup for 24 hours',
                    'Avoid heat (sauna, gym, very hot showers) for a few days',
                    'Keep skin hydrated with gentle skincare',
                  ]}
                />
              </FadeIn>

              <FadeIn delay={300}>
                <DetailCardView
                  title="When will you see results?"
                  bullets={[
                    'Initial improvement may appear within a few weeks',
                    'Full results often emerge as collagen rebuilds (around 4–8 weeks)',
                    'Skin can continue to improve over time',
                  ]}
                />
              </FadeIn>

              <FadeIn delay={315}>
                <DetailCardView
                  title="Number of sessions"
                  bullets={[
                    'A course of treatments is usually recommended for optimal results',
                    'Maintenance sessions may be advised',
                    'Consistency supports long-lasting improvement',
                  ]}
                />
              </FadeIn>

              <FadeIn delay={330}>
                <DetailCardView
                  title="Why clients choose RF microneedling"
                  bullets={[
                    'Non-surgical skin tightening',
                    'Improved texture and tone',
                    'Fine lines and wrinkles',
                    'Acne scars and uneven skin',
                    'Natural collagen stimulation',
                  ]}
                />
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={340} className="mt-14 sm:mt-20">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-3 flex items-center justify-center gap-2 text-[0.62rem] tracking-[0.26em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                <span className="text-[#C9A84C]" aria-hidden>✦</span>
                Real Results
              </p>
              <h3 className="mb-10 text-[2.4rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Treatment &amp; Before / After</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <ResultImage src={frLifting1} alt="FR Lifting — treatment in progress" label="Treatment in progress" aspectClassName="aspect-[4/3]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <ResultImage src={frLifting2} alt="FR Microneedle device" label="Microneedle device" aspectClassName="aspect-[4/3]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <ResultImage src={rfLifting3} alt="RF Lifting — skin glow after" label="After RF Lifting" aspectClassName="aspect-[4/3]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <ResultImage src={rfLifting1} alt="RF Lifting — immediately after" label="Immediately after treatment" aspectClassName="aspect-[4/3]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <ResultImage src={rfLifting2} alt="RF Lifting — after treatment" label="After treatment" aspectClassName="aspect-[4/3]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Laser hair removal (Rod copy) — no tattoo removal ── */}
      <section id="laser-hair-removal" className="border-t border-[#E8E0D5] bg-[#F9F6F0] pb-20 pt-14 sm:pb-28 sm:pt-20">
        <div className="site-container">
          <TreatmentHeader
            number="03"
            title="Laser Hair Removal"
            subtitle="One of the most effective long-term options for reducing unwanted hair. Clinical-grade technology targets follicles with controlled laser energy. Always performed by a trained professional for safety and best results."
          />

          <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <FadeIn delay={80}>
              <SummaryPanel
                title="Gradual, lasting reduction"
                text="Laser energy is absorbed by pigment in the hair follicle, weakening its ability to produce new hair. Hair grows in cycles, so multiple sessions are needed to treat follicles effectively."
                areas={['Face & neck', 'Underarms', 'Bikini line', 'Arms & legs', 'Back & chest']}
              />
            </FadeIn>

            <div className="space-y-6">
              <FadeIn delay={140}>
                <DetailCardView
                  title="How it works"
                  bullets={[
                    'Hair becomes finer and lighter over time',
                    'Growth slows significantly',
                    'Regrowth becomes less noticeable — long-term reduction, not just temporary removal',
                  ]}
                />
              </FadeIn>
              <FadeIn delay={180}>
                <DetailCardView
                  title="What to expect after treatment"
                  body="No downtime — you can usually return to routine straight away. Mild redness or slight swelling can occur and typically settle quickly. A cool compress can soothe the skin."
                />
              </FadeIn>
              <FadeIn delay={210}>
                <DetailCardView
                  title="Aftercare guidelines"
                  bullets={[
                    'Avoid sun exposure and tanning beds',
                    'Avoid heat treatments (sauna, hot baths) immediately after',
                    'Keep skin clean and hydrated; daily SPF once recovered',
                  ]}
                />
              </FadeIn>
              <FadeIn delay={240}>
                <DetailCardView
                  title="Hair shedding — what is normal?"
                  body="After treatment, hairs may appear to “grow” — often this is shedding. Treated hairs shed over days or weeks and can be mistaken for regrowth. This is normal."
                />
              </FadeIn>
              <FadeIn delay={270}>
                <DetailCardView
                  title="Number of sessions"
                  bullets={[
                    'A course of treatments for best results',
                    'Maintenance sessions may help keep skin smooth',
                  ]}
                />
              </FadeIn>
              <FadeIn delay={300}>
                <DetailCardView
                  title="Why clients choose laser hair removal"
                  bullets={[
                    'Long-term hair reduction',
                    'Smoother, clearer-looking skin',
                    'Fewer ingrown hairs',
                    'Less reliance on daily shaving or waxing',
                    'More confidence and comfort',
                  ]}
                />
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={320} className="mt-14">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-3 flex items-center justify-center gap-2 text-[0.62rem] tracking-[0.26em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                <span className="text-[#C9A84C]" aria-hidden>✦</span>
                Real Results
              </p>
              <h3 className="mb-10 text-[2.4rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Treatment &amp; Before / After</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <ResultImage src={laserHair2} alt="Laser hair removal — before & after back" label="Before & after" aspectClassName="aspect-[4/3]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <ResultImage src={laserHair3} alt="Laser hair removal — before & after face" label="Before & after" aspectClassName="aspect-[4/3]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <ResultImage src={laserHair1} alt="Laser hair removal — armpit before & after" label="3 weeks after" aspectClassName="aspect-[4/3]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding border-t border-[#2D6A4F]/15 bg-[#2D6A4F] text-center">
        <div className="site-container text-center">
          <FadeIn className="mx-auto w-full max-w-2xl text-center">
            <p className="mb-5 text-[0.62rem] tracking-[0.28em] uppercase text-[#E8CF7A]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Need Advice?</p>
            <h2 className="mb-8 text-[2.8rem] leading-tight text-[#F9F6F0] sm:text-[3.4rem]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
              Not Sure Which Treatment?
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-[1rem] text-[#c8e6d4]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
              Book a consult — we&apos;ll match singles or a package to your skin and goals (see{' '}
              <Link href="/prices" className="underline decoration-[#c8e6d4]/40 underline-offset-4 hover:decoration-[#F9F6F0]">Prices</Link>
              ).
            </p>
            <Link href="/contact" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F9F6F0] px-7 py-3.5 text-[0.7rem] tracking-[0.16em] uppercase text-[#1B4332] transition-all duration-200 hover:bg-[#E8CF7A] sm:w-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
              Book Free Consultation <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
