import { useEffect, useState } from "react";
import { BookOpen, Brain, Search, X } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { searchEverything, type TopicDto, type QuizQuestionDto } from "../lib/api";

interface Props {
  open: boolean;
  query: string;
  onClose: () => void;
  onSelectTopic: (id: number) => void;
  onSelectQuiz: () => void;
}

export function SearchOverlay({ open, query, onClose, onSelectTopic, onSelectQuiz }: Props) {
  const [topics, setTopics] = useState<TopicDto[]>([]);
  const [quiz, setQuiz] = useState<QuizQuestionDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Debounced search — calls GET /api/Search?keyword=...
  useEffect(() => {
    if (!query.trim()) {
      setTopics([]);
      setQuiz([]);
      setSearched(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const result = await searchEverything(query);
        setTopics(result.topics ?? []);
        setQuiz(result.quiz ?? []);
      } catch {
        setTopics([]);
        setQuiz([]);
      } finally {
        setLoading(false);
        setSearched(true);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  if (!open) return null;

  const hasResults = topics.length > 0 || quiz.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-20 bg-[#2f3d2f]/20 backdrop-blur-sm" onClick={onClose} />

      {/* Results panel */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-4">
        <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-[#ece6d4] shadow-2xl shadow-[#2f3d2f]/10 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#ece6d4] flex items-center gap-3">
            <Search className="size-4 text-[#8a9484]" />
            <span className="text-sm text-[#5a6557]">
              {query ? `Kết quả cho "${query}"` : "Bắt đầu tìm kiếm..."}
            </span>
            <button onClick={onClose} className="ml-auto text-[#8a9484] hover:text-[#3a4a3a]">
              <X className="size-4" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="p-6 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-lg" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-4 w-3/4 rounded" />
                      <Skeleton className="h-3 w-1/2 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !query.trim() ? (
              <div className="p-8 text-center text-sm text-[#8a9484]">
                Nhập từ khóa để tìm bài học hoặc câu hỏi trắc nghiệm.
              </div>
            ) : !hasResults && searched ? (
              <div className="p-8 text-center text-sm text-[#8a9484]">
                Không tìm thấy kết quả cho "{query}".
              </div>
            ) : (
              <div className="p-4">
                {/* Topic results */}
                {topics.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs uppercase tracking-[0.15em] text-[#8a9484] px-2 mb-2 flex items-center gap-1.5">
                      <BookOpen className="size-3" /> Bài học ({topics.length})
                    </div>
                    <ul className="space-y-1">
                      {topics.map((t) => (
                        <li key={t.id}>
                          <button
                            onClick={() => onSelectTopic(t.id)}
                            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#e8f1d8]/50 transition flex items-start gap-3 group"
                          >
                            <div className="size-8 rounded-lg bg-[#e8f1d8] grid place-items-center shrink-0 mt-0.5">
                              <BookOpen className="size-3.5 text-[#3f6048]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-[#2f3d2f] group-hover:text-[#3f6048] truncate">{t.title}</div>
                              <p className="text-xs text-[#7a8473] line-clamp-1 mt-0.5">{t.summary}</p>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ece6d4] text-[#7a8473] shrink-0 mt-1">
                              {t.category}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quiz results */}
                {quiz.length > 0 && (
                  <div>
                    <div className="text-xs uppercase tracking-[0.15em] text-[#8a9484] px-2 mb-2 flex items-center gap-1.5">
                      <Brain className="size-3" /> Câu hỏi trắc nghiệm ({quiz.length})
                    </div>
                    <ul className="space-y-1">
                      {quiz.map((q) => (
                        <li key={q.id}>
                          <button
                            onClick={onSelectQuiz}
                            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#e0eef5]/50 transition flex items-start gap-3 group"
                          >
                            <div className="size-8 rounded-lg bg-[#e0eef5] grid place-items-center shrink-0 mt-0.5">
                              <Brain className="size-3.5 text-[#2c5a72]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-[#2f3d2f] group-hover:text-[#2c5a72] line-clamp-2">{q.question}</div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
