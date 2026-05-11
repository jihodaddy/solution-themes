"use client";

import { useState } from "react";
import { BadgePill } from "@/registry/components/badge-pill";
import { CardElegant } from "@/registry/components/card-elegant";
import { StatusDot } from "@/registry/components/status-dot";
import { StatCardDirectional } from "@/registry/components/stat-card-directional";
import { TableCompact } from "@/registry/components/table-compact";
import { ThemeSwitcher } from "@/registry/components/theme-switcher";
import { StepIndicator } from "@/registry/components/step-indicator";
import { ToggleSwitch } from "@/registry/components/toggle-switch";
import { SortableHeader, type SortDir } from "@/registry/components/sortable-header";
import {
  Bell,
  Paperclip,
  AlertCircle,
  Star,
  Building2,
  FileText,
  Users,
  Shield,
  DollarSign,
  Sparkles,
} from "lucide-react";

// ─── Shared chrome ───────────────────────────────────────────────────────────

export const REGISTRY_BASE_URL = "https://solution-themes.vercel.app/r";

export function PreviewPage({
  name,
  title,
  description,
  installable = true,
  children,
}: {
  name: string;
  title: string;
  description: string;
  installable?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-8 py-12 space-y-10">
        <header>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Registry component
          </p>
          <h1
            className="text-3xl font-semibold tracking-tight mt-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{description}</p>
          {installable && (
            <div className="mt-4">
              <code
                className="block w-fit text-xs px-3 py-2 rounded-md bg-muted text-foreground border border-border"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                npx shadcn@latest add {REGISTRY_BASE_URL}/{name}.json
              </code>
            </div>
          )}
        </header>
        {children}
      </div>
    </div>
  );
}

export function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-sm font-semibold tracking-tight uppercase text-foreground/80">
          {title}
        </h2>
        {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
      </div>
      <div className="rounded-lg border border-border bg-card p-6">{children}</div>
    </section>
  );
}

export function PropRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6">
      <div
        className="w-32 text-xs text-muted-foreground font-mono shrink-0"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </div>
      <div className="flex-1 flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

// ─── badge-pill ──────────────────────────────────────────────────────────────

function BadgePillPreview() {
  return (
    <PreviewPage
      name="badge-pill"
      title="badge-pill"
      description="Rounded-full badge with semantic tone variants. Built on CVA — extend with className for custom styling."
    >
      <Section title="Tones">
        <div className="space-y-4">
          <PropRow label="tone=neutral"><BadgePill>Draft</BadgePill></PropRow>
          <PropRow label="tone=primary"><BadgePill tone="primary">In review</BadgePill></PropRow>
          <PropRow label="tone=success"><BadgePill tone="success">Shipped</BadgePill></PropRow>
          <PropRow label="tone=warning"><BadgePill tone="warning">Pending</BadgePill></PropRow>
          <PropRow label="tone=destructive"><BadgePill tone="destructive">Blocked</BadgePill></PropRow>
        </div>
      </Section>

      <Section title="In context" hint="Inline with other UI">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Order #A-2843</span>
            <BadgePill tone="success">Shipped</BadgePill>
            <BadgePill>web</BadgePill>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Ticket #T-4821</span>
            <BadgePill tone="destructive">Critical</BadgePill>
            <BadgePill tone="warning">SLA risk</BadgePill>
          </div>
        </div>
      </Section>
    </PreviewPage>
  );
}

// ─── status-dot ──────────────────────────────────────────────────────────────

const DOT_TONES = ["neutral", "primary", "success", "warning", "destructive"] as const;
const DOT_SIZES = ["sm", "md", "lg"] as const;

