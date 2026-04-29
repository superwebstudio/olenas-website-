'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import laserImg from '@/images/laser_hair_removal.jpg';
import armpitBeforeImg from '@/images/laser_hair_removal_armpit_before.jpg';
import armpitAfterImg from '@/images/laser_hair_removal_armpit_after.jpg';
import photo1 from '@/images/photo_1_2026-04-29_19-37-15.jpg';
import photo2 from '@/images/photo_2_2026-04-29_19-37-15.jpg';
import photo3 from '@/images/photo_3_2026-04-29_19-37-15.jpg';
import photo4 from '@/images/photo_4_2026-04-29_19-37-15.jpg';
import photo8 from '@/images/photo_8_2026-04-29_19-37-15.jpg';
import photo9 from '@/images/photo_9_2026-04-29_19-37-15.jpg';
import photo10 from '@/images/photo_10_2026-04-29_19-37-15.jpg';

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

const galleryItems: GalleryItem[] = [
  { id: 1, label: 'Laser hair removal', sub: 'Underarms — before', size: 'tall', src: armpitBeforeImg },
  { id: 2, label: 'Laser hair removal', sub: 'Underarms — after', size: 'tall', src: armpitAfterImg },
  { id: 3, label: 'Laser hair removal', sub: 'Treatment in progress', size: 'wide', src: laserImg },
  { id: 4, label: 'Client result', sub: 'After treatment', size: 'normal', src: photo1 },
  { id: 5, label: 'Client result', sub: 'After treatment', size: 'normal', src: photo2 },
  { id: 6, label: 'Skin rejuvenation', sub: 'Texture & tone', size: 'wide', src: photo3 },
  { id: 7, label: 'Skin rejuvenation', sub: 'After sessions', size: 'normal', src: photo4 },
  { id: 8, label: 'Skin tightening', sub: 'RF microneedling result', size: 'tall', src: photo8 },
  /* photo10 reads as tattoo/removal; photo9 better matched peel glow — swap so labels match imagery */
  { id: 9, label: 'Tattoo removal', sub: 'Session progress', size: 'normal', src: photo10 },
  { id: 10, label: 'Carbon peeling', sub: 'Hollywood peel — glow', size: 'normal', src: photo9 },
];

export default function GalleryPage() {
  return (
    <>
      <section className="page-hero bg-[#F4EFE8] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(45,106,79,0.12) 0%, transparent 60%)' }} />
        <div className="site-container relative text-center">
          <div className="relative mx-auto max-w-3xl">
          <p className="mb-5 text-[0.62rem] tracking-[0.28em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            Real Results
          </p>
          <h1 className="mb-6 text-[2.8rem] sm:text-[3.5rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Before &amp; After <em className="text-[#2D6A4F]">Gallery</em>
          </h1>
          <div className="gold-divider mb-8" />
          <p className="mx-auto max-w-lg text-[1rem] text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
            Every result you see was achieved in our studio — real clients and real treatments.
          </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#F9F6F0]">
        <div className="site-container">
          <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
            {galleryItems.map((item, i) => (
              <FadeIn key={item.id} delay={i * 50} className="break-inside-avoid">
                <div
                  className={`relative overflow-hidden rounded-2xl bg-[#F8F5EF] shadow-[0_10px_28px_rgba(45,106,79,0.06)] ${
                    item.size === 'tall' ? 'aspect-[3/4]' : item.size === 'wide' ? 'aspect-[4/3]' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={`${item.label} — ${item.sub}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-3 px-1">
                  <p className="text-base text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{item.label}</p>
                  <p className="text-xs text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{item.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#F4EFE8] text-center">
        <div className="site-container">
          <FadeIn className="mx-auto max-w-xl">
          <p className="mb-5 text-[0.62rem] tracking-[0.28em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>See More</p>
          <h2 className="mb-5 text-[2.4rem] sm:text-[3rem] text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Follow on Instagram
          </h2>
          <div className="gold-divider mb-8" />
          <p className="mb-10 text-[1rem] text-[#5F5A56]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
            For the latest results, behind-the-scenes content and skincare tips, follow along on Instagram.
          </p>
          <div className="flex flex-col gap-4 justify-center sm:flex-row">
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
