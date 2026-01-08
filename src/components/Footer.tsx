import { Twitter, Linkedin, Instagram } from 'lucide-react';
import hustleiqTextLogo from '@/assets/hustleiq-text-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-6 border-t border-border/50 bg-black/20">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <a href="#top" className="flex items-center gap-2">
              <img 
                src={hustleiqTextLogo} 
                alt="HustleIQ Footer Logo" 
                width="1080"
                height="191"
                className="h-8 w-auto object-contain" 
              />
            </a>
            <p className="text-sm text-muted-foreground">Turn ambition into execution.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-4" role="list">
              {[
                { Icon: Twitter, label: 'Twitter', href: '#' },
                { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                { Icon: Instagram, label: 'Instagram', href: '#' }
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 text-center space-y-4">
          <p className="text-xs text-muted-foreground/90 max-w-xl mx-auto">
            Results vary. No guarantees. HustleIQ focuses on execution, not promises.
          </p>
          <p className="text-sm text-muted-foreground">© {currentYear} HustleIQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;