import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, UserPlus, CheckCircle, AtSign } from "lucide-react";
import { registerUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";

/* ─── Password strength ────────────────────────────────────── */
function getStrength(pw: string): { level: 0 | 1 | 2 | 3; label: string; color: string } {
  if (!pw) return { level: 0, label: "", color: "" };
  const score = [pw.length >= 8, /[a-z]/.test(pw), /[A-Z]/.test(pw),
                 /\d/.test(pw), /[^A-Za-z0-9]/.test(pw)].filter(Boolean).length;
  if (score <= 2) return { level: 1, label: "Yếu",       color: "#e05252" };
  if (score <= 3) return { level: 2, label: "Trung bình", color: "#f0a030" };
  return           { level: 3, label: "Mạnh",       color: "#3cba74" };
}

/* ─── Username hint ────────────────────────────────────────── */
function UsernameHint({ value }: { value: string }): JSX.Element | null {
  if (!value) return null;
  const valid = /^[a-zA-Z0-9_]{3,30}$/.test(value);
  return (
    <span style={{ fontSize: "0.73rem", color: valid ? "#3cba74" : "#e05252" }}>
      {valid ? "✓ Tên đăng nhập hợp lệ" : "Chỉ chữ cái, số và _ (3–30 ký tự)"}
    </span>
  );
}

/* ─── Main component ───────────────────────────────────────── */
function RegisterContent(): JSX.Element {
  const [username, setUsername] = useState("");
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [showCf, setShowCf]     = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();

  const strength   = getStrength(password);
  const pwMatch    = password.length > 0 && confirm.length > 0 && password === confirm;
  const pwMismatch = confirm.length > 0 && password !== confirm;

  /* ── Client-side validation ──────────────────────────────── */
  function validate(): string | null {
    if (!username.trim())                               return "Vui lòng nhập tên đăng nhập.";
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(username))        return "Tên đăng nhập chỉ được chứa chữ cái, số và _ (3–30 ký tự).";
    if (!name.trim() || name.trim().length < 2)         return "Họ tên phải có ít nhất 2 ký tự.";
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "Email không hợp lệ.";
    if (!password || password.length < 6)               return "Mật khẩu phải có ít nhất 6 ký tự.";
    if (password !== confirm)                           return "Mật khẩu xác nhận không khớp.";
    return null;
  }

  /* ── Submit ──────────────────────────────────────────────── */
  async function handleSubmit(ev: React.FormEvent): Promise<void> {
    ev.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true); setError(null);
    try {
      const data = await registerUser({
        username: username.trim(),
        name:     name.trim(),
        email:    email.trim() || undefined,
        password
      });
      login(data.token, data.user);
      navigate("/", { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Đăng ký thất bại. Vui lòng thử lại.");
    } finally { setLoading(false); }
  }

  return (
    <div className="login-root">
      <div className="bg-blob bg-blob-one" />
      <div className="bg-blob bg-blob-two" />

      <div className="login-card register-card">
        {/* ── Branding ─────────────────────────────────────── */}
        <div className="login-brand">
          <div className="login-brand-icon">🏛️</div>
          <h1 className="login-title">Tạo tài khoản</h1>
          <p className="login-subtitle">Philosophy Atlas · MLN Knowledge Lab</p>
        </div>

        <div className="login-divider" />

        <form onSubmit={handleSubmit} className="login-form">

          {/* ── Username (required, unique) ───────────────── */}
          <div className="login-field">
            <label className="login-label">
              Tên đăng nhập <span style={{ color: "#e05252" }}>*</span>
            </label>
            <div className="login-input-wrap">
              <input
                type="text"
                className="login-input login-input-pw"
                placeholder="vi_du_ten_cua_ban"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                disabled={loading}
                required
              />
              <AtSign size={14} style={{
                position: "absolute", right: 12,
                color: "var(--theme-muted)", pointerEvents: "none"
              }} />
            </div>
            <UsernameHint value={username} />
            <span style={{ fontSize: "0.72rem", color: "var(--theme-muted)", marginTop: 2 }}>
              Dùng để đăng nhập — không thể thay đổi sau.
            </span>
          </div>

          {/* ── Display name ─────────────────────────────── */}
          <div className="login-field">
            <label className="login-label">
              Họ và tên <span style={{ color: "#e05252" }}>*</span>
            </label>
            <input
              type="text"
              className="login-input"
              placeholder="Nguyễn Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              disabled={loading}
              required
            />
          </div>

          {/* ── Email (optional) ─────────────────────────── */}
          <div className="login-field">
            <label className="login-label">
              Email{" "}
              <span style={{ fontSize: "0.72rem", color: "var(--theme-muted)", fontWeight: 400 }}>
                (không bắt buộc)
              </span>
            </label>
            <input
              type="email"
              className="login-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={loading}
            />
          </div>

          {/* ── Password ─────────────────────────────────── */}
          <div className="login-field">
            <label className="login-label">
              Mật khẩu <span style={{ color: "#e05252" }}>*</span>
            </label>
            <div className="login-input-wrap">
              <input
                type={showPw ? "text" : "password"}
                className="login-input login-input-pw"
                placeholder="Ít nhất 6 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading}
                required
              />
              <button type="button" className="login-pw-toggle"
                onClick={() => setShowPw((s) => !s)} tabIndex={-1}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {password && (
              <div className="pw-strength-wrap">
                <div className="pw-strength-bar">
                  {[1, 2, 3].map((lvl) => (
                    <div key={lvl} className="pw-strength-seg"
                      style={{ background: strength.level >= lvl ? strength.color : "var(--theme-line)" }} />
                  ))}
                </div>
                <span className="pw-strength-label" style={{ color: strength.color }}>
                  {strength.label}
                </span>
              </div>
            )}
          </div>

          {/* ── Confirm password ─────────────────────────── */}
          <div className="login-field">
            <label className="login-label">
              Xác nhận mật khẩu <span style={{ color: "#e05252" }}>*</span>
            </label>
            <div className="login-input-wrap">
              <input
                type={showCf ? "text" : "password"}
                className={`login-input login-input-pw ${
                  pwMismatch ? "login-input-error" : pwMatch ? "login-input-ok" : ""
                }`}
                placeholder="Nhập lại mật khẩu"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
                disabled={loading}
                required
              />
              <button type="button" className="login-pw-toggle"
                onClick={() => setShowCf((s) => !s)} tabIndex={-1}>
                {showCf ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
              {pwMatch && (
                <CheckCircle size={16} style={{
                  position: "absolute", right: 36, color: "#3cba74"
                }} />
              )}
            </div>
            {pwMismatch && <span className="login-field-error">Mật khẩu không khớp</span>}
          </div>

          {/* ── Submit ───────────────────────────────────── */}
          <button type="submit" className="login-submit-btn"
            disabled={loading || !!pwMismatch}>
            {loading
              ? <><div className="login-spinner login-spinner-sm" /> Đang đăng ký…</>
              : <><UserPlus size={15} /> Tạo tài khoản</>}
          </button>
        </form>

        {/* ── Error ────────────────────────────────────────── */}
        {error && <div className="login-error"><span>⚠️</span> {error}</div>}

        {/* ── Footer ───────────────────────────────────────── */}
        <div className="login-footer">
          <p style={{ fontSize: "0.84rem", color: "var(--theme-muted)", margin: 0 }}>
            Đã có tài khoản?{" "}
            <Link to="/login" className="login-register-link">Đăng nhập</Link>
          </p>
          <Link to="/" className="login-back-link">← Về trang chủ</Link>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage(): JSX.Element {
  return (
    <ThemeProvider>
      <RegisterContent />
    </ThemeProvider>
  );
}
