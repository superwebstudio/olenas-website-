import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Olena Shevchenko Aesthetics | Microdermabrasion, RF Microneedling & Laser Southampton',
  description:
    'Microdermabrasion, RF microneedling and laser hair removal in Southampton — singles and packages. Consultation with Olena Shevchenko.',
  keywords:
    'microdermabrasion Southampton, RF microneedling, laser hair removal, skin packages, aesthetics Southampton, Olena Shevchenko',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
        <body>
        <Header />
        <main className="min-w-0 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
