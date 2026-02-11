// Design: Harajuku Confectionery — kawaii FAQ accordion with flower emoji
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { faqs } from "@/lib/data";

interface FAQAccordionProps {
  items: typeof faqs;
  className?: string;
}

export default function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className={className}>
      {items.map((faq, index) => (
        <AccordionItem key={index} value={`faq-${index}`} className="border-b border-kawaii-pink/15">
          <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-primary hover:text-kawaii-hot py-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            <span className="flex items-center gap-2">
              <span className="text-kawaii-pink" aria-hidden="true">✿</span>
              {faq.question}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-foreground/70 leading-relaxed pb-4 pl-6">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
