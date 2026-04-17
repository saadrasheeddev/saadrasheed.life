import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How much does it cost to work with you?",
    a: "Engagements start at $99 for a focused audit, $499 for the Done-For-You Growth package, and $1,499/month for ongoing Scale support. No hidden fees, no surprise retainers.",
  },
  {
    q: "I'm not technical — can you still help me?",
    a: "Absolutely. 80% of my clients are non-technical founders. I handle the build, document everything in plain English, and record Loom walkthroughs so anyone on your team can use the systems.",
  },
  {
    q: "How fast can you deliver?",
    a: "The Growth package ships in 7 days or it's free. Audits are delivered within 72 hours. Scale clients get continuous delivery throughout the month.",
  },
  {
    q: "What time zone do you work in?",
    a: "I'm based in Pakistan (PKT) but work async with clients across 12 countries. I keep overlap windows for US, EU and APAC and respond within 24 hours, always.",
  },
  {
    q: "What if the automations break later?",
    a: "Every Growth build includes a 30-day fix guarantee. Scale clients get continuous monitoring and unlimited fixes. Your systems are built to last — and I stand behind them.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up">
      <div className="container max-w-3xl">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-bold">Questions, answered.</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl border border-border/60 bg-card px-6 data-[state=open]:border-primary-glow/40"
            >
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
