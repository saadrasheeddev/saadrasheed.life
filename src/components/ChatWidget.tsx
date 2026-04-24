import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { from: "bot" | "user"; text: string };

const initial: Msg[] = [
  {
    from: "bot",
    text: "Hey! I'm Saad's AI assistant 👋 Ask me anything about AI calling agents, pricing, or how the system works.",
  },
];

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          text: "Thanks! For a tailored answer, the fastest path is a free 30-min strategy call. Want me to share the booking link?",
        },
      ]);
    }, 700);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
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
            placeholder="Type your question…"
            rows={1}
            className="flex-1 min-h-10 max-h-[120px] resize-none rounded-lg bg-secondary border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary-glow leading-relaxed"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="h-10 w-10 rounded-lg gradient-primary text-white flex items-center justify-center shrink-0 hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;
