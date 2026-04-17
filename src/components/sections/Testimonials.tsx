import { Star } from "lucide-react";

// [REPLACE WITH REAL TESTIMONIAL]
const testimonials = [
  {
    quote: "Before this, we missed half our inbound leads. Now every lead gets called within 60 seconds and booked straight into our calendar. Saved 18+ hours/week and added $11k MRR in 6 weeks.",
    name: "Sarah Lindgren",
    role: "Founder, NorthScale Agency",
  },
  {
    quote: "Our reps used to spend their mornings on follow-up calls. Saad's AI agent now handles all of it — we went from 22% to 47% show-rate. ROI in the first 10 days.",
    name: "Daniel Okafor",
    role: "CEO, Lumen SaaS",
  },
  {
    quote: "We used to lose deals to whoever called first. Now we're whoever calls first — automatically. +32% more booked calls in 14 days, zero extra headcount.",
    name: "Priya Mehta",
    role: "COO, Hatchwise Studio",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold">Founders who stopped losing leads.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-card border border-border/60 p-7 flex flex-col hover:border-primary-glow/40 transition-all"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary-glow text-primary-glow" />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed flex-1">"{t.quote}"</p>
              <div className="mt-6 pt-5 border-t border-border/60">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
