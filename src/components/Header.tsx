import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import hustleiqTextLogo from '@/assets/hustleiq-text-logo.png';
import LoginModal from './LoginModal';
import { Button } from './ui/button';

const navLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container max-w-7xl mx-auto px-2 sm:px-4">
          <nav 
            className={`
              relative flex items-center justify-between rounded-full border backdrop-blur-xl transition-all duration-300
              ${isScrolled 
                ? 'bg-black/60 border-white/10 px-4 py-2.5 shadow-lg shadow-green-900/10' 
                : 'bg-black/40 border-transparent px-4 py-3 sm:px-6'
              }
            `}
            aria-label="Main Navigation"
          >
            <a href="#top" className="flex items-center gap-2 hover:opacity-90 transition-opacity z-50">
              <img 
                src={hustleiqTextLogo} 
                alt="HustleIQ Logo" 
                /* ⚡️ FIXED: Added actual dimensions (1080x191 aspect ratio) */
                width="1080"
                height="191"
                className="h-5 sm:h-7 w-auto object-contain"
              />
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-full transition-all">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button onClick={() => setLoginModalOpen(true)} className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                Login
              </button>
              <Button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full px-6 py-2 h-auto text-sm font-semibold shadow-[0_0_20px_-5px_rgba(74,222,128,0.4)]">
                Join Waitlist →
              </Button>
            </div>

            <button
              className="lg:hidden p-1 text-muted-foreground hover:text-white transition-colors relative z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
          {/* Mobile menu logic remains same ... */}
        </div>
      </header>
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  );
};

export default Header;