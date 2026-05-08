import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCardDirectional } from "@/registry/components/stat-card-directional";

export function DashboardScene() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Operations overview</h1>
        <p className="text-sm text-muted-foreground">May 8, 2026 · last 30 days</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCardDirectional label="Active users" value="12,402" delta={4.8} />
        <StatCardDirectional label="Sessions" value="48,210" delta={2.1} />
        <StatCardDirectional label="Avg. session" value="4m 12s" delta={-0.6} />
        <StatCardDirectional label="Bounce rate" value="32.4%" delta={-1.2} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Top channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {[
            { name: "Direct", users: 4820, share: 38.9 },
            { name: "Organic search", users: 3210, share: 25.9 },
            { name: "Referral", users: 2104, share: 17.0 },
            { name: "Email", users: 1420, share: 11.5 },
            { name: "Social", users: 848, share: 6.8 },
          ].map((row) => (
            <div key={row.name} className="flex justify-between border-b border-border py-1.5 last:border-0">
              <span>{row.name}</span>
              <span className="tabular-nums text-muted-foreground" style={{ fontFamily: "var(--font-numeric)" }}>
                {row.users.toLocaleString()} · {row.share}%
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
