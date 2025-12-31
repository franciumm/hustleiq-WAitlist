import { useState, useEffect } from 'react';

const labels = [
  'Starting',
  'Scaling',
  'E-Com',
  'Crypto',
  'SMMA',
  'Dropshipping',
  'AI Automation',
  'Copywriting',
];

const DynamicIsland = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % labels.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Shrink after scrolling past 200px (roughly past hero area)
      setIsCompact(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30">
      <div 
        className={`
          glass-card rounded-full border-primary/20 backdrop-blur-xl
          transition-all duration-300 ease-out
          ${isCompact 
            ? 'px-4 py-1.5 shadow-[0_0_15px_rgba(74,222,128,0.15)]' 
            : 'px-6 py-2 shadow-[0_0_20px_rgba(74,222,128,0.2)]'
          }
        `}
      >
        <div className="flex items-center gap-2">
          <div 
            className={`
              rounded-full bg-primary animate-pulse transition-all duration-300
              ${isCompact ? 'w-1.5 h-1.5' : 'w-2 h-2'}
            `} 
          />
          <span 
            key={currentIndex}
            className={`
              font-medium text-foreground text-center transition-all duration-300
              ${isCompact ? 'text-xs min-w-[80px]' : 'text-sm min-w-[120px]'}
            `}
            style={{ animation: 'fade-in 0.3s ease-out' }}
          >
            {labels[currentIndex]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DynamicIsland;