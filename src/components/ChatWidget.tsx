import { useState, useEffect } from "react";
import { MessageCircle, X, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";

type Stage = "gate" | "verify" | "chat";

// Shared site token — same one used in the lead magnet form.
const SITE_TOKEN = "sr_site_8f3b29d1a74e4c5fbf91e6c2ad7b1e93";

const LEAD_WEBHOOK_URL = "https://n8n.saadrasheed.life/webhook/lead-magnet";
const CODE_WEBHOOK_URL = "https://n8n.saadrasheed.life/webhook/code";

const STORAGE_KEY = "sr_chat_user_v1";
const GREETING_KEY = "sr_chat_greeting_shown";

// Resend cooldown progression in seconds: 1m, 5m, 10m, 15m, 30m, then 30m repeating.
const RESEND_COOLDOWNS = [60, 300, 600, 900, 1800];

const gateSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(200),
});

const fmtCountdown = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0 ? `${m}:${String(sec).padStart(2, "0")}` : `${sec}s`;
};

// ---------------------------------------------------------------------------
// Chatwoot helpers
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    chatwootSDK?: { run: (opts: { websiteToken: string; baseUrl: string }) => void };
    $chatwoot?: {
      setUser: (identifier: string, attrs: { name?: string; email?: string }) => void;
      toggle: (state?: "open" | "close") => void;
    };
    __chatwootBaseUrl?: string;
    __chatwootToken?: string;
    __chatwootReady?: Promise<void>;
    __chatwootRunCalled?: boolean;
  }
}

