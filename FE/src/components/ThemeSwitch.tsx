import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export function ThemeSwitch(): JSX.Element {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  /* Đóng panel khi click ra ngoài */
  useEffect(() => {
    if (!open) return;
    function onOutsideClick(e: MouseEvent): void {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [open]);

  return (
    <div className="theme-switch-wrap" ref={wrapRef}>
      <button
        className="theme-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label="Chọn màu giao diện"
        aria-expanded={open}
      >
        <span
          className="theme-trigger-swatch"
          style={{
            background: `linear-gradient(135deg, ${theme.swatchA}, ${theme.swatchB})`
          }}
        />
        <span className="theme-trigger-label">Giao diện</span>
        <span className="theme-trigger-caret">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="theme-panel">
          <p className="theme-panel-title">Chọn tông màu</p>
          <div className="theme-list">
            {themes.map((t) => (
              <button
                key={t.id}
                className={`theme-option${t.id === theme.id ? " theme-option-active" : ""}`}
                onClick={() => {
                  setTheme(t);
                  setOpen(false);
                }}
              >
                <span className="theme-swatch-duo">
                  <span className="swatch-a" style={{ background: t.swatchA }} />
                  <span className="swatch-b" style={{ background: t.swatchB }} />
                </span>
                <span className="theme-option-info">
                  <span className="theme-option-name">
                    {t.emoji} {t.name}
                  </span>
                  <span className="theme-option-desc">{t.description}</span>
                </span>
                {t.id === theme.id && <span className="theme-check">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
