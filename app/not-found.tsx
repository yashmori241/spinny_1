import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center relative overflow-hidden">
      {/* Giant 404 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[30vw] font-black text-brand-gold/5 leading-none">
          404
        </span>
      </div>

      <div className="relative z-10 text-center px-12">
        <div className="flex items-center justify-center gap-4 mb-8 opacity-40">
           <div className="w-12 h-[1px] bg-brand-gold/50" />
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">ERROR PROTOCOL 404</p>
           <div className="w-12 h-[1px] bg-brand-gold/50" />
        </div>
        <h1 className="text-display-lg mb-8 tracking-tighter leading-[0.9]">
           Asset Not <br />
           <span className="italic font-display gold-text-gradient">Located</span><span className="text-brand-gold">.</span>
        </h1>
        <p className="text-text-muted text-lg font-body leading-relaxed max-w-sm mx-auto mb-12 opacity-60">
          The requested coordinate does not exist within our current portfolio.
          Return to the executive suite to continue your acquisition.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-4 px-10 py-5 bg-brand-gold text-bg-primary font-bold text-[10px] uppercase tracking-[0.3em] rounded-full hover:shadow-[0_0_40px_rgba(197,160,89,0.4)] transition-all"
        >
          Return to Portfolio
          <div className="w-6 h-[1.5px] bg-bg-primary/50" />
        </Link>
      </div>

      {/* Floating particles — using CSS animation from globals.css */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-brand-gold/20"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animation: `float ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${i % 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
