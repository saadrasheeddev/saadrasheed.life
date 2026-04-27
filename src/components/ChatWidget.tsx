import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";

type Msg = { from: "bot" | "user"; text: string };

// Shared site token — same one used in the lead magnet form.
// In n8n verify either `x-site-token` header or `siteToken` body field.
const SITE_TOKEN = "sr_site_8f3b29d1a74e4c5fbf91e6c2ad7b1e93";

const LEAD_WEBHOOK_URL = "https://n8n.saadrasheed.life/webhook/lead-magnet";
const CHAT_WEBHOOK_URL = "https://n8n.saadrasheed.life/webhook/chat-widget";

const STORAGE_KEY = "sr_chat_user_v1";
const GREETING_KEY = "sr_chat_greeting_shown";
const REPLY_TIMEOUT_MS = 60_000;

const gateSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(200),
});

const initialMsgs: Msg[] = [
  {
    from: "bot",
    text: "Hey! I'm Saad's AI assistant 👋 Ask me anything about AI calling agents, pricing, or how the system works.",
  },
];

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(initialMsgs);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [gateName, setGateName] = useState("");
  const [gateEmail, setGateEmail] = useState("");
  const [gateLoading, setGateLoading] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingDismissed, setGreetingDismissed] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Restore returning users and check if greeting should show
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
      
      const greetingShown = localStorage.getItem(GREETING_KEY);
      if (!greetingShown && !raw) {
        // Delay greeting slightly for better UX
        const timer = setTimeout(() => setShowGreeting(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  // Auto-hide greeting after 8 seconds if not clicked
  useEffect(() => {
    if (showGreeting && !open) {
      const timer = setTimeout(() => {
        setShowGreeting(false);
        setGreetingDismissed(true);
        try {
          localStorage.setItem(GREETING_KEY, "true");
        } catch {
          // ignore
        }
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showGreeting, open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, open, waiting]);

  const handleGate = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = gateSchema.safeParse({ name: gateName, email: gateEmail });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setGateLoading(true);
    // Mark greeting as shown when user engages
    setShowGreeting(false);
    setGreetingDismissed(true);
    try {
      localStorage.setItem(GREETING_KEY, "true");
    } catch {
      // ignore
    }
    try {
      // Send the contact details to the same lead webhook (fire-and-forget).
      await fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "x-site-token": SITE_TOKEN,
        },
        body: JSON.stringify({
          name: result.data.name,
          email: result.data.email,
          source: "chat-widget",
          siteToken: SITE_TOKEN,
          submittedAt: new Date().toISOString(),
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      const u = { name: result.data.name, email: result.data.email };
      setUser(u);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      } catch {
        // ignore
      }
      setMsgs([
        {
          from: "bot",
          text: `Hey ${u.name.split(" ")[0]}! 👋 What would you like to know about AI calling agents?`,
        },
      ]);
    } catch {
      toast.error("Could not start chat. Please try again.");
    } finally {
      setGateLoading(false);
    }
  };

  const sendToChatWebhook = async (message: string, email: string, name: string): Promise<string | null> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REPLY_TIMEOUT_MS);
    try {
      const res = await fetch(CHAT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-site-token": SITE_TOKEN,
        },
        body: JSON.stringify({
          name,
          email,
          message,
          siteToken: SITE_TOKEN,
        }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!res.ok) return null;
      const data = await res.json().catch(() => null);
      // Expected shape: { reply: "..." }   (also accepts { message: "..." })
      const reply: unknown = data?.reply ?? data?.message;
      return typeof reply === "string" && reply.trim() ? reply : null;
    } catch {
      clearTimeout(timer);
      return null;
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || !user || waiting) return;

    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setWaiting(true);

    const reply = await sendToChatWebhook(text, user.email, user.name);
    setWaiting(false);
    setMsgs((m) => [
      ...m,
      {
        from: "bot",
        text:
          reply ??
          "Hmm, I'm not able to reach the assistant right now. Please try again in a moment, or book a free 30-min strategy call and I'll personally reply.",
      },
    ]);
  };

  return (
    <>
      {/* Greeting bubble - appears for new users */}
      {!open && showGreeting && !greetingDismissed && (
        <div className="fixed bottom-[88px] right-4 sm:right-6 z-[59] animate-fade-in">
          <div 
            className="bg-card border border-border rounded-2xl shadow-xl p-4 pr-8 max-w-[220px] relative cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => {
              setOpen(true);
              setShowGreeting(false);
              setGreetingDismissed(true);
              try {
                localStorage.setItem(GREETING_KEY, "true");
              } catch {
                // ignore
              }
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowGreeting(false);
                setGreetingDismissed(true);
                try {
                  localStorage.setItem(GREETING_KEY, "true");
                } catch {
                  // ignore
                }
              }}
              className="absolute top-2 right-2 h-5 w-5 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="text-sm leading-relaxed">
              <span className="inline-block animate-bounce mr-1">👋</span>
              Hi! I'm Saad's AI assistant. Let's talk?
            </p>
            <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => {
          setOpen((v) => !v);
          if (!open) {
            setShowGreeting(false);
            setGreetingDismissed(true);
            try {
              localStorage.setItem(GREETING_KEY, "true");
            } catch {
              // ignore
            }
          }
        }}
        aria-label={open ? "Close chat" : "Chat with Saad's AI Assistant"}
        className={cn(
          "fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] h-14 w-14 rounded-full gradient-primary text-white shadow-[0_15px_40px_-10px_hsl(270_85%_55%/0.7)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Panel */}
      <div
        className={cn(
          "fixed z-[60] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all origin-bottom-right",
          "bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-24 sm:w-[360px] h-[70vh] max-h-[520px]",
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border bg-gradient-to-r from-card to-[hsl(270_30%_10%)]">
          <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm leading-tight">Chat with Saad's AI Assistant</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Online · replies instantly
            </div>
          </div>
        </div>

        {!user ? (
          /* Gate form */
          <form onSubmit={handleGate} className="flex-1 overflow-y-auto p-5 flex flex-col justify-center gap-3">
            <div>
              <h3 className="font-semibold text-base mb-1">Before we start</h3>
              <p className="text-xs text-muted-foreground">
                Quick intro so Saad knows who he's chatting with.
              </p>
            </div>
            <Input
              type="text"
              placeholder="Your name"
              value={gateName}
              onChange={(e) => setGateName(e.target.value)}
              maxLength={80}
              required
              disabled={gateLoading}
              className="h-11 bg-secondary border-border"
            />
            <Input
              type="email"
              placeholder="you@company.com"
              value={gateEmail}
              onChange={(e) => setGateEmail(e.target.value)}
              maxLength={200}
              required
              disabled={gateLoading}
              className="h-11 bg-secondary border-border"
            />
            <Button type="submit" variant="hero" className="w-full" disabled={gateLoading}>
              {gateLoading ? "Starting..." : "Start Chat"}
            </Button>
            <p className="text-[11px] text-muted-foreground text-center">
              No spam. Used only to follow up on your question.
            </p>
          </form>
        ) : (
          <>
            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] w-fit rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed break-words",
                    m.from === "bot"
                      ? "bg-secondary text-foreground rounded-tl-sm self-start"
                      : "gradient-primary text-white rounded-tr-sm self-end"
                  )}
                >
                  {m.text}
                </div>
              ))}
              {waiting && (
                <div className="bg-secondary text-foreground rounded-2xl rounded-tl-sm self-start px-3.5 py-3 w-fit">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70 animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-border bg-background/50 flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = Math.min(el.scrollHeight, 120) + "px";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e as unknown as React.FormEvent);
                  }
                }}
                placeholder={waiting ? "Waiting for reply…" : "Type your question…"}
                rows={1}
                disabled={waiting}
                className="flex-1 min-h-10 max-h-[120px] resize-none rounded-lg bg-secondary border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary-glow leading-relaxed disabled:opacity-60"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={waiting}
                className="h-10 w-10 rounded-lg gradient-primary text-white flex items-center justify-center shrink-0 hover:opacity-90 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default ChatWidget;
