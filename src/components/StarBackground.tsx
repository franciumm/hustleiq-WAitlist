import { useEffect, useRef } from 'react';

const StarBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const starCount = 100;
    
    // Clear existing stars
    container.innerHTML = '';
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random size class
      const sizeClass = Math.random() > 0.7 ? 'star-large' : Math.random() > 0.5 ? '' : 'star-small';
      if (sizeClass) star.classList.add(sizeClass);
      
      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Random animation delay
      star.style.animationDelay = `${Math.random() * 4}s`;
      star.style.animationDuration = `${3 + Math.random() * 3}s`;
      
      container.appendChild(star);
    }
  }, []);

  return <div ref={containerRef} className="star-field" aria-hidden="true" />;
};

export default StarBackground;
