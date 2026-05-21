import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Sparkles, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";

type Msg = { from: "bot" | "user"; text: string };
type Stage = "gate" | "verify" | "chat";

// Chatwoot session data saved after history fetch
type ChatwootSession = {
  contact_id: number;
  conversation_id: number;
  pubsub_token: string;
  labels: string[];
};

// Shared site token — same one used in the lead magnet form.
const SITE_TOKEN = "sr_site_8f3b29d1a74e4c5fbf91e6c2ad7b1e93";

const LEAD_WEBHOOK_URL = "https://n8n.saadrasheed.life/webhook/lead-magnet";
const CHAT_WEBHOOK_URL = "https://n8n.saadrasheed.life/webhook/chat-widget";
const CODE_WEBHOOK_URL = "https://n8n.saadrasheed.life/webhook/code";
const HISTORY_WEBHOOK_URL = "https://n8n.saadrasheed.life/webhook/get-chat-history";

// Chatwoot
const CHATWOOT_BASE_URL = "https://dealdesk.saadrasheed.life";
const CHATWOOT_API_TOKEN = "MRpLyREWBxki3KsGznmsyiCc";
const CHATWOOT_ACCOUNT_ID = 1;
const CHATWOOT_WS_URL = "wss://dealdesk.saadrasheed.life/cable";

const STORAGE_KEY = "sr_chat_user_v1";
const CHATWOOT_SESSION_KEY = "sr_chatwoot_session_v1";
const GREETING_KEY = "sr_chat_greeting_shown";
const REPLY_TIMEOUT_MS = 60_000;

// Resend cooldown progression in seconds: 1m, 5m, 10m, 15m, 30m, then 30m repeating.
const RESEND_COOLDOWNS = [60, 300, 600, 900, 1800];

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

