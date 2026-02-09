// src/components/Hero.tsx
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast'; 
import posthog from 'posthog-js';
import { Check, Copy, Share2, ArrowLeft } from 'lucide-react';

const Hero = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [botField, setBotField] = useState(''); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || botField !== '') return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      posthog.identify(email);
      posthog.capture('waitlist_signup', { location: 'hero' });
      setSubmitted(true);
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col lg:flex-row items-start lg:items-center justify-center px-4 pt-48 pb-20 lg:pt-0">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left">
            {/* Scarcity Badge - Fixed Margin */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#1A2E05]/60 border border-[#63E602]/20 animate-fade-in-up">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em]">88/500 Founder spots remaining</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-[90px] font-black leading-[0.85] tracking-tighter animate-fade-in-up">
              STOP<br />BUYING COURSES.<br />
              <span className="text-primary">START</span><br /><span className="text-primary">EXECUTING.</span>
            </h1>

            <div className="max-w-lg space-y-8">
              <p className="text-lg text-white/50 font-medium leading-relaxed animate-fade-in-up">
                Courses sell dreams. We provide execution. Our AI Consultant gives you the <span className="text-white">exact daily steps</span> to build your startup.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 animate-fade-in-up">
                  <input type="text" value={botField} onChange={(e) => setBotField(e.target.value)} className="sr-only" />
                  <input
                    type="email"
                    placeholder="Enter email to skip the line"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-6 py-5 bg-[#121212]/60 border border-white/10 rounded-2xl text-foreground focus:ring-2 focus:ring-primary/50 outline-none font-mono text-sm"
                    required
                  />
                  <button type="submit" disabled={isSubmitting} className="btn-primary py-5 px-10 rounded-2xl font-black text-xs uppercase tracking-widest whitespace-nowrap active:scale-95 transition-all">
                    {isSubmitting ? "SYNCING..." : "CLAIM ACCESS →"}
                  </button>
                </form>
              ) : (
                <div className="glass-card p-6 w-full border-primary/50 bg-primary/5 animate-scale-in text-left">
                   <h3 className="text-lg font-black text-white">QUEUE POSITION: #42</h3>
                   <p className="text-xs text-white/60 mt-2">Invite 2 builders to skip the line.</p>
                </div>
              )}
            </div>
          </div>

          {/* Phone Mockup - Fixed Floating Animation */}
          <div className="relative flex justify-center w-full lg:pl-12">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
            <div className="relative z-10 w-[280px] sm:w-[320px] animate-float-mockup">
              <div className="relative p-2.5 bg-[#0c0c0c] rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border border-white/10">
                <div className="relative aspect-[9/19.5] rounded-[3rem] overflow-hidden bg-black">
                  <img src="/business-model.png" alt="App UI" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-7 bg-black rounded-b-2xl z-20 border-x border-b border-white/5" />
                </div>
              </div>
              <div className="absolute -right-12 top-1/4 glass-card px-4 py-3 border-white/10 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <p className="text-[9px] font-mono font-bold text-white/90">SYSTEM: EXECUTING TASK 04</p>
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