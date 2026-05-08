import { allThemes } from "@/lib/themes";
import { SEMANTIC_TOKEN_KEYS } from "@/registry/types";

export default function DesignPage() {
  return (
    <main className="px-6 py-12 max-w-6xl mx-auto space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Design system</h1>
        <p className="text-muted-foreground max-w-2xl">
          Token values are read directly from <code className="font-mono text-sm">registry/themes/*/meta.ts</code>.
          See <code className="font-mono text-sm">DESIGN.md</code> for principles and rationale.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Color swatches</h2>
        <div className="space-y-6">
          {allThemes.map((t) => (
            <div key={t.id} className="space-y-3">
              <h3 className="font-medium text-lg">{t.name}</h3>
              {(["light", "dark"] as const).map((mode) => (
                <div key={mode}>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{mode}</div>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {SEMANTIC_TOKEN_KEYS.map((key) => (
                      <div key={key} className="space-y-1">
                        <div
                          className="h-10 rounded border border-border"
                          style={{ background: t.tokens[mode][key] }}
                          title={`${key}: ${t.tokens[mode][key]}`}
                        />
                        <div className="text-[10px] text-muted-foreground truncate">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">--primary across themes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allThemes.map((t) => (
            <div key={t.id} className="space-y-2">
              <div className="text-sm font-medium">{t.name}</div>
              <div className="flex gap-2">
                <div className="h-12 w-12 rounded border border-border" style={{ background: t.tokens.light.primary }} />
                <div className="h-12 w-12 rounded border border-border" style={{ background: t.tokens.dark.primary }} />
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">L: {t.tokens.light.primary}</div>
              <div className="text-[10px] text-muted-foreground font-mono">D: {t.tokens.dark.primary}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
