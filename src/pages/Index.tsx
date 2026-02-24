import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { TerminalWindow } from '@/components/TerminalWindow';
import { CustomCursor } from '@/components/CustomCursor';

const ManifestoTicker = () => {
  const items = ['Ship or Stay Stuck', 'Execution > Planning', 'Ideas Are Worthless', 'Build in Public', 'Operator Mindset', 'No Zero Days', '30 Days to First Sale'];

  return (
    <div className="border-t border-b border-[var(--border)] bg-[var(--surface)] overflow-hidden py-4">
      <div className="flex gap-0 animate-[ticker_20s_linear_infinite] whitespace-nowrap w-fit">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex">
            {items.map((t, j) => (
              <span key={j} className="flex items-center gap-8 px-8 font-syne font-bold text-[13px] text-[var(--text-dim)] uppercase tracking-[0.08em]">
                <span>{t}</span>
                <span className="w-1 h-1 bg-[var(--green)] rounded-full" />
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
  const levels = [null, null, null, 'lvl1', 'lvl1', 'lvl2', 'lvl2', 'lvl3', 'lvl3', 'lvl4'];
  const gridItems = [];

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < 7; r++) {
      const isRecent = c > cols - 13;
      let cls = "w-2.5 h-2.5 rounded-[2px] bg-[rgba(29,255,122,0.07)] transition-all";
      if (isRecent) {
        const idx = Math.floor(Math.random() * levels.length);
        const lvl = levels[idx];
        if (lvl === 'lvl1') cls = "w-2.5 h-2.5 rounded-[2px] bg-[rgba(29,255,122,0.2)]";
        if (lvl === 'lvl2') cls = "w-2.5 h-2.5 rounded-[2px] bg-[rgba(29,255,122,0.45)]";
        if (lvl === 'lvl3') cls = "w-2.5 h-2.5 rounded-[2px] bg-[rgba(29,255,122,0.7)]";
        if (lvl === 'lvl4') cls = "w-2.5 h-2.5 rounded-[2px] bg-[var(--green)]";
        if (c === cols - 1 && r === 3) cls += " animate-[sq-pulse_2s_ease-in-out_infinite]";
      } else if (Math.random() > 0.55) {
        cls = "w-2.5 h-2.5 rounded-[2px] bg-[rgba(29,255,122,0.2)]";
      }
      gridItems.push(<div key={`${c}-${r}`} className={cls} />);
    }
  }

  return (
    <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
      {gridItems}
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
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          referralCode: localStorage.getItem('hustleiq_ref')
        }),
      });

      const res = await resp.json();
      if (!resp.ok) throw new Error(res.message || 'Server error');

      const userData = { position: res.data?.currentPosition || 'N/A' };
      setRegisteredUser(userData);
      localStorage.setItem('hustleiq_user_v1', JSON.stringify(userData));
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
    <div className="min-h-screen relative">
      <CustomCursor />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-[100] px-6 terminal:px-12 h-[72px] flex items-center justify-between border-b border-[var(--border)] bg-[rgba(5,10,6,0.85)] backdrop-blur-[24px]">
        <a href="/" className="font-syne font-extrabold text-[22px] tracking-tighter text-[var(--text-primary)] flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[var(--green)] rounded-md flex items-center justify-center text-[var(--black)] font-mono text-[9px] font-medium">IQ</div>
          HustleIQ
        </a>
        <ul className="hidden terminal:flex gap-10">
          {['The Engine', 'Gamification', 'How It Works'].map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="font-sans text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--green)] transition-colors tracking-wide">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <a href="#waitlist" className="font-syne font-bold text-[13px] bg-[var(--green)] text-[var(--black)] rounded-lg px-[22px] py-2.5 hover:shadow-[0_0_24px_rgba(29,255,122,0.45)] hover:-translate-y-[1px] transition-all tracking-wide">
          Join the Circle →
        </a>
      </nav>

      {/* HERO */}
      <header className="hero min-h-screen flex flex-col justify-center px-6 terminal:px-12 py-[140px] terminal:py-[140px] max-w-[1280px] mx-auto w-full">
        <div className="flex items-center gap-2.5 font-mono text-[11px] font-medium text-[var(--green)] tracking-[0.15em] uppercase mb-8">
          <span className="w-1.5 h-1.5 bg-[var(--green)] rounded-full animate-[blink_1.5s_ease-in-out_infinite]" />
          Early Access Open — 2,400+ Operators on Waitlist
        </div>

        <h1 className="font-syne font-extrabold text-[clamp(56px,8vw,108px)] leading-[0.92] tracking-[-3px] text-[var(--text-primary)] max-w-[900px] mb-10">
          Stop<br />
          <span className="relative text-[var(--text-dim)] after:content-[''] after:absolute after:left-0 after:top-1/2 after:w-full after:h-[3px] after:bg-[var(--green)] after:-translate-y-1/2">Planning.</span><br />
          Start <span className="text-[var(--green)] relative">Shipping.</span>
        </h1>

        <p className="font-sans text-[17px] font-light text-[var(--text-muted)] max-w-[480px] leading-[1.7] mb-[52px]">
          Our 6-agent AI pipeline scouts markets, architects solutions, and executes your side-hustle blueprint —
          automatically. Become an Operator in 30 days.
        </p>

        <div className="flex items-center gap-5">
          <a href="#waitlist" className="btn-primary px-9 py-4 bg-[var(--green)] text-[var(--black)] rounded-[10px] font-syne font-bold text-sm tracking-wide flex items-center gap-2.5 transition-all hover:shadow-[0_0_40px_rgba(29,255,122,0.5),0_8px_24px_rgba(29,255,122,0.2)] hover:-translate-y-[2px] group">
            Start Execution
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#steps" className="font-sans text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-2 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
            </svg>
            View Demo
          </a>
        </div>

        <div className="flex gap-12 mt-[72px] pt-10 border-t border-[var(--border)]">
          {[
            { num: '30', label: 'Days to First Sale' },
            { num: '6', label: 'AI Agents Working for You' },
            { num: '2,400+', label: 'Operators on Waitlist' }
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-syne font-extrabold text-[32px] text-[var(--text-primary)] tracking-tight">{stat.num}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1 tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="hidden terminal:block absolute right-12 top-1/2 -translate-y-1/2">
          <TerminalWindow />
        </div>
      </header>

      {/* TICKER */}
      <ManifestoTicker />

      {/* AGENTS SECTION */}
      <section id="the-engine" className="py-[120px] px-6 terminal:px-12 max-w-[1280px] mx-auto w-full">
        <div className="fade-in">
          <div className="font-mono text-[11px] text-[var(--green)] tracking-[0.18em] uppercase mb-5">// 01 — The Engine</div>
          <h2 className="font-syne font-extrabold text-[clamp(36px,4vw,58px)] leading-none tracking-[-2px] text-[var(--text-primary)] mb-5">6 Agents.<br />Zero Excuses.</h2>
          <p className="font-sans text-base font-light text-[var(--text-muted)] max-w-[480px] leading-[1.7] mb-16">
            Every agent has one job. Collectively they eliminate the gap between idea and income.
          </p>
        </div>

        <div className="grid grid-cols-1 stack:grid-cols-2 terminal:grid-cols-3 border border-[var(--border)] rounded-[18px] overflow-hidden gap-[2px] fade-in">
          {[
            { num: '01', icon: '🎯', name: 'Scout', desc: 'Analyzes thousands of market signals in real-time to surface high-ROI micro-SaaS niches matching your operator profile.', tag: 'MARKET INTEL', bg: 'rgba(29,255,122,0.08)', color: 'var(--green)' },
            { num: '02', icon: '♟️', name: 'Strategist', desc: 'Develops your execution roadmap and defines your competitive moat. No scope creep. Only high-leverage moves.', tag: 'STRATEGY', bg: 'rgba(181,154,255,0.08)', color: '#B59AFF' },
            { num: '03', icon: '📡', name: 'Marketer', desc: 'Writes cold outreach sequences, landing copy, and social content. Trained on 2026 conversion data. Ships ready-to-send.', tag: 'GROWTH', bg: 'rgba(255,107,157,0.08)', color: '#FF6B9D' },
            { num: '04', icon: '💰', name: 'CFO', desc: 'Builds live financial models: runway, pricing strategy, and break-even targets calibrated to your bootstrap budget.', tag: 'FINANCE', bg: 'rgba(6,214,255,0.08)', color: '#06D6FF' },
            { num: '05', icon: '🔍', name: 'QA', desc: 'Audits every output. Reads the plans and assures the final one is perfect, catching logic gaps before they hit production.', tag: 'VALIDATION', bg: 'rgba(40,200,64,0.08)', color: '#28C840' },
            { num: '06', icon: '🚀', name: 'Launchpad', desc: 'Orchestrates your 30-day daily blueprint. Task by task. No decision fatigue. Just open the app and execute the next step.', tag: 'LAUNCH OPS', bg: 'rgba(255,154,60,0.08)', color: '#FF9A3C' }
          ].map((agent) => (
            <div key={agent.num} className="bg-[var(--surface)] p-[36px_32px] group hover:bg-[var(--surface-2)] transition-colors relative after:content-[''] after:absolute after:inset-0 after:border after:border-[var(--border)] after:pointer-events-none">
              <div className="font-mono text-[11px] text-[var(--text-dim)] tracking-widest mb-5">AG-{agent.num}</div>
              <div className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xl mb-5" style={{ background: agent.bg }}>{agent.icon}</div>
              <h3 className="font-syne font-bold text-lg text-[var(--text-primary)] tracking-tight mb-[10px]">The {agent.name}</h3>
              <p className="text-[13px] font-light text-[var(--text-muted)] leading-[1.65]">{agent.desc}</p>
              <span className="inline-block mt-5 font-mono text-[10px] px-2.5 py-1 rounded-[4px] tracking-[0.08em] uppercase" style={{ background: agent.bg, color: agent.color }}>{agent.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* GAMIFICATION */}
      <section id="gamification" className="py-[120px] px-6 terminal:px-12 max-w-[1280px] mx-auto w-full">
        <div className="fade-in">
          <div className="font-mono text-[11px] text-[var(--green)] tracking-[0.18em] uppercase mb-5">// 02 — Gamification</div>
          <h2 className="font-syne font-extrabold text-[clamp(36px,4vw,58px)] leading-none tracking-[-2px] text-[var(--text-primary)] mb-5">HustleIQ makes<br />Productivity <br /> addictive.<br /></h2>
          <p className="font-sans text-base font-light text-[var(--text-muted)] max-w-[480px] leading-[1.7] mb-16">
            Streaks, ranks, and unlockable agents keep you executing — even when motivation dies.
          </p>
        </div>

        <div className="grid terminal:grid-cols-[1fr_380px] gap-4 fade-in">
          {/* STREAK */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[18px] p-9 group hover:border-[var(--border-bright)] transition-all">
            <div className="font-mono text-[10px] text-[var(--text-dim)] tracking-[0.15em] uppercase mb-[10px]">Operator Streak</div>
            <h3 className="font-syne font-extrabold text-[26px] tracking-tight text-[var(--text-primary)] mb-1.5">12 Day Streak 🔥</h3>
            <div className="font-mono text-xs text-[var(--green)] mb-7">Consistency Score: Top 5% of Operators</div>
            <div className="overflow-x-auto">
              <div className="min-w-fit">
                <StreakGrid />
              </div>
            </div>
          </div>

          {/* RANK */}
          <div className="terminal:row-span-2 bg-[var(--surface)] border border-[var(--border)] rounded-[18px] p-9 group hover:border-[var(--border-bright)] transition-all flex flex-col">
            <div className="font-mono text-[10px] text-[var(--text-dim)] tracking-[0.15em] uppercase mb-2.5">Identity Badge</div>
            <div className="relative w-[200px] aspect-[2/3] mx-auto mb-6 rounded-[14px] border border-[var(--border)] overflow-hidden flex items-center justify-center p-8 bg-[radial-gradient(circle_at_30%_30%,rgba(29,255,122,0.1),transparent_60%)] after:content-[''] after:absolute after:inset-[1px] after:bg-[var(--surface)] after:rounded-[13px] after:z-0 group-hover:after:bg-[var(--surface-2)] transition-colors">
              <div className="absolute inset-[-1px] animate-[spin-border_4s_linear_infinite] rounded-[14px]" style={{ background: 'conic-gradient(from 0deg, transparent 60%, rgba(29, 255, 122, 0.3) 80%, transparent 100%)' }} />
              <div className="relative z-10 text-center">
                <div className="text-[72px] leading-none drop-shadow-[0_0_20px_rgba(29,255,122,0.4)]">🛡️</div>
                <div className="font-syne font-bold text-[13px] text-[var(--green)] tracking-[0.1em] mt-2.5 uppercase">LEVEL 3</div>
              </div>
            </div>
            <h3 className="font-syne font-extrabold text-[22px] tracking-tight text-[var(--text-primary)] mb-2 text-center">Builder Rank</h3>
            <p className="text-[13px] text-[var(--text-muted)] font-light leading-[1.6] mb-5 text-center">Reach Level 4 to unlock Private Discord + the CFO Agent Pro upgrade. You're 3 days out.</p>
            <div className="mt-auto">
              <div className="h-1 bg-[rgba(29,255,122,0.1)] rounded-full overflow-hidden">
                <div className="h-full w-[62%] bg-gradient-to-r from-[var(--green-dim)] to-[var(--green)] rounded-full shadow-[0_0_8px_rgba(29,255,122,0.2)]" />
              </div>
              <div className="flex justify-between font-mono text-[10px] text-[var(--text-dim)] mt-2 uppercase tracking-wide">
                <span>1,240 XP</span>
                <span>2,000 XP to Lv4</span>
              </div>
            </div>
          </div>

          {/* UNLOCK */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[18px] p-9 flex items-center gap-5 group hover:border-[var(--border-bright)] transition-all">
            <div className="w-14 h-14 shrink-0 rounded-[14px] bg-gradient-to-br from-[rgba(29,255,122,0.15)] to-[rgba(29,255,122,0.05)] border border-[var(--border)] flex items-center justify-center text-2xl">🔓</div>
            <div className="flex-1">
              <div className="font-mono text-[10px] text-[var(--text-dim)] tracking-[0.15em] uppercase mb-1">Next Unlock</div>
              <div className="font-syne font-bold text-lg text-[var(--text-primary)] tracking-tight">CFO Agent Pro</div>
              <div className="font-mono text-xs text-[var(--green)] mt-1 tracking-wide uppercase">3 days remaining</div>
            </div>
            <div className="text-right">
              <div className="font-syne font-extrabold text-[32px] text-[var(--text-primary)] tracking-tighter">75%</div>
              <div className="font-mono text-[10px] text-[var(--text-dim)] tracking-widest uppercase">Complete</div>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS SECTION */}
      <section id="how-it-works" className="py-[120px] px-6 terminal:px-12 max-w-[1280px] mx-auto w-full">
        <div className="fade-in">
          <div className="font-mono text-[11px] text-[var(--green)] tracking-[0.18em] uppercase mb-5">// 03 — How It Works</div>
          <h2 className="font-syne font-extrabold text-[clamp(36px,4vw,58px)] leading-none tracking-[-2px] text-[var(--text-primary)] mb-5">Three Steps<br />to Operator.</h2>
        </div>

        <div className="grid grid-cols-1 terminal:grid-cols-3 bg-[var(--border)] gap-px border border-[var(--border)] rounded-[18px] overflow-hidden mt-16 fade-in">
          {[
            { num: '01', icon: '⚙️', title: 'Define Your Constraints', desc: 'Input your time, capital, and skills. The engine locks them to prevent scope creep before the first agent fires.' },
            { num: '02', icon: '📡', title: 'Deploy the Scout', desc: 'AI agents scan thousands of live market signals to surface the highest-probability opportunity matching your exact profile.' },
            { num: '03', icon: '✅', title: 'Execute the Blueprint', desc: 'Receive a day-by-day operator guide. Use built-in tools to automate setup, outreach, and your first paying customer.' }
          ].map((step, i) => (
            <div key={i} className="bg-[var(--black)] p-[48px_36px] transition-colors hover:bg-[var(--surface)] relative group">
              <div className="font-syne font-extrabold text-[72px] text-[rgba(29,255,122,0.06)] leading-none tracking-[-4px] mb-6">{step.num}</div>
              <div className="w-12 h-12 rounded-xl border border-[var(--border-bright)] flex items-center justify-center text-[22px] mb-6">{step.icon}</div>
              <h3 className="font-syne font-bold text-[22px] tracking-tight text-[var(--text-primary)] mb-3.5 leading-none">{step.title}</h3>
              <p className="text-sm font-light text-[var(--text-muted)] leading-[1.7]">{step.desc}</p>
              {i < 2 && <div className="hidden terminal:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--black)] border border-[var(--border-bright)] rounded-full items-center justify-center z-10 text-[10px] text-[var(--green)]">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="py-[120px] px-6 terminal:px-12">
        <div className="max-w-[800px] mx-auto text-center fade-in">
          <div className="font-mono text-[11px] text-[var(--green)] tracking-[0.18em] uppercase mb-5">// Join the Circle</div>
          <h2 className="font-syne font-extrabold text-[clamp(44px,6vw,72px)] leading-none tracking-[-3px] text-[var(--text-primary)] mb-5">
            Ready to Become<br />an Operator?
          </h2>
          <p className="text-base text-[var(--text-muted)] font-light leading-[1.7] mb-12">
            50 new operators onboarded every Monday. Join 2,400+ builders already in the waitlist.
          </p>

          <form onSubmit={handleJoinWaitlist} className="flex flex-col stack:flex-row gap-2.5 max-w-[500px] mx-auto mb-6">
            <input
              type="email"
              placeholder="enter@your-email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-[10px] px-5 py-3.5 font-sans text-sm text-[var(--text-primary)] placeholder:text-[var(--text-dim)] outline-none focus:border-[var(--green)] focus:ring-[3px] focus:ring-[rgba(29,255,122,0.08)] transition-all"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="btn-primary flex-none bg-[var(--green)] text-[var(--black)] font-syne font-bold text-sm tracking-wide rounded-[10px] px-9 py-4 transition-all hover:shadow-[0_0_24px_rgba(29,255,122,0.45)] disabled:opacity-50"
            >
              {status === 'loading' ? 'Encrypting...' : status === 'success' ? '✓ Joined' : 'Join Waitlist'}
            </button>
          </form>
          <div className="font-mono text-[11px] text-[var(--text-dim)] tracking-[0.05em] uppercase">🔒 No spam. Only high-signal operator updates.</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 terminal:px-12 py-10 border-t border-[var(--border)] flex flex-col stack:flex-row items-center justify-between gap-5 relative z-10">
        <div className="font-syne font-extrabold text-base text-[var(--text-primary)] flex items-center gap-2">
          <div className="w-5 h-5 bg-[var(--green)] rounded-[4px] flex items-center justify-center text-[var(--black)] font-mono text-[6px] font-medium">IQ</div>
          HustleIQ
        </div>
        <div className="font-mono text-[11px] text-[var(--text-dim)] tracking-[0.05em]">© 2026 HustleIQ Inc. All rights reserved.</div>
        <div className="flex gap-7">
          {['Privacy', 'Terms', 'Twitter'].map((link) => (
            <a key={link} href="#" className="text-xs text-[var(--text-dim)] hover:text-[var(--green)] transition-all whitespace-nowrap">{link}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Index;