'use client';

import { useState } from 'react';
import { calculateEMI, getTotalInterest, getTotalPayment, generateAmortization } from '@/lib/utils/emi';
import { formatPrice } from '@/lib/utils/formatters';
import { ChevronDown } from 'lucide-react';

export default function EMIPage() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(60);
  const [showTable, setShowTable] = useState(false);

  const emi = calculateEMI(principal, rate, tenure);
  const totalInterest = getTotalInterest(principal, rate, tenure);
  const totalPayment = getTotalPayment(principal, rate, tenure);
  const interestPercent = Math.round((totalInterest / totalPayment) * 100);
  const schedule = generateAmortization(principal, rate, tenure);

  return (
    <div className="min-h-screen bg-bg-main relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-gold/[0.02] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        {/* Header - Full Width */}
        <div className="mb-16">
           <div className="flex items-center gap-4 mb-8 opacity-60">
             <div className="w-12 h-[1px] bg-brand-gold/50" />
             <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold">EMI CALCULATOR</p>
           </div>
           <h1 className="text-display-lg mb-4 tracking-tighter leading-tight">
             Plan Your Car <span className="italic font-display gold-text-gradient">Financing</span><span className="text-brand-gold">.</span>
           </h1>
           <p className="text-text-muted text-lg font-body max-w-xl leading-relaxed opacity-75">
             Calculate your monthly EMI and plan your budget with precision. Adjust loan amount, interest rate, and tenure to find the perfect plan.
           </p>
        </div>

        {/* Calculator - Single Column Layout to prevent overlap */}
        <div className="max-w-3xl">
          <div className="bg-bg-soft p-10 lg:p-14 border border-border rounded-[32px] relative overflow-hidden shadow-[0_4px_30px_rgba(91,45,134,0.05)]">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/[0.03] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="space-y-14 relative z-10">
              {/* Sliders */}
              <div className="space-y-10">
                <div className="space-y-5">
                  <div className="flex justify-between items-end">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/70">Loan Amount</label>
                    <span className="text-2xl font-mono text-brand-gold tracking-tighter font-bold">{formatPrice(principal)}</span>
                  </div>
                  <input type="range" min={100000} max={5000000} step={50000} value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))} />
                  <div className="flex justify-between text-[11px] text-text-subtle/50">
                    <span>₹1 Lakh</span><span>₹50 Lakh</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-5">
                    <div className="flex justify-between items-end">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/70">Interest Rate</label>
                      <span className="text-lg font-mono text-text-primary font-bold">{rate}%</span>
                    </div>
                    <input type="range" min={6} max={18} step={0.5} value={rate}
                      onChange={(e) => setRate(Number(e.target.value))} />
                    <div className="flex justify-between text-[11px] text-text-subtle/50">
                      <span>6%</span><span>18%</span>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="flex justify-between items-end">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/70">Tenure (Months)</label>
                      <span className="text-lg font-mono text-text-primary font-bold">{tenure}</span>
                    </div>
                    <input type="range" min={12} max={84} step={6} value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))} />
                    <div className="flex justify-between text-[11px] text-text-subtle/50">
                      <span>12 mo</span><span>84 mo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="flex flex-col md:flex-row gap-10 pt-12 border-t border-border items-center">
                <div className="flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted/60 mb-3">Monthly EMI</p>
                  <p className="text-5xl font-display font-black text-brand-gold tracking-tighter">
                    ₹{emi.toLocaleString('en-IN')}
                  </p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="relative w-20 h-20">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <path d={`M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831`}
                        fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
                      <path d={`M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831`}
                        fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
                        className="transition-all duration-[2000ms] ease-luxury"
                        strokeDasharray={`${100 - interestPercent}, 100`} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-[11px] font-mono font-bold text-brand-gold">{100 - interestPercent}%</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted/50 mb-1">Total Interest</p>
                      <p className="text-sm font-mono text-text-primary tracking-tight font-bold">{formatPrice(totalInterest)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted/50 mb-1">Total Payable</p>
                      <p className="text-sm font-mono text-text-primary tracking-tight font-bold">{formatPrice(totalPayment)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-5 bg-brand-purple text-white font-bold text-[12px] uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_30px_rgba(91,45,134,0.3)] transition-all duration-700">
                 Apply for Car Loan
              </button>
            </div>
          </div>
        </div>

        {/* Amortization Table */}
        <div className="w-full mt-20">
           <div className="h-[1px] w-full bg-border mb-16" />
           
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                 <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-4">DETAILED BREAKDOWN</p>
                 <h2 className="text-display-md tracking-tighter leading-tight text-text-primary">Amortization <span className="italic font-display">Schedule</span>.</h2>
              </div>
              <button onClick={() => setShowTable(!showTable)}
                className="flex items-center gap-4 px-8 py-4 bg-bg-soft border border-border rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold hover:border-brand-gold/30 transition-all duration-700 group">
                {showTable ? 'Hide Schedule' : 'Show Schedule'}
                <ChevronDown size={16} className={`transition-transform duration-700 ease-luxury ${showTable ? 'rotate-180' : ''}`} />
              </button>
           </div>

          {showTable && (
            <div className="bg-bg-soft border border-border rounded-[32px] p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted/50">Month</th>
                      <th className="py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted/50 text-right">Principal</th>
                      <th className="py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted/50 text-right">Interest</th>
                      <th className="py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted/50 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-sm tracking-tight">
                    {schedule.map((row) => (
                      <tr key={row.month} className="border-b border-border group hover:bg-black/[0.02] transition-colors duration-300">
                        <td className="py-5 text-text-primary/50 font-semibold group-hover:text-brand-gold transition-colors">Month {row.month}</td>
                        <td className="py-5 text-right text-text-primary/80">{formatPrice(row.principal)}</td>
                        <td className="py-5 text-right text-brand-gold/50 group-hover:text-brand-gold/80 transition-colors">{formatPrice(row.interest)}</td>
                        <td className="py-5 text-right text-text-primary font-bold">{formatPrice(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
