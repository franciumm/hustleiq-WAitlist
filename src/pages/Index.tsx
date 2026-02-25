import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { TerminalWindow } from '@/components/TerminalWindow';
import { CustomCursor } from '@/components/CustomCursor';
import { Download } from 'lucide-react';
import logo from '@/assets/logo.png';

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

  const gridItems = useMemo(() => {
    const items = [];
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
        items.push(<div key={`${c}-${r}`} className={cls} />);
      }
    }
    return items;
  }, []);

  return (
    <div id="contribution-grid">
      {gridItems}
    </div>
  );
};

const Index = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [registeredUser, setRegisteredUser] = useState<{ position: number | string } | null>(null);
const [email, setEmail] = useState('');
  const [activeSection, setActiveSection] = useState<string>('hero');


  useEffect(() => {
    // Check for existing user
    const savedUser = localStorage.getItem('hustleiq_user_v1');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && typeof parsed === 'object') {
          setRegisteredUser(parsed);
          setStatus('success');
        }
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }

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

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('section, header').forEach(el => sectionObserver.observe(el));

    return () => {
      sectionObserver.disconnect();
      observer.disconnect();
    };
  }, [searchParams]);

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const rawApiUrl = import.meta.env.VITE_API_URL?.trim() || '';

      if (!rawApiUrl) {
        console.warn('[waitlist] VITE_API_URL is not set, using same-origin /api base.');
      }
      const apiBase = rawApiUrl;
      const endpoint = apiBase
        ? (apiBase.endsWith('/') ? `${apiBase}api/waitlist/join` : `${apiBase}/api/waitlist/join`)
        : '/api/waitlist/join';

      const referralCode = localStorage.getItem('hustleiq_ref') || '';

      const payload: Record<string, string> = {
        email: email.trim(),
        reason: 'Joined via Neo-Brutalist Landing Page',
      };

      if (referralCode && referralCode.trim() !== '') {
        payload.referralCode = referralCode.trim();
      }

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const res = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        console.error('[waitlist] join failed', {
          endpoint,
          status: resp.status,
          statusText: resp.statusText,
          body: res,
        });
        const message = (res && (res.message || res.error)) || `Request failed with status ${resp.status}`;
        throw new Error(message);
      }

      const userData = { position: res.data?.currentPosition || 'N/A' };
      localStorage.setItem('hustleiq_user_v1', JSON.stringify(userData));
      setRegisteredUser(userData);
      setStatus('success');

      toast({
        title: "Welcome to the Circle",
        description: `Position #${userData.position}`,
      });
    } catch (error: any) {
      console.error('[waitlist] join error', error);
      setStatus('idle');
      const description = error?.message || 'Something went wrong while joining the waitlist.';
      toast({
        variant: 'destructive',
        title: 'Error',
        description,
      });
    }
  };

  return (
    <div className="app-container">
      <CustomCursor />
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* NAV */}
      <nav>
        <a href="/" className="nav-logo">
          <img src={logo} alt="HustleIQ logo" className="nav-logo-img" />
          HustleIQ
        </a>
        <ul className="nav-links">
          <li><a href="#agents" className={activeSection === 'agents' ? 'active' : ''}>The Engine</a></li>
          <li><a href="#gamification" className={activeSection === 'gamification' ? 'active' : ''}>Gamification</a></li>
          <li><a href="#steps" className={activeSection === 'steps' ? 'active' : ''}>How It Works</a></li>
        </ul>
        <a href="#waitlist" className="nav-cta">Join the Circle →</a>
      </nav>

      <main id="main-content">
        {/* HERO */}
        <header id="hero" className="hero">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Early Access Open — free trial for first 500 Operators
        </div>
       <h1>
          Stop<br />
          <span className="strike">Planning.</span><br />
          Start <span className="accent">Shipping.</span>
        </h1>
        
        <div className="authority-badge fade-in">
          <span className="authority-badge-icon">✓</span>
          VERIFIED: 2026 LIVE MARKET INTEL
        </div>

        <p className="hero-body">
          AI scouts niches, builds roadmaps, and executes your SaaS blueprint. Launch in 30 days.
        </p>

        <div className="hero-actions">
          <a href="#waitlist" className="btn-primary">
            Start Execution
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="/2026_Niche_Discovery.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <Download className="w-4 h-4" />
            Download Blueprint
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
            <div className="hero-stat-num">100+</div>
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
            { id: '01', icon: '🎯', name: 'Scout', desc: 'Analyzes live market signals to surface high-ROI micro-SaaS niches.', tag: 'MARKET INTEL', bg: 'rgba(29,255,122,0.08)', color: 'var(--green)' },
            { id: '02', icon: '♟️', name: 'Strategist', desc: 'Develops your execution roadmap and competitive moat. Zero scope creep.', tag: 'STRATEGY', bg: 'rgba(181,154,255,0.08)', color: '#B59AFF' },
            { id: '03', icon: '📡', name: 'Marketer', desc: 'Writes outreach, landing pages, and social content. Ready to send.', tag: 'GROWTH', bg: 'rgba(255,107,157,0.08)', color: '#FF6B9D' },
            { id: '04', icon: '💰', name: 'CFO', desc: 'Builds financial models: runway, pricing, and break-even targets.', tag: 'FINANCE', bg: 'rgba(6,214,255,0.08)', color: '#06D6FF' },
            { id: '05', icon: '🔍', name: 'QA', desc: 'Audits every output. Catches logic gaps before they hit production.', tag: 'VALIDATION', bg: 'rgba(40,200,64,0.08)', color: '#28C840' },
            { id: '06', icon: '🚀', name: 'Launchpad', desc: 'Orchestrates your 30-day daily blueprint. Open the app and execute.', tag: 'LAUNCH OPS', bg: 'rgba(255,154,60,0.08)', color: '#FF9A3C' }
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
            <div className="game-card-sub" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Status: Command [Operator]</span>
              <span style={{ fontSize: '10px', background: 'rgba(29, 255, 122, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>🛡️ Soft Landing Active</span>
            </div>
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
           { num: '01', icon: '⚙️', title: 'Define Your Constraints', desc: 'Input your time, capital, and skills. The engine locks them to prevent scope creep.', connector: true },
            { num: '02', icon: '📡', title: 'Deploy the Scout', desc: 'AI agents scan live market signals to surface the highest-probability opportunity.', connector: true },
            { num: '03', icon: '✅', title: 'Start Real productivity', desc: 'Receive a day-by-day operator guide. Use built-in tools to launch and get paying customers.' }
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

          {status === 'success' && registeredUser ? (
            <div className="success-view animate-in slide-in-from-bottom-4 duration-700">
              <h2 className="section-title" style={{ color: 'var(--green)', textAlign: 'center', marginBottom: '20px' }}>
                POSITION #{registeredUser.position}
              </h2>
              <p className="waitlist-sub">You've successfully secured your spot. The 2026 Operator's Blueprint is now available for you.</p>
              <div className="flex justify-center mt-10">
                <a
                  href="/2026_Niche_Discovery.pdf"
                  download
                  className="btn-primary"
                  style={{ padding: '16px 36px' }}
                >
                  Download 2026 Operator's Blueprint
                </a>
              </div>
            </div>
          ) : (
            <>
              <h2 className="section-title" style={{ marginBottom: '20px', textAlign: 'center' }}>Ready to Become<br />an Operator?</h2>
              <p className="waitlist-sub">50 new operators onboarded every Monday. Join Elite 500 builders Circle.</p>
              <form className="waitlist-form" onSubmit={handleJoinWaitlist}>
                <input
                  className="waitlist-input"
                  type="email"
                  placeholder="enter@your-email.com"
                  required
                  id="waitlist-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ cursor: 'none', border: 'none' }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
            </>
          )}

          <div className="waitlist-note" style={{ marginTop: '24px' }}>🔒 No spam. Only high-signal operator updates.</div>
        </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          <img src={logo} alt="HustleIQ logo" className="nav-logo-img" />
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