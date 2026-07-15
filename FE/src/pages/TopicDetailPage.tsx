import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, ExternalLink, Trophy } from "lucide-react";
import { Loading } from "../components/Loading";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import { CredibilityFooter } from "../components/CredibilityFooter";
import { getTopicDetail } from "../services/philosophyApi";
import type { TopicDetail } from "../types/api";

export function TopicDetailPage(): JSX.Element {
  const { id } = useParams();
  const [data,  setData]  = useState<TopicDetail | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const topicId = Number(id);
    if (!Number.isFinite(topicId)) { setError("ID không hợp lệ"); return; }
    getTopicDetail(topicId)
      .then(setData)
      .catch((err: Error) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <section className="surface-block stack-sm">
        <p className="error-text">{error}</p>
        <Link className="btn btn-ghost not-found-btn" to="/topics">
          <ArrowLeft size={15} /> Quay lại danh sách
        </Link>
      </section>
    );
  }

  if (!data) return <Loading text="Đang tải chi tiết chủ đề..." />;

  return (
    <article className="surface-block fade-in article-wrap" style={{ overflow: "hidden" }}>

      {/* Floating thumbnail + image credit */}
      {data.thumbnailUrl && (
        <figure className="article-figure">
          <img
            src={data.thumbnailUrl}
            alt={data.title}
            className="article-image-float"
          />
          {data.imageSource && (
            <figcaption className="article-img-credit">
              {data.imageSource.startsWith("http") ? (
                <a href={data.imageSource} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={11} /> Nguồn ảnh
                </a>
              ) : (
                <span>📷 {data.imageSource}</span>
              )}
            </figcaption>
          )}
        </figure>
      )}

      {/* Header */}
      <div className="stack-xs" style={{ marginBottom: "18px" }}>
        <Link to="/topics" className="text-link" style={{ fontSize: "0.82rem" }}>
          <ArrowLeft size={13} /> Kho chủ đề
        </Link>
        <span className="chip-soft">{data.category}</span>
        <h2 style={{ fontSize: "clamp(1.5rem, 1.2rem + 1.2vw, 2rem)", marginTop: "4px" }}>
          {data.title}
        </h2>
        <p className="muted-text" style={{ fontSize: "0.875rem" }}>
          ✍️ Tác giả: <strong>{data.author}</strong>
        </p>
      </div>

      {/* Summary */}
      <p className="article-summary" style={{ marginBottom: "22px" }}>{data.summary}</p>

      {/* Content */}
      <div className="article-content">
        <MarkdownRenderer content={data.content} />
      </div>

      <CredibilityFooter />

      {/* Actions */}
      <div className="article-actions">
        <Link className="btn btn-ghost" to="/topics">
          <ArrowLeft size={15} /> Về kho chủ đề
        </Link>
        <Link className="btn btn-primary" to="/quiz">
          <Trophy size={15} /> Làm quiz liên quan
        </Link>
        <Link className="btn btn-ghost" to="/chatbot">
          <BookOpen size={15} /> Hỏi chatbot
        </Link>
      </div>

    </article>
  );
}