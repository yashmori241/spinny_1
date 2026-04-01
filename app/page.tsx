'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Search, CheckCircle2, Home, Key, Shield, RotateCcw, FileCheck, Car } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { MarqueeStrip } from '@/components/ui/MarqueeStrip';
import { CarCard } from '@/components/ui/CarCard';
import { TiltCard } from '@/components/ui/TiltCard';
import { SectionReveal, StaggerReveal, CountUp } from '@/components/ui/SectionReveal';
import { cars } from '@/lib/data/cars';

/* ===================== HERO SECTION ===================== */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Scroll indicator fade
  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleScroll = () => {
      if (!scrollIndicatorRef.current) return;
      const opacity = Math.max(0, 1 - window.scrollY / 160);
      scrollIndicatorRef.current.style.opacity = String(opacity);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldReduceMotion]);

  const headlineWords = ['Find', 'Your', 'Luxury', 'Heritage', 'Portfolio'];
  const stagger = shouldReduceMotion ? 0 : 0.08;

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden" style={{ height: '100svh' }}>
      {/* ── Background Video Layer ── */}
      {!videoError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source
            src="/hero_section.mp4"
            type="video/mp4"
          />
        </video>
      )}

      {/* ── Fallback Image ── */}
      {videoError && (
        <div className="absolute inset-0 w-full h-[140%] -top-[20%] overflow-hidden" style={{ zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1920&q=80"
            alt="Family car on a scenic road"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* ── Overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(91,45,134,0.25), rgba(91,45,134,0.15), rgba(255,255,255,0.25))',
          zIndex: 1,
        }}
      />

      {/* ── Text glow behind block ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(91,45,134,0.25) 0%, transparent 65%)',
          zIndex: 2,
        }}
      />

      {/* ── Text Content ── */}
      <div className="relative h-full flex items-center" style={{ zIndex: 4 }}>
        <div className="max-w-[1280px] mx-auto w-full" style={{ padding: '0 clamp(20px, 5vw, 80px)' }}>
          <div style={{ maxWidth: 600, paddingTop: 'clamp(120px, 14vw, 200px)' }}>

            {/* Eyebrow */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4"
              style={{ marginBottom: '20px' }}
            >
              <div className="w-10 h-[1px] bg-brand-gold/50" />
              <p
                className="text-brand-gold font-bold uppercase"
                style={{ fontSize: 11, letterSpacing: '0.18em' }}
              >
                PORTFOLIO REDEFINED
              </p>
            </motion.div>

            {/* Staggered Headline */}
            <motion.h1
              className="relative"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: stagger, delayChildren: 0.4 } },
              }}
              style={{ marginBottom: 0 }}
            >
              <motion.span
                className="text-display-xl block tracking-[-0.04em] leading-[0.9] text-text-primary"
                variants={{
                  hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 60 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                Find Your
              </motion.span>
              <motion.span
                className="text-display-xl block tracking-[-0.03em] leading-[0.9] italic font-display gold-text-gradient py-2"
                variants={{
                  hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 60 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                Luxury Heritage
              </motion.span>
              <motion.span
                className="text-display-xl block tracking-[-0.04em] leading-[0.9] text-text-primary"
                variants={{
                  hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 60 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                Portfolio<span className="text-brand-gold">.</span>
              </motion.span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              className="text-text-muted font-body opacity-80"
              style={{
                fontSize: 18,
                maxWidth: '52ch',
                lineHeight: 1.72,
                marginTop: 'clamp(20px, 2.5vw, 32px)',
              }}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Curating India&apos;s most prestigious pre-owned automotive collection.
              Each vehicle is a testament to engineering excellence and certified heritage.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap items-center"
              style={{ gap: 16, marginTop: 'clamp(28px, 3.5vw, 48px)' }}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/browse">
                <MagneticButton variant="gold" className="px-10 h-14 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full">
                  Explore Collection
                </MagneticButton>
              </Link>
              <Link href="/sell">
                <MagneticButton variant="ghost" className="px-10 h-14 text-[11px] font-bold uppercase tracking-[0.2em] border-white/10 hover:border-brand-gold/40 rounded-full">
                  Sell Your Car
                </MagneticButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Hero Bottom Strip (Assured Ticker) ── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          backdropFilter: 'blur(12px)',
          background: 'rgba(255,255,255,0.08)',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          padding: '20px clamp(24px, 5vw, 80px)',
          zIndex: 5,
        }}
      >
        <div className="flex items-center gap-6 text-white text-[11px] font-semibold uppercase tracking-[0.15em] overflow-hidden">
          {['200-Point Inspection', '5-Day Money Back', 'Free RC Transfer', 'Home Test Drive', 'Certified Pre-Owned'].map((item, i) => (
            <span key={i} className="flex items-center gap-6 whitespace-nowrap flex-shrink-0">
              {item}
              {i < 4 && <span style={{ color: '#C5A059' }}>◆</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 5 }}
      >
        <span className="text-[11px] text-text-muted tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={18} className="text-text-muted" style={{ animation: 'bounce-scroll 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}

/* ===================== STATS SECTION ===================== */
function TrustNumbers() {
  const stats = [
    { number: 200000, suffix: '+', label: 'Happy Customers' },
    { number: 10000, suffix: '+', label: 'Cars Available' },
    { number: 200, suffix: '', label: 'Point Inspection' },
    { number: 20, suffix: '+', label: 'Cities Across India' },
  ];

  return (
    <section
      className="overflow-hidden border-y border-white/5 relative"
      style={{ padding: 'clamp(72px, 9vw, 120px) 0' }}
    >
      <div className="absolute inset-0 bg-brand-gold/[0.02] pointer-events-none" />
      <div className="max-w-[1280px] mx-auto" style={{ padding: '0 clamp(20px, 5vw, 80px)' }}>
        <StaggerReveal
          containerClassName="grid grid-cols-2 lg:grid-cols-4"
          className=""
          staggerDelay={0.1}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-elite rounded-[32px] text-center relative overflow-hidden group hover:luxury-border transition-all duration-700 cursor-default"
              style={{ padding: 'clamp(28px, 3vw, 40px)', gap: 'clamp(32px, 5vw, 64px)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            >
              <div
                className="font-display font-black tracking-tighter mb-2"
                style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1 }}
              >
                <span className="bg-gradient-to-r from-brand-purple to-brand-gold bg-clip-text text-transparent">
                  <CountUp to={stat.number} suffix={stat.suffix} duration={2} />
                </span>
              </div>
              <p
                className="font-semibold text-text-muted hover:text-brand-gold transition-colors duration-700"
                style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', letterSpacing: '0.06em', marginTop: 8 }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

/* ===================== HOW IT WORKS ===================== */
const howItWorksSteps = [
  {
    num: '01',
    title: 'Browse & Discover',
    desc: 'Explore our curated collection of 10,000+ certified pre-owned cars. Filter by brand, budget, type, and more.',
    icon: <Search className="w-8 h-8 text-brand-gold/70" />,
  },
  {
    num: '02',
    title: '200-Point Inspection',
    desc: 'Every car undergoes a thorough 200-point quality inspection covering engine, body, electricals, and more.',
    icon: <CheckCircle2 className="w-8 h-8 text-brand-gold/70" />,
  },
  {
    num: '03',
    title: 'Free Home Test Drive',
    desc: 'Experience your chosen car at your doorstep. No pressure, no rush — take your time to decide.',
    icon: <Home className="w-8 h-8 text-brand-gold/70" />,
  },
  {
    num: '04',
    title: 'Easy Ownership Transfer',
    desc: 'We handle all the paperwork — RC transfer, insurance, and everything else. Just drive and enjoy.',
    icon: <Key className="w-8 h-8 text-brand-gold/70" />,
  },
];

function HowItWorks() {
  return (
    <section
      className="bg-bg-primary relative overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto" style={{ padding: '0 clamp(20px, 5vw, 80px)' }}>
        {/* Heading block */}
        <div style={{ marginBottom: 'clamp(56px, 7vw, 96px)' }}>
        <SectionReveal>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-brand-gold/30" />
            <p className="eyebrow text-brand-gold">HOW IT WORKS</p>
          </div>
          <h2 className="text-display-lg tracking-tighter">
            A Simple Path to<br />Your Dream Car<span className="text-brand-gold">.</span>
          </h2>
        </SectionReveal>
        </div>

        {/* Step cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ gap: 'clamp(32px, 4vw, 56px)' }}
        >
          {howItWorksSteps.map((step, i) => (
            <SectionReveal key={step.num} delay={i * 0.1}>
              <div
                className="step-card-accent glass-elite luxury-border-transparent rounded-[28px] transition-all duration-500 group"
                style={{ padding: 'clamp(28px, 3vw, 40px)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(91,45,134,0.15)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                  (e.currentTarget as HTMLElement).style.transform = '';
                }}
              >
                {/* Number */}
                <div
                  className="font-display font-black gold-text-gradient leading-none"
                  style={{
                    fontSize: 'clamp(48px, 6vw, 72px)',
                    lineHeight: 1,
                    marginBottom: 20,
                  }}
                >
                  <CountUp to={parseInt(step.num)} suffix="" duration={1.2} />
                </div>
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-bg-surface2 flex items-center justify-center mb-5">
                  {step.icon}
                </div>
                {/* Title */}
                <h3 className="font-display font-bold text-text-primary text-xl tracking-tight" style={{ marginBottom: 12 }}>
                  {step.title}
                </h3>
                {/* Body */}
                <p className="text-text-muted text-sm" style={{ lineHeight: 1.72, maxWidth: '36ch' }}>
                  {step.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== FEATURED CARS ===================== */
function FeaturedCars() {
  const displayCars = cars.filter((c) => c.trending).slice(0, 3)
    .concat(cars.filter((c) => !c.trending).slice(0, 3)).slice(0, 6);

  return (
    <section
      className="relative overflow-hidden bg-bg-soft"
      style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}
    >
      {/* Ambient purple glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(91,45,134,0.07) 0%, transparent 70%)' }}
      />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      <div className="max-w-[1280px] mx-auto" style={{ padding: '0 clamp(20px, 5vw, 80px)' }}>
        {/* Heading */}
        <div style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
        <SectionReveal>
          <div className="flex items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[1px] bg-brand-gold/50" />
                <p className="eyebrow text-brand-gold">FEATURED CARS</p>
              </div>
              <h2 className="text-display-lg tracking-tighter leading-[0.95]">
                Handpicked <br />
                <span className="italic font-display gold-text-gradient">Premium Cars</span><span className="text-brand-gold">.</span>
              </h2>
            </div>
            <Link
              href="/browse"
              className="hidden md:inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold hover:text-white transition-all group"
            >
              View All Cars
              <div className="w-8 h-[1px] bg-brand-gold/30 group-hover:w-12 group-hover:bg-white transition-all" />
            </Link>
          </div>
        </SectionReveal>
        </div>

        {/* Card grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 'clamp(20px, 2.5vw, 32px)' }}
        >
          {displayCars.map((car, i) => (
            <SectionReveal key={car.id} delay={i * 0.06}>
              <CarCard car={car} />
            </SectionReveal>
          ))}
        </div>

        {/* View All link (mobile + centered desktop) */}
        <div className="text-center" style={{ marginTop: 'clamp(40px, 5vw, 64px)' }}>
          <Link
            href="/browse"
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold hover:text-white transition-all group"
          >
            View All 10,000+ Cars
            <div className="w-8 h-[1px] bg-brand-gold/30 group-hover:w-12 group-hover:bg-white transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ===================== WHY SPINNY ===================== */
function SpinnyAssured() {
  const features = [
    { icon: <Shield className="w-7 h-7 text-brand-gold" />, title: '200-Point Inspection', desc: 'Rigorous quality checks covering engine, body, electricals, transmission, and more.' },
    { icon: <RotateCcw className="w-7 h-7 text-brand-gold" />, title: '5-Day Money Back', desc: "Not satisfied? Return the car within 5 days, no questions asked. Full refund guaranteed." },
    { icon: <FileCheck className="w-7 h-7 text-brand-gold" />, title: 'Free RC Transfer', desc: 'We handle all the paperwork. Hassle-free ownership transfer included at no extra cost.' },
    { icon: <Car className="w-7 h-7 text-brand-gold" />, title: 'Home Test Drive', desc: 'Experience the car at your doorstep before making a decision. Totally free of charge.' },
  ];

  return (
    <section
      className="relative overflow-hidden border-y border-white/5"
      style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}
    >
      <div className="max-w-[1280px] mx-auto" style={{ padding: '0 clamp(20px, 5vw, 80px)' }}>
        {/* Intro */}
        <SectionReveal>
          <div className="text-center" style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}>
            <p className="eyebrow text-brand-gold mb-4">WHY SPINNY</p>
            <h2 className="text-display-lg mb-4 tracking-tighter">Uncompromising Quality.</h2>
            <p className="text-text-muted text-lg mx-auto opacity-80" style={{ maxWidth: '56ch', lineHeight: 1.72, marginTop: 16 }}>
              Every car in our collection undergoes a rigorous 200-point inspection
              to meet our high standards before reaching you.
            </p>
          </div>
        </SectionReveal>

        {/* Feature cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ gap: 'clamp(24px, 3vw, 40px)' }}
        >
          {features.map((f, i) => (
            <SectionReveal key={f.title} delay={i * 0.08}>
              <div
                className="glass-elite luxury-border-transparent rounded-[28px] text-left transition-all duration-500 group cursor-default"
                style={{ padding: 'clamp(24px, 3vw, 36px)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(91,45,134,0.18)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                  (e.currentTarget as HTMLElement).style.transform = '';
                }}
              >
                <div
                  className="flex items-center justify-center rounded-[14px] mb-5 group-hover:rotate-[8deg] transition-transform duration-500 relative overflow-hidden"
                  style={{
                    width: 56,
                    height: 56,
                    background: 'rgba(91,45,134,0.12)',
                    marginBottom: 20,
                  }}
                >
                  {/* Shimmer sweep on icon */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.3), transparent)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmerSweep 1.2s ease-out',
                    }}
                  />
                  {f.icon}
                </div>
                <h3 className="font-display font-black text-text-primary text-lg tracking-tight" style={{ marginBottom: 10 }}>
                  {f.title}
                </h3>
                <p className="text-text-muted text-sm opacity-80" style={{ lineHeight: 1.72, maxWidth: '34ch' }}>
                  {f.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== TESTIMONIALS ===================== */
function Testimonials() {
  const testimonials = [
    {
      name: 'Rahul Sharma',
      car: 'Hyundai Creta 2023',
      quote: "The entire experience was seamless. From browsing to getting the car delivered at my doorstep — Spinny made it feel effortless. Can't recommend enough!",
      rating: 5,
      city: 'Delhi',
      initials: 'RS',
    },
    {
      name: 'Priya Menon',
      car: 'Tata Nexon EV 2023',
      quote: "I was skeptical about buying a used EV, but the 200-point inspection report gave me complete confidence. The car was in pristine condition!",
      rating: 5,
      city: 'Bangalore',
      initials: 'PM',
    },
    {
      name: 'Aditya Patel',
      car: 'BMW 320d 2021',
      quote: 'Found a luxury car at an incredible price. The transparency in pricing and condition report was unlike anything I had seen before. Spinny is the real deal.',
      rating: 5,
      city: 'Mumbai',
      initials: 'AP',
    },
  ];

  return (
    <section
      className="bg-bg-primary"
      style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}
    >
      <div className="max-w-[1280px] mx-auto" style={{ padding: '0 clamp(20px, 5vw, 80px)' }}>
        <SectionReveal>
          <div className="text-center" style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}>
            <p className="eyebrow text-brand-gold mb-4">TESTIMONIALS</p>
            <h2 className="text-display-lg tracking-tighter">What Our Customers Say.</h2>
          </div>
        </SectionReveal>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 'clamp(24px, 3vw, 36px)' }}
        >
          {testimonials.map((t, i) => (
            <SectionReveal key={t.name} delay={i * 0.1}>
              <div
                className="glass-elite luxury-border rounded-[28px] card-hover group relative overflow-hidden"
                style={{ padding: 'clamp(28px, 3vw, 40px)' }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/[0.04] blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                {/* Stars */}
                <div className="flex gap-1 relative z-10" style={{ marginBottom: 20 }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-brand-gold text-lg" style={{ textShadow: '0 0 10px rgba(197,160,89,0.4)' }}>★</span>
                  ))}
                </div>

                {/* Quote */}
                <p
                  className="text-text-primary font-body italic relative z-10"
                  style={{ lineHeight: 1.78, marginBottom: 24, maxWidth: '38ch', fontSize: 'clamp(14px, 1.3vw, 16px)' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Reviewer */}
                <div
                  className="flex items-center relative z-10"
                  style={{ gap: 14, paddingTop: 20, borderTop: '1px solid rgba(232,232,232,0.08)' }}
                >
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-sm font-bold text-bg-primary flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-display font-bold text-text-primary text-base">{t.name}</p>
                    <p className="text-text-muted text-sm mt-0.5">
                      {t.car} · {t.city}
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== BRAND GRID ===================== */
function BrandGrid() {
  const brandData = [
    { name: 'Maruti Suzuki', short: 'Maruti Suzuki', logo: '/suzuki-logo.png', monogram: 'S' },
    { name: 'Hyundai', short: 'Hyundai', logo: '/hyundai-logo.png', monogram: 'H' },
    { name: 'Tata', short: 'Tata Motors', logo: '/tata-logo.png', monogram: 'T' },
    { name: 'Honda', short: 'Honda', logo: '/honda-logo.png', monogram: 'H' },
    { name: 'Toyota', short: 'Toyota', logo: '/toyota-logo.png', monogram: 'T' },
    { name: 'Mahindra', short: 'Mahindra', logo: '/Mahindra-logo.png', monogram: 'M' },
    { name: 'Ford', short: 'Ford', logo: '/ford-logo.png', monogram: 'F' },
    { name: 'Kia', short: 'Kia', logo: '/kia-logo.png', monogram: 'K' },
    { name: 'Volkswagen', short: 'Volkswagen', logo: '/volkswagen-logo.png', monogram: 'VW' },
    { name: 'Skoda', short: 'Škoda', logo: '/skoda-logo.png', monogram: 'Š' },
    { name: 'Renault', short: 'Renault', logo: '/renault-logo.png', monogram: 'R' },
    { name: 'BMW', short: 'BMW', logo: '/bmw-logo.png', monogram: 'BMW' },
    { name: 'Audi', short: 'Audi', logo: '/audi-logo.png', monogram: 'A' },
    { name: 'Jeep', short: 'Jeep', logo: '/jeep-logo.png', monogram: 'J' },
    { name: 'MG', short: 'MG Motor', logo: '/mg-logo.png', monogram: 'MG' },
  ];

  return (
    <section
      className="bg-bg-alt border-y border-border"
      style={{ padding: 'clamp(64px, 8vw, 112px) 0' }}
    >
      <div className="max-w-[1280px] mx-auto" style={{ padding: '0 clamp(20px, 5vw, 80px)' }}>
        <SectionReveal>
          <div className="text-center" style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            <p className="eyebrow text-brand-purple mb-4">POPULAR BRANDS</p>
            <h2 className="text-display-lg tracking-tighter">Explore by Brand.</h2>
          </div>
        </SectionReveal>

        <div
          className="grid grid-cols-3 md:grid-cols-5"
          style={{ gap: 'clamp(16px, 2vw, 24px)' }}
        >
          {brandData.map((brand, i) => (
            <SectionReveal key={brand.name} delay={i * 0.03}>
              <Link href={`/browse?brand=${encodeURIComponent(brand.name)}`}>
                <div
                  className="bg-bg-main border border-border rounded-[16px] text-center transition-all duration-300 group relative overflow-hidden cursor-pointer hover:shadow-[0_8px_30px_rgba(91,45,134,0.1)] hover:-translate-y-1"
                  style={{ padding: 'clamp(20px, 2.5vw, 28px)' }}
                >
                  <div className="mx-auto mb-3 flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-105">
                    {brand.logo ? (
                      <div className="w-16 h-16 bg-white p-3 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
                        <Image src={brand.logo} alt={brand.name} width={48} height={48} className="object-contain" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-white p-3 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm text-brand-purple font-display font-bold text-2xl">
                        {brand.monogram}
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-semibold tracking-wide text-text-primary group-hover:text-brand-purple transition-colors duration-300 relative z-10 mt-3" style={{ fontSize: 13 }}>
                    {brand.short}
                  </p>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== CTA SECTION ===================== */
function CTASection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}
    >
      <div
        className="absolute inset-0 bg-brand-purple"
        style={{ zIndex: 0 }}
      />
      {/* Animated glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(123,79,171,0.4) 0%, transparent 70%)',
        }}
      />

      <div
        className="max-w-[1280px] mx-auto text-center relative"
        style={{ padding: '0 clamp(20px, 5vw, 80px)', zIndex: 2 }}
      >
        <SectionReveal>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p className="eyebrow text-white/70 mb-4">GET STARTED</p>
            <h2
              className="text-display-lg leading-tight tracking-tighter text-white"
              style={{ marginBottom: 'clamp(16px, 2vw, 24px)' }}
            >
              Ready to Find Your<br />Perfect Car?
            </h2>
            <p
              className="text-white/70 text-lg mx-auto"
              style={{ maxWidth: '52ch', lineHeight: 1.72, marginBottom: 'clamp(32px, 4vw, 48px)' }}
            >
              Join 2,00,000+ happy customers who found their dream car on Spinny.
              Experience a new standard of trust and quality.
            </p>
            <div className="flex flex-wrap justify-center items-center" style={{ gap: 16 }}>
              <Link href="/browse">
                <MagneticButton
                  variant="gold"
                  className="px-10 py-5 text-base shadow-[0_0_50px_rgba(197,160,89,0.4)] hover:shadow-[0_0_80px_rgba(197,160,89,0.6)] transition-shadow duration-500"
                >
                  Browse 10,000+ Cars →
                </MagneticButton>
              </Link>
              <Link href="/sell">
                <MagneticButton
                  variant="outline"
                  className="px-10 py-5 text-base border-white/30 text-white hover:bg-white/10 hover:border-white/60"
                >
                  Sell Your Car
                </MagneticButton>
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ===================== HOME PAGE ===================== */
export default function HomePage() {
  return (
    <main className="bg-bg-primary">
      <HeroSection />
      <MarqueeStrip />
      <TrustNumbers />
      <hr className="section-divider" />
      <HowItWorks />
      <hr className="section-divider" />
      <FeaturedCars />
      <hr className="section-divider" />
      <SpinnyAssured />
      <Testimonials />
      <hr className="section-divider" />
      <BrandGrid />
      <CTASection />
    </main>
  );
}
