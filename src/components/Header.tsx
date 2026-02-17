// src/components/Header.tsx
import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import { Button } from './ui/button';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'
    }`}>
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="HustleIQ Logo" className="w-8 h-8 object-contain" />
          <span className="font-mono font-black text-xl tracking-tighter italic">HUSTLE<span className="text-primary">IQ</span></span>
        </div>

        {/* ⚡️ FIXED: Removed the "three dashes" (Menu icon) for mobile */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => setLoginOpen(true)}
            className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5"
          >
            LOGIN
          </Button>
        </div>
      </div>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  );
};

export default Header;