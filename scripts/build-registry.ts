import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { ThemeMeta, ThemeTokens } from "@/registry/types";
import { allThemes } from "@/lib/themes";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(PROJECT_ROOT, "public/r");
const REGISTRY_BASE_URL = "https://solution-themes.vercel.app/r";

type VariantSpec = { name: string; sourcePath: string; npmDeps: string[] };

const VARIANTS: VariantSpec[] = [
  { name: "card-elegant", sourcePath: "registry/components/card-elegant.tsx", npmDeps: [] },
  { name: "badge-pill", sourcePath: "registry/components/badge-pill.tsx", npmDeps: ["class-variance-authority"] },
  { name: "status-dot", sourcePath: "registry/components/status-dot.tsx", npmDeps: ["class-variance-authority"] },
  { name: "stat-card-directional", sourcePath: "registry/components/stat-card-directional.tsx", npmDeps: [] },
  { name: "table-compact", sourcePath: "registry/components/table-compact.tsx", npmDeps: [] },
];

export type RegistryItem = {
  $schema?: string;
  name: string;
  type: "registry:theme" | "registry:ui";
  description: string;
  registryDependencies: string[];
  cssVars: { theme: Record<string, Record<string, string>> };
  css: Record<string, unknown>;
  files?: { path: string; content: string; type: "registry:ui" }[];
  dependencies?: string[];
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

export function buildVariantItem(spec: VariantSpec, content: string): RegistryItem {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: spec.name,
    type: "registry:ui",
    description: `Variant component: ${spec.name}`,
    registryDependencies: [],
    cssVars: { theme: {} },
    css: {},
    files: [
      {
        path: `components/ui/${spec.name}.tsx`,
        content,
        type: "registry:ui",
      },
    ],
    dependencies: spec.npmDeps,
  };
}

function loadThemeCss(id: string): string {
  return readFileSync(resolve(PROJECT_ROOT, `registry/themes/${id}/theme.css`), "utf-8");
}

export function validateRegistryDependencies(
  themes: ThemeMeta[],
  availableVariants: string[]
): void {
  const known = new Set(availableVariants);
  for (const theme of themes) {
    for (const dep of theme.registryDependencies) {
      if (!known.has(dep)) {
        throw new Error(
          `theme '${theme.id}' depends on '${dep}' but that variant is not registered`
        );
      }
    }
  }
}

export function build(): void {
  mkdirSync(OUT_DIR, { recursive: true });
  const variantNames = VARIANTS.map((v) => v.name);
  validateRegistryDependencies(allThemes, variantNames);

  for (const theme of allThemes) {
    const css = loadThemeCss(theme.id);
    const item = buildRegistryItem(theme, css);
    writeFileSync(resolve(OUT_DIR, `${item.name}.json`), JSON.stringify(item, null, 2));
    console.log(`wrote theme-${theme.id}.json`);
  }

  for (const variant of VARIANTS) {
    const content = readFileSync(resolve(PROJECT_ROOT, variant.sourcePath), "utf-8");
    const item = buildVariantItem(variant, content);
    writeFileSync(resolve(OUT_DIR, `${variant.name}.json`), JSON.stringify(item, null, 2));
    console.log(`wrote ${variant.name}.json`);
  }
}

if (process.argv[1]?.endsWith("build-registry.ts")) build();
