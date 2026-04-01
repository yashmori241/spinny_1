'use client';

export function MarqueeStrip() {
  const items = [
    'SPINNY ASSURED ®',
    '200-POINT INSPECTION',
    '5-DAY MONEY BACK',
    'HOME TEST DRIVE',
    '3-YEAR WARRANTY',
    'FREE RC TRANSFER',
  ];

  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-10 px-8 whitespace-nowrap">
      <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-text-primary/70">{item}</span>
      <span className="text-brand-gold text-[6px] shadow-[0_0_8px_rgba(197,160,89,0.5)]">◆</span>
    </span>
  ));

  return (
    <div className="w-full overflow-hidden glass border-y border-white/5" style={{ height: 52 }}>
      <div className="marquee-track flex items-center h-full animate-ticker">
        <div className="flex items-center">{content}</div>
        <div className="flex items-center">{content}</div>
        <div className="flex items-center">{content}</div>
        <div className="flex items-center">{content}</div>
      </div>
    </div>
  );
}
