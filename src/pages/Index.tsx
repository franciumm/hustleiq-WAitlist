import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Rocket } from 'lucide-react';
import { TerminalWindow } from '@/components/TerminalWindow';
import { CustomCursor } from '@/components/CustomCursor';
import { AgentIcon } from '@/components/AgentIcon';

const ManifestoTicker = () => {
  const items = ['Ship or Stay Stuck', 'Execution > Planning', 'Ideas Are Worthless', 'Build in Public', 'Operator Mindset', 'No Zero Days', '30 Days to First Sale'];

  return (
    <div className="border-y border-border bg-surface overflow-hidden py-4 select-none">
      <div className="flex w-fit animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 px-8">
            {items.map((item, j) => (
              <span key={j} className="flex items-center gap-8 font-syne font-bold text-[13px] text-foreground/25 uppercase tracking-widest">
                <span>{item}</span>
                <span className="w-1 h-1 bg-primary rounded-full" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const StreakGrid = () => {
  const cols = 28;
  const levels = [null, null, null, 'bg-primary/20', 'bg-primary/20', 'bg-primary/45', 'bg-primary/45', 'bg-primary/70', 'bg-primary/70', 'bg-primary'];

  return (
    <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
      {[...Array(cols)].map((_, c) => (
        [...Array(7)].map((_, r) => {
          const isRecent = c > cols - 13;
          let cls = "w-[10px] h-[10px] rounded-[2px]";
          if (isRecent) {
            const idx = Math.floor(Math.random() * levels.length);
            const lvCls = levels[idx];
            cls += lvCls ? ` ${lvCls}` : " bg-primary/7";
            if (c === cols - 1 && r === 3) cls += " shadow-[0_0_15px_rgba(29,255,122,0.4)] animate-pulse";
          } else {
            cls += Math.random() > 0.55 ? " bg-primary/20" : " bg-primary/7";
          }
          return <div key={`${c}-${r}`} className={cls} />;
        })
      ))}
    </div>
  );
};

const Index = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [registeredUser, setRegisteredUser] = useState<{ position: number | string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('hustleiq_user_v1');
    if (saved) setRegisteredUser(JSON.parse(saved));

    const ref = searchParams.get('ref');
    if (ref) localStorage.setItem('hustleiq_ref', ref);

    // Fade-in observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }, [searchParams]);

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          referralCode: localStorage.getItem('hustleiq_ref')
        }),
      });

      const res = await response.json();
      if (!response.ok) throw new Error(res.message || 'Server error');

      const userData = { position: res.data?.currentPosition || 'N/A' };
      localStorage.setItem('hustleiq_user_v1', JSON.stringify(userData));
      setRegisteredUser(userData);
      setStatus('success');

      toast({
        title: "Welcome to the Circle",
        description: `Position #${userData.position}`,
      });
    } catch (error: any) {
      setStatus('idle');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-background">
      <CustomCursor />
      <div className="noise-overlay" />
      <div className="grid-bg" />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-[100] px-6 terminal:px-12 h-[72px] flex items-center justify-between border-b border-border bg-background/85 backdrop-blur-3xl">
        <a href="/" className="font-syne font-extrabold text-[22px] tracking-tight text-foreground flex items-center gap-[10px]">
          <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center relative overflow-hidden text-background font-mono text-[9px] font-medium">IQ</div>
          HustleIQ
        </a>
        <ul className="hidden terminal:flex gap-10 list-none">
          {['The Engine', 'Gamification', 'How It Works'].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="font-sans text-[13px] font-medium text-foreground/45 hover:text-primary transition-colors tracking-wide">
                {item}
              </a>
            </li>
          ))}
        </ul>
        <a href="#waitlist" className="font-syne font-bold text-[13px] bg-primary text-background px-[22px] py-[10px] rounded-lg hover:shadow-[0_0_24px_rgba(29,255,122,0.45)] hover:-translate-y-[1px] transition-all tracking-wide">
          Join the Circle →
        </a>
      </nav>

      {/* HERO */}
      <header className="relative z-10 min-h-screen flex flex-col justify-center px-6 terminal:px-12 max-w-7xl mx-auto w-full pt-[140px] pb-20">
        <div className="flex items-center gap-[10px] font-mono text-[11px] font-medium text-primary tracking-[0.15em] uppercase mb-8">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          Early Access Open — 2,400+ Operators on Waitlist
        </div>

        <h1 className="font-syne font-extrabold text-[clamp(56px,8vw,108px)] leading-[0.92] tracking-[-3px] text-foreground max-w-[900px] mb-10">
          Stop<br />
          <span className="relative text-foreground/25 after:content-[''] after:absolute after:left-0 after:top-1/2 after:w-full after:h-[3px] after:bg-primary after:-translate-y-1/2">Planning.</span><br />
          Start <span className="text-primary italic">Shipping.</span>
        </h1>

        <p className="font-sans text-[17px] font-light text-foreground/45 max-w-[480px] leading-relaxed mb-[52px]">
          Our 6-agent AI pipeline scouts markets, architects solutions, and executes your side-hustle blueprint —
          automatically. Become an Operator in 30 days.
        </p>

        <div className="flex items-center gap-5">
          <a href="#waitlist" className="bg-primary text-background px-9 py-4 rounded-[10px] font-syne font-bold text-[14px] hover:shadow-[0_0_40px_rgba(29,255,122,0.5)] hover:-translate-y-[2px] transition-all flex items-center gap-2.5 group">
            Start Execution
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#steps" className="text-foreground/45 hover:text-foreground px-4 py-2 font-sans font-medium text-[14px] flex items-center gap-2 transition-all group">
            <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
              <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-current border-b-[3px] border-b-transparent ml-1" />
            </div>
            View Demo
          </a>
        </div>

        <div className="flex gap-12 mt-[72px] pt-10 border-t border-border">
          {[
            { num: '30', label: 'Days to First Sale' },
            { num: '6', label: 'AI Agents Working for You' },
            { num: '2,400+', label: 'Operators on Waitlist' }
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-syne font-extrabold text-[32px] text-foreground tracking-tighter">{stat.num}</div>
              <div className="text-[12px] text-foreground/45 mt-1 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="hidden terminal:block absolute right-12 top-1/2 -translate-y-1/2">
          <TerminalWindow />
        </div>
      </header>

      {/* TICKER */}
      <ManifestoTicker />

      {/* ENGINE SECTION */}
      <section id="the-engine" className="relative z-10 py-[120px] px-6 terminal:px-12 max-w-7xl mx-auto w-full">
        <div className="fade-in">
          <div className="font-mono text-[11px] text-primary tracking-[0.18em] uppercase mb-5">// 01 — The Engine</div>
          <h2 className="font-syne font-extrabold text-[clamp(36px,4vw,58px)] leading-[1.0] tracking-[-2px] text-foreground mb-5">6 Agents.<br />Zero Excuses.</h2>
          <p className="font-sans text-[16px] font-light text-foreground/45 max-w-[480px] leading-relaxed mb-16">
            Every agent has one job. Collectively they eliminate the gap between idea and income.
          </p>
        </div>

        <div className="grid grid-cols-1 stack:grid-cols-2 terminal:grid-cols-3 border border-border rounded-[18px] overflow-hidden fade-in">
          {[
            { tag: 'MARKET INTEL', color: '#1DFF7A', bg: 'rgba(29,255,122,0.08)', agent: 'Scout', icon: '🎯', desc: 'Analyzes thousands of market signals in real-time to surface high-ROI micro-SaaS niches matching your operator profile.' },
            { tag: 'STRATEGY', color: '#B59AFF', bg: 'rgba(181,154,255,0.08)', agent: 'Strategist', icon: '♟️', desc: 'Develops your execution roadmap and defines your competitive moat. No scope creep. Only high-leverage moves.' },
            { tag: 'GROWTH', color: '#FF6B9D', bg: 'rgba(255,107,157,0.08)', agent: 'Marketer', icon: '📡', desc: 'Writes cold outreach sequences, landing copy, and social content. Trained on 2026 conversion data. Ships ready-to-send.' },
            { tag: 'FINANCE', color: '#06D6FF', bg: 'rgba(6,214,255,0.08)', agent: 'CFO', icon: '💰', desc: 'Builds live financial models: runway, pricing strategy, and break-even targets calibrated to your bootstrap budget.' },
            { tag: 'VALIDATION', color: '#28C840', bg: 'rgba(40,200,64,0.08)', agent: 'QA', icon: '🔍', desc: 'Audits every output. Reads the plans and assures the final one is perfect, catching logic gaps before they hit production.' },
            { tag: 'LAUNCH OPS', color: '#FF9A3C', bg: 'rgba(255,154,60,0.08)', agent: 'Launchpad', icon: '🚀', desc: 'Orchestrates your 30-day daily blueprint. Task by task. No decision fatigue. Just open the app and execute the next step.' }
          ].map((card, i) => (
            <div key={i} className="bg-surface p-8 terminal:p-9 border border-border group hover:bg-surface-2 transition-colors">
              <div className="font-mono text-[11px] text-foreground/25 tracking-widest mb-5">AG-0{i + 1}</div>
              <div className="w-11 h-11 rounded-medium flex items-center justify-center text-xl mb-5" style={{ backgroundColor: card.bg }}>{card.icon}</div>
              <h3 className="font-syne font-bold text-[18px] tracking-tight text-foreground mb-2.5">The {card.agent}</h3>
              <p className="text-[13px] font-light text-foreground/45 leading-relaxed mb-5">{card.desc}</p>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-[4px] tracking-wider" style={{ backgroundColor: card.bg, color: card.color }}>{card.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* GAMIFICATION */}
      <section id="gamification" className="relative z-10 py-[120px] px-6 terminal:px-12 max-w-7xl mx-auto w-full">
        <div className="fade-in">
          <div className="font-mono text-[11px] text-primary tracking-[0.18em] uppercase mb-5">// 02 — Gamification</div>
          <h2 className="font-syne font-extrabold text-[clamp(36px,4vw,58px)] leading-[1.0] tracking-[-2px] text-foreground mb-5">HustleIQ makes<br />Productivity <br /> addictive.<br /></h2>
          <p className="font-sans text-[16px] font-light text-foreground/45 max-w-[480px] leading-relaxed mb-16">
            Streaks, ranks, and unlockable agents keep you executing — even when motivation dies.
          </p>
        </div>

        <div className="grid terminal:grid-cols-[1fr_380px] gap-4 fade-in">
          {/* STREAK */}
          <div className="bg-surface border border-border rounded-[18px] p-9 group hover:border-primary/30 transition-all">
            <div className="font-mono text-[10px] text-foreground/25 tracking-[0.15em] uppercase mb-2.5">Operator Streak</div>
            <h3 className="font-syne font-extrabold text-[26px] tracking-tight text-foreground mb-1.5">12 Day Streak 🔥</h3>
            <div className="font-mono text-[12px] text-primary mb-7">Consistency Score: Top 5% of Operators</div>
            <div className="overflow-x-auto min-w-full">
              <StreakGrid />
            </div>
          </div>

          {/* RANK */}
          <div className="terminal:row-span-2 bg-surface border border-border rounded-[18px] p-9 group hover:border-primary/30 transition-all flex flex-col">
            <div className="font-mono text-[10px] text-foreground/25 tracking-[0.15em] uppercase mb-2.5">Identity Badge</div>
            <div className="relative w-[200px] aspect-[2/3] mx-auto mb-6 rounded-[14px] border border-border overflow-hidden flex items-center justify-center p-8">
              <div className="absolute inset-[-1px] animate-spin-border" style={{ background: 'conic-gradient(from 0deg, transparent 60%, rgba(29, 255, 122, 0.3) 80%, transparent 100%)' }} />
              <div className="absolute inset-[1px] bg-surface rounded-[13px]" />
              <div className="relative z-10 text-center">
                <div className="text-[72px] leading-none drop-shadow-[0_0_20px_rgba(29,255,122,0.4)]">🛡️</div>
                <div className="font-syne font-bold text-[13px] text-primary tracking-widest mt-2.5">LEVEL 3</div>
              </div>
            </div>
            <h3 className="font-syne font-extrabold text-[22px] tracking-tight text-foreground mb-2 text-center">Builder Rank</h3>
            <p className="text-[13px] text-foreground/45 font-light leading-relaxed mb-5 text-center px-4">Reach Level 4 to unlock Private Discord + the CFO Agent Pro upgrade. You're 3 days out.</p>
            <div className="mt-auto">
              <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
                <div className="h-full w-[62%] bg-gradient-to-r from-primary/60 to-primary rounded-full" />
              </div>
              <div className="flex justify-between font-mono text-[10px] text-foreground/25 mt-2">
                <span>1,240 XP</span>
                <span>2,000 XP to Lv4</span>
              </div>
            </div>
          </div>

          {/* UNLOCK */}
          <div className="bg-surface border border-border rounded-[18px] p-9 flex items-center gap-5 group hover:border-primary/30 transition-all">
            <div className="w-14 h-14 shrink-0 rounded-[14px] bg-gradient-to-br from-primary/15 to-primary/5 border border-border flex items-center justify-center text-2xl">🔓</div>
            <div className="flex-1">
              <div className="font-mono text-[10px] text-foreground/25 tracking-[0.15em] uppercase mb-1">Next Unlock</div>
              <div className="font-syne font-bold text-[18px] tracking-tight text-foreground">CFO Agent Pro</div>
              <div className="font-mono text-[12px] text-primary mt-1">3 days remaining</div>
            </div>
            <div className="text-right">
              <div className="font-syne font-extrabold text-[32px] text-foreground tracking-tighter">75%</div>
              <div className="font-mono text-[10px] text-foreground/25 tracking-widest uppercase">Complete</div>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS SECTION */}
      <section id="how-it-works" className="relative z-10 py-[120px] px-6 terminal:px-12 max-w-7xl mx-auto w-full">
        <div className="fade-in">
          <div className="font-mono text-[11px] text-primary tracking-[0.18em] uppercase mb-5">// 03 — How It Works</div>
          <h2 className="font-syne font-extrabold text-[clamp(36px,4vw,58px)] leading-[1.0] tracking-[-2px] text-foreground mb-5">Three Steps<br />to Operator.</h2>
        </div>

        <div className="grid grid-cols-1 terminal:grid-cols-3 bg-border gap-px border border-border rounded-[18px] overflow-hidden mt-16 fade-in">
          {[
            { num: '01', icon: '⚙️', title: 'Define Your Constraints', desc: 'Input your time, capital, and skills. The engine locks them to prevent scope creep before the first agent fires.' },
            { num: '02', icon: '📡', title: 'Deploy the Scout', desc: 'AI agents scan thousands of live market signals to surface the highest-probability opportunity matching your exact profile.' },
            { num: '03', icon: '✅', title: 'Execute the Blueprint', desc: 'Receive a day-by-day operator guide. Use built-in tools to automate setup, outreach, and your first paying customer.' }
          ].map((step, i) => (
            <div key={i} className="bg-black p-12 transition-colors hover:bg-surface relative group">
              <div className="font-syne font-extrabold text-[72px] text-primary/5 leading-none tracking-[-4px] mb-6">{step.num}</div>
              <div className="w-12 h-12 rounded-xl border border-primary/30 flex items-center justify-center text-[22px] mb-6">{step.icon}</div>
              <h3 className="font-syne font-bold text-[22px] tracking-tight text-foreground mb-3.5">{step.title}</h3>
              <p className="text-[14px] font-light text-foreground/45 leading-relaxed">{step.desc}</p>
              {i < 2 && <div className="hidden terminal:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black border border-primary/30 rounded-full items-center justify-center z-10 text-[10px] text-primary">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="relative z-10 py-[120px] px-6 terminal:px-12">
        <div className="max-w-3xl mx-auto text-center fade-in">
          <div className="font-mono text-[11px] text-primary tracking-[0.18em] uppercase mb-5">// Join the Circle</div>
          <h2 className="font-syne font-extrabold text-[clamp(44px,6vw,72px)] leading-none tracking-[-3px] text-foreground mb-5">
            Ready to Become<br />an Operator?
          </h2>
          <p className="font-sans text-[16px] font-light text-foreground/45 leading-relaxed mb-12">
            50 new operators onboarded every Monday. Join 2,400+ builders already in the waitlist.
          </p>

          <form onSubmit={handleJoinWaitlist} className="flex flex-col stack:flex-row gap-2.5 max-w-[500px] mx-auto mb-6">
            <input
              type="email"
              placeholder="enter@your-email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-surface border border-border rounded-[10px] px-5 py-3.5 font-sans text-[14px] text-foreground placeholder:text-foreground/25 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="bg-primary text-background px-8 py-3.5 rounded-[10px] font-syne font-bold text-[14px] hover:shadow-lg transition-all disabled:opacity-50"
            >
              {status === 'loading' ? 'Encrypting...' : status === 'success' ? '✓ Joined' : 'Join Waitlist'}
            </button>
          </form>
          <div className="font-mono text-[11px] text-foreground/25 tracking-wide">🔒 No spam. Only high-signal operator updates.</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 terminal:px-12 py-10 border-t border-border flex flex-col stack:flex-row items-center justify-between gap-5">
        <div className="font-syne font-extrabold text-[16px] text-foreground flex items-center gap-2">
          <div className="w-5 h-5 bg-primary rounded-[4px] flex items-center justify-center text-background font-mono text-[6px] font-medium">IQ</div>
          HustleIQ
        </div>
        <div className="font-mono text-[11px] text-foreground/25 tracking-wide">© 2026 HustleIQ Inc. All rights reserved.</div>
        <div className="flex gap-7">
          {['Privacy', 'Terms', 'Twitter'].map((link) => (
            <a key={link} href="#" className="text-[12px] text-foreground/25 hover:text-primary transition-colors">{link}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Index;