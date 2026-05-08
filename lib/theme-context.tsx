"use client";

import * as React from "react";
import type { ThemeId, Mode } from "@/registry/types";

type ThemeState = {
  theme: ThemeId;
  mode: Mode;
  setTheme: (t: ThemeId) => void;
  setMode: (m: Mode) => void;
};

const ThemeContext = React.createContext<ThemeState | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<ThemeId>("editorial");
  const [mode, setModeState] = React.useState<Mode>("light");

  React.useEffect(() => {
    const t = (document.documentElement.getAttribute("data-theme") as ThemeId) || "editorial";
    const m = (document.documentElement.getAttribute("data-mode") as Mode) || "light";
    setThemeState(t);
    setModeState(m);
  }, []);

  const setTheme = React.useCallback((t: ThemeId) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("st-theme", t);
  }, []);

  const setMode = React.useCallback((m: Mode) => {
    setModeState(m);
    document.documentElement.setAttribute("data-mode", m);
    localStorage.setItem("st-mode", m);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeState {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
