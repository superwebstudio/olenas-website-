'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import olenaImg from '@/images/olena.png';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
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

const credentials = [
  'Certified Aesthetic Therapist',
  'Advanced Laser Technician',
  'Skin Health Specialist',
  'Ongoing CPD — latest techniques & technologies',
  'Member of the Irish Beauty Industry Association',
];

const values = [
  { title: 'Safety First', text: 'Every treatment follows strict clinical protocols. Your safety and wellbeing are my highest priority.' },
  { title: 'Personalised Approach', text: 'No two skins are the same. I take time to understand your unique concerns before recommending any treatment.' },
  { title: 'Honest Advice', text: 'I will only recommend treatments that are right for you — no unnecessary upselling, ever.' },
  { title: 'Lasting Results', text: 'My goal is not just to treat the symptom but to improve your skin health for the long term.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero bg-[#F4EFE8] overflow-hidden">
        <div className="absolute inset-y-0 right-0 hidden md:block w-[34%] opacity-35">
          <Image src={olenaImg} alt="" fill sizes="34vw" className="object-cover object-top" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#F4EFE8]/30 via-[#F4EFE8]/70 to-[#F4EFE8]" />
        </div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(45,106,79,0.1) 0%, transparent 60%)' }} />
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full border border-[#C9A84C]/15" />
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            Get to Know Me
          </p>
          <h1 className="text-[2.8rem] sm:text-[3.5rem] text-[#2C2C2C] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            About <em className="text-[#2D6A4F]">Olena</em>
          </h1>
          <div className="gold-divider mb-8" />
          <p className="text-[1rem] text-[#7A7370] max-w-lg mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
            Specialist in advanced aesthetic treatments with a passion for helping every client feel their very best.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#F9F6F0]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeIn>
            <div className="relative">
              <div className="aspect-[3/4] relative overflow-hidden border border-[#E8E0D5] shadow-[0_18px_44px_rgba(35,35,35,0.08)]">
                <Image src={olenaImg} alt="Olena — Aesthetic Specialist" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#C9A84C] z-10" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#C9A84C] z-10" />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-[#2D6A4F] p-6 text-white hidden sm:block z-10">
                <p className="text-3xl mb-0.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>8+</p>
                <p className="text-[0.6rem] tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Years of Expertise</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
              My Story
            </p>
            <h2 className="text-[2.4rem] sm:text-[3rem] text-[#2C2C2C] mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              A Lifelong Passion for<br /><em className="text-[#2D6A4F]">Skin Wellness</em>
            </h2>
            <div className="gold-divider mb-8" style={{ marginLeft: 0 }} />
            <div className="space-y-5 mb-10">
              <p className="text-[1rem] text-[#7A7370]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
                My journey into aesthetics began over eight years ago, driven by a desire to help people feel truly comfortable and confident in their own skin. What started as a fascination with skincare science has grown into a career dedicated to advanced, results-driven treatments.
              </p>
              <p className="text-[1rem] text-[#7A7370]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
                I trained extensively across Ireland and Europe, completing certifications in laser technology, skin health, and aesthetic therapies. I continually invest in furthering my knowledge to ensure my clients receive the very best care.
              </p>
              <p className="text-[1rem] text-[#7A7370]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
                Today, my practice blends clinical precision with a warm, personal touch. Every client who walks through my door is treated as an individual — because great skin care begins with truly listening.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Book a Consultation <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-[#F4EFE8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
              Qualifications
            </p>
            <h2 className="text-[2.2rem] sm:text-[2.8rem] text-[#2C2C2C] mb-8 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Trained to the<br />Highest Standards
            </h2>
            <ul className="space-y-4 bg-[#F9F6F0] border border-[#E8E0D5] p-6 sm:p-10">
              {credentials.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#2D6A4F] mt-0.5 shrink-0" />
                  <span className="text-[#7A7370] text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{c}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={150}>
            <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
              My Values
            </p>
            <div className="space-y-6 bg-[#F9F6F0] border border-[#E8E0D5] p-6 sm:p-10">
              {values.map((v, i) => (
                <div key={v.title} className="flex gap-4">
                  <span className="text-[#C9A84C] text-lg mt-0.5 shrink-0" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="text-base text-[#2C2C2C] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{v.title}</h4>
                    <p className="text-sm text-[#7A7370] leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-[#2C2C2C] text-center">
        <FadeIn className="max-w-xl mx-auto">
          <h2 className="text-[2.4rem] sm:text-[3rem] text-[#F9F6F0] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Let&apos;s Work Together
          </h2>
          <div className="gold-divider mb-8" />
          <p className="text-[1rem] text-[#b0a89e] mb-10" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
            Ready to start your skin transformation? Book a consultation and let&apos;s create a plan tailored just for you.
          </p>
          <Link href="/contact" className="btn btn-gold">
            Book Now <ArrowRight size={14} />
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
