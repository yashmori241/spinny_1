'use client';

import { useRef, useState, useCallback, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  disabled?: boolean;
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  perspective = 800,
  scale = 1.03,
  disabled = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Disable tilt on touch devices
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isTouchDevice) return;
      const card = ref.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotateY = ((x - cx) / cx) * maxTilt;
      const rotateX = -((y - cy) / cy) * maxTilt;

      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;

      setGlowPos({ x: glowX, y: glowY });
      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: 'transform 0.1s ease-out',
      });
    },
    [disabled, isTouchDevice, maxTilt, perspective, scale]
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled || isTouchDevice) return;
    setIsHovered(true);
  }, [disabled, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (disabled || isTouchDevice) return;
    setIsHovered(false);
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
      transition: 'transform 0.5s ease-out',
    });
  }, [disabled, isTouchDevice, perspective]);

  return (
    <div
      ref={ref}
      className={`tilt-card relative ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {/* Specular highlight overlay */}
      {isHovered && !disabled && !isTouchDevice && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}
