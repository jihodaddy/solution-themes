import type { ThemeMeta } from "@/registry/types";
import { productivityLight, productivityDark } from "./tokens";

export const productivity: ThemeMeta = {
  id: "productivity",
  name: "Productivity Pro",
  description: "Modern white surface with colored pill tags for SaaS internal tools and task management.",
  intendedContexts: ["Kanban boards", "Task lists", "Internal SaaS tools"],
  fonts: [{ family: "Inter", subsets: ["latin"], variable: "--font-inter" }],
  registryDependencies: [],
  tokens: { light: productivityLight, dark: productivityDark },
};
