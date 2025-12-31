const NetworkSection = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Execution thrives in the{' '}
          <span className="gradient-text">right network</span>
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-lg text-muted-foreground mb-2">
            No noise. No spectators.
          </p>
          <p className="text-lg text-muted-foreground">
            Connect with builders focused on action, not talking.
          </p>
        </div>

        {/* Secondary CTA */}
        <div className="mt-8">
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Start your journey →
          </a>
        </div>
      </div>
    </section>
  );
};

export default NetworkSection;
