'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Award, Cpu } from 'lucide-react';

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.about-section').forEach((section) => {
        gsap.from(section, {
          opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.stat-counter').forEach((el) => {
        const target = parseInt(el.getAttribute('data-val') || '0');
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: target, duration: 1.8, ease: 'power2.out', snap: { textContent: 1 },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const milestones = [
    { year: '2015', title: 'Founded', desc: 'Spinny was born with a mission to make used car buying trustworthy and transparent.' },
    { year: '2017', title: 'First Hub Launched', desc: 'Opened our first Spinny Hub in Gurugram with a collection of 200 quality-checked cars.' },
    { year: '2019', title: '5 Cities', desc: 'Expanded across Delhi, Mumbai, Bangalore, Hyderabad, and Pune to reach more customers.' },
    { year: '2021', title: 'Unicorn Status', desc: 'Became a unicorn startup with $283M in Series E funding, validating our customer-first model.' },
    { year: '2023', title: '20+ Cities', desc: 'Now serving over 20 cities across India with 10,000+ cars available at any time.' },
  ];

  const cities = [
    { name: 'Delhi NCR', x: 52, y: 22 },
    { name: 'Jaipur', x: 44, y: 26 },
    { name: 'Kolkata', x: 68, y: 35 },
    { name: 'Mumbai', x: 35, y: 48 },
    { name: 'Pune', x: 38, y: 52 },
    { name: 'Hyderabad', x: 47, y: 55 },
    { name: 'Bangalore', x: 42, y: 65 },
    { name: 'Chennai', x: 50, y: 63 },
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-bg-main relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-purple/[0.02] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      {/* Hero */}
      <div className="about-section py-32 text-center relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center gap-6 mb-10 opacity-60">
             <div className="w-12 h-[1px] bg-brand-purple/50" />
             <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-purple">ABOUT SPINNY</p>
             <div className="w-12 h-[1px] bg-brand-purple/50" />
          </div>
          <h1 className="text-display-lg mb-8 tracking-tighter leading-tight text-text-primary">
            Redefining How India <br />
            <span className="italic font-display text-brand-purple">Buys Cars</span><span className="text-brand-purple">.</span>
          </h1>
          <p className="text-text-muted text-xl leading-relaxed font-body max-w-2xl mx-auto opacity-75">
            Spinny is India's most trusted platform for certified pre-owned cars. 
            We bring complete transparency, 200-point quality checks, and a hassle-free buying experience to every customer.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="about-section py-24 border-y border-border bg-black/[0.01]">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { val: 200000, suffix: '+', label: 'Happy Customers' },
            { val: 20, suffix: '+', label: 'Cities Covered' },
            { val: 3000, suffix: '+', label: 'Team Members' },
            { val: 200, suffix: '', label: 'Point Inspection' },
          ].map((s) => (
            <div key={s.label} className="bg-bg-soft border border-border rounded-[28px] p-10 group hover:shadow-[0_4px_30px_rgba(91,45,134,0.05)] transition-all duration-1000">
              <p className="text-4xl font-display font-black text-brand-purple mb-4 tracking-tighter">
                <span className="stat-counter" data-val={s.val}>0</span>{s.suffix}
              </p>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-text-muted group-hover:text-brand-purple transition-colors duration-700">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="about-section py-32 border-b border-border">
        <div className="max-w-5xl mx-auto px-6">
           <div className="text-center mb-24">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-purple mb-6">OUR JOURNEY</p>
              <h2 className="text-display-md tracking-tighter leading-tight text-text-primary">A Legacy of <span className="italic font-display text-brand-purple">Trust</span>.</h2>
           </div>
          <div className="space-y-20 relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-brand-purple/10 md:-translate-x-1/2" />
            {milestones.map((m, i) => (
              <div key={m.year} className={`about-section flex flex-col md:flex-row gap-10 items-start md:items-center relative ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-14 h-14 rounded-full bg-bg-main border border-brand-purple/40 flex items-center justify-center flex-shrink-0 relative z-10 md:absolute md:left-1/2 md:-translate-x-1/2 shadow-[0_0_30px_rgba(91,45,134,0.1)]">
                  <span className="text-[11px] font-mono font-bold text-brand-purple tracking-wider">{m.year}</span>
                </div>
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pl-20' : 'md:pr-20 md:text-right'}`}>
                  <h3 className="font-display font-black text-2xl text-text-primary mb-4 tracking-tight">{m.title}</h3>
                  <p className="text-text-muted text-base leading-relaxed opacity-90">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* City Coverage with Proper Map */}
      <div className="about-section py-32 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-brand-purple/[0.01] blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-purple mb-6">COVERAGE</p>
            <h2 className="text-display-md tracking-tighter text-text-primary">Present Across <span className="italic font-display">20+ Cities</span>.</h2>
          </div>
          
          {/* City Grid - cleaner than a crude SVG map */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {cities.map((city) => (
              <div key={city.name} className="bg-bg-soft border border-border rounded-[20px] p-6 text-center group hover:border-brand-purple/40 hover:shadow-[0_4px_20px_rgba(91,45,134,0.05)] transition-all duration-700 cursor-default">
                <div className="w-3 h-3 rounded-full bg-brand-purple mx-auto mb-4 shadow-[0_0_15px_rgba(91,45,134,0.6)] group-hover:shadow-[0_0_25px_rgba(91,45,134,0.8)] transition-all relative">
                  <div className="absolute inset-0 rounded-full border border-brand-purple animate-ping opacity-20" />
                </div>
                <p className="text-sm font-semibold text-text-muted group-hover:text-brand-purple transition-colors tracking-wide">{city.name}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-text-muted text-sm mt-10 opacity-60">...and expanding to more cities every month</p>
        </div>
      </div>

      {/* Core Values */}
      <div className="about-section py-32 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-purple mb-6">OUR VALUES</p>
            <h2 className="text-display-md tracking-tighter text-text-primary">Built on <span className="italic font-display text-brand-purple">Trust & Quality</span>.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Shield className="w-8 h-8 text-brand-purple" />, title: 'Complete Transparency', desc: 'Honest pricing, detailed condition reports, and certified vehicle history for every car we sell.' },
              { icon: <Award className="w-8 h-8 text-brand-purple" />, title: 'Quality Guarantee', desc: 'Every car passes a rigorous 200-point inspection. If it doesn\'t meet our standards, we don\'t sell it.' },
              { icon: <Cpu className="w-8 h-8 text-brand-purple" />, title: 'Tech-First Approach', desc: 'We leverage technology to make buying and selling cars seamless, secure, and delightful.' },
            ].map((v) => (
              <div key={v.title} className="about-section bg-bg-soft border border-border rounded-[28px] p-10 group hover:bg-black/[0.02] shadow-sm transition-all duration-1000">
                <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {v.icon}
                </div>
                <h3 className="font-display font-black text-2xl text-text-primary mb-4 tracking-tight">{v.title}</h3>
                <p className="text-text-muted text-base leading-relaxed opacity-90">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
