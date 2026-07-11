import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, X, BookOpen, Lightbulb, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { askChatbot } from "../lib/api";

interface Msg {
  from: "user" | "ai";
  text: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const STORAGE_KEY = "sophia_session_id";

const seed: Msg[] = [
  { from: "ai", text: "Chào bạn! Mình là Sophia 🤖 Mình có thể giải thích bất kỳ khái niệm nào trong bài học bằng ví dụ đời thường — bạn cứ hỏi nhé." },
];

export function ChatDrawer({ open, onClose }: Props) {
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, thinking]);

  const startNewChat = () => {
    setMsgs(seed);
    setSessionId("");
    localStorage.removeItem(STORAGE_KEY);
  };

  const send = async (text: string) => {
    if (!text.trim() || thinking) return;
    const userMessage = text.trim();

    setMsgs((m) => [...m, { from: "user", text: userMessage }]);
    setInput("");
    setThinking(true);

    try {
      const result = await askChatbot(userMessage, sessionId || undefined);

      // Save sessionId for future messages in this conversation
      if (result.sessionId) {
        setSessionId(result.sessionId);
        localStorage.setItem(STORAGE_KEY, result.sessionId);
      }

      setMsgs((m) => [...m, { from: "ai", text: result.answer }]);
    } catch {
      setMsgs((m) => [
        ...m,
        { from: "ai", text: "Xin lỗi, mình gặp lỗi khi xử lý. Bạn thử hỏi lại nhé!" },
      ]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-[#3a4a3a]/30 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 z-40 h-full w-full sm:w-[440px] bg-gradient-to-b from-[#f3eef7] via-[#f5eff5] to-[#eef1f6] border-l border-white/70 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="px-5 py-4 border-b border-[#e3d9ed] flex items-center gap-3 bg-white/40 backdrop-blur">
            <div className="size-10 rounded-2xl bg-gradient-to-br from-[#c4b5e0] to-[#a896d2] grid place-items-center shadow-md shadow-[#a896d2]/30">
              <Sparkles className="size-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-[#3a3247]">Sophia</div>
              <div className="text-xs text-[#7a6e8e] flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#9ab99a] animate-pulse" />
                Trợ lý triết học · luôn sẵn sàng
              </div>
            </div>
            <button
              onClick={startNewChat}
              title="Cuộc trò chuyện mới"
              className="text-[#7a6e8e] hover:text-[#3a3247] p-1.5 rounded-lg hover:bg-white/60 transition"
            >
              <RotateCcw className="size-4" />
            </button>
            <button onClick={onClose} className="text-[#7a6e8e] hover:text-[#3a3247] p-1.5 rounded-lg hover:bg-white/60">
              <X className="size-4" />
            </button>
          </header>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                {m.from === "ai" && (
                  <div className="size-8 rounded-xl bg-gradient-to-br from-[#c4b5e0] to-[#a896d2] grid place-items-center mr-2 shrink-0">
                    <Sparkles className="size-3.5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.from === "user"
                      ? "bg-gradient-to-br from-[#3f6048] to-[#5a7a5a] text-white rounded-br-md"
                      : "bg-white/80 text-[#3a3247] rounded-bl-md border border-white"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex">
                <div className="size-8 rounded-xl bg-gradient-to-br from-[#c4b5e0] to-[#a896d2] grid place-items-center mr-2">
                  <Sparkles className="size-3.5 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/80 border border-white flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#a896d2] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="size-2 rounded-full bg-[#a896d2] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="size-2 rounded-full bg-[#a896d2] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="px-5 pb-2 flex gap-2 flex-wrap">
            {[
              { icon: BookOpen, t: "Ví dụ chuỗi giá trị cà phê" },
              { icon: Lightbulb, t: "Phân tích lợi ích kinh tế" },
            ].map((s) => (
              <button
                key={s.t}
                onClick={() => send(s.t)}
                disabled={thinking}
                className="text-xs px-3 py-1.5 rounded-full bg-white/60 border border-white hover:bg-white text-[#5a4d6e] flex items-center gap-1.5 disabled:opacity-50"
              >
                <s.icon className="size-3" /> {s.t}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            className="p-4 border-t border-[#e3d9ed] bg-white/40 backdrop-blur"
            onSubmit={(e) => { e.preventDefault(); send(input); }}
          >
            <div className="flex items-center gap-2 bg-white rounded-full pl-5 pr-1.5 py-1.5 border border-white shadow-sm">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi Sophia bất cứ điều gì..."
                className="flex-1 bg-transparent outline-none text-sm text-[#3a3247] placeholder:text-[#a89cb8]"
                disabled={thinking}
              />
              <Button
                type="submit"
                size="icon"
                disabled={thinking || !input.trim()}
                className="rounded-full size-9 bg-gradient-to-br from-[#5a4d6e] to-[#7a6b8e] hover:opacity-90 text-white disabled:opacity-50"
              >
                <Send className="size-4" />
              </Button>
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}
