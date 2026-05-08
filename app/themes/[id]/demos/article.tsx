export function ArticleScene() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-8 space-y-4">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Essay · 6 min read</p>
        <h1 className="text-4xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          On the quiet language of design systems
        </h1>
        <p className="text-sm text-muted-foreground">
          By Sample Author · 2026-05-08
        </p>
      </header>
      <p className="leading-7" style={{ fontFamily: "var(--font-serif)" }}>
        A design system is not the colors. It is the rhythm of decisions that produced those colors —
        which voice we chose, which voices we ruled out, and what that choosing said about the work.
      </p>
      <p className="leading-7" style={{ fontFamily: "var(--font-serif)" }}>
        When we look at a finished interface and call it &ldquo;clean,&rdquo; we are usually pointing at the
        absence of accidents. Every glyph at its correct weight. Every spacing value chosen on purpose.
        The system is what made the accidents impossible.
      </p>
      <blockquote
        className="border-l-2 border-accent pl-4 italic text-muted-foreground"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        &ldquo;The constraint is not what you can&apos;t do. It is the shape of what you have already chosen.&rdquo;
      </blockquote>
      <p className="leading-7" style={{ fontFamily: "var(--font-serif)" }}>
        This is why systems pay back over years. Each new decision arrives with its peers already in
        the room. The argument has been narrowed to its essential one.
      </p>
    </article>
  );
}
