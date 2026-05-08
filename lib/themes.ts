import type { ThemeMeta, ThemeId } from "@/registry/types";
import { editorial } from "@/registry/themes/editorial/meta";
import { nordic } from "@/registry/themes/nordic/meta";

export const allThemes: ThemeMeta[] = [editorial, nordic];

export function getTheme(id: ThemeId): ThemeMeta | undefined {
  return allThemes.find((t) => t.id === id);
}
