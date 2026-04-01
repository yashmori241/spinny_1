'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => {
        // Approximates lerp: 0.08 feel — smooth deceleration
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      touchMultiplier: 1.8,
      smoothWheel: true,
    } as ConstructorParameters<typeof Lenis>[0]);

    lenisRef.current = lenis;

    const rafRef = { id: 0 };
    function raf(time: number) {
      lenis.raf(time);
      rafRef.id = requestAnimationFrame(raf);
    }

    rafRef.id = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafRef.id);
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
