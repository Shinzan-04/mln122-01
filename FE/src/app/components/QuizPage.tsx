import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Brain, Check, ChevronLeft, ChevronRight, RefreshCw, Sparkles, Trophy } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import {
  fetchTopics, fetchQuiz, submitQuiz,
  type TopicDto, type QuizQuestionDto, type QuizResultDto, type QuizAnswer,
} from "../lib/api";

// ─── Theme per topic index ────────────────────────────────────────────
const topicThemes = [
  { gradient: "from-[#cfe1cf] to-[#e8f1d8]", accent: "text-[#3f6048]", icon: "bg-[#3f6048]", count: "bg-[#e8f1d8] text-[#3f6048]" },
  { gradient: "from-[#f4e7c5] to-[#fbf3dc]", accent: "text-[#7a5d24]", icon: "bg-[#c4952a]", count: "bg-[#fbf3dc] text-[#7a5d24]" },
  { gradient: "from-[#e3dcf5] to-[#efe8f7]", accent: "text-[#5a4d6e]", icon: "bg-[#5a4d6e]", count: "bg-[#efe8f7] text-[#5a4d6e]" },
  { gradient: "from-[#dbeaf4] to-[#e8f1f8]", accent: "text-[#2d5a7b]", icon: "bg-[#2d5a7b]", count: "bg-[#e8f1f8] text-[#2d5a7b]" },
  { gradient: "from-[#f5ddd5] to-[#fbeee8]", accent: "text-[#8a4d3a]", icon: "bg-[#8a4d3a]", count: "bg-[#fbeee8] text-[#8a4d3a]" },
];

interface QuizPageProps {
  onScoreUpdate?: (addedScore: number) => void;
}

