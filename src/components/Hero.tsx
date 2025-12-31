import { useState } from 'react';
import businessModelImage from '@/assets/business-model.png';
import hustleiqLogo from '@/assets/hustleiq-logo.png';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setEmail('');
    }, 1000);
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
          <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
            {/* Logo badge */}
            <div 
              className="inline-flex items-center gap-3 glass-card px-4 py-2 opacity-0"
              style={{ animation: 'fade-in-up 0.6s ease-out 0.2s forwards' }}
            >
              <img src={hustleiqLogo} alt="HustleIQ" className="w-8 h-8" />
              <span className="text-sm font-medium text-muted-foreground">
                AI-Guided Business Execution
              </span>
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
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0 opacity-0"
              style={{ animation: 'fade-in-up 0.8s ease-out 0.8s forwards' }}
            >
              {submitted ? (
                <div className="glass-card px-6 py-4 text-center w-full">
                  <p className="text-primary font-medium">🎉 You're on the list!</p>
                  <p className="text-sm text-muted-foreground mt-1">We'll notify you when we launch.</p>
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-4 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Joining...</span>
                    ) : (
                      <>Join the Waitlist →</>
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
              Secure your free trial (7 days · no credit card)
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
