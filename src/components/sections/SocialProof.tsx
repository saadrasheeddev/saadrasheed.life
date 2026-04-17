const tools = [
  { name: "Make.com", url: "https://make.com" },
  { name: "n8n", url: "https://n8n.io" },
  { name: "Zapier", url: "https://zapier.com" },
  { name: "OpenAI", url: "https://openai.com" },
  { name: "Airtable", url: "https://airtable.com" },
  { name: "Notion", url: "https://notion.so" },
];

const SocialProof = () => {
  return (
    <section className="py-14 border-y border-border/60 bg-card/30 fade-in-up">
      <div className="container">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
          Tools I work with
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center h-14 rounded-xl border border-border/60 bg-card/60 hover:border-primary-glow/60 hover:bg-card transition-all"
            >
              <span className="font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                {tool.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
