"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const THEMES = [
  { id: "editorial", name: "Warm Editorial" },
  { id: "nordic", name: "Nordic Calm" },
  { id: "data-terminal", name: "Data Terminal" },
  { id: "productivity", name: "Productivity Pro" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];
type Mode = "light" | "dark";

const DEFAULT_THEME: ThemeId = "editorial";
const DEFAULT_MODE: Mode = "light";
const STORAGE_THEME = "st-theme";
const STORAGE_MODE = "st-mode";

export type ThemeSwitcherProps = {
  className?: string;
};

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [theme, setThemeState] = React.useState<ThemeId>(DEFAULT_THEME);
  const [mode, setModeState] = React.useState<Mode>(DEFAULT_MODE);
  const [hydrated, setHydrated] = React.useState(false);

  // Read DOM state on mount (set by initial-paint script if consumer added one)
  React.useEffect(() => {
    const t = (document.documentElement.getAttribute("data-theme") as ThemeId) || DEFAULT_THEME;
    const m = (document.documentElement.getAttribute("data-mode") as Mode) || DEFAULT_MODE;
    if (THEMES.some((x) => x.id === t)) setThemeState(t);
    if (m === "light" || m === "dark") setModeState(m);
    setHydrated(true);
  }, []);

  const setTheme = React.useCallback((next: ThemeId) => {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_THEME, next);
    } catch {}
  }, []);

  const toggleMode = React.useCallback(() => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setModeState(next);
    document.documentElement.setAttribute("data-mode", next);
    try {
      localStorage.setItem(STORAGE_MODE, next);
    } catch {}
  }, [mode]);

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <Select value={theme} onValueChange={(v) => setTheme(v as ThemeId)}>
        <SelectTrigger className="w-44" aria-label="Select theme">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {THEMES.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMode}
        aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        suppressHydrationWarning
      >
        {hydrated && mode === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
