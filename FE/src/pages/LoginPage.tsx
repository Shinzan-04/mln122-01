import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { loginWithGoogle, loginWithCredentials } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";

type Tab = "google" | "email";

function LoginContent(): JSX.Element {
  const [tab, setTab]             = useState<Tab>("google");
  const [usernameOrEmail, setUoE] = useState("");
  const [password, setPassword]   = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [loading, setLoading]     = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();

  /* ── Google ──────────────────────────────────────────────── */
  async function handleGoogleSuccess(res: CredentialResponse): Promise<void> {
    if (!res.credential) { setError("Không nhận được token từ Google."); return; }
    setLoading(true); setError(null);
    try {
      const data = await loginWithGoogle(res.credential);
      login(data.token, data.user);
      navigate("/", { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Đăng nhập thất bại.");
    } finally { setLoading(false); }
  }

  /* ── Username / Email + Password ────────────────────────── */
  async function handleCredLogin(ev: React.FormEvent): Promise<void> {
    ev.preventDefault();
    if (!usernameOrEmail.trim() || !password) {
      setError("Vui lòng nhập tên đăng nhập/email và mật khẩu.");
      return;
    }
    setLoading(true); setError(null);
    try {
      const data = await loginWithCredentials({
        usernameOrEmail: usernameOrEmail.trim(),
        password
      });
      login(data.token, data.user);
      navigate("/", { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Đăng nhập thất bại.");
    } finally { setLoading(false); }
  }

  return (
    <div className="login-root">
      <div className="bg-blob bg-blob-one" />
      <div className="bg-blob bg-blob-two" />

      <div className="login-card">
        {/* ── Branding ─────────────────────────────────────── */}
        <div className="login-brand">
          <div className="login-brand-icon">🏛️</div>
          <h1 className="login-title">Philosophy Atlas</h1>
          <p className="login-subtitle">MLN Knowledge Lab</p>
        </div>

        <div className="login-divider" />

        {/* ── Tabs ─────────────────────────────────────────── */}
        <div className="login-tabs">
          <button
            className={tab === "google" ? "login-tab login-tab-active" : "login-tab"}
            onClick={() => { setTab("google"); setError(null); }}
          >
            <span>🔵</span> Google
          </button>
          <button
            className={tab === "email" ? "login-tab login-tab-active" : "login-tab"}
            onClick={() => { setTab("email"); setError(null); }}
          >
            <span>🔑</span> Tài khoản
          </button>
        </div>

        {/* ── Google tab ───────────────────────────────────── */}
        {tab === "google" && (
          <div className="login-tab-panel">
            <p className="login-tab-hint">
              Đăng nhập nhanh bằng tài khoản Google của bạn.
            </p>
            {loading ? (
              <div className="login-loading">
                <div className="login-spinner" />
                <span>Đang đăng nhập…</span>
              </div>
            ) : (
              <div className="login-google-wrap">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google đã hủy hoặc xảy ra lỗi.")}
                  text="signin_with"
                  shape="rectangular"
                  size="large"

                  width="280"
                />
              </div>
            )}
          </div>
        )}

        {/* ── Credentials tab ──────────────────────────────── */}
        {tab === "email" && (
          <div className="login-tab-panel">
            <form onSubmit={handleCredLogin} className="login-form">

              {/* Username or Email */}
              <div className="login-field">
                <label className="login-label">Tên đăng nhập hoặc Email</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="ten_dang_nhap hoặc you@example.com"
                  value={usernameOrEmail}
                  onChange={(e) => setUoE(e.target.value)}
                  autoComplete="username"
                  disabled={loading}
                  required
                />
              </div>

              {/* Password */}
              <div className="login-field">
                <label className="login-label">Mật khẩu</label>
                <div className="login-input-wrap">
                  <input
                    type={showPw ? "text" : "password"}
                    className="login-input login-input-pw"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    className="login-pw-toggle"
                    onClick={() => setShowPw((s) => !s)}
                    tabIndex={-1}
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading
                  ? <><div className="login-spinner login-spinner-sm" /> Đang đăng nhập…</>
                  : <><LogIn size={15} /> Đăng nhập</>}
              </button>
            </form>

            <p className="login-register-hint">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="login-register-link">Đăng ký ngay</Link>
            </p>
          </div>
        )}

        {/* ── Error ────────────────────────────────────────── */}
        {error && (
          <div className="login-error">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* ── Footer ───────────────────────────────────────── */}
        <div className="login-footer">
          <Link to="/" className="login-back-link">← Về trang chủ</Link>
          <p className="login-policy">
            Bằng cách đăng nhập, bạn đồng ý với điều khoản sử dụng của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
}

export function LoginPage(): JSX.Element {
  return (
    <ThemeProvider>
      <LoginContent />
    </ThemeProvider>
  );
}
