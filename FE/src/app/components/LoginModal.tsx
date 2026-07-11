import { useState, useCallback } from "react";
import { Sparkles, ShieldCheck, Loader2, X } from "lucide-react";
import { Button } from "./ui/button";
import { loginWithGoogle, type UserDto } from "../lib/api";

interface Props {
  open: boolean;
  onClose: () => void;
  onSignIn: (user: UserDto) => void;
}

const GOOGLE_CLIENT_ID = "905860478642-324157lupm1u7oipb0smc3f28g79fah1.apps.googleusercontent.com";

export function LoginModal({ open, onClose, onSignIn }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
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
        const redirectUri = window.location.origin;
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=openid%20email%20profile`;
        window.location.href = url;
      }
    } catch (err: any) {
      setError(err.message || "Không thể kết nối Google.");
      setLoading(false);
    }
  }, [onSignIn]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-[#2f3d2f]/30 backdrop-blur-sm animate-in fade-in-0"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 grid place-items-center p-4 pointer-events-none">
        <div className="relative w-full max-w-sm bg-white/95 backdrop-blur-xl rounded-3xl border border-white shadow-2xl shadow-[#9ab99a]/20 p-8 pointer-events-auto animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#8a9484] hover:text-[#3a4a3a] p-1 rounded-lg hover:bg-[#f1ecdb] transition"
          >
            <X className="size-4" />
          </button>

          {/* Icon + Title */}
          <div className="text-center">
            <div className="mx-auto size-14 rounded-2xl bg-gradient-to-br from-[#b9d4ba] to-[#d9c79a] grid place-items-center shadow-lg shadow-[#9ab99a]/30">
              <Sparkles className="size-7 text-white" />
            </div>
            <h2 className="font-serif mt-5 text-[#2f3d2f]" style={{ fontSize: "24px" }}>
              Đăng nhập để học tốt hơn
            </h2>
            <p className="text-sm text-[#7a8473] mt-2 leading-relaxed">
              Lưu tiến trình, tham gia bảng xếp hạng và trò chuyện với AI Sophia.
            </p>
          </div>

          {error && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2.5 border border-red-100">
              {error}
            </div>
          )}

          {/* Google button */}
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

          {/* Skip */}
          <button
            onClick={onClose}
            className="mt-3 w-full text-center text-sm text-[#8a9484] hover:text-[#5a6557] transition py-2"
          >
            Để sau, mình muốn khám phá trước
          </button>

          <div className="mt-4 flex items-center gap-2 text-[10px] text-[#a8b09e] justify-center">
            <ShieldCheck className="size-3 text-[#9ab99a]" />
            OAuth 2.0 · không lưu mật khẩu
          </div>
        </div>
      </div>
    </>
  );
}
