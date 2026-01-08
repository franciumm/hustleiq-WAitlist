import { Button } from '@/components/ui/button';

const TwoPaths = () => {
  const handleScrollToTop = () => {
    const topElement = document.getElementById('top');
    if (topElement) topElement.scrollIntoView({ behavior: 'smooth' });
  };

  const forkHeight = 120;
  const neonGreen = "#76E900";

  const CustomPathButton = ({ text, isGreen, onClick }: { text: string; isGreen?: boolean; onClick?: () => void }) => (
    <div className="relative flex items-center justify-center w-[394px] h-[72px] cursor-pointer group transition-transform hover:scale-[1.02]" onClick={onClick}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 394 72" fill="none">
        <defs>
          <linearGradient id={isGreen ? "greenOuter" : "darkOuter"} x1="197" y1="0" x2="197" y2="72" gradientUnits="userSpaceOnUse">
            <stop stopColor={isGreen ? neonGreen : "#373C34"} />
            <stop offset="1" stopColor={isGreen ? neonGreen : "#373C34"} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect x="0.5" y="0.5" width="393" height="71" rx="36" fill={isGreen ? "#1A2E05" : "#252723"} fillOpacity="0.55" stroke={`url(#${isGreen ? "greenOuter" : "darkOuter"})`} strokeWidth="1" />
      </svg>
      <div className="relative w-[380px] h-[64px]">
        {isGreen && <div className="absolute inset-0 bg-[#76E900] blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity" />}
        <svg className="absolute inset-0 w-full h-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-full" viewBox="0 0 380 64" fill="none">
          <rect x="0.5" y="0.5" width="379" height="63" rx="32" fill={isGreen ? neonGreen : "#252723"} stroke={isGreen ? "#9BFF2E" : "#373C34"} strokeWidth="1" />
        </svg>
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <span className={`text-xl font-black tracking-tight font-['Nexa'] pt-1 ${isGreen ? 'text-black' : 'text-white'}`}>{text}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">"AI won't replace you. But people using it will."</h2>
          <p className="text-xl md:text-2xl text-gray-400 font-bold">Still planning? Others are executing.</p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          {/* 2. SVG Section */}
          <div className="hidden md:block absolute inset-x-0 top-0 pointer-events-none" style={{ height: `${forkHeight}px` }}>
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Symmetrical Base (Gray) */}
              <path d="M 50 0 V 45 H 25 V 100 M 50 45 H 75 V 100" fill="none" stroke="#262626" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              
              {/* ONLY VERTICAL GREEN LEVEL (X=75) */}
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

          <div className="grid md:grid-cols-2 gap-0 relative" style={{ paddingTop: `${forkHeight}px` }}>
            {/* --- PATH A --- */}
            <div className="flex flex-col items-center text-center px-4 min-h-[520px]">
              <div className="z-20 mb-10 rounded-md bg-[#111] border border-white/5 shadow-[0_0_40px_rgba(0,0,0,1)] flex flex-col justify-center items-center shrink-0" style={{ width: '36px', height: '36px' }}>
                <span className="text-[7px] font-black text-gray-500 leading-none">PATH</span>
                <span className="text-[9px] font-black text-gray-500 leading-none mt-0.5">A</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white mb-8 leading-tight">Plan. Learn. Stay Stuck.</h3>
              <div className="text-gray-400 space-y-4 text-sm md:text-lg font-medium leading-relaxed max-w-sm mb-12">
                <p>Spend your time planning, consuming courses,<br />and collecting Information without ever moving Forward</p>
                <p>You stay busy, but nothing changes.</p>
                <p>Progress feels close, yet never happens.</p>
              </div>
              <div className="mt-auto"><CustomPathButton text="Keep Planing" /></div>
            </div>

            {/* --- PATH B --- */}
            <div className="flex flex-col items-center text-center px-4 min-h-[520px]">
              <div className="relative z-20 mb-10 shrink-0">
                <div className="absolute inset-0 bg-[#76E900] blur-[80px] opacity-60"></div>
                <div className="relative rounded-md bg-[#76E900] flex flex-col justify-center items-center shadow-[0_0_30px_rgba(118,233,0,1)]" style={{ width: '36px', height: '36px' }}>
                  <span className="text-[7px] font-black text-black leading-none">PATH</span>
                  <span className="text-[9px] font-black text-black leading-none mt-0.5">B</span>
                </div>
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white mb-8 leading-tight">Execute. Improve. Progress.</h3>
              <div className="text-gray-400 space-y-4 text-sm md:text-lg font-medium leading-relaxed max-w-sm mb-12">
                <p>Get clear actions, continous feedback<br />and visible Progress.</p>
                <p className="text-white font-black">Stop guessing</p>
                <p>Start Executing with direction, Step by Step</p>
              </div>
              <div className="mt-auto"><CustomPathButton text="Start Building" isGreen onClick={handleScrollToTop} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoPaths;