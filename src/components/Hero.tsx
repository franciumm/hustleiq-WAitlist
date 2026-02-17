import { useState, useEffect } from 'react'; 
import { useToast } from '@/hooks/use-toast'; 
import { Check, Copy, Share2, DollarSign, Globe, Github, Cpu, Apple } from 'lucide-react';

interface HeroProps {
  referralCode?: string | null;
}

const Hero = ({ referralCode }: HeroProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState(''); 
  const [step, setStep] = useState(1); 
  const [referralData, setReferralData] = useState({ link: '', position: 0, refId: '' });
  
  // ⚡️ NEW: Live Counter States
  const [dbCount, setDbCount] = useState(0);
  const baselineBuilders = 2488;
  const initialSpots = 88;

  useEffect(() => {
    // Persistence Logic
    const savedData = localStorage.getItem('hustleiq_waitlist_user');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setReferralData(parsed);
        setStep(3); 
      } catch (e) {
        localStorage.removeItem('hustleiq_waitlist_user');
      }
    }

    const fetchLiveCount = async () => {
      try {
        let apiUrl = import.meta.env.VITE_API_URL;
        if (apiUrl.endsWith('/')) apiUrl = apiUrl.slice(0, -1);

      const targetUrl = `${apiUrl}/api/waitlist/count`;
         const response = await fetch(targetUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const res = await response.json();
  if (import.meta.env.DEV) console.log("Live Count Received:", res);
        if (typeof res.count === 'number') {
        setDbCount(res.count);
      }
      } catch (err) {
        console.error("Counter fetch failed");
      }
    };

    fetchLiveCount();
    const interval = setInterval(fetchLiveCount, 30000); 
    return () => clearInterval(interval);
  }, []);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setStep(2);
    } else {
      toast({ variant: "destructive", title: "Invalid Email", description: "Please enter a valid email address." });
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      
      const response = await fetch(`${apiUrl}/api/waitlist/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          reason: reason.trim(),
          referralCode: referralCode || ""
        }),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || "Failed to join waitlist");
      }

      const userStats = {
        link: res.data.referralLink,
        position: res.data.currentPosition,
        refId: res.data.referralCode || 'SYNCED'
      };

      localStorage.setItem('hustleiq_waitlist_user', JSON.stringify(userStats));
      
      setReferralData(userStats);
      setStep(3);

      if (response.status === 200) {
        toast({ title: "Welcome Back!", description: `Position #${res.data.currentPosition}` });
      } else {
        toast({ title: "You're in!", description: `Position #${res.data.currentPosition}` });
      }

    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err.message });    
    } finally {
      setLoading(false);
    }
  };

  const copyRef = () => {
    if (referralData.link) {
      navigator.clipboard.writeText(referralData.link);
      toast({ title: "Link Copied!", description: "Share it with builders to skip the line." });
    }
  };

  return (
    <section id="how-it-works" className="relative min-h-screen w-full flex items-start lg:items-center justify-center px-4 pt-44 lg:pt-32 pb-12">
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          
          <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 border-t-hacker shadow-2xl">
                <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-[0.15em]">
                  {/* ⚡️ DYNAMIC SPOTS LEFT */}
                  {Math.max(initialSpots - dbCount, 7)}/512 SPOTS LEFT — IOS_DEPLOY_v1.0.4
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-black tracking-tighter animate-fade-in-up leading-[0.9]">
              STOP DREAMING.<br />
              <span className="text-primary">START BUILDING.</span>
            </h1>

            <div className="max-w-[420px] w-full space-y-6">
              <div className="text-base sm:text-lg text-white/40 animate-fade-in-up space-y-1">
                <p>Skip the noise. Get <span className="text-white">daily execution steps</span>.</p>
                <p><span className="text-primary font-black uppercase">Build 3x faster</span> than any course.</p>
                <p>Join <span className="text-white font-bold font-mono">
                  {/* ⚡️ DYNAMIC BUILDER COUNT */}
                  {(baselineBuilders + dbCount).toLocaleString()}+ builders
                </span> shipping today.</p>
              </div>

              <div className="relative z-20">
                {step === 1 && (
                  <form onSubmit={handleNext} className="flex flex-col sm:flex-row gap-2 animate-fade-in-up">
                    <input
                      type="email"
                      placeholder="Email to skip the line"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3.5 bg-[#080808] border border-white/5 rounded-xl text-white font-mono text-xs shadow-well focus:ring-1 focus:ring-primary/50 outline-none"
                      required
                    />
                    <button type="submit" className="btn-primary py-3.5 px-6 rounded-xl text-[10px]">CLAIM ACCESS →</button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleFinalSubmit} className="space-y-3 animate-scale-in">
                    <p className="text-[9px] font-mono text-primary uppercase tracking-widest text-left">Founder Audit: What is the #1 thing stopping you from shipping?</p>
                    <input
                      type="text"
                      placeholder="e.g. 'I can't code' or 'No ideas'"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-4 py-3.5 bg-[#080808] border border-primary/20 rounded-xl text-white font-mono text-xs shadow-well"
                      required
                      autoFocus
                    />
                    <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 rounded-xl text-[10px]">
                      {loading ? "SYNCING..." : "CONFIRM STATUS →"}
                    </button>
                  </form>
                )}

                {step === 3 && (
                  <div className="glass-card p-5 border-primary/50 bg-primary/5 animate-scale-in text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-black text-lg font-mono">
                        #{referralData.position}
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-white leading-none tracking-widest uppercase">BUILDER STATUS: ACTIVE</h3>
                        <p className="text-[8px] font-mono text-primary uppercase mt-1">Ref_ID: {referralData.refId}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-white/60 mb-4 leading-relaxed">Invite builders to skip the queue. You move up 2 spots per signup.</p>
                    <div className="flex gap-2">
                      <button onClick={copyRef} className="flex-1 h-10 rounded-lg bg-white/5 border border-white/10 text-[9px] font-mono text-white/50 uppercase flex items-center justify-center gap-2 transition-colors hover:bg-white/10">
                         <Copy className="w-3 h-3 text-primary" /> COPY_LINK
                      </button>
                      <button onClick={copyRef} className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-black active:scale-95 transition-transform"><Share2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 opacity-20 grayscale animate-fade-in-up delay-300">
               <div className="flex items-center gap-1.5 font-mono text-[8px] font-bold"><Cpu className="w-3 h-3 text-white"/> POWERED_BY_GEMINI</div>
               <div className="flex items-center gap-1.5 font-mono text-[8px] font-bold"><Apple className="w-3 h-3 text-white"/> APP_STORE</div>
               <div className="flex items-center gap-1.5 font-mono text-[8px] font-bold"><Globe className="w-3 h-3 text-white"/> STRIPE</div>
               <div className="flex items-center gap-1.5 font-mono text-[8px] font-bold"><Github className="w-3 h-3 text-white"/> VERCEL</div>
            </div>
          </div>

          <div className="relative flex justify-center w-full lg:pl-12">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-[100px] opacity-40" />
            <div className="relative z-10 w-[220px] sm:w-[280px] animate-float">
              <div className="relative p-2 bg-[#0c0c0c] rounded-[2.8rem] shadow-float-pro border border-white/10 border-t-hacker">
                <div className="relative aspect-[9/19.5] rounded-[2.4rem] overflow-hidden bg-black">
                  <img src="/business-model.png" alt="Dashboard" className="w-full h-full object-cover" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-5 bg-black rounded-b-xl z-20 border-x border-b border-white/5" />
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