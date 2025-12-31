import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is HustleIQ?',
    answer: 'HustleIQ is an AI-guided execution platform that helps you find your ideal business model based on your personality, skills, and lifestyle — then holds you accountable until you hit your first income milestones.',
  },
  {
    question: 'Who is HustleIQ for?',
    answer: 'HustleIQ is for aspiring entrepreneurs who are tired of planning and want to start executing. Whether you\'re completely new or have tried and failed before, HustleIQ meets you where you are.',
  },
  {
    question: 'How does the AI matching work?',
    answer: 'We analyze your personality, available time, risk tolerance, skills, and lifestyle to recommend business models that align with who you are — not just what\'s trending.',
  },
  {
    question: 'What kind of businesses does HustleIQ support?',
    answer: 'We support a wide range of online business models including SMMA, e-commerce, dropshipping, AI automation, copywriting, and more. The AI matches you with the best fit.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes. When we launch, you\'ll get 7 days free — no credit card required.',
  },
  {
    question: 'How is HustleIQ different from courses?',
    answer: 'Courses give you information. HustleIQ gives you execution. We tell you exactly what to do, when to do it, and adapt your plan based on your progress.',
  },
];

const FAQ = () => {
  return (
    <section className="relative py-24 px-6">
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
      </div>
    </section>
  );
};

export default FAQ;
