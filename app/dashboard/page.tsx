'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Settings, Calendar, LogOut } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import { useShortlistStore } from '@/lib/store/shortlistStore';
import { cars } from '@/lib/data/cars';
import { CarCard } from '@/components/ui/CarCard';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { shortlist } = useShortlistStore();
  const [activeTab, setActiveTab] = useState('shortlist');
  const [editName, setEditName] = useState(false);
  const [nameVal, setNameVal] = useState('');
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) router.push('/login');
  }, [mounted, isAuthenticated, router]);

  // eslint-disable-next-line
  useEffect(() => { if (user) setNameVal(user.name); }, [user]);

  if (!mounted || !isAuthenticated) return (
    <div className="pt-[80px] min-h-screen bg-bg-primary flex items-center justify-center">
      <p className="text-text-muted text-lg">Loading...</p>
    </div>
  );

  const shortlistedCars = cars.filter((c) => shortlist.includes(c.id));
  const tabs = [
    { id: 'shortlist', label: 'My Shortlist', icon: <Heart size={16} /> },
    { id: 'bookings', label: 'My Bookings', icon: <Calendar size={16} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
  ];

  return (
    <div className="pt-[80px] min-h-screen bg-bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-gold/[0.02] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-12 border-b border-white/5 gap-10">
          <div>
            <div className="flex items-center gap-4 mb-8 opacity-60">
               <div className="w-12 h-[1px] bg-brand-gold/50" />
               <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold">MY DASHBOARD</p>
            </div>
            <h1 className="text-display-lg tracking-tighter leading-tight">
              Welcome, <br />
              <span className="italic font-display gold-text-gradient">{user?.name}</span><span className="text-brand-gold">.</span>
            </h1>
          </div>
          <button onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-4 px-8 py-4 glass-elite luxury-border rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted hover:text-red-400 hover:border-red-400/30 transition-all duration-700 group cursor-pointer">
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform duration-500" /> 
            Log Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-8 mb-16 border-b border-white/5">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 pb-6 text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-700 relative
                ${activeTab === tab.id ? 'text-brand-gold' : 'text-text-muted/60 hover:text-white'}`}>
              <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-700 ${activeTab === tab.id ? 'border-brand-gold bg-brand-gold/5 shadow-[0_0_15px_rgba(197,160,89,0.3)]' : 'border-white/10'}`}>
                 {tab.icon}
              </div>
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-brand-gold" />
              )}
              {tab.id === 'shortlist' && shortlist.length > 0 && (
                <span className="ml-2 px-2.5 py-0.5 bg-brand-gold text-bg-primary text-[10px] font-black rounded-full">{shortlist.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          {activeTab === 'shortlist' && (
            shortlistedCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {shortlistedCars.map((c) => <CarCard key={c.id} car={c} />)}
              </div>
            ) : (
              <div className="text-center py-32 glass-elite luxury-border rounded-[32px]">
                <Heart size={40} className="mx-auto text-brand-gold/30 mb-8" />
                <p className="text-xl font-display font-bold text-text-primary mb-4">No Cars Shortlisted Yet</p>
                <p className="text-text-muted text-base max-w-sm mx-auto mb-10">Start browsing our collection and tap the heart icon on cars you love.</p>
                <a href="/browse" className="inline-flex px-8 py-4 bg-brand-gold text-bg-primary text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_40px_rgba(197,160,89,0.4)] transition-all">Browse Cars →</a>
              </div>
            )
          )}

          {activeTab === 'bookings' && (
            <div className="text-center py-32 glass-elite luxury-border rounded-[32px]">
              <Calendar size={40} className="mx-auto text-brand-gold/30 mb-8" />
              <p className="text-xl font-display font-bold text-text-primary mb-4">No Bookings Yet</p>
              <p className="text-text-muted text-base max-w-sm mx-auto mb-10">When you book a test drive or purchase a car, it will appear here.</p>
              <a href="/browse" className="inline-flex px-8 py-4 bg-brand-gold text-bg-primary text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_40px_rgba(197,160,89,0.4)] transition-all">Browse Cars →</a>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-elite luxury-border rounded-[28px] p-10 relative overflow-hidden group hover:bg-white/[0.02] transition-colors duration-1000">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/[0.05] blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                 <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="flex-1">
                     <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/60 mb-4">Name</p>
                     {editName ? (
                      <div className="flex flex-col gap-4">
                        <input value={nameVal} onChange={(e) => setNameVal(e.target.value)}
                          className="bg-white/[0.04] border border-white/10 rounded-xl px-5 py-3 text-lg font-display text-text-primary focus:border-brand-gold/40 focus:outline-none transition-all" />
                        <div className="flex gap-6">
                           <button onClick={() => setEditName(false)} className="text-[11px] font-bold text-brand-gold uppercase tracking-[0.2em] hover:text-white transition-colors">Save</button>
                           <button onClick={() => setEditName(false)} className="text-[11px] font-bold text-text-muted/40 uppercase tracking-[0.2em] hover:text-white transition-colors">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-2xl font-display font-black text-text-primary tracking-tight">{user?.name}</p>
                    )}
                  </div>
                  {!editName && (
                     <button onClick={() => setEditName(true)} className="p-3 rounded-full glass-elite border border-white/5 text-text-muted/40 hover:text-brand-gold hover:border-brand-gold/30 duration-700 transition-all group/icon">
                        <Settings size={16} className="group-hover/icon:rotate-90 transition-transform duration-700" />
                     </button>
                  )}
                </div>
              </div>

              <div className="glass-elite luxury-border rounded-[28px] p-10 relative overflow-hidden group hover:bg-white/[0.02] transition-colors duration-1000">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/[0.05] blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                 <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/60 mb-4 relative z-10">Phone Number</p>
                 <p className="text-2xl font-mono font-black text-text-primary tracking-tight relative z-10">{user?.phone}</p>
                 <div className="mt-6 flex items-center gap-3 relative z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[11px] font-semibold text-text-muted/50">Verified</span>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
