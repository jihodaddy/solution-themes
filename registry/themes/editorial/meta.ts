import type { ThemeMeta } from "@/registry/types";
import { editorialLight, editorialDark } from "./tokens";

export const editorial: ThemeMeta = {
  id: "editorial",
  name: "Warm Editorial",
  description: "Warm neutrals and serif headings for long-form reading and publishing.",
  intendedContexts: ["Long-form articles", "Magazine grids", "Publishing"],
  fonts: [
    { family: "Inter", subsets: ["latin"], variable: "--font-inter" },
    { family: "Source_Serif_4", subsets: ["latin"], variable: "--font-source-serif" },
  ],
  registryDependencies: ["card-elegant"],
  tokens: { light: editorialLight, dark: editorialDark },
};
