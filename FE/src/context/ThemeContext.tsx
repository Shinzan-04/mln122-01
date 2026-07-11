import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface Theme {
  id: string;
  name: string;
  emoji: string;
  description: string;
  swatchA: string;
  swatchB: string;
}

export const THEMES: Theme[] = [
  {
    id: "blush-rose",
    name: "Blush Rose",
    emoji: "🌸",
    description: "Hồng + Tím lavender",
    swatchA: "#F4A8C4",
    swatchB: "#C9A8E0"
  },
  {
    id: "sage-garden",
    name: "Sage Garden",
    emoji: "🌿",
    description: "Xanh sage + Kem vàng",
    swatchA: "#8FC48A",
    swatchB: "#C8B870"
  },
  {
    id: "ocean-drift",
    name: "Ocean Drift",
    emoji: "🌊",
    description: "Xanh biển + Xanh ngọc",
    swatchA: "#7ECAEE",
    swatchB: "#7ED4A8"
  },
  {
    id: "peach-sunset",
    name: "Peach Sunset",
    emoji: "🍑",
    description: "Đào + Vàng mật ong",
    swatchA: "#FFAA80",
    swatchB: "#F0C850"
  },
  {
    id: "lilac-mist",
    name: "Lilac Mist",
    emoji: "💜",
    description: "Tím nhạt + Xanh nước",
    swatchA: "#B0A0E0",
    swatchB: "#90C0D0"
  }
];

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: THEMES[2],
  setTheme: () => undefined,
  themes: THEMES
});

export function ThemeProvider({ children }: { children: ReactNode }): JSX.Element {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("mln-theme");
    return THEMES.find((t) => t.id === saved) ?? THEMES[2];
  });

  function setTheme(t: Theme): void {
    setThemeState(t);
    localStorage.setItem("mln-theme", t.id);
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme.id);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
