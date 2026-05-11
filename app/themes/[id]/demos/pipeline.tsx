"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BadgePill } from "@/registry/components/badge-pill";
import { StatCardDirectional } from "@/registry/components/stat-card-directional";
import {
  Search,
  Plus,
  TrendingUp,
  Calendar,
  MoreHorizontal,
  Phone,
  Mail,
  FileText,
  Flame,
  Snowflake,
  GripVertical,
  ArrowRight,
  Filter,
  Sparkles,
} from "lucide-react";

// ─── Types & data ────────────────────────────────────────────────────────────

type StageId = "lead" | "qualified" | "proposal" | "negotiation" | "closed-won";

type Deal = {
  id: string;
  name: string;
  company: string;
  amount: number;
  owner: string;
  ownerInitials: string;
  ownerColor: string;
  closeDate: string;
  daysInStage: number;
  temperature: "hot" | "warm" | "cold";
  contactName: string;
  contactRole: string;
  nextStep?: string;
  tags: string[];
  stage: StageId;
};

const STAGES: { id: StageId; title: string; target: number; description: string }[] = [
  { id: "lead", title: "Lead", target: 50, description: "New inbound interest" },
  { id: "qualified", title: "Qualified", target: 25, description: "Decision-maker engaged" },
  { id: "proposal", title: "Proposal", target: 15, description: "Pricing sent" },
  { id: "negotiation", title: "Negotiation", target: 8, description: "Working through terms" },
  { id: "closed-won", title: "Closed · Won", target: 5, description: "Contract signed" },
];

