'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/treatments', label: 'Treatments' },
  { href: '/prices', label: 'Prices' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F9F6F0]/95 backdrop-blur-sm shadow-[0_1px_20px_rgba(0,0,0,0.06)] border-b border-[#E8E0D5]/70'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className="text-[1.65rem] text-[#2C2C2C] tracking-wide transition-colors group-hover:text-[#2D6A4F]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
            >
              Olena
            </span>
            <span
              className="text-[0.6rem] tracking-[0.25em] text-[#C9A84C] uppercase"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              Aesthetics
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative text-[0.72rem] tracking-[0.15em] uppercase transition-colors duration-200 ${
                  pathname === href
                    ? 'text-[#2D6A4F]'
                    : 'text-[#2C2C2C] hover:text-[#2D6A4F]'
                }`}
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#2D6A4F] transition-all duration-300 ${
                    pathname === href ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 px-5 py-2.5 text-[0.68rem] tracking-[0.18em] uppercase border border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white transition-all duration-300"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#2C2C2C] hover:text-[#2D6A4F] transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#F9F6F0]/98 backdrop-blur-sm flex flex-col justify-center items-center transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-3xl transition-colors duration-200 ${
                pathname === href ? 'text-[#2D6A4F]' : 'text-[#2C2C2C] hover:text-[#2D6A4F]'
              }`}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 px-8 py-3 text-[0.72rem] tracking-[0.2em] uppercase border border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white transition-all duration-300"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
          >
            Book Now
          </Link>
        </nav>
      </div>
    </>
  );
}
