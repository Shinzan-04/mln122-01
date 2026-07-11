import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { Loading } from "../components/Loading";
import { getTopicCategories, getTopics } from "../services/philosophyApi";
import type { Topic } from "../types/api";

export function TopicsPage(): JSX.Element {
  const [topics,     setTopics]     = useState<Topic[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category,   setCategory]   = useState<string>("");
  const [search,     setSearch]     = useState<string>("");
  const [loading,    setLoading]    = useState<boolean>(true);
  const [error,      setError]      = useState<string>("");

  async function loadData(cat?: string, kw?: string): Promise<void> {
    setLoading(true);
    setError("");
    try {
      const [topicData, catData] = await Promise.all([
        getTopics({ category: cat, search: kw, page: 1, pageSize: 24 }),
        categories.length ? Promise.resolve(categories) : getTopicCategories()
      ]);
      setTopics(topicData);
      if (!categories.length) setCategories(catData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData().catch(() => undefined); }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    loadData(category, search).catch(() => undefined);
  }

  function selectCategory(cat: string): void {
    setCategory(cat);
    loadData(cat, search).catch(() => undefined);
  }

  return (
    <section className="stack-md fade-in">

      {/* Page intro */}
      <div className="page-intro">
        <span className="label-chip"><BookOpen size={12} /> Topic Library</span>
        <h2>Kho chủ đề Kinh tế Chính trị</h2>
        <p className="muted-text">
          Tìm kiếm theo từ khóa hoặc lọc theo danh mục để khám phá các trường phái tư tưởng.
        </p>
      </div>

      {/* Filter bar */}
      <div className="surface-block" style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <form onSubmit={onSubmit}>
          <div className="filter-wrap">
            <div className="input-group">
              <span className="input-icon"><Search size={15} /></span>
              <input
                className="with-icon"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm theo từ khóa..."
                aria-label="Tìm chủ đề"
              />
            </div>
            <button className="btn btn-primary" type="submit">
              <Search size={15} />
              Tìm kiếm
            </button>
          </div>
        </form>

        {/* Category chips */}
        {categories.length > 0 && (
          <div className="category-chips-wrap">
            <span className="category-chips-label">
              <SlidersHorizontal size={13} />
              Danh mục:
            </span>
            <div className="category-chips">
              <button
                type="button"
                className={`category-chip${category === "" ? " category-chip--active" : ""}`}
                onClick={() => selectCategory("")}
              >
                Tất cả
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`category-chip${category === c ? " category-chip--active" : ""}`}
                  onClick={() => selectCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && <p className="error-text">{error}</p>}
      </div>

      {/* Loading */}
      {loading && <Loading text="Đang tải danh sách chủ đề..." />}

      {/* Topics grid */}
      {!loading && topics.length > 0 && (
        <div className="topic-grid stagger-grid">
          {topics.map((topic) => (
            <Link key={topic.id} to={`/topics/${topic.id}`} className="topic-card">
              <div className="topic-card-header">
                <span className="chip-soft">{topic.category}</span>
                <div className="topic-thumb-wrap">
                  {topic.thumbnailUrl ? (
                    <img
                      src={topic.thumbnailUrl}
                      alt={topic.title}
                      className="topic-thumb"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : (
                    <span className="topic-thumb-fallback">📖</span>
                  )}
                </div>
              </div>
              <div className="topic-card-body">
                <h3 className="topic-title">{topic.title}</h3>
                <p className="topic-desc">{topic.summary}</p>
              </div>
              <div className="topic-footer">
                <span className="text-link">
                  Đọc chi tiết <ChevronRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && topics.length === 0 && (
        <div className="surface-block" style={{ textAlign: "center", padding: "60px 40px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
          <h3 style={{ marginBottom: "8px" }}>Không tìm thấy chủ đề</h3>
          <p className="muted-text">Thử xóa bộ lọc hoặc nhập từ khóa khác.</p>
        </div>
      )}

    </section>
  );
}