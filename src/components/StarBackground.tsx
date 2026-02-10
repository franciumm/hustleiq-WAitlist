import { useEffect, useRef } from 'react';

const StarBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Safety: Clear existing stars to prevent duplication on reload
    container.innerHTML = '';

    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      
      // Randomize star sizes for depth
      const sizeRandom = Math.random();
      let sizeClass = 'w-[1px] h-[1px] opacity-30';
      if (sizeRandom > 0.9) sizeClass = 'w-[3px] h-[3px] opacity-80';
      else if (sizeRandom > 0.6) sizeClass = 'w-[2px] h-[2px] opacity-50';

      star.className = `absolute bg-white rounded-full animate-pulse ${sizeClass}`;
      
      // Randomize position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Randomize animation delay
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.animationDuration = `${2 + Math.random() * 4}s`;

      container.appendChild(star);
    }
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#0b0f0a]">
      {/* The Stars Container */}
      <div ref={containerRef} className="relative w-full h-full" />
      
      {/* The Signature Neon Green Splash */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[400px] opacity-20 blur-[120px]">
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, #63E602 0%, rgba(99, 230, 2, 0) 70%)',
          }}
        />
      </div>
    </div>
  );
};

export default StarBackground;