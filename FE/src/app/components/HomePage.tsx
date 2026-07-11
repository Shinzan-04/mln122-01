import { useEffect, useState } from "react";
import { ArrowRight, BookMarked, Flame, Globe2, GraduationCap, Sparkles, TrendingUp, Quote } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import {
  fetchHomepage, fetchRanking,
  type HomepageDataDto, type TopicDto, type RankingDto,
} from "../lib/api";

// ─── Color palette for topic cards ─────────────────────────────────────
const cardThemes = [
  { color: "from-[#cfe1cf] to-[#e8f1d8]", accent: "text-[#3f6048]" },
  { color: "from-[#f4e7c5] to-[#fbf3dc]", accent: "text-[#7a5d24]" },
  { color: "from-[#e3dcf5] to-[#efe8f7]", accent: "text-[#5a4d6e]" },
  { color: "from-[#dbeaf4] to-[#e8f1f8]", accent: "text-[#2d5a7b]" },
];

// Default pastel placeholder
const PASTEL_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect fill='%23e8f1d8' width='320' height='180' rx='12'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%233f6048' font-size='14' font-family='serif'%3E📖 Triết học%3C/text%3E%3C/svg%3E";

interface Props {
  onStart: (topicId?: number) => void;
  onViewLeaderboard?: () => void;
}

