"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { allThemes } from "@/lib/themes";
import type { ThemeId, Mode } from "@/registry/types";
import { ArticleScene } from "../themes/[id]/demos/article";
import { DashboardScene } from "../themes/[id]/demos/dashboard";
import { TableScene } from "../themes/[id]/demos/table";
import { TasksScene } from "../themes/[id]/demos/tasks";
import { SettingsScene } from "../themes/[id]/demos/settings";

type SceneId = "article" | "dashboard" | "table" | "tasks" | "settings";
const SCENES: Record<SceneId, React.FC> = {
  article: ArticleScene,
  dashboard: DashboardScene,
  table: TableScene,
  tasks: TasksScene,
  settings: SettingsScene,
};

export function PlaygroundClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [theme, setTheme] = useState<ThemeId>((params.get("theme") as ThemeId) || "editorial");
  const [mode, setMode] = useState<Mode>((params.get("mode") as Mode) || "light");
  const [scene, setScene] = useState<SceneId>((params.get("scene") as SceneId) || "article");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-mode", mode);
    const next = new URLSearchParams();
    next.set("theme", theme);
    next.set("mode", mode);
    next.set("scene", scene);
    router.replace(`/playground?${next.toString()}`, { scroll: false });
  }, [theme, mode, scene, router]);

  const Scene = SCENES[scene];

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr]">
      <aside className="border-r border-border p-6 space-y-6">
        <h1 className="text-lg font-semibold">Playground</h1>
        <FieldGroup title="Theme">
          {allThemes.map((t) => (
            <Radio key={t.id} name="theme" checked={theme === t.id} onChange={() => setTheme(t.id)} label={t.name} />
          ))}
        </FieldGroup>
        <FieldGroup title="Mode">
          {(["light", "dark"] as Mode[]).map((m) => (
            <Radio key={m} name="mode" checked={mode === m} onChange={() => setMode(m)} label={m} />
          ))}
        </FieldGroup>
        <FieldGroup title="Scene">
          {(Object.keys(SCENES) as SceneId[]).map((s) => (
            <Radio key={s} name="scene" checked={scene === s} onChange={() => setScene(s)} label={s} />
          ))}
        </FieldGroup>
        <button
          className="w-full border border-border rounded-md px-3 py-2 text-sm hover:bg-muted"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          Copy URL
        </button>
      </aside>
      <main className="overflow-auto"><Scene /></main>
    </div>
  );
}

function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{title}</div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Radio({ name, checked, onChange, label }: { name: string; checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="accent-primary" />
      <span>{label}</span>
    </label>
  );
}
