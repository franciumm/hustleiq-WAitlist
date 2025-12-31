import { Check } from 'lucide-react';

const features = [
  'Step-by-step execution paths',
  'Live accountability sessions',
  'Exclusive builder network',
  'Advanced execution analytics',
];

const ComingSoon = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="glass-card p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            What's <span className="gradient-text">coming next</span>
          </h2>
          
          <ul className="space-y-4 max-w-md mx-auto text-left">
            {features.map((feature, index) => (
              <li 
                key={feature}
                className="flex items-center gap-3 text-muted-foreground"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fade-in-up 0.6s ease-out forwards',
                  opacity: 0 
                }}
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

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
      </div>
    </section>
  );
};

export default ComingSoon;
