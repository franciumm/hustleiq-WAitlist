const FoundersNote = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="glass-card p-8 md:p-12 border-primary/10">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="shrink-0 text-center md:text-left">
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/20 rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
                  alt="Founder" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <p className="font-black text-white text-lg mt-4">Alex Rivera</p>
              <p className="text-primary text-xs font-bold tracking-widest uppercase">Founder, HustleIQ</p>
            </div>

            <div className="flex-1 space-y-6">
              <h3 className="text-2xl md:text-3xl font-black text-white">
                I built this because I spent 3 years in the <span className="text-primary">"learning trap."</span>
              </h3>
              <div className="space-y-4 text-gray-400 font-medium md:text-lg">
                <p>I bought the $997 courses. I read the 500-page frameworks. I felt "busy" but my bank account didn't change. I realized that <span className="text-white">information isn't the problem—direction is.</span></p>
                <p>HustleIQ is the tool I wish I had. It strips away the noise and gives you exactly ONE action at a time. No spectators, no fluff, just raw execution.</p>
                <p className="italic text-white/80">"Your next 12 months shouldn't look like your last 12."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FoundersNote;