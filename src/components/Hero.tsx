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
  const [referralLink, setReferralLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 1000));
      
      posthog.identify(email);
      posthog.capture('waitlist_signup', { location: 'hero_section' });

      setReferralLink(`hustleiq.ai/ref=${Math.random().toString(36).substring(7)}`);
      setSubmitted(true);
      toast({ title: "Welcome, Founder Advisor.", description: "You've jumped the first hurdle." });
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="how-it-works" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            {/* Scarcity Counter */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">88/500 Founder spots remaining</span>
            </div>

            {/* StoryBrand Headline: Identifying the Villain */}
            <h1 className="text-5xl lg:text-7xl font-black leading-[0.95] tracking-tighter">
              STOP BUYING COURSES. <br />
              <span className="text-primary">START EXECUTING.</span>
            </h1>

            <div className="max-w-lg space-y-6">
              <p className="text-xl text-zinc-400 font-medium">
                Courses sell dreams. We provide execution. Our AI Consultant cuts through analysis paralysis to give you the <span className="text-white">exact daily steps</span> to build your startup.
              </p>

              {!submitted ? (
                <div className="space-y-4">
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter email to get the Roadmap"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-6 py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      required
                    />
                    <button type="submit" disabled={isSubmitting} className="btn-primary-hacker">
                      {isSubmitting ? "Syncing..." : "Get Access →"}
                    </button>
                  </form>
                  <p className="text-xs text-zinc-500 font-mono italic">
                    Lock in $9/mo for life. Price jumps to $49/mo after launch.
                  </p>
                </div>
              ) : (
                /* VIRAL LOOP COMPONENT */
                <div className="glass-card-hacker p-8 space-y-6 animate-scale-in border-primary/40">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black font-black text-xl">#241</div>
                    <div>
                      <h3 className="text-white font-bold">You are now a Founder Advisor</h3>
                      <p className="text-xs text-zinc-500 font-mono">Status: Awaiting Deployment</p>
                    </div>
                  </div>
                  <div className="p-4 bg-black rounded-lg border border-zinc-800 flex items-center justify-between">
                    <code className="text-xs text-primary">{referralLink}</code>
                    <Copy className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-white" onClick={() => {navigator.clipboard.writeText(referralLink); toast({title: "Copied!"})}} />
                  </div>
                  <p className="text-sm text-zinc-400">Refer 1 friend to <span className="text-white font-bold">jump 500 spots</span> and skip the line.</p>
                </div>
              )}
            </div>
          </div>

          {/* Depth-Enhanced Mockup */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[120px] -z-10" />
            <div className="relative z-10 rotate-[-5deg] hover:rotate-0 transition-transform duration-700">
               <div className="p-2 bg-[#0c0c0c] rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] border border-white/5">
                 <div className="aspect-[9/19] w-[280px] sm:w-[320px] rounded-[2.5rem] overflow-hidden bg-black">
                   <img src="/business-model.png" alt="HustleIQ App Preview" className="w-full h-full object-cover opacity-80" />
                 </div>
               </div>
               {/* Floating "Executing" Badge */}
               <div className="absolute -right-8 top-1/4 glass-card-hacker p-4 shadow-2xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <p className="text-[10px] font-mono text-white tracking-widest">SYSTEM: EXECUTING_TASK_04</p>
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