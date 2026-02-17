// src/components/Header.tsx
import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ⚡️ Fix: Handle scroll locking when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Handle scroll effect for glass header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 py-4",
          isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 z-[110]">
            <img src="/logo.png" alt="HustleIQ" className="w-8 h-8" />
            <span className="font-black tracking-tighter text-xl uppercase italic">Hustle<span className="text-primary">IQ</span></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[10px] font-mono font-bold text-white/40 hover:text-primary uppercase tracking-widest transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button className="btn-primary py-2 px-6 rounded-lg text-[10px]">GET ACCESS</Button>
          </nav>

          {/* ⚡️ Hamburger Toggle (Mobile Only) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-[110] p-2 text-white hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* ⚡️ Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[105] bg-black/95 backdrop-blur-2xl transition-all duration-500 md:hidden flex flex-col items-center justify-center p-8",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-[-20px]"
        )}
      >
        <nav className="flex flex-col items-center gap-8 w-full">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="group flex items-center gap-4 text-2xl font-black uppercase tracking-tighter hover:text-primary transition-all"
            >
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-all">-</span>
              {link.name}
            </a>
          ))}
          
          <div className="w-full h-[1px] bg-white/5 my-4" />
          
          <Button 
            onClick={() => {
              setIsMenuOpen(false);
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full btn-primary py-6 rounded-xl text-xs flex items-center justify-center gap-2"
          >
            CLAIM YOUR SPOT <ChevronRight className="w-4 h-4" />
          </Button>

          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] mt-8">
            v1.0.4 — SYSTEM_READY
          </p>
        </nav>
      </div>
    </>
  );
};

export default Header;