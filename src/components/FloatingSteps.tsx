import { ScanSearch, Target, Map, Wrench } from 'lucide-react';

const steps = [
  {
    icon: ScanSearch,
    title: 'Analyzing your inputs',
    description: 'We understand your goals, constraints, and mindset.',
  },
  {
    icon: Target,
    title: 'Finding your best-fit business',
    description: 'Matched for execution — not hype.',
  },
  {
    icon: Map,
    title: 'Building a custom roadmap',
    description: 'Clear steps. No overwhelm. No guesswork.',
  },
  {
    icon: Wrench,
    title: 'Preparing execution tools',
    description: 'Everything you need to act daily and stay on track.',
  },
];

const FloatingSteps = () => {
  return (
    <section className="relative py-16 px-6 -mt-12 z-20">
      <div className="container max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="glass-card p-6 text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fade-in-up 0.6s ease-out forwards',
                opacity: 0,
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-sm font-semibold text-foreground leading-tight mb-2">
                {step.title}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a href="#top" className="btn-link">
            Start your journey →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FloatingSteps;
