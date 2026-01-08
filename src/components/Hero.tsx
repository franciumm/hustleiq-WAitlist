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
  const [botField, setBotField] = useState(''); 
  const [mountTime, setMountTime] = useState(0); 

  useEffect(() => {
    setMountTime(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-Spam
    if (botField !== '' || Date.now() - mountTime < 1500) return;
    if (!email) return;
    
    setIsSubmitting(true);
    const FORM_URL = "https://app.loops.so/api/newsletter-form/YOUR_FORM_ID_HERE";

    try {
      const response = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}&userGroup=Waitlist`,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      posthog.identify(email);
      posthog.capture('waitlist_signup', { location: 'hero_section', email: email });

      setSubmitted(true);
      setEmail('');
      toast({ title: "You're on the list! 🚀", description: "Welcome to the future of execution." });

    } catch (error) {
      console.error('Waitlist error:', error);
      toast({ title: "Connection Error", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const avatars = [
    { bg: 'bg-blue-500', initials: 'JD' },
    { bg: 'bg-green-500', initials: 'AM' },
    { bg: 'bg-purple-500', initials: 'SK' },
    { bg: 'bg-orange-500', initials: 'LP' },
    { bg: 'bg-pink-500', initials: 'RW' },
  ];

  return (
    // ⚡️ PERF: Reduced top padding on mobile (pt-24 instead of pt-32)
    <section id="how-it-works" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 pt-24 lg:py-0">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left side */}
          <div className="space-y-6 text-center lg:text-left order-1 lg:order-2">
            
            {/* 
               ⚡️ PERF: RESPONSIVE BADGE 
               Added 'max-w-full' and 'scale' for small screens so it doesn't overflow 
            */}
            <div 
              className="relative mx-auto lg:mx-0 opacity-0 w-[394px] max-w-full h-[72px] flex items-center justify-center origin-center sm:origin-left transform scale-[0.85] sm:scale-100"
              style={{ animation: 'fade-in-up 0.5s ease-out 0s forwards' }} 
            >
              {/* Outer Ring */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 394 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="outerGradient" x1="197" y1="0" x2="197" y2="72" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#373C34" />
                    <stop offset="1" stopColor="#373C34" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <rect x="0.5" y="0.5" width="393" height="71" rx="36" fill="#252723" fillOpacity="0.55" stroke="url(#outerGradient)" strokeWidth="1"/>
              </svg>

              {/* Inner Ring */}
              <div className="relative w-[380px] max-w-[96%] h-[64px]">
                <svg className="absolute inset-0 w-full h-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-full" viewBox="0 0 380 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="innerGradient" x1="190" y1="0" x2="190" y2="64" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#373c34ff" />
                      <stop offset="1" stopColor="#373c34ff" />
                    </linearGradient>
                  </defs>
                  <rect x="0.5" y="0.5" width="379" height="63" rx="32" fill="#252723c0" fillOpacity="1" stroke="url(#innerGradient)" strokeWidth="1"/>
                </svg>
                
                <div className="relative z-10 w-full h-full flex items-center justify-center gap-3 sm:gap-4">
                  <img src={hustleiqLogo} alt="HustleIQ" className="w-8 h-6 sm:w-10 sm:h-8" />
                  <span className="text-lg sm:text-xl font-extrabold text-white tracking-wide font-sans pt-1">
                    Early Access Soon
                  </span>
                </div>
              </div>
            </div>

            {/* Headline - ⚡️ Faster Animation (0.1s delay instead of 0.4s) */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight opacity-0"
              style={{ animation: 'fade-in-up 0.6s ease-out 0.1s forwards' }}
            >
              Stop Guessing.{' '}
              <span className="gradient-text">Start Executing.</span>
            </h1>

            {/* Subheadline - ⚡️ Faster Animation (0.2s delay) */}
            <div 
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 opacity-0 space-y-1"
              style={{ animation: 'fade-in-up 0.6s ease-out 0.2s forwards' }}
            >
              <p>From 0 to your first <span className="text-primary font-semibold">$10K/month</span> business.</p>
              <p>Your first milestone starts with execution.</p>
            </div>

            {/* CTA Form - ⚡️ Faster Animation (0.3s delay) */}
            <form 
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0 opacity-0"
              style={{ animation: 'fade-in-up 0.6s ease-out 0.3s forwards' }}
            >
              {submitted ? (
                <div className="glass-card px-6 py-4 text-center w-full">
                  <p className="text-primary font-medium">🎉 You're on the list!</p>
                  <p className="text-sm text-muted-foreground mt-1">We'll notify you when we launch.</p>
                </div>
              ) : (
                <>
                  <input type="text" name="b_check_field" tabIndex={-1} value={botField} onChange={(e) => setBotField(e.target.value)} autoComplete="off" style={{ opacity: 0, position: 'absolute', zIndex: -1, width: 0, height: 0 }} aria-hidden="true" />

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
                    {isSubmitting ? <span className="animate-pulse">Joining...</span> : <>Join our Waitlist →</>}
                  </button>
                </>
              )}
            </form>

            <p className="text-xs text-muted-foreground/70 opacity-0" style={{ animation: 'fade-in-up 0.6s ease-out 0.4s forwards' }}>
              No spam. Early access first.
            </p>

            <p className="text-sm text-muted-foreground opacity-0" style={{ animation: 'fade-in-up 0.6s ease-out 0.5s forwards' }}>
              Apply for early access and build with HustleIQ.
            </p>

            <div className="flex items-center gap-3 justify-center lg:justify-start opacity-0" style={{ animation: 'fade-in-up 0.6s ease-out 0.6s forwards' }}>
              <div className="flex -space-x-2">
                {avatars.map((avatar, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${avatar.bg} border-2 border-background flex items-center justify-center text-xs font-medium text-white`}>
                    {avatar.initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join <span className="text-foreground font-medium">2,400+</span> founders
              </p>
            </div>
          </div>

          {/* Right side - Phone mockup */}
          <div 
            className="relative flex justify-center order-1 lg:order-2 opacity-0"
            style={{ animation: 'scale-in 0.8s ease-out 0.2s forwards' }}
          >
            {/* ⚡️ PERF: REMOVED BLUR EFFECT ON MOBILE to prevent lag. Only shows on large screens. */}
            <div className="hidden lg:block absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-primary/30 rounded-full blur-[100px] animate-pulse-glow" />
            </div>
            
            <div className="phone-mockup float relative z-10 transform scale-90 sm:scale-100">
              <div className="phone-screen">
                {/* ⚡️ PERF: Added loading="eager" to load image instantly */}
                <img 
                  src={businessModelImage} 
                  alt="HustleIQ App" 
                  className="w-[280px] sm:w-[320px] h-auto"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;