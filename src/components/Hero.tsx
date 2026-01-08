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
    <section id="how-it-works" className="relative min-h-screen w-full overflow-x-hidden flex items-center justify-center px-4 sm:px-6 py-12 pt-28 lg:py-0">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left side */}
          <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left order-1 lg:order-2 w-full">
            
            {/* Badge */}
            <div className="w-full max-w-[394px] aspect-[394/72] relative flex justify-center lg:justify-start">
               {/* ... (Your SVG Badge Code) ... */}
            </div>

            {/* Headline - SEO: Ensure this is the only H1 on the page */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight opacity-0"
              style={{ animation: 'fade-in-up 0.6s ease-out 0.1s forwards' }}
            >
              Stop Guessing.{' '}
              <span className="gradient-text">Start Executing.</span>
            </h1>

            {/* Subheadline */}
            <div 
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 opacity-0 space-y-1"
              style={{ animation: 'fade-in-up 0.6s ease-out 0.2s forwards' }}
            >
              <p>From 0 to your first <span className="text-primary font-semibold">$10K/month</span> business.</p>
              <p>Your first milestone starts with execution.</p>
            </div>

            {/* CTA Form - AEO Optimized */}
            <form 
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto lg:mx-0 opacity-0"
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

                  {/* ⚡️ AEO FIX: Added hidden label for AI/Accessibility */}
                  <label htmlFor="email-address" className="sr-only">Email Address</label>
                  <input
                    id="email-address"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all w-full"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary py-3 px-6 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap"
                  >
                    {isSubmitting ? <span className="animate-pulse">Joining...</span> : <>Join our Waitlist →</>}
                  </button>
                </>
              )}
            </form>

            {/* Social Proof - Semantic AEO optimization */}
            <aside 
              className="flex items-center gap-3 justify-center lg:justify-start opacity-0" 
              style={{ animation: 'fade-in-up 0.6s ease-out 0.6s forwards' }}
            >
              <div className="flex -space-x-2">
                {avatars.map((avatar, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${avatar.bg} border-2 border-background flex items-center justify-center text-xs font-medium text-white`}>
                    {avatar.initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join <span className="text-foreground font-medium">2,400+</span> founders building with AI
              </p>
            </aside>
          </div>

          {/* Right side - Image AEO optimized */}
          <div 
            className="relative flex justify-center order-1 lg:order-2 opacity-0 w-full"
            style={{ animation: 'scale-in 0.8s ease-out 0.2s forwards' }}
          >
            <div className="phone-mockup float relative z-10 w-[272px] sm:w-[320px]">
              <div className="phone-screen rounded-[2.5rem] overflow-hidden">
                <img 
                  src={businessModelImage} 
                  width="603"   // 👈 EXACT dimensions   
                  height="1311"  //  EXACT dimensions  
                  alt="HustleIQ dashboard showing business model validation and ready for roadmap and revenue execution steps" 
                  className="w-full h-auto"
                  loading="eager"
                  fetchPriority="high"
                  style={{ contentVisibility: 'auto' }}  

                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;