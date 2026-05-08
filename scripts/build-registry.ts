import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { ThemeMeta, ThemeTokens } from "@/registry/types";
import { allThemes } from "@/lib/themes";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(PROJECT_ROOT, "public/r");
const REGISTRY_BASE_URL = "https://solution-themes.vercel.app/r";

export type RegistryItem = {
  $schema?: string;
  name: string;
  type: "registry:theme" | "registry:ui";
  description: string;
  registryDependencies: string[];
  cssVars: { theme: Record<string, Record<string, string>> };
  css: Record<string, Record<string, string>>;
};

function tokensToCssVars(tokens: ThemeTokens): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(tokens)) out[key] = value;
  return out;
}

export function buildRegistryItem(meta: ThemeMeta, rawCss: string): RegistryItem {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `theme-${meta.id}`,
    type: "registry:theme",
    description: meta.description,
    registryDependencies: meta.registryDependencies.map((d) => `${REGISTRY_BASE_URL}/${d}.json`),
    cssVars: {
      theme: {
        [`${meta.id}-light`]: tokensToCssVars(meta.tokens.light),
        [`${meta.id}-dark`]: tokensToCssVars(meta.tokens.dark),
      },
    },
    css: { __raw: { content: rawCss } },
  };
}

function loadThemeCss(id: string): string {
  return readFileSync(resolve(PROJECT_ROOT, `registry/themes/${id}/theme.css`), "utf-8");
}

export function build(): void {
  mkdirSync(OUT_DIR, { recursive: true });
  for (const theme of allThemes) {
    const css = loadThemeCss(theme.id);
    const item = buildRegistryItem(theme, css);
    const outPath = resolve(OUT_DIR, `${item.name}.json`);
    writeFileSync(outPath, JSON.stringify(item, null, 2));
    console.log(`wrote ${outPath}`);
  }
}

if (process.argv[1]?.endsWith("build-registry.ts")) build();
