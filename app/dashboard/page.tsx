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
    <div className="pt-[80px] min-h-screen bg-bg-main flex items-center justify-center">
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
    <div className="pt-[80px] min-h-screen bg-bg-main relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-purple/[0.02] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-12 border-b border-border gap-10">
          <div>
            <div className="flex items-center gap-4 mb-8 opacity-60">
               <div className="w-12 h-[1px] bg-brand-purple/50" />
               <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-purple">MY DASHBOARD</p>
            </div>
            <h1 className="text-display-lg tracking-tighter leading-tight text-text-primary">
              Welcome, <br />
              <span className="italic font-display text-brand-purple">{user?.name}</span><span className="text-brand-purple">.</span>
            </h1>
          </div>
          <button onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-4 px-8 py-4 bg-bg-soft border border-border rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted hover:text-red-400 hover:border-red-400/30 transition-all duration-700 group cursor-pointer shadow-sm">
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform duration-500" /> 
            Log Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-8 mb-16 border-b border-border">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 pb-6 text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-700 relative
                ${activeTab === tab.id ? 'text-brand-purple' : 'text-text-muted hover:text-text-primary'}`}>
              <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-700 ${activeTab === tab.id ? 'border-brand-purple bg-brand-purple/5 shadow-[0_0_15px_rgba(91,45,134,0.3)]' : 'border-border bg-bg-soft'}`}>
                 {tab.icon}
              </div>
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-brand-purple" />
              )}
              {tab.id === 'shortlist' && shortlist.length > 0 && (
                <span className="ml-2 px-2.5 py-0.5 bg-brand-purple text-white text-[10px] font-black rounded-full">{shortlist.length}</span>
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
              <div className="text-center py-32 bg-bg-soft border border-border shadow-sm rounded-[32px]">
                <Heart size={40} className="mx-auto text-brand-purple/40 mb-8" />
                <p className="text-xl font-display font-bold text-text-primary mb-4">No Cars Shortlisted Yet</p>
                <p className="text-text-muted text-base max-w-sm mx-auto mb-10">Start browsing our collection and tap the heart icon on cars you love.</p>
                <a href="/browse" className="inline-flex px-8 py-4 bg-brand-purple text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_30px_rgba(91,45,134,0.3)] transition-all">Browse Cars →</a>
              </div>
            )
          )}

          {activeTab === 'bookings' && (
            <div className="text-center py-32 bg-bg-soft border border-border shadow-sm rounded-[32px]">
              <Calendar size={40} className="mx-auto text-brand-purple/40 mb-8" />
              <p className="text-xl font-display font-bold text-text-primary mb-4">No Bookings Yet</p>
              <p className="text-text-muted text-base max-w-sm mx-auto mb-10">When you book a test drive or purchase a car, it will appear here.</p>
              <a href="/browse" className="inline-flex px-8 py-4 bg-brand-purple text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_30px_rgba(91,45,134,0.3)] transition-all">Browse Cars →</a>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-bg-soft border border-border shadow-sm rounded-[28px] p-10 relative overflow-hidden group hover:bg-black/[0.02] transition-colors duration-1000">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-brand-purple/[0.05] blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                 <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="flex-1">
                     <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/60 mb-4">Name</p>
                     {editName ? (
                      <div className="flex flex-col gap-4">
                        <input value={nameVal} onChange={(e) => setNameVal(e.target.value)}
                          className="bg-transparent border border-border rounded-xl px-5 py-3 text-lg font-display text-text-primary focus:border-brand-purple/40 focus:outline-none transition-all" />
                        <div className="flex gap-6">
                           <button onClick={() => setEditName(false)} className="text-[11px] font-bold text-brand-purple uppercase tracking-[0.2em] hover:text-text-primary transition-colors">Save</button>
                           <button onClick={() => setEditName(false)} className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em] hover:text-text-primary transition-colors">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-2xl font-display font-black text-text-primary tracking-tight">{user?.name}</p>
                    )}
                  </div>
                  {!editName && (
                     <button onClick={() => setEditName(true)} className="p-3 rounded-full bg-white border border-border text-text-muted hover:text-brand-purple hover:border-brand-purple/30 duration-700 transition-all group/icon">
                        <Settings size={16} className="group-hover/icon:rotate-90 transition-transform duration-700" />
                     </button>
                  )}
                </div>
              </div>

              <div className="bg-bg-soft border border-border shadow-sm rounded-[28px] p-10 relative overflow-hidden group hover:bg-black/[0.02] transition-colors duration-1000">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-brand-purple/[0.05] blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
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
