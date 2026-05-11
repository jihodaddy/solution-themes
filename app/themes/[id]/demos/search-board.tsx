"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BadgePill } from "@/registry/components/badge-pill";
import { ToggleSwitch } from "@/registry/components/toggle-switch";
import { SortableHeader, type SortDir } from "@/registry/components/sortable-header";
import {
  Search,
  Filter,
  Bookmark,
  Download,
  ChevronDown,
  ChevronUp,
  X,
  Star,
  Clock,
  Inbox,
  FolderOpen,
  AlertCircle,
  Trash2,
  Mail,
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  Paperclip,
  MessageSquareWarning,
  Archive,
  Flame,
  Tag as TagIcon,
  Users,
  CalendarDays,
} from "lucide-react";

// ─── Types & data ────────────────────────────────────────────────────────────

type Status = "open" | "in-progress" | "resolved" | "blocked";
type Priority = "low" | "normal" | "high" | "critical";

type Ticket = {
  id: string;
  subject: string;
  customer: string;
  owner: string;
  ownerInitials: string;
  status: Status;
  priority: Priority;
  category: string;
  created: string;
  updated: string;
};

const STATUS_TONE: Record<Status, "primary" | "warning" | "success" | "destructive"> = {
  open: "primary",
  "in-progress": "warning",
  resolved: "success",
  blocked: "destructive",
};

const PRIORITY_TONE: Record<Priority, "neutral" | "primary" | "warning" | "destructive"> = {
  low: "neutral",
  normal: "primary",
  high: "warning",
  critical: "destructive",
};

const TICKETS: Ticket[] = [
  { id: "T-4821", subject: "Invoice export missing tax column", customer: "Northwind Trading", owner: "Alex Morgan", ownerInitials: "AM", status: "open", priority: "high", category: "Billing", created: "2026-05-09", updated: "2h ago" },
  { id: "T-4820", subject: "SSO not redirecting after Okta config", customer: "Globex Industries", owner: "Priya Shah", ownerInitials: "PS", status: "in-progress", priority: "critical", category: "Auth", created: "2026-05-09", updated: "12m ago" },
  { id: "T-4819", subject: "Add bulk archive to inbox view", customer: "Initech LLC", owner: "Jordan Kim", ownerInitials: "JK", status: "open", priority: "normal", category: "Feature request", created: "2026-05-08", updated: "1h ago" },
  { id: "T-4818", subject: "API rate limit too aggressive on /search", customer: "Acme Corp", owner: "Sam Reyes", ownerInitials: "SR", status: "in-progress", priority: "high", category: "API", created: "2026-05-08", updated: "4h ago" },
  { id: "T-4817", subject: "Audit log retention beyond 90 days", customer: "Meridian Bank", owner: "Alex Morgan", ownerInitials: "AM", status: "blocked", priority: "high", category: "Compliance", created: "2026-05-07", updated: "1d ago" },
  { id: "T-4816", subject: "CSV import fails on non-UTF8 files", customer: "Soylent Foods", owner: "Priya Shah", ownerInitials: "PS", status: "resolved", priority: "normal", category: "Import", created: "2026-05-07", updated: "1d ago" },
  { id: "T-4815", subject: "Webhook retries flooding endpoint after outage", customer: "Hooli Cloud", owner: "Sam Reyes", ownerInitials: "SR", status: "resolved", priority: "critical", category: "Webhooks", created: "2026-05-06", updated: "2d ago" },
  { id: "T-4814", subject: "Quarterly report shows wrong currency", customer: "Pied Piper", owner: "Jordan Kim", ownerInitials: "JK", status: "in-progress", priority: "normal", category: "Reporting", created: "2026-05-06", updated: "1d ago" },
  { id: "T-4813", subject: "Mobile dashboard crashes on iPad mini", customer: "Dunder Mifflin", owner: "Sam Reyes", ownerInitials: "SR", status: "open", priority: "low", category: "Mobile", created: "2026-05-05", updated: "3d ago" },
  { id: "T-4812", subject: "Two-factor backup codes expire too quickly", customer: "Umbrella Logistics", owner: "Alex Morgan", ownerInitials: "AM", status: "open", priority: "normal", category: "Auth", created: "2026-05-05", updated: "3d ago" },
  { id: "T-4811", subject: "Slack integration drops messages > 4KB", customer: "Massive Dynamic", owner: "Priya Shah", ownerInitials: "PS", status: "in-progress", priority: "high", category: "Integration", created: "2026-05-04", updated: "4d ago" },
  { id: "T-4810", subject: "Add filter for archived projects", customer: "Virtucon", owner: "Jordan Kim", ownerInitials: "JK", status: "resolved", priority: "low", category: "Feature request", created: "2026-05-03", updated: "5d ago" },
];

