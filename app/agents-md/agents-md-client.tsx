"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { allThemes } from "@/lib/themes";
import type { ThemeId } from "@/registry/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, Home, Download } from "lucide-react";

const REGISTRY_BASE_URL = "https://solution-themes.vercel.app/r";

function buildAgentsMd(themeId: ThemeId): string {
  const theme = allThemes.find((t) => t.id === themeId);
  if (!theme) return "";

  const variantList = theme.registryDependencies.length
    ? theme.registryDependencies
        .map((v) => `- \`${v}\` — \`components/ui/${v}.tsx\``)
        .join("\n")
    : "- (none — this theme is token-only)";

  return `# AI Agent Rules — solution-themes

> Paste this block into your project's \`AGENTS.md\` (or \`CLAUDE.md\`) so AI coding agents pick up the correct conventions on the first prompt.

## Active theme

This project uses **solution-themes** with the \`${theme.id}\` preset (**${theme.name}**).

- **Intended contexts**: ${theme.intendedContexts.join(" · ")}
- Theme is applied via \`[data-theme="${theme.id}"]\` on \`<html>\`.
- Dark mode is toggled via \`[data-mode="dark"]\` on \`<html>\` (independent from theme).
- Switching modes is pure CSS — no React re-render of styles.

## Token rules (the only rule that matters)

**Never hardcode colors.** All color, typography, radius, and shadow values must come from the semantic tokens below. If you need a color that doesn't have a token, propose adding the token to \`tokens.ts\` rather than inlining \`oklch(…)\` or \`#hex\`.

### Surfaces
- \`bg-background\`, \`bg-card\`, \`bg-muted\`, \`bg-popover\`, \`bg-secondary\`

### Foreground (text)
- \`text-foreground\`, \`text-muted-foreground\`, \`text-card-foreground\`, \`text-popover-foreground\`, \`text-secondary-foreground\`

### Brand
- \`bg-primary\`, \`text-primary-foreground\`
- \`bg-accent\`, \`text-accent-foreground\`

### Signals
- \`bg-success\` + \`text-success-foreground\` (positive outcomes)
- \`bg-warning\` + \`text-warning-foreground\` (caution)
- \`bg-destructive\` + \`text-destructive-foreground\` (errors, destructive actions)

### Borders + rings
- \`border-border\`, \`border-input\` (form fields), \`ring-ring\`

### Typography
- \`font-sans\` — body
- \`font-serif\` — editorial / longform
- \`font-mono\` — code, IDs
- \`font-display\` — headlines
- \`font-numeric\` — tabular numbers, KPIs (often monospace for alignment)

### Radius + shadows
- Use the \`rounded-*\` Tailwind scale (derived from \`--radius\`); avoid arbitrary px values.
- Use \`shadow-sm\` / \`shadow-md\` (token-driven); skip larger built-in shadows that ignore the theme.

## Component layers (don't mix them up)

1. **shadcn baseline** — \`components/ui/button.tsx\`, \`card.tsx\`, \`input.tsx\`, etc. **Do NOT modify these directly.** They are the reset layer.
2. **Registry variants** — components installed via \`npx shadcn add <url>\`. Compose these freely. Customize only via props (\`tone\`, \`size\`, etc.) or wrapping.
3. **App components** — your project's own components. Import from layers 1 + 2 freely; never duplicate primitives.

If you need a new component variant, **add a new file** to layer 2 — don't fork a shadcn baseline.

## Variants installed with this theme

${variantList}

## When the user asks for X, prefer Y

- "make this a badge" → \`BadgePill\` from registry (semantic tone via prop), not \`<span class="bg-blue-500 …">\`.
- "show status" → \`StatusDot\` (5 tones × 3 sizes), not a colored div.
- "KPI card" → \`StatCardDirectional\` (auto arrow + color from delta sign), not a hand-rolled stat.
- "data table" → \`TableCompact\` (numeric/alignment props), not a raw \`<table>\`.
- "stepper / wizard" → \`StepIndicator\` from registry.
- "filter toggle pill" → \`ToggleSwitch\` from registry.
- "sortable column header" → \`SortableHeader\` from registry.
- "form field with label" → \`Field\` from registry (stacked or inline layout).
- "empty state / 404 / no results" → \`EmptyState\` from registry.
- "page header (title + breadcrumb + actions)" → \`PageHeader\` from registry.
- "small inline trend chart" → \`Sparkline\` from registry.
- "bar distribution" → \`MiniBarChart\` from registry.

## Don'ts

- Don't author CSS in \`app/styles/themes-generated/*.css\` — it's regenerated on every build from \`tokens.ts\`.
- Don't put hex / oklch values in markdown docs — only in \`tokens.ts\`.
- Don't add a new dependency without checking existing ones first (\`lucide-react\` for icons, \`class-variance-authority\` for variant typing, \`react-markdown\` + \`remark-gfm\` for the design page).
- Don't modify shadcn baseline files. Add new variants in \`registry/components/\` instead.
- Don't introduce raw colored Tailwind classes (\`bg-blue-500\`, \`text-green-700\`). Use semantic tokens.

## Install (run once)

\`\`\`bash
# Theme + bundled variants
npx shadcn@latest add ${REGISTRY_BASE_URL}/theme-${theme.id}.json --yes
\`\`\`

This installs every variant listed under \`registryDependencies\` automatically.

## Apply (in your root layout)

\`\`\`tsx
// app/layout.tsx
<html lang="en" data-theme="${theme.id}" data-mode="light">
  <body>{children}</body>
</html>
\`\`\`

For no-flash initial paint, set the attributes from \`localStorage\` in a \`<script>\` in \`<head>\` before React hydrates (see the project README for the standard snippet).

---

_Generated for theme **${theme.name}** (\`${theme.id}\`) — ${theme.description}_
`;
}

