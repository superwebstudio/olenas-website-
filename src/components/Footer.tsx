import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';

function InstagramIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3 1.84h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
    </svg>
  );
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Me' },
  { href: '/treatments', label: 'Treatments' },
  { href: '/prices', label: 'Prices' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Book Appointment' },
];

const linkClass =
  'text-sm text-[#9c9490] hover:text-[#F9F6F0] transition-colors duration-200';

const linkStyle = { fontFamily: "'Jost', sans-serif", fontWeight: 300 } as const;

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1e1e1e', color: '#F9F6F0' }}>

      <div
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12"
        style={{ padding: '5rem 1.5rem' }}
      >
        <div>
          <h3
            className="text-3xl mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: '#F9F6F0' }}
          >
            Olena
          </h3>
          <p
            className="mb-7"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
              fontSize: '0.58rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#C9A84C',
            }}
          >
            Aesthetics
          </p>
          <p
            className="text-sm max-w-xs"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.85, color: '#9c9490' }}
          >
            Advanced aesthetic and beauty treatments to help you achieve healthy, confident-looking skin.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-7 text-[#C9A84C] hover:text-[#E0C068] transition-colors duration-200"
          >
            <InstagramIcon />
            <span
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              @olena.aesthetics
            </span>
          </a>
        </div>

        <div className="md:border-l md:border-[#2a2a2a] md:pl-10">
          <h4
            className="mb-7"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#C9A84C',
            }}
          >
            Navigation
          </h4>
          <ul className="space-y-3">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={linkClass} style={linkStyle}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:border-l md:border-[#2a2a2a] md:pl-10">
          <h4
            className="mb-7"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#C9A84C',
            }}
          >
            Contact
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 text-[#C9A84C]"><PhoneIcon /></span>
              <span className={linkClass} style={linkStyle}>
                Phone available on request
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={15} className="mt-0.5 shrink-0 text-[#C9A84C]" />
              <a href="mailto:hello@olena-aesthetics.ie" className={linkClass} style={linkStyle}>
                hello@olena-aesthetics.ie
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={15} className="mt-0.5 shrink-0 text-[#C9A84C]" />
              <span className="text-sm" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, color: '#9c9490' }}>
                Dublin, Ireland
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #2a2a2a', padding: '1.5rem' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p
            className="text-xs"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, color: '#5a5452' }}
          >
            © {new Date().getFullYear()} Olena Aesthetics. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <span
                key={item}
                className="text-xs cursor-pointer text-[#5a5452] hover:text-[#9c9490] transition-colors duration-200"
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
