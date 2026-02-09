import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import LoginModal from './LoginModal';
import { Button } from './ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-6'}`}>
        <div className="container max-w-7xl mx-auto px-4">
          <nav 
            className={`
              relative flex items-center justify-between rounded-full border backdrop-blur-xl transition-all duration-300
              ${isScrolled 
                ? 'bg-black/80 border-white/10 px-4 py-2 shadow-2xl shadow-primary/10' 
                : 'bg-transparent border-transparent px-4 py-2'
              }
            `}
          >
            {/* Logo */}
            <a href="#top" className="flex items-center gap-2 hover:opacity-90 transition-opacity z-50">
              <img 
                src="/logo.png"
                alt="HustleIQ Logo" 
                fetchPriority="high"
                className="h-6 sm:h-8 w-auto object-contain"
              />
            </a>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setLoginModalOpen(true)} 
                className="text-xs font-mono font-bold text-muted-foreground hover:text-white transition-colors uppercase tracking-widest"
              >
                [ Login ]
              </button>
              <Button 
                onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })} 
                className="rounded-full bg-primary text-black font-black px-6 hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(99,230,2,0.4)]"
              >
                CLAIM ACCESS
              </Button>
            </div>

            {/* Mobile Trigger */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-white transition-colors z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-4 p-4 bg-black/95 border border-white/10 rounded-3xl md:hidden animate-in fade-in zoom-in-95">
                <div className="flex flex-col gap-4">
                  <button onClick={() => { setLoginModalOpen(true); setMobileMenuOpen(false); }} className="p-4 text-center font-mono font-bold text-muted-foreground border-b border-white/5">LOGIN</button>
                  <Button onClick={() => { setMobileMenuOpen(false); document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full h-14 rounded-2xl bg-primary text-black font-black">CLAIM ACCESS</Button>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  );
};

export default Header;