import { useEffect, useState } from "react";
import { ArrowRight, Bookmark, ChevronLeft, ChevronRight, Clock, Filter, MessageCircle, Share2, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import {
  fetchTopics, fetchTopicDetail, fetchRelatedTopics, fetchCategories,
  type TopicDto, type TopicDetailDto,
} from "../lib/api";
import { MarkdownRenderer } from "../../components/MarkdownRenderer";

// ─── Pastel fallback ───────────────────────────────────────────────────
const PASTEL_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect fill='%23e8f1d8' width='320' height='180' rx='12'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%233f6048' font-size='14' font-family='serif'%3E📖%3C/text%3E%3C/svg%3E";

const cardThemes = [
  { color: "from-[#cfe1cf] to-[#e8f1d8]", accent: "text-[#3f6048]" },
  { color: "from-[#f4e7c5] to-[#fbf3dc]", accent: "text-[#7a5d24]" },
  { color: "from-[#e3dcf5] to-[#efe8f7]", accent: "text-[#5a4d6e]" },
  { color: "from-[#dbeaf4] to-[#e8f1f8]", accent: "text-[#2d5a7b]" },
];

interface Props {
  onOpenChat: () => void;
  topicId?: number | null;
}

export function TopicPage({ onOpenChat, topicId }: Props) {
  // ─── State ─────────────────────────────────────────────────────────
  const [allTopics, setAllTopics] = useState<TopicDto[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [detail, setDetail] = useState<TopicDetailDto | null>(null);
  const [related, setRelated] = useState<TopicDto[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(topicId ?? null);
  const [progress, setProgress] = useState(0);

  // ─── Load categories on mount ──────────────────────────────────────
  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  // ─── Load topic list ───────────────────────────────────────────────
  useEffect(() => {
    setLoadingList(true);
    fetchTopics(selectedCategory, undefined, 1, 50)
      .then(setAllTopics)
      .catch(() => setAllTopics([]))
      .finally(() => setLoadingList(false));
  }, [selectedCategory]);

  // ─── If topicId prop changes, open that topic ──────────────────────
  useEffect(() => {
    if (topicId) setActiveId(topicId);
  }, [topicId]);

  // ─── Load detail + related when activeId changes ───────────────────
  useEffect(() => {
    if (!activeId) {
      setDetail(null);
      setRelated([]);
      return;
    }
    setLoadingDetail(true);
    setProgress(0);
    Promise.all([
      fetchTopicDetail(activeId),
      fetchRelatedTopics(activeId),
    ])
      .then(([d, r]) => { setDetail(d); setRelated(r); })
      .catch(() => { setDetail(null); setRelated([]); })
      .finally(() => setLoadingDetail(false));
  }, [activeId]);

  // ─── Scroll progress for detail view ───────────────────────────────
  useEffect(() => {
    if (!detail) return;
    const onScroll = () => {
      const el = document.getElementById("topic-scroll");
      if (!el) return;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(Math.min(100, Math.max(0, (el.scrollTop / Math.max(1, max)) * 100)));
    };
    const el = document.getElementById("topic-scroll");
    el?.addEventListener("scroll", onScroll);
    return () => el?.removeEventListener("scroll", onScroll);
  }, [detail]);

  // ═══ Detail View ═══════════════════════════════════════════════════
  if (activeId && (detail || loadingDetail)) {
    return (
      <div className="relative">
        {/* Progress bar */}
        <div className="sticky top-0 z-10 -mx-8 px-8 pt-2 pb-3 bg-gradient-to-b from-[#fdfbf5] to-[#fdfbf5]/0">
          <div className="h-1 rounded-full bg-[#ece6d4] overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#9ab99a] to-[#d4b66a] transition-[width]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <Button variant="ghost" className="mb-4 text-[#5a6557] -ml-2" onClick={() => setActiveId(null)}>
          <ChevronLeft className="size-4 mr-1" /> Tất cả bài học
        </Button>

        {loadingDetail ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-12 w-3/4 rounded-xl" />
            <Skeleton className="h-5 w-1/2 rounded" />
            <div className="mt-8 space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full rounded" />
              ))}
            </div>
          </div>
        ) : detail ? (
          <div id="topic-scroll" className="grid lg:grid-cols-[1fr_240px] gap-10">
            <article className="max-w-4xl w-full">
              <Badge className="bg-[#e8f1d8] text-[#3f6048] hover:bg-[#e8f1d8] border-0">{detail.category}</Badge>
              <h1 className="font-serif mt-4 text-[#2f3d2f] leading-tight" style={{ fontSize: "40px" }}>
                {detail.title}
              </h1>
              <div className="mt-5 flex items-center gap-4 text-sm text-[#7a8473]">
                <div className="flex items-center gap-2">
                  <Avatar className="size-7">
                    <AvatarImage src={`https://i.pravatar.cc/100?u=${detail.author}`} />
                    <AvatarFallback>{detail.author?.[0] ?? "A"}</AvatarFallback>
                  </Avatar>
                  <span className="text-[#3a4a3a]">{detail.author || "Tác giả"}</span>
                </div>
                <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> 12 phút đọc</span>
                <span>· Cập nhật {new Date(detail.createdAt).toLocaleDateString("vi-VN")}</span>
              </div>

              {/* Article content */}
              <div className="mt-8 space-y-6 text-[#2f3d2f] leading-relaxed prose prose-green max-w-none">
                <MarkdownRenderer content={detail.content || detail.summary || ""} />
              </div>

              {/* Related topics */}
              {related.length > 0 && (
                <div className="mt-10 border-t border-[#ece6d4] pt-6">
                  <h3 className="font-serif text-[#2f3d2f] mb-4" style={{ fontSize: "20px" }}>Bài liên quan</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {related.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setActiveId(r.id)}
                        className="text-left rounded-2xl border border-[#ece6d4] bg-white/60 p-4 hover:shadow transition group"
                      >
                        <div className="text-sm text-[#2f3d2f] group-hover:text-[#3f6048]">{r.title}</div>
                        <p className="text-xs text-[#7a8473] mt-1 line-clamp-2">{r.summary}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 flex items-center justify-between border-t border-[#ece6d4] pt-6">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="rounded-full text-[#5a6557] hover:bg-[#f1ecdb]">
                    <Bookmark className="size-4 mr-1.5" /> Lưu
                  </Button>
                  <Button variant="ghost" className="rounded-full text-[#5a6557] hover:bg-[#f1ecdb]">
                    <Share2 className="size-4 mr-1.5" /> Chia sẻ
                  </Button>
                </div>
                <Button className="rounded-full bg-[#3f6048] hover:bg-[#345039] text-white">
                  Bài tiếp theo
                  <ChevronRight className="size-4 ml-1" />
                </Button>
              </div>
            </article>

            {/* Sophia sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-10">
                <div className="rounded-2xl bg-gradient-to-br from-[#e7e0f5] to-[#f5edf2] p-4 border border-white">
                  <div className="flex items-center gap-2 text-[#5a4d6e]">
                    <Sparkles className="size-4" />
                    <span className="text-sm">Sophia gợi ý</span>
                  </div>
                  <p className="text-xs text-[#5a4d6e]/80 mt-2 leading-relaxed">
                    Bạn đang đọc một đoạn khó. Hỏi Sophia để được giải thích bằng ví dụ đời thường.
                  </p>
                  <Button onClick={onOpenChat} size="sm" className="mt-3 w-full rounded-full bg-[#5a4d6e] hover:bg-[#4a3f5c] text-white">
                    <MessageCircle className="size-3.5 mr-1.5" /> Hỏi Sophia
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="text-center py-20 text-[#7a8473]">Không tìm thấy bài học.</div>
        )}

        {/* Floating Ask AI */}
        <button
          onClick={onOpenChat}
          className="fixed bottom-8 right-8 z-20 group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5a4d6e] to-[#7a6b8e] text-white pl-4 pr-5 py-3 shadow-xl shadow-[#5a4d6e]/30 hover:shadow-2xl transition"
        >
          <Sparkles className="size-4" />
          <span className="text-sm">Hỏi AI</span>
        </button>
      </div>
    );
  }

  // ═══ List View — all topics from /api/Topics ═══════════════════════
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-[#2f3d2f]" style={{ fontSize: "32px" }}>Bài học</h1>
          <p className="text-sm text-[#7a8473] mt-1">Khám phá tất cả chuyên đề triết học.</p>
        </div>
      </div>

      {/* Category filter pills — from /api/Topics/categories */}
      {categories.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-6">
          <button
            onClick={() => setSelectedCategory(undefined)}
            className={`text-xs px-4 py-2 rounded-full border transition ${
              !selectedCategory
                ? "bg-[#3f6048] text-white border-[#3f6048]"
                : "bg-white/60 text-[#5a6557] border-[#ece6d4] hover:bg-white"
            }`}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-4 py-2 rounded-full border transition ${
                selectedCategory === cat
                  ? "bg-[#3f6048] text-white border-[#3f6048]"
                  : "bg-white/60 text-[#5a6557] border-[#ece6d4] hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Topic grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loadingList
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="rounded-3xl border border-white/60 bg-white/40 backdrop-blur">
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-36 w-full rounded-xl" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                  <Skeleton className="h-6 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                </CardContent>
              </Card>
            ))
          : allTopics.length > 0
            ? allTopics.map((t, i) => {
                const theme = cardThemes[i % cardThemes.length];
                return (
                  <Card
                    key={t.id}
                    onClick={() => setActiveId(t.id)}
                    className={`group cursor-pointer rounded-3xl border border-white/60 bg-gradient-to-br ${theme.color} backdrop-blur shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all`}
                  >
                    <CardContent className="p-5">
                      <img
                        src={t.thumbnailUrl || PASTEL_PLACEHOLDER}
                        alt={t.title}
                        className="w-full h-36 object-cover rounded-xl mb-3"
                        onError={(e) => { (e.target as HTMLImageElement).src = PASTEL_PLACEHOLDER; }}
                      />
                      <Badge variant="secondary" className={`bg-white/70 ${theme.accent} border-0`}>
                        {t.category}
                      </Badge>
                      <h3 className="font-serif mt-3 text-[#2f3d2f]" style={{ fontSize: "18px" }}>
                        {t.title}
                      </h3>
                      <p className="text-sm text-[#5a6557] mt-1.5 line-clamp-2">{t.summary}</p>
                      <div className="mt-4 flex items-center justify-end text-xs text-[#3f6048] group-hover:translate-x-1 transition">
                        Đọc bài <ArrowRight className="size-3.5 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            : (
              <div className="col-span-full text-center py-16 text-[#7a8473]">
                <Filter className="size-8 mx-auto mb-3 text-[#ece6d4]" />
                <p>Chưa có bài học nào{selectedCategory ? ` trong "${selectedCategory}"` : ""}.</p>
              </div>
            )}
      </div>

      {/* Floating Ask AI */}
      <button
        onClick={onOpenChat}
        className="fixed bottom-8 right-8 z-20 group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5a4d6e] to-[#7a6b8e] text-white pl-4 pr-5 py-3 shadow-xl shadow-[#5a4d6e]/30 hover:shadow-2xl transition"
      >
        <Sparkles className="size-4" />
        <span className="text-sm">Hỏi AI</span>
      </button>
    </div>
  );
}
