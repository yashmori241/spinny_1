'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'section' | 'div' | 'article';
}

export function SectionReveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  as: Tag = 'div',
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  containerClassName?: string;
}

export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.06,
  containerClassName = '',
}: StaggerRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={containerClassName}
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={item} className={className}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

interface CountUpProps {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  from = 0,
  to,
  suffix = '',
  duration = 2,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      if (ref.current) ref.current.textContent = to.toLocaleString() + suffix;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const update = (now: number) => {
          const elapsed = (now - start) / 1000;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out expo
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.round(from + (to - from) * eased);
          if (ref.current) {
            ref.current.textContent = current.toLocaleString() + suffix;
          }
          if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [from, to, suffix, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {from.toLocaleString()}
      {suffix}
    </span>
  );
}
