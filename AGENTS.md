<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project: solution-themes

This repo IS the solution-themes registry — a Next.js app that's both a showcase site and a self-hosted shadcn registry. It ships 4 themes (`editorial`, `nordic`, `data-terminal`, `productivity`) and 6 variant components via `npx shadcn add` URLs.

## Theme system rules (when working in this repo)

- **Single source of truth**: `registry/themes/<id>/tokens.ts` defines all token values. Never hardcode `oklch(...)` or hex colors anywhere in the showcase site or variant components — use the semantic tokens.
- **CSS is generated, not authored**: `app/styles/themes-generated/<id>.css` is a build artifact (gitignored). Do NOT edit it directly. Edit `tokens.ts` and run `pnpm build:registry` (or just `pnpm dev` / `pnpm build` — the `predev` and `prebuild` hooks handle it).
- **Theme activation**: applied via `[data-theme="X"]` and `[data-mode="dark"]` on `<html>`. Switching is pure CSS, no React re-render of styles.
- **Available semantic Tailwind utilities** (use these, never hardcode):
  - Surfaces: `bg-background`, `bg-card`, `bg-muted`, `bg-popover`
  - Foreground: `text-foreground`, `text-muted-foreground`, `text-card-foreground`
  - Brand: `bg-primary`, `text-primary-foreground`, `bg-accent`
  - Signals: `bg-success`, `bg-warning`, `bg-destructive` (+ each `-foreground` counterpart)
  - Borders: `border-border`, `border-input`, `ring`
  - Typography: `font-sans`, `font-serif`, `font-mono`, `font-display`, `font-numeric`
- **Variant components** (in `registry/components/`):
  - `card-elegant` — magazine-style card with serif italic caption
  - `badge-pill` — rounded-full badge with `neutral`/`primary`/`success`/`warning`/`destructive` tones
  - `status-dot` — colored indicator dot (3 sizes × 5 tones)
  - `stat-card-directional` — KPI card with ▲/▼ delta and tabular numerics
  - `table-compact` — dense table with `numeric` column flag for monospace numerics
  - `theme-switcher` — Select dropdown + Sun/Moon button with localStorage persistence
- **shadcn baseline UI** (in `components/ui/`): button, card, badge, table, tabs, select, separator, label, input. Do NOT modify these directly. Add variants in `registry/components/` instead.

## Build pipeline

- `pnpm test` — vitest mechanical checks (token completeness, registry build validation, dependency check)
- `pnpm build:registry` — emits both `public/r/*.json` (registry items consumed by `npx shadcn add`) and `app/styles/themes-generated/*.css` (showcase CSS) from `registry/themes/`
- `predev` / `prebuild` npm hooks run `build:registry` automatically before `next dev` / `next build`

## Adding a new theme

1. Create `registry/themes/<id>/tokens.ts` — export `<name>Light: ThemeTokens` and `<name>Dark: ThemeTokens`
2. Create `registry/themes/<id>/meta.ts` — export `<name>: ThemeMeta` (id, name, description, fonts, registryDependencies, tokens)
3. Update `lib/themes.ts` — import + push into `allThemes` array
4. Update `registry/types.ts` `ThemeId` union if the new ID is novel
5. Update `app/themes/[id]/page.tsx` `SCENES_BY_THEME` mapping with relevant scenes
6. (Optional) Add to `registry/components/theme-switcher.tsx` `THEMES` array
7. `pnpm test` — token completeness must pass
8. `pnpm build:registry` — generates CSS + JSON outputs

The `/design` page picks up the new theme automatically (renders all themes from `allThemes`).

## Don't

- Don't introduce a new dependency without checking if existing ones cover it. `lucide-react` for icons. `class-variance-authority` for component variant typing. `react-markdown` + `remark-gfm` for the `/design` page.
- Don't add new tokens without updating `registry/types.ts` — the union type drives the token completeness test.
- Don't modify shadcn baseline components (`components/ui/button.tsx`, etc.). Add variants in `registry/components/`.
- Don't put hex/oklch values in `DESIGN.md` — only in `tokens.ts`. `DESIGN.md` is for principles and rationale; the live `/design` page reads values from tokens at render time.
- Don't edit `app/styles/themes-generated/*.css` — it's regenerated on every build.

## Useful files

- `DESIGN.md` — design rationale (the why), in Korean
- `README.md` — consumer-facing usage guide (install, apply, AI agent block)
- `docs/superpowers/specs/2026-05-08-solution-themes-design-system.md` — original spec
- `docs/superpowers/plans/2026-05-08-solution-themes-implementation.md` — original plan
