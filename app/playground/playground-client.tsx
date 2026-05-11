"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Home, Search, X, Columns3 } from "lucide-react";
import { allThemes } from "@/lib/themes";
import type { ThemeId, Mode } from "@/registry/types";
import { ArticleScene } from "../themes/[id]/demos/article";
import { DashboardScene } from "../themes/[id]/demos/dashboard";
import { TableScene } from "../themes/[id]/demos/table";
import { TasksScene } from "../themes/[id]/demos/tasks";
import { SettingsScene } from "../themes/[id]/demos/settings";
import { LogisticsScene } from "../themes/[id]/demos/logistics";
import { ProcessFormScene } from "../themes/[id]/demos/process-form";
import { SearchBoardScene } from "../themes/[id]/demos/search-board";
import { PipelineScene } from "../themes/[id]/demos/pipeline";
import { AuthScene } from "../themes/[id]/demos/auth";
import { PricingScene } from "../themes/[id]/demos/pricing";
import { EmptyStatesScene } from "../themes/[id]/demos/empty-states";
import {
  COMPONENT_PREVIEWS,
  COMPONENT_IDS,
  type ComponentId,
} from "./component-previews";
import {
  EXAMPLE_PREVIEWS,
  EXAMPLE_IDS,
  type ExampleId,
} from "./unit-examples";

type SceneId =
  | "article"
  | "dashboard"
  | "table"
  | "tasks"
  | "settings"
  | "logistics"
  | "process-form"
  | "search-board"
  | "pipeline"
  | "auth"
  | "pricing"
  | "empty-states";
const SCENES: Record<SceneId, React.FC> = {
  article: ArticleScene,
  dashboard: DashboardScene,
  table: TableScene,
  tasks: TasksScene,
  settings: SettingsScene,
  logistics: LogisticsScene,
  "process-form": ProcessFormScene,
  "search-board": SearchBoardScene,
  pipeline: PipelineScene,
  auth: AuthScene,
  pricing: PricingScene,
  "empty-states": EmptyStatesScene,
};

const SCENE_IDS = Object.keys(SCENES) as SceneId[];

// Combined component/example map for the single dropdown.
type PreviewKind = "component" | "example";
type PreviewId = ComponentId | ExampleId;
const PREVIEW_KIND: Record<string, PreviewKind> = {
  ...Object.fromEntries(COMPONENT_IDS.map((id) => [id, "component" as const])),
  ...Object.fromEntries(EXAMPLE_IDS.map((id) => [id, "example" as const])),
};
const PREVIEW_FCS: Record<string, React.FC> = {
  ...COMPONENT_PREVIEWS,
  ...EXAMPLE_PREVIEWS,
};

type View =
  | { kind: "scene"; id: SceneId }
  | { kind: "component"; id: ComponentId }
  | { kind: "example"; id: ExampleId };

function parseView(params: URLSearchParams): View {
  const c = params.get("component");
  if (c && (COMPONENT_IDS as string[]).includes(c)) {
    return { kind: "component", id: c as ComponentId };
  }
  const e = params.get("example");
  if (e && (EXAMPLE_IDS as string[]).includes(e)) {
    return { kind: "example", id: e as ExampleId };
  }
  const s = params.get("scene");
  if (s && (SCENE_IDS as string[]).includes(s)) {
    return { kind: "scene", id: s as SceneId };
  }
  return { kind: "scene", id: "article" };
}

