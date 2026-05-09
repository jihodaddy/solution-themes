import { notFound } from "next/navigation";
import { allThemes, getTheme } from "@/lib/themes";
import { SEMANTIC_TOKEN_KEYS, type ThemeId } from "@/registry/types";
import { ArticleScene } from "./demos/article";
import { DashboardScene } from "./demos/dashboard";
import { TableScene } from "./demos/table";
import { TasksScene } from "./demos/tasks";
import { SettingsScene } from "./demos/settings";
import { ThemeApplicator } from "./theme-applicator";

const SCENES_BY_THEME: Record<ThemeId, React.FC[]> = {
  editorial: [ArticleScene, DashboardScene],
  nordic: [DashboardScene, ArticleScene, SettingsScene],
  "data-terminal": [TableScene, DashboardScene],
  productivity: [TasksScene, TableScene, SettingsScene],
};

export function generateStaticParams() {
  return allThemes.map((t) => ({ id: t.id }));
}

export default async function ThemePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const theme = getTheme(id as ThemeId);
  if (!theme) notFound();

  const installCmd = `npx shadcn@latest add https://solution-themes.vercel.app/r/theme-${theme.id}.json`;

  return (
    <main className="min-h-screen pb-24">
      <ThemeApplicator id={theme.id} />
      <header className="px-6 py-12 max-w-5xl mx-auto space-y-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{theme.id}</p>
        <h1 className="text-4xl font-semibold tracking-tight">{theme.name}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">{theme.description}</p>
        <pre className="bg-muted text-sm p-3 rounded-md font-mono overflow-x-auto">{installCmd}</pre>
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
