'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

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
