import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Check, Download, ArrowRight, Lock } from 'lucide-react';
import { TerminalWindow } from '@/components/TerminalWindow';
import { CustomCursor } from '@/components/CustomCursor';
import { AgentIcon } from '@/components/AgentIcon';

const ManifestoTicker = () => (
  <div className="w-full bg-primary border-y-2 border-primary overflow-hidden py-4 select-none">
    <div className="flex animate-marquee whitespace-nowrap">
      {[...Array(10)].map((_, i) => (
        <span key={i} className="text-background font-syne font-bold text-2xl uppercase tracking-tighter mx-4">
          Ship or Stay Stuck • Execution &gt; Planning • Ideas Are Worthless •
        </span>
      ))}
    </div>
  </div>
);

const StreakGrid = () => {
  const squares = new Array(28 * 7).fill(0).map(() => Math.random());

  return (
    <div className="grid grid-cols-[repeat(28,1fr)] gap-1 w-full max-w-2xl">
      {squares.map((val, i) => (
        <div
          key={i}
          className="aspect-square border border-primary/10 transition-colors duration-500"
          style={{
            backgroundColor: val > 0.8 ? '#1DFF7A' : val > 0.5 ? 'rgba(29,255,122,0.4)' : val > 0.3 ? 'rgba(29,255,122,0.1)' : 'transparent',
            opacity: val > 0.2 ? 1 : 0.3
          }}
        />
      ))}
    </div>
  );
};

