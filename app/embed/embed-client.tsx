"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
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

const SCENES: Record<string, React.FC> = {
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

/**
 * Chromeless single-scene renderer for iframe embedding.
 *
 * URL params:
 *   ?scene=<id>&theme=<theme>&mode=<light|dark>
 *
 * Used by /compare to render 5 themes side-by-side without sidebar / chrome.
 */
export function EmbedClient() {
  const params = useSearchParams();
  const theme = (params.get("theme") as ThemeId) || "editorial";
  const mode = (params.get("mode") as Mode) || "light";
  const sceneId = params.get("scene") || "article";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-mode", mode);
  }, [theme, mode]);

  const Scene = SCENES[sceneId] ?? ArticleScene;
  return <Scene />;
}
