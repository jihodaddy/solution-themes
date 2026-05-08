import { describe, it, expect } from "vitest";
import { ALL_TOKEN_KEYS, type ThemeId } from "@/registry/types";
import { allThemes } from "@/lib/themes";

const REQUIRED_THEMES: ThemeId[] = ["editorial", "nordic", "data-terminal", "productivity"];

describe("token completeness", () => {
  it("includes all 4 required themes", () => {
    const ids = allThemes.map((t) => t.id).sort();
    expect(ids).toEqual([...REQUIRED_THEMES].sort());
  });

  it.each(REQUIRED_THEMES)("%s defines every required token in light and dark", (id) => {
    const theme = allThemes.find((t) => t.id === id);
    expect(theme, `theme ${id} not found`).toBeDefined();
    if (!theme) return;
    for (const mode of ["light", "dark"] as const) {
      for (const key of ALL_TOKEN_KEYS) {
        expect(theme.tokens[mode][key], `${id}.${mode}.${key} missing`).toBeTypeOf("string");
        expect(theme.tokens[mode][key].length, `${id}.${mode}.${key} empty`).toBeGreaterThan(0);
      }
    }
  });
});
