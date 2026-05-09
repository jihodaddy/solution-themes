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

### Drop in a ready-made theme switcher (1 line + 1 component)

Install the bundled `<ThemeSwitcher />` and you get a Select dropdown for themes, a Sun/Moon button for mode, localStorage persistence, and FOUC-safe initial paint — all in one go:

```bash
npx shadcn@latest add https://solution-themes.vercel.app/r/theme-switcher.json --yes
```

```tsx
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

export default function Header() {
  return (
    <header className="...">
      {/* ...your nav... */}
      <ThemeSwitcher />
    </header>
  );
}
```

That's it. Users can now switch between all 4 themes and toggle dark mode from the UI.

> Want only system-preference dark mode (no UI)? See the [advanced section](#3-add-a-theme-switcher) below for the inline-script approach.

### Make your AI agent theme-aware

Every theme detail page on the showcase site has a **"Code snippets" tab → "AI agent context"** that produces a markdown block tailored for that exact theme (right ID, right variants list). Copy → paste into your `CLAUDE.md` / `.cursorrules` / `AGENTS.md`. The agent will then use semantic tokens (`bg-success`, `font-display`) instead of hardcoded hex colors.

For deeper integration (per-route theming, custom switchers, build pipelines), see the detailed sections below.

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
- CSS variables (light + dark) into `app/globals.css` — both `[data-theme="X"]` selectors and matching `@theme inline` mappings
- Variant components into `components/ui/` (e.g., Data Terminal pulls in `table-compact.tsx` and `stat-card-directional.tsx`)
- Required npm dependencies (e.g., `class-variance-authority`, `lucide-react`)

### 2. Apply the theme

In your `app/layout.tsx`:

```tsx
<html lang="en" data-theme="data-terminal" data-mode="light">
  <body>{children}</body>
</html>
```

The `data-theme` attribute selects which token set is active. The `data-mode` attribute toggles between light and dark. **Switching is pure CSS** — no React re-render of styles.

### 3. Add a theme switcher

**Option A — Use the bundled `<ThemeSwitcher />` (recommended)**

```bash
npx shadcn@latest add https://solution-themes.vercel.app/r/theme-switcher.json --yes
```

```tsx
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

<ThemeSwitcher />
```

The component is installed as source (`components/ui/theme-switcher.tsx`) — edit it freely if you want different theme names, fewer themes, or a different look. By default: Select dropdown for theme + icon button for mode, persists to `localStorage` (`st-theme`, `st-mode`).

**Option B — Manual inline switching (advanced)**

If you want only system-preference dark mode (no interactive UI), or you're building your own switcher, add this small inline script to `<head>` to set the right mode before React hydrates:

```tsx
<head>
  <script dangerouslySetInnerHTML={{ __html: `
    (function () {
      var m = localStorage.getItem("st-mode") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.setAttribute("data-mode", m);
    })();
  ` }} />
</head>
```

Toggle from anywhere:

```ts
const next = document.documentElement.getAttribute("data-mode") === "dark" ? "light" : "dark";
document.documentElement.setAttribute("data-mode", next);
localStorage.setItem("st-mode", next);
```

### 4. Just want a single variant? (no theme tokens)

```bash
npx shadcn@latest add https://solution-themes.vercel.app/r/badge-pill.json
```

```tsx
import { BadgePill } from "@/components/ui/badge-pill";

<BadgePill tone="success">완료</BadgePill>
```

Available standalone variants:

| Variant | Purpose |
|---|---|
| `card-elegant` | Card with serif italic caption — magazine/editorial feel |
| `badge-pill` | Rounded-full badge with `neutral`/`primary`/`success`/`warning`/`destructive` tones |
| `status-dot` | Small colored dot for status indicators (3 sizes × 5 tones) |
| `stat-card-directional` | KPI card with ▲/▼ delta indicator and tabular numerics |
| `table-compact` | Dense table with monospace numerics column support |
| `theme-switcher` | Self-contained theme + mode switcher with persistence |

### 5. Helping AI coding tools use the tokens

The fastest path: visit any theme's detail page on the showcase site (e.g. `/themes/data-terminal`), open the "Code snippets" panel, switch to the "AI agent context" tab, click Copy. You get a markdown block tailored for that theme.

Manually, the block looks like this — adapt the theme ID and variant list:

````markdown
## Theme System

This project uses solution-themes (`data-terminal` preset — Data Terminal).
Active theme: applied via `[data-theme="data-terminal"]` on `<html>`.

Tokens available (use these, never hardcode colors):
- Surfaces: `bg-background`, `bg-card`, `bg-muted`, `bg-popover`
- Foreground: `text-foreground`, `text-muted-foreground`, `text-card-foreground`
- Brand: `bg-primary`, `text-primary-foreground`, `bg-accent`
- Signals: `bg-success`, `bg-warning`, `bg-destructive` (+ their `-foreground` counterparts)
- Borders: `border-border`, `border-input`
- Typography: `font-sans`, `font-serif`, `font-mono`, `font-display`, `font-numeric`

Custom variants installed with this theme:
- `table-compact` (components/ui/table-compact.tsx)
- `stat-card-directional` (components/ui/stat-card-directional.tsx)

Dark mode: toggle `[data-mode="dark"]` on `<html>`.
````

---

## Local development (this repo)

```bash
pnpm install
pnpm dev              # http://localhost:3000
pnpm test             # vitest — token completeness + registry build validation
pnpm build            # production build (also rebuilds registry JSON + showcase CSS via prebuild hook)
pnpm build:registry   # rebuild registry JSON + showcase CSS only
```

## Project layout

- `registry/` — single source of truth
  - `themes/<id>/{tokens.ts, meta.ts}` — token values + metadata per theme. **No hand-authored CSS** — `theme.css` is generated.
  - `components/<variant>.tsx` — variant components (6)
- `scripts/build-registry.ts` — TS → JSON + CSS pipeline. Emits both:
  - `public/r/*.json` — registry items consumed by `npx shadcn add`
  - `app/styles/themes-generated/<id>.css` — `[data-theme="X"]` rules consumed by the showcase site (gitignored, regenerated on every build)
- `app/` — showcase site (landing, theme detail, playground, design page)
- `DESIGN.md` — design rationale and contribution guide
- `tests/` — vitest mechanical checks (token completeness, registry build validation)

### Adding a new theme

1. `registry/themes/<id>/tokens.ts` — define `ThemeTokens` for light + dark
2. `registry/themes/<id>/meta.ts` — `ThemeMeta` (id, name, description, fonts, registryDependencies, tokens)
3. Add the new theme to `lib/themes.ts` (import + push into `allThemes`)
4. Update `app/themes/[id]/page.tsx` `SCENES_BY_THEME` mapping with relevant scenes
5. Update `registry/components/theme-switcher.tsx` `THEMES` array if you want it in the bundled switcher
6. `pnpm test && pnpm build:registry` — token completeness test + registry validation should pass

The build pipeline auto-generates `app/styles/themes-generated/<id>.css` and `public/r/theme-<id>.json`. The `/design` page picks up the new theme automatically.

See `DESIGN.md` for the full design rationale.

---

## Roadmap

### Shipped

- ✅ **v1** — 4 themes, 5 variants, 4 demo scenes, showcase site, registry build pipeline
- ✅ **v2** — Standard shadcn registry schema (`css.[selector]` instead of `css.__raw`)
- ✅ **v2.1** — Single-source token CSS generation (`tokens.ts` only; `theme.css` deleted)
- ✅ **v2.2** — `<ThemeSwitcher />` as 6th registry variant
- ✅ **v2.3** — Settings demo scene (forms: Input, Select, Checkbox, Radio, Switch, Textarea)
- ✅ **v2.4** — Code snippet panel on theme detail pages (4 tabs, copy-to-clipboard)

### Possible next moves

- **v3 — More themes** — Brutalist, Cyberpunk Neon, Soft Pastel (originally explored, intentionally deferred)
- **v3 — Theme builder UI** — sliders for live token tweaking, export back to `tokens.ts`
- **v3 — Real chart library** — Recharts integration for dashboard demo with actual data viz
- **v3 — Mobile responsive** — sidebar collapsing drawer for scenes
- **v3 — Visual regression CI** — Playwright snapshot tests across theme × scene × mode
- **v3 — Token diff viewer** — pick two themes on the design page, see token-by-token differences
- **v3 — MCP server** — expose registry as an MCP tool so Claude Desktop / Code agents can install + preview themes natively
