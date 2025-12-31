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
      </div>
    </section>
  );
};

export default NetworkSection;
