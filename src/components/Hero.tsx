import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast'; 
import hustleiqLogo from '@/assets/hustleiq-logo.png';
import posthog from 'posthog-js';
import { Check, Copy, Share2 } from 'lucide-react';

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
    // Logic: PostHog Capture & Success State
    try {
      // Simulate API call for waitlist
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      posthog.identify(email);
      posthog.capture('waitlist_signup', { location: 'hero_section', email: email });

      setSubmitted(true);
      toast({ title: "Access Granted", description: "You are now in the queue." });
    } catch (error) {
      toast({ title: "Error", description: "Try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(`https://hustleiq.ai/ref=${Math.floor(Math.random()*9000)+1000}`);
    toast({ title: "Link Copied", description: "Share it with 2 friends to skip the line." });
  };

  return (
    <section id="how-it-works" className="relative min-h-screen w-full flex items-center justify-center px-4 pt-32 pb-20 lg:py-0">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left">
            {/* Hacker Style Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in-up">
              <img src={hustleiqLogo} alt="Logo" className="w-5 h-4 object-contain" />
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-[0.2em]">System Status: Early Access Open</span>
            </div>

            {/* Core Value Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tighter animate-fade-in-up">
              STOP GUESSING.<br />
              <span className="gradient-text">START EXECUTING.</span>
            </h1>

            <div className="max-w-lg space-y-6">
              <p className="text-xl text-muted-foreground font-medium animate-fade-in-up delay-100">
                The AI Co-founder that finds your perfect business model and holds you accountable until you hit <span className="text-white">$10k/mo</span>.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-200">
                  <input type="text" name="b_check" tabIndex={-1} value={botField} onChange={(e) => setBotField(e.target.value)} className="sr-only" />
                  <input
                    type="email"
                    placeholder="Enter email to skip the line"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-6 py-4 bg-secondary/20 border border-white/10 rounded-2xl text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-all font-mono"
                    required
                  />
                  <button type="submit" disabled={isSubmitting} className="btn-primary py-4 px-8 rounded-2xl font-black text-sm uppercase tracking-widest whitespace-nowrap">
                    {isSubmitting ? "Processing..." : "Claim Access →"}
                  </button>
                </form>
              ) : (
                /* VIRAL LOOP (Referral System) */
                <div className="glass-card p-6 w-full border-primary bg-primary/5 animate-scale-in">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black font-black text-xl">
                      #42
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-black text-white leading-none">You're in the queue.</h3>
                      <p className="text-xs font-mono text-primary uppercase mt-1">Founding Member Status: Pending</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-left mb-6">
                    HustleIQ is opening in batches. Invite 2 friends to skip the line and get <span className="text-white font-bold">Lifetime Founder Benefits</span>.
                  </p>
                  <div className="flex gap-2">
                    <button onClick={copyReferral} className="flex-1 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 hover:bg-white/10 transition-all font-mono text-xs">
                      <Copy className="w-4 h-4" /> Copy Link
                    </button>
                    <button onClick={copyReferral} className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-black hover:scale-105 transition-all">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Social Proof Stats */}
            <div className="flex items-center gap-8 py-4 animate-fade-in-up delay-300">
              <div>
                <p className="text-2xl font-black text-white font-mono">2.4k+</p>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Waitlist</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-2xl font-black text-white font-mono">$0.00</p>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Ad Spend</p>
              </div>
            </div>
          </div>

          {/* Floating Mobile App Mockup */}
          <div className="relative flex justify-center w-full animate-scale-in delay-200">
            {/* Neon Glow Sphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
            
            <div className="relative z-10 w-[280px] sm:w-[320px] animate-float">
              {/* iPhone Frame */}
              <div className="relative p-2 bg-[#0c0c0c] rounded-[3rem] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_40px_100px_-20px_rgba(0,0,0,1)] border border-white/10">
                <div className="relative aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-black">
                  <img 
                    src="/business-model.png" 
                    alt="HustleIQ Mobile Interface" 
                    className="w-full h-full object-cover"
                    loading="eager" 
                  />
                  {/* Dynamic Island Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-7 bg-black rounded-b-2xl z-20 border-x border-b border-white/5" />
                </div>
              </div>
              
              {/* Floating Execution Badge */}
              <div className="absolute -right-12 top-1/4 glass-card p-4 animate-float delay-500 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <p className="text-[10px] font-mono font-bold tracking-tighter text-white">SYSTEM: EXECUTING TASK 04</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;