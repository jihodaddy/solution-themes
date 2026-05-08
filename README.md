# solution-themes

Personal shadcn theme registry — 4 distinct themes for different use contexts.

## Themes

| ID | Name | Best for |
|---|---|---|
| `editorial` | Warm Editorial | Long-form articles, publishing |
| `nordic` | Nordic Calm | Analytics, settings, calm productivity |
| `data-terminal` | Data Terminal | ERP, accounting, financial dashboards |
| `productivity` | Productivity Pro | Kanban, tasks, modern SaaS |

Each theme ships in light + dark.

## Install a theme

```bash
npx shadcn@latest add https://solution-themes.vercel.app/r/theme-data-terminal.json
```

This installs CSS tokens and any required variant components in one command.

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # vitest
pnpm build        # production build (also rebuilds registry JSON)
pnpm build:registry  # rebuild registry JSON only
```

## Project layout

- `registry/` — single source of truth (themes + variant components)
- `scripts/build-registry.ts` — emits `public/r/*.json` from `registry/`
- `app/` — showcase site (landing, theme detail, playground, design page)
- `DESIGN.md` — design rationale and contribution guide

See `DESIGN.md` for design principles and how to add a new theme.
