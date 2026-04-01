'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    // Only show on devices with fine pointer (desktop)
    const hasFineMouse = window.matchMedia('(pointer: fine)').matches;
    if (!hasFineMouse) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    const drag = dragRef.current;
    if (!outer || !inner) return;

    const quickOuter = {
      x: gsap.quickTo(outer, 'x', { duration: 0.5, ease: 'power3.out' }),
      y: gsap.quickTo(outer, 'y', { duration: 0.5, ease: 'power3.out' }),
    };

    const quickInner = {
      x: gsap.quickTo(inner, 'x', { duration: 0.15, ease: 'power3.out' }),
      y: gsap.quickTo(inner, 'y', { duration: 0.15, ease: 'power3.out' }),
    };

    const quickDrag = drag ? {
      x: gsap.quickTo(drag, 'x', { duration: 0.2, ease: 'power3.out' }),
      y: gsap.quickTo(drag, 'y', { duration: 0.2, ease: 'power3.out' }),
    } : null;

    let hasMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        setIsVisible(true);
        // Only hide native cursor AFTER custom cursor is moving
        document.documentElement.classList.add('has-custom-cursor');
      }
      quickOuter.x(e.clientX - 16);
      quickOuter.y(e.clientY - 16);
      quickInner.x(e.clientX - 3);
      quickInner.y(e.clientY - 3);
      if (quickDrag) {
        quickDrag.x(e.clientX - 30);
        quickDrag.y(e.clientY - 30);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor], input, textarea, select, label')) {
        gsap.to(outer, { scale: 1.5, borderColor: '#C9A84C', duration: 0.3, ease: 'power2.out' });
        gsap.to(inner, { backgroundColor: '#C9A84C', duration: 0.3, ease: 'power2.out' });
      }
      if (target.closest('[data-cursor="drag"]')) {
        setIsDragging(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor], input, textarea, select, label')) {
        gsap.to(outer, { scale: 1, borderColor: 'rgba(255,255,255,0.6)', duration: 0.3, ease: 'power2.out' });
        gsap.to(inner, { backgroundColor: '#fff', duration: 0.3, ease: 'power2.out' });
      }
      if (target.closest('[data-cursor="drag"]')) {
        setIsDragging(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={outerRef}
        className="custom-cursor"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.6)',
          zIndex: 100000,
        }}
      />
      <div
        ref={innerRef}
        className="custom-cursor"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#fff',
          zIndex: 100001,
        }}
      />
      {isDragging && (
        <div
          ref={dragRef}
          className="custom-cursor"
          style={{
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            color: '#C9A84C',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          DRAG
        </div>
      )}
    </>
  );
}
