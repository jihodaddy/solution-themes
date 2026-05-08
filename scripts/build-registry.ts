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
  cssVars?: {
    theme?: Record<string, string>;
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  css?: Record<string, Record<string, string>>;
  files?: { path: string; content: string; type: "registry:ui" }[];
  dependencies?: string[];
};

// Tailwind v4 @theme inline mappings — extension tokens that shadcn init doesn't ship
const EXTENSION_THEME_VARS: Record<string, string> = {
  "color-success": "var(--success)",
  "color-success-foreground": "var(--success-foreground)",
  "color-warning": "var(--warning)",
  "color-warning-foreground": "var(--warning-foreground)",
};

function tokensToCssDecls(tokens: ThemeTokens): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(tokens)) {
    out[`--${key}`] = value;
  }
  return out;
}

export function buildRegistryItem(meta: ThemeMeta): RegistryItem {
  const lightSel = `[data-theme="${meta.id}"]`;
  const darkSel = `[data-theme="${meta.id}"][data-mode="dark"]`;

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `theme-${meta.id}`,
    type: "registry:theme",
    description: meta.description,
    registryDependencies: meta.registryDependencies.map(
      (d) => `${REGISTRY_BASE_URL}/${d}.json`
    ),
    cssVars: { theme: EXTENSION_THEME_VARS },
    css: {
      [lightSel]: tokensToCssDecls(meta.tokens.light),
      [darkSel]: tokensToCssDecls(meta.tokens.dark),
    },
  };
}

export function buildVariantItem(spec: VariantSpec, content: string): RegistryItem {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: spec.name,
    type: "registry:ui",
    description: `Variant component: ${spec.name}`,
    registryDependencies: [],
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
    const item = buildRegistryItem(theme);
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
