import saadHeadshot from "@/assets/saad-headshot.png";

const About = () => {
  return (
    <section className="py-20 md:py-28 fade-in-up">
      <div className="container">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-glow">About</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              I build the systems<br />real estate teams use to win speed-to-lead.
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I'm Saad — a specialist in AI calling agents for real estate.
                I work with agents, brokers and agencies who are tired of losing
                listing inquiries to whoever picks up the phone first.
              </p>
              <p>
                Every system I build is tied to one thing: more booked property
                viewings, less manual follow-up, and revenue that no longer
                depends on an agent being awake at the right minute.
              </p>
              <p className="text-foreground font-medium pt-2">
                I don't build AI demos — I build systems that put more deals on your board.
              </p>
            </div>
          </div>

          <div className="relative mx-auto lg:mx-0 w-full max-w-sm">
            <div className="absolute -inset-4 gradient-primary opacity-25 blur-3xl rounded-full" />
            <div className="relative rounded-3xl overflow-hidden border border-border bg-card">
              <img
                src={saadHeadshot.src || saadHeadshot}
                alt="Saad Rasheed"
                loading="lazy"
                width={1024}
                height={1024}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