export function QuizPage({ onScoreUpdate }: QuizPageProps) {
  // ─── Topic selection ───────────────────────────────────────────────
  const [topics, setTopics] = useState<TopicDto[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<TopicDto | null>(null);

  // ─── Quiz flow ─────────────────────────────────────────────────────
  const [questions, setQuestions] = useState<QuizQuestionDto[]>([]);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [result, setResult] = useState<QuizResultDto | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // ─── Fetch topics on mount ─────────────────────────────────────────
  useEffect(() => {
    fetchTopics(undefined, undefined, 1, 50)
      .then(setTopics)
      .catch(() => setTopics([]))
      .finally(() => setLoadingTopics(false));
  }, []);

  // ─── Start a quiz for a specific topic ─────────────────────────────
  const startQuiz = (topic: TopicDto) => {
    setSelectedTopic(topic);
    setLoadingQuiz(true);
    setError(null);
    setIdx(0);
    setSelected(null);
    setAnswers([]);
    setResult(null);
    fetchQuiz(topic.id)
      .then(setQuestions)
      .catch(() => { setError("Không thể tải câu hỏi."); setQuestions([]); })
      .finally(() => setLoadingQuiz(false));
  };

  // ─── Start all questions (mixed) ───────────────────────────────────
  const startAllQuiz = () => {
    setSelectedTopic({ id: 0, title: "Tổng hợp tất cả", slug: "", summary: "", thumbnailUrl: "", category: "all", createdAt: "" });
    setLoadingQuiz(true);
    setError(null);
    setIdx(0);
    setSelected(null);
    setAnswers([]);
    setResult(null);
    fetchQuiz()
      .then(setQuestions)
      .catch(() => { setError("Không thể tải câu hỏi."); setQuestions([]); })
      .finally(() => setLoadingQuiz(false));
  };

  // ─── Back to topic selection ───────────────────────────────────────
  const goBack = () => {
    setSelectedTopic(null);
    setQuestions([]);
    setResult(null);
    setIdx(0);
    setSelected(null);
    setAnswers([]);
  };

  const choose = (key: string) => {
    if (selected !== null) return;
    setSelected(key);
    setAnswers((prev) => [...prev, { questionId: questions[idx].id, selectedAnswer: key }]);
  };

  const next = async () => {
    if (idx + 1 >= questions.length) {
      setSubmitting(true);
      try {
        const r = await submitQuiz(answers);
        setResult(r);
        // Sync XP to sidebar/header
        if (r.score > 0 && onScoreUpdate) onScoreUpdate(r.score);
      } catch {
        setResult({ score: 0, correctAnswers: 0, totalQuestions: questions.length });
      } finally {
        setSubmitting(false);
      }
    } else {
      setIdx(idx + 1);
      setSelected(null);
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // SCREEN 1: Topic Selection
  // ═══════════════════════════════════════════════════════════════════
  if (!selectedTopic) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Badge className="bg-[#e0eef5] text-[#2c5a72] border-0 hover:bg-[#e0eef5]">
            <Brain className="size-3.5 mr-1.5" /> Trắc nghiệm
          </Badge>
          <h1 className="font-serif mt-3 text-[#2f3d2f]" style={{ fontSize: "32px" }}>
            Chọn bộ câu hỏi
          </h1>
          <p className="text-sm text-[#7a8473] mt-1">
            Chọn chuyên đề bạn muốn kiểm tra kiến thức. Mỗi bộ gồm các câu hỏi trắc nghiệm theo chủ đề.
          </p>
        </div>

        {/* All questions button */}
        <button
          onClick={startAllQuiz}
          className="w-full mb-5 rounded-2xl bg-gradient-to-r from-[#3f6048] to-[#2d5a3a] p-5 text-left text-white hover:shadow-lg hover:shadow-[#3f6048]/20 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-white/20 grid place-items-center">
                <Sparkles className="size-6" />
              </div>
              <div>
                <div className="font-serif" style={{ fontSize: "18px" }}>🎯 Tổng hợp tất cả</div>
                <div className="text-sm text-white/70 mt-0.5">Trộn câu hỏi từ tất cả chuyên đề</div>
              </div>
            </div>
            <ChevronRight className="size-5 text-white/60 group-hover:translate-x-1 transition" />
          </div>
        </button>

        {/* Topic cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {loadingTopics
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="rounded-2xl border border-white/60 bg-white/40">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-12 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4 rounded" />
                        <Skeleton className="h-3 w-1/2 rounded" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            : topics.map((topic, i) => {
                const theme = topicThemes[i % topicThemes.length];
                return (
                  <button
                    key={topic.id}
                    onClick={() => startQuiz(topic)}
                    className={`text-left rounded-2xl bg-gradient-to-br ${theme.gradient} border border-white/60 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`size-12 rounded-xl ${theme.icon} grid place-items-center shrink-0`}>
                        <BookOpen className="size-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-serif text-[#2f3d2f]" style={{ fontSize: "17px" }}>
                          {topic.title}
                        </div>
                        <p className="text-xs text-[#7a8473] mt-1 line-clamp-2">{topic.summary}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className={`text-[10px] px-2.5 py-1 rounded-full ${theme.count}`}>
                            {topic.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-[#3f6048] opacity-0 group-hover:opacity-100 transition ml-auto">
                            Bắt đầu <ChevronRight className="size-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
          }
        </div>

        {topics.length === 0 && !loadingTopics && (
          <div className="text-center py-16 text-[#7a8473]">
            Chưa có chuyên đề nào.
          </div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // SCREEN: Loading quiz
  // ═══════════════════════════════════════════════════════════════════
  if (loadingQuiz) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" className="text-[#5a6557] -ml-2" onClick={goBack}>
          <ChevronLeft className="size-4 mr-1" /> Chọn bộ khác
        </Button>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-8 w-64 rounded-xl" />
          </div>
          <Skeleton className="size-16 rounded-full" />
        </div>
        <Card className="rounded-3xl border border-white/70 bg-white/40">
          <CardContent className="p-8 space-y-5">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-8 w-full rounded-xl" />
            <div className="space-y-3 mt-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-2xl" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // SCREEN: No questions / Error
  // ═══════════════════════════════════════════════════════════════════
  if (error || questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" className="text-[#5a6557] -ml-2 mb-6" onClick={goBack}>
          <ChevronLeft className="size-4 mr-1" /> Chọn bộ khác
        </Button>
        <div className="grid place-items-center py-16">
          <Card className="rounded-3xl border border-[#ece6d4] bg-white/70 max-w-md w-full">
            <CardContent className="p-10 text-center">
              <div className="mx-auto size-16 rounded-3xl bg-[#ece6d4] grid place-items-center">
                <RefreshCw className="size-8 text-[#7a8473]" />
              </div>
              <h2 className="font-serif mt-6 text-[#2f3d2f]" style={{ fontSize: "24px" }}>
                {error || `Chưa có câu hỏi cho "${selectedTopic.title}"`}
              </h2>
              <div className="mt-6 flex gap-2 justify-center">
                <Button variant="outline" className="rounded-full border-[#ece6d4]" onClick={goBack}>
                  <ArrowLeft className="size-4 mr-1.5" /> Quay lại
                </Button>
                <Button onClick={() => startQuiz(selectedTopic)} className="rounded-full bg-[#3f6048] hover:bg-[#345039] text-white">
                  <RefreshCw className="size-4 mr-1.5" /> Thử lại
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // SCREEN: Result (from POST /api/Quiz/submit)
  // ═══════════════════════════════════════════════════════════════════
  if (result) {
    const pct = Math.round((result.correctAnswers / result.totalQuestions) * 100);
    return (
      <div className="grid place-items-center py-10">
        <Card className="rounded-3xl border border-white/70 bg-gradient-to-br from-[#e0eef5] to-[#e5f4ec] backdrop-blur shadow-xl max-w-md w-full">
          <CardContent className="p-10 text-center">
            <div className="mx-auto size-20 rounded-3xl bg-gradient-to-br from-[#f1d99c] to-[#d4a85a] grid place-items-center shadow-lg shadow-[#d4a85a]/40">
              <Trophy className="size-10 text-white" />
            </div>
            <h2 className="font-serif mt-6 text-[#2f3d2f]" style={{ fontSize: "30px" }}>
              {pct >= 80 ? "Tuyệt vời!" : pct >= 50 ? "Khá tốt!" : "Cần cố gắng thêm!"}
            </h2>
            <p className="mt-2 text-[#5a6557]">
              {selectedTopic.title}
            </p>
            <div className="font-serif text-[#3f6048] mt-2" style={{ fontSize: "56px" }}>
              {result.correctAnswers}<span className="text-[#bcd6c8]">/{result.totalQuestions}</span>
            </div>
            <p className="text-sm text-[#7a8473] mt-2">+{result.score} XP đã được cộng</p>

            <div className="mt-8 flex gap-2 justify-center flex-wrap">
              <Button
                variant="outline"
                className="rounded-full border-[#bcd6c8] bg-white/70"
                onClick={() => startQuiz(selectedTopic)}
              >
                Làm lại
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-[#bcd6c8] bg-white/70"
                onClick={goBack}
              >
                <ArrowLeft className="size-4 mr-1.5" /> Chọn bộ khác
              </Button>
              <Button className="rounded-full bg-[#3f6048] hover:bg-[#345039] text-white">
                Tiếp tục học
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // SCREEN: Question
  // ═══════════════════════════════════════════════════════════════════
  const q = questions[idx];
  const options = [
    { key: "A", text: q.optionA },
    { key: "B", text: q.optionB },
    { key: "C", text: q.optionC },
    { key: "D", text: q.optionD },
  ];
  const progress = ((idx + (selected !== null ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button variant="ghost" size="sm" className="text-[#5a6557] -ml-2 mb-1" onClick={goBack}>
            <ChevronLeft className="size-4 mr-1" /> Chọn bộ khác
          </Button>
          <Badge className="bg-[#e0eef5] text-[#2c5a72] border-0 hover:bg-[#e0eef5]">
            {selectedTopic.title}
          </Badge>
          <h1 className="font-serif mt-2 text-[#2f3d2f]" style={{ fontSize: "28px" }}>
            Kiểm tra kiến thức
          </h1>
        </div>
        {/* Progress circle */}
        <div className="relative size-16 shrink-0">
          <svg className="size-16 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e0eef5" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15.9" fill="none" stroke="url(#g1)" strokeWidth="3"
              strokeLinecap="round" strokeDasharray={`${progress} 100`}
              className="transition-all duration-500"
            />
            <defs>
              <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#7fa5b6" />
                <stop offset="1" stopColor="#9ab99a" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center text-xs text-[#3a4a3a]">
            {idx + 1}/{questions.length}
          </div>
        </div>
      </div>

      {/* Question card */}
      <Card key={idx} className="rounded-3xl border border-white/70 bg-gradient-to-br from-[#eef6f1] to-[#e8f0f6] backdrop-blur shadow-lg animate-in fade-in-50 slide-in-from-bottom-2">
        <CardContent className="p-8">
          <div className="text-xs uppercase tracking-[0.2em] text-[#7fa5b6]">Câu hỏi {idx + 1}</div>
          <h2 className="font-serif mt-3 text-[#2f3d2f] leading-snug" style={{ fontSize: "24px" }}>
            {q.question}
          </h2>

          <div className="mt-6 space-y-3">
            {options.map((opt) => {
              const isSelected = selected === opt.key;
              const baseClass = selected === null
                ? "bg-white/70 border-white hover:bg-white hover:border-[#bcd6c8] hover:shadow"
                : isSelected
                  ? "bg-[#cfe1cf] border-[#9ab99a] text-[#2f4a32]"
                  : "bg-white/40 border-white/70 text-[#9ba39d]";
              return (
                <button
                  key={opt.key}
                  onClick={() => choose(opt.key)}
                  disabled={selected !== null}
                  className={`w-full text-left rounded-2xl border-2 px-5 py-4 transition-all flex items-center gap-3 ${baseClass}`}
                >
                  <div className={`size-8 rounded-full grid place-items-center text-sm ${
                    selected === null ? "bg-[#e8f1d8] text-[#3f6048]" :
                    isSelected ? "bg-[#9ab99a] text-white" :
                    "bg-[#ece6d4] text-[#9ba39d]"
                  }`}>
                    {isSelected && selected ? <Check className="size-4" /> : opt.key}
                  </div>
                  <span className="flex-1">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className="mt-6 rounded-2xl bg-white/70 border border-[#cfe1cf] p-4 flex gap-3">
              <Sparkles className="size-4 text-[#3f6048] mt-0.5" />
              <div className="flex-1 text-sm text-[#3a4a3a]">
                Bạn đã chọn đáp án {selected}. Hãy tiếp tục để xem kết quả cuối cùng!
              </div>
              <Button
                onClick={next}
                disabled={submitting}
                className="rounded-full bg-[#3f6048] hover:bg-[#345039] text-white"
              >
                {submitting ? "Đang gửi..." : idx + 1 >= questions.length ? "Hoàn thành" : "Tiếp"}
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-4 text-center text-xs text-[#8a9484]">
        Mẹo: Đừng vội — đọc kỹ các phương án và liên hệ với bài học gốc.
      </div>
    </div>
  );
}
