import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export function NotFoundPage(): JSX.Element {
  return (
    <section
      className="surface-block fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "80px 40px",
        gap: "20px",
      }}
    >
      <div style={{ fontSize: "5rem", lineHeight: 1 }}>🏛️</div>
      <span className="label-chip">404</span>
      <h2 style={{ fontSize: "2rem" }}>Trang không tồn tại</h2>
      <p className="muted-text" style={{ maxWidth: "38ch" }}>
        Đường dẫn bạn truy cập không hợp lệ. Hãy quay về trang chủ để tiếp tục học.
      </p>
      <Link to="/" className="btn btn-primary not-found-btn">
        <Home size={16} /> Về trang chủ
      </Link>
    </section>
  );
}