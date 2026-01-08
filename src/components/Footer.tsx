import { Twitter, Linkedin, Instagram } from 'lucide-react';
import hustleiqTextLogo from '@/public/hustleiq-text-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-6 border-t border-border/50 bg-black/20">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <a href="#top" className="flex items-center gap-2">
              <img 
                src="/logo.png"
                alt="HustleIQ Footer Logo" 
                /* ⚡️ OPTIMIZED: Using actual display dimensions (181x32) prevents "Image larger than needed" error */
                width="181"
                height="32"
                className="h-8 w-auto object-contain" 
              />
            </a>
            <p className="text-sm text-muted-foreground">Turn ambition into execution.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* ⚡️ ACCESSIBILITY FIX: Added <li> wrappers for valid ARIA list structure */}
            <ul className="flex items-center gap-4" role="list">
              {[
                { Icon: Twitter, label: 'Twitter', href: '#' },
                { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                { Icon: Instagram, label: 'Instagram', href: '#' }
              ].map(({ Icon, label, href }) => (
                <li key={label} role="listitem"> 
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 text-center space-y-4">
          <p className="text-xs text-muted-foreground/90 max-w-xl mx-auto">
            Results vary. No guarantees. HustleIQ focuses on execution, not promises.
          </p>
          <p className="text-sm text-muted-foreground">
            © {currentYear} HustleIQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;