"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardElegant } from "@/registry/components/card-elegant";
import { BadgePill } from "@/registry/components/badge-pill";
import {
  BookOpen,
  Bookmark,
  Search,
  Bell,
  User,
} from "lucide-react";

const RELATED = [
  { title: "The typography of trust", category: "Essay", readTime: "4 min" },
  { title: "How spacing becomes culture", category: "Analysis", readTime: "7 min" },
  { title: "Naming things in public", category: "Essay", readTime: "5 min" },
];

const LATEST_ESSAYS = [
  {
    category: "Essay",
    title: "The typography of trust",
    excerpt: "Every weight choice signals something to the reader before they have processed a single word.",
    byline: "M. Strand",
    readTime: "4 min",
  },
  {
    category: "Analysis",
    title: "How spacing becomes culture",
    excerpt: "White space is not emptiness. It is the accumulated decisions of everyone who came before.",
    byline: "J. Hartley",
    readTime: "7 min",
  },
  {
    category: "Interview",
    title: "Naming things in public",
    excerpt: "A conversation about the vocabulary of design — what we call things and why it matters.",
    byline: "R. Osei",
    readTime: "5 min",
  },
  {
    category: "Essay",
    title: "Against lorem ipsum",
    excerpt: "Placeholder text is not neutral. What fills the space during design shapes what ends up there.",
    byline: "C. Wolff",
    readTime: "6 min",
  },
  {
    category: "Column",
    title: "The politics of defaults",
    excerpt: "Default settings encode assumptions. Who made them, and what were they assuming about you?",
    byline: "A. Johansson",
    readTime: "8 min",
  },
  {
    category: "Essay",
    title: "Slowness as a design value",
    excerpt: "When speed is the goal of every product, choosing to go slow becomes a political act.",
    byline: "L. Park",
    readTime: "5 min",
  },
];

const ARCHIVE = [
  { title: "The original sins of UX writing", date: "Dec 2025", readTime: "6 min" },
  { title: "Radicals and refinements", date: "Nov 2025", readTime: "4 min" },
  { title: "What sans-serif forgot", date: "Oct 2025", readTime: "9 min" },
  { title: "Against the hero section", date: "Sep 2025", readTime: "5 min" },
  { title: "Hierarchy is political", date: "Aug 2025", readTime: "7 min" },
];

const NAV_LINKS = ["Home", "Essays", "Issues", "About"];
const SIDEBAR_LINKS = ["Latest", "Editor's picks", "Archive 2026", "Archive 2025", "Newsletter"];

export function ArticleScene() {
  const [view, setView] = useState("reading");

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground">
      {/* Top app bar */}
      <header className="h-14 border-b border-border flex items-center px-4 gap-4 shrink-0">
        <span
          className="text-xl font-semibold tracking-tight mr-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Editorial Quarterly
        </span>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
            >
              {link}
            </button>
          ))}
        </nav>
        <div className="flex-1" />
        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground">
          <Search className="size-4" />
        </button>
        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground">
          <Bell className="size-4" />
        </button>
        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground">
          <User className="size-4" />
        </button>
        <Button size="sm">Subscribe</Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 border-r border-border shrink-0 flex flex-col overflow-y-auto">
          <nav className="p-3 space-y-0.5">
            {SIDEBAR_LINKS.map((link, i) => (
              <button
                key={link}
                className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center gap-2 transition-colors ${
                  i === 0
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {i === 0 && <BookOpen className="size-3.5 shrink-0" />}
                {i === 1 && <Bookmark className="size-3.5 shrink-0" />}
                {i >= 2 && <span className="size-3.5 shrink-0" />}
                {link}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          <Tabs defaultValue="reading" onValueChange={setView} className="h-full">
            <div className="border-b border-border px-6 pt-4">
              <TabsList variant="line">
                <TabsTrigger value="reading">Reading</TabsTrigger>
                <TabsTrigger value="library">Library</TabsTrigger>
              </TabsList>
            </div>

            {/* View A: Reading */}
            <TabsContent value="reading">
              <article className="max-w-2xl mx-auto px-6 py-8 space-y-6">
                <header className="space-y-3">
                  <BadgePill tone="primary">Essay</BadgePill>
                  <h1
                    className="text-4xl tracking-tight leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    On the quiet language of design systems
                  </h1>
                  <p className="text-lg text-muted-foreground" style={{ fontFamily: "var(--font-serif)" }}>
                    What we lose when we treat components as atoms rather than arguments.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    By Sample Author · May 8, 2026 · 6 min read
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

                <div className="aspect-[16/9] bg-muted rounded-md flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Image placeholder</span>
                </div>
                <p className="text-xs text-muted-foreground italic -mt-4">
                  Caption: A composition study from the 2026 redesign process.
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
                <p className="leading-7" style={{ fontFamily: "var(--font-serif)" }}>
                  Components, when they are working, are not neutral. They are positions. They say: we
                  believe a button should feel like this. We believe spacing should breathe like this. The
                  developers who ship with them inherit those positions whether they know it or not.
                </p>

                <p className="text-sm text-muted-foreground">
                  Continue reading — 3 min remaining
                </p>

                <section className="pt-4 border-t border-border">
                  <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">
                    Related articles
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {RELATED.map((a) => (
                      <Card key={a.title} className="cursor-pointer hover:bg-muted/40 transition-colors">
                        <CardHeader className="pb-2 pt-4 px-4">
                          <Badge variant="outline" className="w-fit text-xs">{a.category}</Badge>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                          <p className="text-sm font-medium leading-snug mb-1">{a.title}</p>
                          <p className="text-xs text-muted-foreground">{a.readTime} read</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              </article>
            </TabsContent>

            {/* View B: Library */}
            <TabsContent value="library">
              <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">
                {/* Featured */}
                <section>
                  <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Featured</h2>
                  <CardElegant caption="A landmark essay on the future of design language in public systems.">
                    <div className="aspect-[16/9] bg-muted rounded mb-4 flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Featured image</span>
                    </div>
                    <BadgePill tone="primary" className="mb-3">Long read</BadgePill>
                    <h3>The infrastructure of meaning</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      How shared vocabularies emerge from distributed teams — and why they collapse without stewardship.
                    </p>
                    <div className="mt-4">
                      <Button variant="outline" size="sm">Read essay</Button>
                    </div>
                  </CardElegant>
                </section>

                {/* Latest essays */}
                <section>
                  <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Latest essays</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {LATEST_ESSAYS.map((essay) => (
                      <Card key={essay.title} className="cursor-pointer hover:bg-muted/40 transition-colors">
                        <div className="aspect-[16/9] bg-muted mx-4 mt-4 rounded" />
                        <CardContent className="p-4 space-y-2">
                          <BadgePill tone="neutral">{essay.category}</BadgePill>
                          <p className="text-sm font-medium leading-snug">{essay.title}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                            {essay.excerpt}
                          </p>
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs text-muted-foreground">{essay.byline}</span>
                            <span className="text-xs text-muted-foreground">{essay.readTime}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* Archive */}
                <section>
                  <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-4">From the archive</h2>
                  <div className="border border-border rounded-md overflow-hidden">
                    {ARCHIVE.map((item, i) => (
                      <div
                        key={item.title}
                        className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-muted/40 transition-colors cursor-pointer ${
                          i < ARCHIVE.length - 1 ? "border-b border-border" : ""
                        }`}
                      >
                        <span className="font-medium">{item.title}</span>
                        <span className="text-muted-foreground tabular-nums shrink-0 ml-4">
                          {item.date} · {item.readTime}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
