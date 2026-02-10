import { Button } from '@/components/ui/button';

const TwoPaths = () => {
  const handleScrollToTop = () => {
    const topElement = document.getElementById('top');
    if (topElement) topElement.scrollIntoView({ behavior: 'smooth' });
  };

  const forkHeight = 120;
  const neonGreen = "#76E900";

  const CustomPathButton = ({ text, isGreen, onClick }: { text: string; isGreen?: boolean; onClick?: () => void }) => (
    <div className="flex justify-center w-full px-2">
      <div 
        className="relative w-full max-w-[394px] aspect-[394/72] cursor-pointer group transition-transform hover:scale-[1.02] active:scale-[0.98]" 
        onClick={onClick}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 394 72" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id={isGreen ? "greenOuter" : "darkOuter"} x1="197" y1="0" x2="197" y2="72" gradientUnits="userSpaceOnUse">
              <stop stopColor={isGreen ? neonGreen : "#373C34"} />
              <stop offset="1" stopColor={isGreen ? neonGreen : "#373C34"} stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <rect x="0.5" y="0.5" width="393" height="71" rx="36" fill={isGreen ? "#1A2E05" : "#252723"} fillOpacity="0.55" stroke={`url(#${isGreen ? "greenOuter" : "darkOuter"})`} strokeWidth="1" />
        </svg>

        <div className="absolute inset-0 p-[2px]">
           <div className="relative w-full h-full">
            {isGreen && <div className="absolute inset-0 bg-[#76E900] blur-[40px] opacity-40 group-hover:opacity-60 transition-opacity rounded-full" />}
            <svg className="absolute inset-0 w-full h-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-full" viewBox="0 0 380 64" fill="none" preserveAspectRatio="none">
              <rect x="0" y="0" width="100%" height="100%" rx="32" fill={isGreen ? neonGreen : "#252723"} stroke={isGreen ? "#9BFF2E" : "#373C34"} strokeWidth="1" />
            </svg>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {/* ⚡️ FONT FIX: Using font-black and tracking-widest for that "Logo" feel */}
              <span className={`text-sm sm:text-lg font-black uppercase tracking-[0.15em] pt-1 px-4 text-center ${isGreen ? 'text-black' : 'text-white'}`}>
                {text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative py-12 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          {/* ⚡️ FONT FIX: Heading is now uppercase and font-black */}
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[0.9] uppercase">
            "AI WON'T REPLACE YOU. <br /> BUT PEOPLE USING IT WILL."
          </h2>
          <p className="text-xs font-mono text-white/30 uppercase tracking-[0.4em]">Status Check: Still planning? Others are executing.</p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          <div className="hidden md:block absolute inset-x-0 top-0 pointer-events-none" style={{ height: `${forkHeight}px` }}>
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 50 0 V 45 H 25 V 100 M 50 45 H 75 V 100" fill="none" stroke="#262626" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path 
                d="M 75 45 V 100" 
                fill="none" 
                stroke={neonGreen} 
                strokeWidth="2.5" 
                vectorEffect="non-scaling-stroke"
                style={{ filter: 'drop-shadow(0 0 12px rgba(118,233,0,1))' }} 
              />
            </svg>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-0 relative pt-4 md:pt-[120px]">
            {/* --- PATH A: THE CONSUMPTION TRAP --- */}
            <div className="flex flex-col items-center text-center px-4 min-h-[350px] md:min-h-[520px]">
              <div className="z-20 mb-8 rounded-md bg-[#111] border border-white/5 shadow-2xl flex flex-col justify-center items-center shrink-0" style={{ width: '40px', height: '40px' }}>
                <span className="text-[8px] font-mono font-black text-white/20 leading-none tracking-widest">PATH_A</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white/40 mb-8 leading-tight uppercase tracking-tighter">Plan. Learn. <br/> The Trap.</h3>
              <div className="text-white/30 space-y-6 text-sm md:text-base font-medium leading-relaxed max-w-xs mb-12">
                <p>Buying $997 courses that gather digital dust. Waking up in 12 months in the same spot.</p>
                <p className="italic">"You stay busy, but nothing changes."</p>
              </div>
              <div className="mt-auto w-full flex justify-center opacity-40"><CustomPathButton text="Stay Stagnant" /></div>
            </div>

            {/* --- PATH B: THE SOVEREIGN FOUNDER --- */}
            <div className="flex flex-col items-center text-center px-4 min-h-[350px] md:min-h-[520px]">
              <div className="relative z-20 mb-8 shrink-0">
                <div className="absolute inset-0 bg-[#76E900] blur-[40px] opacity-40"></div>
                <div className="relative rounded-md bg-[#76E900] flex flex-col justify-center items-center shadow-[0_0_30px_rgba(118,233,0,1)]" style={{ width: '40px', height: '40px' }}>
                  <span className="text-[8px] font-mono font-black text-black leading-none tracking-widest">PATH_B</span>
                </div>
              </div>
              <h3 className="text-2xl md:text-5xl font-black text-white mb-8 leading-[0.9] uppercase tracking-tighter">The Sovereign <br /><span className="text-primary">Founder.</span></h3>
              
              <div className="text-white/60 space-y-6 text-sm md:text-lg font-medium leading-relaxed max-w-sm mb-12">
                {/* ⚡️ FONT FIX: Technical data using font-mono */}
                <p>Wake up to a clear dashboard of actions. <span className="font-mono text-primary font-bold">3X_FASTER</span> execution than course students.</p>
                <div className="py-2 px-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <p className="text-white font-black uppercase tracking-widest font-mono text-sm">Reduce time to first sale by <span className="text-primary">70%</span></p>
                </div>
                <p>Start Executing with direction, Step by Step.</p>
              </div>
              
              <div className="mt-auto w-full flex justify-center"><CustomPathButton text="Start Building" isGreen onClick={handleScrollToTop} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoPaths;