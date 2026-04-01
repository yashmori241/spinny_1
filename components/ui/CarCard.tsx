'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Fuel, Gauge } from 'lucide-react';
import { useShortlistStore } from '@/lib/store/shortlistStore';
import { formatPrice, formatMileage, formatEMI } from '@/lib/utils/formatters';
import type { Car } from '@/lib/data/cars';
import { useState, useEffect } from 'react';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const { toggle, isShortlisted } = useShortlistStore();
  const [mounted, setMounted] = useState(false);
  const liked = isShortlisted(car.id);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(car.id);
  };

  return (
    <Link href={`/car/${car.id}`} className="block group perspective-1000">
      <div className="glass-elite luxury-border rounded-[24px] overflow-hidden transition-all duration-700 ease-luxury group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.7)] group-hover:-translate-y-2 relative">
        {/* Specular Highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
        
        {/* Image */}
        <div className="relative aspect-[16/11] overflow-hidden">
          <div className="absolute inset-0" suppressHydrationWarning>
            <Image
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover brightness-[0.85] transition-all duration-[2000ms] ease-luxury group-hover:scale-110 group-hover:brightness-100"
            />
          </div>
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-50" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {car.assured && (
              <div className="glass-elite px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border-brand-gold/30 text-brand-gold shadow-[0_8px_20px_rgba(197,160,89,0.2)] backdrop-blur-md">
                Verified
              </div>
            )}
            {car.trending && (
              <div className="glass px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border-white/10 text-white/80 backdrop-blur-md">
                Trending
              </div>
            )}
          </div>

          {/* Heart */}
          <button
            onClick={handleLike}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass border-white/10
              flex items-center justify-center transition-all duration-500
              hover:bg-brand-gold hover:text-bg-primary group/heart z-20"
            aria-label={mounted && liked ? 'Remove from shortlist' : 'Add to shortlist'}
          >
            <Heart
              size={16}
              className={`transition-all duration-500 ${
                mounted && liked ? 'fill-current text-white scale-110' : 'text-white/50 group-hover/heart:text-bg-primary'
              }`}
            />
          </button>
        </div>

        {/* Details */}
        <div className="p-7 relative">
          <div className="flex justify-between items-start mb-5">
            <div>
              <p className="text-[11px] font-mono font-bold text-brand-gold/60 uppercase tracking-[0.15em] mb-1.5">{car.year}</p>
              <h3 className="font-display font-black text-text-primary text-xl tracking-tight leading-tight group-hover:text-brand-gold transition-colors duration-500">
                {car.make} <span className="opacity-60">{car.model}</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-6 text-text-muted text-[11px] uppercase font-semibold tracking-[0.15em] mb-7 opacity-70">
            <div className="flex items-center gap-2">
              <Gauge size={13} className="text-brand-gold/50" />
              <span>{formatMileage(car.mileage)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel size={13} className="text-brand-gold/50" />
              <span>{car.fuelType}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between pt-6 border-t border-white/5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted/60 mb-2">Price</p>
              <p className="text-2xl font-display font-black text-text-primary tracking-tight gold-text-gradient">
                {formatPrice(car.price)}
              </p>
            </div>
            <div className="text-right">
                <p className="text-[12px] font-mono font-bold text-brand-gold tracking-tight mb-1">
                  {formatEMI(car.emiPerMonth)}<span className="opacity-40">/mo</span>
                </p>
                <p className="text-[10px] font-semibold text-text-subtle uppercase tracking-[0.15em]">EMI starts</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
