import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, Sparkles } from "lucide-react";
import { Loading } from "../components/Loading";
import { askChatbot } from "../services/philosophyApi";

interface ChatLine {
  role: "user" | "bot";
  text: string;
  elapsedMs?: number;
}

const QUICK_PROMPTS = [
  "Tích lũy tư bản là gì? Nguồn gốc từ đâu?",
  "4 nhân tố ảnh hưởng tới quy mô tích lũy tư bản là gì?",
  "Lực lượng phục vụ không công của máy móc là gì?",
];

export function ChatbotPage(): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const [lines,   setLines]   = useState<ChatLine[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error,   setError]   = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, loading]);

  async function send(text: string): Promise<void> {
    const question = text.trim();
    if (!question) return;
    setMessage("");
    setError("");
    setLines((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);
    const t0 = performance.now();
    try {
      const res = await askChatbot(question);
      setLines((prev) => [
        ...prev,
        { role: "bot", text: res.answer, elapsedMs: Math.round(performance.now() - t0) },
      ]);
    } catch (err) {
      setError((err as Error).message || "Không nhận được phản hồi");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    send(message).catch(() => undefined);
  }

  const avgSpeed = useMemo(() => {
    const bots = lines.filter((l) => l.role === "bot" && l.elapsedMs);
    if (!bots.length) return null;
    const avg = bots.reduce((s, l) => s + (l.elapsedMs ?? 0), 0) / bots.length;
    return Math.round(avg);
  }, [lines]);

  return (
    <section className="stack-md fade-in">

      {/* Page intro */}
      <div className="page-intro">
        <span className="label-chip"><MessageCircle size={12} /> AI Assistant</span>
        <h2>Hỏi đáp Kinh tế Chính trị thông minh</h2>
        <p className="muted-text">
          Đặt câu hỏi về tích lũy tư bản và Kinh tế Chính trị Mác–Lênin. Hệ thống phản hồi dưới 10 giây
          {avgSpeed ? ` · Tốc độ TB: ${avgSpeed}ms` : ""}.
        </p>
      </div>

      {/* Chat box */}
      <div className="chat-container">

        {/* Quick prompts */}
        <div className="prompt-row">
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--theme-muted)", textTransform: "uppercase", letterSpacing: "0.06em", alignSelf: "center" }}>
            Gợi ý:
          </span>
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              className="prompt-chip"
              onClick={() => send(p).catch(() => undefined)}
              disabled={loading}
            >
              <Sparkles size={11} />
              {p}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="chat-window">
          {lines.length === 0 ? (
            <div className="chat-empty">
              <div className="chat-empty-icon">
                <MessageCircle size={24} />
              </div>
              <p style={{ fontWeight: 600 }}>Bắt đầu cuộc trò chuyện</p>
              <p className="muted-text" style={{ fontSize: "0.875rem" }}>
                Nhấn một gợi ý hoặc tự đặt câu hỏi bên dưới.
              </p>
            </div>
          ) : (
            lines.map((line, i) => (
              <div
                key={i}
                className={`chat-bubble ${line.role}`}
              >
                <p className="chat-bubble-text">{line.text}</p>
                {line.elapsedMs && (
                  <span className="chat-bubble-meta">{line.elapsedMs}ms</span>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="chat-bubble bot" style={{ padding: "14px 16px" }}>
              <Loading text="Đang suy luận..." />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <form className="chat-form" onSubmit={onSubmit}>
            <textarea
              className="chat-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập câu hỏi về tích lũy tư bản, giá trị thặng dư..."
              rows={2}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(message).catch(() => undefined);
                }
              }}
            />
            <button className="btn-send" type="submit" disabled={loading || !message.trim()}>
              <Send size={18} />
            </button>
          </form>
          <p style={{ fontSize: "0.72rem", color: "var(--theme-muted)", marginTop: "6px" }}>
            Enter để gửi · Shift+Enter xuống dòng
          </p>
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}

    </section>
  );
}