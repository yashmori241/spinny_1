'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, GitCompareArrows, Menu, X } from 'lucide-react';
import { useShortlistStore } from '@/lib/store/shortlistStore';
import { useAuthStore } from '@/lib/store/authStore';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const shortlist = useShortlistStore((s) => s.shortlist);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // eslint-disable-next-line
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Browse Cars', href: '/browse' },
    { label: 'Sell Your Car', href: '/sell' },
    { label: 'EMI Calculator', href: '/emi' },
    { label: 'About Us', href: '/about' },
  ];

  const isScrolledOrNotHome = scrolled || pathname !== '/';

  return (
    <>
      <nav
        className={`${
          pathname === '/' ? 'fixed' : 'sticky'
        } top-0 left-0 right-0 z-[9990] transition-all duration-300 ease-out`}
        style={{
          height: isScrolledOrNotHome ? '64px' : '80px',
          backdropFilter: isScrolledOrNotHome ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolledOrNotHome ? 'blur(20px) saturate(180%)' : 'none',
          background: isScrolledOrNotHome
            ? 'rgba(5,5,5,0.9)'
            : 'transparent',
          borderBottom: isScrolledOrNotHome
            ? '1px solid rgba(91,45,134,0.12)'
            : '1px solid transparent',
          boxShadow: isScrolledOrNotHome
            ? '0 4px 24px rgba(91,45,134,0.08)'
            : 'none',
        }}
      >
        <div
          className="max-w-[1280px] mx-auto h-full flex items-center justify-between"
          style={{ padding: '0 clamp(20px, 5vw, 80px)' }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-9 h-9 rounded-full border border-brand-gold/30 flex items-center justify-center group-hover:border-brand-gold transition-all duration-700 bg-brand-gold/5 relative">
              <div className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_15px_rgba(197,160,89,0.9)]" />
              <div className="absolute inset-0 rounded-full border border-brand-gold/40 animate-ping opacity-10" />
            </div>
            <span
              className="font-display text-lg font-black text-text-primary tracking-[0.3em] transition-all duration-700"
              style={{
                backgroundImage: 'linear-gradient(90deg, currentColor, currentColor)',
              }}
            >
              SPINNY
            </span>
          </Link>

          {/* Desktop Nav */}
          <div
            className="hidden lg:flex items-center"
            style={{ gap: 'clamp(24px, 3vw, 40px)' }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link-underline text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 relative py-1
                  ${pathname === link.href ? 'text-brand-gold' : 'text-text-muted hover:text-text-primary'}`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-brand-gold shadow-[0_0_15px_rgba(197,160,89,0.5)]" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="/compare"
              className="p-2.5 text-text-muted hover:text-brand-gold transition-colors duration-300"
              data-cursor
            >
              <GitCompareArrows size={18} />
            </Link>
            <Link
              href="/dashboard"
              className="relative p-2.5 text-text-muted hover:text-brand-gold transition-colors duration-300"
              data-cursor
            >
              <Heart size={18} />
              {mounted && shortlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-brand-gold text-bg-primary text-[9px] font-bold flex items-center justify-center">
                  {shortlist.length}
                </span>
              )}
            </Link>
            <Link
              href={isAuthenticated ? '/dashboard' : '/login'}
              className="ml-3 px-7 py-2.5 bg-brand-gold text-bg-primary text-[11px] font-bold uppercase tracking-[0.15em] rounded-full
                hover:shadow-[0_0_40px_rgba(197,160,89,0.4)] transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
              data-cursor
            >
              {mounted ? (isAuthenticated ? 'Dashboard' : 'Sign In') : 'Sign In'}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 text-text-primary z-[9999]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-cursor
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 z-[9980] bg-bg-primary/95 backdrop-blur-2xl transition-all duration-700 ease-luxury lg:hidden
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        
        <div className="flex flex-col justify-center h-full px-10 relative z-10">
          <div className="flex items-center gap-4 mb-12 opacity-40">
             <div className="w-8 h-[1px] bg-brand-gold/50" />
             <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold">MENU</p>
          </div>
          
          <div className="space-y-3">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-baseline gap-5 w-full py-3 overflow-hidden"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1 + 0.2}s`,
              }}
            >
              <span className="text-[11px] font-mono text-brand-gold/40 font-bold">0{i + 1}</span>
              <span className="text-3xl sm:text-4xl font-display font-black text-text-primary tracking-tighter group-hover:text-brand-gold group-hover:translate-x-3 transition-all duration-500 leading-tight">
                {link.label}
              </span>
            </Link>
          ))}
          <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-white/5" style={{
            opacity: mobileOpen ? 1 : 0,
            transition: `opacity 1s ease ${0.7}s`,
          }}>
            <Link href="/compare" className="px-6 py-3 glass border border-white/10 rounded-full text-[11px] font-bold uppercase tracking-wider text-text-muted">
              Compare
            </Link>
            <Link href="/dashboard" className="px-6 py-3 glass border border-white/10 rounded-full text-[11px] font-bold uppercase tracking-wider text-text-muted">
              Shortlist
            </Link>
            <Link
              href={isAuthenticated ? '/dashboard' : '/login'}
              className="px-7 py-3 bg-brand-gold text-bg-primary text-[11px] font-bold uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(197,160,89,0.3)]"
            >
              {mounted ? (isAuthenticated ? 'Dashboard' : 'Sign In') : 'Sign In'}
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
