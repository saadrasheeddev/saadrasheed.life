import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Will this work in my country / time zone?",
    a: "Yes. The AI calling agent runs 24/7 and supports US, UK, EU, MENA, APAC and more. Calls happen in your prospect's time zone — not mine. I'm based in Pakistan but ship globally.",
  },
  {
    q: "What if I don't have many leads yet?",
    a: "That's actually the best time to set this up. The system pays off the moment lead #1 arrives — and scales with you, so you never have to rebuild as volume grows.",
  },
  {
    q: "Do I need technical knowledge?",
    a: "No. 80% of my clients are non-technical founders. I handle the build, document everything in plain English, and record Loom walkthroughs so anyone on your team can run it.",
  },
  {
    q: "How fast can this be set up?",
    a: "The Appointment Booking System ships in 7 days. Audits are delivered within 72 hours. Scale clients get continuous delivery every month.",
  },
  {
    q: "What tools do you use?",
    a: "AI voice agents (Vapi, Retell, Bland), Make.com, n8n, Zapier, OpenAI/GPT-4, plus your CRM of choice — HubSpot, Pipedrive, GoHighLevel, Airtable or Google Sheets.",
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
