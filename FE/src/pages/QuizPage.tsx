import { useCallback, useEffect, useRef, useState } from "react";
import { Brain, ChevronRight, ClipboardList, Clock, RotateCcw, Trophy, X } from "lucide-react";
import { Loading } from "../components/Loading";
import { getQuiz, submitQuiz } from "../services/philosophyApi";
import type { QuizAnswer, QuizQuestion, QuizResult } from "../types/api";

/* ─── Constants ────────────────────────────────────────────── */
const OPTIONS: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];
const QUIZ_KEY   = "mln_quiz_session";
const TIME_LIMIT = 15 * 60; // 15 phút tính bằng giây

type Phase = "idle" | "playing" | "finished";

interface PersistedQuiz {
  questions : QuizQuestion[];
  currentIdx: number;
  answers   : Record<number, string>;
  startedAt : number;   // Date.now() lúc bắt đầu
  timeLimit : number;   // giây
}

function formatTime(secs: number): string {
  const s = Math.max(0, secs);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

/* ─── Component ─────────────────────────────────────────────── */
export function QuizPage(): JSX.Element {
  const [phase,       setPhase]       = useState<Phase>("idle");
  const [questions,   setQuestions]   = useState<QuizQuestion[]>([]);
  const [currentIdx,  setCurrentIdx]  = useState(0);
  const [answers,     setAnswers]     = useState<Record<number, string>>({});
  const [result,      setResult]      = useState<QuizResult | null>(null);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [timeLeft,    setTimeLeft]    = useState(TIME_LIMIT);
  const [showConfirm, setShowConfirm] = useState(false);  // xác nhận nộp sớm

  /* refs để dùng trong callbacks không cần deps */
  const startedAtRef   = useRef<number>(Date.now());
  const answersRef     = useRef(answers);
  const questionsRef   = useRef(questions);

  useEffect(() => { answersRef.current  = answers;   }, [answers]);
  useEffect(() => { questionsRef.current = questions; }, [questions]);

  const current  = questions[currentIdx];
  const selected = current ? (answers[current.id] ?? null) : null;
  const isLast   = currentIdx === questions.length - 1;
  const progress = questions.length
    ? Math.round((currentIdx / questions.length) * 100)
    : 0;
  const answeredCount = Object.keys(answers).length;

  /* ── doSubmit – dùng ref để không cần deps đổi ── */
  const doSubmit = useCallback(async (): Promise<void> => {
    const qs  = questionsRef.current;
    const ans = answersRef.current;

    const payload: QuizAnswer[] = qs
      .filter((q) => ans[q.id])
      .map((q) => ({ questionId: q.id, selectedAnswer: ans[q.id] }));

    // Chưa trả lời câu nào → không cho nộp
    if (payload.length === 0) {
      setShowConfirm(false);
      setError("Bạn chưa trả lời câu nào. Hãy chọn ít nhất 1 đáp án trước khi nộp bài!");
      return;
    }

    sessionStorage.removeItem(QUIZ_KEY);
    setShowConfirm(false);
    setLoading(true);
    try {
      const res = await submitQuiz(payload);
      setResult(res);
      setPhase("finished");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ── RESTORE từ sessionStorage khi vào lại trang ── */
  useEffect(() => {
    const raw = sessionStorage.getItem(QUIZ_KEY);
    if (!raw) return;
    try {
      const saved: PersistedQuiz = JSON.parse(raw);
      const elapsed   = Math.floor((Date.now() - saved.startedAt) / 1000);
      const remaining = saved.timeLimit - elapsed;

      if (remaining <= 0) {
        // Hết giờ trong lúc rời trang → tự nộp bài ngay
        sessionStorage.removeItem(QUIZ_KEY);
        if (Object.keys(saved.answers).length === 0) return; // không có đáp án → về idle
        questionsRef.current = saved.questions;
        answersRef.current   = saved.answers;
        doSubmit().catch(() => {});
      } else {
        startedAtRef.current = saved.startedAt;
        setQuestions(saved.questions);
        setCurrentIdx(saved.currentIdx);
        setAnswers(saved.answers);
        setTimeLeft(remaining);
        setPhase("playing");
      }
    } catch {
      sessionStorage.removeItem(QUIZ_KEY);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // chỉ chạy 1 lần khi mount

  /* ── LƯU trạng thái vào sessionStorage ── */
  useEffect(() => {
    if (phase !== "playing" || !questions.length) return;
    const state: PersistedQuiz = {
      questions,
      currentIdx,
      answers,
      startedAt : startedAtRef.current,
      timeLimit : TIME_LIMIT,
    };
    sessionStorage.setItem(QUIZ_KEY, JSON.stringify(state));
  }, [phase, questions, currentIdx, answers]);

  /* ── TIMER đếm ngược ── */
  useEffect(() => {
    if (phase !== "playing" || timeLeft <= 0) return;
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, timeLeft]);

  /* ── AUTO-SUBMIT khi hết giờ ── */
  useEffect(() => {
    if (phase === "playing" && timeLeft === 0) {
      doSubmit().catch(() => {});
    }
  }, [phase, timeLeft, doSubmit]);

  /* ── loadQuiz ── */
  async function loadQuiz(): Promise<void> {
    sessionStorage.removeItem(QUIZ_KEY);
    setLoading(true);
    setError("");
    try {
      const qs = await getQuiz();
      startedAtRef.current = Date.now();
      setQuestions(qs);
      setAnswers({});
      setCurrentIdx(0);
      setResult(null);
      setTimeLeft(TIME_LIMIT);
      setPhase("playing");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  /* ── chọn đáp án ── */
  function pickOption(opt: string): void {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: opt }));
  }

  /* ── tiếp theo (không phải câu cuối) ── */
  function goNext(): void {
    if (!isLast) {
      setCurrentIdx((i) => i + 1);
    } else {
      doSubmit().catch(() => {});
    }
  }

  /* ════════════════════════════════════════════
     RENDER – IDLE
  ════════════════════════════════════════════ */
  if (phase === "idle") {
    return (
      <section className="quiz-start-wrap fade-in">
        <div className="quiz-start-card">
          <div className="quiz-start-icon-ring">
            <Brain size={36} strokeWidth={1.5} />
          </div>
          <div className="quiz-start-text">
            <span className="label-chip"><Trophy size={12} /> Quiz Mode</span>
            <h2 className="quiz-start-title">Kiểm tra kiến thức</h2>
            <p className="muted-text" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
              Trả lời từng câu hỏi về Tích lũy tư bản theo Kinh tế Chính trị Mác–Lênin.
              Mỗi lần làm là một bộ câu hỏi ngẫu nhiên khác nhau!
            </p>
          </div>
          <div className="quiz-start-meta">
            <div className="quiz-meta-pill"><span>🎯</span> 20 câu / bộ đề</div>
            <div className="quiz-meta-pill"><span>⏱</span> 15 phút</div>
            <div className="quiz-meta-pill"><span>🔀</span> Ngẫu nhiên mỗi lần</div>
          </div>
          {error && <p className="error-text">{error}</p>}
          <button
            className="btn btn-primary quiz-start-btn"
            onClick={() => loadQuiz().catch(() => undefined)}
            disabled={loading}
          >
            {loading ? <Loading text="Đang tải..." /> : <><Brain size={17} /> Bắt đầu làm bài</>}
          </button>
        </div>
      </section>
    );
  }

  /* ════════════════════════════════════════════
     RENDER – FINISHED
  ════════════════════════════════════════════ */
  if (phase === "finished" && result) {
    const total   = Math.max(1, result.totalQuestions);   // tránh chia cho 0
    const correct = result.correctAnswers ?? 0;
    const pct     = Math.round((correct / total) * 100);
    const passed  = result.totalQuestions > 0
      && correct >= Math.ceil(result.totalQuestions * 0.7);
    return (
      <section className="quiz-result-wrap fade-in">
        <div className="quiz-result-card">
          <div className="quiz-score-circle">
            <svg viewBox="0 0 100 100" className="quiz-score-svg">
              <circle cx="50" cy="50" r="42" className="quiz-score-track" />
              <circle
                cx="50" cy="50" r="42"
                className="quiz-score-arc"
                strokeDasharray={`${2.64 * pct} 264`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="quiz-score-inner">
              <span className="quiz-score-pct">{pct}%</span>
              <span className="quiz-score-sub">{correct}/{result.totalQuestions}</span>
            </div>
          </div>

          <div className="quiz-result-text">
            <h2 className="quiz-result-title">
              {result.totalQuestions === 0
                ? "📋 Chưa nộp bài"
                : passed ? "🎉 Xuất sắc!" : "📚 Cố gắng thêm!"}
            </h2>
            <p style={{ fontWeight: 600, fontSize: "1rem", color: "var(--theme-text)" }}>
              Đúng <strong>{correct}</strong> / {result.totalQuestions} câu
            </p>
            <p className="muted-text" style={{ fontSize: "0.9rem", lineHeight: 1.65, maxWidth: "42ch", textAlign: "center" }}>
              {result.totalQuestions === 0
                ? "Bạn chưa trả lời câu nào. Hãy thử lại và trả lời ít nhất một câu nhé!"
                : passed
                ? "Bạn đã nắm chắc phần lớn nội dung về Tích lũy tư bản. Tiếp tục giữ vững kiến thức này nhé!"
                : "Hãy xem lại các chủ đề về Tích lũy tư bản và thử lại một bộ câu hỏi mới để cải thiện điểm số."}
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={() => loadQuiz().catch(() => undefined)} disabled={loading}>
              <RotateCcw size={16} /> Thử bộ mới
            </button>
            <button className="btn btn-ghost" onClick={() => { setPhase("idle"); setError(""); }}>
              Về trang Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* ════════════════════════════════════════════
     RENDER – PLAYING
  ════════════════════════════════════════════ */
  const isWarn = timeLeft <= 60 && timeLeft > 0;

  return (
    <section className="quiz-play-wrap fade-in">

      {/* Confirm submit early – overlay */}
      {showConfirm && (
        <div className="quiz-confirm-overlay" onClick={() => setShowConfirm(false)}>
          <div className="quiz-confirm-card" onClick={(e) => e.stopPropagation()}>
            <button className="quiz-confirm-close" onClick={() => setShowConfirm(false)}>
              <X size={16} />
            </button>
            <div className="quiz-confirm-icon"><ClipboardList size={30} strokeWidth={1.5} color="white" /></div>
            <h3 className="quiz-confirm-title">Nộp bài ngay?</h3>
            <p className="quiz-confirm-body">
              Bạn đã trả lời <strong>{answeredCount} / {questions.length}</strong> câu.
              {answeredCount < questions.length && (
                <> Còn <strong>{questions.length - answeredCount}</strong> câu chưa có đáp án (sẽ bị bỏ qua).</>
              )}
            </p>
            <div className="quiz-confirm-actions">
              <button className="btn btn-ghost" onClick={() => setShowConfirm(false)}>
                Tiếp tục làm
              </button>
              <button
                className="btn btn-primary"
                onClick={() => doSubmit().catch(() => undefined)}
                disabled={loading}
              >
                <Trophy size={15} /> Nộp bài
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subtitle */}
      <p className="quiz-play-subtitle">
        Kiểm tra kiến thức của bạn về Tích lũy tư bản và các nhân tố ảnh hưởng
      </p>

      {/* Stat card */}
      <div className="quiz-stat-card">
        <div className="quiz-stat-row">
          {/* Câu hỏi */}
          <div className="quiz-stat-item">
            <span className="quiz-stat-icon">
              <Brain size={16} strokeWidth={2} />
            </span>
            <span className="quiz-stat-label">
              Câu <strong>{currentIdx + 1}</strong> / {questions.length}
            </span>
          </div>

          {/* Timer */}
          <div className={`quiz-timer${isWarn ? " quiz-timer--warn" : ""}`}>
            <Clock size={15} strokeWidth={2} />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {/* Đã trả lời */}
          <div className="quiz-stat-item">
            <span className="quiz-stat-icon quiz-stat-icon--gold">
              <Trophy size={15} strokeWidth={2} />
            </span>
            <span className="quiz-stat-label">
              {answeredCount}/{questions.length} câu
            </span>
          </div>
        </div>
        <div className="quiz-bar">
          <div className="quiz-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question card */}
      <div className="quiz-q-card">
        <p className="quiz-q-headline">{current?.question}</p>
        <div className="quiz-opts">
          {OPTIONS.map((opt) => {
            const text = current?.[`option${opt}` as const];
            if (!text) return null;
            return (
              <button
                key={opt}
                type="button"
                className={`quiz-opt${selected === opt ? " quiz-opt--sel" : ""}`}
                onClick={() => pickOption(opt)}
              >
                <span className="quiz-opt-bullet">{opt}</span>
                <span className="quiz-opt-text">{text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="quiz-nav-row">
        {error && <p className="error-text">{error}</p>}
        <div className="quiz-nav-inner">
          {/* Nộp sớm */}
          <button
            className="btn btn-ghost quiz-early-btn"
            onClick={() => setShowConfirm(true)}
            disabled={loading}
            title="Nộp bài bất kỳ lúc nào"
          >
            <Trophy size={15} /> Nộp bài ngay
          </button>

          {/* Tiếp theo / Nộp */}
          <button
            className="btn btn-primary quiz-next-btn"
            disabled={!selected || loading}
            onClick={goNext}
          >
            {loading
              ? "Đang xử lý..."
              : isLast
              ? <><Trophy size={16} /> Nộp bài</>
              : <>Tiếp theo <ChevronRight size={16} /></>}
          </button>
        </div>
      </div>

    </section>
  );
}