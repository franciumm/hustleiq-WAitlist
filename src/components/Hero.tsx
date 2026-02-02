import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast'; 
import hustleiqLogo from '@/assets/hustleiq-logo.png';
import posthog from 'posthog-js';
import { Check } from 'lucide-react'; // Added for the Quiz results

const Hero = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quizStep, setQuizStep] = useState(0); // 0: Form, 1: Strength, 2: Time, 3: Result
  const [founderProfile, setFounderProfile] = useState({ strength: '', time: '' });
  const [botField, setBotField] = useState(''); 
  const [mountTime, setMountTime] = useState(0); 

  useEffect(() => {
    setMountTime(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botField !== '' || Date.now() - mountTime < 1500) return;
    if (!email) return;
    
    setIsSubmitting(true);
    const FORM_URL = "https://app.loops.so/api/newsletter-form/YOUR_FORM_ID_HERE";

    try {
      const response = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}&userGroup=Waitlist`,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      posthog.identify(email);
      posthog.capture('waitlist_signup', { location: 'hero_section', email: email });

      setSubmitted(true);
      setQuizStep(1); // ⚡️ Trigger the Value-Add Loop immediately
      setEmail('');
      toast({ title: "You're on the list! 🚀", description: "Now, let's find your business DNA." });

    } catch (error) {
      toast({ title: "Connection Error", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const avatars = [
    { bg: 'bg-blue-500', initials: 'JD' },
    { bg: 'bg-green-500', initials: 'AM' },
    { bg: 'bg-purple-500', initials: 'SK' },
    { bg: 'bg-orange-500', initials: 'LP' },
    { bg: 'bg-pink-500', initials: 'RW' },
  ];

  return (
    <section id="how-it-works" className="relative min-h-screen w-full overflow-x-hidden flex items-center justify-center px-4 sm:px-6 py-12 pt-24 lg:py-0">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left order-1 w-full">
            {/* Fluid Badge */}
            <div className="w-full max-w-[320px] sm:max-w-[380px] aspect-[394/72] relative flex justify-center lg:justify-start animate-fade-in-up">
               <div className="relative w-full h-full">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 394 72" fill="none" preserveAspectRatio="none">
                    <rect x="0.5" y="0.5" width="393" height="71" rx="36" fill="#252723" fillOpacity="0.55" stroke="#373C34" strokeWidth="1"/>
                  </svg>
                  <div className="relative z-10 w-full h-full flex items-center justify-center gap-3">
                    <img src={hustleiqLogo} alt="Logo" className="w-7 h-5 sm:w-9 sm:h-7 object-contain" />
                    <span className="text-base sm:text-lg font-bold text-white tracking-wide">Early Access Soon</span>
                  </div>
               </div>
            </div>

            {/* ⚡️ SALES HEADLINE: Result-oriented */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight animate-fade-in-up">
              Launch your first $10k/mo. <br className="hidden sm:block" />
              <span className="gradient-text">Zero Guesswork.</span>
            </h1>

            {/* ⚡️ VALUE-ADD LOOP LOGIC */}
            {!submitted ? (
              <>
                <div className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in-up">
                  <p>Launch your first $10k/mo business. Even if you have zero ideas.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto lg:mx-0">
                  <input type="text" name="b_check_field" tabIndex={-1} value={botField} onChange={(e) => setBotField(e.target.value)} className="sr-only" aria-hidden="true" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3.5 bg-secondary/40 border border-white/10 rounded-2xl text-foreground focus:ring-1 focus:ring-primary focus:outline-none transition-all w-full"
                    required
                  />
                  <button type="submit" disabled={isSubmitting} className="btn-primary py-3.5 px-8 rounded-2xl font-bold transition-transform active:scale-95">
                    {isSubmitting ? "Joining..." : "Join Waitlist →"}
                  </button>
                </form>
              </>
            ) : (
              /* ⚡️ THE QUIZ (Value-Add Loop) */
              <div className="glass-card p-6 w-full max-w-lg border-primary/50 bg-primary/5 animate-scale-in">
                {quizStep === 1 && (
                  <div className="space-y-4">
                    <p className="text-primary font-bold text-xs uppercase tracking-widest">Step 1 of 2: Your Strength</p>
                    <h3 className="text-xl font-bold text-white">How do you prefer to solve problems?</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => {setFounderProfile({...founderProfile, strength: 'logic'}); setQuizStep(2)}} className="p-4 rounded-xl border border-white/10 hover:border-primary bg-black/40 text-sm font-bold transition-all">Data & Logic</button>
                      <button onClick={() => {setFounderProfile({...founderProfile, strength: 'creative'}); setQuizStep(2)}} className="p-4 rounded-xl border border-white/10 hover:border-primary bg-black/40 text-sm font-bold transition-all">Design & Words</button>
                    </div>
                  </div>
                )}
                {quizStep === 2 && (
                  <div className="space-y-4">
                    <p className="text-primary font-bold text-xs uppercase tracking-widest">Step 2 of 2: Availability</p>
                    <h3 className="text-xl font-bold text-white">How many hours can you act daily?</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setQuizStep(3)} className="p-4 rounded-xl border border-white/10 hover:border-primary bg-black/40 text-sm font-bold transition-all">1-2 Hours</button>
                      <button onClick={() => setQuizStep(3)} className="p-4 rounded-xl border border-white/10 hover:border-primary bg-black/40 text-sm font-bold transition-all">4+ Hours</button>
                    </div>
                  </div>
                )}
                {quizStep === 3 && (
                  <div className="text-center space-y-3">
                    <Check className="w-10 h-10 text-primary mx-auto" />
                    <h3 className="text-xl font-bold text-white">DNA Profile Locked.</h3>
                    <p className="text-sm text-muted-foreground">We're generating your top 3 business matches. Check your email in 5 minutes for your custom Roadmap.</p>
                  </div>
                )}
              </div>
            )}

            <p className="text-xs text-muted-foreground/90">
              The first 500 members get the <span className="text-white font-bold">'Founder’s Lifetime Discount'</span> and direct access to the private network.
            </p>

            <aside className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {avatars.map((avatar, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${avatar.bg} border-2 border-background flex items-center justify-center text-[10px] font-bold text-white`}>
                    {avatar.initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Join <span className="text-foreground font-medium">2,400+</span> founders</p>
            </aside>
          </div>

          {/* Mockup Section */}
          <div className="relative flex justify-center order-2 w-full animate-scale-in">
            <div className="relative z-10 w-[240px] sm:w-[260px] lg:w-[280px] animate-float">
              <div className="relative p-[6px] bg-[#0c0c0c] rounded-[2.8rem] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_50px_-12px_rgba(0,0,0,0.9)]">
                <div className="relative aspect-[603/1311] rounded-[2.4rem] overflow-hidden bg-black">
                  <img src="/business-model.png" width="302" height="656" alt="Dashboard" className="w-full h-full object-cover" loading="eager" />
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[32%] h-4 bg-black rounded-full z-20 border border-white/5" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;