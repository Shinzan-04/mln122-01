import { useEffect, useState } from "react";
import { Crown, Flame, Medal, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { fetchRanking, type RankingDto } from "../lib/api";

// ─── Visual config for the top-3 podium ────────────────────────────────
const podiumStyles = [
  { medal: "Vàng",  color: "from-[#f4e2a8] to-[#e8c46a]", ring: "ring-[#d4a85a]", text: "text-[#7a5d24]" },
  { medal: "Bạc",   color: "from-[#e8e8ec] to-[#c9c9d2]", ring: "ring-[#9ea0ad]", text: "text-[#555]" },
  { medal: "Đồng",  color: "from-[#f0d5bc] to-[#d8a982]", ring: "ring-[#b88563]", text: "text-[#7a4d24]" },
];

export function LeaderboardPage() {
  const [ranking, setRanking] = useState<RankingDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRanking(10)
      .then(setRanking)
      .catch(() => setRanking([]))
      .finally(() => setLoading(false));
  }, []);

  // Split into podium (top 3) and rest
  const top3 = ranking.slice(0, 3);
  const rest = ranking.slice(3);

  return (
    <div className="relative">
      {/* Faint geometric background */}
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="constructivism" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="40" fill="none" stroke="#cfe1cf" strokeWidth="0.6" />
              <rect x="20" y="20" width="80" height="80" fill="none" stroke="#e8d9b4" strokeWidth="0.6" />
              <line x1="0" y1="0" x2="120" y2="120" stroke="#e3dcf5" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#constructivism)" />
        </svg>
      </div>

      <div className="text-center mb-10">
        <Badge className="bg-[#f4e7c5] text-[#7a5d24] border-0 hover:bg-[#f4e7c5]">Tháng 5 · 2026</Badge>
        <h1 className="font-serif mt-3 text-[#2f3d2f]" style={{ fontSize: "36px" }}>Bảng xếp hạng</h1>
        <p className="text-[#7a8473] mt-2">Học chăm — học bền — học cùng nhau.</p>
      </div>

      {/* Top 3 podium — Skeleton or live data */}
      <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto items-end mb-10">
        {loading
          ? [1, 0, 2].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="size-20 rounded-full" />
                <Skeleton className="h-4 w-20 mt-3 rounded" />
                <Skeleton className="h-3 w-14 mt-1 rounded" />
                <Skeleton className={`mt-3 w-full rounded-t-2xl ${i === 1 ? "h-44" : i === 0 ? "h-36" : "h-28"}`} />
              </div>
            ))
          : [1, 0, 2].map((order) => {
              const u = top3[order];
              if (!u) return null;
              const style = podiumStyles[order] ?? podiumStyles[2];
              const podiumHeight = order === 0 ? "h-44" : order === 1 ? "h-36" : "h-28";

              return (
                <div key={u.rank} className="flex flex-col items-center">
                  <div className="relative">
                    {/* GoldCrown icon for index 0 (rank #1) */}
                    {order === 0 && <Crown className="size-6 text-[#d4a85a] absolute -top-7 left-1/2 -translate-x-1/2" />}
                    {/* SilverCrown icon for index 1 (rank #2) */}
                    {order === 1 && <Crown className="size-5 text-[#9ea0ad] absolute -top-6 left-1/2 -translate-x-1/2" />}
                    <Avatar className={`size-20 ring-4 ${style.ring} shadow-lg`}>
                      <AvatarImage src={u.avatarUrl} />
                      <AvatarFallback>{u.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-3 text-center">
                    {/* lblName — maps to data.userName / data.name */}
                    <div className="text-[#2f3d2f]">{u.name}</div>
                    {/* lblScore — maps to data.totalScore */}
                    <div className="text-xs text-[#7a8473]">{u.totalScore.toLocaleString()} XP</div>
                  </div>
                  <div className={`mt-3 w-full ${podiumHeight} rounded-t-2xl bg-gradient-to-b ${style.color} shadow-inner relative grid place-items-center`}>
                    <Medal className={`size-6 ${style.text}`} />
                    <div className={`absolute bottom-2 ${style.text}`} style={{ fontSize: "26px", fontFamily: "serif" }}>
                      {order + 1}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      {/* Rest of ranking list */}
      <Card className="max-w-3xl mx-auto rounded-3xl border border-[#ece6d4] bg-white/70 backdrop-blur">
        <CardContent className="p-2">
          {loading ? (
            <ul className="divide-y divide-[#f1ecdb]">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="flex items-center gap-4 px-4 py-3">
                  <Skeleton className="w-8 h-4 rounded" />
                  <Skeleton className="size-10 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-32 rounded" />
                    <Skeleton className="h-3 w-24 rounded" />
                  </div>
                  <Skeleton className="w-16 h-4 rounded" />
                </li>
              ))}
            </ul>
          ) : rest.length > 0 ? (
            <ul className="divide-y divide-[#f1ecdb]">
              {rest.map((u) => (
                <li
                  key={u.rank}
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl"
                >
                  <div className="w-8 text-center text-[#7a8473]">{u.rank}</div>
                  <Avatar className="size-10">
                    <AvatarImage src={u.avatarUrl} />
                    <AvatarFallback>{u.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    {/* lblName — maps to data.name */}
                    <div className="text-[#2f3d2f]">{u.name}</div>
                    <div className="text-xs text-[#7a8473] flex items-center gap-3">
                      <span className="flex items-center gap-1"><Flame className="size-3 text-[#d49a55]" /> —</span>
                      <span className="flex items-center gap-1"><TrendingUp className="size-3 text-[#3f6048]" /> —</span>
                    </div>
                  </div>
                  {/* lblScore — maps to data.totalScore */}
                  <div className="text-[#3a4a3a]">{u.totalScore.toLocaleString()} <span className="text-xs text-[#8a9484]">XP</span></div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-8 text-center text-sm text-[#7a8473]">Chưa có dữ liệu xếp hạng.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