const fmtCountdown = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0 ? `${m}:${String(sec).padStart(2, "0")}` : `${sec}s`;
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(initialMsgs);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [chatwootSession, setChatwootSession] = useState<ChatwootSession | null>(null);

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const wsSessionRef = useRef<ChatwootSession | null>(null);

  // Restore returning users (already verified) — always re-fetch history on every page load
  // so labels, pubsub_token, and conversation state are always fresh.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed);
        setStage("chat");
        // Always call history webhook on refresh — this is the source of truth
        // for chatwoot session (labels, pubsub_token, conversation_id).
        fetchHistory(parsed.email);
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

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, open, waiting]);

  // Cooldown ticker
  useEffect(() => {
    if (!cooldownEndsAt) return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [cooldownEndsAt]);

  const cooldownRemaining =
    cooldownEndsAt && cooldownEndsAt > now ? Math.ceil((cooldownEndsAt - now) / 1000) : 0;

  // ── ActionCable WebSocket for human-handoff ──────────────────────────────
  const connectActionCable = useCallback((session: ChatwootSession) => {
    // Already connected for this session
    if (wsRef.current && wsRef.current.readyState <= WebSocket.OPEN) return;

    const ws = new WebSocket(CHATWOOT_WS_URL);
    wsRef.current = ws;
    wsSessionRef.current = session;

    ws.onopen = () => {
      // 1. Send the ActionCable handshake
      ws.send(JSON.stringify({ command: "subscribe", identifier: JSON.stringify({ channel: "RoomChannel", pubsub_token: session.pubsub_token }) }));
    };

    ws.onmessage = (event) => {
      try {
        const frame = JSON.parse(event.data as string);

        // ActionCable ping / welcome — ignore
        if (frame.type === "ping" || frame.type === "welcome" || frame.type === "confirm_subscription") return;

        const msg = frame.message;
        if (!msg) return;

        // We only care about message_created events in our conversation
        if (msg.event !== "message_created") return;
        if (msg.data?.conversation_id !== session.conversation_id) return;

        // message_type: 1 = outgoing (agent reply), 0 = incoming (visitor)
        // We only want agent replies (type 1) that are not private notes
        const msgData = msg.data;
        if (msgData.message_type !== 1) return;
        if (msgData.private) return;

        const text: string = msgData.content ?? "";
        if (!text.trim()) return;

        setMsgs((prev) => [...prev, { from: "bot", text }]);
      } catch {
        // ignore malformed frames
      }
    };

    ws.onerror = () => {
      // Silent — don't surface WS errors to the user
    };

    ws.onclose = () => {
      wsRef.current = null;
    };
  }, []);

  const disconnectActionCable = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  // Connect when we have a human-handoff session and the chat stage is active
  useEffect(() => {
    if (stage === "chat" && chatwootSession?.labels.includes("human-handoff")) {
      connectActionCable(chatwootSession);
    }
    return () => {
      // Only disconnect on unmount, not on every re-render
    };
  }, [stage, chatwootSession, connectActionCable]);

  // Disconnect on unmount
  useEffect(() => {
    return () => disconnectActionCable();
  }, [disconnectActionCable]);

  const fetchHistory = async (email: string) => {
    try {
      console.log("[ChatWidget] fetchHistory called for:", email);
      const res = await fetch(HISTORY_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-site-token": SITE_TOKEN,
        },
        body: JSON.stringify({ email, siteToken: SITE_TOKEN }),
      });
      console.log("[ChatWidget] fetchHistory status:", res.status);
      if (!res.ok) {
        console.warn("[ChatWidget] fetchHistory non-ok response:", res.status);
        return;
      }
      const data = await res.json().catch((e) => { console.error("[ChatWidget] fetchHistory JSON parse error:", e); return null; });
      console.log("[ChatWidget] fetchHistory raw data:", JSON.stringify(data));

      // Handle both array and plain object responses
      if (!data) {
        console.warn("[ChatWidget] fetchHistory: null response");
        return;
      }
      const normalized = Array.isArray(data) ? data : [data];
      if (normalized.length === 0) {
        console.warn("[ChatWidget] fetchHistory: empty response");
        return;
      }

      const payload = normalized[0];
      console.log("[ChatWidget] fetchHistory payload keys:", Object.keys(payload));
      console.log("[ChatWidget] contact_id:", payload.contact_id, "conversation_id:", payload.conversation_id, "pubsub_token:", payload.pubsub_token, "labels:", payload.labels);

      // ── Save Chatwoot session data ──────────────────────────────────────
      if (payload.contact_id && payload.conversation_id && payload.pubsub_token) {
        const session: ChatwootSession = {
          contact_id: payload.contact_id,
          conversation_id: payload.conversation_id,
          pubsub_token: payload.pubsub_token,
          labels: Array.isArray(payload.labels) ? payload.labels : [],
        };
        console.log("[ChatWidget] Saving chatwoot session:", session);
        setChatwootSession(session);
        wsSessionRef.current = session;
        try {
          localStorage.setItem(CHATWOOT_SESSION_KEY, JSON.stringify(session));
          console.log("[ChatWidget] Session saved to localStorage under key:", CHATWOOT_SESSION_KEY);
        } catch (e) {
          console.error("[ChatWidget] localStorage write failed:", e);
        }
        // Connect ActionCable immediately if human-handoff is active
        if (session.labels.includes("human-handoff")) {
          console.log("[ChatWidget] human-handoff detected — connecting ActionCable");
          connectActionCable(session);
        }
      } else {
        console.warn("[ChatWidget] Missing session fields — skipping session save. Got:", {
          contact_id: payload.contact_id,
          conversation_id: payload.conversation_id,
          pubsub_token: payload.pubsub_token,
        });
      }

      // ── Populate chat history ───────────────────────────────────────────
      if (!payload.messages || !Array.isArray(payload.messages)) {
        console.warn("[ChatWidget] No messages array in payload");
        return;
      }

      const historyMsgs: Msg[] = [];
      for (const m of payload.messages) {
        if (m.sender === "System") continue;
        historyMsgs.push({
          from: m.sender === 1 ? "bot" : "user",
          text: m.message,
        });
      }

      if (historyMsgs.length > 0) {
        setMsgs(historyMsgs);
      }
    } catch (err) {
      console.error("[ChatWidget] fetchHistory threw:", err);
    }
  };

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
        setUser(u);
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
        setMsgs([
          {
            from: "bot",
            text: `Hey ${u.name.split(" ")[0]}! 👋 You're in. What would you like to know about AI calling agents?`,
          },
        ]);
        fetchHistory(u.email);
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
      const reply: unknown = data?.reply ?? data?.message;
      return typeof reply === "string" && reply.trim() ? reply : null;
    } catch {
      clearTimeout(timer);
      return null;
    }
  };

  // Send a message directly to Chatwoot (human-handoff mode)
  const sendToChatwoot = async (message: string, conversationId: number): Promise<boolean> => {
    console.log("[ChatWidget] sendToChatwoot called — conversationId:", conversationId, "message:", message);
    try {
      const url = `${CHATWOOT_BASE_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/conversations/${conversationId}/messages`;
      console.log("[ChatWidget] POSTing to:", url);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api_access_token": CHATWOOT_API_TOKEN,
        },
        body: JSON.stringify({
          content: message,
          message_type: "incoming",
          private: false,
        }),
      });
      console.log("[ChatWidget] sendToChatwoot response status:", res.status);
      return res.ok;
    } catch (e) {
      console.error("[ChatWidget] sendToChatwoot error:", e);
      return false;
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

    const session = wsSessionRef.current;
    const isHumanHandoff = session?.labels.includes("human-handoff") ?? false;
    console.log("[ChatWidget] handleSend — isHumanHandoff:", isHumanHandoff, "session:", session);

    if (isHumanHandoff && session) {
      // Route directly to Chatwoot — reply comes back via ActionCable
      const ok = await sendToChatwoot(text, session.conversation_id);
      if (!ok) {
        setMsgs((m) => [
          ...m,
          {
            from: "bot",
            text: "Couldn't reach the support desk right now. Please try again in a moment.",
          },
        ]);
      }
      // No waiting spinner — agent reply arrives async via WebSocket
    } else {
      // Route to n8n AI
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
    }
  };

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

        {stage === "chat" && user && (
          <>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] w-fit rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed break-words",
                    m.from === "bot"
                      ? "bg-secondary text-foreground rounded-tl-sm self-start"
                      : "gradient-primary text-white rounded-tr-sm self-end",
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
