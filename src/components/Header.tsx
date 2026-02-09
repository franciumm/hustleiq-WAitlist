import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6">
      <div className="container max-w-7xl mx-auto px-6">
        <nav className="flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <img src="/logo.png" alt="HustleIQ Logo" className="h-6 w-auto" />
          </a>
          
          <Button 
            onClick={() => document.getElementById('waitlist-input')?.focus()}
            className="btn-primary h-11 text-xs"
          >
            CLAIM FOUNDER ACCESS
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;