import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast'; 
import hustleiqLogo from '@/assets/hustleiq-logo.png';
import posthog from 'posthog-js';
import { Check, Copy, Share2, ArrowLeft, DollarSign, Zap } from 'lucide-react';

const Hero = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [hurdle, setHurdle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: Mom Test Question, 3: Success

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(res => setTimeout(res, 1000));
      posthog.identify(email, { hurdle_to_shipping: hurdle });
      setStep(3);
      toast({ title: "Verification Complete", description: "You are now a Founder Advisor." });
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-4 pt-40 pb-20 lg:pt-0">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#1A2E05]/40 border border-[#63E602]/20 animate-fade-in-up">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em]">88/500 Founder spots remaining</span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-[100px] font-black leading-[0.85] tracking-tighter animate-fade-in-up">
              STOP<br />DREAMING.<br />
              <span className="text-primary">START</span><br /><span className="text-primary">BUILDING.</span>
            </h1>

            <div className="max-w-lg space-y-10">
              <p className="text-lg text-white/50 font-medium leading-relaxed animate-fade-in-up">
                Skip the noise. Get **daily execution steps**. Build your $10k/mo startup **this month**.
              </p>

              <div className="w-full animate-fade-in-up delay-150">
                {step === 1 && (
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter email to skip the line"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-6 py-5 bg-[#0c0c0c] border border-white/10 rounded-2xl text-foreground focus:ring-2 focus:ring-primary/50 outline-none font-mono text-sm shadow-well"
                      required
                    />
                    <button type="submit" className="btn-primary py-5 px-10 rounded-2xl">NEXT →</button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleFinalSubmit} className="space-y-4 animate-scale-in">
                    <p className="text-xs font-mono text-primary uppercase tracking-widest text-left pl-2">What is the #1 thing stopping you from shipping today?</p>
                    <input
                      type="text"
                      placeholder="e.g. Analysis paralysis, No technical skills..."
                      value={hurdle}
                      onChange={(e) => setHurdle(e.target.value)}
                      className="w-full px-6 py-5 bg-[#0c0c0c] border border-primary/30 rounded-2xl text-foreground focus:ring-2 focus:ring-primary outline-none font-mono text-sm shadow-well"
                      required
                      autoFocus
                    />
                    <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-5 rounded-2xl">
                      {isSubmitting ? "PROCESSING..." : "CLAIM FOUNDER ACCESS →"}
                    </button>
                  </form>
                )}

                {step === 3 && (
                  <div className="glass-card p-6 w-full border-primary/50 bg-primary/5 animate-scale-in text-left">
                    <h3 className="text-lg font-black text-white">FOUNDER ADVISOR: #42</h3>
                    <p className="text-xs text-white/60 mt-2 font-mono uppercase tracking-widest">Invite 2 builders to jump the queue.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup with Success Visual */}
<div className="relative flex justify-center w-full lg:pl-12">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-50" />
  
  <div className="relative z-10 w-[280px] sm:w-[360px] animate-float">
    {/* iPhone Hardware Frame (p-2 creates the inner bezel) */}
    <div className="relative p-2 bg-[#0c0c0c] rounded-[3.5rem] shadow-float border border-white/10">
      
      {/* Screen Area (Removed p-6 to allow edge-to-edge image) */}
      <div className="relative aspect-[9/19.5] rounded-[3rem] overflow-hidden bg-black">
        
        {/* ⚡️ FIX: Image is now absolute inset-0 to fill the entire screen hardware */}
        <img 
          src="/business-model.png" 
          alt="App UI" 
          className="absolute inset-0 w-full h-full object-cover opacity-90" 
        />
        
        {/* UI Overlay Content: Overlaying on top of the image */}
        <div className="relative h-full flex flex-col p-6 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/60">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
              <ArrowLeft className="w-4 h-4 text-white" />
            </div>
            <img src="/logo.png" alt="HustleIQ" className="h-4 w-auto object-contain brightness-0 invert opacity-50" />
            <div className="w-8" />
          </div>

        

        
        </div>

      </div>
    </div>

    {/* Floating Success Notification - Z-index fixed to stay on top */}
    <div className="absolute -left-16 bottom-24 glass-card p-4 shadow-float animate-float-task border-primary/20 hidden sm:block z-30">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
             <p className="text-[10px] font-mono font-bold text-white leading-none">STRIPE: +$499.00</p>
             <p className="text-[8px] font-mono text-primary uppercase mt-1">Goal: First Sale Cleared</p>
          </div>
       </div>
    </div>
    
    {/* Executing Task Badge */}
    <div className="absolute -right-16 top-1/4 glass-card px-4 py-3 border-white/10 hidden sm:block shadow-2xl animate-float-task delay-1000 z-30">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#63E602]" />
        <p className="text-[9px] font-mono font-bold tracking-tighter text-white/90 uppercase">Task_04: Finalizing Launch</p>
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