export function HomePage({ onStart, onViewLeaderboard }: Props) {
  const [homepage, setHomepage] = useState<HomepageDataDto | null>(null);
  const [learners, setLearners] = useState<RankingDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingLearners, setLoadingLearners] = useState(true);

  useEffect(() => {
    fetchHomepage()
      .then(setHomepage)
      .catch(() => setHomepage(null))
      .finally(() => setLoading(false));

    fetchRanking(4)
      .then(setLearners)
      .catch(() => setLearners([]))
      .finally(() => setLoadingLearners(false));
  }, []);

  const featured: TopicDto[] = homepage?.featuredTopics ?? [];
  const hero = homepage?.hero;
  const timeline = homepage?.timeline ?? [];
  const quotes = homepage?.quotes ?? [];

  return (
    <div className="space-y-10">
      {/* ═══ Hero — from /api/Homepage hero ═══ */}
      <section className="relative overflow-hidden rounded-3xl border border-[#ece6d4] bg-gradient-to-br from-[#f5f0e0] via-[#fdfbf5] to-[#e6efe2] p-8 md:p-12">
        <div className="absolute -top-16 -right-10 size-64 rounded-full bg-[#cfe1cf]/40 blur-3xl" />
        <div className="absolute bottom-0 -left-20 size-72 rounded-full bg-[#e8d9b4]/40 blur-3xl" />
        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge className="bg-white/70 text-[#5a6557] hover:bg-white/70 border border-[#dcd5c0] backdrop-blur">
              <Sparkles className="size-3.5 mr-1.5" />
              Phiên bản 2026 · AI Sophia mới
            </Badge>
            {loading ? (
              <div className="mt-5 space-y-3">
                <Skeleton className="h-12 w-4/5 rounded-xl" />
                <Skeleton className="h-5 w-full rounded" />
                <Skeleton className="h-5 w-3/4 rounded" />
              </div>
            ) : (
              <>
                <h1 className="font-serif mt-5 text-[#2f3d2f] leading-tight" style={{ fontSize: "44px" }}>
                  {hero?.title || "Học triết học theo cách"} <em className="text-[#7a5d24]">{hero?.description || "tinh tế nhất."}</em>
                </h1>
                <p className="mt-4 text-[#5a6557] max-w-md">
                  Từ Marx, Engels đến Lenin — khám phá tư tưởng kinh điển qua những bài học được
                  thiết kế cho thế hệ học giả trẻ, đồng hành cùng trợ lý AI Sophia.
                </p>
              </>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              <Button onClick={() => onStart()} className="rounded-full bg-[#3f6048] hover:bg-[#345039] text-white px-6">
                Bắt đầu hành trình
                <ArrowRight className="size-4 ml-1" />
              </Button>
              <Button variant="outline" className="rounded-full border-[#d6cfb8] bg-white/60 backdrop-blur text-[#3a4a3a] hover:bg-white">
                Xem giới thiệu
              </Button>
            </div>

            <div className="mt-8 flex gap-6 text-sm text-[#6b7466]">
              <div><span className="text-[#2f3d2f]">{featured.length || 28}</span> chuyên đề</div>
              <div><span className="text-[#2f3d2f]">12k+</span> học viên</div>
              <div><span className="text-[#2f3d2f]">98%</span> hài lòng</div>
            </div>
          </div>

          {/* 3D-ish illustration */}
          <div className="relative h-72 md:h-96">
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute top-0 right-4 size-40 rounded-full bg-gradient-to-br from-[#bcd6e0] to-[#7fa5b6] shadow-2xl shadow-[#7fa5b6]/30">
                  <div className="absolute inset-3 rounded-full border border-white/30" />
                  <div className="absolute inset-x-3 top-1/2 h-px bg-white/40" />
                  <div className="absolute inset-y-3 left-1/2 w-px bg-white/40" />
                  <div className="absolute top-6 left-8 w-10 h-6 rounded-full bg-[#9bbf9b]/70" />
                  <div className="absolute bottom-10 right-6 w-8 h-5 rounded-full bg-[#9bbf9b]/70" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 rounded-2xl bg-gradient-to-b from-[#e8d9b4] to-[#c9a96a] shadow-xl">
                  <div className="flex items-end gap-2 h-32 px-2">
                    <div className="w-5 h-28 rounded bg-[#cfe1cf]" />
                    <div className="w-5 h-24 rounded bg-[#e8b8b8]" />
                    <div className="w-5 h-32 rounded bg-[#bcd6e0]" />
                    <div className="w-5 h-20 rounded bg-[#f1d99c]" />
                    <div className="w-5 h-28 rounded bg-[#d6c4ec]" />
                    <div className="w-5 h-24 rounded bg-[#cfe1cf]" />
                    <div className="w-5 h-30 rounded bg-[#e8b8b8]" />
                    <div className="w-5 h-26 rounded bg-[#bcd6e0]" />
                    <div className="w-5 h-22 rounded bg-[#f1d99c]" />
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-[#a8884a]/40" />
                </div>
                <div className="absolute top-4 left-2 size-10 rounded-tl-full rounded-br-full bg-[#cfe1cf] shadow-md rotate-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Featured Topics — from /api/Homepage featuredTopics ═══ */}
      <section>
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#8a9484]">Khám phá</div>
            <h2 className="font-serif text-[#2f3d2f]" style={{ fontSize: "28px" }}>Chủ đề nổi bật</h2>
          </div>
          <button className="text-sm text-[#3f6048] hover:underline">Xem tất cả →</button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="rounded-3xl border border-white/60 bg-white/40 backdrop-blur">
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-24 rounded-full" />
                      <Skeleton className="size-5 rounded" />
                    </div>
                    <Skeleton className="h-6 w-full rounded-md mt-2" />
                    <Skeleton className="h-4 w-5/6 rounded-md" />
                  </CardContent>
                </Card>
              ))
            : featured.map((t, i) => {
                const theme = cardThemes[i % cardThemes.length];
                return (
                  <Card
                    key={t.id}
                    onClick={() => onStart(t.id)}
                    className={`group cursor-pointer rounded-3xl border border-white/60 bg-gradient-to-br ${theme.color} backdrop-blur shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all`}
                  >
                    <CardContent className="p-6">
                      <img
                        src={t.thumbnailUrl || PASTEL_PLACEHOLDER}
                        alt={t.title}
                        className="w-full h-32 object-cover rounded-xl mb-4"
                        onError={(e) => { (e.target as HTMLImageElement).src = PASTEL_PLACEHOLDER; }}
                      />
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className={`bg-white/70 ${theme.accent} border-0`}>
                          {t.category}
                        </Badge>
                        <BookMarked className={`size-5 ${theme.accent}`} />
                      </div>
                      <h3 className="font-serif mt-5 text-[#2f3d2f]" style={{ fontSize: "20px" }}>
                        {t.title}
                      </h3>
                      <p className="text-sm text-[#5a6557] mt-2 line-clamp-2">{t.summary}</p>
                      <div className="mt-6 flex items-center justify-between text-xs text-[#5a6557]">
                        <span>{t.category}</span>
                        <span className="flex items-center gap-1 text-[#3f6048] group-hover:translate-x-1 transition">
                          Vào học <ArrowRight className="size-3.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
        </div>
      </section>

      {/* ═══ Timeline — from /api/Homepage timeline ═══ */}
      {timeline.length > 0 && (
        <section>
          <div className="mb-5">
            <div className="text-xs uppercase tracking-[0.2em] text-[#8a9484]">Dòng thời gian</div>
            <h2 className="font-serif text-[#2f3d2f]" style={{ fontSize: "28px" }}>Những mốc lịch sử</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {timeline.map((item, i) => (
              <Card key={i} className="min-w-[220px] rounded-2xl border border-[#ece6d4] bg-gradient-to-br from-[#fbf7e9] to-white/70 backdrop-blur shadow-sm flex-shrink-0">
                <CardContent className="p-5">
                  <div className="font-serif text-[#d4b66a]" style={{ fontSize: "28px" }}>{item.year}</div>
                  <p className="text-sm text-[#5a6557] mt-2">{item.event}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* ═══ Quotes — from /api/Homepage quotes ═══ */}
      {quotes.length > 0 && (
        <section>
          <div className="grid md:grid-cols-2 gap-4">
            {quotes.map((q, i) => (
              <div
                key={i}
                className="rounded-2xl bg-gradient-to-r from-[#f4e7c5]/60 to-[#fbf3dc]/40 border-l-4 border-[#d4b66a] px-6 py-5"
              >
                <Quote className="size-5 text-[#d4b66a] mb-2" />
                <p className="italic text-[#5a4d24] leading-relaxed">"{q.text}"</p>
                <div className="mt-3 text-sm text-[#7a5d24]">— {q.author}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══ Two column: progress + top learners (from /api/Ranking) ═══ */}
      <section className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 rounded-3xl border border-[#ece6d4] bg-white/60 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#8a9484]">Tiến độ tuần này</div>
                <h3 className="font-serif text-[#2f3d2f]" style={{ fontSize: "22px" }}>Tiếp tục từ nơi bạn dừng</h3>
              </div>
              <Flame className="size-6 text-[#d49a55]" />
            </div>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { title: "Phép biện chứng duy vật", value: 72, color: "bg-[#9ab99a]" },
                { title: "Học thuyết hình thái KT-XH", value: 41, color: "bg-[#d4b66a]" },
              ].map((p) => (
                <div key={p.title} className="rounded-2xl bg-[#fbf7e9]/80 p-4 border border-[#ece6d4]">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#3a4a3a]">{p.title}</span>
                    <span className="text-[#7a8473]">{p.value}%</span>
                  </div>
                  <Progress value={p.value} className="mt-3 h-2 bg-[#ece6d4]" />
                  <button className="mt-3 text-xs text-[#3f6048] hover:underline">Tiếp tục →</button>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-[#5a6557]">
              <TrendingUp className="size-4 text-[#3f6048]" />
              Bạn đã học <span className="text-[#2f3d2f]">4 giờ 12 phút</span> tuần này — nhiều hơn 28% so với tuần trước.
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-[#ece6d4] bg-gradient-to-b from-white/70 to-[#fbf3dc]/40 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#8a9484]">Cộng đồng</div>
                <h3 className="font-serif text-[#2f3d2f]" style={{ fontSize: "22px" }}>Top học viên</h3>
              </div>
              <GraduationCap className="size-5 text-[#7a5d24]" />
            </div>
            <ul className="mt-5 space-y-3">
              {loadingLearners
                ? Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Skeleton className="size-7 rounded-full" />
                      <Skeleton className="size-8 rounded-full" />
                      <Skeleton className="flex-1 h-4 rounded" />
                      <Skeleton className="w-12 h-3 rounded" />
                    </li>
                  ))
                : learners.map((l) => (
                    <li key={l.rank} className="flex items-center gap-3">
                      <div className={`size-7 rounded-full grid place-items-center text-xs ${
                        l.rank === 1 ? "bg-[#f1d99c] text-[#7a5d24]" :
                        l.rank === 2 ? "bg-[#dfdfdf] text-[#555]" :
                        l.rank === 3 ? "bg-[#e8c5a8] text-[#7a4d24]" :
                        "bg-[#ece6d4] text-[#7a8473]"
                      }`}>{l.rank}</div>
                      <Avatar className="size-8">
                        <AvatarImage src={l.avatarUrl} />
                        <AvatarFallback>{l.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-sm text-[#3a4a3a]">{l.name}</div>
                      <div className="text-xs text-[#7a8473]">{l.totalScore.toLocaleString()} XP</div>
                    </li>
                  ))}
            </ul>
            <Button
              variant="outline"
              className="mt-5 w-full rounded-full border-[#d6cfb8] bg-white/60 hover:bg-white"
              onClick={onViewLeaderboard}
            >
              <Globe2 className="size-4 mr-1.5" />
              Xem bảng xếp hạng
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
