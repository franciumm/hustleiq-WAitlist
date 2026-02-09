import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Is this for beginners or pros?',
    answer: 'HustleIQ is an execution engine. Whether you are at zero or scaling to $10k, it identifies your specific bottlenecks and gives you the next logical task.',
  },
  {
    question: 'How is this different from a $997 course?',
    answer: 'Courses give you information (noise). HustleIQ gives you direction (signal). It is a software-led roadmap that adapts based on your actual daily output.',
  },
  {
    question: 'Is this just another ChatGPT wrapper?',
    answer: 'No, While we use AI for logic, the core engine is built on psychographic matching and real-time accountability frameworks designed by multi-exit founders.',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="relative py-24 px-6 bg-black/20">
      <div className="container max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            System <span className="text-primary">Briefing</span>
          </h2>
        </div>
        
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-white/10 rounded-2xl px-6 bg-secondary/10">
              <AccordionTrigger className="text-sm font-mono font-bold text-white/80 hover:text-primary hover:no-underline py-5 text-left uppercase tracking-wider">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/50 font-medium leading-relaxed pb-5">
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