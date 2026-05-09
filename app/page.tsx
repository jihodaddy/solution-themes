import Link from "next/link";
import { allThemes } from "@/lib/themes";
import { ThemeSwitcher } from "@/registry/components/theme-switcher";

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <header className="space-y-4 mb-16">
        <h1 className="text-5xl font-semibold tracking-tight">solution-themes</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          4 distinct shadcn-compatible themes for different contexts. Install any of them with a single
          shadcn CLI command.
        </p>
        <div className="flex gap-3">
          <Link
            href="/playground"
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
          >
            Try the playground →
          </Link>
          <Link
            href="/design"
            className="inline-flex items-center px-4 py-2 border border-border rounded-md text-sm font-medium"
          >
            Design system docs
          </Link>
          <div className="flex items-center gap-2 border-l border-border pl-3 ml-auto">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Try it</span>
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allThemes.map((t) => (
          <Link
            key={t.id}
            href={`/themes/${t.id}`}
            className="block border border-border rounded-lg p-6 hover:bg-muted/30 transition-colors"
          >
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.id}</div>
            <h2 className="text-2xl font-semibold mt-1">{t.name}</h2>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{t.description}</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              {t.intendedContexts.map((c) => (
                <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {c}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
