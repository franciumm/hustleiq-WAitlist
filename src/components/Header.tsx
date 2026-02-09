import { useState, useEffect } from 'react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHero = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-6'}`}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <nav 
          className={`
            flex items-center justify-between transition-all duration-300
            ${isScrolled 
              ? 'bg-[#050505]/80 backdrop-blur-md border border-[#214B2F]/30 rounded-xl px-4 py-3' 
              : 'bg-transparent border-transparent px-0 py-2'
            }
          `}
        >
          {/* Logo Area */}
          <a href="#top" className="flex items-center gap-2 z-50">
            <img 
              src="/logo.png"
              alt="HustleIQ Logo" 
              fetchPriority="high"
              width="140"
              height="40"
              className="h-6 sm:h-8 w-auto object-contain"
            />
          </a>

          {/* CTA Only - No Distractions */}
          <div className="flex items-center gap-4">
            <Button 
              onClick={scrollToHero} 
              className="bg-[#63E602] hover:bg-[#52c402] text-black font-bold font-mono rounded-lg px-5 py-2 h-auto text-xs sm:text-sm border-b-4 border-[#3a8a02] active:border-b-0 active:translate-y-[4px] transition-all"
            >
              CLAIM ACCESS
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;