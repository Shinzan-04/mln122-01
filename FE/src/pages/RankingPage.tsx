import { useEffect, useState } from "react";
import { Medal, RefreshCw, Trophy, User } from "lucide-react";
import { Loading } from "../components/Loading";
import { getRanking } from "../services/philosophyApi";
import type { RankingEntry } from "../types/api";
import { useAuth } from "../context/AuthContext";

const MEDAL_EMOJI = ["🥇", "🥈", "🥉"] as const;
const PODIUM_CLASS = ["gold", "silver", "bronze"] as const;

export function RankingPage(): JSX.Element {
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");
  const { user } = useAuth();

  async function load(): Promise<void> {
    setLoading(true);
    setError("");
    try {
      setEntries(await getRanking());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load().catch(() => {}); }, []);

  const myEntry = user ? (entries.find((e) => e.userId === user.id) ?? null) : null;
  const top3    = entries.slice(0, 3);
  const rest    = entries.slice(3);

  // Podium display order: silver (rank 2) | gold (rank 1) | bronze (rank 3)
  const podiumSlots = [top3[1], top3[0], top3[2]];
  const podiumRanks = [2, 1, 3] as const;

  return (
    <section className="ranking-wrap fade-in">

      {/* ── Header ── */}
      <div className="ranking-header">
        <div className="ranking-header-icon">
          <Trophy size={28} strokeWidth={1.5} />
        </div>
        <div className="ranking-header-text">
          <span className="label-chip"><Medal size={11} /> Leaderboard</span>
          <h2 className="ranking-title">Bảng Xếp Hạng</h2>
          <p className="muted-text" style={{ fontSize: "0.9rem" }}>
            Xem thứ hạng của bạn và mọi người trong các bài quiz.
          </p>
        </div>
        <button
          className="btn btn-ghost btn-sm ranking-refresh-btn"
          onClick={() => load().catch(() => {})}
          disabled={loading}
          title="Làm mới"
        >
          <RefreshCw size={14} className={loading ? "ranking-spin" : ""} />
          {!loading && "Làm mới"}
        </button>
      </div>

      {/* ── My rank card ── */}
      {myEntry && (
        <div className="ranking-my-card">
          <div className="ranking-my-left">
            <span className="ranking-my-label">Xếp hạng</span>
            <span className="ranking-my-rank">#{myEntry.rank}</span>
          </div>
          <div className="ranking-my-center">
            {myEntry.avatarUrl
              ? <img src={myEntry.avatarUrl} alt={myEntry.name} className="ranking-my-avatar" referrerPolicy="no-referrer" />
              : <div className="ranking-my-avatar ranking-avatar-fallback"><User size={18} /></div>
            }
            <span className="ranking-my-name">{myEntry.name}</span>
          </div>
          <div className="ranking-my-right">
            <span className="ranking-my-score-label">Điểm tích lũy</span>
            <span className="ranking-my-score">{myEntry.totalScore.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* ── Loading / Error ── */}
      {loading && (
        <div className="ranking-loading-wrap">
          <Loading text="Đang tải bảng xếp hạng..." />
        </div>
      )}
      {!loading && error && (
        <p className="error-text" style={{ textAlign: "center" }}>{error}</p>
      )}

      {/* ── Podium – top 3 ── */}
      {!loading && top3.length > 0 && (
        <div className="ranking-podium">
          {podiumSlots.map((entry, slotIdx) => {
            if (!entry) return <div key={slotIdx} />;
            const rank = podiumRanks[slotIdx];
            const isMe = user?.id === entry.userId;
            return (
              <div
                key={entry.userId}
                className={`ranking-podium-item ranking-podium-item--${PODIUM_CLASS[rank - 1]}`}
              >
                <span className="ranking-podium-medal">{MEDAL_EMOJI[rank - 1]}</span>
                <div className="ranking-podium-avatar-wrap">
                  {entry.avatarUrl
                    ? <img src={entry.avatarUrl} alt={entry.name} className="ranking-podium-avatar" referrerPolicy="no-referrer" />
                    : <div className="ranking-podium-avatar ranking-avatar-fallback"><User size={22} /></div>
                  }
                  {isMe && <span className="ranking-podium-you-tag">Bạn</span>}
                </div>
                <p className="ranking-podium-name">{entry.name}</p>
                <p className="ranking-podium-score">{entry.totalScore.toLocaleString()} điểm</p>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Rank 4+ list ── */}
      {!loading && rest.length > 0 && (
        <div className="ranking-list">
          {rest.map((entry) => {
            const isMe = user?.id === entry.userId;
            return (
              <div key={entry.userId} className={`ranking-row${isMe ? " ranking-row--me" : ""}`}>
                <span className="ranking-rank-num">{entry.rank}</span>
                <div className="ranking-row-avatar-wrap">
                  {entry.avatarUrl
                    ? <img src={entry.avatarUrl} alt={entry.name} className="ranking-avatar-sm" referrerPolicy="no-referrer" />
                    : <div className="ranking-avatar-sm ranking-avatar-fallback"><User size={14} /></div>
                  }
                </div>
                <span className="ranking-row-name">
                  {entry.name}
                  {isMe && <span className="ranking-you-tag"> · Bạn</span>}
                </span>
                <span className="ranking-row-score">{entry.totalScore.toLocaleString()} điểm</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && !error && entries.length === 0 && (
        <div className="ranking-empty">
          <Trophy size={40} strokeWidth={1.2} />
          <p>Chưa có ai làm bài quiz. Hãy là người đầu tiên!</p>
        </div>
      )}

    </section>
  );
}
