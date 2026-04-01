'use client';

import Link from 'next/link';export function Footer() {
  const columns = [
    {
      title: 'COMPANY',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '#' },
        { label: 'Press & Media', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'BUY A CAR',
      links: [
        { label: 'Browse Cars', href: '/browse' },
        { label: 'How It Works', href: '#' },
        { label: 'EMI Calculator', href: '/emi' },
        { label: 'Compare Cars', href: '/compare' },
      ],
    },
    {
      title: 'SELL A CAR',
      links: [
        { label: 'Sell Your Car', href: '/sell' },
        { label: 'Get Valuation', href: '/sell' },
        { label: 'Why Sell on Spinny', href: '#' },
        { label: 'RC Transfer', href: '#' },
      ],
    },
    {
      title: 'SUPPORT',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Contact Us', href: '#' },
        { label: 'FAQs', href: '#' },
        { label: 'Privacy Policy', href: '#' },
      ],
    },
  ];

  return (
    <>
      {/* Gradient fade into footer */}
      <div className="footer-fade relative z-10 -mb-[1px]" />

      <footer className="bg-[#1C1C1C] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-gold/[0.02] blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-purple/[0.03] blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div
          className="max-w-[1280px] mx-auto"
          style={{
            padding: 'clamp(64px, 8vw, 112px) clamp(20px, 5vw, 80px) clamp(32px, 4vw, 56px)',
          }}
        >
          {/* Top */}
          <div
            className="flex flex-col lg:flex-row justify-between"
            style={{ gap: 'clamp(32px, 5vw, 72px)', marginBottom: 'clamp(48px, 6vw, 80px)' }}
          >
            {/* Brand */}
            <div className="max-w-sm">
              <div
                className="flex items-center gap-4 group"
                style={{ marginBottom: 'clamp(32px, 4vw, 48px)' }}
              >
                <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center group-hover:border-brand-gold transition-all duration-700 bg-brand-gold/5 relative">
                  <div className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_20px_rgba(197,160,89,0.9)]" />
                </div>
                <span className="font-display text-xl font-black text-text-primary tracking-[0.3em] group-hover:text-brand-gold transition-colors duration-700">
                  SPINNY
                </span>
              </div>
              <p className="text-text-muted text-sm opacity-70 max-w-[280px]" style={{ lineHeight: 1.72 }}>
                India&apos;s most trusted platform for buying and selling certified pre-owned cars.
                Every car is quality-checked with our 200-point inspection guarantee.
              </p>
              <div
                className="flex gap-3"
                style={{ marginTop: 'clamp(24px, 3vw, 36px)' }}
              >
                {['X', 'IG', 'IN', 'YT'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full glass-elite border border-white/5 flex items-center justify-center
                      text-[10px] font-bold text-text-muted transition-all duration-500"
                    style={{
                      transitionProperty: 'transform, color, box-shadow',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'scale(1.15)';
                      (e.currentTarget as HTMLElement).style.filter = 'drop-shadow(0 0 8px rgba(123,79,171,0.6))';
                      (e.currentTarget as HTMLElement).style.color = '#A87ED4';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                      (e.currentTarget as HTMLElement).style.filter = 'none';
                      (e.currentTarget as HTMLElement).style.color = '';
                    }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Directory Columns */}
            <div
              className="grid grid-cols-2 lg:grid-cols-4"
              style={{ gap: 'clamp(32px, 5vw, 72px)' }}
            >
              {columns.map((col) => (
                <div key={col.title}>
                  <h4
                    className="font-bold uppercase text-brand-gold"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      marginBottom: '20px',
                    }}
                  >
                    {col.title}
                  </h4>
                  <ul>
                    {col.links.map((link) => (
                      <li key={link.label} style={{ lineHeight: 2.0 }}>
                        <Link
                          href={link.href}
                          className="text-sm text-text-muted transition-all duration-300 inline-block"
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                            (e.currentTarget as HTMLElement).style.color = '#A87ED4';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                            (e.currentTarget as HTMLElement).style.color = '';
                          }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div
            className="flex flex-col md:flex-row justify-between items-center gap-8 text-sm border-t border-white/[0.08]"
            style={{ paddingTop: 'clamp(24px, 3vw, 32px)' }}
          >
            <p className="text-text-subtle opacity-50" suppressHydrationWarning>
              © {new Date().getFullYear()} Spinny Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-text-subtle opacity-50 hover:opacity-100 hover:text-brand-gold transition-all"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
