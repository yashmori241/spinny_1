'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { Heart, MapPin, ChevronLeft, ChevronRight, X, Fuel, Gauge, Settings2, Users, Palette, Calendar } from 'lucide-react';
import { getCarById, cars } from '@/lib/data/cars';
import { useShortlistStore } from '@/lib/store/shortlistStore';
import { formatPrice, formatMileage, formatEMI } from '@/lib/utils/formatters';
import { calculateEMI } from '@/lib/utils/emi';
import { CarCard } from '@/components/ui/CarCard';
import { SectionReveal } from '@/components/ui/SectionReveal';

export default function CarDetailPage() {
  const { id } = useParams();
  const car = getCarById(id as string);
  const [currentImage, setCurrentImage] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const mainImgRef = useRef<HTMLDivElement>(null);
  const { toggle, isShortlisted } = useShortlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [loanAmount, setLoanAmount] = useState(car ? Math.round(car.price * 0.8) : 0);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(60);
  const emi = calculateEMI(loanAmount, interestRate, tenure);

  const handleThumbnailClick = (index: number) => {
    if (mainImgRef.current) {
      gsap.to(mainImgRef.current, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          setCurrentImage(index);
          gsap.to(mainImgRef.current, { opacity: 1, duration: 0.3 });
        },
      });
    } else {
      setCurrentImage(index);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!fullScreen || !car) return;
      if (e.key === 'Escape') setFullScreen(false);
      if (e.key === 'ArrowRight') setCurrentImage((p) => (p + 1) % car.images.length);
      if (e.key === 'ArrowLeft') setCurrentImage((p) => (p - 1 + car.images.length) % car.images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [fullScreen, car]);

  if (!car) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center">
        <div className="text-center">
          <p className="text-display-md text-text-subtle mb-4">Car not found</p>
          <Link href="/browse" className="text-brand-gold hover:underline text-lg">Back to Browse</Link>
        </div>
      </div>
    );
  }

  const liked = isShortlisted(car.id);
  const similarCars = cars.filter((c) => c.id !== car.id && c.bodyType === car.bodyType).slice(0, 4);

  const specs = [
    { icon: <Calendar size={16} />, label: 'Year', value: car.year },
    { icon: <Gauge size={16} />, label: 'Mileage', value: formatMileage(car.mileage) },
    { icon: <Fuel size={16} />, label: 'Fuel', value: car.fuelType },
    { icon: <Settings2 size={16} />, label: 'Transmission', value: car.transmission },
    { icon: <Users size={16} />, label: 'Owners', value: `${car.owners} Owner` },
    { icon: <Palette size={16} />, label: 'Color', value: car.color },
  ];

  // 3D tilt state for main image
  const [imgTilt, setImgTilt] = useState({ x: 0, y: 0 });
  const [imgGlow, setImgGlow] = useState({ x: 50, y: 50 });
  const [imgHovered, setImgHovered] = useState(false);
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  const handleImgMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    setImgTilt({ x: -((y - cy) / cy) * 6, y: ((x - cx) / cx) * 6 });
    setImgGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }, [isTouchDevice]);

  const handleImgMouseLeave = useCallback(() => {
    setImgHovered(false);
    setImgTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-bg-main relative overflow-hidden" style={{ paddingTop: 80 }}>
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-purple/[0.02] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div
        className="max-w-[1280px] mx-auto"
        style={{ padding: 'clamp(32px, 4vw, 56px) clamp(20px, 5vw, 80px)' }}
      >
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/60"
          style={{ marginBottom: 'clamp(20px, 2.5vw, 32px)' }}
        >
          <Link href="/browse" className="hover:text-brand-gold transition-colors">Browse</Link>
          <div className="w-1 h-1 rounded-full bg-brand-gold/30" />
          <span className="text-text-primary/40">{car.make}</span>
          <div className="w-1 h-1 rounded-full bg-brand-gold/30" />
          <span className="text-brand-gold">{car.model}</span>
        </div>

        <div className="flex flex-col lg:flex-row" style={{ gap: 'clamp(40px, 5vw, 72px)' }}>
          {/* Left Column */}
          <div className="flex-1">
            {/* Image Gallery */}
            <div style={{ marginBottom: 'clamp(24px, 3vw, 40px)' }}>
              {/* Main image with 3D tilt */}
              <div
                ref={mainImgRef}
                className="relative overflow-hidden cursor-pointer group shadow-[0_40px_100px_rgba(0,0,0,0.8)] glass-elite"
                style={{
                  aspectRatio: '16/9',
                  borderRadius: 16,
                  transition: 'transform 0.15s ease-out',
                  transform: isTouchDevice ? 'none' : `perspective(1000px) rotateX(${imgTilt.x}deg) rotateY(${imgTilt.y}deg)`,
                }}
                onClick={() => setFullScreen(true)}
                onMouseMove={handleImgMouseMove}
                onMouseEnter={() => setImgHovered(true)}
                onMouseLeave={handleImgMouseLeave}
              >
                {/* Specular highlight on image */}
                {imgHovered && (
                  <div
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{
                      background: `radial-gradient(circle at ${imgGlow.x}% ${imgGlow.y}%, rgba(255,255,255,0.1) 0%, transparent 55%)`,
                      borderRadius: 16,
                    }}
                  />
                )}
                <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]" />
                <div className="absolute top-5 left-5 z-20 flex gap-2">
                   {car.assured && (
                     <div className="px-3 py-1.5 glass-elite rounded-full text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gold border border-brand-gold/20 backdrop-blur-md">
                        ✓ Verified
                     </div>
                   )}
                </div>

                {mounted && (
                  <Image
                    src={car.images[currentImage]}
                    alt={`${car.make} ${car.model}`}
                    fill
                    sizes="(max-width: 1400px) 100vw, 80vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-luxury"
                    priority
                  />
                )}
              </div>

              <div className="flex gap-3 mt-5 overflow-x-auto pb-2 custom-scrollbar">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => handleThumbnailClick(i)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border transition-all duration-500
                      ${i === currentImage ? 'border-brand-purple shadow-[0_0_15px_rgba(91,45,134,0.3)]' : 'border-border opacity-40 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill sizes="100px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-white/5 mb-10">
              <div className="flex gap-8 lg:gap-12">
                {['Overview', 'Specs', 'Features', 'Inspection'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-5 text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-500 relative
                      ${activeTab === tab.toLowerCase() ? 'text-brand-purple' : 'text-text-muted/60 hover:text-text-primary'}`}
                  >
                    {tab}
                    {activeTab === tab.toLowerCase() && (
                      <span className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-brand-purple" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}>
              {activeTab === 'overview' && (
                <div
                  className="grid grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-6 duration-700"
                  style={{ gap: 16 }}
                >
                  {specs.map((s) => (
                    <div
                      key={s.label}
                      className="spec-card group hover:bg-white/[0.02] transition-all duration-500 bg-bg-soft rounded-xl p-4"
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(91,45,134,0.15)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
                    >
                      <div className="flex items-center gap-2 text-brand-purple/40 group-hover:text-brand-purple transition-colors">
                        {s.icon}
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">{s.label}</span>
                      </div>
                      <span className="text-lg font-mono text-text-primary tracking-tight font-bold">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 animate-in fade-in duration-700">
                  {[
                    ['Engine', car.engine],
                    ['Power', car.power],
                    ['Seats', `${car.seats} Seats`],
                    ['Body Type', car.bodyType],
                    ['Registration', car.registrationState],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-5 border-b border-white/5 group">
                      <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-text-muted/60 group-hover:text-brand-gold/80 transition-colors">{label}</span>
                      <span className="text-sm text-text-primary font-mono tracking-tight font-bold">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'features' && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-700">
                  {car.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 p-4 bg-bg-soft rounded-xl text-sm text-text-muted/80 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/50 shadow-[0_0_6px_rgba(91,45,134,0.3)]" />
                      {f}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'inspection' && (
                <div className="glass-elite luxury-border rounded-[28px] p-10 relative overflow-hidden animate-in fade-in duration-700">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4" />
                  <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    <div className="relative w-36 h-36">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
                        <circle
                          cx="50" cy="50" r="45" fill="none" stroke="#C5A059" strokeWidth="3"
                          strokeLinecap="round"
                          className="transition-all duration-[2000ms] ease-luxury"
                          strokeDasharray={`${(car.inspectionScore / 200) * 283} 283`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-display font-black text-brand-gold">{car.inspectionScore}</span>
                        <span className="text-[11px] font-semibold text-text-muted/40 tracking-wider mt-1">/ 200</span>
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <h4 className="font-display text-2xl font-black text-text-primary mb-3 tracking-tight">Inspection Report</h4>
                      <p className="text-sm text-text-muted opacity-70 max-w-md leading-relaxed">
                        This car has passed our rigorous 200-point inspection covering engine health, body condition, electricals, 
                        transmission, brakes, tires, and interior quality.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* EMI Calculator */}
            <div
              className="glass-elite luxury-border rounded-[28px] overflow-hidden relative"
              style={{ padding: 'clamp(24px, 3vw, 48px)', marginBottom: 'clamp(32px, 4vw, 56px)' }}
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/[0.04] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-12 h-[1px] bg-brand-purple/30" />
                   <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-purple">EMI CALCULATOR</p>
                </div>
                
                <div className="space-y-10 relative z-10">
                  <div className="space-y-5">
                    <div className="flex justify-between items-end">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/70">Loan Amount</label>
                      <span className="text-2xl font-mono text-brand-gold tracking-tighter font-bold">{formatPrice(loanAmount)}</span>
                    </div>
                    <input type="range" min={100000} max={car.price} step={10000} value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-5">
                      <div className="flex justify-between items-end">
                        <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/70">Interest Rate</label>
                        <span className="text-lg font-mono text-text-primary font-bold">{interestRate}%</span>
                      </div>
                      <input type="range" min={6} max={18} step={0.5} value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))} />
                    </div>
                    <div className="space-y-5">
                      <div className="flex justify-between items-end">
                        <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/70">Tenure (Months)</label>
                        <span className="text-lg font-mono text-text-primary font-bold">{tenure}</span>
                      </div>
                      <input type="range" min={12} max={84} step={6} value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))} />
                    </div>
                  </div>
                  
                  <div className="pt-10 border-t border-border flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/60 mb-3">Monthly EMI</p>
                      <p className="text-5xl font-display font-black text-brand-gold tracking-tighter">{formatEMI(emi)}</p>
                    </div>
                    <button className="px-10 py-5 bg-brand-purple text-white text-[12px] font-bold uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_30px_rgba(91,45,134,0.3)] transition-all duration-700">
                      Apply for Loan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Cars */}
            {similarCars.length > 0 && (
              <div
                style={{
                  marginTop: 'clamp(64px, 8vw, 112px)',
                  paddingTop: 'clamp(48px, 6vw, 80px)',
                  borderTop: '1px solid rgba(232,232,232,0.08)',
                }}
              >
                <SectionReveal>
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-12 h-[1px] bg-brand-purple/30" />
                     <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-purple">SIMILAR CARS</h3>
                  </div>
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2"
                    style={{ gap: 'clamp(16px, 2vw, 24px)' }}
                  >
                    {similarCars.map((c) => (
                      <CarCard key={c.id} car={c} />
                    ))}
                  </div>
                </SectionReveal>
              </div>
            )}
          </div>

          {/* Right: Sticky Price Card */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="sticky top-[100px] bg-bg-main border border-border rounded-[28px] p-8 lg:p-10 shadow-[0_4px_30px_rgba(91,45,134,0.05)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/[0.05] blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="max-w-[80%]">
                  <p className="text-[11px] font-mono text-brand-gold/60 uppercase tracking-[0.15em] mb-2">{car.year} · {car.make}</p>
                  <h1 className="font-display font-black text-3xl text-text-primary tracking-tighter leading-tight mb-3">
                    {car.model}
                  </h1>
                  <div className="flex items-center gap-2 text-text-muted/60 text-[11px] font-semibold">
                    <MapPin size={12} className="text-brand-gold/60" />
                    <span>{car.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggle(car.id)}
                  className="w-12 h-12 rounded-full glass-elite border border-white/5 flex items-center justify-center group transition-all duration-500 hover:border-brand-gold/30"
                  data-cursor
                >
                  <Heart
                    size={20}
                    className={mounted && liked ? 'fill-brand-red text-brand-red scale-110' : 'text-text-muted/40 group-hover:text-brand-gold transition-all duration-500'}
                  />
                </button>
              </div>

              <div className="mb-8 relative z-10">
                <p className="text-3xl font-mono font-black text-text-primary tracking-tighter flex items-end gap-2">
                  {formatPrice(car.price)}
                </p>
                <div className="flex items-center gap-3 mt-2">
                   <p className="text-sm text-text-muted line-through opacity-40">{formatPrice(car.originalPrice)}</p>
                   <div className="w-1 h-1 rounded-full bg-brand-gold/30" />
                   <p className="text-[11px] font-bold text-green-500">
                     Save {formatPrice(car.originalPrice - car.price)}
                   </p>
                </div>
              </div>

              <div className="space-y-3 relative z-10">
                <button className="w-full py-5 bg-brand-purple text-white font-bold text-[12px] uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_30px_rgba(91,45,134,0.3)] transition-all duration-700">
                  Book This Car
                </button>
                <button className="w-full py-5 bg-bg-soft border border-border text-text-primary font-bold text-[12px] uppercase tracking-[0.2em] rounded-full hover:border-brand-purple/30 transition-all duration-700">
                  Schedule Test Drive
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-border relative z-10">
                <div className="flex items-center gap-3 mb-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                   <p className="text-[11px] font-semibold text-text-muted">Available for immediate delivery</p>
                </div>
                <button className="w-full py-4 bg-transparent border border-border rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted hover:text-text-primary hover:border-brand-purple/50 transition-all duration-500">
                  Contact Us About This Car
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {fullScreen && (
        <div className="fixed inset-0 z-[99999] bg-bg-primary/98 backdrop-blur-3xl flex items-center justify-center animate-in fade-in duration-500">
          <button
            onClick={() => setFullScreen(false)}
            className="absolute top-8 right-8 w-14 h-14 rounded-full glass-elite border border-white/10 flex items-center justify-center text-text-muted hover:text-white transition-all duration-300"
          >
            <X size={24} />
          </button>
          
          <button
            onClick={() => setCurrentImage((p) => (p - 1 + car.images.length) % car.images.length)}
            className="absolute left-8 w-14 h-14 rounded-full glass-elite border border-white/10 flex items-center justify-center text-brand-gold hover:text-white transition-all duration-300"
          >
            <ChevronLeft size={28} />
          </button>
          
          <button
            onClick={() => setCurrentImage((p) => (p + 1) % car.images.length)}
            className="absolute right-8 w-14 h-14 rounded-full glass-elite border border-white/10 flex items-center justify-center text-brand-gold hover:text-white transition-all duration-300"
          >
            <ChevronRight size={28} />
          </button>
          
          <div className="relative w-[90vw] h-[80vh] group">
            {mounted && (
              <Image
                src={car.images[currentImage]}
                alt={`${car.make} ${car.model}`}
                fill
                className="object-contain"
              />
            )}
          </div>

          <div className="absolute bottom-10 flex gap-3">
            {car.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`transition-all duration-500 rounded-full ${i === currentImage ? 'bg-brand-purple w-12 h-1' : 'bg-white/30 w-4 h-1'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
