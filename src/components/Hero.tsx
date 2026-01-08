import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast'; 
import businessModelImage from '@/assets/business-model.png';
import hustleiqLogo from '@/assets/hustleiq-logo.png';
import posthog from 'posthog-js';

const Hero = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // --- ANTI-SPAM STATES ---
  const [botField, setBotField] = useState(''); // Honeypot field
  const [mountTime, setMountTime] = useState(0); // For rate limiting

  useEffect(() => {
    // Record when the component loaded
    setMountTime(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- SPAM PROTECTION CHECKS ---
    
    // 1. HONEYPOT: If the hidden field has a value, it's a bot.
    if (botField !== '') {
      setSubmitted(true); // Fake success to fool the bot
      return;
    }

    // 2. TIME CHECK: If form submitted in < 1.5 seconds, likely a bot.
    if (Date.now() - mountTime < 1500) {
      return; 
    }

    if (!email) return;
    
    setIsSubmitting(true);

    // --- LOOPS.SO INTEGRATION ---
    // 👇 ACTION REQUIRED: Replace this URL with your actual Loops endpoint
    const FORM_URL = "https://app.loops.so/api/newsletter-form/YOUR_FORM_ID_HERE";

    try {
      const response = await fetch(FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // We add userGroup=Waitlist so you can filter them easily later
        body: `email=${encodeURIComponent(email)}&userGroup=Waitlist`,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      // --- ANALYTICS ---
      // 1. Identify the user (links session to email)
      posthog.identify(email);

      // 2. Send the event
      posthog.capture('waitlist_signup', {
        location: 'hero_section',
        email: email
      });

      // --- UI UPDATES ---
      setSubmitted(true);
      setEmail('');
      
      // Show Success Toast
      toast({
        title: "You're on the list! 🚀",
        description: "Welcome to the future of execution. We'll be in touch soon.",
      });

    } catch (error) {
      console.error('Waitlist error:', error);
      
      // Show Error Toast
      toast({
        title: "Connection Error",
        description: "We couldn't add you to the waitlist. Please try again.",
        variant: "destructive", 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Avatar stack data
  const avatars = [
    { bg: 'bg-blue-500', initials: 'JD' },
    { bg: 'bg-green-500', initials: 'AM' },
    { bg: 'bg-purple-500', initials: 'SK' },
    { bg: 'bg-orange-500', initials: 'LP' },
    { bg: 'bg-pink-500', initials: 'RW' },
  ];

  return (
    <section id="how-it-works" className="relative min-h-screen flex items-center justify-center px-6 py-20 lg:py-0 pt-32">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6 text-center lg:text-left order-1 lg:order-2">
            
            {/* BADGE DESIGN */}
            <div 
              className="relative mx-auto lg:mx-0 opacity-0 w-[394px] h-[72px] flex items-center justify-center"
              style={{ animation: 'fade-in-up 0.6s ease-out 0.2s forwards' }}
            >
              {/* Outer Ring */}
              <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 394 72" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="outerGradient" x1="197" y1="0" x2="197" y2="72" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#373C34" />
                    <stop offset="1" stopColor="#373C34" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <rect 
                  x="0.5" y="0.5" 
                  width="393" height="71" 
                  rx="36" 
                  fill="#252723" 
                  fillOpacity="0.55" 
                  stroke="url(#outerGradient)" 
                  strokeWidth="1"
                />
              </svg>

              {/* Inner Ring */}
              <div className="relative w-[380px] h-[64px]">
                <svg className="absolute inset-0 w-full h-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-full" viewBox="0 0 380 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="innerGradient" x1="190" y1="0" x2="190" y2="64" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#373c34ff" />
                      <stop offset="1" stopColor="#373c34ff" />
                    </linearGradient>
                  </defs>
                  <rect 
                    x="0.5" y="0.5" 
                    width="379" height="63" 
                    rx="32" 
                    fill="#252723c0" 
                    fillOpacity="1" 
                    stroke="url(#innerGradient)" 
                    strokeWidth="1"
                  />
                </svg>
                
                {/* Badge Content */}
                <div className="relative z-10 w-full h-full flex items-center justify-center gap-4">
                  <img src={hustleiqLogo} alt="HustleIQ" className="w-10 h-8" />
                  <span className="text-xl font-extrabold text-white tracking-wide font-sans pt-1">
                    Early Access Soon
                  </span>
                </div>
              </div>
            </div>

            {/* Headline */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight opacity-0"
              style={{ animation: 'fade-in-up 0.8s ease-out 0.4s forwards' }}
            >
              Stop Guessing.{' '}
              <span className="gradient-text">Start Executing.</span>
            </h1>

            {/* Subheadline */}
            <div 
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 opacity-0 space-y-1"
              style={{ animation: 'fade-in-up 0.8s ease-out 0.6s forwards' }}
            >
              <p>From 0 to your first <span className="text-primary font-semibold">$10K/month</span> business.</p>
              <p>Your first milestone starts with execution.</p>
            </div>

            {/* CTA Form */}
            <form 
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0 opacity-0"
              style={{ animation: 'fade-in-up 0.8s ease-out 0.8s forwards' }}
            >
              {submitted ? (
                <div className="glass-card px-6 py-4 text-center w-full">
                  <p className="text-primary font-medium">🎉 You're on the list!</p>
                  <p className="text-sm text-muted-foreground mt-1">We'll notify you when we launch.</p>
                </div>
              ) : (
                <>
                  {/* --- HONEYPOT FIELD (Hidden from humans, visible to bots) --- */}
                  <input
                    type="text"
                    name="b_check_field"
                    tabIndex={-1}
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                    autoComplete="off"
                    style={{ opacity: 0, position: 'absolute', zIndex: -1, width: 0, height: 0 }}
                    aria-hidden="true"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary py-3 px-6 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Joining...</span>
                    ) : (
                      <>Join our Waitlist →</>
                    )}
                  </button>
                </>
              )}
            </form>

            {/* Microcopy */}
            <p 
              className="text-xs text-muted-foreground/70 opacity-0"
              style={{ animation: 'fade-in-up 0.8s ease-out 0.9s forwards' }}
            >
              No spam. Early access first.
            </p>

            {/* Secondary text */}
            <p 
              className="text-sm text-muted-foreground opacity-0"
              style={{ animation: 'fade-in-up 0.8s ease-out 1s forwards' }}
            >
              Apply for early access and build with HustleIQ.
            </p>

            {/* Social proof with avatars */}
            <div 
              className="flex items-center gap-3 justify-center lg:justify-start opacity-0"
              style={{ animation: 'fade-in-up 0.8s ease-out 1.2s forwards' }}
            >
              <div className="flex -space-x-2">
                {avatars.map((avatar, i) => (
                  <div 
                    key={i}
                    className={`w-8 h-8 rounded-full ${avatar.bg} border-2 border-background flex items-center justify-center text-xs font-medium text-white`}
                  >
                    {avatar.initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join <span className="text-foreground font-medium">2,400+</span> founders already on the waitlist
              </p>
            </div>
          </div>

          {/* Right side - Phone mockup */}
          <div 
            className="relative flex justify-center order-1 lg:order-2 opacity-0"
            style={{ animation: 'scale-in 1s ease-out 0.5s forwards' }}
          >
            {/* Glow effect behind phone */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-primary/30 rounded-full blur-[100px] animate-pulse-glow" />
            </div>
            
            {/* Phone mockup */}
            <div className="phone-mockup float relative z-10">
              <div className="phone-screen">
                <img 
                  src={businessModelImage} 
                  alt="HustleIQ App showing SMMA Business Model recommendation" 
                  className="w-[280px] sm:w-[320px] h-auto"
                />
              </div>
              
              {/* Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;