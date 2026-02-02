import { Brain, MousePointer, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Psychographic Matching',
    description: 'Most people fail because they try to do SMMA when they are introverts, or E-com when they hate logistics. HustleIQ matches your business to your personality type, so execution feels like play, not work.',
    highlight: 'Built for your DNA',
  },
  {
    icon: MousePointer,
    title: 'The "Do-This-Next" Button',
    description: 'One clear action at a time. No overwhelm. No decision fatigue.',
    highlight: 'Zero guesswork',
  },
  {
    icon: MessageCircle,
    title: 'Daily Accountability',
    description: 'Stay consistent with daily execution and automatic course correction.',
    highlight: 'Never feel alone',
  },
];

const BentoGrid = () => {
  return (
    <section id="features" className="relative py-24 px-6">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to build your first{' '}
            <span className="gradient-text">$10K/month</span> business
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No fluff. No 47-step frameworks. Just intelligent execution.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-8 group hover:border-primary/50 transition-all duration-500 hover:-translate-y-1"
              style={{ 
                animationDelay: `${index * 0.15}s`,
                animation: 'fade-in-up 0.8s ease-out forwards',
                opacity: 0 
              }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Highlight tag */}
              <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">
                {feature.highlight}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center space-y-4">
          <a
            href="#top"
            className="btn-primary inline-flex"
          >
            Join the Waitlist →
          </a>
          <p className="text-sm text-muted-foreground">
            Secure your free trial and Founder’s Lifetime Discount before spots run out.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