function StatusDotPreview() {
  return (
    <PreviewPage
      name="status-dot"
      title="status-dot"
      description="Tiny colored circle indicator. 5 semantic tones × 3 sizes. Use for activity feeds, connection status, list bullets."
    >
      <Section title="Tones × Sizes">
        <table className="text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 pr-6 text-xs text-muted-foreground font-medium uppercase">Tone</th>
              {DOT_SIZES.map((s) => (
                <th key={s} className="text-left py-2 pr-8 text-xs text-muted-foreground font-medium uppercase">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DOT_TONES.map((tone) => (
              <tr key={tone}>
                <td className="py-2.5 pr-6 text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>{tone}</td>
                {DOT_SIZES.map((size) => (
                  <td key={size} className="py-2.5 pr-8">
                    <StatusDot tone={tone} size={size} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="As bullets" hint="Inline with text">
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2"><StatusDot tone="success" /> Deployment completed</li>
          <li className="flex items-center gap-2"><StatusDot tone="warning" /> Traffic spike detected</li>
          <li className="flex items-center gap-2"><StatusDot tone="destructive" /> Report export failed</li>
          <li className="flex items-center gap-2"><StatusDot /> Webhook retry queued</li>
        </ul>
      </Section>
    </PreviewPage>
  );
}

// ─── card-elegant ────────────────────────────────────────────────────────────

function CardElegantPreview() {
  return (
    <PreviewPage
      name="card-elegant"
      title="card-elegant"
      description="Magazine-style card with serif italic caption. Designed for editorial layouts — headlines, longform teasers, gallery items."
    >
      <Section title="Basic">
        <CardElegant caption="A weekend essay on the slow craft of software.">
          <h3>The unhurried codebase</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            What if the metric we optimised for wasn&apos;t velocity, but legibility — the ease
            with which a stranger could understand the system five years later?
          </p>
        </CardElegant>
      </Section>

      <Section title="Without caption">
        <CardElegant>
          <h3>Just the headline</h3>
          <p className="text-sm text-muted-foreground mt-2">Caption is optional. Drop it to get a plain content card.</p>
        </CardElegant>
      </Section>
    </PreviewPage>
  );
}

// ─── stat-card-directional ───────────────────────────────────────────────────

function StatCardDirectionalPreview() {
  return (
    <PreviewPage
      name="stat-card-directional"
      title="stat-card-directional"
      description="KPI card with optional delta. Arrow + color follows the sign automatically (up = success, down = destructive, zero/undefined = neutral)."
    >
      <Section title="Common deltas">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCardDirectional label="Active users" value="12,402" delta={4.8} />
          <StatCardDirectional label="Sessions" value="48,210" delta={2.1} />
          <StatCardDirectional label="Bounce rate" value="32.4%" delta={-1.2} />
          <StatCardDirectional label="MRR" value="$84k" delta={12.3} />
        </div>
      </Section>

      <Section title="No delta" hint="Omit delta to render value only.">
        <div className="grid grid-cols-3 gap-3">
          <StatCardDirectional label="Total accounts" value="248" />
          <StatCardDirectional label="Open tickets" value="14" />
          <StatCardDirectional label="Avg. fulfillment" value="1.8 days" />
        </div>
      </Section>
    </PreviewPage>
  );
}

// ─── table-compact ───────────────────────────────────────────────────────────

type SampleRow = { name: string; users: number; share: number; status: string };
const SAMPLE_TABLE: SampleRow[] = [
  { name: "Direct", users: 4820, share: 38.9, status: "live" },
  { name: "Organic search", users: 3210, share: 25.9, status: "live" },
  { name: "Referral", users: 2104, share: 17.0, status: "live" },
  { name: "Email", users: 1420, share: 11.5, status: "paused" },
  { name: "Social", users: 848, share: 6.8, status: "live" },
];

function TableCompactPreview() {
  return (
    <PreviewPage
      name="table-compact"
      title="table-compact"
      description="Dense table primitive. Supports per-column alignment, numeric flag (monospace tabular-nums), and custom render."
    >
      <Section title="Mixed columns">
        <div className="border border-border rounded-md overflow-hidden">
          <TableCompact<SampleRow>
            columns={[
              { key: "name", header: "Channel" },
              {
                key: "users",
                header: "Users",
                align: "right",
                numeric: true,
                render: (r) => r.users.toLocaleString(),
              },
              {
                key: "share",
                header: "Share",
                align: "right",
                numeric: true,
                render: (r) => `${r.share}%`,
              },
              {
                key: "status",
                header: "Status",
                render: (r) => (
                  <BadgePill tone={r.status === "live" ? "success" : "warning"}>{r.status}</BadgePill>
                ),
              },
            ]}
            data={SAMPLE_TABLE}
          />
        </div>
      </Section>
    </PreviewPage>
  );
}

// ─── theme-switcher ──────────────────────────────────────────────────────────

function ThemeSwitcherPreview() {
  return (
    <PreviewPage
      name="theme-switcher"
      title="theme-switcher"
      description="Theme + mode selector wired to localStorage and the document data-attributes. Drop into any header — no setup required."
    >
      <Section title="Default">
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <p className="text-xs text-muted-foreground">
            Live — clicking changes the page theme/mode. Persists across reloads via localStorage.
          </p>
        </div>
      </Section>

      <Section title="In a fake app bar">
        <div className="h-12 px-4 rounded-md border border-border bg-card flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight">My App</span>
          <ThemeSwitcher />
        </div>
      </Section>
    </PreviewPage>
  );
}

// ─── step-indicator ──────────────────────────────────────────────────────────

const DEMO_STEPS_LONG = [
  { title: "Customer", description: "Account & contact", icon: Building2 },
  { title: "Contract", description: "Plan & term", icon: FileText },
  { title: "Team", description: "Stakeholders", icon: Users },
  { title: "Compliance", description: "Residency & DPA", icon: Shield },
  { title: "Billing", description: "Payment", icon: DollarSign },
  { title: "Review", description: "Submit", icon: Sparkles },
];

function StepIndicatorPreview() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);

  return (
    <PreviewPage
      name="step-indicator"
      title="step-indicator"
      description="Multi-step flow indicator. Pass a steps array, the current index, and a set of completed indices. Current step always wins visually (highlighted) even if it was previously completed."
    >
      <Section title="With icons + descriptions" hint="Click any reachable step to jump.">
        <div className="-mx-2">
          <StepIndicator
            steps={DEMO_STEPS_LONG}
            current={a}
            completed={new Set([0, 1, 2, 3, 4])}
            onJump={setA}
          />
        </div>
      </Section>

      <Section title="Numbered only" hint="Omit icons to fall back to step numbers.">
        <div className="-mx-2">
          <StepIndicator
            steps={[
              { title: "Pick", description: "Choose items" },
              { title: "Pack", description: "Verify contents" },
              { title: "Label", description: "Print AWB" },
              { title: "Hand off", description: "Carrier pickup" },
            ]}
            current={b}
            completed={new Set([0, 1, 2])}
            onJump={setB}
          />
        </div>
      </Section>

      <Section title="Read-only" hint="Omit onJump to disable navigation.">
        <div className="-mx-2">
          <StepIndicator
            steps={DEMO_STEPS_LONG.slice(0, 4)}
            current={1}
            completed={new Set([0])}
          />
        </div>
      </Section>
    </PreviewPage>
  );
}

// ─── toggle-switch ───────────────────────────────────────────────────────────

function ToggleSwitchPreview() {
  const [s1, setS1] = useState(false);
  const [s2, setS2] = useState(true);
  const [s3, setS3] = useState(false);
  const [s4, setS4] = useState(true);
  const [b1, setB1] = useState(false);
  const [b2, setB2] = useState(true);

  return (
    <PreviewPage
      name="toggle-switch"
      title="toggle-switch"
      description="Filter pill with an integrated switch handle. Use for boolean filter facets where the pill conveys both the label and on/off state."
    >
      <Section title="Tones" hint="Inactive tone uses muted card background; active tone colors the pill.">
        <div className="space-y-3">
          <PropRow label="tone=primary">
            <ToggleSwitch active={s1} onClick={() => setS1(!s1)} label="Has attachments" icon={Paperclip} />
          </PropRow>
          <PropRow label="tone=success">
            <ToggleSwitch active={s2} onClick={() => setS2(!s2)} label="Resolved" icon={Star} tone="success" />
          </PropRow>
          <PropRow label="tone=warning">
            <ToggleSwitch active={s3} onClick={() => setS3(!s3)} label="Awaiting reply" icon={Bell} tone="warning" />
          </PropRow>
          <PropRow label="tone=destructive">
            <ToggleSwitch active={s4} onClick={() => setS4(!s4)} label="SLA at risk" icon={AlertCircle} tone="destructive" />
          </PropRow>
        </div>
      </Section>

      <Section title="Without icon">
        <div className="flex flex-wrap gap-2">
          <ToggleSwitch active={b1} onClick={() => setB1(!b1)} label="Archived" />
          <ToggleSwitch active={b2} onClick={() => setB2(!b2)} label="Show drafts" />
        </div>
      </Section>
    </PreviewPage>
  );
}

// ─── sortable-header ─────────────────────────────────────────────────────────

type SortableSample = { id: string; name: string; revenue: number; signups: number };
type SortKey = keyof SortableSample;

const SORTABLE_SAMPLE: SortableSample[] = [
  { id: "A1", name: "Northwind", revenue: 84000, signups: 12 },
  { id: "A2", name: "Acme", revenue: 152000, signups: 28 },
  { id: "A3", name: "Globex", revenue: 48000, signups: 6 },
  { id: "A4", name: "Initech", revenue: 18000, signups: 3 },
];

function SortableHeaderPreview() {
  const [sortBy, setSortBy] = useState<SortKey>("revenue");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function onSort(k: SortKey) {
    if (k === sortBy) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortBy(k);
      setSortDir("asc");
    }
  }

  const sorted = [...SORTABLE_SAMPLE].sort((a, b) => {
    const av = a[sortBy];
    const bv = b[sortBy];
    const cmp = typeof av === "number" && typeof bv === "number"
      ? av - bv
      : String(av).localeCompare(String(bv));
    return sortDir === "asc" ? cmp : -cmp;
  });

  return (
    <PreviewPage
      name="sortable-header"
      title="sortable-header"
      description="Sortable <th> cell. Active sort column shows an up/down chevron based on direction; inactive columns show a faint pair to hint sortability. Generic over the sort key type."
    >
      <Section title="Interactive table" hint="Click any header to sort. Click again to flip direction.">
        <div className="border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <SortableHeader<SortKey> label="ID" sortKey="id" sortBy={sortBy} sortDir={sortDir} onSort={onSort} className="w-20" />
                <SortableHeader<SortKey> label="Customer" sortKey="name" sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
                <SortableHeader<SortKey> label="Revenue" sortKey="revenue" sortBy={sortBy} sortDir={sortDir} onSort={onSort} align="right" />
                <SortableHeader<SortKey> label="Signups" sortKey="signups" sortBy={sortBy} sortDir={sortDir} onSort={onSort} align="right" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-3 py-2 text-xs text-muted-foreground font-mono" style={{ fontFamily: "var(--font-mono)" }}>{r.id}</td>
                  <td className="px-3 py-2">{r.name}</td>
                  <td className="px-3 py-2 text-right tabular-nums" style={{ fontFamily: "var(--font-numeric)" }}>
                    ${r.revenue.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums" style={{ fontFamily: "var(--font-numeric)" }}>
                    {r.signups}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Sorted by <span className="font-mono" style={{ fontFamily: "var(--font-mono)" }}>{sortBy}</span>{" "}
          ({sortDir}).
        </p>
      </Section>
    </PreviewPage>
  );
}

// ─── Map ─────────────────────────────────────────────────────────────────────

export type ComponentId =
  | "badge-pill"
  | "status-dot"
  | "card-elegant"
  | "stat-card-directional"
  | "table-compact"
  | "theme-switcher"
  | "step-indicator"
  | "toggle-switch"
  | "sortable-header";

export const COMPONENT_PREVIEWS: Record<ComponentId, React.FC> = {
  "badge-pill": BadgePillPreview,
  "status-dot": StatusDotPreview,
  "card-elegant": CardElegantPreview,
  "stat-card-directional": StatCardDirectionalPreview,
  "table-compact": TableCompactPreview,
  "theme-switcher": ThemeSwitcherPreview,
  "step-indicator": StepIndicatorPreview,
  "toggle-switch": ToggleSwitchPreview,
  "sortable-header": SortableHeaderPreview,
};

export const COMPONENT_IDS: ComponentId[] = [
  "badge-pill",
  "status-dot",
  "card-elegant",
  "stat-card-directional",
  "table-compact",
  "theme-switcher",
  "step-indicator",
  "toggle-switch",
  "sortable-header",
];
