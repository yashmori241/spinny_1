'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Search, CheckCircle2, Home, Key, Shield, RotateCcw, FileCheck, Car } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { MarqueeStrip } from '@/components/ui/MarqueeStrip';
import { CarCard } from '@/components/ui/CarCard';
import { cars } from '@/lib/data/cars';

/* ===================== HERO SECTION ===================== */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let ctx: gsap.Context;
    try {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      ctx = gsap.context(() => {
        if (imgRef.current) {
          gsap.to(imgRef.current, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.hero-label', { opacity: 0, y: 20, duration: 0.6, delay: 0.3 })
          .from('.hero-line-1', { opacity: 0, y: 60, duration: 0.8 }, 0.5)
          .from('.hero-line-2', { opacity: 0, y: 60, duration: 0.8 }, 0.7)
          .from('.hero-line-3', { opacity: 0, y: 60, duration: 0.8 }, 0.9)
          .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, 1.1)
          .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.6 }, 1.3);

        if (scrollIndicatorRef.current) {
          gsap.to(scrollIndicatorRef.current, {
            opacity: 0,
            scrollTrigger: {
              trigger: heroRef.current,
              start: '80px top',
              end: '160px top',
              scrub: true,
            },
          });
        }
      }, heroRef);

      return () => ctx.revert();
    } catch (e) {
      console.warn('Hero GSAP failed:', e);
    }
  }, []);

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden" style={{ height: '100svh' }}>
      {/* Background Image */}
      <div ref={imgRef} className="absolute inset-0 w-full h-[140%] -top-[20%] overflow-hidden">
        <div className="absolute inset-0" suppressHydrationWarning>
          <Image
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80"
            alt="Premium dark car on dramatic background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.75) 40%, rgba(5,5,5,0.3) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 w-full">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-16">
            {/* Left Content */}
            <div className="max-w-[700px]">
              <div className="hero-label flex items-center gap-4 mb-8 opacity-60">
                 <div className="w-12 h-[1px] bg-brand-gold/50" />
                 <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold">PORTFOLIO REDEFINED</p>
              </div>
              
              <h1 className="hero-title relative mb-12">
                <span className="hero-line-1 text-display-xl block tracking-[-0.04em] leading-[0.9] text-text-primary">
                  Find Your
                </span>
                <span className="hero-line-2 text-display-xl block tracking-[-0.03em] leading-[0.9] italic font-display gold-text-gradient py-2">
                  Luxury Heritage
                </span>
                <span className="hero-line-3 text-display-xl block tracking-[-0.04em] leading-[0.9] text-text-primary">
                  Portfolio<span className="text-brand-gold">.</span>
                </span>
              </h1>

              <p className="hero-sub text-xl text-text-muted mt-10 font-body max-w-[540px] tracking-wide leading-relaxed opacity-80">
                Curating India&apos;s most prestigious pre-owned automotive collection. 
                Each vehicle is a testament to engineering excellence and certified heritage.
              </p>

              <div className="hero-ctas flex gap-6 mt-14 flex-wrap items-center">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] text-text-muted tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={18} className="text-text-muted" style={{ animation: 'bounce-scroll 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}

/* ===================== TRUST NUMBERS ===================== */
function TrustNumbers() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const counters = sectionRef.current?.querySelectorAll('.stat-number');
      counters?.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 1.8,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 80%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: 200000, suffix: '+', label: 'Happy Customers' },
    { number: 10000, suffix: '+', label: 'Cars Available' },
    { number: 200, suffix: '', label: 'Point Inspection' },
    { number: 20, suffix: '+', label: 'Cities Across India' },
  ];

  return (
    <section ref={sectionRef} className="bg-bg-primary py-32 overflow-hidden border-y border-white/5 relative">
      <div className="absolute inset-0 bg-brand-gold/[0.02] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-elite rounded-[32px] p-10 text-center relative overflow-hidden group hover:luxury-border transition-all duration-1000 ease-luxury shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
              <div className="text-stat gold-text-gradient font-display font-black tracking-tighter mb-4">
                <span className="stat-number" data-target={stat.number}>
                  0
                </span>
                <span className="text-2xl opacity-50 ml-1">{stat.suffix}</span>
              </div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-text-muted group-hover:text-brand-gold transition-colors duration-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

/* ===================== HOW IT WORKS (SCROLLJACK) ===================== */
function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 769px)': function () {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: '.how-it-works',
              start: 'top top',
              end: '+=300%',
              pin: '.how-it-works-inner',
              scrub: 1,
              anticipatePin: 1,
            },
          });

          howItWorksSteps.forEach((_, i) => {
            if (i < howItWorksSteps.length - 1) {
              tl.to(
                `#step-${i}`,
                { opacity: 0, yPercent: -15, scale: 0.95, duration: 0.3, ease: 'power2.inOut' },
                i * 0.25 + 0.2
              );
              tl.from(
                `#step-${i + 1}`,
                { opacity: 0, yPercent: 15, scale: 1.05, duration: 0.3, ease: 'power2.out' },
                i * 0.25 + 0.25
              );
            }
          });
        },
        '(max-width: 768px)': function () {
          howItWorksSteps.forEach((_, i) => {
            gsap.from(`#step-${i}`, {
              opacity: 0,
              y: 40,
              duration: 0.6,
              scrollTrigger: {
                trigger: `#step-${i}`,
                start: 'top 85%',
                once: true,
              },
            });
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Desktop: scrolljack */}
      <div className="how-it-works hidden md:block" style={{ height: '400vh' }}>
        <div
          className="how-it-works-inner bg-bg-primary flex items-center relative overflow-hidden"
          style={{ height: '100vh' }}
        >
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-[1px] bg-brand-gold/30" />
               <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold">HOW IT WORKS</p>
            </div>
            <h2 className="text-display-lg mb-20 tracking-tighter">
              A Simple Path to<br />Your Dream Car<span className="text-brand-gold">.</span>
            </h2>
            <div className="relative" style={{ minHeight: 300 }}>
              {howItWorksSteps.map((step, i) => (
                <div
                  key={step.num}
                  id={`step-${i}`}
                  className="absolute inset-0 flex items-start gap-16"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <div className="flex-1 max-w-lg">
                    <span className="text-display-xl gold-text-gradient block mb-6">
                      {step.num}
                    </span>
                    <h3 className="text-display-md text-text-primary mb-6">
                      {step.title}
                    </h3>
                    <p className="text-text-muted text-lg leading-relaxed font-body">
                      {step.desc}
                    </p>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-56 h-56 rounded-full bg-bg-surface border border-border-default flex items-center justify-center glass shadow-2xl">
                      {step.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden py-24 bg-bg-primary">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-label text-brand-gold mb-4">HOW IT WORKS</p>
          <h2 className="text-display-lg mb-12">
            Four Simple Steps.
          </h2>
          <div className="space-y-6">
            {howItWorksSteps.map((step, i) => (
              <div
                key={step.num}
                id={`step-${i}`}
                className="glass-elite luxury-border rounded-[24px] p-8"
              >
                <div className="flex items-center gap-5 mb-5">
                  <span className="text-3xl font-display font-bold gold-text-gradient">
                    {step.num}
                  </span>
                  <div className="w-14 h-14 rounded-full bg-bg-surface2 flex items-center justify-center glass shadow-lg">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== FEATURED CARS (DRAGGABLE CAROUSEL) ===================== */
function FeaturedCars() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const lastVelocity = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    startX.current = e.pageX - track.offsetLeft;
    scrollLeft.current = track.scrollLeft;
    track.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = x - startX.current;
    track.scrollLeft = scrollLeft.current - walk;
    lastVelocity.current = walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    const track = trackRef.current;
    if (!track) return;
    track.style.cursor = 'grab';
    gsap.to(track, {
      scrollLeft: track.scrollLeft - lastVelocity.current * 8,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  const featuredCars = cars.filter((c) => c.trending).slice(0, 6);
  const displayCars =
    featuredCars.length >= 6
      ? featuredCars
      : [...featuredCars, ...cars.filter((c) => !c.trending)].slice(0, 6);

  return (
    <section className="py-32 bg-bg-primary border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      
      <div className="max-w-[1400px] mx-auto px-6 mb-14">
        <div className="flex items-center gap-4 mb-8 opacity-60">
           <div className="w-12 h-[1px] bg-brand-gold/50" />
           <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold">FEATURED CARS</p>
        </div>
        <div className="flex items-end justify-between gap-12">
          <h2 className="text-display-lg tracking-tighter leading-[0.95]">
            Handpicked <br />
            <span className="italic font-display gold-text-gradient">Premium Cars</span><span className="text-brand-gold">.</span>
          </h2>
          <Link
            href="/browse"
            className="hidden md:inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold hover:text-white transition-all group"
          >
            View All Cars
            <div className="w-8 h-[1px] bg-brand-gold/30 group-hover:w-12 group-hover:bg-white transition-all" />
          </Link>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div
          ref={trackRef}
          data-cursor="drag"
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 select-none"
          style={{ cursor: 'grab', scrollbarWidth: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {displayCars.map((car) => (
            <div key={car.id} className="min-w-[340px] max-w-[340px] flex-shrink-0">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden text-center mt-8">
        <Link
          href="/browse"
          className="text-sm text-brand-gold hover:underline font-body"
        >
          View All Cars →
        </Link>
      </div>
    </section>
  );
}

/* ===================== SPINNY ASSURED ===================== */
function SpinnyAssured() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.assured-feature', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: <Shield className="w-7 h-7 text-brand-gold" />, title: '200-Point Inspection', desc: 'Rigorous quality checks covering engine, body, electricals, transmission, and more.' },
    { icon: <RotateCcw className="w-7 h-7 text-brand-gold" />, title: '5-Day Money Back', desc: "Not satisfied? Return the car within 5 days, no questions asked. Full refund guaranteed." },
    { icon: <FileCheck className="w-7 h-7 text-brand-gold" />, title: 'Free RC Transfer', desc: 'We handle all the paperwork. Hassle-free ownership transfer included at no extra cost.' },
    { icon: <Car className="w-7 h-7 text-brand-gold" />, title: 'Home Test Drive', desc: 'Experience the car at your doorstep before making a decision. Totally free of charge.' },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden border-y border-white/5"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-20">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-5">WHY SPINNY</p>
            <h2 className="text-display-lg mb-6 tracking-tighter">Uncompromising Quality.</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto font-body leading-relaxed opacity-80">
              Every car in our collection undergoes a rigorous 200-point inspection 
              to meet our high standards before reaching you.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="assured-feature glass-elite rounded-[28px] p-8 text-left luxury-border-transparent hover:luxury-border transition-all duration-700 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {f.icon}
              </div>
              <h3 className="text-lg font-display font-black text-text-primary mb-3 tracking-tight">{f.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                {f.desc}
              </p>
            </div>
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
    <section className="py-32 bg-bg-primary">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-5">TESTIMONIALS</p>
          <h2 className="text-display-lg tracking-tighter">What Our Customers Say.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass-elite luxury-border rounded-[28px] p-10 card-hover group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/[0.04] blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              
              <div className="flex gap-1 mb-6 relative z-10">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-brand-gold text-lg" style={{ textShadow: '0 0 10px rgba(197,160,89,0.4)' }}>★</span>
                ))}
              </div>
              <p className="text-text-primary text-base leading-relaxed mb-8 font-body italic relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-sm font-bold text-bg-primary">
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
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== BRAND GRID ===================== */
function BrandGrid() {
  const brandData = [
    { name: 'Maruti Suzuki', short: 'Maruti Suzuki', monogram: 'S' },
    { name: 'Hyundai', short: 'Hyundai', monogram: 'H' },
    { name: 'Tata', short: 'Tata Motors', monogram: 'T' },
    { name: 'Honda', short: 'Honda', monogram: 'H' },
    { name: 'Toyota', short: 'Toyota', monogram: 'T' },
    { name: 'Mahindra', short: 'Mahindra', monogram: 'M' },
    { name: 'Ford', short: 'Ford', monogram: 'F' },
    { name: 'Kia', short: 'Kia', monogram: 'K' },
    { name: 'Volkswagen', short: 'Volkswagen', monogram: 'VW' },
    { name: 'Skoda', short: 'Škoda', monogram: 'Š' },
    { name: 'Renault', short: 'Renault', monogram: 'R' },
    { name: 'BMW', short: 'BMW', monogram: 'BMW' },
    { name: 'Audi', short: 'Audi', monogram: 'A' },
    { name: 'Jeep', short: 'Jeep', monogram: 'J' },
    { name: 'MG', short: 'MG Motor', monogram: 'MG' },
  ];

  return (
    <section className="py-32 bg-[#080808] border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-5">POPULAR BRANDS</p>
          <h2 className="text-display-lg tracking-tighter">Explore by Brand.</h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-5">
          {brandData.map((brand) => (
            <Link href={`/browse?brand=${encodeURIComponent(brand.name)}`} key={brand.name}>
              <div
                className="glass-elite rounded-[20px] p-6 text-center transition-all duration-500 ease-luxury hover:luxury-border cursor-pointer card-hover group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-gold/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Brand Monogram Logo */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-brand-gold/30 group-hover:bg-brand-gold/[0.08] transition-all duration-700 relative z-10">
                  <span className={`font-display font-black gold-text-gradient tracking-tight ${brand.monogram.length > 2 ? 'text-base' : brand.monogram.length > 1 ? 'text-xl' : 'text-2xl'}`}>
                    {brand.monogram}
                  </span>
                </div>
                <p className="text-sm font-semibold tracking-wide text-text-muted group-hover:text-brand-gold transition-colors duration-500 relative z-10">{brand.short}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== CTA SECTION ===================== */
function CTASection() {
  return (
    <section className="py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-bg-primary" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
        <div className="glass-elite luxury-border p-16 rounded-[40px] w-full max-w-4xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-5">GET STARTED</p>
          <h2 className="text-display-lg mb-6 leading-tight tracking-tighter">Ready to Find Your<br />Perfect Car?</h2>
          <p className="text-text-muted text-lg mb-12 max-w-2xl mx-auto font-body leading-relaxed">
            Join 2,00,000+ happy customers who found their dream car on Spinny. 
            Experience a new standard of trust and quality.
          </p>
          <div className="flex gap-6 justify-center flex-wrap items-center">
            <Link href="/browse">
              <MagneticButton variant="gold" className="px-10 py-5 text-base shadow-[0_0_50px_rgba(201,168,76,0.3)]">
                Browse 10,000+ Cars →
              </MagneticButton>
            </Link>
            <Link href="/sell">
              <MagneticButton variant="outline" className="px-10 py-5 text-base border-white/20">
                Sell Your Car
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== HOME PAGE ===================== */
export default function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, []);

  return (
    <main className="bg-bg-primary">
      <HeroSection />
      <div className="reveal">
        <MarqueeStrip />
      </div>
      <div className="reveal">
        <TrustNumbers />
      </div>
      <HowItWorks />
      <div className="reveal">
        <FeaturedCars />
      </div>
      <div className="reveal">
        <SpinnyAssured />
      </div>
      <div className="reveal">
        <Testimonials />
      </div>
      <div className="reveal">
        <BrandGrid />
      </div>
      <div className="reveal">
        <CTASection />
      </div>
    </main>
  );
}
