import { useEffect, useState, useRef } from "react";
import { BookOpen, Brain } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { searchEverything, type TopicDto, type QuizQuestionDto } from "../lib/api";

interface Props {
  query: string;
  onSelectTopic: (id: number) => void;
  onSelectQuiz: () => void;
  onClear: () => void;
}

export function SearchDropdown({ query, onSelectTopic, onSelectQuiz, onClear }: Props) {
  const [topics, setTopics] = useState<TopicDto[]>([]);
  const [quiz, setQuiz] = useState<QuizQuestionDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Don't render if no query
  if (!query.trim()) return null;

  const hasResults = topics.length > 0 || quiz.length > 0;

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-white/98 backdrop-blur-xl border border-[#ece6d4] shadow-xl shadow-[#2f3d2f]/8 overflow-hidden z-50"
    >
      <div className="max-h-[50vh] overflow-y-auto">
        {loading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-7 rounded-lg" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3.5 w-3/4 rounded" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : !hasResults && searched ? (
          <div className="p-6 text-center text-sm text-[#8a9484]">
            Không tìm thấy kết quả cho "{query}"
          </div>
        ) : (
          <div className="py-2">
            {/* Topic results */}
            {topics.length > 0 && (
              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#8a9484] px-4 py-1.5 flex items-center gap-1.5">
                  <BookOpen className="size-3" /> Bài học ({topics.length})
                </div>
                {topics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { onSelectTopic(t.id); onClear(); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#e8f1d8]/40 transition flex items-start gap-3 group"
                  >
                    <div className="size-7 rounded-lg bg-[#e8f1d8] grid place-items-center shrink-0 mt-0.5">
                      <BookOpen className="size-3.5 text-[#3f6048]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#2f3d2f] group-hover:text-[#3f6048] truncate">{t.title}</div>
                      <p className="text-xs text-[#7a8473] line-clamp-1 mt-0.5">{t.summary}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ece6d4]/60 text-[#7a8473] shrink-0 mt-1">
                      {t.category}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Quiz results */}
            {quiz.length > 0 && (
              <div>
                {topics.length > 0 && <div className="h-px bg-[#ece6d4]/60 mx-4 my-1" />}
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#8a9484] px-4 py-1.5 flex items-center gap-1.5">
                  <Brain className="size-3" /> Câu hỏi ({quiz.length})
                </div>
                {quiz.slice(0, 5).map((q) => (
                  <button
                    key={q.id}
                    onClick={() => { onSelectQuiz(); onClear(); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#e0eef5]/40 transition flex items-start gap-3 group"
                  >
                    <div className="size-7 rounded-lg bg-[#e0eef5] grid place-items-center shrink-0 mt-0.5">
                      <Brain className="size-3.5 text-[#2c5a72]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#2f3d2f] group-hover:text-[#2c5a72] line-clamp-1">{q.question}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
