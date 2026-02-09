import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast'; 
import hustleiqLogo from '@/assets/hustleiq-logo.png';
import posthog from 'posthog-js';
import { Check, Copy, Share2, ArrowLeft } from 'lucide-react';

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
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      posthog.identify(email);
      posthog.capture('waitlist_signup', { location: 'hero_section', email: email });

      setSubmitted(true);
      toast({ title: "Access Granted", description: "Position secured in the system." });
    } catch (error) {
      toast({ title: "Error", description: "Try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(`https://hustleiq.ai/ref=founder_${Math.floor(Math.random()*9000)+1000}`);
    toast({ title: "Link Copied", description: "Share with 2 builders to skip the queue." });
  };

  return (
    <section id="how-it-works" className="relative min-h-screen w-full flex items-center justify-center px-4 pt-40 pb-20 lg:pt-0 lg:pb-0">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left">
            {/* Technical Status Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#1A2E05]/40 border border-[#373C34] animate-fade-in-up">
              <img src={hustleiqLogo} alt="Logo" className="w-5 h-4 object-contain" />
              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.25em]">System Status: Early Access Open</span>
            </div>

            {/* Aggressive Headline */}
            <h1 className="text-6xl sm:text-7xl lg:text-[100px] font-black leading-[0.85] tracking-tighter animate-fade-in-up">
              STOP<br />
              GUESSING.<br />
              <span className="text-primary">START</span><br />
              <span className="text-primary">EXECUTING.</span>
            </h1>

            <div className="max-w-lg space-y-10">
              <p className="text-lg text-white/50 font-medium leading-relaxed animate-fade-in-up delay-75">
                The AI Co-founder that finds your perfect business model and holds you accountable until you hit <span className="text-white">$10k/mo</span>.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-150">
                  <input type="text" name="b_check" tabIndex={-1} value={botField} onChange={(e) => setBotField(e.target.value)} className="sr-only" />
                  <input
                    type="email"
                    placeholder="Enter email to skip the line"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-6 py-5 bg-[#121212]/60 border border-white/10 rounded-2xl text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all font-mono text-sm placeholder:text-white/20"
                    required
                  />
                  <button type="submit" disabled={isSubmitting} className="btn-primary py-5 px-10 rounded-2xl font-black text-xs uppercase tracking-[0.15em] whitespace-nowrap active:scale-95 transition-transform">
                    {isSubmitting ? "SYNCING..." : "CLAIM ACCESS →"}
                  </button>
                </form>
              ) : (
                /* Referral Success View (Viral Loop) */
                <div className="glass-card p-6 w-full border-primary/50 bg-primary/5 animate-scale-in">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black font-black text-xl font-mono">#42</div>
                    <div className="text-left">
                      <h3 className="text-lg font-black text-white leading-none">QUEUE POSITION SECURED</h3>
                      <p className="text-[10px] font-mono text-primary uppercase mt-1">Verification: Confirmed</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 text-left mb-6 font-medium">
                    Skip the queue by inviting 2 fellow builders. You'll receive <span className="text-white font-bold">Lifetime Founder Status</span> once verified.
                  </p>
                  <div className="flex gap-2">
                    <button onClick={copyReferral} className="flex-1 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 hover:bg-white/10 transition-all font-mono text-xs uppercase tracking-widest text-white/80">
                      <Copy className="w-4 h-4 text-primary" /> Copy Link
                    </button>
                    <button onClick={copyReferral} className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-black hover:scale-105 transition-all">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Verification Stats */}
            <div className="flex items-center gap-12 pt-4 animate-fade-in-up delay-300">
              <div className="text-left">
                <p className="text-3xl font-black text-white font-mono leading-none">2.4k+</p>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mt-2">Waitlist</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-left">
                <p className="text-3xl font-black text-white font-mono leading-none">$0.00</p>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mt-2">Ad Spend</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity App UI */}
          <div className="relative flex justify-center w-full lg:pl-12 animate-scale-in">
            {/* Background Glow Sphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
            
            <div className="relative z-10 w-[300px] sm:w-[360px] animate-float">
              {/* iPhone Hardware Frame */}
              <div className="relative p-2.5 bg-[#0c0c0c] rounded-[3.5rem] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_50px_100px_-20px_rgba(0,0,0,1)] border border-white/10">
                <div className="relative aspect-[9/19.5] rounded-[3rem] overflow-hidden bg-black flex flex-col p-6">
                  
                  {/* Header UI */}
                  <div className="flex justify-between items-center mb-8">
                    <div className="p-2 rounded-full bg-white/5 border border-white/10">
                      <ArrowLeft className="w-4 h-4 text-white" />
                    </div>
                    <img src="/logo.png" alt="HustleIQ" className="h-4 w-auto object-contain brightness-0 invert opacity-50" />
                    <div className="w-8" />
                  </div>

                  {/* Dynamic Progress UI */}
                  <div className="flex-1 flex flex-col items-center justify-center space-y-10">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#63E602" strokeWidth="8" strokeDasharray="283" strokeDashoffset="0" strokeLinecap="round" className="animate-pulse" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-mono font-black text-xl text-white">100%</div>
                    </div>

                    {/* Psychographic Match Card (Image 0) */}
                    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-center space-y-2">
                      <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Your Ideal Business Model</p>
                      <h4 className="text-2xl font-black text-white tracking-tight">SMMA</h4>
                      <div className="pt-2 space-y-1.5">
                        <div className="flex items-center gap-2 justify-center text-[10px] text-white/60">
                          <Check className="w-3 h-3 text-primary" /> Matches your <span className="text-white">time</span> availability
                        </div>
                        <div className="flex items-center gap-2 justify-center text-[10px] text-white/60">
                          <Check className="w-3 h-3 text-primary" /> Supports consistent <span className="text-white">execution</span>
                        </div>
                        <p className="text-[9px] text-white/30 italic pt-2 font-mono">Status: Generation Complete</p>
                      </div>
                    </div>
                  </div>

                  {/* Start Button UI */}
                  <div className="mt-auto w-full py-4 px-6 rounded-2xl bg-white/10 text-white/20 font-mono text-[10px] text-center uppercase tracking-widest border border-white/5">
                    Start this Journey
                  </div>

                  {/* Hardware Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-7 bg-black rounded-b-2xl z-20 border-x border-b border-white/5" />
                </div>
              </div>
              
              {/* Floating Task Badge (Image 0 Overlay) */}
              <div className="absolute -right-16 top-1/4 glass-card px-4 py-3 border-white/10 hidden sm:block shadow-2xl animate-float-slow">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#63E602]" />
                  <p className="text-[9px] font-mono font-bold tracking-tighter text-white/90">SYSTEM: EXECUTING TASK 04</p>
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