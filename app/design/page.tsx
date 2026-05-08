import fs from "node:fs";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { allThemes } from "@/lib/themes";
import { SEMANTIC_TOKEN_KEYS } from "@/registry/types";

function loadDesignMd(): string {
  const filePath = path.resolve(process.cwd(), "DESIGN.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function DesignPage() {
  const designMd = loadDesignMd();

  return (
    <main className="px-6 py-12 max-w-6xl mx-auto space-y-12">
      <article className="max-w-none [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:my-3 [&_p]:leading-7 [&_ul]:my-3 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:my-3 [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:my-1 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded-md [&_pre]:overflow-x-auto [&_pre>code]:bg-transparent [&_pre>code]:p-0 [&_strong]:font-semibold [&_table]:my-4 [&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_th]:p-2 [&_th]:border-b [&_th]:border-border [&_th]:font-medium [&_td]:p-2 [&_td]:border-b [&_td]:border-border">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{designMd}</ReactMarkdown>
      </article>

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
