'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ChevronRight, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { brands } from '@/lib/data/cars';

const carSchema = z.object({
  brand: z.string().min(1, 'Please select a brand'),
  model: z.string().min(1, 'Please enter the model name'),
  year: z.string().min(1, 'Please select a year'),
  variant: z.string().min(1, 'Please enter the variant'),
  mileage: z.string().min(1, 'Please enter the mileage'),
});

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
});

export default function SellPage() {
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const stepRef = useRef<HTMLDivElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const priceRef = useRef<HTMLDivElement>(null);

  const carForm = useForm({ resolver: zodResolver(carSchema) });
  const contactForm = useForm({ resolver: zodResolver(contactSchema) });

  const steps = ['Car Details', 'Your Info', 'Get Price'];

  const goToStep = (nextStep: number) => {
    if (stepRef.current) {
      gsap.fromTo(
        stepRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
    setStep(nextStep);
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    carForm.handleSubmit(() => goToStep(1))(e);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    if (newOtp.join('') === '123456') {
      setOtpVerified(true);
      setTimeout(() => {
        setEstimatedPrice(Math.floor(Math.random() * 500000) + 500000);
        goToStep(2);
      }, 500);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (step === 2 && priceRef.current && estimatedPrice > 0) {
      gsap.from(priceRef.current, {
        filter: 'blur(16px)',
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      });
    }
  }, [step, estimatedPrice]);

  return (
    <div className="min-h-screen bg-bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-gold/[0.03] blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 py-20 flex flex-col lg:flex-row gap-20 items-start">
        {/* Left: Description */}
        <div className="lg:w-1/2 lg:sticky lg:top-[140px]">
           <div className="flex items-center gap-4 mb-8 opacity-60">
             <div className="w-12 h-[1px] bg-brand-gold/50" />
             <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold">SELL YOUR CAR</p>
           </div>
           
           <h1 className="text-display-lg mb-8 tracking-tighter leading-tight">
             Get the Best Price<br />
             <span className="italic font-display gold-text-gradient">for Your Car</span><span className="text-brand-gold">.</span>
           </h1>
           
           <p className="text-text-muted text-lg font-body max-w-lg leading-relaxed opacity-75 mb-14">
             Sell your car with confidence. Get a fair price instantly, 
             enjoy free doorstep inspection, and receive immediate payment upon completion.
           </p>
           
           <div className="space-y-8">
              {[
                { title: 'Instant Valuation', desc: 'Get a preliminary price estimate based on real market data.' },
                { title: 'Free Home Inspection', desc: 'Our expert inspects your car at your doorstep — no charges.' },
                { title: 'Same-Day Payment', desc: 'Get paid the same day after the deal is finalized.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 items-start group">
                   <div className="w-6 h-6 rounded-full border border-brand-gold/20 flex items-center justify-center mt-0.5 group-hover:border-brand-gold/40 transition-all duration-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(197,160,89,0.5)]" />
                   </div>
                   <div>
                     <h4 className="text-[12px] font-bold uppercase tracking-[0.15em] text-text-primary/90 mb-1.5">{item.title}</h4>
                     <p className="text-sm text-text-muted opacity-65 group-hover:opacity-100 transition-opacity duration-500">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Right: Form */}
        <div className="lg:w-1/2 w-full max-w-xl glass-elite p-10 lg:p-14 luxury-border rounded-[32px] relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
           <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/[0.03] blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          {/* Step Progress */}
          <div className="flex items-center gap-3 mb-14">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3 flex-1">
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-mono font-bold transition-all duration-700
                    ${i <= step ? 'bg-brand-gold text-bg-primary shadow-[0_0_15px_rgba(197,160,89,0.4)]' : 'bg-white/5 border border-white/5 text-text-muted/40'}`}
                >
                  {i < step ? <Check size={14} /> : `0${i + 1}`}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-[1px] bg-white/5 relative">
                    <div 
                      className="absolute inset-0 bg-brand-gold transition-all duration-700"
                      style={{ width: i < step ? '100%' : '0%' }} 
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div ref={stepRef}>
            {/* Step 1: Car Details */}
            {step === 0 && (
              <form onSubmit={handleStep1} className="space-y-7">
                <div className="space-y-5">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/70 mb-3 block">Brand</label>
                    <select
                      {...carForm.register('brand')}
                      className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-5 py-4 text-sm text-text-primary
                        focus:border-brand-gold/40 focus:bg-white/[0.06] focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-bg-primary">Select brand</option>
                      {brands.map((b) => (<option key={b} value={b} className="bg-bg-primary">{b}</option>))}
                    </select>
                    {carForm.formState.errors.brand && (
                      <p className="text-red-400 text-sm mt-2">{carForm.formState.errors.brand.message as string}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/70 mb-3 block">Model</label>
                    <input
                      {...carForm.register('model')}
                      placeholder="e.g., Swift ZXi+"
                      className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-5 py-4 text-sm text-text-primary
                        focus:border-brand-gold/40 focus:bg-white/[0.06] focus:outline-none transition-all placeholder:text-text-subtle/50"
                    />
                    {carForm.formState.errors.model && (
                      <p className="text-red-400 text-sm mt-2">{carForm.formState.errors.model.message as string}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/70 mb-3 block">Year</label>
                      <select
                        {...carForm.register('year')}
                        className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-5 py-4 text-sm text-text-primary
                          focus:border-brand-gold/40 focus:outline-none transition-all"
                      >
                        <option value="" className="bg-bg-primary">Select year</option>
                        {Array.from({ length: 15 }, (_, i) => 2024 - i).map((y) => (
                          <option key={y} value={y} className="bg-bg-primary">{y}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/70 mb-3 block">Variant</label>
                      <input
                        {...carForm.register('variant')}
                        placeholder="e.g., LXi, VXi"
                        className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-5 py-4 text-sm text-text-primary
                          focus:border-brand-gold/40 focus:outline-none transition-all placeholder:text-text-subtle/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/70 mb-3 block">Kilometers Driven</label>
                    <input
                      {...carForm.register('mileage')}
                      placeholder="e.g., 25,000"
                      className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-5 py-4 text-sm text-text-primary
                        focus:border-brand-gold/40 focus:outline-none transition-all placeholder:text-text-subtle/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-brand-gold text-bg-primary font-bold text-[12px] uppercase tracking-[0.2em] rounded-full
                    hover:shadow-[0_0_40px_rgba(197,160,89,0.5)] transition-all duration-700 ease-luxury transform hover:scale-[1.02]"
                >
                  Continue <ChevronRight size={14} className="inline ml-1" />
                </button>
              </form>
            )}

            {/* Step 2: Contact Info */}
            {step === 1 && (
              <div className="space-y-7">
                <div className="space-y-5">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/70 mb-3 block">Full Name</label>
                    <input
                      {...contactForm.register('name')}
                      placeholder="Enter your full name"
                      className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-5 py-4 text-sm text-text-primary
                        focus:border-brand-gold/40 focus:outline-none transition-all placeholder:text-text-subtle/50"
                    />
                    {contactForm.formState.errors.name && (
                      <p className="text-red-400 text-sm mt-2">{contactForm.formState.errors.name.message as string}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/70 mb-3 block">Phone Number</label>
                    <div className="flex gap-3">
                      <input
                        {...contactForm.register('phone')}
                        placeholder="Enter 10-digit number"
                        maxLength={10}
                        className="flex-1 bg-white/[0.04] border border-white/8 rounded-xl px-5 py-4 text-sm text-text-primary
                          focus:border-brand-gold/40 focus:outline-none transition-all placeholder:text-text-subtle/50"
                      />
                      {!otpSent && (
                        <button
                          onClick={contactForm.handleSubmit(handleSendOtp)}
                          className="px-8 py-4 bg-brand-gold text-bg-primary text-[11px] font-bold uppercase tracking-[0.15em] rounded-xl whitespace-nowrap"
                        >
                          Send OTP
                        </button>
                      )}
                    </div>
                    {contactForm.formState.errors.phone && (
                      <p className="text-red-400 text-sm mt-2">{contactForm.formState.errors.phone.message as string}</p>
                    )}
                  </div>

                  {otpSent && !otpVerified && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pt-2">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/70 mb-4 block text-center">Enter 6-digit OTP</label>
                      <div className="flex gap-3 justify-center">
                        {otp.map((digit, i) => (
                          <input
                            key={i}
                            ref={(el) => { otpRefs.current[i] = el; }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            className="w-12 h-14 bg-white/[0.04] border border-white/8 rounded-xl text-center text-lg text-text-primary
                              focus:border-brand-gold focus:outline-none transition-all font-mono"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-text-muted text-center mt-6">Demo OTP: <span className="text-brand-gold font-mono font-bold">123456</span></p>
                    </div>
                  )}

                  {otpVerified && (
                    <div className="flex items-center justify-center gap-3 text-brand-gold text-[12px] font-bold uppercase tracking-[0.2em] animate-in zoom-in-95 duration-700 py-4">
                      <Check size={18} /> Verified Successfully
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Price Result */}
            {step === 2 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full border border-brand-gold/30 flex items-center justify-center mx-auto mb-8 relative">
                  <Check size={32} className="text-brand-gold" />
                  <div className="absolute inset-0 rounded-full border border-brand-gold animate-ping opacity-20" />
                </div>
                
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-text-muted mb-4">Estimated Market Value</p>
                
                <div ref={priceRef} className="mb-8">
                  <p className="text-5xl font-display font-black gold-text-gradient tracking-tighter">
                    ₹{estimatedPrice.toLocaleString('en-IN')}
                  </p>
                </div>
                
                <p className="text-sm text-text-muted leading-relaxed max-w-sm mx-auto mb-12 opacity-65">
                  This is a preliminary estimate. Final price will be confirmed after our expert inspects your car.
                </p>
                
                <button className="px-10 py-5 bg-brand-gold text-bg-primary font-bold text-[12px] uppercase tracking-[0.2em] rounded-full
                  hover:shadow-[0_0_40px_rgba(197,160,89,0.5)] transition-all duration-700">
                  Schedule Free Inspection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
