import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Copy, CheckCircle2 } from 'lucide-react';

const Hero = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [referralCount, setReferralCount] = useState(0);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    toast({ title: "Position Secured", description: "You are #2,481 in line." });
  };

  return (
    <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col items-center">
      <div className="container max-w-5xl mx-auto text-center z-10">
        <div className="mono-label mb-4">Phase 01: Beta Enrollment Open</div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter">
          STOP GUESSING.<br />
          <span className="gradient-text">START EXECUTING.</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 font-medium">
          The AI Co-founder that finds your business DNA and enforces daily execution until you hit $10k/mo.
        </p>

        {!submitted ? (
          <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-16">
            <input 
              id="waitlist-input"
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-[#63E602] transition-colors"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              JOIN WAITLIST
            </button>
          </form>
        ) : (
          <div className="glass-card p-8 max-w-lg mx-auto mb-16 animate-in fade-in zoom-in duration-500">
            <h3 className="text-2xl font-bold mb-2">You're #2,481 in line</h3>
            <p className="text-gray-400 mb-6">Want to skip the line? Invite 2 friends to gain immediate Beta access.</p>
            <div className="flex items-center gap-2 p-3 bg-black/40 rounded-xl border border-white/10">
              <code className="flex-1 text-primary text-sm">hustleiq.ai/ref=founder_{Math.floor(Math.random()*1000)}</code>
              <button onClick={() => toast({title: "Link Copied"})} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Copy size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Floating iPhone Mockup */}
        <div className="relative w-full max-w-[300px] mx-auto mt-10">
          <div className="relative z-10 animate-float">
            <div className="p-2 bg-zinc-900 rounded-[3rem] shadow-[0_0_50px_rgba(99,230,2,0.2)]">
              <img 
                src="/business-model.png" 
                alt="HustleIQ App Preview" 
                className="rounded-[2.5rem] w-full h-auto"
              />
            </div>
          </div>
          {/* Neon Glow Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#63E602]/20 blur-[100px] -z-10" />
        </div>
      </div>
    </section>
  );
};

export default Hero;