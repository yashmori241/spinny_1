import Link from 'next/link';

export function Footer() {
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
    <footer className="bg-bg-primary border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-gold/[0.02] blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        {/* Top */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-16">
          {/* Brand */}
          <div className="max-w-md">
            <div className="flex items-center gap-4 mb-8 group">
              <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center group-hover:border-brand-gold transition-all duration-1000 bg-brand-gold/5 relative">
                <div className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_20px_rgba(197,160,89,0.9)]" />
              </div>
              <span className="font-display text-xl font-black text-text-primary tracking-[0.3em] group-hover:text-brand-gold transition-colors duration-700">
                SPINNY
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-10 opacity-70 max-w-sm">
              India&apos;s most trusted platform for buying and selling certified pre-owned cars. 
              Every car is quality-checked with our 200-point inspection guarantee.
            </p>
            <div className="flex gap-3">
              {['X', 'IG', 'IN', 'YT'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full glass-elite border border-white/5 flex items-center justify-center
                    text-[10px] font-bold text-text-muted hover:text-brand-gold hover:border-brand-gold/30 transition-all duration-500"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Directory Columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-8">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted hover:text-white transition-all duration-400 hover:translate-x-1 inline-block"
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
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-sm">
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
  );
}
