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

  const scrollToJoin = () => {
    const element = document.getElementById('how-it-works');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logo.png" alt="HustleIQ Logo" className="w-8 h-8 object-contain" />
          <span className="font-black tracking-tighter text-xl hidden sm:block">HUSTLEIQ</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={scrollToJoin} className="text-sm font-medium text-white/60 hover:text-primary transition-colors">HOW IT WORKS</button>
          <a href="#faq" className="text-sm font-medium text-white/60 hover:text-primary transition-colors">FAQ</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLoginOpen(true)}
            className="text-xs font-bold tracking-widest text-white/40 hover:text-white transition-colors px-4 py-2"
          >
            LOGIN
          </button>
          
          {/* ⚡️ REPLACED HAMBURGER: This button shows on mobile and desktop */}
          <Button 
            onClick={scrollToJoin}
            className="bg-primary hover:bg-primary/90 text-black font-black text-[10px] tracking-widest px-6 h-10 rounded-xl shadow-well active:scale-95 transition-transform"
          >
            CLAIM ACCESS
          </Button>
        </div>
      </div>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  );
};

export default Header;