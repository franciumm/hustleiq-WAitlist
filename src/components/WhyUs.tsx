import executionProgressImage from '@/assets/execution-progress.png';

const WhyUs = () => {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ animation: 'fade-in-up 0.8s ease-out forwards' }}
          >
            Ambition is cheap.{' '}
            <span className="gradient-text">Execution is everything.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Most people know what to do. Few actually do it.<br />
            HustleIQ bridges the gap between intention and consistent execution.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Phone with graph */}
          <div className="relative flex justify-center">
            {/* Subtle glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-primary/20 rounded-full blur-[80px]" />
            </div>
            
            {/* Tilted phone mockup */}
            <div 
              className="phone-mockup relative z-10 float"
              style={{ transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)' }}
            >
              <div className="phone-screen">
                <img 
                  src={executionProgressImage} 
                  alt="HustleIQ Execution Progress Graph showing adaptive calibration" 
                  className="w-[280px] sm:w-[300px] h-auto"
                />
              </div>
              
              {/* Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" />
            </div>
          </div>

          {/* Right - Caption and explanation */}
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Dynamic Calibration
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                If you lose focus, HustleIQ adapts your plan instantly to get you back on track.
              </p>
              
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">HustleIQ Path</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                    <span className="text-sm text-muted-foreground">Adjusted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional insight */}
            <div className="glass-card p-6">
              <p className="text-muted-foreground italic">
                "HustleIQ turns <span className="text-foreground font-medium">ambition</span> into consistent <span className="gradient-text font-semibold not-italic">execution</span>."
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a href="#top" className="btn-primary inline-flex">
            Join the Waitlist →
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