export function AgentsMdClient() {
  const [themeId, setThemeId] = useState<ThemeId>("atlas");
  const [copied, setCopied] = useState(false);

  const markdown = useMemo(() => buildAgentsMd(themeId), [themeId]);
  const theme = allThemes.find((t) => t.id === themeId);

  function copy() {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function download() {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `AGENTS-${themeId}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="size-8 grid place-items-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
            aria-label="Home"
          >
            <Home className="size-4" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              AI agent rules generator
            </p>
            <h1 className="text-lg font-semibold tracking-tight">AGENTS.md template</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={themeId} onValueChange={(v) => v && setThemeId(v as ThemeId)}>
              <SelectTrigger size="sm" className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {allThemes.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              onClick={download}
              className="h-8 px-3 text-xs rounded-md border border-border bg-card hover:bg-muted inline-flex items-center gap-1.5"
            >
              <Download className="size-3.5" />
              Download
            </button>
            <button
              onClick={copy}
              className="h-8 px-3 text-xs rounded-md bg-primary text-primary-foreground hover:opacity-90 inline-flex items-center gap-1.5"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="prose-context mb-6 text-sm text-muted-foreground max-w-3xl leading-relaxed">
          <p>
            This template is a drop-in <code style={{ fontFamily: "var(--font-mono)" }}>AGENTS.md</code>{" "}
            block tailored to the <span className="font-medium text-foreground">{theme?.name}</span>{" "}
            theme. Paste it at the top of your project&apos;s <code style={{ fontFamily: "var(--font-mono)" }}>AGENTS.md</code>{" "}
            (or <code style={{ fontFamily: "var(--font-mono)" }}>CLAUDE.md</code>) so an AI coding agent
            picks up the right token vocabulary, layer rules, and component preferences on the first
            prompt — no need to repeat &quot;use the design system&quot; ten times.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
            <span
              className="text-xs text-muted-foreground"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              AGENTS-{themeId}.md · {markdown.length.toLocaleString()} chars
            </span>
            <span className="text-[10px] text-muted-foreground">
              Updates live with your theme selection ↑
            </span>
          </div>
          <pre
            className="overflow-auto p-5 text-xs leading-relaxed bg-background"
            style={{ fontFamily: "var(--font-mono)", maxHeight: "70vh" }}
          >
            <code>{markdown}</code>
          </pre>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-muted-foreground">
          <div className="rounded-md border border-border bg-card p-3">
            <p className="font-medium text-foreground mb-1">Why it works</p>
            Agents skip ambiguous prompts when conventions are codified. This file is the convention.
          </div>
          <div className="rounded-md border border-border bg-card p-3">
            <p className="font-medium text-foreground mb-1">Refresh after changes</p>
            Re-generate whenever you switch the active theme or add a new registry variant.
          </div>
          <div className="rounded-md border border-border bg-card p-3">
            <p className="font-medium text-foreground mb-1">Combine with project rules</p>
            Append this block to existing <code style={{ fontFamily: "var(--font-mono)" }}>AGENTS.md</code>;
            don&apos;t overwrite project-specific sections.
          </div>
        </div>
      </main>
    </div>
  );
}