const Index = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [referralCode, setReferralCode] = useState('');
  const [registeredUser, setRegisteredUser] = useState<{ position: number | string } | null>(null);

  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('hustleiq_user_v1');
      if (savedUser) setRegisteredUser(JSON.parse(savedUser));
    } catch (e) {
      console.error('Failed to parse user data');
    }

    let code = searchParams.get('ref') || '';
    if (!code) {
      try {
        code = localStorage.getItem('referredBy') || '';
      } catch (e) { /* Ignore */ }
    } else {
      try {
        localStorage.setItem('referredBy', code);
      } catch (e) { /* Ignore */ }
    }
    setReferralCode(code);
  }, [searchParams]);

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const targetUrl = apiUrl.endsWith('/') ? `${apiUrl}api/waitlist/join` : `${apiUrl}/api/waitlist/join`;

      const payload: Record<string, string> = {
        email: email.trim(),
        reason: "Fast tracked via V2 Neo-Brutalist page"
      };

      if (referralCode) payload.referralCode = referralCode;

      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let res: any = {};
      try { res = text ? JSON.parse(text) : {}; } catch (e) { }

      if (!response.ok) throw new Error(res.message || res.error || `Server error: ${response.status}`);

      const userData = { position: res.data?.currentPosition || 'N/A' };
      localStorage.setItem('hustleiq_user_v1', JSON.stringify(userData));
      setRegisteredUser(userData);

      toast({
        title: "Welcome to the Diamond Circle",
        description: `Position #${userData.position}`,
      });
      setEmail('');
    } catch (error: unknown) {
      setStatus('idle');
      const errorMessage = error instanceof Error ? error.message : 'Please try again later.';
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: errorMessage,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CustomCursor />
      <ManifestoTicker />

      {/* NAV */}
      <nav className="border-b-2 border-primary bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-syne font-bold text-2xl tracking-tighter text-primary">HUSTLEIQ</div>
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest text-white/40">
            <a href="#gamification" className="hover:text-primary transition-colors">Gamification</a>
            <a href="#pipeline" className="hover:text-primary transition-colors">Pipeline</a>
            <a href="#waitlist" className="hover:text-primary transition-colors">Join</a>
          </div>
          <a href="#waitlist" className="neo-brutalist-border bg-primary px-4 py-2 text-xs font-mono font-bold uppercase translate-y-[-2px] hover:translate-y-[0px] transition-transform">
            Get Started
          </a>
        </div>
      </nav>

      <main className="flex-1">
        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 border border-primary/20 px-3 py-1 bg-primary/5 w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">System Online: v2.0.4</span>
            </div>
            <h1 className="font-syne font-bold text-6xl lg:text-8xl tracking-tighter leading-[0.92] uppercase text-white">
              We Make You <br />
              <span className="text-primary italic">An Operator</span><br />
              In 30 Days.
            </h1>
            <p className="font-sans text-xl text-white/60 max-w-xl leading-relaxed">
              Stop planning, start shipping. Our 6-agent AI pipeline scouts markets, architects solutions, and executes your side-hustle blueprint automatically.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#waitlist" className="neo-brutalist-border bg-primary px-8 py-4 font-syne font-bold text-xl uppercase flex items-center gap-2">
                Start Execution <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/2026_Niche_Discovery.pdf" target="_blank" className="border-2 border-white/10 px-8 py-4 font-syne font-bold text-xl uppercase hover:bg-white/5 transition-colors">
                Blueprint.pdf
              </a>
            </div>
          </div>

          <div className="hidden lg:block min-w-0" id="pipeline">
            <TerminalWindow />
          </div>
        </section>

        {/* GAMIFICATION */}
        <section id="gamification" className="border-t-2 border-primary/20 py-24 bg-primary/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-syne font-bold text-4xl lg:text-6xl tracking-tighter uppercase mb-16 text-white text-center">
              Rewire Your Brain For <span className="text-primary">Dopamine</span>
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Streak */}
              <div className="lg:col-span-2 neo-brutalist-card flex flex-col gap-12">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Operational Consistency</h3>
                    <div className="font-syne font-bold text-5xl text-white tracking-tighter">12 DAY STREAK</div>
                  </div>
                  <div className="w-12 h-12 border-2 border-primary flex items-center justify-center text-primary">
                    <Rocket className="w-6 h-6" />
                  </div>
                </div>
                <StreakGrid />
              </div>

              {/* Badge */}
              <div className="neo-brutalist-card flex flex-col items-center justify-center gap-8 text-center min-h-[400px]">
                <div className="relative p-[4px] rounded-full overflow-hidden group">
                  <div className="absolute inset-0 bg-conic-gradient from-primary via-primary/20 to-primary animate-spin-border"
                    style={{ background: 'conic-gradient(from 0deg, #1DFF7A, rgba(29,255,122,0.1), #1DFF7A)' }} />
                  <div className="relative bg-background rounded-full w-32 h-32 flex items-center justify-center">
                    <AgentIcon name="Launchpad" className="w-16 h-16 text-primary" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-background px-3 py-1 font-mono font-bold text-[10px] uppercase">
                    LVL 3
                  </div>
                </div>
                <div>
                  <h3 className="font-syne font-bold text-2xl text-white tracking-tight uppercase">Level 3 Builder</h3>
                  <p className="font-mono text-[10px] text-white/40 mt-2 uppercase tracking-widest">Reach Lvl 4 for Alpha Access</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AGENTS BENTO */}
        <section className="py-24 border-t-2 border-primary/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Scout', 'Strategist', 'Marketer', 'CFO', 'QA', 'Launchpad'].map((agent) => (
                <div key={agent} className="neo-brutalist-card group hover:border-primary/60 transition-colors">
                  <AgentIcon name={agent} className="w-8 h-8 text-primary mb-6" />
                  <h4 className="font-syne font-bold text-2xl text-white mb-2 uppercase tracking-tighter">The {agent}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Custom-tuned LLM designed specifically for {agent === 'Scout' ? 'market arbitrage' : 'high-velocity execution'}.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" className="py-32 border-t-2 border-primary">
          <div className="max-w-4xl mx-auto px-6">
            <div className="neo-brutalist-card neo-brutalist-border p-12 lg:p-20 text-center">
              {!registeredUser ? (
                <div className="flex flex-col gap-8">
                  <h2 className="font-syne font-bold text-5xl lg:text-7xl tracking-tighter uppercase text-white leading-none">
                    Enter the <br /> <span className="text-primary italic">Engine Room</span>
                  </h2>
                  <p className="font-sans text-white/60 text-lg max-w-xl mx-auto">
                    We onboard 50 new operators every Monday. Secure your frequency.
                  </p>

                  <form onSubmit={handleJoinWaitlist} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto w-full pt-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="OPERATOR@MAIL.COM"
                      required
                      className="flex-1 bg-white/5 border-2 border-white/10 px-6 py-4 font-mono text-primary placeholder:text-white/10 focus:border-primary focus:outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="bg-primary px-8 py-4 font-syne font-bold text-xl uppercase text-background hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                    >
                      {status === 'loading' ? 'SYCHRONIZING...' : 'JOIN NOW'}
                    </button>
                  </form>
                  <div className="flex items-center justify-center gap-2 text-white/30 font-mono text-[10px] uppercase tracking-widest mt-4">
                    <Lock className="w-3 h-3" /> Encrypted Transmission Protocol
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-8 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-primary mx-auto flex items-center justify-center">
                    <Check className="w-10 h-10 text-background" />
                  </div>
                  <h2 className="font-syne font-bold text-5xl lg:text-7xl tracking-tighter uppercase text-white">
                    VERIFIED.
                  </h2>
                  <div className="font-mono text-primary text-4xl font-bold tracking-[0.2em]">
                    POS #{registeredUser.position}
                  </div>
                  <p className="text-white/60">Spot secured. Prepare for deployment instructions.</p>
                  <a href="/2026_Niche_Discovery.pdf" target="_blank" className="neo-brutalist-border bg-primary px-8 py-4 font-syne font-bold text-xl uppercase text-background w-fit mx-auto flex items-center gap-2">
                    <Download className="w-6 h-6" /> Download Blueprint
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t-2 border-primary/20 py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-syne font-bold text-lg text-primary">HUSTLEIQ_INC</div>
          <div className="flex gap-12 text-[10px] font-mono uppercase tracking-widest text-white/20">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="https://twitter.com/hustleiq" className="hover:text-primary">X / Twitter</a>
          </div>
          <div className="text-[10px] font-mono text-white/10 uppercase">&copy; 2026 EXECUTION_ENGINE</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;