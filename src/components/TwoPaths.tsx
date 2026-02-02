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
      {/* 
         ⚡️ FLUID FIX:
         - Removed fixed 'w-[394px]'
         - Added 'w-full max-w-[394px]' -> This makes it shrink physically on phones
         - Added 'aspect-[394/72]' -> Keeps the button shape perfect as it shrinks
      */}
      <div 
        className="relative w-full max-w-[394px] aspect-[394/72] cursor-pointer group transition-transform hover:scale-[1.02] active:scale-[0.98]" 
        onClick={onClick}
      >
        {/* SVG fills the container fluidly */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 394 72" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id={isGreen ? "greenOuter" : "darkOuter"} x1="197" y1="0" x2="197" y2="72" gradientUnits="userSpaceOnUse">
              <stop stopColor={isGreen ? neonGreen : "#373C34"} />
              <stop offset="1" stopColor={isGreen ? neonGreen : "#373C34"} stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <rect x="0.5" y="0.5" width="393" height="71" rx="36" fill={isGreen ? "#1A2E05" : "#252723"} fillOpacity="0.55" stroke={`url(#${isGreen ? "greenOuter" : "darkOuter"})`} strokeWidth="1" />
        </svg>

        {/* Inner Content Layer */}
        <div className="absolute inset-0 p-[2px]"> {/* Padding simulates the gap between rings */}
           <div className="relative w-full h-full">
            {isGreen && <div className="absolute inset-0 bg-[#76E900] blur-[40px] opacity-40 group-hover:opacity-60 transition-opacity rounded-full" />}
            
            <svg className="absolute inset-0 w-full h-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-full" viewBox="0 0 380 64" fill="none" preserveAspectRatio="none">
               {/* 
                  Adjusted viewbox logic: 
                  We render the inner rect relative to the container 
               */}
              <rect x="0" y="0" width="100%" height="100%" rx="32" fill={isGreen ? neonGreen : "#252723"} stroke={isGreen ? "#9BFF2E" : "#373C34"} strokeWidth="1" />
            </svg>
            
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {/* ⚡️ TEXT SIZE: Responsive text (text-base on mobile, text-xl on desktop) */}
              <span className={`text-base sm:text-xl font-black tracking-tight font-['Nexa'] pt-1 px-4 text-center ${isGreen ? 'text-black' : 'text-white'}`}>
                {text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative py-12 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            "AI won't replace you. <br className="block sm:hidden" /> But people using it will."
          </h2>
          <p className="text-lg md:text-2xl text-gray-400 font-bold">Still planning? Others are executing.</p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          {/* SVG Section (Desktop Only) */}
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
            {/* --- PATH A --- */}
            <div className="flex flex-col items-center text-center px-1 min-h-[350px] md:min-h-[520px]">
              <div className="z-20 mb-6 md:mb-10 rounded-md bg-[#111] border border-white/5 shadow-[0_0_40px_rgba(0,0,0,1)] flex flex-col justify-center items-center shrink-0" style={{ width: '36px', height: '36px' }}>
                <span className="text-[7px] font-black text-gray-400 leading-none">PATH</span>
                <span className="text-[9px] font-black text-gray-400 leading-none mt-0.5">A</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white mb-6 md:mb-8 leading-tight">Plan. Learn. <br/> The Consumption Trap.</h3>
              <div className="text-gray-400 space-y-4 text-sm md:text-lg font-medium leading-relaxed max-w-sm mb-8 md:mb-12">
                <p>Buying $997 courses that gather digital dust,<br />Waking up in 12 months in the exact same spot.</p>
                <p>You stay busy, but nothing changes.</p>
                <p>Progress feels close, yet never happens.</p>
              </div>
              <div className="mt-auto w-full flex justify-center"><CustomPathButton text="Keep Planning" /></div>
            </div>

            {/* --- PATH B --- */}
            <div className="flex flex-col items-center text-center px-1 min-h-[350px] md:min-h-[520px]">
              <div className="relative z-20 mb-6 md:mb-10 shrink-0">
                <div className="absolute inset-0 bg-[#76E900] blur-[80px] opacity-60"></div>
                <div className="relative rounded-md bg-[#76E900] flex flex-col justify-center items-center shadow-[0_0_30px_rgba(118,233,0,1)]" style={{ width: '36px', height: '36px' }}>
                  <span className="text-[7px] font-black text-black leading-none">PATH</span>
                  <span className="text-[9px] font-black text-black leading-none mt-0.5">B</span>
                </div>
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white mb-6 md:mb-8 leading-tight">The Sovereign Founder.</h3>
              <div className="text-gray-400 space-y-4 text-sm md:text-lg font-medium leading-relaxed max-w-sm mb-8 md:mb-12">
                <p>Waking up to a clear dashboard of actions <br/> Visible revenue growth every 72 hours.</p>
                <p className="text-white font-black">Stop guessing</p>
                <p>Start Executing with direction, Step by Step</p>
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