import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { TerminalWindow } from '@/components/TerminalWindow';
import { CustomCursor } from '@/components/CustomCursor';

const ManifestoTicker = () => {
  const items = ['Ship or Stay Stuck', 'Execution > Planning', 'Ideas Are Worthless', 'Build in Public', 'Operator Mindset', 'No Zero Days', '30 Days to First Sale'];

  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex">
            {items.map((t, j) => (
              <span key={j} className="ticker-item">
                <span>{t}</span>
                <span className="dot" />
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
      let cls = 'sq';
      if (isRecent) {
        const idx = Math.floor(Math.random() * levels.length);
        if (levels[idx]) cls += ' ' + levels[idx];
        if (c === cols - 1 && r === 3) cls += ' pulse';
      } else if (Math.random() > 0.55) {
        cls += ' lvl1';
      }
      gridItems.push(<div key={`${c}-${r}`} className={cls} />);
    }
  }

  return (
    <div id="contribution-grid">
      {gridItems}
    </div>
  );
};

const Index = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) localStorage.setItem('hustleiq_ref', ref);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
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
    <div className="app-container">
      <CustomCursor />

      {/* NAV */}
      <nav>
        <a href="/" className="nav-logo">
          <div className="nav-logo-mark" />
          HustleIQ
        </a>
        <ul className="nav-links">
          <li><a href="#agents">The Engine</a></li>
          <li><a href="#gamification">Gamification</a></li>
          <li><a href="#steps">How It Works</a></li>
        </ul>
        <a href="#waitlist" className="nav-cta">Join the Circle →</a>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Early Access Open — 2,400+ Operators on Waitlist
        </div>
        <h1>
          Stop<br />
          <span className="strike">Planning.</span><br />
          Start <span className="accent">Shipping.</span>
        </h1>
        <p className="hero-body">
          Our 6-agent AI pipeline scouts markets, architects solutions, and executes your side-hustle blueprint —
          automatically. Become an Operator in 30 days.
        </p>
        <div className="hero-actions">
          <a href="#waitlist" className="btn-primary">
            Start Execution
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#steps" className="btn-ghost">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
            </svg>
            View Demo
          </a>
        </div>
        <div className="hero-stats">
          <div>
            <div className="hero-stat-num">30</div>
            <div className="hero-stat-label">Days to First Sale</div>
          </div>
          <div>
            <div className="hero-stat-num">6</div>
            <div className="hero-stat-label">AI Agents Working for You</div>
          </div>
          <div>
            <div className="hero-stat-num">2,400+</div>
            <div className="hero-stat-label">Operators on Waitlist</div>
          </div>
        </div>

        <TerminalWindow />
      </header>

      {/* TICKER */}
      <ManifestoTicker />

      {/* AGENT SECTION */}
      <section id="agents" className="section-agents">
        <div className="fade-in">
          <div className="section-label">// 01 — The Engine</div>
          <h2 className="section-title">6 Agents.<br />Zero Excuses.</h2>
          <p className="section-sub">Every agent has one job. Collectively they eliminate the gap between idea and income.</p>
        </div>
        <div className="agents-grid fade-in">
          {[
            { id: '01', icon: '🎯', name: 'Scout', desc: 'Analyzes thousands of market signals in real-time to surface high-ROI micro-SaaS niches matching your operator profile.', tag: 'MARKET INTEL', bg: 'rgba(29,255,122,0.08)', color: 'var(--green)' },
            { id: '02', icon: '♟️', name: 'Strategist', desc: 'Develops your execution roadmap and defines your competitive moat. No scope creep. Only high-leverage moves.', tag: 'STRATEGY', bg: 'rgba(181,154,255,0.08)', color: '#B59AFF' },
            { id: '03', icon: '📡', name: 'Marketer', desc: 'Writes cold outreach sequences, landing copy, and social content. Trained on 2026 conversion data. Ships ready-to-send.', tag: 'GROWTH', bg: 'rgba(255,107,157,0.08)', color: '#FF6B9D' },
            { id: '04', icon: '💰', name: 'CFO', desc: 'Builds live financial models: runway, pricing strategy, and break-even targets calibrated to your bootstrap budget.', tag: 'FINANCE', bg: 'rgba(6,214,255,0.08)', color: '#06D6FF' },
            { id: '05', icon: '🔍', name: 'QA', desc: 'Audits every output. Reads the plans and assures the final one is perfect, catching logic gaps before they hit production.', tag: 'VALIDATION', bg: 'rgba(40,200,64,0.08)', color: '#28C840' },
            { id: '06', icon: '🚀', name: 'Launchpad', desc: 'Orchestrates your 30-day daily blueprint. Task by task. No decision fatigue. Just open the app and execute the next step.', tag: 'LAUNCH OPS', bg: 'rgba(255,154,60,0.08)', color: '#FF9A3C' }
          ].map((agent) => (
            <div key={agent.id} className="agent-card">
              <div className="agent-num">AG-{agent.id}</div>
              <div className="agent-icon" style={{ background: agent.bg }}>{agent.icon}</div>
              <div className="agent-name">{agent.name}</div>
              <div className="agent-desc">{agent.desc}</div>
              <span className="agent-tag" style={{ background: agent.bg, color: agent.color }}>{agent.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* GAMIFICATION */}
      <section id="gamification" className="section-game">
        <div className="fade-in">
          <div className="section-label">// 02 — Gamification</div>
          <h2 className="section-title">HustleIQ makes<br />Productivity <br /> addictive.<br /></h2>
          <p className="section-sub">Streaks, ranks, and unlockable agents keep you executing — even when motivation dies.</p>
        </div>
        <div className="game-grid fade-in">
          <div className="game-card">
            <div className="game-card-label">Operator Streak</div>
            <div className="game-card-title">12 Day Streak 🔥</div>
            <div className="game-card-sub">Consistency Score: Top 5% of Operators</div>
            <StreakGrid />
          </div>

          <div className="game-card rank-card">
            <div className="game-card-label">Identity Badge</div>
            <div className="rank-badge">
              <div className="rank-inner">
                <div className="rank-shield">🛡️</div>
                <div className="rank-level">LEVEL 3</div>
              </div>
            </div>
            <div className="rank-title-text">Builder Rank</div>
            <div className="rank-desc">Reach Level 4 to unlock Private Discord + the CFO Agent Pro upgrade. You're 3 days out.</div>
            <div className="rank-progress-track">
              <div className="rank-progress-fill" />
            </div>
            <div className="rank-xp">
              <span>1,240 XP</span>
              <span>2,000 XP to Lv4</span>
            </div>
          </div>

          <div className="game-card unlock-card">
            <div className="unlock-icon">🔓</div>
            <div>
              <div className="game-card-label">Next Unlock</div>
              <div className="unlock-name">CFO Agent Pro</div>
              <div className="unlock-eta">3 days remaining</div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-1px' }}>75%</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)' }}>COMPLETE</div>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="steps" className="section-steps">
        <div className="fade-in">
          <div className="section-label">// 03 — How It Works</div>
          <h2 className="section-title">Three Steps<br />to Operator.</h2>
        </div>
        <div className="steps-grid fade-in">
          {[
            { num: '01', icon: '⚙️', title: 'Define Your Constraints', desc: 'Input your time, capital, and skills. The engine locks them to prevent scope creep before the first agent fires.', connector: true },
            { num: '02', icon: '📡', title: 'Deploy the Scout', desc: 'AI agents scan thousands of live market signals to surface the highest-probability opportunity matching your exact profile.', connector: true },
            { num: '03', icon: '✅', title: 'Execute the Blueprint', desc: 'Receive a day-by-day operator guide. Use built-in tools to automate setup, outreach, and your first paying customer.' }
          ].map((step) => (
            <div key={step.num} className="step">
              <div className="step-num">{step.num}</div>
              <div className="step-icon-wrap">{step.icon}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
              {step.connector && <div className="step-connector">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="section-waitlist">
        <div className="waitlist-inner fade-in">
          <div className="section-label" style={{ textAlign: 'center' }}>// Join the Circle</div>
          <h2 className="section-title" style={{ marginBottom: '20px' }}>Ready to Become<br />an Operator?</h2>
          <p className="waitlist-sub">50 new operators onboarded every Monday. Join 2,400+ builders already in the waitlist.</p>
          <form className="waitlist-form" onSubmit={handleJoinWaitlist}>
            <input
              className="waitlist-input"
              type="email"
              placeholder="enter@your-email.com"
              required
              id="waitlist-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ cursor: 'none', border: 'none' }}
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Joining...' : status === 'success' ? "✓ You're on the List" : 'Join Waitlist'}
            </button>
          </form>
          <div className="waitlist-note">🔒 No spam. Only high-signal operator updates.</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          <div className="nav-logo-mark" />
          HustleIQ
        </div>
        <div className="footer-copy">© 2026 HustleIQ Inc. All rights reserved.</div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="https://twitter.com/hustleiq" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;