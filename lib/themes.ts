import type { ThemeMeta, ThemeId } from "@/registry/types";
import { editorial } from "@/registry/themes/editorial/meta";

export const allThemes: ThemeMeta[] = [editorial];

export function getTheme(id: ThemeId): ThemeMeta | undefined {
  return allThemes.find((t) => t.id === id);
}
