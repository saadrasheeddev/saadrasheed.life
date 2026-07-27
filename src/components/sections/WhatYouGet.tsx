import { PhoneCall, Inbox, CalendarCheck } from "lucide-react";

const items = [
  {
    icon: PhoneCall,
    title: "AI Calling Agent for Listings",
    desc: "Calls every new buyer, seller, or renter inquiry within 60 seconds, and answers common property questions in a natural human voice.",
  },
  {
    icon: Inbox,
    title: "Lead Qualification on Autopilot",
    desc: "Your AI asks budget, timeline, financing and location preference, ensuring your agents only spend time with serious, ready-to-tour prospects.",
  },
  {
    icon: CalendarCheck,
    title: "Automatic Viewing Bookings",
    desc: "Qualified leads are booked straight into your agent's calendar and synced to your CRM, including HubSpot, Follow Up Boss, kvCORE, or Sheets.",
  },
];

const WhatYouGet = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-glow mb-3">
            The Solution
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Three systems. One outcome: <span className="gradient-text">more booked viewings.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Built specifically for real estate agents and brokerages without relying on generic SaaS playbooks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl bg-card border border-border/60 p-8 hover:border-primary-glow/50 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_hsl(270_80%_50%/0.35)] transition-all"
            >
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-5">
                <it.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{it.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
