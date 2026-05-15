'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { StaticImageData } from 'next/image';
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

type GalleryItem = {
  id: number;
  label: string;
  sub: string;
  size: 'tall' | 'wide' | 'normal';
  src: StaticImageData;
};

type GalleryCategory = {
  title: string;
  subtitle: string;
  items: GalleryItem[];
};

const galleryCategories: GalleryCategory[] = [
  {
    title: 'RF Microneedling & FR Lifting',
    subtitle: 'Radiofrequency microneedling results — real clients, real treatment progress.',
    items: [
      { id: 101, label: 'FR Lifting', sub: 'Treatment in progress', size: 'wide', src: frLifting1 },
      { id: 102, label: 'FR Lifting', sub: 'Micro Needle device', size: 'wide', src: frLifting2 },
      { id: 103, label: 'RF Lifting', sub: 'Immediately after', size: 'normal', src: rfLifting1 },
      { id: 104, label: 'RF Lifting', sub: 'After treatment', size: 'normal', src: rfLifting2 },
      { id: 105, label: 'RF Lifting', sub: 'Skin glow result', size: 'wide', src: rfLifting3 },
    ],
  },
  {
    title: 'Skin Base Treatment',
    subtitle: 'Microdermabrasion and skin base treatment — before and after comparisons.',
    items: [
      { id: 201, label: 'Skin Base', sub: 'Before treatment', size: 'wide', src: skinBefore },
      { id: 202, label: 'Skin Base', sub: 'After treatment', size: 'wide', src: skinAfter },
    ],
  },
  {
    title: 'Laser Hair Removal',
    subtitle: 'Long-term hair reduction — clinical results from real sessions.',
    items: [
      { id: 301, label: 'Laser Hair Removal', sub: 'Before & after', size: 'wide', src: laserHair3 },
      { id: 302, label: 'Laser Hair Removal', sub: 'Before & after', size: 'wide', src: laserHair2 },
      { id: 303, label: 'Laser Hair Removal', sub: 'Treatment result', size: 'normal', src: laserHair1 },
    ],
  },
];

export default function GalleryPage() {
  return (
    <>
      <section className="page-hero bg-[#F4EFE8]">
        <div className="site-container text-center">
          <p className="mb-5 text-[0.62rem] tracking-[0.28em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Real Results</p>
          <h1 className="mb-6 text-[2.8rem] sm:text-[3.5rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Before &amp; After <em className="text-[#2D6A4F]">Gallery</em></h1>
          <div className="gold-divider mb-8" />
          <p className="mx-auto max-w-lg text-[1rem] text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>Every result you see was achieved in our studio — real clients and real treatments.</p>
        </div>
      </section>

      {galleryCategories.map((cat, catIdx) => (
        <section
          key={cat.title}
          className="section-padding"
          style={{ backgroundColor: catIdx % 2 === 0 ? '#F9F6F0' : '#F4EFE8' }}
        >
          <div className="site-container">
            <FadeIn className="mb-12 text-center">
              <p className="mb-3 text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                {String(catIdx + 1).padStart(2, '0')}
              </p>
              <h2 className="mb-4 text-[2rem] sm:text-[2.5rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {cat.title}
              </h2>
              <div className="gold-divider mb-5" />
              <p className="mx-auto max-w-lg text-[0.95rem] text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.8 }}>
                {cat.subtitle}
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item, i) => (
                <FadeIn key={item.id} delay={i * 50}>
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-[#F8F5EF] shadow-[0_10px_28px_rgba(45,106,79,0.06)] ${
                      item.size === 'tall' ? 'aspect-[3/4]' : item.size === 'wide' ? 'aspect-[4/3]' : 'aspect-square'
                    }`}
                  >
                    <Image
                      src={item.src}
                      alt={`${item.label} — ${item.sub}`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="mt-3 px-1 text-center">
                    <p className="text-base text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{item.label}</p>
                    <p className="text-xs text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{item.sub}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-padding bg-[#F4EFE8] text-center">
        <div className="site-container text-center">
          <FadeIn className="mx-auto w-full max-w-2xl text-center">
            <p className="mb-5 text-[0.62rem] tracking-[0.28em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>See More</p>
            <h2 className="mb-5 text-[2.4rem] sm:text-[3rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Follow on Instagram
            </h2>
            <div className="gold-divider mb-8" />
            <p className="mb-10 text-[1rem] text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
              For the latest results, behind-the-scenes content and skincare tips, follow along on Instagram.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="https://instagram.com/shevchenko_laserremoval" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                @shevchenko_laserremoval
              </a>
              <Link href="/contact" className="btn btn-outline">
                Book Now <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
