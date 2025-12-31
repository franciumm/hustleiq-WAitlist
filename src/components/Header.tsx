import { useState } from 'react';
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <div className="container max-w-7xl mx-auto">
          <div className="glass-card px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="#top" className="flex items-center gap-2">
              <img 
                src={hustleiqTextLogo} 
                alt="HustleIQ" 
                className="h-8 w-auto"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <div className="flex items-center bg-secondary/50 rounded-full p-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-all duration-200"
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
                className="text-muted-foreground hover:text-foreground"
              >
                Login
              </Button>
              <Button
                className="btn-primary"
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
            <div className="lg:hidden mt-2 glass-card p-4 space-y-2">
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
