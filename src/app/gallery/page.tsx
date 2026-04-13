'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
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

const filters = ['All', 'Laser', 'Skin Rejuvenation', 'Facials', 'Brow & Lash'];

const galleryItems = [
  { id: 1, category: 'Laser', label: 'Laser Hair Removal', sub: 'Full Leg — After 4 sessions', size: 'tall' },
  { id: 2, category: 'Skin Rejuvenation', label: 'Microneedling', sub: 'Skin texture — Before & After', size: 'wide' },
  { id: 3, category: 'Facials', label: 'Anti-Ageing Facial', sub: 'Fine lines — 6-week result', size: 'normal' },
  { id: 4, category: 'Brow & Lash', label: 'Brow Lamination', sub: 'Definition & shape', size: 'normal' },
  { id: 5, category: 'Laser', label: 'Underarm Laser', sub: 'After 3 sessions', size: 'normal' },
  { id: 6, category: 'Skin Rejuvenation', label: 'Chemical Peel', sub: 'Pigmentation — Before & After', size: 'tall' },
  { id: 7, category: 'Facials', label: 'Brightening Facial', sub: 'Radiance & even tone', size: 'normal' },
  { id: 8, category: 'Brow & Lash', label: 'Lash Lift & Tint', sub: 'Natural lash curl result', size: 'wide' },
  { id: 9, category: 'Skin Rejuvenation', label: 'LED Therapy', sub: 'Redness reduction — Before & After', size: 'normal' },
  { id: 10, category: 'Laser', label: 'Bikini Laser', sub: 'After 5 sessions', size: 'normal' },
  { id: 11, category: 'Facials', label: 'Hydra Facial', sub: 'Hydration & glow', size: 'tall' },
  { id: 12, category: 'Brow & Lash', label: 'Brow Tint & Shape', sub: 'Defined arch & colour', size: 'normal' },
];

const gradients: Record<string, string> = {
  Laser: 'from-[#2D6A4F]/15 to-[#40916C]/8',
  'Skin Rejuvenation': 'from-[#C9A84C]/12 to-[#E0C068]/6',
  Facials: 'from-[#7A7370]/12 to-[#2C2C2C]/6',
  'Brow & Lash': 'from-[#2D6A4F]/8 to-[#C9A84C]/10',
};

export default function GalleryPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? galleryItems : galleryItems.filter((g) => g.category === active);

  return (
    <>
      <section className="page-hero bg-[#F4EFE8] overflow-hidden">
        <div className="absolute inset-y-0 right-0 hidden md:block w-[34%] opacity-35">
          <Image src={olenaImg} alt="" fill sizes="34vw" className="object-cover object-top" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#F4EFE8]/30 via-[#F4EFE8]/70 to-[#F4EFE8]" />
        </div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(45,106,79,0.12) 0%, transparent 60%)' }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            Real Results
          </p>
          <h1 className="text-[2.8rem] sm:text-[3.5rem] text-[#2C2C2C] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Before &amp; After <em className="text-[#2D6A4F]">Gallery</em>
          </h1>
          <div className="gold-divider mb-8" />
          <p className="text-[1rem] text-[#7A7370] max-w-lg mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
            Every result you see was achieved in our studio. Real clients, real treatments, real transformations.
          </p>
        </div>
      </section>

      {/* Filter tabs — proper mobile tap targets */}
      <section className="py-6 sm:py-10 px-4 sm:px-6 bg-[#F9F6F0] border-b border-[#E8E0D5] sticky top-20 z-30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 sm:gap-3 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`min-h-[44px] px-4 sm:px-5 py-2.5 text-[0.62rem] tracking-[0.18em] uppercase transition-all duration-200 rounded-lg sm:rounded-none ${
                active === f
                  ? 'bg-[#2D6A4F] text-white border border-[#2D6A4F]'
                  : 'border border-[#E8E0D5] text-[#7A7370] hover:border-[#2D6A4F]/40 hover:text-[#2D6A4F]'
              }`}
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="section-padding bg-[#F9F6F0]">
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((item, i) => (
              <FadeIn key={item.id} delay={i * 60} className="break-inside-avoid">
                <div className={`relative overflow-hidden border border-[#E8E0D5] group cursor-pointer rounded-xl sm:rounded-none ${
                  item.size === 'tall' ? 'aspect-[3/4]' : item.size === 'wide' ? 'aspect-[4/3]' : 'aspect-square'
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[item.category]} flex items-center justify-center`}>
                    <div className="text-center p-6">
                      <p className="text-3xl text-[#2D6A4F]/20 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>◈</p>
                      <p className="text-xs text-[#7A7370] tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Photo</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[#C9A84C] mb-1" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>{item.category}</p>
                    <p className="text-white text-base" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{item.label}</p>
                    <p className="text-white/70 text-xs mt-0.5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{item.sub}</p>
                  </div>
                  <div className="absolute top-3 left-3 bg-[#F9F6F0]/85 backdrop-blur-sm px-2 py-1 rounded-md sm:rounded-none">
                    <p className="text-[0.55rem] tracking-[0.15em] uppercase text-[#2D6A4F]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>{item.category}</p>
                  </div>
                </div>
                <div className="mt-3 px-1">
                  <p className="text-base text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{item.label}</p>
                  <p className="text-xs text-[#7A7370]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>{item.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-[#2C2C2C] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>No results yet</p>
              <p className="text-sm text-[#7A7370]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>Check back soon — more photos coming!</p>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-[#F4EFE8] text-center">
        <FadeIn className="max-w-xl mx-auto">
          <p className="text-[0.62rem] tracking-[0.28em] uppercase text-[#C9A84C] mb-5" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
            See More
          </p>
          <h2 className="text-[2.4rem] sm:text-[3rem] text-[#2C2C2C] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Follow on Instagram
          </h2>
          <div className="gold-divider mb-8" />
          <p className="text-[1rem] text-[#7A7370] mb-10" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
            For the latest results, behind-the-scenes content and skincare tips, follow along on Instagram.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              @olena.aesthetics
            </a>
            <Link href="/contact" className="btn btn-outline">
              Book Now <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
