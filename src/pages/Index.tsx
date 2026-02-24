import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/hooks/use-toast';

// Replaces the vanilla JS grid with a clean React Component
const ContributionGrid = () => {
  return (
    <div id="contribution-grid" className="grid grid-flow-col grid-rows-7 gap-1.5">
      {Array.from({ length: 280 }).map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-sm transition-colors duration-300 ${
            i === 279 ? 'bg-primary animate-pulse-green' : i > 268 ? 'bg-primary' : 'bg-slate-100'
          }`}
        />
      ))}
    </div>
  );
};

const Index = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get('ref') || localStorage.getItem('referredBy');

  // Preserve referral code if user lands from an invite link
  useEffect(() => {
    if (searchParams.get('ref')) {
      localStorage.setItem('referredBy', searchParams.get('ref') as string);
    }
  }, [searchParams]);

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const targetUrl = apiUrl.endsWith('/') ? `${apiUrl}api/waitlist/join` : `${apiUrl}/api/waitlist/join`;

      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), referralCode: referralCode || '' }),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || 'Failed to join waitlist');
      }

      setStatus('success');
      toast({
        title: "Welcome to the Diamond Circle",
        description: res.data?.currentPosition 
            ? `You've successfully joined the waitlist. Position #${res.data.currentPosition}`
            : "You've successfully joined the waitlist.",
      });
      setEmail('');
    } catch (error: any) {
      setStatus('idle');
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: error.message || 'Please try again later.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-primary selection:text-white">
      <Helmet>
        <title>HustleIQ | The Agentic SaaS Execution Engine</title>
        <meta property="og:title" content="We Make You an Operator in 30 Days." />
        <meta property="og:description" content="The Swiss-engineered execution engine for side-hustlers. Let our AI agents build your daily blueprint using live 2026 data." />
        <meta property="twitter:title" content="HustleIQ | The Agentic SaaS Execution Engine" />
        <meta property="twitter:description" content="Stop planning, start shipping. We make you an Operator in 30 days." />
      </Helmet>

      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200" aria-label="Main Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex-shrink-0 flex items-center gap-3 group" aria-label="HustleIQ Home">
              <span className="font-bold text-xl tracking-tight text-slate-900">HustleIQ</span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#how-it-works">How it Works</a>
              <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#gamification">Gamification</a>
              <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#pricing">Manifesto</a>
            </div>
            <div className="flex items-center">
              <a href="#waitlist" className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                Join the Diamond Circle
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        {/* HERO SECTION */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-8">
              <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-100 rounded-full px-3 py-1 w-fit" role="status">
                <span className="flex h-2 w-2 relative" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-bold text-primary tracking-wide uppercase">Early Access Open</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                We Make You an <br />
                <span className="text-primary">Operator</span> in 30 Days.
              </h1>

              <p className="text-lg lg:text-xl text-slate-500 max-w-lg leading-relaxed font-normal">
                Stop planning, start shipping. Our 6-agent AI pipeline scouts markets, architects solutions, and executes your side-hustle blueprint automatically.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="#waitlist" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-bold transition-all shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.3),0_4px_6px_-1px_rgba(46,184,46,0.4)] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  <span>Start Execution</span>
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                </a>
                <button type="button" className="bg-transparent border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-300">
                  <span>View Demo</span>
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">play_circle</span>
                </button>
              </div>
            </div>

            {/* LIVE PIPELINE LOG */}
            <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm text-slate-300 shadow-2xl border border-slate-800" aria-hidden="true">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-2 text-slate-500 text-xs">pipeline_activity.log</span>
              </div>
              <div className="space-y-2">
                <div className="flex gap-3"><span className="text-blue-400">09:41:22</span><span className="text-primary">[Scout]</span><span>Analyzing 4 micro-SaaS niches...</span></div>
                <div className="flex gap-3"><span class="text-blue-400">09:41:24</span><span className="text-purple-400">[Architect]</span><span>Generating MVP schema v1.2...</span></div>
                <div className="flex gap-3"><span className="text-blue-400">09:41:28</span><span className="text-yellow-400">[Builder]</span><span className="text-white">Deploying constraints...</span></div>
              </div>
            </div>
          </div>
        </header>

        {/* GAMIFICATION SECTION */}
        <section id="gamification" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Rewire Your Brain for Execution</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-normal">
              We replaced willpower with dopamine. Gamified milestones ensure you never miss a day of progress.
            </p>
          </div>

          <div className="grid grid-cols-12 grid-rows-2 gap-6 h-auto lg:h-[600px]">
            {/* Operator Streak Card */}
            <article className="col-span-12 lg:col-span-8 bento-card flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">The Operator Streak</h3>
                  <p className="text-4xl font-bold text-slate-900">12 Day Streak</p>
                  <p className="text-sm font-bold text-primary mt-2">Consistency Score: Top 5%</p>
                </div>
                <div className="bg-green-50 p-3 rounded-xl">
                  <span className="material-symbols-outlined text-primary" aria-hidden="true">local_fire_department</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-auto" aria-hidden="true">
                <ContributionGrid />
              </div>
            </article>

            {/* Unlock Progress Card */}
            <article className="col-span-12 lg:col-span-4 row-span-2 bento-card flex flex-col items-center justify-between text-center">
              <div className="w-full">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">The Unlock Progress</h3>
                <div className="relative h-64 w-4 bg-slate-100 rounded-full mx-auto mb-8 overflow-hidden" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                  <div className="absolute bottom-0 w-full bg-primary rounded-full transition-all duration-1000" style={{ height: '75%' }}></div>
                </div>
                <div className="mb-6">
                  <span className="material-symbols-outlined text-4xl text-slate-300" aria-hidden="true">lock_open</span>
                </div>
                <p className="text-xl font-bold text-slate-900 mb-1">Next Unlock: CFO Agent Pro</p>
                <p className="text-sm text-slate-500 font-normal">3 days to unlock</p>
              </div>
              <div className="w-full p-4 bg-slate-50 rounded-xl mt-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tight mb-2">Completion Rate</p>
                <p className="text-3xl font-bold text-slate-900">75%</p>
              </div>
            </article>

            {/* Identity Badge Card */}
            <article className="col-span-12 lg:col-span-8 bento-card flex items-center gap-8">
              <div className="relative">
                <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center transform rotate-45 shadow-xl" aria-hidden="true">
                  <span className="material-symbols-outlined text-white text-4xl -rotate-45">shield</span>
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">LVL 3</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">The Identity Badge</h3>
                <p className="text-2xl font-bold text-slate-900">Current Rank: Level 3 Builder</p>
                <p className="text-slate-500 text-sm mt-1 font-normal">Reach Level 4 to access the Private Discord.</p>
              </div>
              <div className="hidden sm:block">
                <button type="button" className="px-6 py-2 border-2 border-slate-100 rounded-lg text-sm font-bold text-slate-600 hover:border-slate-200 hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-slate-300">
                  View Leaderboard
                </button>
              </div>
            </article>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">The Execution Engine</h2>
              <p className="text-slate-500 max-w-2xl mx-auto font-normal">
                Transforming fuzzy ideas into operational businesses through rigorous, AI-driven constraints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <article className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 text-slate-600 shadow-sm border border-slate-100">
                  <span className="material-symbols-outlined" aria-hidden="true">filter_list</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. Define Your Constraints</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-normal">
                  Input your time, budget, and skill parameters. The engine locks them in to prevent scope creep before it starts.
                </p>
              </article>

              <article className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 text-slate-600 shadow-sm border border-slate-100">
                  <span className="material-symbols-outlined" aria-hidden="true">radar</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. Deploy the Scout</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-normal">
                  Our AI agents scan thousands of market signals to find opportunities that match your specific operator profile.
                </p>
              </article>

              <article className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 text-slate-600 shadow-sm border border-slate-100">
                  <span className="material-symbols-outlined" aria-hidden="true">done_all</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. Execute the Blueprint</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-normal">
                  Receive a day-by-day execution plan. Use our tools to automate the setup, marketing, and first sale.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" className="py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden p-8 md:p-12 text-center border border-slate-100">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-primary"></div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to become an Operator?</h2>
              <p className="text-slate-500 mb-10 font-normal">Join 2,400+ builders in the waitlist. We onboard 50 new operators every Monday.</p>

              <form onSubmit={handleJoinWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 rounded-xl border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 outline-none transition-all disabled:opacity-70"
                  placeholder="enter@your-email.com"
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>

              <p className="mt-6 text-xs text-slate-400 font-normal flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">lock</span>
                No spam. Only high-signal updates.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img alt="HustleIQ Logo" className="h-6 w-6 object-contain opacity-40 grayscale" src="/logo.png" />
            <span className="text-sm text-slate-400 font-normal">&copy; 2026 HustleIQ Inc. All rights reserved.</span>
          </div>

          <div className="flex gap-8">
            <a className="text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="#">Privacy Policy</a>
            <a className="text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="#">Terms</a>
            <a className="text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="https://twitter.com/hustleiq" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
