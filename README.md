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

## Quick start (vibe coding)

3 lines, ~2 minutes from blank slate to a styled app:

```bash
pnpm create next-app@latest my-project --typescript --tailwind --app && cd my-project
pnpm dlx shadcn@latest init -d
npx shadcn@latest add https://solution-themes.vercel.app/r/theme-data-terminal.json --yes
```

Then in `app/layout.tsx`:

```tsx
<html lang="ko" data-theme="data-terminal" data-mode="light">
  <body>{children}</body>
</html>
```

Done. Use any token utility immediately: `bg-background`, `text-foreground`, `bg-primary`, `bg-success`, `font-display`, etc.

### Pick a different theme

Swap the URL in the install command. The `data-theme` attribute name matches the theme ID:

| Theme | Install URL | `data-theme` |
|---|---|---|
| Warm Editorial | `.../r/theme-editorial.json` | `editorial` |
| Nordic Calm | `.../r/theme-nordic.json` | `nordic` |
| Data Terminal | `.../r/theme-data-terminal.json` | `data-terminal` |
| Productivity Pro | `.../r/theme-productivity.json` | `productivity` |

### Add a system-preference dark toggle (optional, ~30 sec)

Drop this into `<head>` of `app/layout.tsx` to honor the user's OS dark setting before React hydrates:

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

### Make your AI agent theme-aware

If you use Claude Code, Cursor, Codex, or any coding agent: paste the block from [§5 Helping AI coding tools use the tokens](#5-helping-ai-coding-tools-use-the-tokens) into your project's `CLAUDE.md` / `.cursorrules` / `AGENTS.md`. The agent will then use semantic tokens (`bg-success`, `font-display`) instead of hardcoded hex colors.

For deeper integration (toggle UI, multi-theme switching, per-route theming), see the detailed sections below.

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

### v2.1 — Single-source token CSS generation

Currently `tokens.ts` and `theme.css` duplicate token values (TS for runtime, CSS for showcase). Generate `theme.css` from `tokens.ts` at build time so `tokens.ts` becomes the only authored source.

### v2.2 — Theme builder UI

Sliders for live token tweaking, exporting back to `tokens.ts`.
