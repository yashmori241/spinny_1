'use client';

import { useState } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { cars, Car } from '@/lib/data/cars';
import { formatPrice, formatMileage } from '@/lib/utils/formatters';
import Image from 'next/image';

export default function ComparePage() {
  const [selected, setSelected] = useState<Car[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = cars.filter((c) => 
    `${c.make} ${c.model}`.toLowerCase().includes(search.toLowerCase()) &&
    !selected.find((s) => s.id === c.id)
  );

  const addCar = (car: Car) => {
    if (selected.length < 3) { setSelected([...selected, car]); setModalOpen(false); setSearch(''); }
  };

  const removeCar = (id: string) => setSelected(selected.filter((c) => c.id !== id));

  const specs = [
    { label: 'Price', key: (c: Car) => formatPrice(c.price) },
    { label: 'Year', key: (c: Car) => c.year.toString() },
    { label: 'Mileage', key: (c: Car) => formatMileage(c.mileage) },
    { label: 'Fuel', key: (c: Car) => c.fuelType },
    { label: 'Transmission', key: (c: Car) => c.transmission },
    { label: 'Engine', key: (c: Car) => c.engine },
    { label: 'Power', key: (c: Car) => c.power },
    { label: 'Seats', key: (c: Car) => `${c.seats}` },
    { label: 'Body Type', key: (c: Car) => c.bodyType },
    { label: 'Color', key: (c: Car) => c.color },
    { label: 'Owners', key: (c: Car) => `${c.owners}` },
    { label: 'Inspection', key: (c: Car) => `${c.inspectionScore}/200` },
    { label: 'Location', key: (c: Car) => c.location },
  ];

  return (
    <div className="min-h-screen bg-bg-main text-text-primary px-6 py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-purple/[0.02] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-8 opacity-60">
           <div className="w-12 h-[1px] bg-brand-purple/50" />
           <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-purple">COMPARE CARS</p>
           <div className="w-12 h-[1px] bg-brand-purple/50" />
        </div>
        
        <h1 className="text-display-lg mb-14 tracking-tighter leading-tight text-text-primary">
          Side-by-Side <br />
          <span className="italic font-display text-brand-purple">Comparison</span><span className="text-brand-purple">.</span>
        </h1>
 
        {selected.length === 0 ? (
          <div className="text-center py-32 bg-bg-soft border border-border rounded-[32px] relative overflow-hidden animate-in fade-in zoom-in-95 duration-700">
            <div className="absolute inset-0 bg-brand-purple/[0.03] blur-[150px] rounded-full pointer-events-none" />
            <div className="relative z-10">
               <div className="w-20 h-20 rounded-full border border-brand-purple/20 bg-bg-main flex items-center justify-center mx-auto mb-8 shadow-[0_2px_10px_rgba(91,45,134,0.05)]">
                 <Plus size={32} className="text-brand-purple" />
               </div>
               <p className="text-text-muted text-lg mb-10 font-body max-w-sm mx-auto opacity-70">
                Select up to 3 cars to compare their features, specs, and pricing side by side.
               </p>
               <button onClick={() => setModalOpen(true)}
                 className="px-10 py-5 bg-brand-purple text-white font-bold text-[12px] uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_30px_rgba(91,45,134,0.3)] transition-all duration-700">
                 Add First Car
               </button>
            </div>
          </div>
        ) : (
          <div className="bg-bg-soft border border-border rounded-[32px] p-8 lg:p-12 relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 shadow-sm">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/[0.03] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
             
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr>
                    <th className="w-52 text-left py-8 pr-12 border-b border-border align-bottom">
                      {selected.length < 3 && (
                        <button onClick={() => setModalOpen(true)}
                          className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-purple hover:text-text-primary transition-all duration-500 flex items-center gap-3 group">
                          <div className="w-9 h-9 rounded-full border border-brand-purple/30 flex items-center justify-center group-hover:border-text-primary transition-all duration-500 group-hover:scale-110">
                             <Plus size={14} />
                          </div>
                          Add Car
                        </button>
                      )}
                    </th>
                    {selected.map((car) => (
                      <th key={car.id} className="p-8 border-b border-border text-center">
                        <div className="relative group mx-auto max-w-[260px]">
                          <button onClick={() => removeCar(car.id)}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-white backdrop-blur-xl border border-border rounded-full flex items-center justify-center z-20 hover:border-red-400 transition-all duration-300 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 shadow-sm">
                            <X size={14} className="text-text-muted hover:text-red-400 transition-colors" />
                          </button>
                          <div className="w-full aspect-[16/10] relative rounded-[20px] overflow-hidden mb-5 shadow-sm bg-bg-main p-[1px] group-hover:-translate-y-1 transition-transform duration-700 border border-border">
                            <Image src={car.images[0]} alt={car.model} fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-luxury" sizes="260px" />
                          </div>
                          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-brand-purple/80 mb-1">{car.year} {car.make.toUpperCase()}</p>
                          <p className="text-2xl font-display font-black text-text-primary tracking-tighter leading-none">{car.model}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {specs.map((spec, idx) => (
                    <tr key={spec.label} className="border-b border-border group hover:bg-black/[0.02] transition-colors duration-300">
                      <td className="py-6 pr-8 text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted group-hover:text-brand-purple transition-colors">{spec.label}</td>
                      {selected.map((car) => (
                        <td key={car.id} className={`p-8 text-sm text-text-primary text-center tracking-tight font-medium ${idx === 0 ? 'text-lg text-brand-purple font-black' : ''}`}>
                          {spec.key(car)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Car Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-bg-main border border-border rounded-[32px] w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/[0.05] blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
             
            <div className="p-8 border-b border-border bg-black/[0.01] flex items-center gap-6">
              <Search size={20} className="text-brand-purple" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by make or model..." autoFocus
                className="flex-1 bg-transparent text-lg font-display font-bold text-text-primary focus:outline-none placeholder:text-text-muted/50 tracking-tight" />
              <button onClick={() => setModalOpen(false)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-red-400 transition-all cursor-pointer group bg-white shadow-sm">
                 <X size={18} className="text-text-muted group-hover:text-red-400 duration-300" />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[60vh] p-5 space-y-3 custom-scrollbar">
              {filtered.length > 0 ? filtered.map((car) => (
                <button key={car.id} onClick={() => addCar(car)}
                  className="w-full flex items-center gap-6 p-6 rounded-[20px] hover:bg-black/[0.03] border border-transparent hover:border-border transition-all duration-500 text-left group relative">
                  <div className="w-24 h-16 relative rounded-xl overflow-hidden flex-shrink-0 bg-white border border-border p-[1px]">
                    <Image src={car.images[0]} alt={car.model} fill className="object-cover group-hover:scale-105 transition-all duration-700" sizes="100px" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-brand-purple/80 mb-1 group-hover:text-brand-purple transition-colors">{car.year} {car.make.toUpperCase()}</p>
                    <p className="text-xl font-display font-black text-text-primary tracking-tight leading-none group-hover:translate-x-1 transition-transform duration-500">{car.model}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-mono font-black text-text-primary tracking-tighter group-hover:scale-105 transition-transform duration-500">{formatPrice(car.price)}</p>
                    <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mt-0.5">Available</p>
                  </div>
                </button>
              )) : (
                <div className="py-16 text-center text-text-muted text-sm">No cars match your search</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
