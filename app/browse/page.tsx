'use client';

import { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { cars, brands, bodyTypes, fuelTypes, transmissionTypes } from '@/lib/data/cars';
import { CarCard } from '@/components/ui/CarCard';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { formatPrice } from '@/lib/utils/formatters';

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="pt-[80px] min-h-screen bg-bg-primary flex items-center justify-center"><p className="text-text-muted">Loading...</p></div>}>
      <BrowseContent />
    </Suspense>
  );
}

function BrowseContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [sortBy, setSortBy] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Read brand from URL query param (from brand grid clicks)
  useEffect(() => {
    const brandParam = searchParams.get('brand');
    if (brandParam && brands.includes(brandParam)) {
      setSelectedBrands([brandParam]);
    }
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredCars = useMemo(() => {
    let result = [...cars];

    if (selectedBrands.length > 0) {
      result = result.filter((c) => selectedBrands.includes(c.make));
    }
    if (selectedBodyTypes.length > 0) {
      result = result.filter((c) => selectedBodyTypes.includes(c.bodyType));
    }
    if (selectedFuel.length > 0) {
      result = result.filter((c) => selectedFuel.includes(c.fuelType));
    }
    if (selectedTransmission.length > 0) {
      result = result.filter((c) => selectedTransmission.includes(c.transmission));
    }
    result = result.filter((c) => c.price >= priceRange[0] && c.price <= priceRange[1]);

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'year-new') result.sort((a, b) => b.year - a.year);
    if (sortBy === 'mileage-low') result.sort((a, b) => a.mileage - b.mileage);

    return result;
  }, [selectedBrands, selectedBodyTypes, selectedFuel, selectedTransmission, priceRange, sortBy]);

  const toggleFilter = useCallback((arr: string[], setArr: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  }, []);

  const clearAll = () => {
    setSelectedBrands([]);
    setSelectedBodyTypes([]);
    setSelectedFuel([]);
    setSelectedTransmission([]);
    setPriceRange([0, 10000000]);
    setSortBy('');
  };

  const activeFilters = [...selectedBrands, ...selectedBodyTypes, ...selectedFuel, ...selectedTransmission];

  const renderFilters = () => (
    <div className="space-y-8">
      {/* Price Range */}
      <div className="pb-8 border-b border-white/5">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Price Range</h3>
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-end">
               <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted/60">Minimum</p>
               <p className="text-sm font-mono text-text-primary tracking-tighter font-bold">{formatPrice(priceRange[0])}</p>
            </div>
            <input
              type="range" min={0} max={10000000} step={100000} value={priceRange[0]}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPriceRange([Math.min(val, priceRange[1] - 100000), priceRange[1]]);
              }}
            />
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-end">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted/60">Maximum</p>
                <p className="text-sm font-mono text-text-primary tracking-tighter font-bold">{formatPrice(priceRange[1])}</p>
             </div>
            <input
              type="range" min={0} max={10000000} step={100000} value={priceRange[1]}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPriceRange([priceRange[0], Math.max(val, priceRange[0] + 100000)]);
              }}
            />
          </div>
        </div>
      </div>

      {/* Brand */}
      <div className="pb-8 border-b border-white/5">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-6">Brand</h3>
        <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center justify-between cursor-pointer group py-0.5">
              <span className={`text-[12px] font-semibold transition-all duration-300
                ${selectedBrands.includes(brand) ? 'text-brand-gold' : 'text-text-muted group-hover:text-text-primary'}`}>
                {brand}
              </span>
              <div className={`w-4 h-4 rounded-full border transition-all duration-300 flex items-center justify-center
                ${selectedBrands.includes(brand) ? 'border-brand-gold bg-brand-gold/20' : 'border-white/10 group-hover:border-white/30'}`}>
                <input
                  type="checkbox" checked={selectedBrands.includes(brand)}
                  onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                  className="hidden"
                />
                {selectedBrands.includes(brand) && <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Body Type */}
      <div className="pb-8 border-b border-white/5">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-6">Body Type</h3>
        <div className="flex flex-wrap gap-2">
          {bodyTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleFilter(selectedBodyTypes, setSelectedBodyTypes, type)}
              className={`px-4 py-2 text-[11px] font-semibold rounded-full border transition-all duration-500
                ${selectedBodyTypes.includes(type)
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                  : 'border-white/5 text-text-muted hover:border-white/20'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div className="pb-8 border-b border-white/5">
         <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-6">Fuel Type</h3>
         <div className="flex flex-wrap gap-2">
           {fuelTypes.map((type) => (
             <button
               key={type}
               onClick={() => toggleFilter(selectedFuel, setSelectedFuel, type)}
               className={`px-4 py-2 text-[11px] font-semibold rounded-full border transition-all duration-500
                 ${selectedFuel.includes(type)
                   ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                   : 'border-white/5 text-text-muted hover:border-white/20'
                 }`}
             >
               {type}
             </button>
           ))}
         </div>
      </div>

      <div className="pb-2">
         <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-6">Transmission</h3>
         <div className="flex flex-wrap gap-2">
           {transmissionTypes.map((type) => (
             <button
               key={type}
               onClick={() => toggleFilter(selectedTransmission, setSelectedTransmission, type)}
               className={`px-4 py-2 text-[11px] font-semibold rounded-full border transition-all duration-500
                 ${selectedTransmission.includes(type)
                   ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                   : 'border-white/5 text-text-muted hover:border-white/20'
                 }`}
             >
               {type}
             </button>
           ))}
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/[0.03] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6 opacity-60">
               <div className="w-12 h-[1px] bg-brand-gold/50" />
               <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold">BROWSE CARS</p>
            </div>
            <h1 className="text-display-lg tracking-tighter leading-tight mb-6">
               Find Your <br />
               <span className="italic font-display gold-text-gradient">Perfect Car</span><span className="text-brand-gold">.</span>
            </h1>
            <div className="flex items-center gap-5 text-[11px] font-mono text-text-muted uppercase tracking-wider opacity-60">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                {filteredCars.length} cars found
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="relative hidden md:block group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/[0.04] border border-white/5 rounded-full
                  px-6 py-3 text-[11px] font-semibold text-text-muted pr-10 focus:border-brand-gold/40 focus:outline-none transition-all cursor-pointer hover:bg-white/[0.06]"
              >
                <option value="">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest First</option>
                <option value="mileage-low">Mileage: Lowest</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gold/40 pointer-events-none" />
            </div>

            {/* Mobile filter toggle */}
            <button
              className="md:hidden flex items-center gap-2 px-5 py-3 bg-white/[0.04] border border-white/5 rounded-full text-[11px] font-bold uppercase tracking-wider text-brand-gold"
              onClick={() => setMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
            {activeFilters.map((filter) => (
              <span
                key={filter}
                className="px-4 py-2 glass-elite border border-brand-gold/20 rounded-full text-[11px] font-semibold text-brand-gold flex items-center gap-2 hover:border-brand-gold/40 transition-all"
              >
                {filter}
                <button
                  onClick={() => {
                    setSelectedBrands((prev) => prev.filter((v) => v !== filter));
                    setSelectedBodyTypes((prev) => prev.filter((v) => v !== filter));
                    setSelectedFuel((prev) => prev.filter((v) => v !== filter));
                    setSelectedTransmission((prev) => prev.filter((v) => v !== filter));
                  }}
                  className="hover:text-white transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <button
              onClick={clearAll}
              className="px-4 py-2 text-[11px] font-semibold text-text-subtle hover:text-red-400 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex gap-10 items-start">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-[100px]">
            <div className="glass-elite luxury-border rounded-[28px] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Filters</h2>
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              </div>
              
              {renderFilters()}
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                : filteredCars.map((car, i) => (
                    <div key={car.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-luxury fill-mode-both" style={{ animationDelay: `${i * 80}ms` }}>
                      <CarCard car={car} />
                    </div>
                  ))}
            </div>

            {!loading && filteredCars.length === 0 && (
              <div className="text-center py-24 glass-elite luxury-border rounded-[28px] max-w-2xl mx-auto">
                <p className="text-display-md text-text-muted mb-4 opacity-40">No Cars Found</p>
                <p className="text-text-muted text-sm mb-8">Try adjusting your filters to see more results.</p>
                <button 
                  onClick={clearAll} 
                  className="px-8 py-4 bg-brand-gold text-bg-primary text-[12px] font-bold uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_40px_rgba(197,160,89,0.4)] transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      <div
        className={`fixed inset-0 z-[9995] md:hidden transition-all duration-700 ease-luxury
          ${mobileFilterOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-700
            ${mobileFilterOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileFilterOpen(false)}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 glass-elite bg-bg-surface/90 rounded-t-[28px] p-8 max-h-[90vh] overflow-y-auto
            transition-transform duration-700 ease-luxury shadow-[0_-30px_80px_rgba(0,0,0,0.8)]
            ${mobileFilterOpen ? 'translate-y-0' : 'translate-y-[110%]'}`}
        >
          <div className="w-10 h-[2px] bg-brand-gold/30 rounded-full mx-auto mb-8" />
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Filters</h2>
            <button onClick={() => setMobileFilterOpen(false)} className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center text-text-muted hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
          {renderFilters()}
          <button
            onClick={() => setMobileFilterOpen(false)}
            className="w-full mt-8 py-4 bg-brand-gold text-bg-primary text-[12px] font-bold uppercase tracking-[0.2em] rounded-full"
          >
            Show {filteredCars.length} Cars
          </button>
        </div>
      </div>
    </div>
  );
}
