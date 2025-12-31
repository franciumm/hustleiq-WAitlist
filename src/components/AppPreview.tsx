const AppPreview = () => {
  return (
    <section id="use-cases" className="relative py-24 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="glass-card p-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Execution, <span className="gradient-text">spoon-fed</span>
          </h2>
          <div className="max-w-xl mx-auto mb-8">
            <p className="text-lg text-muted-foreground mb-2">
              HustleIQ tells you exactly what to do — today.
            </p>
            <p className="text-lg text-muted-foreground">
              Progress is visible. Focus is enforced. Momentum compounds.
            </p>
          </div>

          {/* Placeholder for Main UI Page image */}
          <div className="w-full h-64 sm:h-80 rounded-2xl bg-secondary/30 border border-border/50 flex items-center justify-center mb-8">
            <p className="text-muted-foreground text-sm">Main UI Preview Coming Soon</p>
          </div>

          <a
            href="#top"
            className="btn-primary inline-flex"
          >
            Start your journey →
          </a>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
