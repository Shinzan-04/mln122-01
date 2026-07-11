import { NavLink, useNavigate } from "react-router-dom";
import { BookOpen, Home, LogIn, LogOut, Medal, MessageCircle, Trophy } from "lucide-react";
import { ThemeSwitch } from "./ThemeSwitch";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Trang chủ", icon: Home,          end: true  },
  { to: "/topics",  label: "Chủ đề",   icon: BookOpen,     end: false },
  { to: "/quiz",     label: "Quiz",      icon: Trophy,        end: false },
  { to: "/ranking",  label: "Xếp hạng", icon: Medal,         end: false },
  { to: "/chatbot",  label: "Chatbot",  icon: MessageCircle, end: false },
];

export function MainNav(): JSX.Element {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout(): void {
    logout();
    navigate("/");
  }

  return (
    <header className="main-header">
      {/* Brand */}
      <div className="brand-wrap">
        <div className="brand-icon-box">🏛️</div>
        <div className="brand-text-wrap">
          <span className="brand-name">Philosophy Atlas</span>
          <span className="brand-tag">MLN Knowledge Lab</span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="main-nav">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            <Icon size={15} />
            <span className="nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Actions */}
      <div className="nav-right">
        <ThemeSwitch />

        {isAuthenticated && user ? (
          /* ── Logged-in section ── */
          <div className="nav-user">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="nav-user-avatar"
              referrerPolicy="no-referrer"
            />
            <span className="nav-user-name">{user.name.split(" ").slice(-1)[0]}</span>
            <button
              onClick={handleLogout}
              className="nav-logout-btn"
              title="Đăng xuất"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          /* ── Login button ── */
          <button
            onClick={() => navigate("/login")}
            className="nav-login-btn"
          >
            <LogIn size={14} />
            <span>Đăng nhập</span>
          </button>
        )}
      </div>
    </header>
  );
}