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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % labels.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30">
      <div className="glass-card px-6 py-2 rounded-full border-primary/20 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span 
            key={currentIndex}
            className="text-sm font-medium text-foreground min-w-[120px] text-center"
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
