export function SkeletonCard() {
  const shimmerStyle = {
    backgroundImage: 'linear-gradient(110deg, transparent 30%, rgba(197,160,89,0.05) 50%, transparent 70%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 3s linear infinite',
  };

  return (
    <div className="glass border border-white/5 rounded-[32px] overflow-hidden opacity-40">
      {/* Image skeleton */}
      <div className="aspect-[4/3] bg-white/5" style={shimmerStyle} />
      
      {/* Content skeleton */}
      <div className="p-6 space-y-6">
        <div className="space-y-3">
          <div className="h-6 w-3/4 rounded-full bg-white/5" style={{...shimmerStyle, animationDelay: '0.1s'}} />
          <div className="h-3 w-1/4 rounded-full bg-white/5" style={{...shimmerStyle, animationDelay: '0.2s'}} />
        </div>
        
        <div className="flex gap-4 border-y border-white/5 py-4">
           <div className="h-2 w-12 rounded-full bg-white/5" style={{...shimmerStyle, animationDelay: '0.3s'}} />
           <div className="h-2 w-12 rounded-full bg-white/5" style={{...shimmerStyle, animationDelay: '0.4s'}} />
        </div>

        <div className="flex justify-between items-end pt-2">
          <div className="space-y-2">
            <div className="h-2 w-16 rounded-full bg-white/5" style={{...shimmerStyle, animationDelay: '0.5s'}} />
            <div className="h-8 w-32 rounded-full bg-white/5" style={{...shimmerStyle, animationDelay: '0.6s'}} />
          </div>
          <div className="h-10 w-20 rounded-full bg-white/5" style={{...shimmerStyle, animationDelay: '0.7s'}} />
        </div>
      </div>
    </div>
  );
}
