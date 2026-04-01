'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Fuel, Gauge } from 'lucide-react';
import { useShortlistStore } from '@/lib/store/shortlistStore';
import { formatPrice, formatMileage, formatEMI } from '@/lib/utils/formatters';
import type { Car } from '@/lib/data/cars';
import { useState, useEffect } from 'react';
import { TiltCard } from './TiltCard';

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
    <Link href={`/car/${car.id}`} className="block group">
      <TiltCard className="card-shimmer-top rounded-[24px] overflow-hidden h-full">
        <div
          className="glass-elite luxury-border rounded-[24px] overflow-hidden transition-all duration-500 ease-out relative h-full"
          style={{
            boxShadow: '0 2px 12px rgba(91,45,134,0.08)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(91,45,134,0.22)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(91,45,134,0.08)';
          }}
        >
          {/* Image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <div className="absolute inset-0" suppressHydrationWarning>
              {mounted && (
                <Image
                  src={car.images[0]}
                  alt={`${car.make} ${car.model}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover brightness-[0.85] transition-all duration-700 group-hover:scale-[1.07] group-hover:-translate-y-[6px] group-hover:brightness-95"
                />
              )}
            </div>

            {/* Bottom gradient */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.6) 0%, transparent 50%)' }} />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {car.assured && (
                <div
                  className="text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full px-3 py-1"
                  style={{
                    backdropFilter: 'blur(8px)',
                    background: 'rgba(91,45,134,0.75)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  Verified
                </div>
              )}
              {car.trending && (
                <div
                  className="text-[10px] font-bold uppercase tracking-[0.2em] rounded-full px-3 py-1"
                  style={{ background: '#C5A059', color: '#1C1C1C' }}
                >
                  Trending
                </div>
              )}
            </div>

            {/* Heart */}
            <button
              onClick={handleLike}
              className="absolute top-3 right-3 w-10 h-10 rounded-full glass border-white/10
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
          <div style={{ padding: 'clamp(16px, 2vw, 24px)' }} className="relative">
            {/* Name */}
            <div className="mb-2">
              <p className="text-[11px] font-mono font-bold text-brand-gold/60 uppercase tracking-[0.15em] mb-1">{car.year}</p>
              <h3
                className="font-display font-black text-text-primary tracking-tight leading-tight group-hover:text-brand-gold transition-colors duration-500"
                style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', marginBottom: '8px' }}
              >
                {car.make} <span className="opacity-60">{car.model}</span>
              </h3>
            </div>

            {/* Specs row */}
            <div
              className="flex items-center text-text-muted text-[11px] uppercase font-semibold tracking-[0.15em] opacity-70"
              style={{ marginTop: '12px', gap: '16px' }}
            >
              <div className="flex items-center gap-2">
                <Gauge size={13} className="text-brand-gold/50" />
                <span>{formatMileage(car.mileage)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Fuel size={13} className="text-brand-gold/50" />
                <span>{car.fuelType}</span>
              </div>
            </div>

            {/* Divider */}
            <div style={{ margin: '14px 0', height: '1px', background: 'rgba(232,232,232,0.08)' }} />

            {/* Price */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted/60 mb-1">Price</p>
                <p className="text-xl font-display font-black tracking-tight gold-text-gradient">
                  {formatPrice(car.price)}
                </p>
                <p className="text-[10px] font-semibold text-text-subtle uppercase tracking-[0.15em] mt-1">EMI starts</p>
                <p className="text-[12px] font-mono font-bold text-brand-gold tracking-tight">
                  {formatEMI(car.emiPerMonth)}<span className="opacity-40">/mo</span>
                </p>
              </div>
            </div>

            {/* Book Now — slides up on hover */}
            <button
              className="book-now-btn w-full mt-4 py-2.5 rounded-full border border-brand-gold/30 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-gold hover:bg-brand-gold hover:text-bg-primary transition-colors duration-300"
              onClick={(e) => e.preventDefault()}
            >
              Book Now
            </button>
          </div>
        </div>
      </TiltCard>
    </Link>
  );
}
