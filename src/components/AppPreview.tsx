const AppPreview = () => {
  return (
    <section className="relative py-24 px-6">
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
          <a
            href="#top"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-lime text-primary-foreground font-semibold rounded-xl transition-all duration-300 btn-glow hover:scale-105"
          >
            Join the waitlist →
          </a>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
