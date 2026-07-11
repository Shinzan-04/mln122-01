import { useState, useCallback, useEffect } from "react";
import { Sparkles, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { loginWithGoogle, loadAuth, type UserDto } from "../lib/api";

interface Props {
  onSignIn: (user?: UserDto) => void;
}

// Google Client ID from backend config
const GOOGLE_CLIENT_ID = "905860478642-324157lupm1u7oipb0smc3f28g79fah1.apps.googleusercontent.com";

export function LoginPage({ onSignIn }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const auth = loadAuth();
    if (auth) {
      onSignIn(auth.user);
    }
  }, [onSignIn]);

  // ─── Google Sign-In via One Tap / OAuth popup ──────────────────────
  const handleGoogleLogin = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to use Google Identity Services if script is loaded
      if (typeof window !== "undefined" && (window as any).google?.accounts?.id) {
        const google = (window as any).google.accounts.id;
        google.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response: any) => {
            try {
              const result = await loginWithGoogle(response.credential);
              onSignIn(result.user);
            } catch (err: any) {
              setError(err.message || "Đăng nhập thất bại.");
              setLoading(false);
            }
          },
        });
        google.prompt();
      } else {
        // Fallback: redirect to Google OAuth
        const redirectUri = window.location.origin;
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=openid%20email%20profile`;
        window.location.href = url;
      }
    } catch (err: any) {
      setError(err.message || "Không thể kết nối Google.");
      setLoading(false);
    }
  }, [onSignIn]);

  // Guest mode — skip auth
  const handleGuest = () => {
    onSignIn();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fde3d4] via-[#f5ede0] to-[#d8eee0] grid place-items-center p-6">
      <div className="absolute -top-32 -left-20 size-96 rounded-full bg-[#fbcbb0]/40 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 size-[28rem] rounded-full bg-[#bcd8c5]/40 blur-3xl" />

      {/* Google Identity Services script */}
      <script src="https://accounts.google.com/gsi/client" async defer />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto size-12 rounded-2xl bg-white/70 backdrop-blur grid place-items-center shadow-md">
            <Sparkles className="size-6 text-[#3f6048]" />
          </div>
          <h1 className="font-serif mt-4 text-[#2f3d2f]" style={{ fontSize: "32px" }}>
            Sophia
          </h1>
          <p className="text-[#5a6557] mt-1.5 text-sm">
            Khám phá <em>Giai cấp &amp; Dân tộc</em> qua lăng kính triết học hiện đại.
          </p>
        </div>

        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-2xl shadow-[#9ab99a]/20 p-8">
          <h2 className="font-serif text-[#2f3d2f]" style={{ fontSize: "22px" }}>
            Chào mừng trở lại
          </h2>
          <p className="text-sm text-[#7a8473] mt-1">
            Đăng nhập để tiếp tục hành trình học tập của bạn.
          </p>

          {error && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5 border border-red-100">
              {error}
            </div>
          )}

          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mt-6 w-full h-12 rounded-2xl bg-white hover:bg-white border border-[#e3dccb] text-[#3a4a3a] shadow-sm hover:shadow transition gap-3"
          >
            {loading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <svg className="size-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.2 5.2C40.9 35.7 44 30.3 44 24c0-1.3-.1-2.3-.4-3.5z"/>
              </svg>
            )}
            {loading ? "Đang đăng nhập..." : "Đăng nhập với Google"}
          </Button>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#ece6d4]" />
            <span className="text-xs text-[#a8b09e]">hoặc</span>
            <div className="flex-1 h-px bg-[#ece6d4]" />
          </div>

          <Button
            variant="ghost"
            className="mt-4 w-full text-[#5a6557] hover:bg-[#f5efe0]"
            onClick={handleGuest}
          >
            Khám phá với tư cách khách
          </Button>

          <div className="mt-6 flex items-center gap-2 text-xs text-[#7a8473] justify-center">
            <ShieldCheck className="size-3.5 text-[#3f6048]" />
            Bảo mật bằng OAuth 2.0 · không lưu mật khẩu
          </div>
        </div>

        <p className="text-center text-xs text-[#8a9484] mt-6">
          © 2026 Sophia · Học triết học cùng AI
        </p>
      </div>
    </div>
  );
}
