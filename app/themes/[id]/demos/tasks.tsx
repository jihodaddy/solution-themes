import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgePill } from "@/registry/components/badge-pill";
import { StatusDot } from "@/registry/components/status-dot";

const COLUMNS = [
  {
    title: "Backlog",
    tasks: [
      { id: 1, title: "Audit checkout flow", tag: "research", tone: "neutral" as const },
      { id: 2, title: "Pricing page revamp", tag: "design", tone: "primary" as const },
    ],
  },
  {
    title: "In progress",
    tasks: [
      { id: 3, title: "Stripe webhook retries", tag: "engineering", tone: "warning" as const },
      { id: 4, title: "Onboarding email v2", tag: "marketing", tone: "primary" as const },
    ],
  },
  {
    title: "Done",
    tasks: [
      { id: 5, title: "Q2 OKR review", tag: "ops", tone: "success" as const },
    ],
  },
];

export function TasksScene() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Sprint board</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => (
          <Card key={col.title}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <StatusDot tone={col.title === "Done" ? "success" : col.title === "In progress" ? "warning" : "neutral"} />
                {col.title}
              </CardTitle>
              <span className="text-xs text-muted-foreground tabular-nums">{col.tasks.length}</span>
            </CardHeader>
            <CardContent className="space-y-2">
              {col.tasks.map((t) => (
                <div key={t.id} className="border border-border rounded-md p-3 bg-card">
                  <div className="text-sm font-medium">{t.title}</div>
                  <div className="mt-2"><BadgePill tone={t.tone}>{t.tag}</BadgePill></div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
