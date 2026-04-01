'use client';

import { useRef, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'gold' | 'ghost' | 'outline';
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  variant = 'gold',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < 80) {
      const maxDrift = 8;
      const strength = 1 - distance / 80;
      const moveX = distX * strength * (maxDrift / 40);
      const moveY = distY * strength * (maxDrift / 40);
      btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0, 0)';
    btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(() => {
      if (btn) btn.style.transition = '';
    }, 400);
  }, []);

  const baseStyles = 'inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold font-body rounded-card transition-all duration-300 ease-luxury relative overflow-hidden';

  const variantStyles = {
    gold: 'bg-brand-gold text-bg-primary hover:shadow-[0_0_40px_rgba(197,160,89,0.4)]',
    ghost: 'border border-white/20 text-text-primary hover:border-brand-gold/30 hover:text-brand-gold',
    outline: 'border border-brand-gold-muted text-brand-gold hover:bg-brand-gold hover:text-bg-primary',
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor
    >
      {children}
    </button>
  );
}
