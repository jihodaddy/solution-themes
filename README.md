# solution-themes

Personal shadcn theme registry — **5 distinct themes** for different use contexts, with **12 registry variant components** that compose into production-grade unit screens.

## Themes

| ID | Name | Best for |
|---|---|---|
| `editorial` | Warm Editorial | Long-form articles, publishing |
| `nordic` | Nordic Calm | Analytics, settings, calm productivity |
| `data-terminal` | Data Terminal | ERP, accounting, financial dashboards |
| `productivity` | Productivity Pro | Kanban, tasks, modern SaaS |
| `atlas` | Atlas Suite | CRM, multi-step forms, business operations, admin consoles |

Each theme ships in light + dark, with theme-specific variant components where tokens alone aren't enough.

## Registry variants

12 reusable components shipped via `npx shadcn add <url>`. Each uses semantic tokens only — they re-skin automatically when you switch themes.

| Variant | Purpose |
|---|---|
| `card-elegant` | Card with serif italic caption — magazine/editorial feel |
| `badge-pill` | Semantic-tone pill (`neutral`/`primary`/`success`/`warning`/`destructive`) |
| `status-dot` | Small colored dot (3 sizes × 5 tones) for activity feeds / live state |
| `stat-card-directional` | KPI card with ▲/▼ delta — color follows delta sign |
| `table-compact` | Dense table primitive with numeric/alignment column flags |
| `theme-switcher` | Self-contained theme + mode picker with `localStorage` persistence |
| `step-indicator` | Multi-step flow indicator — current step always wins visually |
| `toggle-switch` | Boolean filter pill with embedded switch handle (4 tones) |
| `sortable-header` | Sortable `<th>` cell — chevron on active column, faint hint on rest |
| `page-header` | Eyebrow / breadcrumb + title + grouped action row (destructive → secondary → primary) |
| `field` | Label + input wrapper with `stacked` / `inline` layouts, required + error states |
| `empty-state` | Icon + heading + description + dual CTA — for empty lists, errors, 404 |
| `sparkline` | Tiny inline SVG line chart with optional area fill |
| `mini-bar-chart` | Compact SVG bar chart for distributions / short trends |

---

## Quick start (vibe coding)

3 lines, ~2 minutes from blank slate to a styled app:

```bash
pnpm create next-app@latest my-project --typescript --tailwind --app && cd my-project
pnpm dlx shadcn@latest init -d
npx shadcn@latest add https://solution-themes.vercel.app/r/theme-atlas.json --yes
```

Then in `app/layout.tsx`:

```tsx
<html lang="ko" data-theme="atlas" data-mode="light">
  <body>{children}</body>
</html>
```

Done. Use any token utility immediately: `bg-background`, `text-foreground`, `bg-primary`, `bg-success`, `font-display`, etc.

Installing `theme-atlas.json` pulls in **all 12 registry variants** as bundled dependencies — your `components/ui/` ends up fully equipped for CRM/admin/forms work in one command.

### Pick a different theme

Swap the URL in the install command. The `data-theme` attribute name matches the theme ID:

| Theme | Install URL | `data-theme` |
|---|---|---|
| Warm Editorial | `.../r/theme-editorial.json` | `editorial` |
| Nordic Calm | `.../r/theme-nordic.json` | `nordic` |
| Data Terminal | `.../r/theme-data-terminal.json` | `data-terminal` |
| Productivity Pro | `.../r/theme-productivity.json` | `productivity` |
| Atlas Suite | `.../r/theme-atlas.json` | `atlas` |

