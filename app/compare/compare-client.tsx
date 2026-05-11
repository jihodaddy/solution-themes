"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { allThemes } from "@/lib/themes";
import type { Mode } from "@/registry/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, ExternalLink, ZoomIn, ZoomOut } from "lucide-react";

const SCENE_OPTIONS: { id: string; label: string }[] = [
  { id: "article", label: "Article" },
  { id: "dashboard", label: "Dashboard" },
  { id: "table", label: "Table" },
  { id: "tasks", label: "Tasks" },
  { id: "settings", label: "Settings" },
  { id: "logistics", label: "Logistics" },
  { id: "process-form", label: "Process form" },
  { id: "search-board", label: "Search board" },
  { id: "pipeline", label: "Pipeline" },
  { id: "auth", label: "Auth" },
  { id: "pricing", label: "Pricing" },
  { id: "empty-states", label: "Empty states" },
];

const ZOOM_OPTIONS = [
  { value: 0.3, label: "30%" },
  { value: 0.4, label: "40%" },
  { value: 0.5, label: "50%" },
  { value: 0.6, label: "60%" },
];

export function CompareClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [scene, setScene] = useState<string>(params.get("scene") || "dashboard");
  const [mode, setMode] = useState<Mode>((params.get("mode") as Mode) || "light");
  const [zoom, setZoom] = useState<number>(Number(params.get("zoom")) || 0.4);

  useEffect(() => {
    const next = new URLSearchParams();
    next.set("scene", scene);
    next.set("mode", mode);
    next.set("zoom", String(zoom));
    router.replace(`/compare?${next.toString()}`, { scroll: false });
  }, [scene, mode, zoom, router]);

  // Each iframe renders at full viewport size then is visually scaled.
  // Use a 1280×900 base "viewport" inside each iframe.
  const baseW = 1280;
  const baseH = 900;
  const scaledW = baseW * zoom;
  const scaledH = baseH * zoom;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border bg-card shrink-0">
        <div className="max-w-[1800px] mx-auto px-6 py-3 flex items-center gap-4 flex-wrap">
          <Link
            href="/"
            className="size-8 rounded-md grid place-items-center hover:bg-muted text-muted-foreground hover:text-foreground"
            aria-label="Home"
          >
            <Home className="size-4" />
          </Link>
          <Separator vertical />

          <div className="min-w-0">
            <h1 className="text-base font-semibold tracking-tight">Compare themes</h1>
            <p className="text-xs text-muted-foreground">
              The same scene rendered in all {allThemes.length} themes. Compare aesthetics, density,
              and contrast at a glance.
            </p>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground">Scene</label>
            <Select value={scene} onValueChange={(v) => v && setScene(v)}>
              <SelectTrigger size="sm" className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SCENE_OPTIONS.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground">Mode</label>
            <div className="inline-flex border border-border rounded-md overflow-hidden text-xs">
              {(["light", "dark"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-3 h-8 ${
                    mode === m ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoom(Math.max(0.3, zoom - 0.1))}
              className="size-8 grid place-items-center rounded border border-border hover:bg-muted disabled:opacity-50"
              disabled={zoom <= 0.3}
              aria-label="Zoom out"
            >
              <ZoomOut className="size-3.5" />
            </button>
            <Select value={String(zoom)} onValueChange={(v) => v && setZoom(Number(v))}>
              <SelectTrigger size="sm" className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ZOOM_OPTIONS.map((z) => (
                  <SelectItem key={z.value} value={String(z.value)}>
                    {z.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              onClick={() => setZoom(Math.min(0.6, zoom + 0.1))}
              className="size-8 grid place-items-center rounded border border-border hover:bg-muted disabled:opacity-50"
              disabled={zoom >= 0.6}
              aria-label="Zoom in"
            >
              <ZoomIn className="size-3.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6 bg-muted/20">
        <div
          className="grid gap-6 mx-auto"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(${scaledW}px, 1fr))`,
            maxWidth: `${allThemes.length * (scaledW + 24)}px`,
          }}
        >
          {allThemes.map((t) => {
            const src = `/embed?scene=${encodeURIComponent(scene)}&theme=${t.id}&mode=${mode}`;
            return (
              <div
                key={t.id}
                className="rounded-lg border border-border bg-card overflow-hidden shadow-sm flex flex-col"
              >
                <div className="px-3 py-2 border-b border-border flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold">{t.name}</span>
                    <span className="text-muted-foreground ml-1.5">/ {t.id}</span>
                  </div>
                  <Link
                    href={`/playground?theme=${t.id}&mode=${mode}&scene=${scene}`}
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                    title="Open in playground"
                  >
                    Open <ExternalLink className="size-3" />
                  </Link>
                </div>
                <div
                  className="relative overflow-hidden bg-background"
                  style={{ width: scaledW, height: scaledH }}
                >
                  <iframe
                    title={`${t.name} — ${scene}`}
                    src={src}
                    style={{
                      width: baseW,
                      height: baseH,
                      transform: `scale(${zoom})`,
                      transformOrigin: "top left",
                      border: "0",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <footer className="max-w-3xl mx-auto mt-10 text-center text-xs text-muted-foreground">
          Iframes render the chromeless <code style={{ fontFamily: "var(--font-mono)" }}>/embed</code> route.
          Each iframe carries its own <code style={{ fontFamily: "var(--font-mono)" }}>[data-theme]</code> root,
          so the comparison is true — no global state leaks. Click <span className="font-medium">Open</span> to
          interact with one of them in the playground.
        </footer>
      </main>

      <Link
        href="/"
        className="fixed bottom-4 right-4 h-8 px-3 rounded-md text-xs inline-flex items-center gap-1.5 bg-card border border-border hover:bg-muted shadow-sm"
      >
        <Home className="size-3.5" />
        Home
      </Link>
    </div>
  );
}

function Separator({ vertical }: { vertical?: boolean }) {
  return vertical ? <span className="h-5 w-px bg-border" /> : <span className="w-full h-px bg-border" />;
}
