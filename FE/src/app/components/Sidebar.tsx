import { Home, BookOpen, Brain, Trophy, Sparkles, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { type UserDto } from "../lib/api";

type View = "home" | "topic" | "quiz" | "leaderboard" | "admin" | "login";

interface SidebarProps {
  current: View;
  onNavigate: (view: View) => void;
  onOpenChat: () => void;
  user?: UserDto | null;
  onSignOut?: () => void;
}

const items: { id: View; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "home", label: "Trang chủ", icon: Home },
  { id: "topic", label: "Bài học", icon: BookOpen },
  { id: "quiz", label: "Trắc nghiệm", icon: Brain },
  { id: "leaderboard", label: "Bảng xếp hạng", icon: Trophy },
];

export function Sidebar({ current, onNavigate, onOpenChat, user, onSignOut }: SidebarProps) {
  return (
    <aside className="hidden md:flex w-64 flex-col gap-2 p-5 border-r border-[#e8e3d5] bg-[#fdfbf5]/70 backdrop-blur-xl">
      <div className="flex items-center gap-2 px-2 mb-6">
        <div className="size-9 rounded-xl bg-gradient-to-br from-[#b9d4ba] to-[#d9c79a] flex items-center justify-center text-white shadow-sm">
          <Sparkles className="size-5" />
        </div>
        <div>
          <div className="font-serif text-[#3a4a3a] tracking-tight">Sophia</div>
          <div className="text-xs text-[#7a8473]">Triết học cùng AI</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {items.map(({ id, label, icon: Icon }) => {
          const active = current === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all text-left ${
                active
                  ? "bg-gradient-to-r from-[#cfe1cf] to-[#e8e0c4] text-[#3a4a3a] shadow-sm"
                  : "text-[#5a6557] hover:bg-[#f1ecdb]"
              }`}
            >
              <Icon className="size-4" />
              <span>{label}</span>
            </button>
          );
        })}

        <button
          onClick={onOpenChat}
          className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-left bg-gradient-to-r from-[#e7e0f5] to-[#f5edf2] text-[#5a4d6e] hover:opacity-90 transition"
        >
          <Sparkles className="size-4" />
          <span>Hỏi AI Sophia</span>
        </button>

        {user?.role === "Admin" && (
          <button
            onClick={() => onNavigate("admin")}
            className={`mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all text-left ${
              current === "admin"
                ? "bg-[#fce5cd] text-[#b45f06] shadow-sm"
                : "text-[#b45f06]/80 hover:bg-[#fce5cd]/50"
            }`}
          >
            <BookOpen className="size-4" />
            <span>Quản trị</span>
          </button>
        )}
      </nav>

      {/* User info — from auth state (POST /api/Auth/google response) */}
      <div className="mt-auto flex items-center gap-3 p-3 rounded-2xl bg-white/60 border border-[#ece6d4]">
        <Avatar className="size-9">
          <AvatarImage src={user?.avatarUrl || "https://i.pravatar.cc/100?img=47"} />
          <AvatarFallback>{user?.name?.[0] ?? "K"}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="truncate text-sm text-[#3a4a3a]">{user?.name || "Khách"}</div>
          <div className="text-xs text-[#8a9484]">
            {user ? `${user.totalScore.toLocaleString()} XP` : "Chưa đăng nhập"}
          </div>
        </div>
        <button
          onClick={onSignOut ?? (() => onNavigate("login"))}
          className="text-[#8a9484] hover:text-[#3a4a3a] transition"
          aria-label="Đăng xuất"
        >
          <LogOut className="size-4" />
        </button>
      </div>
    </aside>
  );
}
