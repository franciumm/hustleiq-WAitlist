import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import hustleiqTextLogo from '@/assets/hustleiq-text-logo.png';
import LoginModal from './LoginModal';
import { Button } from './ui/button';

const navLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'FAQ', href: '#faq' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
        <div className="container max-w-7xl mx-auto px-4">
          <div 
            className={`
              relative flex items-center justify-between
              rounded-full border backdrop-blur-xl transition-all duration-300
              ${isScrolled 
                ? 'bg-black/60 border-white/10 px-5 py-3 shadow-lg shadow-green-900/10' 
                : 'bg-black/40 border-transparent px-6 py-4'
              }
            `}
          >
            {/* Logo */}
            <a href="#top" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <img 
                src={hustleiqTextLogo} 
                alt="HustleIQ" 
                className="h-7 w-auto"
              />
            </a>

            {/* Desktop Navigation - Cleaned Up */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="
                    px-4 py-2 text-sm font-medium text-muted-foreground 
                    hover:text-white hover:bg-white/5 rounded-full 
                    transition-all duration-200
                  "
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => setLoginModalOpen(true)}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                Login
              </button>
              
              <Button
                onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })}
                className="
                  rounded-full px-6 py-2 h-auto text-sm font-semibold
                  bg-gradient-to-r from-primary/90 to-primary
                  hover:from-primary hover:to-primary/90
                  shadow-[0_0_20px_-5px_rgba(74,222,128,0.4)]
                  hover:shadow-[0_0_25px_-5px_rgba(74,222,128,0.6)]
                  hover:scale-[1.02] active:scale-[0.98]
                  transition-all duration-300 border-0
                  text-primary-foreground
                "
              >
                Join the Waitlist →
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 rounded-3xl bg-black/90 border border-white/10 backdrop-blur-xl p-4 space-y-2 overflow-hidden animate-in slide-in-from-top-2 fade-in-20">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-white/10 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLoginModalOpen(true);
                  }}
                  className="w-full text-center py-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                >
                  Login
                </button>
                <Button
                  className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Join the Waitlist →
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  );
};

export default Header;