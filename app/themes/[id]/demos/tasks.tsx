"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableCompact } from "@/registry/components/table-compact";
import { BadgePill } from "@/registry/components/badge-pill";
import { StatusDot } from "@/registry/components/status-dot";
import {
  Inbox,
  Calendar,
  Hash,
  Layers,
  Plus,
  Filter,
  Bell,
  Search,
} from "lucide-react";

type TaskTone = "neutral" | "primary" | "success" | "warning" | "destructive";
type Priority = "high" | "medium" | "low";
type TaskStatus = "backlog" | "todo" | "in-progress" | "done";

type Task = {
  id: number;
  title: string;
  desc: string;
  tag: string;
  tone: TaskTone;
  priority: Priority;
  assignee: string;
  due: string;
  status: TaskStatus;
};

const TASKS: Task[] = [
  { id: 1, title: "Audit checkout flow", desc: "Map each step and identify friction points", tag: "research", tone: "neutral", priority: "medium", assignee: "MS", due: "May 12", status: "backlog" },
  { id: 2, title: "Pricing page revamp", desc: "Redesign to improve plan comparison clarity", tag: "design", tone: "primary", priority: "high", assignee: "JH", due: "May 14", status: "backlog" },
  { id: 3, title: "API rate limit docs", desc: "Document new per-endpoint limits", tag: "docs", tone: "neutral", priority: "low", assignee: "RO", due: "May 20", status: "backlog" },
  { id: 4, title: "Stripe webhook retries", desc: "Add exponential backoff to retry queue", tag: "engineering", tone: "warning", priority: "high", assignee: "CW", due: "May 10", status: "in-progress" },
  { id: 5, title: "Onboarding email v2", desc: "Rewrite drip sequence for new user cohorts", tag: "marketing", tone: "primary", priority: "medium", assignee: "AJ", due: "May 13", status: "in-progress" },
  { id: 6, title: "Mobile nav bug", desc: "Fix overflow on small viewports in main nav", tag: "engineering", tone: "warning", priority: "high", assignee: "LP", due: "May 9", status: "in-progress" },
  { id: 7, title: "SSO provider setup", desc: "Integrate Okta for enterprise customers", tag: "engineering", tone: "primary", priority: "medium", assignee: "MS", due: "May 15", status: "todo" },
  { id: 8, title: "Q2 OKR review", desc: "Evaluate objective attainment rates", tag: "ops", tone: "success", priority: "low", assignee: "JH", due: "May 8", status: "done" },
  { id: 9, title: "Figma component audit", desc: "Reconcile Figma tokens with codebase", tag: "design", tone: "primary", priority: "medium", assignee: "RO", due: "May 7", status: "done" },
  { id: 10, title: "Analytics dashboard MVP", desc: "Ship read-only dashboard for power users", tag: "engineering", tone: "success", priority: "high", assignee: "CW", due: "May 6", status: "done" },
  { id: 11, title: "Localization strings", desc: "Extract and submit copy for translation", tag: "ops", tone: "neutral", priority: "low", assignee: "AJ", due: "May 22", status: "todo" },
  { id: 12, title: "Performance budget", desc: "Set Core Web Vitals targets per page type", tag: "engineering", tone: "warning", priority: "medium", assignee: "LP", due: "May 16", status: "todo" },
  { id: 13, title: "Customer interview synthesis", desc: "Summarize 10 discovery call recordings", tag: "research", tone: "neutral", priority: "high", assignee: "MS", due: "May 11", status: "backlog" },
  { id: 14, title: "Dark mode polish", desc: "Fix remaining contrast issues in dark theme", tag: "design", tone: "primary", priority: "low", assignee: "JH", due: "May 18", status: "todo" },
];

const COLUMNS: { id: TaskStatus; label: string; tone: "neutral" | "warning" | "success" | "primary" }[] = [
  { id: "backlog", label: "Backlog", tone: "neutral" },
  { id: "todo", label: "Todo", tone: "primary" },
  { id: "in-progress", label: "In progress", tone: "warning" },
  { id: "done", label: "Done", tone: "success" },
];

const STATUS_TONE: Record<TaskStatus, TaskTone> = {
  backlog: "neutral",
  todo: "primary",
  "in-progress": "warning",
  done: "success",
};

const STATUS_LABEL: Record<TaskStatus, string> = {
  backlog: "Backlog",
  todo: "Todo",
  "in-progress": "In progress",
  done: "Done",
};

const PRIORITY_TONE: Record<Priority, TaskTone> = {
  high: "destructive",
  medium: "warning",
  low: "neutral",
};

const AVATAR_COLORS = ["bg-primary/20 text-primary", "bg-success/20 text-success", "bg-warning/20 text-warning-foreground", "bg-destructive/15 text-destructive"];

const NAV_ITEMS = [
  { label: "Inbox", icon: Inbox },
  { label: "Today", icon: Calendar },
  { label: "Upcoming", icon: Calendar },
  { label: "Projects", icon: Layers },
  { label: "Calendar", icon: Calendar },
  { label: "Tags", icon: Hash },
];

const ASSIGNEE_COLORS: Record<string, string> = {
  MS: AVATAR_COLORS[0],
  JH: AVATAR_COLORS[1],
  RO: AVATAR_COLORS[2],
  CW: AVATAR_COLORS[3],
  AJ: AVATAR_COLORS[0],
  LP: AVATAR_COLORS[1],
};

function AvatarCircle({ initials }: { initials: string }) {
  const color = ASSIGNEE_COLORS[initials] ?? AVATAR_COLORS[0];
  return (
    <span className={`inline-flex items-center justify-center size-6 rounded-full text-[10px] font-semibold shrink-0 ${color}`}>
      {initials}
    </span>
  );
}

