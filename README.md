# solution-themes

Personal shadcn theme registry — 4 distinct themes for different use contexts.

## Themes

| ID | Name | Best for |
|---|---|---|
| `editorial` | Warm Editorial | Long-form articles, publishing |
| `nordic` | Nordic Calm | Analytics, settings, calm productivity |
| `data-terminal` | Data Terminal | ERP, accounting, financial dashboards |
| `productivity` | Productivity Pro | Kanban, tasks, modern SaaS |

Each theme ships in light + dark, with theme-specific variant components where tokens alone aren't enough.

---

## Using a theme in another project

> Replace `https://solution-themes.vercel.app` with the actual deploy URL of this registry.

### 0. Prerequisite — target project must be shadcn-compatible

```bash
# New Next.js project
pnpm create next-app@latest my-project --typescript --tailwind --app
cd my-project
pnpm dlx shadcn@latest init -d
```

If your project is already shadcn-initialized, skip this step.

### 1. Install a theme (one command)

```bash
# Editorial — long-form articles, publishing
npx shadcn@latest add https://solution-themes.vercel.app/r/theme-editorial.json

# Nordic Calm — analytics, productivity
npx shadcn@latest add https://solution-themes.vercel.app/r/theme-nordic.json

# Data Terminal — ERP, accounting
npx shadcn@latest add https://solution-themes.vercel.app/r/theme-data-terminal.json

# Productivity Pro — kanban, tasks
npx shadcn@latest add https://solution-themes.vercel.app/r/theme-productivity.json
```

This installs:
- CSS variables (light + dark) into `app/globals.css`
- Variant components into `components/ui/` (e.g., Data Terminal pulls in `table-compact.tsx` and `stat-card-directional.tsx`)
- Required npm dependencies (e.g., `class-variance-authority`)

### 2. Apply the theme

In your `app/layout.tsx`:

```tsx
<html lang="en" data-theme="data-terminal" data-mode="light">
  <body>{children}</body>
</html>
```

The `data-theme` attribute selects which token set is active. The `data-mode` attribute toggles between light and dark. **Switching is pure CSS** — no React re-render of styles.

### 3. (Optional) Light/dark toggle with no FOUC

Add a small inline script to `<head>` so the right mode is set before React hydrates:

```tsx
<head>
  <script dangerouslySetInnerHTML={{ __html: `
    (function () {
      var m = localStorage.getItem("mode") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.setAttribute("data-mode", m);
    })();
  ` }} />
</head>
```

Toggle from anywhere:

```ts
const next = document.documentElement.getAttribute("data-mode") === "dark" ? "light" : "dark";
document.documentElement.setAttribute("data-mode", next);
localStorage.setItem("mode", next);
```

### 4. Just want a single variant? (no theme tokens)

```bash
npx shadcn@latest add https://solution-themes.vercel.app/r/badge-pill.json
```

```tsx
import { BadgePill } from "@/components/ui/badge-pill";

<BadgePill tone="success">완료</BadgePill>
```

Available standalone variants: `card-elegant`, `badge-pill`, `status-dot`, `stat-card-directional`, `table-compact`.

### 5. Helping AI coding tools use the tokens

Drop a short note into your project's `CLAUDE.md` / `.cursorrules` / agent instructions so the AI uses semantic tokens instead of hardcoded colors:

````markdown
## Theme System
This project uses solution-themes (Data Terminal preset).
Active theme: applied via `[data-theme="data-terminal"]` on `<html>`.

Tokens available (use these, never hardcode colors):
- Surfaces: `bg-background`, `bg-card`, `bg-muted`, `bg-popover`
- Foreground: `text-foreground`, `text-muted-foreground`, `text-card-foreground`
- Brand: `bg-primary`, `text-primary-foreground`, `bg-accent`
- Signals: `bg-success`, `bg-warning`, `bg-destructive` (+ their `-foreground` counterparts)
- Borders: `border-border`, `border-input`
- Typography: `font-sans`, `font-serif`, `font-mono`, `font-display`, `font-numeric`

Custom variants (this theme):
- `TableCompact` (components/ui/table-compact.tsx) — dense rows + tabular-nums
- `StatCardDirectional` (components/ui/stat-card-directional.tsx) — ▲/▼ delta indicator

Dark mode: toggle `[data-mode="dark"]` on `<html>`.
````

### Known limitation (v1)

The current registry JSON uses a non-standard `css.__raw` field for `[data-theme="X"]`-scoped CSS. Variant components and basic `cssVars` install cleanly, but the theme activation CSS may not be auto-injected by the shadcn CLI. Workaround until v2 ships the standard schema:

```bash
# Manually fetch the theme.css for the theme you want
curl -o app/styles/theme-data-terminal.css \
  https://raw.githubusercontent.com/jihodaddy/solution-themes/main/registry/themes/data-terminal/theme.css
```

Then in `app/globals.css`:

```css
@import "../styles/theme-data-terminal.css";
```

This v2 migration is tracked at the bottom of this README.

---

## Local development (this repo)

```bash
pnpm install
pnpm dev              # http://localhost:3000
pnpm test             # vitest — token completeness + registry build validation
pnpm build            # production build (also rebuilds registry JSON via prebuild hook)
pnpm build:registry   # rebuild registry JSON only → public/r/*.json
```

## Project layout

- `registry/` — single source of truth (themes + variant components)
  - `themes/<id>/{tokens.ts, meta.ts, theme.css}` — one folder per theme
  - `components/<variant>.tsx` — variant components (5)
- `scripts/build-registry.ts` — TS → JSON pipeline (emits `public/r/*.json`)
- `app/` — showcase site (landing, theme detail, playground, design page)
- `DESIGN.md` — design rationale and contribution guide
- `tests/` — vitest mechanical checks

See `DESIGN.md` for design principles and how to add a new theme.

---

## Roadmap

### v2 — Standard shadcn registry schema

Migrate `css.__raw` to the canonical `Record<selector, declarations>` shape so `npx shadcn add` auto-injects `[data-theme="X"]` CSS without the manual workaround. Tracked in `scripts/build-registry.ts`.
