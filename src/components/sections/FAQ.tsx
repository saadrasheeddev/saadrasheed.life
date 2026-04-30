import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Will the AI sound robotic to my buyers and sellers?",
    a: "No. The voice agents I deploy use the latest natural-voice models (Vapi, Retell, Bland) and are trained specifically on real estate scripts. Most prospects don't realize they're speaking with AI — and the ones who do are simply impressed you respond instantly.",
  },
  {
    q: "Can it actually answer property questions?",
    a: "Yes. The AI is trained on your listings, neighborhoods, pricing, financing options and showing availability. It handles the common 80% — square footage, bedrooms, school district, viewing times — and books a human follow-up for anything complex.",
  },
  {
    q: "Will it integrate with my CRM?",
    a: "Yes. I integrate with the CRMs real estate teams actually use — Follow Up Boss, kvCORE, BoomTown, LionDesk, HubSpot, Pipedrive, GoHighLevel, Salesforce, or even Google Sheets. Every qualified lead and viewing flows in automatically.",
  },
  {
    q: "What lead sources does it work with?",
    a: "Anywhere a lead can come from: Zillow, Realtor.com, Rightmove, Bayut, Property Finder, your website forms, Facebook & Instagram ads, Google Local Service Ads, and portal email parsers. If it can hit a webhook, the AI can call it.",
  },
  {
    q: "How fast can this be set up?",
    a: "The AI Appointment Booking System ships in 7 days. Audits are delivered within 72 hours. Agency rollouts with multiple agents typically launch in 2–3 weeks.",
  },
  {
    q: "What if I'm a solo agent — is this overkill?",
    a: "Solo agents see the biggest impact, because you can't physically answer every lead in 60 seconds. The AI is essentially your 24/7 ISA at a fraction of the cost of hiring one.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up">
      <div className="container max-w-3xl">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">Objections, handled</p>
          <h2 className="text-3xl md:text-5xl font-bold">What agents always ask.</h2>
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