const launchChatwoot = (name: string, email: string) => {
  const baseUrl = window.__chatwootBaseUrl ?? "https://dealdesk.saadrasheed.life";
  const token = window.__chatwootToken ?? "rCQSzE2KwTYFr4cE2uPKUiok";

  const initWidget = () => {
    // Only call run() once across the page lifetime.
    if (!window.__chatwootRunCalled) {
      window.__chatwootRunCalled = true;
      window.chatwootSDK?.run({ websiteToken: token, baseUrl });
    }

    // chatwoot:ready fires when the widget is fully mounted and $chatwoot is available.
    const onReady = () => {
      try {
        // Use email as the stable unique identifier — prevents duplicate contacts.
        window.$chatwoot?.setUser(email, { name, email });
      } catch {
        // Non-critical — widget still opens without identity.
      }
      try {
        window.$chatwoot?.toggle("open");
      } catch {
        // ignore
      }
    };

    if (window.$chatwoot) {
      // Widget already ready (returning user path).
      onReady();
    } else {
      window.addEventListener("chatwoot:ready", onReady, { once: true });
    }
  };

  if (window.__chatwootReady) {
    // SDK script may still be loading — wait for it, then init.
    window.__chatwootReady.then(initWidget);
  } else {
    initWidget();
  }
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  // gate
  const [stage, setStage] = useState<Stage>("gate");
  const [gateName, setGateName] = useState("");
  const [gateEmail, setGateEmail] = useState("");
  const [gateLoading, setGateLoading] = useState(false);

  // verify
  const [code, setCode] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [cooldownEndsAt, setCooldownEndsAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());

  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingDismissed, setGreetingDismissed] = useState(false);

  // Once Chatwoot is launched we hide our own launcher.
  const [chatwootLaunched, setChatwootLaunched] = useState(false);

  // Restore returning users (already verified) — skip straight to Chatwoot.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const u = JSON.parse(raw) as { name: string; email: string };
        setGateName(u.name);
        setGateEmail(u.email);
        setStage("chat");
      }
      const greetingShown = localStorage.getItem(GREETING_KEY);
      if (!greetingShown && !raw) {
        const timer = setTimeout(() => setShowGreeting(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

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

  // Cooldown ticker
  useEffect(() => {
    if (!cooldownEndsAt) return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [cooldownEndsAt]);

  const cooldownRemaining =
    cooldownEndsAt && cooldownEndsAt > now ? Math.ceil((cooldownEndsAt - now) / 1000) : 0;

  const sendCode = async (name: string, email: string): Promise<boolean> => {
    try {
      const res = await fetch(CODE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-site-token": SITE_TOKEN,
        },
        body: JSON.stringify({
          name,
          email,
          action: "send_code",
          siteToken: SITE_TOKEN,
          submittedAt: new Date().toISOString(),
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const data = await res.json().catch(() => null);
      return !!data?.success;
    } catch {
      return false;
    }
  };

  const handleGate = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = gateSchema.safeParse({ name: gateName, email: gateEmail });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setGateLoading(true);
    setShowGreeting(false);
    setGreetingDismissed(true);
    try {
      localStorage.setItem(GREETING_KEY, "true");
    } catch {
      // ignore
    }

    const ok = await sendCode(result.data.name, result.data.email);
    setGateLoading(false);

    if (!ok) {
      toast.error("Couldn't send your code. Please try again.");
      return;
    }

    toast.success("Code sent! Check your inbox.");
    setStage("verify");
    setCode("");
    setResendCount(0);
    setCooldownEndsAt(null);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (trimmed.length < 4) {
      toast.error("Enter the code from your email.");
      return;
    }
    setVerifyLoading(true);
    try {
      const res = await fetch(CODE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-site-token": SITE_TOKEN,
        },
        body: JSON.stringify({
          name: gateName,
          email: gateEmail,
          action: "verify_code",
          code: trimmed,
          siteToken: SITE_TOKEN,
        }),
      });
      const raw = await res.json().catch(() => null);
      // Accept either { success, reason } or n8n's [{ json: { ... } }]
      const payload = Array.isArray(raw) ? raw[0]?.json ?? raw[0] : raw;

      if (payload?.success) {
        const u = { name: gateName.trim(), email: gateEmail.trim() };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        } catch {
          // ignore
        }
        // Fire-and-forget lead capture only after successful verification.
        fetch(LEAD_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            "x-site-token": SITE_TOKEN,
          },
          body: JSON.stringify({
            name: u.name,
            email: u.email,
            source: "chat-widget",
            siteToken: SITE_TOKEN,
            submittedAt: new Date().toISOString(),
            page: typeof window !== "undefined" ? window.location.href : "",
          }),
        }).catch(() => {});

        setStage("chat");
        setOpen(false); // close our panel; Chatwoot will open its own
        setChatwootLaunched(true);
        launchChatwoot(u.name, u.email);
      } else {
        const reason: string = payload?.reason || "Invalid code";
        const friendly =
          reason === "Code expired"
            ? "That code expired. Tap resend to get a fresh one."
            : reason === "No code found"
              ? "No active code for this email. Tap resend below."
              : "That code didn't match. Double-check and try again.";
        toast.error(friendly);
      }
    } catch {
      toast.error("Verification failed. Please try again.");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldownRemaining > 0) return;
    setVerifyLoading(true);
    const ok = await sendCode(gateName, gateEmail);
    setVerifyLoading(false);
    if (!ok) {
      toast.error("Couldn't resend. Please try again in a moment.");
      return;
    }
    toast.success("New code sent.");
    const idx = Math.min(resendCount, RESEND_COOLDOWNS.length - 1);
    const wait = RESEND_COOLDOWNS[idx];
    setCooldownEndsAt(Date.now() + wait * 1000);
    setResendCount((c) => c + 1);
  };

  const handleChangeEmail = () => {
    setStage("gate");
    setCode("");
    setCooldownEndsAt(null);
    setResendCount(0);
  };

  // When a returning verified user clicks our button, launch Chatwoot directly.
  const handleOpenReturning = () => {
    if (!chatwootLaunched) {
      setChatwootLaunched(true);
      const raw = localStorage.getItem(STORAGE_KEY);
      const u = raw ? (JSON.parse(raw) as { name: string; email: string }) : { name: gateName, email: gateEmail };
      launchChatwoot(u.name, u.email);
    }
  };

  // If Chatwoot is active, hide our launcher entirely — Chatwoot has its own bubble.
  if (chatwootLaunched) return null;

  return (
    <>
      {/* Greeting */}
      {!open && showGreeting && !greetingDismissed && (
        <div className="fixed bottom-[58px] right-[58px] sm:bottom-[64px] sm:right-[64px] z-[59] animate-greeting-pop origin-bottom-right">
          <div
            className="relative cursor-pointer"
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
            <span className="text-4xl origin-bottom-right animate-wave-hand select-none block drop-shadow-lg">👋</span>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={async () => {
          if (stage === "chat") {
            // Already verified — launch Chatwoot directly
            await handleOpenReturning();
          } else {
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
          }
        }}
        aria-label={open ? "Close chat" : "Chat with Saad's AI Assistant"}
        className={cn(
          "fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] h-14 w-14 rounded-full gradient-primary text-white shadow-[0_15px_40px_-10px_hsl(270_85%_55%/0.7)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Panel */}
      <div
        className={cn(
          "fixed z-[60] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all origin-bottom-right",
          "bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-24 sm:w-[360px] h-[70vh] max-h-[520px]",
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border bg-gradient-to-r from-card to-[hsl(270_30%_10%)]">
          <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center shrink-0">
            <MessageCircle className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm leading-tight">Chat with Saad's AI Assistant</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Online · replies instantly
            </div>
          </div>
        </div>

        {stage === "gate" && (
          <form onSubmit={handleGate} className="flex-1 overflow-y-auto p-5 flex flex-col justify-center gap-3">
            <div>
              <h3 className="font-semibold text-base mb-1">Before we start</h3>
              <p className="text-xs text-muted-foreground">
                Quick intro so Saad knows who he's chatting with. We'll email you a quick code to verify.
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
              {gateLoading ? "Sending your code…" : "Send my verification code"}
            </Button>
            <p className="text-[11px] text-muted-foreground text-center">
              No spam. Used only to follow up on your question.
            </p>
          </form>
        )}

        {stage === "verify" && (
          <form onSubmit={handleVerify} className="flex-1 overflow-y-auto p-5 flex flex-col justify-center gap-3">
            <button
              type="button"
              onClick={handleChangeEmail}
              className="self-start text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" /> Change email
            </button>
            <div>
              <h3 className="font-semibold text-base mb-1">Check your inbox 📬</h3>
              <p className="text-xs text-muted-foreground">
                We sent a verification code to <span className="text-foreground font-medium">{gateEmail}</span>.
              </p>
            </div>
            <Input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={10}
              required
              disabled={verifyLoading}
              className="h-11 bg-secondary border-border tracking-widest text-center text-lg"
            />
            <Button type="submit" variant="hero" className="w-full" disabled={verifyLoading}>
              {verifyLoading ? "Unlocking chat…" : "🔓 Unlock the chat"}
            </Button>
            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleResend}
                disabled={verifyLoading || cooldownRemaining > 0}
                className="text-primary-glow hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
              >
                {cooldownRemaining > 0 ? `Resend in ${fmtCountdown(cooldownRemaining)}` : "Resend code"}
              </button>
              <button
                type="button"
                onClick={handleChangeEmail}
                className="text-muted-foreground hover:text-foreground"
              >
                Wrong email?
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ChatWidget;