Each theme installs **only** the variants it actually uses (declared in the theme's `registryDependencies`). Atlas pulls them all; Nordic pulls just `step-indicator`; Editorial pulls none.

### Drop in a ready-made theme switcher (1 line + 1 component)

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

Select dropdown for themes, Sun/Moon button for mode, localStorage persistence, FOUC-safe initial paint — all in one drop-in.

### Make your AI agent theme-aware

Visit **`/agents-md`** on the showcase site → pick your active theme → **Copy** or **Download**. You get a fully-rendered `AGENTS.md` block tailored to your theme: the right `data-theme`, the right variant list, the right token vocabulary, the right "when the user asks for X, prefer Y" map. Paste into your project's `AGENTS.md` / `CLAUDE.md` / `.cursorrules` and your agent uses semantic tokens (`bg-success`, `font-display`) instead of inlining hex.

---

## Showcase site map

The showcase site itself is a useful tool when you're picking a theme or building with one:

| Route | What it does |
|---|---|
| `/` | Landing — theme cards, primary CTAs |
| `/themes/<id>` | Per-theme detail — token swatches, install snippets, demo scenes |
| `/playground` | Theme × mode × scene/component matrix with URL state + sidebar search |
| `/compare` | Same scene rendered in **all 5 themes** side-by-side (scaled iframes) |
| `/design` | DESIGN.md rendered with live token swatches |
| `/agents-md` | `AGENTS.md` template generator — pick a theme, copy/download |

The playground sidebar has a **search box** that filters scenes + components + examples in one shot, plus quick links to `/compare` (Columns3 icon) and `/` (Home icon).

---

## Using a theme in another project

> Replace `https://solution-themes.vercel.app` with the actual deploy URL of this registry.

### 0. Prerequisite — target project must be shadcn-compatible

```bash
pnpm create next-app@latest my-project --typescript --tailwind --app
cd my-project
pnpm dlx shadcn@latest init -d
```

If your project is already shadcn-initialized, skip this step.

### 1. Install a theme (one command)

```bash
npx shadcn@latest add https://solution-themes.vercel.app/r/theme-atlas.json
```

This installs:
- CSS variables (light + dark) into `app/globals.css` — both `[data-theme="X"]` selectors and matching `@theme inline` mappings
- All bundled variant components into `components/ui/`
- Required npm dependencies (e.g., `class-variance-authority`, `lucide-react`)

### 2. Apply the theme

```tsx
// app/layout.tsx
<html lang="en" data-theme="atlas" data-mode="light">
  <body>{children}</body>
</html>
```

`data-theme` selects the token set; `data-mode` toggles light/dark. Switching is pure CSS — no React re-render of styles.

### 3. Just want a single variant? (no theme tokens)

```bash
npx shadcn@latest add https://solution-themes.vercel.app/r/sortable-header.json
```

```tsx
import { SortableHeader } from "@/components/ui/sortable-header";

<th><SortableHeader label="Customer" sortKey="name" sortBy={sortBy} sortDir={sortDir} onSort={onSort} /></th>
```

Every variant in the table at the top of this README has its own JSON endpoint — pick what you need.

---

## Demo scene catalog

The showcase site ships 12 scenes covering common app patterns. Use them as starting points or to gauge how a theme feels in a particular context.

| Scene | What it shows |
|---|---|
| `article` | Long-form layout with serif body — editorial test |
| `dashboard` | KPI row + chart + tabular insights |
| `table` | Order list + detail view with sortable columns |
| `tasks` | Kanban board with drag-style cards |
| `settings` | Profile + notifications form patterns |
| `logistics` | Enterprise B/L / agreement / booking screens (dense forms + workflow status) |
| `process-form` | 6-step wizard with sticky footer, context side-panel |
| `search-board` | Faceted search with quick-tabs, date range, toggles, tags, sortable results |
| `pipeline` | CRM kanban with summary KPIs + inspector drawer |
| `auth` | Sign in / sign up with brand panel |
| `pricing` | 3-tier pricing + feature comparison table + FAQ |
| `empty-states` | Catalog of empty, error, 403, 404, validation, upload states |

Plus **6 unit examples** (`filter-toolbar`, `sortable-table`, `kpi-row`, `activity-feed`, `wizard-block`, `account-summary`) showing how registry variants compose with shadcn primitives — great copy-paste starting points.

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
  - `themes/<id>/{tokens.ts, meta.ts}` — token values + metadata per theme. **No hand-authored CSS** — generated.
  - `components/<variant>.tsx` — 14 registry variant components
- `scripts/build-registry.ts` — TS → JSON + CSS pipeline. Emits:
  - `public/r/*.json` — registry items consumed by `npx shadcn add`
  - `app/styles/themes-generated/<id>.css` — `[data-theme="X"]` rules for the showcase site (gitignored, regenerated on every build)
- `app/` — showcase site
  - `themes/[id]/` — per-theme detail pages + demo scenes
  - `playground/` — theme/mode/scene matrix with sidebar search
  - `compare/` — cross-theme grid view (iframes)
  - `embed/` — chromeless single-scene render (used by `/compare`)
  - `agents-md/` — interactive AGENTS.md generator
  - `design/` — design system doc rendered
- `DESIGN.md` — design rationale (in Korean)
- `tests/` — vitest mechanical checks (token completeness + registry build validation)

### Adding a new theme

See **DESIGN.md §6** for the full recipe. TL;DR:

1. `registry/themes/<id>/tokens.ts` — define `ThemeTokens` for light + dark
2. `registry/themes/<id>/meta.ts` — `ThemeMeta` object
3. `lib/themes.ts` — import + push into `allThemes`
4. `registry/types.ts` `ThemeId` union + `tests/token-completeness.test.ts` `REQUIRED_THEMES`
5. `app/themes/[id]/page.tsx` `SCENES_BY_THEME` mapping
6. `app/globals.css` — add `@import "./styles/themes-generated/<id>.css";`
7. `pnpm test && pnpm build:registry` — token completeness + registry validation

The `/design`, `/playground`, `/compare` pages all iterate `allThemes` — they pick up new themes automatically.

---

## Roadmap

### Shipped

- ✅ **v1** — 4 themes, 5 variants, 4 demo scenes, showcase site, registry build pipeline
- ✅ **v2** — Standard shadcn registry schema (`css.[selector]` instead of `css.__raw`)
- ✅ **v2.1** — Single-source token CSS generation (`tokens.ts` only)
- ✅ **v2.2** — `<ThemeSwitcher />` as 6th registry variant
- ✅ **v2.3** — Settings demo scene
- ✅ **v2.4** — Code snippet panel on theme detail pages
- ✅ **v2.5** — Logistics scene (enterprise B/L / agreement / booking)
- ✅ **v3** — Atlas theme + 3 process scenes (process-form / search-board / pipeline)
- ✅ **v3.1** — Promoted patterns: `step-indicator`, `toggle-switch`, `sortable-header`
- ✅ **v3.2** — Promoted patterns: `page-header`, `field`, `empty-state`
- ✅ **v3.3** — Chart primitives: `sparkline`, `mini-bar-chart`
- ✅ **v3.4** — New scenes: `auth`, `pricing`, `empty-states`
- ✅ **v3.5** — `/compare` cross-theme grid + `/embed` chromeless render
- ✅ **v3.6** — Playground sidebar search + home button
- ✅ **v3.7** — `/agents-md` interactive template generator

### Possible next moves

- **More themes** — Brutalist, Cyberpunk Neon, Soft Pastel (intentionally deferred)
- **Theme builder UI** — OKLCH sliders, live preview, export back to `tokens.ts`
- **Real chart library** — Recharts integration where SVG primitives aren't enough
- **Mobile responsive pass** — sidebar collapsing drawer for dense scenes
- **Visual regression CI** — Playwright snapshot tests across theme × scene × mode
- **Token diff viewer** — pick two themes, see token-by-token differences
- **MCP server** — expose registry as an MCP tool for Claude Desktop / Code agents