const SAVED_SEARCHES = [
  { id: "s1", label: "My open tickets", count: 14, icon: Inbox, active: true },
  { id: "s2", label: "High priority — last 7d", count: 8, icon: AlertCircle },
  { id: "s3", label: "Auth issues", count: 5, icon: FolderOpen },
  { id: "s4", label: "Resolved this week", count: 23, icon: Star },
];

const RECENT_SEARCHES = [
  "billing SSO",
  "webhook retries",
  "owner:Priya status:open",
];

const CATEGORIES = ["Auth", "API", "Billing", "Compliance", "Feature request", "Import", "Integration", "Mobile", "Reporting", "Webhooks"];

const TAGS = [
  { id: "vip", label: "VIP customer", color: "bg-warning" },
  { id: "regression", label: "Regression", color: "bg-destructive" },
  { id: "docs", label: "Needs docs", color: "bg-primary" },
  { id: "p0", label: "P0 escalation", color: "bg-destructive" },
  { id: "easy-win", label: "Easy win", color: "bg-success" },
  { id: "spike", label: "Needs spike", color: "bg-muted-foreground" },
];

type QuickTab = { id: string; label: string; count: number; alert?: boolean };
const QUICK_TABS: readonly QuickTab[] = [
  { id: "all", label: "All", count: 248 },
  { id: "mine", label: "Mine", count: 14 },
  { id: "unassigned", label: "Unassigned", count: 6 },
  { id: "today", label: "Today", count: 9 },
  { id: "week", label: "This week", count: 41 },
  { id: "sla", label: "SLA breaching", count: 3, alert: true },
] as const;

// ─── Components ──────────────────────────────────────────────────────────────

type SortKey = "id" | "subject" | "customer" | "priority" | "updated";
// SortDir imported from registry/components/sortable-header

const PRIORITY_RANK: Record<Priority, number> = { critical: 4, high: 3, normal: 2, low: 1 };

type QuickTabId = (typeof QUICK_TABS)[number]["id"];
type ToggleKey = "slaAtRisk" | "hasAttachments" | "awaitingCustomer" | "archived";

