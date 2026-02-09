import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast'; 
import { Copy, Check, TrendingUp, Users, ArrowRight } from 'lucide-react';
import posthog from 'posthog-js';

const Hero = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Viral Loop State (Mock Data)
  const [waitlistRank, setWaitlistRank] = useState(2402);
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);

  const [botField, setBotField] = useState(''); 
  const [mountTime, setMountTime] = useState(0); 

  useEffect(() => {
    setMountTime(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Bot protection
    if (botField !== '' || Date.now() - mountTime < 1500) return;
    if (!email) return;
    
    setIsSubmitting(true);
    
    // ⚠️ REPLACE THIS WITH YOUR REAL FORM ID
    const FORM_URL = "https://app.loops.so/api/newsletter-form/YOUR_FORM_ID_HERE";

    try {
      const response = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}&userGroup=Waitlist`,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      // Tracking
      posthog.identify(email);
      posthog.capture('waitlist_signup', { location: 'hero_section', email: email });

      // Generate Mock Referral Link
      const mockRef = `hustleiq.ai?ref=${btoa(email).substring(0, 8)}`;
      setReferralLink(mockRef);

      setSubmitted(true);
      toast({ title: "Access Claimed.", description: "Welcome to the Founder's Circle." });

    } catch (error) {
      toast({ title: "Connection Error", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied", description: "Share this link to skip the line." });
  };

  return (
    <section id="how-it-works" className="relative min-h-[90vh] w-full flex items-center justify-center px-4 sm:px-6 pt-32 pb-12">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT COLUMN: Copy & Form --- */}
          <div className="flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left order-2 lg:order-1">
            
            {/* Status Pill */}
            {!submitted && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#214B2F] bg-[#214B2F]/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#63E602] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#63E602]"></span>
                </span>
                <span className="text-xs font-mono text-[#63E602] uppercase tracking-wider">Early Access Closing Soon</span>
              </div>
            )}

            {!submitted ? (
              <>
                {/* HEADLINE: StoryBrand "Villain/Hero" */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                  Stop Funding <br/>
                  <span className="text-[#63E602] text-glow">Fake Gurus.</span>
                </h1>
                
                {/* SUBHEAD: The Guide/Plan */}
                <p className="text-lg sm:text-xl text-gray-400 max-w-lg leading-relaxed">
                  Most "hustle" courses sell you dreams. Our AI Consultant gives you the <span className="text-white font-semibold">exact execution steps</span> to build and earn. 
                  <br/><br/>
                  Stop dreaming. Start shipping.
                </p>

                {/* FORM: The Call to Action */}
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
                  <input type="text" name="b_check_field" tabIndex={-1} value={botField} onChange={(e) => setBotField(e.target.value)} className="sr-only" aria-hidden="true" />
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="enter your email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-5 py-4 bg-[#050505] border border-[#214B2F] rounded-lg text-white placeholder:text-gray-600 focus:border-[#63E602] focus:ring-1 focus:ring-[#63E602] focus:outline-none transition-all font-mono text-sm"
                      required
                    />
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="btn-primary px-6 py-4 rounded-lg font-bold text-sm uppercase tracking-wide whitespace-nowrap"
                    >
                      {isSubmitting ? "Processing..." : "Claim Access"}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 font-mono">
                    *Limited to first 500 founders. 412 spots taken.
                  </p>
                </form>
              </>
            ) : (
              /* --- SUCCESS STATE: The Viral Loop --- */
              <div className="w-full max-w-lg glass-card p-8 animate-scale-in border-[#63E602]/30 bg-[#0A0A0A]">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-[#63E602]/10 rounded-full flex items-center justify-center mx-auto border border-[#63E602]/20">
                    <Check className="w-8 h-8 text-[#63E602]" />
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">You're on the list.</h2>
                    <p className="text-gray-400">Current Position: <span className="text-white font-mono font-bold">#{waitlistRank.toLocaleString()}</span></p>
                  </div>

                  <div className="bg-[#214B2F]/20 p-4 rounded-lg border border-[#214B2F] text-left">
                    <p className="text-sm text-[#63E602] font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Skip the line
                    </p>
                    <p className="text-sm text-gray-300 mb-4">
                      Refer 1 friend to jump 500 spots and unlock the "Zero-to-One" Roadmap PDF.
                    </p>
                    
                    <div className="flex gap-2">
                      <div className="flex-1 bg-black/50 border border-[#214B2F] rounded px-3 py-2 text-gray-400 font-mono text-xs truncate">
                        {referralLink}
                      </div>
                      <button 
                        onClick={copyToClipboard}
                        className="bg-[#214B2F] hover:bg-[#214B2F]/80 text-white px-3 rounded transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Social Proof (Borrowed Authority) */}
            <div className="pt-4 border-t border-white/5 w-full">
              <p className="text-xs text-gray-500 font-mono mb-3 uppercase tracking-widest">Built for builders by engineers from</p>
              <div className="flex items-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* You can replace these with actual logos later */}
                <div className="h-6 w-20 bg-white/10 rounded flex items-center justify-center text-[10px] text-white/40">Uber</div>
                <div className="h-6 w-20 bg-white/10 rounded flex items-center justify-center text-[10px] text-white/40">Google</div>
                <div className="h-6 w-20 bg-white/10 rounded flex items-center justify-center text-[10px] text-white/40">Stripe</div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Visuals --- */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            
            {/* Abstract Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#63E602]/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* The "Product" Visual - Tilted Card Effect */}
            <div className="relative z-10 w-full max-w-md transform lg:rotate-y-[-12deg] lg:rotate-x-[5deg] transition-transform duration-500 hover:rotate-0">
              
              {/* Card Container */}
              <div className="relative rounded-2xl bg-[#0a0a0a] border border-[#214B2F] p-2 shadow-2xl shadow-black/80">
                
                {/* Header Bar */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-[#111] rounded-t-xl border-b border-[#222] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>

                {/* Main Content Area */}
                <div className="mt-8 aspect-[4/5] bg-black rounded-xl overflow-hidden relative group">
                  {/* Grid Lines */}
                  <div className="absolute inset-0" 
                    style={{ backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }} 
                  />
                  
                  {/* Floating Elements (Mock UI) */}
                  <div className="absolute top-10 left-6 right-6">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <div className="text-[#63E602] font-mono text-xs mb-1">REVENUE_MRR</div>
                        <div className="text-3xl font-bold text-white">$0.00</div>
                      </div>
                      <div className="text-xs font-mono text-gray-500">DAY 1</div>
                    </div>

                    {/* The Graph Image you already have */}
                    <img 
                      src="/business-model.png" 
                      alt="Execution Roadmap" 
                      className="w-full h-auto rounded border border-[#333] opacity-80 group-hover:opacity-100 transition-opacity" 
                    />

                    {/* AI Prompt Box Mockup */}
                    <div className="mt-6 p-4 rounded bg-[#111] border border-[#222]">
                      <div className="flex gap-3 mb-2">
                        <div className="w-6 h-6 rounded bg-[#63E602] flex items-center justify-center">
                          <Users className="w-3 h-3 text-black" />
                        </div>
                        <span className="text-xs font-bold text-gray-300 pt-1">HustleIQ Consultant</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed font-mono">
                        analyzing_skills...<br/>
                         detected: creative_strength<br/>
                         path_recommendation: Content_Agency<br/>
                        <span className="text-[#63E602] animate-pulse"> waiting_for_execution...</span>
                      </p>
                    </div>
                  </div>
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