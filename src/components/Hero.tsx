import { useState } from 'react';
import { useToast } from '@/hooks/use-toast'; 
import posthog from 'posthog-js';
import { Check, Copy, Share2, ArrowLeft, DollarSign, Zap, Globe, Github } from 'lucide-react';

const Hero = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [hurdle, setHurdle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); 

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    posthog.identify(email, { hurdle });
    await new Promise(res => setTimeout(res, 800));
    setStep(3);
    setIsSubmitting(false);
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-4 pt-32 pb-20 lg:pt-0">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
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

              {/* Form Logic with shadow-well */}
              <div className="relative z-20">
                {step === 1 && (
                  <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="flex flex-col sm:flex-row gap-2 animate-fade-in-up">
                    <input
                      type="email"
                      placeholder="Email to skip the line"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-6 py-5 bg-[#080808] border border-white/5 rounded-2xl text-white font-mono text-sm shadow-well focus:ring-1 focus:ring-primary/50 outline-none"
                      required
                    />
                    <button type="submit" className="btn-primary py-5 px-8 rounded-2xl border-t-hacker">NEXT →</button>
                  </form>
                )}
                {/* ... Steps 2 & 3 remain same ... */}
              </div>
            </div>

            {/* Founding Sales: Authority Logos */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-20 grayscale contrast-125 animate-fade-in-up delay-300">
               <div className="flex items-center gap-2 font-mono text-[10px] font-bold"><Globe className="w-4 h-4"/> VERIFIED_BY_STRIPE</div>
               <div className="flex items-center gap-2 font-mono text-[10px] font-bold"><Github className="w-4 h-4"/> DEPLOYED_VIA_VERCEL</div>
            </div>
          </div>

          {/* Visual Mockup with Success Human Element */}
          <div className="relative flex justify-center w-full lg:pl-12">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-40" />
            
            <div className="relative z-10 w-[280px] sm:w-[360px] animate-float">
              {/* iPhone Frame with Layered Shadows */}
              <div className="relative p-2.5 bg-[#0c0c0c] rounded-[3.5rem] shadow-float-pro border border-white/10 border-t-hacker">
                <div className="relative aspect-[9/19.5] rounded-[3rem] overflow-hidden bg-black flex flex-col">
                  {/* FULL SCREEN FIX */}
                  <img src="/business-model.png" alt="App UI" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                  
                  {/* UI Elements Layered on Top */}
                  <div className="relative h-full flex flex-col p-6 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/80">
                     {/* Inner UI Content Here... */}
                  </div>

                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-7 bg-black rounded-b-2xl z-20 border-x border-b border-white/5" />
                </div>
              </div>

              {/* StoryBrand: The "Image of Success" (Happy Founder) */}
            <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
             <p className="text-[10px] font-mono font-bold text-white leading-none">STRIPE: +$499.00</p>
             <p className="text-[8px] font-mono text-primary uppercase mt-1">Goal: First Sale Cleared</p>
          </div>
       </div>
    
              
              {/* Task Badge with Light Source Border */}
              <div className="absolute -right-16 top-1/4 glass-card px-4 py-3 border-white/10 border-t-hacker hidden sm:block shadow-float-pro animate-float-task delay-1000 z-30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#63E602]" />
                  <p className="text-[9px] font-mono font-bold tracking-tighter text-white/90 uppercase">Task_04: Validating Market</p>
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