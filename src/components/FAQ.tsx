import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Is this for beginners?',
    answer: 'Yes. HustleIQ guides you from zero — step by step.',
  },
  {
    question: "Does my age really not matter?",
    answer: 'Age matters far less than execution speed and consistency.',
  },
  {
    question: 'How is this different from courses?',
    answer: 'Courses give information. HustleIQ enforces execution with a plan that adapts as you act.',
  },
  {
    question: "I know nothing about the skills you teach. Is that a problem?",
    answer: 'No. We start at your level and build the skills you need as you go.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes — 7 days. No credit card required.',
  },
  {
    question: 'Do I need money once I joined the program?',
    answer: "Not necessarily. Many paths start with execution, not capital.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="relative py-24 px-6">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="glass-card border-border/50 px-6"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

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

export default FAQ;
