import { notFound } from "next/navigation";
import { allThemes, getTheme } from "@/lib/themes";
import { SEMANTIC_TOKEN_KEYS, type ThemeId, type ThemeMeta } from "@/registry/types";
import { ArticleScene } from "./demos/article";
import { DashboardScene } from "./demos/dashboard";
import { TableScene } from "./demos/table";
import { TasksScene } from "./demos/tasks";
import { SettingsScene } from "./demos/settings";
import { LogisticsScene } from "./demos/logistics";
import { ProcessFormScene } from "./demos/process-form";
import { SearchBoardScene } from "./demos/search-board";
import { PipelineScene } from "./demos/pipeline";
import { AuthScene } from "./demos/auth";
import { PricingScene } from "./demos/pricing";
import { EmptyStatesScene } from "./demos/empty-states";
import { ThemeApplicator } from "./theme-applicator";
import { CodeSnippets, type CodeSnippet } from "./code-snippets";

const REGISTRY_BASE_URL = "https://solution-themes.vercel.app/r";

function buildSnippets(theme: ThemeMeta): CodeSnippet[] {
  const installCmd = `npx shadcn@latest add ${REGISTRY_BASE_URL}/theme-${theme.id}.json --yes`;

  const applySnippet = `// app/layout.tsx
<html lang="en" data-theme="${theme.id}" data-mode="light">
  <body>{children}</body>
</html>`;

  const initialPaintScript = `// app/layout.tsx — inside <head>
<script dangerouslySetInnerHTML={{ __html: \`
  (function () {
    var url = new URL(window.location.href);
    var t = url.searchParams.get("theme") || localStorage.getItem("st-theme") || "${theme.id}";
    var m = url.searchParams.get("mode") || localStorage.getItem("st-mode");
    if (!m) m = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", t);
    document.documentElement.setAttribute("data-mode", m);
  })();
\` }} />`;

  const variantsList = theme.registryDependencies.length
    ? theme.registryDependencies.map((v) => `- \`${v}\` (components/ui/${v}.tsx)`).join("\n")
    : "- (none — this theme is token-only)";

  const aiAgentBlock = `## Theme System

This project uses solution-themes (\`${theme.id}\` preset — ${theme.name}).
Active theme: applied via \`[data-theme="${theme.id}"]\` on \`<html>\`.

Tokens available (use these, never hardcode colors):
- Surfaces: \`bg-background\`, \`bg-card\`, \`bg-muted\`, \`bg-popover\`
- Foreground: \`text-foreground\`, \`text-muted-foreground\`, \`text-card-foreground\`
- Brand: \`bg-primary\`, \`text-primary-foreground\`, \`bg-accent\`
- Signals: \`bg-success\`, \`bg-warning\`, \`bg-destructive\` (+ their \`-foreground\`)
- Borders: \`border-border\`, \`border-input\`
- Typography: \`font-sans\`, \`font-serif\`, \`font-mono\`, \`font-display\`, \`font-numeric\`

Custom variants installed with this theme:
${variantsList}

Dark mode: toggle \`[data-mode="dark"]\` on \`<html>\`.`;

  return [
    { id: "install", label: "Install", language: "bash", code: installCmd },
    { id: "apply", label: "Apply", language: "tsx", code: applySnippet },
    { id: "initial-paint", label: "Initial paint", language: "tsx", code: initialPaintScript },
    { id: "ai-context", label: "AI agent context", language: "markdown", code: aiAgentBlock },
  ];
}

const SCENES_BY_THEME: Record<ThemeId, React.FC[]> = {
  editorial: [ArticleScene, PricingScene, DashboardScene],
  nordic: [DashboardScene, ProcessFormScene, ArticleScene, SettingsScene],
  "data-terminal": [LogisticsScene, TableScene, DashboardScene, EmptyStatesScene],
  productivity: [TasksScene, SearchBoardScene, TableScene, SettingsScene],
  atlas: [PipelineScene, AuthScene, PricingScene, ProcessFormScene, SearchBoardScene, EmptyStatesScene],
};

export function generateStaticParams() {
  return allThemes.map((t) => ({ id: t.id }));
}

export default async function ThemePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const theme = getTheme(id as ThemeId);
  if (!theme) notFound();

  return (
    <main className="min-h-screen pb-24">
      <ThemeApplicator id={theme.id} />
      <header className="px-6 py-12 max-w-5xl mx-auto space-y-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{theme.id}</p>
        <h1 className="text-4xl font-semibold tracking-tight">{theme.name}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">{theme.description}</p>
        <p className="text-sm text-muted-foreground">Install command and integration snippets are below ↓</p>
      </header>

      <section className="px-6 py-8 max-w-5xl mx-auto">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">Color tokens (light)</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {SEMANTIC_TOKEN_KEYS.map((key) => (
            <div key={key} className="space-y-1">
              <div
                className="h-12 rounded border border-border"
                style={{ background: theme.tokens.light[key] }}
              />
              <div className="text-[10px] text-muted-foreground truncate">{key}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-8 max-w-5xl mx-auto">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">Code snippets</h2>
        <CodeSnippets snippets={buildSnippets(theme)} />
      </section>

      <section className="border-t border-border">
        {SCENES_BY_THEME[theme.id].map((Scene, i) => (
          <div key={i} className="border-b border-border last:border-0 py-6">
            <Scene />
          </div>
        ))}
      </section>
    </main>
  );
}