export function SearchBoardScene() {
  const [query, setQuery] = useState("");
  const [quickTab, setQuickTab] = useState<QuickTabId>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | Priority>("all");
  const [ownerFilter, setOwnerFilter] = useState<"all" | string>("all");
  const [dateFrom, setDateFrom] = useState("2026-05-01");
  const [dateTo, setDateTo] = useState("2026-05-11");
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set(["vip"]));
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    slaAtRisk: false,
    hasAttachments: false,
    awaitingCustomer: false,
    archived: false,
  });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SortKey>("updated");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [showFilters, setShowFilters] = useState(true);

  const owners = Array.from(new Set(TICKETS.map((t) => t.owner))).sort();

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return TICKETS.filter((t) => {
      if (q && !`${t.id} ${t.subject} ${t.customer} ${t.category}`.toLowerCase().includes(q)) return false;
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
      if (ownerFilter !== "all" && t.owner !== ownerFilter) return false;
      if (activeCategories.size > 0 && !activeCategories.has(t.category)) return false;
      return true;
    });
  }, [query, statusFilter, priorityFilter, ownerFilter, activeCategories]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "priority") cmp = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
      else if (sortBy === "updated") cmp = a.created.localeCompare(b.created);
      else cmp = String(a[sortBy]).localeCompare(String(b[sortBy]));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortBy, sortDir]);

  function toggleCategory(c: string) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selected.size === sorted.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(sorted.map((t) => t.id)));
    }
  }

  function setSort(key: SortKey) {
    if (sortBy === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  }

  const toggleCount = Object.values(toggles).filter(Boolean).length;
  const activeFilterCount =
    (statusFilter !== "all" ? 1 : 0) +
    (priorityFilter !== "all" ? 1 : 0) +
    (ownerFilter !== "all" ? 1 : 0) +
    activeCategories.size +
    activeTags.size +
    toggleCount +
    (query ? 1 : 0) +
    (quickTab !== "all" ? 1 : 0);

  function clearAllFilters() {
    setQuery("");
    setQuickTab("all");
    setStatusFilter("all");
    setPriorityFilter("all");
    setOwnerFilter("all");
    setActiveCategories(new Set());
    setActiveTags(new Set());
    setToggles({ slaAtRisk: false, hasAttachments: false, awaitingCustomer: false, archived: false });
  }

  function toggleTag(id: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function flipToggle(k: ToggleKey) {
    setToggles((prev) => ({ ...prev, [k]: !prev[k] }));
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Left sidebar: saved searches */}
      <aside className="w-64 border-r border-border bg-card shrink-0 flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <Bookmark className="size-4 text-primary" />
            Saved searches
          </h2>
        </div>
        <nav className="p-2 space-y-0.5">
          {SAVED_SEARCHES.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors ${
                  s.active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="size-3.5 shrink-0" />
                <span className="flex-1 text-left truncate">{s.label}</span>
                <span className="text-xs text-muted-foreground tabular-nums">{s.count}</span>
              </button>
            );
          })}
        </nav>
        <Separator className="my-2" />
        <div className="px-4">
          <h3 className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
            <Clock className="size-3" /> Recent
          </h3>
        </div>
        <ul className="px-2 mt-1 space-y-0.5">
          {RECENT_SEARCHES.map((q) => (
            <li key={q}>
              <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-xs text-muted-foreground hover:bg-muted hover:text-foreground">
                <Search className="size-3 shrink-0" />
                <span className="truncate font-mono" style={{ fontFamily: "var(--font-mono)" }}>{q}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex-1" />
        <div className="p-3 border-t border-border">
          <button className="w-full flex items-center gap-2 text-xs text-primary hover:underline">
            <Plus className="size-3.5" />
            Save current search
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Support · Tickets</p>
              <h1 className="text-xl font-semibold tracking-tight mt-0.5">All tickets</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="size-3.5" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="size-3.5" />
                New ticket
              </Button>
            </div>
          </div>

          {/* Quick filter tabs (segmented control) */}
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-muted/50 w-fit mb-3">
            {QUICK_TABS.map((t) => {
              const active = quickTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setQuickTab(t.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors inline-flex items-center gap-1.5 ${
                    active
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.alert && <Flame className={`size-3 ${active ? "text-destructive" : ""}`} />}
                  {t.label}
                  <span
                    className={`px-1.5 py-px rounded text-[10px] tabular-nums ${
                      active
                        ? t.alert
                          ? "bg-destructive/15 text-destructive"
                          : "bg-primary/15 text-primary"
                        : "bg-card/70 text-muted-foreground"
                    }`}
                  >
                    {t.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by ID, subject, customer, or use field:value syntax…"
                className="pl-9 pr-9 h-10"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 size-6 grid place-items-center rounded hover:bg-muted text-muted-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters((v) => !v)}
              className="h-10"
            >
              <SlidersHorizontal className="size-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold tabular-nums ${
                  showFilters ? "bg-primary-foreground/20" : "bg-primary text-primary-foreground"
                }`}>
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {/* Filter row */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-border space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Status</Label>
                  <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v as typeof statusFilter)}>
                    <SelectTrigger size="sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Priority</Label>
                  <Select value={priorityFilter} onValueChange={(v) => v && setPriorityFilter(v as typeof priorityFilter)}>
                    <SelectTrigger size="sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any priority</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Owner</Label>
                  <Select value={ownerFilter} onValueChange={(v) => v && setOwnerFilter(v)}>
                    <SelectTrigger size="sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All owners</SelectItem>
                      {owners.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-1">
                    <CalendarDays className="size-3" />
                    Created between
                  </Label>
                  <div className="flex items-center gap-1.5">
                    <Input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="h-8 text-xs"
                    />
                    <span className="text-muted-foreground text-xs">→</span>
                    <Input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Sort + Toggle switches row */}
              <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-3 items-end">
                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-1">
                    <ArrowUpDown className="size-3" />
                    Sort by
                  </Label>
                  <div className="flex items-center gap-1.5">
                    <Select value={sortBy} onValueChange={(v) => v && setSortBy(v as SortKey)}>
                      <SelectTrigger size="sm" className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="updated">Last updated</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="subject">Subject</SelectItem>
                        <SelectItem value="id">Ticket ID</SelectItem>
                      </SelectContent>
                    </Select>
                    <button
                      onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
                      className="h-8 px-2 border border-border bg-card rounded-md text-xs inline-flex items-center gap-1 hover:bg-muted"
                      aria-label={`Sort ${sortDir === "asc" ? "ascending" : "descending"}`}
                    >
                      {sortDir === "asc" ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                      {sortDir === "asc" ? "Asc" : "Desc"}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Quick toggles</Label>
                  <div className="flex flex-wrap gap-1.5">
                    <ToggleSwitch
                      active={toggles.slaAtRisk}
                      onClick={() => flipToggle("slaAtRisk")}
                      icon={AlertCircle}
                      label="SLA at risk"
                      tone="destructive"
                    />
                    <ToggleSwitch
                      active={toggles.hasAttachments}
                      onClick={() => flipToggle("hasAttachments")}
                      icon={Paperclip}
                      label="Has attachments"
                    />
                    <ToggleSwitch
                      active={toggles.awaitingCustomer}
                      onClick={() => flipToggle("awaitingCustomer")}
                      icon={MessageSquareWarning}
                      label="Awaiting customer"
                      tone="warning"
                    />
                    <ToggleSwitch
                      active={toggles.archived}
                      onClick={() => flipToggle("archived")}
                      icon={Archive}
                      label="Include archived"
                    />
                  </div>
                </div>
              </div>

              {/* Category + Tags chip rows */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs flex items-center gap-1">
                    <FolderOpen className="size-3" />
                    Category
                  </Label>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {CATEGORIES.map((c) => {
                      const active = activeCategories.has(c);
                      return (
                        <button
                          key={c}
                          onClick={() => toggleCategory(c)}
                          className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                            active
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                          }`}
                        >
                          {c}
                          {active && <X className="inline size-3 ml-1 -mr-0.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <Label className="text-xs flex items-center gap-1">
                    <TagIcon className="size-3" />
                    Tags
                  </Label>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {TAGS.map((t) => {
                      const active = activeTags.has(t.id);
                      return (
                        <button
                          key={t.id}
                          onClick={() => toggleTag(t.id)}
                          className={`px-2.5 py-1 rounded-md text-xs border inline-flex items-center gap-1.5 transition-colors ${
                            active
                              ? "bg-secondary border-border text-foreground"
                              : "bg-card border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span className={`size-2 rounded-full ${t.color}`} />
                          {t.label}
                          {active && <X className="size-3 -mr-0.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {activeFilterCount > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  <Filter className="size-3 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {activeFilterCount} filter{activeFilterCount === 1 ? "" : "s"} active · showing {sorted.length} of {TICKETS.length}
                  </span>
                  <button onClick={clearAllFilters} className="text-primary hover:underline ml-auto">
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}
        </header>

        {/* Bulk action bar */}
        {selected.size > 0 && (
          <div className="px-6 py-2 bg-primary/10 border-b border-border flex items-center gap-3 text-sm">
            <span className="font-medium">
              {selected.size} selected
            </span>
            <Separator orientation="vertical" className="h-4" />
            <button className="flex items-center gap-1.5 text-foreground hover:text-primary">
              <Mail className="size-3.5" /> Assign
            </button>
            <button className="flex items-center gap-1.5 text-foreground hover:text-primary">
              <Star className="size-3.5" /> Mark priority
            </button>
            <button className="flex items-center gap-1.5 text-destructive hover:text-destructive">
              <Trash2 className="size-3.5" /> Archive
            </button>
            <div className="flex-1" />
            <button onClick={() => setSelected(new Set())} className="text-muted-foreground hover:text-foreground">
              Clear selection
            </button>
          </div>
        )}

        {/* Results table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border sticky top-0">
              <tr>
                <th className="w-10 px-3 py-2.5">
                  <input
                    type="checkbox"
                    className="accent-primary size-3.5"
                    checked={selected.size === sorted.length && sorted.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <SortableHeader label="ID" sortKey="id" sortBy={sortBy} sortDir={sortDir} onSort={setSort} className="w-24" />
                <SortableHeader label="Subject" sortKey="subject" sortBy={sortBy} sortDir={sortDir} onSort={setSort} />
                <SortableHeader label="Customer" sortKey="customer" sortBy={sortBy} sortDir={sortDir} onSort={setSort} className="w-44" />
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground w-28">Status</th>
                <SortableHeader label="Priority" sortKey="priority" sortBy={sortBy} sortDir={sortDir} onSort={setSort} className="w-28" />
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground w-32">Owner</th>
                <SortableHeader label="Updated" sortKey="updated" sortBy={sortBy} sortDir={sortDir} onSort={setSort} className="w-24 text-right" align="right" />
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16">
                    <Search className="size-8 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-sm font-medium">No tickets match these filters</p>
                    <p className="text-xs text-muted-foreground mt-1">Try removing a filter or clearing the search</p>
                    <button onClick={clearAllFilters} className="mt-3 text-xs text-primary hover:underline">
                      Clear all filters
                    </button>
                  </td>
                </tr>
              ) : (
                sorted.map((t) => {
                  const isSelected = selected.has(t.id);
                  return (
                    <tr
                      key={t.id}
                      className={`border-b border-border transition-colors cursor-pointer ${
                        isSelected ? "bg-primary/5" : "hover:bg-muted/30"
                      }`}
                    >
                      <td className="px-3 py-2.5">
                        <input
                          type="checkbox"
                          className="accent-primary size-3.5"
                          checked={isSelected}
                          onChange={() => toggleSelect(t.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="font-mono text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                          {t.id}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{t.subject}</span>
                          <BadgePill tone="neutral">{t.category}</BadgePill>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground">{t.customer}</td>
                      <td className="px-3 py-2.5">
                        <BadgePill tone={STATUS_TONE[t.status]}>
                          {t.status.replace("-", " ")}
                        </BadgePill>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                          t.priority === "critical" ? "text-destructive"
                          : t.priority === "high" ? "text-warning"
                          : "text-muted-foreground"
                        }`}>
                          <span className={`size-1.5 rounded-full ${
                            t.priority === "critical" ? "bg-destructive"
                            : t.priority === "high" ? "bg-warning"
                            : t.priority === "normal" ? "bg-primary"
                            : "bg-muted-foreground"
                          }`} />
                          {t.priority}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-primary/15 grid place-items-center text-[10px] font-semibold text-primary">
                            {t.ownerInitials}
                          </div>
                          <span className="text-xs truncate">{t.owner}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-right text-xs text-muted-foreground tabular-nums">{t.updated}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer pagination */}
        <footer className="px-6 py-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing <span className="font-medium text-foreground">{sorted.length}</span> of {TICKETS.length} tickets
          </span>
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <Select defaultValue="25">
              <SelectTrigger size="sm" className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <Separator orientation="vertical" className="h-4" />
            <Button variant="outline" size="sm" disabled>Prev</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </footer>
      </main>
    </div>
  );
}

// (ToggleSwitch and SortableHeader now live in registry/components/)
