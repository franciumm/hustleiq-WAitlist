// src/components/Header.tsx
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; // We can eventually remove Menu/X if unused elsewhere
import LoginModal from './LoginModal';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToJoin = () => {
    const element = document.getElementById('how-it-works');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LEFT SIDE: UNTOUCHED */}
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logo.png" alt="HustleIQ Logo" className="w-8 h-8 object-contain" />
          <span className="font-black text-xl tracking-tighter uppercase italic">HustleIQ</span>
        </div>

        {/* RIGHT SIDE: DESKTOP */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => setShowLogin(true)} className="text-[10px] font-mono font-bold text-white/40 hover:text-primary uppercase tracking-widest transition-colors">
            BUILDER_LOGIN
          </button>
          <Button 
            onClick={scrollToJoin}
            className="btn-primary px-6 py-2 rounded-xl text-[10px] h-auto"
          >
            CLAIM ACCESS →
          </Button>
        </div>

        {/* RIGHT SIDE: MOBILE - ⚡️ REPLACED HAMBURGER WITH BUTTON */}
        <div className="flex md:hidden items-center gap-3">
          <button 
            onClick={() => setShowLogin(true)} 
            className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest mr-2"
          >
            LOGIN
          </button>
          <Button 
            onClick={scrollToJoin}
            className="btn-primary px-4 py-2 rounded-lg text-[9px] h-auto font-black"
          >
            CLAIM ACCESS
          </Button>
        </div>
      </div>

      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
    </header>
  );
};

export default Header;