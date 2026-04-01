'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleTabSwitch = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    setOtpSent(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
  };

  const handleSendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(phone)) { setError('Enter a valid 10-digit mobile number'); return; }
    if (activeTab === 'register' && name.length < 2) { setError('Please enter your full name'); return; }
    setError('');
    setOtpSent(true);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp]; newOtp[index] = value; setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    if (newOtp.join('') === '123456') { login({ name: name || 'User', phone }); router.push('/dashboard'); }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  };

  return (
    <div className="min-h-screen bg-bg-primary relative flex items-center justify-center overflow-hidden">
      {/* Cinematic Backdrop */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=90" 
          alt="Luxury car background" 
          fill 
          className="object-cover opacity-20 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 via-transparent to-bg-primary" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[500px] px-6">
        <div className="glass-elite luxury-border rounded-[32px] p-10 md:p-12 shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-6 opacity-50">
              <div className="w-8 h-[1px] bg-brand-gold/50" />
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-brand-gold">WELCOME BACK</p>
              <div className="w-8 h-[1px] bg-brand-gold/50" />
            </div>
            
            <h1 className="text-display-md mb-3 tracking-tighter">
              Sign In to <br />
              <span className="italic font-display gold-text-gradient">Spinny</span><span className="text-brand-gold">.</span>
            </h1>
            <p className="text-text-muted text-base tracking-wide opacity-70">
              Access your account to manage shortlists and bookings.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex glass rounded-full p-1.5 mb-10 border-white/5 relative">
            <div 
              className="absolute top-1.5 bottom-1.5 bg-brand-gold rounded-full transition-all duration-700 ease-luxury shadow-[0_0_20px_rgba(197,160,89,0.4)]"
              style={{ left: activeTab === 'login' ? '6px' : 'calc(50% + 2px)', width: 'calc(50% - 8px)' }} 
            />
            <button 
              onClick={() => handleTabSwitch('login')} 
              className={`relative z-10 flex-1 py-3 text-[13px] md:text-sm font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-500 ${activeTab === 'login' ? 'text-bg-primary' : 'text-text-muted hover:text-text-primary'}`}
            >
              Login
            </button>
            <button 
              onClick={() => handleTabSwitch('register')} 
              className={`relative z-10 flex-1 py-3 text-[13px] md:text-sm font-bold uppercase tracking-[0.2em] rounded-full transition-colors duration-500 ${activeTab === 'register' ? 'text-bg-primary' : 'text-text-muted hover:text-text-primary'}`}
            >
              Register
            </button>
          </div>

          <div className="space-y-6">
            {activeTab === 'register' && (
              <div>
                <label className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-text-muted/80 mb-3 block">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter your full name"
                  className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-5 py-4 text-base text-text-primary focus:border-brand-gold/40 focus:bg-white/[0.06] focus:outline-none transition-all placeholder:text-text-subtle/60" 
                />
              </div>
            )}
            
            <div>
              <label className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-text-muted/80 mb-3 block">Phone Number</label>
              <div className="flex gap-3">
                <div className="flex items-center px-4 bg-white/[0.04] border border-white/8 rounded-xl text-base text-brand-gold font-mono">+91</div>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                  placeholder="Enter 10-digit mobile number" 
                  maxLength={10}
                  className="flex-1 bg-white/[0.04] border border-white/8 rounded-xl px-5 py-4 text-base text-text-primary focus:border-brand-gold/40 focus:bg-white/[0.06] focus:outline-none transition-all placeholder:text-text-subtle/60" 
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-base font-medium text-center py-1">{error}</p>}

            {!otpSent ? (
              <button 
                onClick={handleSendOtp} 
                className="w-full py-5 bg-brand-gold text-bg-primary font-bold text-sm md:text-base uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_50px_rgba(197,160,89,0.5)] transition-all duration-700 ease-luxury transform hover:scale-[1.02] active:scale-[0.98] mt-2"
              >
                Send OTP
              </button>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pt-2">
                <label className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-text-muted/80 mb-4 block text-center">Enter 6-digit OTP</label>
                <div className="flex gap-3 justify-center mb-6">
                  {otp.map((digit, i) => (
                    <input 
                      key={i} 
                      ref={(el) => { otpRefs.current[i] = el; }} 
                      type="text" 
                      maxLength={1} 
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)} 
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-13 h-16 bg-white/[0.04] border border-white/8 rounded-xl text-center text-xl text-text-primary focus:border-brand-gold focus:bg-white/[0.06] focus:outline-none font-mono transition-all" 
                    />
                  ))}
                </div>
                <div className="pt-6 border-t border-white/5 text-center">
                  <p className="text-base text-text-muted">Demo OTP: <span className="text-brand-gold font-mono font-bold">123456</span></p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
