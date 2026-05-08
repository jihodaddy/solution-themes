"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCardDirectional } from "@/registry/components/stat-card-directional";
import { StatusDot } from "@/registry/components/status-dot";
import { TableCompact } from "@/registry/components/table-compact";
import {
  Home,
  BarChart3,
  Users,
  Settings,
  Search,
  Bell,
  Download,
} from "lucide-react";

const CHANNELS = [
  { name: "Direct", users: 4820, share: 38.9 },
  { name: "Organic search", users: 3210, share: 25.9 },
  { name: "Referral", users: 2104, share: 17.0 },
  { name: "Email", users: 1420, share: 11.5 },
  { name: "Social", users: 848, share: 6.8 },
];

const EVENTS: { label: string; time: string; tone: "success" | "warning" | "neutral" | "primary" | "destructive" }[] = [
  { label: "Deployment completed", time: "2 min ago", tone: "success" },
  { label: "Traffic spike detected", time: "14 min ago", tone: "warning" },
  { label: "New signup: Meridian Co.", time: "31 min ago", tone: "primary" },
  { label: "Webhook retry queued", time: "1h ago", tone: "neutral" },
  { label: "Report export failed", time: "2h ago", tone: "destructive" },
];

type CohortRow = { cohort: string; w0: string; w1: string; w2: string; w3: string; w4: string };

const COHORT_DATA: CohortRow[] = [
  { cohort: "Jan 2026", w0: "100%", w1: "68%", w2: "54%", w3: "47%", w4: "41%" },
  { cohort: "Feb 2026", w0: "100%", w1: "71%", w2: "58%", w3: "49%", w4: "43%" },
  { cohort: "Mar 2026", w0: "100%", w1: "65%", w2: "51%", w3: "45%", w4: "38%" },
  { cohort: "Apr 2026", w0: "100%", w1: "73%", w2: "60%", w3: "52%", w4: "—" },
  { cohort: "May 2026", w0: "100%", w1: "70%", w2: "—", w3: "—", w4: "—" },
];

const BAR_HEIGHTS = [40, 55, 70, 48, 90, 65, 80, 72, 95, 60, 85, 75];

const NAV_ITEMS = [
  { label: "Overview", icon: Home },
  { label: "Reports", icon: BarChart3 },
  { label: "Audience", icon: Users },
  { label: "Settings", icon: Settings },
];

export function DashboardScene() {
  const [view, setView] = useState("overview");

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground">
      {/* Top app bar */}
      <header className="h-14 border-b border-border flex items-center px-4 gap-3 shrink-0">
        <span className="text-base font-semibold tracking-tight w-44 shrink-0">Calm Analytics</span>
        <div className="flex-1 flex justify-center">
          <div className="relative w-80">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              className="w-full h-8 pl-8 pr-3 text-sm border border-border rounded-md bg-muted placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Search…"
            />
          </div>
        </div>
        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground">
          <Bell className="size-4" />
        </button>
        <div className="size-8 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
          JH
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 border-r border-border shrink-0 flex flex-col overflow-y-auto">
          <nav className="p-3 space-y-0.5">
            {NAV_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center gap-2.5 transition-colors ${
                    (i === 0 && view === "overview") || (i === 1 && view === "reports")
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => {
                    if (i === 0) setView("overview");
                    if (i === 1) setView("reports");
                  }}
                >
                  <Icon className="size-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          <Tabs defaultValue="overview" value={view} onValueChange={setView} className="h-full">
            <div className="border-b border-border px-6 pt-4">
              <TabsList variant="line">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </div>

            {/* View A: Overview */}
            <TabsContent value="overview">
              <div className="px-6 py-6 space-y-6">
                {/* Page header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-semibold tracking-tight">Operations overview</h1>
                    <p className="text-sm text-muted-foreground">May 8, 2026</p>
                  </div>
                  <Select defaultValue="30d">
                    <SelectTrigger size="sm" className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="q">Last quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* KPI row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <StatCardDirectional label="Active users" value="12,402" delta={4.8} />
                  <StatCardDirectional label="Sessions" value="48,210" delta={2.1} />
                  <StatCardDirectional label="Avg. session" value="4m 12s" delta={-0.6} />
                  <StatCardDirectional label="Bounce rate" value="32.4%" delta={-1.2} />
                </div>

                {/* Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Traffic over time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 flex items-end gap-1.5 px-2">
                      {BAR_HEIGHTS.map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-primary/20 rounded-t hover:bg-primary/40 transition-colors"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 px-2">
                      {["Apr 25", "Apr 30", "May 5", "May 8"].map((label) => (
                        <span key={label} className="text-[10px] text-muted-foreground">{label}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Two-column */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  {/* Top channels (60%) */}
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle className="text-sm">Top channels</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border border-border rounded-md overflow-hidden">
                        <TableCompact
                          columns={[
                            { key: "name", header: "Channel" },
                            { key: "users", header: "Users", align: "right", numeric: true,
                              render: (r) => (r as unknown as typeof CHANNELS[0]).users.toLocaleString() },
                            { key: "share", header: "Share", align: "right", numeric: true,
                              render: (r) => `${(r as unknown as typeof CHANNELS[0]).share}%` },
                          ]}
                          data={CHANNELS as unknown as Record<string, React.ReactNode>[]}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent events (40%) */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-sm">Recent events</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {EVENTS.map((ev) => (
                        <div key={ev.label} className="flex items-start gap-2.5">
                          <StatusDot tone={ev.tone} className="mt-1.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm leading-snug">{ev.label}</p>
                            <p className="text-xs text-muted-foreground">{ev.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* View B: Reports */}
            <TabsContent value="reports">
              <div className="px-6 py-6 space-y-6">
                {/* Page header */}
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold tracking-tight">Conversion report</h1>
                  <Button variant="outline" size="sm">
                    <Download className="size-3.5" />
                    Export
                  </Button>
                </div>

                {/* Funnel */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Conversion funnel</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { step: "Visit", count: "48,210", pct: 100 },
                      { step: "Signup", count: "9,640", pct: 20 },
                      { step: "Activation", count: "5,780", pct: 12 },
                      { step: "Retention", count: "2,890", pct: 6 },
                    ].map((f) => (
                      <div key={f.step} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{f.step}</span>
                          <span className="tabular-nums text-muted-foreground" style={{ fontFamily: "var(--font-numeric)" }}>
                            {f.count} — {f.pct}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary/60 rounded-full"
                            style={{ width: `${f.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Cohort table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Cohort breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-border rounded-md overflow-hidden">
                      <TableCompact
                        columns={[
                          { key: "cohort", header: "Cohort" },
                          { key: "w0", header: "Week 0", align: "right", numeric: true },
                          { key: "w1", header: "Week 1", align: "right", numeric: true },
                          { key: "w2", header: "Week 2", align: "right", numeric: true },
                          { key: "w3", header: "Week 3", align: "right", numeric: true },
                          { key: "w4", header: "Week 4", align: "right", numeric: true },
                        ]}
                        data={COHORT_DATA as unknown as Record<string, React.ReactNode>[]}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Analyst notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      The Feb 2026 cohort shows the strongest week-1 retention at 71%, coinciding with the
                      onboarding email sequence launched Jan 28. This effect appears to persist through week 4.
                    </p>
                    <p>
                      The Mar 2026 cohort dip (65% week-1) aligns with the scheduled maintenance window on
                      March 3–4. Consider excluding that cohort from baseline comparisons in executive reporting.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
