'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    // Skip if already loaded in this session
    if (sessionStorage.getItem('spinny-loaded')) {
      setShow(false);
      return;
    }

    setShow(true);
    document.body.style.overflow = 'hidden';

    // Fail-safe: Always hide after 3.5s regardless of GSAP
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
      sessionStorage.setItem('spinny-loaded', 'true');
    }, 3500);

    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    const paths = svg.querySelectorAll('path');

    try {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(container, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete: () => {
              clearTimeout(timer);
              setShow(false);
              document.body.style.overflow = '';
              sessionStorage.setItem('spinny-loaded', 'true');
            },
          });
        },
      });

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fill: 'transparent',
        });
      });

      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power2.inOut',
      }).to(paths, {
        fill: '#C9A84C',
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.3');
    } catch (e) {
      console.warn('Loader animation failed:', e);
      setShow(false); // Immediate fallback on error
      document.body.style.overflow = '';
    }

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !show) return null;

  return (
    <div ref={containerRef} className="loading-screen">
      <svg
        ref={svgRef}
        width="240"
        height="60"
        viewBox="0 0 240 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* S */}
        <path
          d="M10 45 C10 45 5 40 10 35 C15 30 25 32 25 28 C25 22 15 20 10 25"
          stroke="#C9A84C"
          strokeWidth="2.5"
          fill="transparent"
          strokeLinecap="round"
        />
        {/* P */}
        <path
          d="M35 45 L35 15 C35 15 50 15 50 25 C50 35 35 35 35 35"
          stroke="#C9A84C"
          strokeWidth="2.5"
          fill="transparent"
          strokeLinecap="round"
        />
        {/* I */}
        <path
          d="M60 15 L60 45"
          stroke="#C9A84C"
          strokeWidth="2.5"
          fill="transparent"
          strokeLinecap="round"
        />
        {/* N */}
        <path
          d="M75 45 L75 15 L95 45 L95 15"
          stroke="#C9A84C"
          strokeWidth="2.5"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* N */}
        <path
          d="M110 45 L110 15 L130 45 L130 15"
          stroke="#C9A84C"
          strokeWidth="2.5"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Y */}
        <path
          d="M145 15 L155 30 L165 15 M155 30 L155 45"
          stroke="#C9A84C"
          strokeWidth="2.5"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