export function PlaygroundClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [theme, setTheme] = useState<ThemeId>((params.get("theme") as ThemeId) || "editorial");
  const [mode, setMode] = useState<Mode>((params.get("mode") as Mode) || "light");
  const [view, setView] = useState<View>(() => parseView(params));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-mode", mode);
    const next = new URLSearchParams();
    next.set("theme", theme);
    next.set("mode", mode);
    if (view.kind === "scene") next.set("scene", view.id);
    else if (view.kind === "component") next.set("component", view.id);
    else next.set("example", view.id);
    router.replace(`/playground?${next.toString()}`, { scroll: false });
  }, [theme, mode, view, router]);

  const Content =
    view.kind === "scene"
      ? SCENES[view.id]
      : view.kind === "component"
      ? COMPONENT_PREVIEWS[view.id]
      : EXAMPLE_PREVIEWS[view.id];

  // Dropdown selection: current value if view is component/example, else empty.
  const dropdownValue: PreviewId | "" =
    view.kind === "scene" ? "" : (view.id as PreviewId);

  function onDropdownChange(value: string) {
    if (!value) return;
    const kind = PREVIEW_KIND[value];
    if (!kind) return;
    if (kind === "component") setView({ kind: "component", id: value as ComponentId });
    else setView({ kind: "example", id: value as ExampleId });
  }

  const [query, setQuery] = useState("");

  const filteredScenes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SCENE_IDS;
    return SCENE_IDS.filter((s) => s.toLowerCase().includes(q));
  }, [query]);

  const filteredComponents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMPONENT_IDS;
    return COMPONENT_IDS.filter((c) => c.toLowerCase().includes(q));
  }, [query]);

  const filteredExamples = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return EXAMPLE_IDS;
    return EXAMPLE_IDS.filter((e) => e.toLowerCase().includes(q));
  }, [query]);

  const noResults =
    query.trim() !== "" &&
    filteredScenes.length === 0 &&
    filteredComponents.length === 0 &&
    filteredExamples.length === 0;

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr]">
      <aside className="border-r border-border p-5 space-y-5 overflow-y-auto max-h-screen sticky top-0">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-semibold tracking-tight">Playground</h1>
          <div className="flex items-center gap-1">
            <Link
              href="/compare"
              className="size-7 grid place-items-center rounded text-muted-foreground hover:text-foreground hover:bg-muted"
              title="Compare across themes"
            >
              <Columns3 className="size-4" />
            </Link>
            <Link
              href="/"
              className="size-7 grid place-items-center rounded text-muted-foreground hover:text-foreground hover:bg-muted"
              title="Home"
            >
              <Home className="size-4" />
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter scenes, components, examples…"
            className="w-full h-8 pl-8 pr-7 text-xs border border-border rounded-md bg-card placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 size-5 grid place-items-center rounded hover:bg-muted text-muted-foreground"
              aria-label="Clear search"
            >
              <X className="size-3" />
            </button>
          )}
        </div>

        {noResults && (
          <p className="text-xs text-muted-foreground">
            No matches for &lsquo;{query}&rsquo;.
          </p>
        )}

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

        {(filteredScenes.length > 0 || !query) && (
          <FieldGroup
            title={query ? `Scene (${filteredScenes.length})` : "Scene"}
            hint={view.kind === "scene" ? undefined : "(not active)"}
          >
            {filteredScenes.map((s) => (
              <Radio
                key={s}
                name="view"
                checked={view.kind === "scene" && view.id === s}
                onChange={() => setView({ kind: "scene", id: s })}
                label={s}
              />
            ))}
          </FieldGroup>
        )}

        {(filteredComponents.length > 0 || filteredExamples.length > 0 || !query) && (
        <FieldGroup
          title={
            query
              ? `Component (${filteredComponents.length + filteredExamples.length})`
              : "Component"
          }
          hint={
            view.kind === "scene"
              ? "(not active)"
              : view.kind === "component"
              ? "primitive"
              : "unit example"
          }
        >
          <select
            value={dropdownValue}
            onChange={(e) => onDropdownChange(e.target.value)}
            className="w-full h-9 px-2.5 text-sm border border-border rounded-md bg-card focus:outline-none focus:ring-2 focus:ring-ring"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <option value="" disabled>
              Pick a component or example…
            </option>
            {filteredComponents.length > 0 && (
              <optgroup label="Components (primitives)">
                {filteredComponents.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </optgroup>
            )}
            {filteredExamples.length > 0 && (
              <optgroup label="Examples (component + signature combos)">
                {filteredExamples.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            <span className="font-medium">Primitives</span> show a single registry component in all its
            variants. <span className="font-medium">Examples</span> combine registry components with
            shadcn primitives (Card, Input, Button…) into realistic unit screens.
          </p>
        </FieldGroup>
        )}

        <button
          className="w-full border border-border rounded-md px-3 py-2 text-sm hover:bg-muted"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          Copy URL
        </button>
      </aside>
      <main className="overflow-auto">
        <Content />
      </main>
    </div>
  );
}

function FieldGroup({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{title}</span>
        {hint && <span className="text-[10px] text-muted-foreground/60">{hint}</span>}
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Radio({
  name,
  checked,
  onChange,
  label,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="accent-primary" />
      <span>{label}</span>
    </label>
  );
}
