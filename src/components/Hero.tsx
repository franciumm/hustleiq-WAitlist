import { useState } from 'react';
import { useToast } from '@/hooks/use-toast'; 
import posthog from 'posthog-js';
import { Check, Copy, Share2, DollarSign, Globe, Github, Cpu, Apple } from 'lucide-react';

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
    toast({ title: "Copied", description: "Invite 2 builders to skip the queue." });
  };

  return (
    <section className="relative min-h-screen w-full flex items-start lg:items-center justify-center px-4 pt-32 lg:pt-8 pb-12">
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          
          <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 border-t-hacker">
                <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-[0.15em]">88/500 SPOTS — PENDING IOS DEPLOYMENT</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-black tracking-tighter animate-fade-in-up leading-[0.9]">
              STOP DREAMING.<br />
              <span className="text-primary">START BUILDING.</span>
            </h1>

            <div className="max-w-[400px] w-full space-y-6">
              <p className="text-base text-white/40 leading-relaxed animate-fade-in-up">
                Skip the noise. Get Daily execution steps.<br />EXECUTE 3X FASTER than courses. <br /> Join 500+ hustlers on the waitlist.
              </p>

              <div className="relative z-20">
                {step === 1 && (
                  <form onSubmit={handleNext} className="flex flex-col sm:flex-row gap-2 animate-fade-in-up">
                    <input
                      type="email"
                      placeholder="Email to skip the line"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3.5 bg-[#080808] border border-white/5 rounded-xl text-white font-mono text-sm shadow-well focus:ring-1 focus:ring-primary/50 outline-none"
                      required
                    />
                    <button type="submit" className="btn-primary py-3.5 px-6 rounded-xl text-[10px]">NEXT →</button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleFinalSubmit} className="space-y-3 animate-scale-in">
                    <p className="text-[9px] font-mono text-primary uppercase tracking-widest text-left">What is the #1 thing stopping you from shipping?</p>
                    <input
                      type="text"
                      placeholder="e.g. 'Analysis paralysis'"
                      value={hurdle}
                      onChange={(e) => setHurdle(e.target.value)}
                      className="w-full px-4 py-3.5 bg-[#080808] border border-primary/20 rounded-xl text-white font-mono text-xs shadow-well"
                      required
                      autoFocus
                    />
                    <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-3.5 rounded-xl text-[10px]">
                      {isSubmitting ? "SYNCING..." : "CLAIM ACCESS →"}
                    </button>
                  </form>
                )}

                {step === 3 && (
                  <div className="glass-card p-5 border-primary/50 bg-primary/5 animate-scale-in text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-black text-lg font-mono">#42</div>
                      <div>
                        <h3 className="text-xs font-black text-white leading-none tracking-widest uppercase">FOUNDER STATUS: ACTIVE</h3>
                        <p className="text-[8px] font-mono text-primary uppercase mt-1">Access: Batched Release</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-white/60 mb-4 leading-relaxed">Invite 2 builders to skip the line.</p>
                    <div className="flex gap-2">
                      <button onClick={copyRef} className="flex-1 h-10 rounded-lg bg-white/5 border border-white/10 text-[9px] font-mono text-white/50 uppercase flex items-center justify-center gap-2">
                         <Copy className="w-3 h-3 text-primary" /> Copy_ID
                      </button>
                      <button onClick={copyRef} className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-black active:scale-95"><Share2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* UPDATED: Validation Partner Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 opacity-20 grayscale animate-fade-in-up delay-300">
               <div className="flex items-center gap-1.5 font-mono text-[8px] font-bold"><Cpu className="w-3 h-3 text-white"/> POWERED_BY_GEMINI</div>
               <div className="flex items-center gap-1.5 font-mono text-[8px] font-bold"><Apple className="w-3 h-3 text-white"/> APP_STORE</div>
               <div className="flex items-center gap-1.5 font-mono text-[8px] font-bold"><Globe className="w-3 h-3 text-white"/> STRIPE</div>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="relative flex justify-center w-full lg:pl-12">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-[100px] opacity-40" />
            
            <div className="relative z-10 w-[220px] sm:w-[280px] animate-float">
              <div className="relative p-2 bg-[#0c0c0c] rounded-[2.8rem] shadow-float-pro border border-white/10 border-t-hacker">
                <div className="relative aspect-[9/19.5] rounded-[2.4rem] overflow-hidden bg-black">
                  <img 
                    src="/business-model.png" 
                    alt="HustleIQ Preview" 
                    className="w-full h-full object-cover opacity-100" 
                  />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-5 bg-black rounded-b-xl z-20 border-x border-b border-white/5" />
                </div>
              </div>

              <div className="absolute -left-12 bottom-20 glass-card p-3 shadow-float-pro animate-float-task border-t-hacker hidden sm:block z-30">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                       <p className="text-[9px] font-mono font-black text-white leading-none">STRIPE: +$499</p>
                       <p className="text-[7px] font-mono text-primary uppercase mt-1 tracking-tighter">Goal_Reached</p>
                    </div>
                 </div>
              </div>
              
              <div className="absolute -right-12 top-1/4 glass-card px-3 py-2 border-white/10 border-t-hacker hidden sm:block shadow-float-pro animate-float-task delay-1000 z-30">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#63E602]" />
                  <p className="text-[8px] font-mono font-bold tracking-tighter text-white/80 uppercase">TASK_04: LIVE</p>
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