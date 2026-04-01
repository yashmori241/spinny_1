'use client';

import { Suspense, lazy } from 'react';

const HeroCanvasInner = lazy(() => import('./HeroCanvasInner'));

export function HeroCanvas() {
  return (
    <div className="hero-canvas-wrapper absolute right-0 top-0 h-full w-[55%] hidden md:block"
      style={{ paddingRight: 'clamp(40px, 5vw, 80px)' }}>
      <Suspense fallback={null}>
        <HeroCanvasInner />
      </Suspense>
    </div>
  );
}
