import type { ThemeMeta } from "@/registry/types";
import { atlasLight, atlasDark } from "./tokens";

export const atlas: ThemeMeta = {
  id: "atlas",
  name: "Atlas Suite",
  description: "Modern enterprise SaaS aesthetic — deep violet primary, warm slate surface, generous radius. For business solutions that need to feel polished without losing density.",
  intendedContexts: ["CRM pipelines", "Multi-step forms", "Business operations", "Admin consoles"],
  fonts: [{ family: "Inter", subsets: ["latin"], variable: "--font-inter" }],
  registryDependencies: [
    "badge-pill",
    "status-dot",
    "stat-card-directional",
    "table-compact",
    "step-indicator",
    "toggle-switch",
    "sortable-header",
    "page-header",
    "field",
    "empty-state",
    "sparkline",
    "mini-bar-chart",
  ],
  tokens: { light: atlasLight, dark: atlasDark },
};
