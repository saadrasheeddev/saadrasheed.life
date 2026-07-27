import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(200),
});

// 👇 n8n Webhook URL (Production URL from the Webhook node)
const N8N_WEBHOOK_URL = "https://n8n.saadrasheed.life/webhook/lead-magnet";

// Shared site token sent with every request so n8n can verify the
// request is coming from the website. Validate this in n8n by checking
// either the `x-site-token` header or the `siteToken` body field.
const SITE_TOKEN = "sr_site_8f3b29d1a74e4c5fbf91e6c2ad7b1e93";

const LeadMagnet = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ name, email });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-site-token": SITE_TOKEN,
        },
        // mode: "no-cors" lets the request fire even if your n8n webhook
        // doesn't return CORS headers. Response will be opaque, which is fine
        // for fire-and-forget lead capture.
        mode: "no-cors",
        body: JSON.stringify({
          name: result.data.name,
          email: result.data.email,
          source: "lead-magnet-real-estate-speed-to-lead",
          siteToken: SITE_TOKEN,
          submittedAt: new Date().toISOString(),
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      setSubmitted(true);
      toast.success("Check your inbox, your checklist is on the way!");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead-magnet" className="py-20 md:py-28 fade-in-up">
      <div className="container max-w-4xl">
        <div className="relative rounded-3xl bg-card border border-border overflow-hidden p-8 md:p-12">
          <div className="absolute -top-20 -right-20 w-80 h-80 radial-glow opacity-70" />
          <div className="relative grid md:grid-cols-[1fr_1fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-primary-glow mb-4">
                <Download className="h-3 w-3" />
                Free Lead Magnet
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                How Top Real Estate Agents<br />Respond to Leads in Under 60 Seconds.
              </h2>
              <p className="text-muted-foreground">
                This free guide is the exact speed-to-lead playbook top-producing agents and
                brokerages use to win more property viewings.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-2xl bg-secondary border border-primary-glow/40 p-6 text-center">
                <CheckCircle2 className="h-10 w-10 text-primary-glow mx-auto mb-3" />
                <p className="font-semibold mb-1">You're in.</p>
                <p className="text-sm text-muted-foreground">
                  Check your inbox for the checklist.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  required
                  disabled={loading}
                  className="h-12 bg-secondary border-border"
                />
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={200}
                  required
                  disabled={loading}
                  className="h-12 bg-secondary border-border"
                />
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Me The Checklist"
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  No spam. Unsubscribe in one click.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
