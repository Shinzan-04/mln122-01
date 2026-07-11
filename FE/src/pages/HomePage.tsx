import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Brain, ChevronLeft, ChevronRight, Clock, MessageCircle, Sparkles,
} from "lucide-react";
import { Loading } from "../components/Loading";
import { getHomepageData } from "../services/philosophyApi";
import type { HomepageData } from "../types/api";

const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
];

export function HomePage(): JSX.Element {
  const [data,           setData]           = useState<HomepageData | null>(null);
  const [error,          setError]          = useState<string>("");
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    getHomepageData()
      .then(setData)
      .catch((e: Error) => setError(e.message));
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const t = setInterval(
      () => setActiveImageIdx(i => (i + 1) % CAROUSEL_IMAGES.length),
      4500
    );
    return () => clearInterval(t);
  }, []);

  const prevSlide = () =>
    setActiveImageIdx(i => (i - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  const nextSlide = () =>
    setActiveImageIdx(i => (i + 1) % CAROUSEL_IMAGES.length);

  if (error) return (
    <section className="surface-block">
      <p className="error-text">Không tải được dữ liệu: {error}</p>
    </section>
  );

  if (!data) return <Loading text="Đang nạp dữ liệu..." />;

  return (
    <div className="hp-root fade-in">

      {/* ── Hero v2 ── */}
      <section className="hero-v2">
        {/* Left */}
        <div className="hero-v2-left">
          <span className="hero-v2-badge">
            <Sparkles size={12} />
            EdTech Platform 2026
          </span>
          <h1 className="hero-v2-title">
            <span className="hero-v2-purple">Khám phá</span>
            {"\n"}
            <span className="hero-v2-pink">Lợi ích kinh tế &</span>
            {"\n"}
            <span className="hero-v2-dark">Chuỗi giá trị Cà phê</span>
          </h1>
          {/* Chương 3, Phần II – Giáo trình KTCT Mác–Lênin, Bộ GD&ĐT 2021 */}

          <p className="hp-desc">
            {data.hero.description || "Nền tảng học tập hiện đại giúp sinh viên đại học nắm vững kiến thức lý thuyết một cách dễ dàng và thú vị."}
          </p>

          <div className="hp-v2-actions">
            <Link to="/topics" className="hp-v2-btn-primary">
              Bắt đầu học →
            </Link>
            <Link to="/quiz" className="hp-v2-btn-ghost">
              <Brain size={16} /> Làm Quiz
            </Link>
          </div>
        </div>

        {/* Carousel trong khung ảnh */}
        <div className="hp-hero-right">
          <div className="hp-v2-img-frame">
            {/* Slides */}
            <div className="hp-carousel-slides">
              {CAROUSEL_IMAGES.map((url, idx) => (
                <div
                  key={url}
                  className={`hp-carousel-slide${idx === activeImageIdx ? " active" : ""}`}
                  style={{ backgroundImage: `url(${url})` }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <button type="button" className="hp-carousel-btn hp-carousel-btn--prev" onClick={prevSlide} aria-label="Ảnh trước">
              <ChevronLeft size={18} />
            </button>
            <button type="button" className="hp-carousel-btn hp-carousel-btn--next" onClick={nextSlide} aria-label="Ảnh tiếp theo">
              <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div className="hp-carousel-dots">
              {CAROUSEL_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`hp-carousel-dot${idx === activeImageIdx ? " active" : ""}`}
                  onClick={() => setActiveImageIdx(idx)}
                  aria-label={`Ảnh ${idx + 1}`}
                />
              ))}
            </div>

            {/* Stat chip góc dưới trái — như screenshot */}
            <div className="hp-v2-stat-chip">
              <span className="hp-v2-stat-num">5,000+</span>
              <span className="hp-v2-stat-label">Sinh viên đã học</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED TOPICS
      ══════════════════════════════════════════ */}
      {data.featuredTopics.length > 0 && (
        <section className="hp-section">
          <div className="hp-section-head">
            <div>
              <h2 className="hp-section-title">Chủ đề nổi bật</h2>
              <p className="hp-section-sub">Các bài viết được chọn lọc từ kho chủ đề</p>
            </div>
            <Link to="/topics" className="text-link">
              Xem tất cả ({data.featuredTopics.length}) <ChevronRight size={14}/>
            </Link>
          </div>

          <div className="topic-grid">
            {data.featuredTopics.slice(0, 4).map((topic) => (
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
                  <span className="text-link">Đọc chi tiết <ChevronRight size={13}/></span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          TIMELINE + QUOTES
      ══════════════════════════════════════════ */}
      {(data.timeline.length > 0 || data.quotes.length > 0) && (
        <section className="surface-block">
          <div className="two-col">
            {data.timeline.length > 0 && (
              <div className="stack-md">
                <div className="section-head">
                  <h3 style={{ fontSize: "1.1rem" }}>
                    <Clock size={16} style={{ display:"inline", marginRight:"8px", verticalAlign:"middle", color:"var(--theme-muted)" }}/>
                    Dòng thời gian
                  </h3>
                </div>
                <ul className="timeline-list">
                  {data.timeline.map((item) => (
                    <li key={`${item.year}-${item.event}`} className="timeline-item">
                      <span className="timeline-dot" />
                      <span className="timeline-year">{item.year}</span>
                      <span className="timeline-event">{item.event}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.quotes.length > 0 && (
              <div className="stack-md">
                <div className="section-head">
                  <h3 style={{ fontSize: "1.1rem" }}>✦ Trích dẫn nổi bật</h3>
                </div>
                <div className="quote-wall">
                  {data.quotes.map((quote) => (
                    <div key={`${quote.author}-${quote.text}`} className="quote-card">
                      <span className="quote-mark">"</span>
                      <p className="quote-text">{quote.text}</p>
                      <p className="quote-author">— {quote.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          CTA STRIP — 3 hành động chính
      ══════════════════════════════════════════ */}
      <section className="hp-cta-strip">
        <div className="hp-cta-strip-head">
          <h2 className="hp-cta-strip-title">Bắt đầu hành trình học tập</h2>
          <p className="hp-cta-strip-sub">
            Chọn cách học phù hợp với bạn
          </p>
        </div>

        <div className="hp-cta-cards">
          <Link to="/topics" className="hp-cta-card">
            <div className="hp-cta-card-icon">
              <BookOpen size={30} strokeWidth={1.5}/>
            </div>
            <h3 className="hp-cta-card-title">Đọc chủ đề</h3>
            <p className="hp-cta-card-desc">
              10 bài viết chuyên sâu, đầy đủ tài liệu tham khảo
            </p>
            <span className="hp-cta-card-link">Khám phá →</span>
          </Link>

          <Link to="/quiz" className="hp-cta-card hp-cta-card--primary">
            <div className="hp-cta-card-icon">
              <Brain size={30} strokeWidth={1.5}/>
            </div>
            <h3 className="hp-cta-card-title">Làm Quiz</h3>
            <p className="hp-cta-card-desc">
              40+ câu hỏi ngẫu nhiên, 20 câu mỗi lần, 15 phút
            </p>
            <span className="hp-cta-card-link">Thử ngay →</span>
          </Link>

          <Link to="/chatbot" className="hp-cta-card">
            <div className="hp-cta-card-icon">
              <MessageCircle size={30} strokeWidth={1.5}/>
            </div>
            <h3 className="hp-cta-card-title">Hỏi AI</h3>
            <p className="hp-cta-card-desc">
              Chatbot AI giải đáp mọi câu hỏi về tích lũy tư bản và Kinh tế Chính trị Mác–Lênin
            </p>
            <span className="hp-cta-card-link">Hỏi ngay →</span>
          </Link>
        </div>
      </section>

    </div>
  );
}