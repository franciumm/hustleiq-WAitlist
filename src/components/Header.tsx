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
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <div className="container max-w-7xl mx-auto">
          <div 
            className={`
              glass-card flex items-center justify-between
              border border-primary/30 backdrop-blur-xl
              shadow-[0_0_20px_rgba(74,222,128,0.2)]
              transition-all duration-300 ease-out
              ${isCompact 
                ? 'px-4 py-2 shadow-[0_0_15px_rgba(74,222,128,0.15)]' 
                : 'px-6 py-3 shadow-[0_0_20px_rgba(74,222,128,0.2)]'
              }
            `}
          >
            {/* Logo */}
            <a href="#top" className="flex items-center gap-2">
              <img 
                src={hustleiqTextLogo} 
                alt="HustleIQ" 
                className={`w-auto transition-all duration-300 ${isCompact ? 'h-6' : 'h-8'}`}
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <div 
                className={`
                  flex items-center bg-secondary/50 rounded-full
                  transition-all duration-300
                  ${isCompact ? 'p-0.5 gap-0' : 'p-1 gap-0'}
                `}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`
                      font-medium text-muted-foreground hover:text-foreground 
                      hover:bg-secondary rounded-full transition-all duration-200
                      ${isCompact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}
                    `}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Right side buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => setLoginModalOpen(true)}
                className={`text-muted-foreground hover:text-foreground transition-all duration-300 ${isCompact ? 'text-xs px-3 py-1' : ''}`}
              >
                Login
              </Button>
              <Button
                className={`btn-primary transition-all duration-300 ${isCompact ? 'text-xs px-4 py-1.5' : ''}`}
                onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Join the Waitlist →
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2 glass-card p-4 space-y-2 border border-primary/30 shadow-[0_0_15px_rgba(74,222,128,0.15)]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border/50 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLoginModalOpen(true);
                  }}
                  className="block w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-all text-left"
                >
                  Login
                </button>
                <Button
                  className="w-full btn-primary"
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