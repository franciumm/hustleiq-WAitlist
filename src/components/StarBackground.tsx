import { useEffect, useRef } from 'react';

const StarBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const starCount = 150;
    
    // Cleanup old stars to prevent duplicates
    const existingStars = container.querySelectorAll('.star');
    existingStars.forEach(star => star.remove());
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      const random = Math.random();
      if (random > 0.9) {
        star.classList.add('star-large');
      } else if (random > 0.7) {
        // default size
      } else {
        star.classList.add('star-small');
      }
      
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = `${0.1 + Math.random() * 0.7}`;
      star.style.animationDelay = `${Math.random() * 4}s`;
      star.style.animationDuration = `${3 + Math.random() * 4}s`;
      
      container.appendChild(star);
    }
  }, []);

  return (
    // ⚡️ FIX: Removed z-[-1]. Now it is z-0, so it sits ON TOP of the black body
    // but BEHIND your content (because your content is z-10).
    <div 
      className="fixed top-0 left-0 w-full overflow-hidden pointer-events-none z-0 bg-[#0b0f0aff]"
      // ⚡️ SAFARI FIX: 100dvh ensures it covers the full screen even when address bar moves
      style={{ height: '100dvh' }} 
    >
      {/* Green Splash */}
      <div className="absolute bottom-0 left-0 -translate-x-[20%] translate-y-[30%] z-0">
        <div 
          style={{
            width: '396.166px',
            height: '143.414px',
            borderRadius: '396.166px',
            background: 'radial-gradient(74.4% 74.4% at 50% 25.6%, #63E602 0%, rgba(33, 75, 47, 0.00) 100%)',
            filter: 'blur(100px)',
            transform: 'rotate(43.286deg)',
          }}
        />
      </div>
      
      {/* Stars Container - Ref attached here to keep logic clean */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-10" />
    </div>
  );
};

export default StarBackground;