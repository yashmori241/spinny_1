# Spinny Project — Agent Rules

## Code Standards
- TypeScript strict mode always
- All components are functional, no class components
- All client components have 'use client' directive
- All GSAP code inside useEffect with cleanup (return () => ctx.revert())
- All ScrollTriggers killed on component unmount
- All Lenis instances destroyed on unmount
- No inline styles — use Tailwind classes or CSS variables
- Images: always use Next.js <Image> component with alt text
- No #-prefixed hex colors anywhere (GSAP will break)

## Design Rules
- Background primary: 0A0A0A (never pure #000000)
- Accent gold: C9A84C (never #FFD700)
- Accent red: E63329
- Text primary: F5F5F0
- Text muted: 888880
- All border-radius on cards: 4px (sharp luxury, not bubbly)
- Hover transitions: cubic-bezier(0.16, 1, 0.3, 1) 0.3s minimum

## Animation Rules
- Always check window.matchMedia('(prefers-reduced-motion: reduce)') before adding animations
- GSAP ScrollTrigger: always call ScrollTrigger.refresh() after route changes
- Custom cursor: pointer-events: none, position: fixed, z-index: 9999
- Magnetic buttons: max drift 8px, lerp 0.15, reset on mouseleave
- Lenis: connect to GSAP ticker for sync

## File Structure Rules
- Components in /components/[category]/ComponentName.tsx
- Page-specific components colocated in /app/[route]/_components/
- Shared hooks in /lib/hooks/
- Utilities in /lib/utils/
- Mock data in /lib/data/
- Zustand stores in /lib/store/