const DEALS: Deal[] = [
  // Lead
  { id: "d1", name: "Migration to Atlas Pro", company: "Northwind Trading", amount: 84000, owner: "Alex Morgan", ownerInitials: "AM", ownerColor: "primary", closeDate: "Jun 30", daysInStage: 2, temperature: "warm", contactName: "Morgan Reyes", contactRole: "COO", tags: ["expansion"], stage: "lead" },
  { id: "d2", name: "Q3 platform refresh", company: "Globex Industries", amount: 152000, owner: "Priya Shah", ownerInitials: "PS", ownerColor: "success", closeDate: "Jul 15", daysInStage: 5, temperature: "hot", contactName: "K. Tanaka", contactRole: "VP Eng", nextStep: "Demo Mon 10am", tags: ["enterprise", "new logo"], stage: "lead" },
  { id: "d3", name: "Pilot — 3 teams", company: "Initech LLC", amount: 18000, owner: "Jordan Kim", ownerInitials: "JK", ownerColor: "warning", closeDate: "Jun 10", daysInStage: 8, temperature: "cold", contactName: "L. Bishop", contactRole: "Director Ops", tags: ["pilot"], stage: "lead" },

  // Qualified
  { id: "d4", name: "Annual renewal + add-ons", company: "Acme Corp", amount: 240000, owner: "Alex Morgan", ownerInitials: "AM", ownerColor: "primary", closeDate: "Jun 18", daysInStage: 11, temperature: "hot", contactName: "S. Patel", contactRole: "CFO", nextStep: "Call Wed 2pm", tags: ["renewal"], stage: "qualified" },
  { id: "d5", name: "Workspace expansion", company: "Soylent Foods", amount: 65000, owner: "Sam Reyes", ownerInitials: "SR", ownerColor: "destructive", closeDate: "Jun 25", daysInStage: 6, temperature: "warm", contactName: "B. Diaz", contactRole: "Head of People", tags: ["expansion"], stage: "qualified" },
  { id: "d6", name: "Multi-region rollout", company: "Hooli Cloud", amount: 310000, owner: "Priya Shah", ownerInitials: "PS", ownerColor: "success", closeDate: "Aug 02", daysInStage: 14, temperature: "warm", contactName: "T. Lin", contactRole: "Director Infra", nextStep: "Security review", tags: ["enterprise", "complex"], stage: "qualified" },

  // Proposal
  { id: "d7", name: "5-yr commit + DPA", company: "Meridian Bank", amount: 980000, owner: "Alex Morgan", ownerInitials: "AM", ownerColor: "primary", closeDate: "Jul 30", daysInStage: 22, temperature: "hot", contactName: "C. Okafor", contactRole: "CISO", nextStep: "Legal review Fri", tags: ["enterprise", "compliance"], stage: "proposal" },
  { id: "d8", name: "Standard Growth plan", company: "Pied Piper", amount: 48000, owner: "Jordan Kim", ownerInitials: "JK", ownerColor: "warning", closeDate: "Jun 22", daysInStage: 9, temperature: "warm", contactName: "R. Hendricks", contactRole: "CEO", tags: ["new logo"], stage: "proposal" },

  // Negotiation
  { id: "d9", name: "Enterprise + custom SLA", company: "Massive Dynamic", amount: 540000, owner: "Priya Shah", ownerInitials: "PS", ownerColor: "success", closeDate: "Jun 30", daysInStage: 18, temperature: "hot", contactName: "W. Bell", contactRole: "VP Strategy", nextStep: "Final terms call", tags: ["enterprise", "at risk"], stage: "negotiation" },
  { id: "d10", name: "3-yr commit", company: "Virtucon", amount: 175000, owner: "Sam Reyes", ownerInitials: "SR", ownerColor: "destructive", closeDate: "Jun 20", daysInStage: 27, temperature: "warm", contactName: "D. Evil", contactRole: "Director", tags: ["competitor in play"], stage: "negotiation" },

  // Closed-won
  { id: "d11", name: "Pro plan — 25 seats", company: "Dunder Mifflin", amount: 28800, owner: "Alex Morgan", ownerInitials: "AM", ownerColor: "primary", closeDate: "May 09", daysInStage: 1, temperature: "hot", contactName: "M. Scott", contactRole: "Regional Mgr", tags: ["new logo"], stage: "closed-won" },
  { id: "d12", name: "Upgrade to Growth", company: "Umbrella Logistics", amount: 42000, owner: "Jordan Kim", ownerInitials: "JK", ownerColor: "warning", closeDate: "May 08", daysInStage: 2, temperature: "hot", contactName: "A. Wesker", contactRole: "Head of Ops", tags: ["expansion"], stage: "closed-won" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatMoney(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n}`;
}

const TEMP_ICON = { hot: Flame, warm: Sparkles, cold: Snowflake } as const;
const TEMP_COLOR = {
  hot: "text-destructive",
  warm: "text-warning",
  cold: "text-muted-foreground",
} as const;

const OWNER_RING: Record<string, string> = {
  primary: "bg-primary/15 text-primary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/20 text-warning",
  destructive: "bg-destructive/15 text-destructive",
};

// ─── Deal card ───────────────────────────────────────────────────────────────

function DealCard({
  deal,
  selected,
  onSelect,
  onMoveRight,
  canMoveRight,
}: {
  deal: Deal;
  selected: boolean;
  onSelect: () => void;
  onMoveRight: () => void;
  canMoveRight: boolean;
}) {
  const TempIcon = TEMP_ICON[deal.temperature];
  const stale = deal.daysInStage > 14 && deal.stage !== "closed-won";

  return (
    <div
      onClick={onSelect}
      className={`group bg-card border rounded-lg p-3 cursor-pointer transition-all ${
        selected
          ? "border-primary ring-2 ring-primary/20 shadow-md"
          : "border-border hover:border-primary/40 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-2 mb-2">
        <button
          className="text-muted-foreground/40 hover:text-muted-foreground cursor-grab mt-0.5"
          onClick={(e) => e.stopPropagation()}
          aria-label="Drag handle"
        >
          <GripVertical className="size-3.5" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight">{deal.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{deal.company}</p>
        </div>
        <TempIcon className={`size-3.5 shrink-0 ${TEMP_COLOR[deal.temperature]}`} />
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span
          className="text-base font-semibold tracking-tight tabular-nums"
          style={{ fontFamily: "var(--font-numeric)" }}
        >
          {formatMoney(deal.amount)}
        </span>
        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
          <Calendar className="size-2.5" /> {deal.closeDate}
        </span>
      </div>

      {deal.nextStep && (
        <div className="text-[11px] text-foreground bg-primary/5 border border-primary/15 rounded px-2 py-1 mb-2 flex items-center gap-1.5">
          <ArrowRight className="size-3 text-primary shrink-0" />
          <span className="truncate">{deal.nextStep}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-1 mb-2">
        {deal.tags.map((t) => (
          <BadgePill key={t} tone={t === "at risk" || t === "competitor in play" ? "destructive" : "neutral"}>
            {t}
          </BadgePill>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className={`size-5 rounded-full grid place-items-center text-[9px] font-semibold shrink-0 ${OWNER_RING[deal.ownerColor]}`}>
            {deal.ownerInitials}
          </div>
          <span className="text-[10px] text-muted-foreground truncate">{deal.contactName}</span>
        </div>
        <div className="flex items-center gap-1">
          {stale && (
            <span title={`${deal.daysInStage}d in stage`} className="text-[10px] text-destructive font-medium tabular-nums">
              {deal.daysInStage}d
            </span>
          )}
          {canMoveRight && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveRight();
              }}
              className="size-5 grid place-items-center rounded text-muted-foreground hover:bg-muted hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Move to next stage"
            >
              <ArrowRight className="size-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Stage column ────────────────────────────────────────────────────────────

function StageColumn({
  stage,
  deals,
  selectedId,
  onSelect,
  onMoveRight,
  isLast,
}: {
  stage: typeof STAGES[number];
  deals: Deal[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onMoveRight: (id: string) => void;
  isLast: boolean;
}) {
  const total = deals.reduce((sum, d) => sum + d.amount, 0);
  const pct = Math.min(100, (deals.length / stage.target) * 100);

  return (
    <div className="flex-1 min-w-[260px] flex flex-col bg-muted/20 rounded-lg border border-border">
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold tracking-tight">{stage.title}</h3>
            <span className="text-xs tabular-nums px-1.5 py-0.5 rounded bg-card border border-border text-muted-foreground">
              {deals.length}
            </span>
          </div>
          <button className="size-5 grid place-items-center text-muted-foreground hover:text-foreground rounded hover:bg-muted">
            <MoreHorizontal className="size-3.5" />
          </button>
        </div>
        <p
          className="text-xs text-muted-foreground tabular-nums"
          style={{ fontFamily: "var(--font-numeric)" }}
        >
          {formatMoney(total)} · {stage.description}
        </p>
        <div className="mt-2 h-1 bg-card rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              pct > 100 ? "bg-warning" : isLast ? "bg-success" : "bg-primary"
            }`}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-muted-foreground tabular-nums">
          <span>Target {stage.target}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      </div>

      <div className="p-2 space-y-2 flex-1 min-h-[200px]">
        {deals.map((d) => (
          <DealCard
            key={d.id}
            deal={d}
            selected={selectedId === d.id}
            onSelect={() => onSelect(d.id)}
            onMoveRight={() => onMoveRight(d.id)}
            canMoveRight={!isLast}
          />
        ))}
        <button className="w-full py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-card rounded-md border border-dashed border-border flex items-center justify-center gap-1.5 transition-colors">
          <Plus className="size-3" /> Add deal
        </button>
      </div>
    </div>
  );
}

// ─── Inspector drawer ────────────────────────────────────────────────────────

function Inspector({ deal, onClose }: { deal: Deal; onClose: () => void }) {
  const TempIcon = TEMP_ICON[deal.temperature];
  return (
    <aside className="w-80 border-l border-border bg-card flex flex-col shrink-0 overflow-y-auto">
      <header className="p-4 border-b border-border">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{deal.company}</p>
            <h2 className="text-base font-semibold tracking-tight mt-0.5">{deal.name}</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xs">Close</button>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span
            className="text-xl font-semibold tracking-tight tabular-nums"
            style={{ fontFamily: "var(--font-numeric)" }}
          >
            {formatMoney(deal.amount)}
          </span>
          <BadgePill tone={STAGES.findIndex(s => s.id === deal.stage) >= 3 ? "primary" : "neutral"}>
            {STAGES.find((s) => s.id === deal.stage)?.title}
          </BadgePill>
          <span className={`inline-flex items-center gap-1 text-xs font-medium ${TEMP_COLOR[deal.temperature]}`}>
            <TempIcon className="size-3" />
            {deal.temperature}
          </span>
        </div>
      </header>

      <div className="p-4 space-y-4 flex-1">
        <div>
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Contact</h3>
          <div className="flex items-center gap-3 p-2.5 rounded-md border border-border">
            <div className={`size-9 rounded-full grid place-items-center font-semibold text-sm ${OWNER_RING[deal.ownerColor]}`}>
              {deal.contactName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{deal.contactName}</p>
              <p className="text-xs text-muted-foreground">{deal.contactRole}</p>
            </div>
            <div className="flex gap-1">
              <button className="size-7 grid place-items-center rounded hover:bg-muted text-muted-foreground">
                <Phone className="size-3.5" />
              </button>
              <button className="size-7 grid place-items-center rounded hover:bg-muted text-muted-foreground">
                <Mail className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {deal.nextStep && (
          <div>
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Next step</h3>
            <div className="rounded-md border border-primary/30 bg-primary/5 p-2.5 flex items-start gap-2">
              <ArrowRight className="size-4 text-primary shrink-0 mt-0.5" />
              <p className="text-sm">{deal.nextStep}</p>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Timeline</h3>
          <ul className="space-y-2.5">
            {[
              { label: "Stage entered", value: `${deal.daysInStage} days ago`, tone: deal.daysInStage > 14 ? "warning" : "default" },
              { label: "Expected close", value: deal.closeDate },
              { label: "Owner", value: deal.owner },
              { label: "Tags", value: deal.tags.join(", ") || "—" },
            ].map((row) => (
              <li key={row.label} className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-muted-foreground text-xs">{row.label}</span>
                <span className={`text-right ${row.tone === "warning" ? "text-warning font-medium" : ""}`}>
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Recent activity</h3>
          <ul className="space-y-2">
            {[
              { who: "Alex Morgan", what: "Sent updated proposal", when: "2h ago" },
              { who: "Customer", what: "Replied to thread #4", when: "yesterday" },
              { who: "Priya Shah", what: "Added security review note", when: "2d ago" },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{a.who}</p>
                  <p className="text-muted-foreground">{a.what} · {a.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="border-t border-border p-3 flex items-center gap-2">
        <Button size="sm" className="flex-1">
          <FileText className="size-3.5" /> Log activity
        </Button>
        <Button variant="outline" size="sm">
          <ArrowRight className="size-3.5" />
        </Button>
      </footer>
    </aside>
  );
}

// ─── Main scene ──────────────────────────────────────────────────────────────

export function PipelineScene() {
  const [deals, setDeals] = useState(DEALS);
  const [selectedId, setSelectedId] = useState<string | null>("d7");
  const [ownerFilter, setOwnerFilter] = useState<"all" | string>("all");

  const filteredDeals = useMemo(() => {
    if (ownerFilter === "all") return deals;
    return deals.filter((d) => d.owner === ownerFilter);
  }, [deals, ownerFilter]);

  const dealsByStage = useMemo(() => {
    const map: Record<StageId, Deal[]> = {
      lead: [],
      qualified: [],
      proposal: [],
      negotiation: [],
      "closed-won": [],
    };
    for (const d of filteredDeals) map[d.stage].push(d);
    return map;
  }, [filteredDeals]);

  const totalValue = filteredDeals.reduce((sum, d) => sum + d.amount, 0);
  const wonValue = filteredDeals.filter((d) => d.stage === "closed-won").reduce((sum, d) => sum + d.amount, 0);
  const weighted = filteredDeals.reduce((sum, d) => {
    const stageIdx = STAGES.findIndex((s) => s.id === d.stage);
    const weight = [0.1, 0.3, 0.5, 0.75, 1.0][stageIdx];
    return sum + d.amount * weight;
  }, 0);

  const owners = Array.from(new Set(deals.map((d) => d.owner))).sort();

  const selected = selectedId ? deals.find((d) => d.id === selectedId) ?? null : null;

  function moveRight(id: string) {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const idx = STAGES.findIndex((s) => s.id === d.stage);
        if (idx >= STAGES.length - 1) return d;
        return { ...d, stage: STAGES[idx + 1].id, daysInStage: 0 };
      })
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Sales</p>
            <h1 className="text-xl font-semibold tracking-tight mt-0.5">Q2 Pipeline</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                className="h-8 pl-8 pr-3 text-sm border border-border rounded-md bg-card placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-56"
                placeholder="Search deals…"
              />
            </div>
            <Select value={ownerFilter} onValueChange={(v) => v && setOwnerFilter(v)}>
              <SelectTrigger size="sm" className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All owners</SelectItem>
                {owners.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="size-3.5" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="size-3.5" />
              New deal
            </Button>
          </div>
        </div>

        {/* KPI bar */}
        <div className="px-6 pb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCardDirectional label="Total pipeline" value={formatMoney(totalValue)} delta={8.4} />
          <StatCardDirectional label="Weighted value" value={formatMoney(weighted)} delta={3.2} />
          <StatCardDirectional label="Closed-won (Q2)" value={formatMoney(wonValue)} delta={12.1} />
          <Card>
            <CardHeader className="pb-1.5">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                Win rate (90d)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-baseline gap-1.5">
                <span
                  className="text-xl font-semibold tracking-tight tabular-nums"
                  style={{ fontFamily: "var(--font-numeric)" }}
                >
                  34.2%
                </span>
                <span className="text-xs text-success flex items-center gap-0.5">
                  <TrendingUp className="size-3" />
                  +2.1pt
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-4">
          <div className="flex gap-3 min-w-fit">
            {STAGES.map((stage, i) => (
              <StageColumn
                key={stage.id}
                stage={stage}
                deals={dealsByStage[stage.id]}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onMoveRight={moveRight}
                isLast={i === STAGES.length - 1}
              />
            ))}
          </div>
        </main>

        {selected && (
          <Inspector deal={selected} onClose={() => setSelectedId(null)} />
        )}
      </div>
    </div>
  );
}