export function TasksScene() {
  const [view, setView] = useState("board");

  const tasksByStatus = (status: TaskStatus) => TASKS.filter((t) => t.status === status);

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground">
      {/* Top app bar */}
      <header className="h-14 border-b border-border flex items-center px-4 gap-3 shrink-0">
        <Select defaultValue="acme">
          <SelectTrigger size="sm" className="w-44 shrink-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="acme">Acme Q2</SelectItem>
            <SelectItem value="beta">Beta Launch</SelectItem>
            <SelectItem value="platform">Platform Infra</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            className="w-full h-8 pl-8 pr-3 text-sm border border-border rounded-md bg-muted placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Search tasks…"
          />
        </div>
        <div className="flex-1" />
        {/* Avatar stack */}
        <div className="flex -space-x-1.5">
          {["MS", "JH", "RO", "CW"].map((a) => (
            <AvatarCircle key={a} initials={a} />
          ))}
        </div>
        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground">
          <Bell className="size-4" />
        </button>
        <Button size="sm">
          <Plus className="size-3.5" />
          New task
        </Button>
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
                    i === 0 ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
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
          <Tabs defaultValue="board" value={view} onValueChange={setView} className="h-full">
            <div className="border-b border-border px-6 pt-4">
              <TabsList variant="line">
                <TabsTrigger value="board">Board</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>

            {/* View A: Board */}
            <TabsContent value="board">
              <div className="px-6 py-6 space-y-4">
                {/* Page header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h1 className="text-xl font-semibold tracking-tight">Sprint 24 board</h1>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="size-3.5" />
                      Filter
                    </Button>
                    <Select defaultValue="board">
                      <SelectTrigger size="sm" className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="board">Board</SelectItem>
                        <SelectItem value="list">List</SelectItem>
                        <SelectItem value="timeline">Timeline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Kanban columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {COLUMNS.map((col) => {
                    const colTasks = tasksByStatus(col.id);
                    return (
                      <div key={col.id} className="space-y-2">
                        {/* Column header */}
                        <div className="flex items-center justify-between px-1">
                          <span className="text-sm font-medium flex items-center gap-1.5">
                            <StatusDot tone={col.tone} />
                            {col.label}
                          </span>
                          <span className="text-xs text-muted-foreground tabular-nums">{colTasks.length}</span>
                        </div>
                        {/* Cards */}
                        <div className="space-y-2">
                          {colTasks.map((task) => (
                            <Card key={task.id} className="cursor-pointer hover:shadow-sm transition-shadow">
                              <CardContent className="p-3 space-y-2">
                                <p className="text-sm font-medium leading-snug">{task.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">{task.desc}</p>
                                <div className="flex items-center justify-between pt-1">
                                  <BadgePill tone={task.tone}>{task.tag}</BadgePill>
                                  <div className="flex items-center gap-1.5">
                                    <AvatarCircle initials={task.assignee} />
                                    <span className="text-[10px] text-muted-foreground">{task.due}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* View B: List */}
            <TabsContent value="list">
              <div className="px-6 py-6 space-y-4">
                {/* Page header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h1 className="text-xl font-semibold tracking-tight">All tasks</h1>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      {(["engineering", "design", "research"] as const).map((tag) => (
                        <BadgePill key={tag} tone="neutral" className="cursor-pointer">{tag}</BadgePill>
                      ))}
                    </div>
                    <Select defaultValue="status">
                      <SelectTrigger size="sm" className="w-40">
                        <SelectValue placeholder="Group by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="status">Group by: status</SelectItem>
                        <SelectItem value="assignee">Group by: assignee</SelectItem>
                        <SelectItem value="priority">Group by: priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Grouped table */}
                <div className="space-y-6">
                  {COLUMNS.map((col) => {
                    const colTasks = tasksByStatus(col.id);
                    if (colTasks.length === 0) return null;
                    return (
                      <div key={col.id}>
                        <div className="flex items-center gap-2 mb-2">
                          <StatusDot tone={col.tone} />
                          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            {col.label}
                          </span>
                          <span className="text-xs text-muted-foreground">({colTasks.length})</span>
                        </div>
                        <div className="border border-border rounded-md overflow-hidden">
                          <TableCompact
                            columns={[
                              {
                                key: "title",
                                header: "Task",
                                render: (r) => (
                                  <span className="font-medium text-foreground">
                                    {(r as unknown as Task).title}
                                  </span>
                                ),
                              },
                              {
                                key: "assignee",
                                header: "Assignee",
                                render: (r) => (
                                  <AvatarCircle initials={(r as unknown as Task).assignee} />
                                ),
                              },
                              {
                                key: "tag",
                                header: "Tag",
                                render: (r) => (
                                  <BadgePill tone={(r as unknown as Task).tone}>
                                    {(r as unknown as Task).tag}
                                  </BadgePill>
                                ),
                              },
                              {
                                key: "priority",
                                header: "Priority",
                                render: (r) => {
                                  const p = (r as unknown as Task).priority;
                                  return <BadgePill tone={PRIORITY_TONE[p]}>{p}</BadgePill>;
                                },
                              },
                              { key: "due", header: "Due", numeric: true },
                              {
                                key: "status",
                                header: "Status",
                                render: (r) => {
                                  const s = (r as unknown as Task).status;
                                  return (
                                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                      <StatusDot tone={STATUS_TONE[s]} size="sm" />
                                      {STATUS_LABEL[s]}
                                    </span>
                                  );
                                },
                              },
                            ]}
                            data={colTasks as unknown as Record<string, React.ReactNode>[]}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
