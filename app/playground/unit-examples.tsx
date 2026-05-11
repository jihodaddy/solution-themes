"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BadgePill } from "@/registry/components/badge-pill";
import { StatusDot } from "@/registry/components/status-dot";
import { StatCardDirectional } from "@/registry/components/stat-card-directional";
import { TableCompact } from "@/registry/components/table-compact";
import { StepIndicator } from "@/registry/components/step-indicator";
import { ToggleSwitch } from "@/registry/components/toggle-switch";
import { SortableHeader, type SortDir } from "@/registry/components/sortable-header";
import { PreviewPage, Section } from "./component-previews";
import {
  AlertCircle,
  Paperclip,
  MessageSquareWarning,
  Archive,
  ArrowRight,
  Search,
  Plus,
  Bell,
  TrendingUp,
  Building2,
  FileText,
  Users,
  Shield,
  CheckCircle2,
  X,
} from "lucide-react";

// ─── Example 1: Filter toolbar ───────────────────────────────────────────────
// shadcn Input + registry ToggleSwitch + registry BadgePill chips

function FilterToolbarExample() {
  const [q, setQ] = useState("");
  const [t1, setT1] = useState(true);
  const [t2, setT2] = useState(false);
  const [t3, setT3] = useState(false);
  const activeCats = new Set(["Auth", "Billing"]);

  return (
    <PreviewPage
      name="filter-toolbar"
      title="Filter toolbar"
      description="A drop-in toolbar combining a shadcn Input with registry ToggleSwitch facets and BadgePill chips. Use above any list view that needs faceted search."
      installable={false}
    >
      <Section title="Search + facets + chips">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search tickets, customers, owners…"
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="sm">
              Saved searches
            </Button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <ToggleSwitch active={t1} onClick={() => setT1(!t1)} label="SLA at risk" icon={AlertCircle} tone="destructive" />
            <ToggleSwitch active={t2} onClick={() => setT2(!t2)} label="Has attachments" icon={Paperclip} />
            <ToggleSwitch active={t3} onClick={() => setT3(!t3)} label="Awaiting reply" icon={MessageSquareWarning} tone="warning" />
            <ToggleSwitch active={false} onClick={() => {}} label="Archived" icon={Archive} />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-muted-foreground">Categories</span>
            {["Auth", "API", "Billing", "Compliance"].map((c) => (
              <BadgePill key={c} tone={activeCats.has(c) ? "primary" : "neutral"}>
                {c} {activeCats.has(c) && <X className="inline size-3 ml-0.5 -mr-0.5" />}
              </BadgePill>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Composition">
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li><code style={{ fontFamily: "var(--font-mono)" }}>Input</code> (shadcn) — query box</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>Button</code> (shadcn) — secondary action</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>ToggleSwitch</code> (registry) — boolean facets with tones</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>BadgePill</code> (registry) — multi-select category chips</li>
        </ul>
      </Section>
    </PreviewPage>
  );
}

// ─── Example 2: Sortable data table ──────────────────────────────────────────
// shadcn Card + registry TableCompact + SortableHeader + BadgePill

type DealRow = {
  id: string;
  company: string;
  value: number;
  stage: "Lead" | "Proposal" | "Closed";
  closeDate: string;
};

const DEAL_ROWS: DealRow[] = [
  { id: "D-001", company: "Northwind Trading", value: 84000, stage: "Proposal", closeDate: "Jun 30" },
  { id: "D-002", company: "Acme Corp", value: 240000, stage: "Lead", closeDate: "Jul 15" },
  { id: "D-003", company: "Globex Industries", value: 152000, stage: "Proposal", closeDate: "Jun 18" },
  { id: "D-004", company: "Initech", value: 18000, stage: "Closed", closeDate: "May 09" },
  { id: "D-005", company: "Hooli Cloud", value: 310000, stage: "Lead", closeDate: "Aug 02" },
];

const STAGE_TONE = { Lead: "primary", Proposal: "warning", Closed: "success" } as const;

type DealKey = keyof DealRow;

function SortableTableExample() {
  const [sortBy, setSortBy] = useState<DealKey>("value");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function onSort(k: DealKey) {
    if (k === sortBy) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortBy(k); setSortDir("asc"); }
  }

  const sorted = [...DEAL_ROWS].sort((a, b) => {
    const av = a[sortBy];
    const bv = b[sortBy];
    const cmp = typeof av === "number" && typeof bv === "number"
      ? av - bv
      : String(av).localeCompare(String(bv));
    return sortDir === "asc" ? cmp : -cmp;
  });

  return (
    <PreviewPage
      name="sortable-table"
      title="Sortable data table"
      description="A data table where every column is sortable and status uses semantic pills. Click any column header to sort; click again to flip direction."
      installable={false}
    >
      <Section title="Open deals">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm">Q2 pipeline · 5 deals</CardTitle>
            <Button size="sm">
              <Plus className="size-3.5" />
              Add deal
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border-t border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 border-b border-border">
                  <tr>
                    <SortableHeader<DealKey> label="Deal" sortKey="id" sortBy={sortBy} sortDir={sortDir} onSort={onSort} className="w-24" />
                    <SortableHeader<DealKey> label="Company" sortKey="company" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
                    <SortableHeader<DealKey> label="Value" sortKey="value" sortBy={sortBy} sortDir={sortDir} onSort={onSort} align="right" />
                    <SortableHeader<DealKey> label="Stage" sortKey="stage" sortBy={sortBy} sortDir={sortDir} onSort={onSort} className="w-28" />
                    <SortableHeader<DealKey> label="Close" sortKey="closeDate" sortBy={sortBy} sortDir={sortDir} onSort={onSort} align="right" />
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((d) => (
                    <tr key={d.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="px-3 py-2 text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>{d.id}</td>
                      <td className="px-3 py-2 font-medium">{d.company}</td>
                      <td className="px-3 py-2 text-right tabular-nums" style={{ fontFamily: "var(--font-numeric)" }}>
                        ${(d.value / 1000).toFixed(0)}k
                      </td>
                      <td className="px-3 py-2">
                        <BadgePill tone={STAGE_TONE[d.stage]}>{d.stage}</BadgePill>
                      </td>
                      <td className="px-3 py-2 text-right text-xs text-muted-foreground tabular-nums">{d.closeDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section title="Composition">
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li><code style={{ fontFamily: "var(--font-mono)" }}>Card</code> (shadcn) — outer chrome</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>SortableHeader</code> (registry) — every column</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>BadgePill</code> (registry) — stage cells</li>
        </ul>
      </Section>
    </PreviewPage>
  );
}

// ─── Example 3: KPI row ──────────────────────────────────────────────────────
// shadcn Card + registry StatCardDirectional + StatusDot

function KpiRowExample() {
  return (
    <PreviewPage
      name="kpi-row"
      title="KPI row with live indicator"
      description="A header KPI strip you can drop atop any dashboard. StatCardDirectional handles deltas; a StatusDot signals whether the feed is live."
      installable={false}
    >
      <Section title="Operations overview">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-sm">Today · Last 24h</CardTitle>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                <StatusDot tone="success" /> Live · refreshing every 60s
              </div>
            </div>
            <Button variant="outline" size="sm">
              <TrendingUp className="size-3.5" />
              View report
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCardDirectional label="Active users" value="12,402" delta={4.8} />
              <StatCardDirectional label="Sessions" value="48,210" delta={2.1} />
              <StatCardDirectional label="Bounce rate" value="32.4%" delta={-1.2} />
              <StatCardDirectional label="Revenue" value="$84.2k" delta={12.3} />
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section title="Composition">
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li><code style={{ fontFamily: "var(--font-mono)" }}>Card</code> (shadcn) — outer chrome</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>StatusDot</code> (registry) — live-feed signal</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>StatCardDirectional</code> (registry) × 4 — KPI tiles</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>Button</code> (shadcn) — trailing action</li>
        </ul>
      </Section>
    </PreviewPage>
  );
}

// ─── Example 4: Activity feed ────────────────────────────────────────────────
// shadcn Card + registry StatusDot + BadgePill

const FEED_ITEMS: { label: string; meta: string; tag: string; tone: "success" | "warning" | "primary" | "destructive" | "neutral" }[] = [
  { label: "Deployment v2.4.1 completed", meta: "2m ago · main", tag: "deploy", tone: "success" },
  { label: "Webhook retry queue at 84%", meta: "14m ago · ingest", tag: "infra", tone: "warning" },
  { label: "New customer: Meridian Bank", meta: "31m ago", tag: "sales", tone: "primary" },
  { label: "Background job failed: index_rebuild", meta: "1h ago", tag: "infra", tone: "destructive" },
  { label: "Daily summary email queued", meta: "2h ago", tag: "ops", tone: "neutral" },
];

function ActivityFeedExample() {
  return (
    <PreviewPage
      name="activity-feed"
      title="Activity feed"
      description="A vertical event stream — StatusDot for severity, BadgePill for source tag, shadcn Card for the container."
      installable={false}
    >
      <Section title="Recent events">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Bell className="size-4 text-primary" /> Activity
            </CardTitle>
            <Button variant="ghost" size="sm">Mark all read</Button>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {FEED_ITEMS.map((it) => (
              <div key={it.label} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <StatusDot tone={it.tone} className="mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">{it.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{it.meta}</p>
                </div>
                <BadgePill>{it.tag}</BadgePill>
              </div>
            ))}
          </CardContent>
        </Card>
      </Section>

      <Section title="Composition">
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li><code style={{ fontFamily: "var(--font-mono)" }}>Card</code> (shadcn) — outer chrome</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>StatusDot</code> (registry) — per-event severity</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>BadgePill</code> (registry) — source tag</li>
        </ul>
      </Section>
    </PreviewPage>
  );
}

// ─── Example 5: Wizard block ─────────────────────────────────────────────────
// shadcn Card + Input + Label + Button + registry StepIndicator

const WIZARD_STEPS = [
  { title: "Account", description: "Basic info", icon: Building2 },
  { title: "Plan", description: "Pick a tier", icon: FileText },
  { title: "Team", description: "Invite members", icon: Users },
  { title: "Compliance", description: "DPA & residency", icon: Shield },
  { title: "Done", description: "Confirm", icon: CheckCircle2 },
];

function WizardBlockExample() {
  const [step, setStep] = useState(2);
  const completed = new Set([0, 1]);

  return (
    <PreviewPage
      name="wizard-block"
      title="Wizard step + form block"
      description="An embedded wizard block: a StepIndicator drives the form state, shadcn Input/Label render the active step, and Buttons gate navigation."
      installable={false}
    >
      <Section title="Multi-step block">
        <Card>
          <CardContent className="p-6 space-y-6">
            <StepIndicator
              steps={WIZARD_STEPS}
              current={step}
              completed={completed}
              onJump={setStep}
            />

            <Separator />

            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold tracking-tight">Invite team members</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Add people who should have access from day one.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="email1">Email</Label>
                  <Input id="email1" defaultValue="priya@acme.example" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="role1">Role</Label>
                  <Input id="role1" defaultValue="Admin" />
                </div>
              </div>
              <button className="text-xs text-primary hover:underline">+ Add another member</button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>
                Back
              </Button>
              <span className="text-xs text-muted-foreground tabular-nums">
                Step {step + 1} of {WIZARD_STEPS.length}
              </span>
              <Button onClick={() => setStep(Math.min(WIZARD_STEPS.length - 1, step + 1))}>
                Continue
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section title="Composition">
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li><code style={{ fontFamily: "var(--font-mono)" }}>Card</code>, <code style={{ fontFamily: "var(--font-mono)" }}>Separator</code> (shadcn) — chrome</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>StepIndicator</code> (registry) — progress</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>Label</code> + <code style={{ fontFamily: "var(--font-mono)" }}>Input</code> (shadcn) — active-step fields</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>Button</code> (shadcn) — navigation</li>
        </ul>
      </Section>
    </PreviewPage>
  );
}

// ─── Example 6: Account summary card ─────────────────────────────────────────
// shadcn Card + registry BadgePill + StatusDot + StatCardDirectional

function AccountCardExample() {
  return (
    <PreviewPage
      name="account-summary"
      title="Account summary card"
      description="A dense customer-detail card: shadcn Card hosts the layout, BadgePills convey plan and risk, StatusDot signals account health, and StatCardDirectional shows usage trend."
      installable={false}
    >
      <Section title="Customer 360 panel">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-10 rounded-full bg-primary/15 text-primary grid place-items-center text-sm font-semibold shrink-0">
                  NW
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base">Northwind Trading Co.</CardTitle>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <StatusDot tone="success" />
                    Healthy · MRR $7,188
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <BadgePill tone="primary">Pro plan</BadgePill>
                <BadgePill tone="warning">Renewal in 30d</BadgePill>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <StatCardDirectional label="Seats used" value="42 / 50" delta={6.0} />
              <StatCardDirectional label="API calls (30d)" value="8.4k" delta={-2.1} />
              <StatCardDirectional label="Open tickets" value="3" delta={0} />
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Primary contact</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Morgan Reyes</p>
                  <p className="text-xs text-muted-foreground">morgan@northwind.example · COO</p>
                </div>
                <Button variant="outline" size="sm">
                  Open profile
                  <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section title="Composition">
        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li><code style={{ fontFamily: "var(--font-mono)" }}>Card</code> + <code style={{ fontFamily: "var(--font-mono)" }}>Separator</code> (shadcn) — chrome</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>BadgePill</code> (registry) — plan + renewal flags</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>StatusDot</code> (registry) — account health</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>StatCardDirectional</code> (registry) × 3 — usage trend</li>
          <li><code style={{ fontFamily: "var(--font-mono)" }}>Button</code> (shadcn) — drilldown</li>
        </ul>
      </Section>
    </PreviewPage>
  );
}

// ─── Map ─────────────────────────────────────────────────────────────────────

export type ExampleId =
  | "filter-toolbar"
  | "sortable-table"
  | "kpi-row"
  | "activity-feed"
  | "wizard-block"
  | "account-summary";

export const EXAMPLE_PREVIEWS: Record<ExampleId, React.FC> = {
  "filter-toolbar": FilterToolbarExample,
  "sortable-table": SortableTableExample,
  "kpi-row": KpiRowExample,
  "activity-feed": ActivityFeedExample,
  "wizard-block": WizardBlockExample,
  "account-summary": AccountCardExample,
};

export const EXAMPLE_IDS: ExampleId[] = [
  "filter-toolbar",
  "sortable-table",
  "kpi-row",
  "activity-feed",
  "wizard-block",
  "account-summary",
];
