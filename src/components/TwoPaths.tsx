const TwoPaths = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Path A */}
          <div className="glass-card p-8 border-red-500/30 hover:border-red-500/50 transition-colors">
            <div className="text-center">
              <span className="inline-block px-3 py-1 text-xs font-medium text-red-400 bg-red-500/10 rounded-full mb-4">
                Path A
              </span>
              <p className="text-lg text-muted-foreground">
                Planning · Courses · Stuck
              </p>
            </div>
          </div>

          {/* Path B */}
          <div className="glass-card p-8 border-primary/30 hover:border-primary/50 transition-colors">
            <div className="text-center">
              <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">
                Path B
              </span>
              <p className="text-lg text-foreground font-medium">
                Execution · Feedback · Progress
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-8">
            Invest in your future. <span className="text-foreground font-medium">Now it's your choice.</span>
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-lime text-primary-foreground font-semibold rounded-xl transition-all duration-300 btn-glow hover:scale-105"
          >
            Join the Waitlist →
          </a>
        </div>
      </div>
    </section>
  );
};

export default TwoPaths;
