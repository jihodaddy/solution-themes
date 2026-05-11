import type { ThemeMeta, ThemeId } from "@/registry/types";
import { editorial } from "@/registry/themes/editorial/meta";
import { nordic } from "@/registry/themes/nordic/meta";
import { dataTerminal } from "@/registry/themes/data-terminal/meta";
import { productivity } from "@/registry/themes/productivity/meta";
import { atlas } from "@/registry/themes/atlas/meta";

export const allThemes: ThemeMeta[] = [editorial, nordic, dataTerminal, productivity, atlas];

export function getTheme(id: ThemeId): ThemeMeta | undefined {
  return allThemes.find((t) => t.id === id);
}
