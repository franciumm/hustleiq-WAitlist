import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast'; 
import posthog from 'posthog-js';
import { Check, Copy, Share2, ArrowLeft, DollarSign, Zap, Globe, Github } from 'lucide-react';

const Hero = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [hurdle, setHurdle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); 

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    posthog.identify(email, { hurdle });
    await new Promise(res => setTimeout(res, 800));
    setStep(3);
    setIsSubmitting(false);
  };

  const copyRef = () => {
    navigator.clipboard.writeText(`hustleiq.ai/ref=founder_${Math.floor(Math.random()*1000)}`);
    toast({ title: "Link Copied", description: "Invite 2 builders to skip the queue." });
  };

  return (
    /* ⚡️ INCREASED MARGIN: pt-64 ensures deep clearance from the fixed header */
    <section className="relative min-h-screen w-full flex items-start lg:items-center justify-center px-4 pt-64 lg:pt-0 pb-20">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start lg:items-center">
          
          <div className="flex flex-col items-center lg:items-start space-y-10 text-center lg:text-left">
            {/* Scarcity + Authority Metric */}
            <div className="space-y-4 animate-fade-in-up">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 border-t-hacker">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.2em]">88/500 spots — Execute 3x Faster than courses</span>
              </div>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-[110px] font-black tracking-tighter animate-fade-in-up">
              STOP DREAMING.<br />
              <span className="text-primary">START BUILDING.</span>
            </h1>

            <div className="max-w-prose-hacker w-full space-y-8">
              <p className="text-lg text-white/40 leading-relaxed animate-fade-in-up">
                Skip the noise. Get **daily execution steps**. Build your $10k/mo startup **this month**.
              </p>

              <div className="relative z-20">
                {step === 1 && (
                  <form onSubmit={handleNext} className="flex flex-col sm:flex-row gap-2 animate-fade-in-up">
                    <input
                      type="email"
                      placeholder="Email to skip the line"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-6 py-5 bg-[#080808] border border-white/5 rounded-2xl text-white font-mono text-sm shadow-well focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                      required
                    />
                    <button type="submit" className="btn-primary py-5 px-8 rounded-2xl border-t-hacker">NEXT →</button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleFinalSubmit} className="space-y-4 animate-scale-in">
                    <p className="text-[10px] font-mono text-primary uppercase tracking-widest text-left">Founder Audit: What is the #1 thing stopping you from shipping?</p>
                    <input
                      type="text"
                      placeholder="e.g. 'Analysis paralysis' or 'No technical skills'"
                      value={hurdle}
                      onChange={(e) => setHurdle(e.target.value)}
                      className="w-full px-6 py-5 bg-[#080808] border border-primary/20 rounded-2xl text-white font-mono text-sm shadow-well focus:ring-1 focus:ring-primary outline-none"
                      required
                      autoFocus
                    />
                    <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-5 rounded-2xl">
                      {isSubmitting ? "SYNCING..." : "CLAIM FOUNDER ACCESS →"}
                    </button>
                  </form>
                )}

                {step === 3 && (
                  <div className="glass-card p-6 border-primary/50 bg-primary/5 animate-scale-in text-left">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black font-black text-xl font-mono">#42</div>
                      <div>
                        <h3 className="text-sm font-black text-white leading-none tracking-widest uppercase">FOUNDER ADVISOR STATUS: ACTIVE</h3>
                        <p className="text-[9px] font-mono text-primary uppercase mt-1">Access Protocol: Batched Release</p>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 mb-6 leading-relaxed">
                      Invite 2 builders to **skip the queue** and unlock the private execution discord.
                    </p>
                    <div className="flex gap-2">
                      <button onClick={copyRef} className="flex-1 h-12 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono text-white/50 hover:text-white uppercase flex items-center justify-center gap-2">
                         <Copy className="w-4 h-4 text-primary" /> Copy_ID
                      </button>
                      <button onClick={copyRef} className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-black active:scale-95"><Share2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-20 grayscale contrast-125 animate-fade-in-up delay-300">
               <div className="flex items-center gap-2 font-mono text-[10px] font-bold"><Globe className="w-4 h-4"/> VERIFIED_BY_STRIPE</div>
               <div className="flex items-center gap-2 font-mono text-[10px] font-bold"><Github className="w-4 h-4"/> DEPLOYED_VIA_VERCEL</div>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="relative flex justify-center w-full lg:pl-12">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-40" />
            
            <div className="relative z-10 w-[280px] sm:w-[360px] animate-float">
              <div className="relative p-2.5 bg-[#0c0c0c] rounded-[3.5rem] shadow-float-pro border border-white/10 border-t-hacker">
                <div className="relative aspect-[9/19.5] rounded-[3rem] overflow-hidden bg-black flex flex-col p-6">
                  <img src="/business-model.png" alt="App UI" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-7 bg-black rounded-b-2xl z-20 border-x border-b border-white/5" />
                </div>
              </div>

              {/* StoryBrand Success Notification */}
              <div className="absolute -left-16 bottom-24 glass-card p-4 shadow-float-pro animate-float-task border-t-hacker hidden sm:block z-30">
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
              
              {/* Task Badge */}
              <div className="absolute -right-16 top-1/4 glass-card px-4 py-3 border-white/10 border-t-hacker hidden sm:block shadow-float-pro animate-float-task delay-1000 z-30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#63E602]" />
                  <p className="text-[9px] font-mono font-bold tracking-tighter text-white/90 uppercase">Task_04: Finalizing Market</p>
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