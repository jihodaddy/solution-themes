"use client";

import { useState } from "react";
import {
  Search,
  Anchor,
  X,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  BookOpen,
  MapPin,
  Box,
  User,
  Tag,
  DollarSign,
  MessageSquare,
  Calendar,
  Bell,
  HelpCircle,
  Plus,
  Copy,
  Save,
  Send,
  Printer,
  History,
  Check,
} from "lucide-react";

// ─── Shared header chrome ────────────────────────────────────────────────────

const GLOBAL_NAV = [
  "Operations",
  "Agreements",
  "Customers",
  "Vessels",
  "Reports",
  "Set-Up",
];

type ViewId = "agreement" | "bl" | "booking";

const WINDOWS: { id: ViewId; title: string }[] = [
  { id: "agreement", title: "Agreement" },
  { id: "bl", title: "B/L" },
  { id: "booking", title: "Booking" },
];

// ─── Top dark navy header with global nav ────────────────────────────────────

function GlobalHeader() {
  return (
    <header className="bg-primary text-primary-foreground shrink-0">
      <div className="h-12 flex items-center gap-4 px-4">
        <div className="flex items-center gap-2 shrink-0">
          <div className="size-7 rounded-md bg-primary-foreground/15 grid place-items-center">
            <Anchor className="size-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">ACME Logistics</span>
        </div>

        <nav className="flex items-center gap-1 text-xs">
          <button className="px-2.5 py-1 rounded text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 inline-flex items-center gap-1">
            Operations
            <ChevronDown className="size-3" />
          </button>
          {GLOBAL_NAV.slice(1).map((label) => (
            <button
              key={label}
              className="px-2.5 py-1 rounded text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="relative w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-primary-foreground/60" />
          <input
            className="w-full h-7 pl-8 pr-2 text-xs bg-primary-foreground/10 placeholder:text-primary-foreground/50 rounded border-0 focus:outline-none focus:bg-primary-foreground/20"
            placeholder="Search menu…"
          />
        </div>

        <div className="flex items-center gap-1">
          <button
            className="size-7 rounded grid place-items-center hover:bg-primary-foreground/10 relative"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            <span className="absolute top-1 right-1 size-1.5 rounded-full bg-warning" />
          </button>
          <button
            className="size-7 rounded grid place-items-center hover:bg-primary-foreground/10"
            aria-label="Help"
          >
            <HelpCircle className="size-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 pl-2 ml-1 border-l border-primary-foreground/20">
          <div className="size-7 rounded-full bg-primary-foreground/20 grid place-items-center text-[11px] font-semibold">
            AU
          </div>
          <div className="text-[11px] leading-tight">
            <div className="font-medium">Admin User</div>
            <div className="opacity-60">admin01 · HQ</div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Window tab bar (open documents) ─────────────────────────────────────────

function WindowTabs({
  view,
  onChange,
}: {
  view: ViewId;
  onChange: (v: ViewId) => void;
}) {
  return (
    <div className="border-b border-border bg-muted/40 flex items-stretch h-8 text-[11px] shrink-0">
      {WINDOWS.map((w) => {
        const active = view === w.id;
        return (
          <button
            key={w.id}
            onClick={() => onChange(w.id)}
            className={`group relative flex items-center gap-2 px-3 border-r border-border h-full ${
              active
                ? "bg-background text-foreground font-medium"
                : "text-muted-foreground hover:bg-background/60"
            }`}
          >
            {active && <span className="absolute left-0 right-0 top-0 h-0.5 bg-primary" />}
            <span>{w.title}</span>
            <X
              className={`size-3 ${
                active ? "opacity-60" : "opacity-0 group-hover:opacity-60"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

// ─── Screen header (title + breadcrumb + actions) ────────────────────────────

type ActionTone = "primary" | "default" | "destructive";
type Action = { label: string; tone?: ActionTone; icon?: React.ComponentType<{ className?: string }> };

function ScreenHeader({
  title,
  module,
  secondaryActions = [],
  primaryAction,
  destructiveAction,
}: {
  title: string;
  module: string;
  secondaryActions?: Action[];
  primaryAction?: Action;
  destructiveAction?: Action;
}) {
  return (
    <div className="border-b border-border bg-background">
      <div className="flex items-center justify-between gap-4 px-4 h-12">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span>{module}</span>
            <ChevronRight className="size-3" />
            <span className="text-foreground font-medium">{title}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {destructiveAction && (
            <button className="h-7 px-3 text-xs rounded border border-border text-destructive hover:bg-destructive/10 transition-colors">
              {destructiveAction.label}
            </button>
          )}
          {secondaryActions.length > 0 && (
            <>
              {destructiveAction && <span className="w-px h-5 bg-border mx-1" />}
              {secondaryActions.map((a) => {
                const Icon = a.icon;
                return (
                  <button
                    key={a.label}
                    className="h-7 px-3 text-xs rounded border border-border bg-card hover:bg-muted transition-colors inline-flex items-center gap-1.5"
                  >
                    {Icon && <Icon className="size-3" />}
                    {a.label}
                  </button>
                );
              })}
            </>
          )}
          {primaryAction && (
            <>
              <span className="w-px h-5 bg-border mx-1" />
              <button className="h-7 px-4 text-xs rounded bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5">
                {primaryAction.icon && <primaryAction.icon className="size-3" />}
                {primaryAction.label}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Tiny field building blocks ──────────────────────────────────────────────

function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <label className="text-[11px] text-muted-foreground w-28 shrink-0 text-left">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function TinyInput({
  value,
  placeholder,
  readOnly,
  className = "",
}: {
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}) {
  return (
    <input
      defaultValue={value}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`h-6 w-full px-1.5 text-[11px] border border-input rounded-sm bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring ${
        readOnly ? "bg-muted text-muted-foreground" : ""
      } ${className}`}
    />
  );
}

function TinySelect({
  value,
  options = [],
  className = "",
}: {
  value?: string;
  options?: string[];
  className?: string;
}) {
  return (
    <select
      defaultValue={value}
      className={`h-6 w-full px-1.5 text-[11px] border border-input rounded-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring ${className}`}
    >
      {value && <option>{value}</option>}
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
      <span className="size-1 rounded-full bg-primary" />
      {children}
    </h3>
  );
}

// ─── View 1: Agreement Creation & Inquiry ────────────────────────────────────

const AGREEMENT_ROWS = [
  { no: "1", clst: "GOENG/AHU", group: "TESTO-AHM/EM", lane: "AHM", type: "GENERAL", on: "TEMP", lessor: "TEMPCMM", lessee: "TPLC", contract: "OF000111", start: "2026/04/01", end: "2027/03/31", oa: "2", units: "20", rate: "0.40", total: "0.40" },
  { no: "2", clst: "GOENG/SCH", group: "TFD-SCG02", lane: "SCH", type: "GENERAL", on: "TEMP", lessor: "TEMPCBO", lessee: "TPLC", contract: "OF000118", start: "2026/04/01", end: "2027/03/31", oa: "2", units: "20", rate: "0.40", total: "0.40" },
  { no: "3", clst: "GOENG/SCH", group: "TFP-NEX-EM", lane: "SCH", type: "GENERAL", on: "PERM", lessor: "PERMCBO", lessee: "TPLC", contract: "OF000119", start: "2026/04/01", end: "2027/03/31", oa: "2", units: "20", rate: "0.42", total: "0.42" },
  { no: "4", clst: "GOPLY/AHU", group: "TBRY-AHM01", lane: "AHM", type: "REEFER", on: "PERM", lessor: "PERMTRD", lessee: "TPLC", contract: "OF000120", start: "2026/04/01", end: "2027/03/31", oa: "2", units: "20", rate: "0.55", total: "0.55" },
  { no: "5", clst: "GOPLY/MNT", group: "TFP-MNTRE2", lane: "MNT", type: "REEFER", on: "TEMP", lessor: "TEMPRR2", lessee: "TPLC", contract: "OF000121", start: "2026/04/01", end: "2027/03/31", oa: "2", units: "40", rate: "0.62", total: "0.62" },
  { no: "6", clst: "GOENG/AHU", group: "TLA-TEST/AHO12", lane: "AHM", type: "GENERAL", on: "TEMP", lessor: "TEMPRRT", lessee: "TPLC", contract: "OF000125", start: "2026/04/01", end: "2027/03/31", oa: "2", units: "40", rate: "0.39", total: "0.39" },
];

function AgreementView() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ScreenHeader
        title="Agreement"
        module="Agreements"
        destructiveAction={{ label: "Delete" }}
        secondaryActions={[
          { label: "New", icon: Plus },
          { label: "Duplicate", icon: Copy },
        ]}
        primaryAction={{ label: "Save", icon: Save }}
      />

      <div className="flex-1 overflow-auto">
        {/* Filter block */}
        <div className="px-4 py-3 border-b border-border bg-muted/20">
          <div className="grid grid-cols-4 gap-x-6 gap-y-1.5">
            <Field label="Lane">
              <TinySelect value="AHM / Ahmedabad" />
            </Field>
            <Field label="Lessor">
              <TinyInput value="TEMPCMM" />
            </Field>
            <Field label="Agreement No">
              <TinyInput value="OF000111" />
            </Field>
            <Field label="Contract No">
              <TinyInput placeholder="—" />
            </Field>
            <Field label="Lease Period">
              <div className="flex items-center gap-1">
                <TinyInput value="2026/04/01" />
                <span className="text-[10px] text-muted-foreground">~</span>
                <TinyInput value="2027/03/31" />
              </div>
            </Field>
            <Field label="Expiration Date">
              <TinyInput value="2027/03/31" />
            </Field>
            <Field label="Type">
              <TinySelect value="ALL" options={["GENERAL", "REEFER", "FLATRACK"]} />
            </Field>
            <Field label="Machinery Maker">
              <TinySelect value="ALL" />
            </Field>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3 text-[10px]">
              <label className="flex items-center gap-1 text-foreground">
                <input type="checkbox" defaultChecked className="size-3 accent-primary" />
                Grade Audit Grace Period
              </label>
              <label className="flex items-center gap-1 text-muted-foreground">
                <input type="checkbox" className="size-3 accent-primary" />
                Failed by NFR with NFR-CMM in Total
              </label>
            </div>
            <div className="flex items-center gap-1">
              <button className="h-6 px-3 text-[11px] rounded bg-primary text-primary-foreground font-medium">
                Inquiry
              </button>
              <button className="h-6 px-3 text-[11px] rounded bg-card border border-border">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Summary strip */}
        <div className="px-4 py-2 border-b border-border bg-card flex items-center gap-4 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-success" />
            <span className="text-muted-foreground">Grade Audit Grace Period</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-destructive" />
            <span className="text-muted-foreground">Failed by NFR with NFR-CMM in Total</span>
          </div>
          <div className="flex-1" />
          <div className="text-muted-foreground">
            <span className="font-medium text-foreground">Total Records: 248</span>
            <span className="mx-2">|</span>
            <span>Selected: 0</span>
          </div>
        </div>

        {/* Data grid */}
        <div className="overflow-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead className="bg-muted/60 text-foreground sticky top-0 border-b-2 border-border">
              <tr>
                <th className="w-8 px-2 py-2 border-r border-border">
                  <input type="checkbox" className="size-3 accent-primary" />
                </th>
                {[
                  { key: "no", label: "No", align: "right" as const },
                  { key: "clst", label: "CLS/T" },
                  { key: "group", label: "Group" },
                  { key: "lane", label: "Lane", sorted: "asc" as const },
                  { key: "type", label: "Type" },
                  { key: "on", label: "Status" },
                  { key: "lessor", label: "Lessor" },
                  { key: "lessee", label: "Lessee" },
                  { key: "contract", label: "Contract No" },
                  { key: "start", label: "Start Date" },
                  { key: "end", label: "End Date" },
                  { key: "oa", label: "OA", align: "right" as const },
                  { key: "units", label: "Units", align: "right" as const },
                  { key: "rate", label: "Rate", align: "right" as const },
                  { key: "total", label: "Total", align: "right" as const },
                ].map((h) => (
                  <th
                    key={h.key}
                    className={`px-2 py-2 font-semibold border-r border-border last:border-0 whitespace-nowrap select-none cursor-pointer hover:bg-muted ${
                      h.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {h.label}
                      {h.sorted === "asc" && <ChevronUp className="size-3 text-primary" />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-numeric" style={{ fontFamily: "var(--font-numeric)" }}>
              {AGREEMENT_ROWS.map((r, i) => {
                const selected = i === 1;
                return (
                  <tr
                    key={r.no}
                    className={`border-b border-border transition-colors ${
                      selected
                        ? "bg-primary/10"
                        : "odd:bg-muted/15 hover:bg-muted/40"
                    }`}
                  >
                    <td className="px-2 py-1.5 border-r border-border">
                      <input
                        type="checkbox"
                        defaultChecked={selected}
                        className="size-3 accent-primary"
                      />
                    </td>
                    <td className="px-2 py-1.5 border-r border-border text-right text-muted-foreground">{r.no}</td>
                    <td className="px-2 py-1.5 border-r border-border">{r.clst}</td>
                    <td className="px-2 py-1.5 border-r border-border">{r.group}</td>
                    <td className="px-2 py-1.5 border-r border-border">{r.lane}</td>
                    <td className="px-2 py-1.5 border-r border-border">{r.type}</td>
                    <td className="px-2 py-1.5 border-r border-border">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          r.on === "PERM"
                            ? "bg-success/15 text-success"
                            : "bg-warning/20 text-warning"
                        }`}
                      >
                        {r.on}
                      </span>
                    </td>
                    <td className="px-2 py-1.5 border-r border-border">{r.lessor}</td>
                    <td className="px-2 py-1.5 border-r border-border">{r.lessee}</td>
                    <td className="px-2 py-1.5 border-r border-border">{r.contract}</td>
                    <td className="px-2 py-1.5 border-r border-border">{r.start}</td>
                    <td className="px-2 py-1.5 border-r border-border">{r.end}</td>
                    <td className="px-2 py-1.5 border-r border-border text-right">{r.oa}</td>
                    <td className="px-2 py-1.5 border-r border-border text-right">{r.units}</td>
                    <td className="px-2 py-1.5 border-r border-border text-right tabular-nums">{r.rate}</td>
                    <td className="px-2 py-1.5 text-right tabular-nums font-medium">{r.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/10 text-[11px] text-muted-foreground">
          <span>Showing 1–6 of 248</span>
          <div className="flex items-center gap-1">
            <button className="h-6 px-2 rounded border border-border bg-card hover:bg-muted">Prev</button>
            <button className="h-6 px-2 rounded bg-primary text-primary-foreground font-medium">1</button>
            <button className="h-6 px-2 rounded border border-border bg-card hover:bg-muted">2</button>
            <button className="h-6 px-2 rounded border border-border bg-card hover:bg-muted">3</button>
            <button className="h-6 px-2 rounded border border-border bg-card hover:bg-muted">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── View 2: B/L Creation ────────────────────────────────────────────────────

const BL_WORKFLOW = [
  { code: "CLS", done: true },
  { code: "WEB", done: true },
  { code: "OBL", done: true },
  { code: "RCV", done: true },
  { code: "SUR", done: false, active: true },
  { code: "D/O", done: false },
  { code: "E/P", done: false },
  { code: "O.CA", done: false },
  { code: "F.CA", done: false },
  { code: "OA", done: false },
  { code: "In.S", done: false },
  { code: "A/R", done: false },
  { code: "TSC", done: false },
  { code: "C/M", done: false },
];

const BL_SIDEBAR = [
  { label: "Booking", icon: BookOpen, active: true },
  { label: "Location", icon: MapPin },
  { label: "Container", icon: Box },
  { label: "Customer", icon: User },
  { label: "Mark & Description", icon: Tag },
  { label: "Freight", icon: DollarSign },
  { label: "Memo & Freetime", icon: MessageSquare },
];

function BlCreationView() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ScreenHeader
        title="B/L Creation"
        module="Operations"
        destructiveAction={{ label: "Delete" }}
        secondaryActions={[
          { label: "History", icon: History },
          { label: "Print", icon: Printer },
          { label: "Send", icon: Send },
        ]}
        primaryAction={{ label: "Save", icon: Save }}
      />

      {/* Top action strip */}
      <div className="border-b border-border bg-muted/15 px-4 py-2.5 flex items-center gap-3 text-xs shrink-0">
        <div className="flex items-center gap-2">
          <label className="text-[10px] uppercase tracking-wide text-muted-foreground">B/L No</label>
          <TinyInput placeholder="Enter B/L number…" className="w-48" />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[10px] uppercase tracking-wide text-muted-foreground">Booking No</label>
          <TinyInput placeholder="Search booking…" className="w-48" />
          <button className="h-6 px-2.5 text-[10px] rounded border border-border bg-card hover:bg-muted">
            Open
          </button>
        </div>
        <div className="flex-1" />
        <button className="h-7 px-3 rounded border border-border bg-card hover:bg-muted text-xs">
          List by VVD & POD
        </button>
        <button className="h-7 px-4 rounded bg-primary text-primary-foreground font-medium text-xs inline-flex items-center gap-1.5">
          <Plus className="size-3" />
          New B/L
        </button>
      </div>

      {/* Workflow status bar */}
      <div className="border-b border-border bg-card shrink-0">
        <div className="flex items-center px-4 py-2 gap-2 text-[10px] text-muted-foreground">
          <span className="font-medium text-foreground">Workflow</span>
          <span>·</span>
          <span>Step 5 of 14 — Surrender</span>
          <div className="flex-1" />
          <span>
            <span className="text-foreground font-medium">29%</span> complete
          </span>
        </div>
        <div className="h-1 bg-muted relative">
          <div
            className="absolute inset-y-0 left-0 bg-success"
            style={{ width: "28.5%" }}
          />
          <div
            className="absolute inset-y-0 bg-primary"
            style={{ left: "28.5%", width: "7.1%" }}
          />
        </div>
        <div className="flex items-stretch text-[10px] border-t border-border">
          {BL_WORKFLOW.map((s) => (
            <div
              key={s.code}
              title={s.code}
              className={`flex-1 px-2 py-1.5 text-center inline-flex items-center justify-center gap-1 ${
                s.active
                  ? "bg-primary/10 text-primary font-semibold ring-1 ring-inset ring-primary/30"
                  : s.done
                  ? "text-success font-medium"
                  : "text-muted-foreground/70"
              }`}
            >
              {s.done && <Check className="size-2.5" />}
              {s.active && <span className="size-1.5 rounded-full bg-primary" />}
              {s.code}
            </div>
          ))}
        </div>
      </div>

      {/* Body: sidebar + form */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-24 border-r border-border bg-muted/20 shrink-0 flex flex-col">
          {BL_SIDEBAR.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`relative flex flex-col items-center gap-1.5 py-3 px-1.5 text-[10px] leading-tight text-center transition-colors ${
                  item.active
                    ? "bg-background text-primary font-medium"
                    : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                }`}
              >
                {item.active && (
                  <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r bg-primary" />
                )}
                <Icon className={`size-4 ${item.active ? "text-primary" : ""}`} />
                <span className="leading-snug">{item.label}</span>
              </button>
            );
          })}
        </aside>

        <main className="flex-1 overflow-auto p-6 bg-background">
          <div className="space-y-6 max-w-3xl">
            <section>
              <SectionTitle>B/L Identification</SectionTitle>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-3">
                <Field label="B/L No">
                  <TinyInput placeholder="Auto-generated on save" readOnly />
                </Field>
                <Field label="Booking No">
                  <TinyInput placeholder="Select from list above" />
                </Field>
                <Field label="Copy From">
                  <div className="flex items-center gap-1">
                    <TinyInput placeholder="Search existing B/L…" />
                  </div>
                </Field>
                <Field label="Copies">
                  <div className="flex items-center gap-1.5">
                    <TinyInput value="1" className="w-14" />
                    <button className="h-6 px-3 text-xs rounded border border-border bg-card hover:bg-muted inline-flex items-center gap-1">
                      <Copy className="size-3" /> Duplicate
                    </button>
                  </div>
                </Field>
              </div>
            </section>

            <section>
              <SectionTitle>Linked Booking</SectionTitle>
              <div className="mt-3 border border-dashed border-border rounded-md p-8 text-center bg-muted/10">
                <BookOpen className="size-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">No booking selected</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Choose a Booking No above, or paste an existing B/L No to clone its data.
                </p>
                <button className="mt-4 h-7 px-3 text-xs rounded bg-primary text-primary-foreground font-medium inline-flex items-center gap-1.5">
                  <Search className="size-3" />
                  Browse bookings
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── View 3: Booking Creation & Update ───────────────────────────────────────

function BookingCreationView() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ScreenHeader
        title="Booking"
        module="Operations"
        destructiveAction={{ label: "Cancel Booking" }}
        secondaryActions={[
          { label: "History", icon: History },
          { label: "Print", icon: Printer },
          { label: "Send EDI", icon: Send },
        ]}
        primaryAction={{ label: "Confirm & Save", icon: Check }}
      />

      <div className="flex-1 overflow-auto bg-muted/10">
        <div className="p-4 space-y-4">
          {/* Schedule section */}
          <section className="bg-card border border-border rounded-sm">
            <div className="border-b border-border px-3 py-2 bg-muted/30 flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Calendar className="size-3" /> Schedule
              </span>
              <div className="flex items-center gap-1 text-[10px]">
                <button className="h-5 px-2 border border-border bg-background rounded">SCH Update</button>
                <button className="h-5 px-2 border border-border bg-background rounded">RF Update</button>
              </div>
            </div>
            <div className="p-3 grid grid-cols-4 gap-x-5 gap-y-1.5">
              <Field label="Booking No"><TinyInput placeholder="Auto" readOnly /></Field>
              <Field label="SHC Copy from"><TinyInput placeholder="—" /></Field>
              <Field label="MSC Request No"><TinyInput placeholder="—" /></Field>
              <Field label="Ref. BKG No"><TinyInput placeholder="—" /></Field>
              <Field label="Service Type"><TinySelect value="CY-CY" options={["CY-CFS", "CFS-CFS"]} /></Field>
              <Field label="Booking Status"><TinySelect value="CONFIRMED" options={["DRAFT", "CANCELLED"]} /></Field>
              <Field label="Booking Date"><TinyInput value="2026-05-11" /></Field>
              <Field label="LogIn To"><TinyInput value="VOS" readOnly /></Field>
              <Field label="Vessel"><TinyInput value="STAR PACIFIC" /></Field>
              <Field label="Voyage"><TinyInput value="0142W" /></Field>
              <Field label="POL"><TinyInput value="Port A" /></Field>
              <Field label="POD"><TinyInput value="Port B" /></Field>
              <Field label="ETD"><TinyInput value="2026-05-18" /></Field>
              <Field label="ETA"><TinyInput value="2026-06-04" /></Field>
              <Field label="Service Lane"><TinyInput value="Pacific Express" readOnly /></Field>
              <Field label="Final POD"><TinyInput placeholder="—" /></Field>
            </div>
          </section>

          {/* Customer */}
          <section className="bg-card border border-border rounded-sm">
            <div className="border-b border-border px-3 py-2 bg-muted/30 flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <User className="size-3" /> Customer
              </span>
            </div>
            <div className="p-3 grid grid-cols-3 gap-x-5 gap-y-1.5">
              <div className="space-y-1.5">
                <Field label="SVC Shipper"><TinyInput value="ACME PACIFIC LTD." /></Field>
                <Field label="Actual Shipper"><TinyInput placeholder="—" /></Field>
                <Field label="Forwarder"><TinyInput placeholder="—" /></Field>
                <Field label="Sales Person"><TinyInput value="J. HARPER" /></Field>
              </div>
              <div className="space-y-1.5">
                <Field label="Booking Contact"><TinyInput value="Ops Team" /></Field>
                <Field label="Telephone"><TinyInput value="+1-555-0100" /></Field>
                <Field label="Fax"><TinyInput placeholder="—" /></Field>
                <Field label="Email"><TinyInput value="ops@acme.example" /></Field>
              </div>
              <div className="space-y-1.5">
                <Field label="N/F Contact"><TinyInput placeholder="—" /></Field>
                <Field label="Telephone"><TinyInput placeholder="—" /></Field>
                <Field label="N/F Party"><TinyInput placeholder="—" /></Field>
                <Field label="Booking Count">
                  <div className="flex items-center gap-1">
                    <TinyInput value="3" className="w-12" readOnly />
                    <span className="text-[10px] text-muted-foreground">previous bookings</span>
                  </div>
                </Field>
              </div>
            </div>
          </section>

          {/* Container Quantity */}
          <section className="bg-card border border-border rounded-sm">
            <div className="border-b border-border px-3 py-2 bg-muted/30 flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Box className="size-3" /> Container Quantity
              </span>
              <div className="flex items-center gap-1 text-[10px]">
                <button className="h-5 px-2 border border-border bg-background rounded">Allocate</button>
                <button className="h-5 px-2 border border-border bg-background rounded">Pickup</button>
                <button className="h-5 px-2 border border-border bg-background rounded">+ Row</button>
              </div>
            </div>
            <div className="p-0">
              <table className="w-full text-[11px]">
                <thead className="bg-muted/60 text-foreground border-b border-border">
                  <tr>
                    {["Size", "Type", "Qty", "Pickup CY", "Reefer Type", "Temp", "Vent", "Humidity", "Remarks"].map((h) => (
                      <th key={h} className="px-2 py-1.5 text-left font-semibold border-r border-border last:border-0">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-numeric" style={{ fontFamily: "var(--font-numeric)" }}>
                  {[
                    { size: "20'", type: "GP", qty: "8", cy: "Yard A · CY-1", reefer: "—", temp: "—", vent: "—", humidity: "—", rmk: "—" },
                    { size: "40'", type: "HC", qty: "12", cy: "Yard A · CY-1", reefer: "—", temp: "—", vent: "—", humidity: "—", rmk: "Top stow" },
                    { size: "40'", type: "RH", qty: "2", cy: "Yard A · CY-3", reefer: "Frozen", temp: "-18 °C", vent: "0", humidity: "—", rmk: "Pre-trip OK" },
                  ].map((r, i) => (
                    <tr key={i} className={`border-b border-border last:border-0 hover:bg-muted/30 ${i % 2 === 1 ? "bg-muted/10" : ""}`}>
                      <td className="px-2 py-1.5 border-r border-border">{r.size}</td>
                      <td className="px-2 py-1.5 border-r border-border">{r.type}</td>
                      <td className="px-2 py-1.5 border-r border-border text-right">{r.qty}</td>
                      <td className="px-2 py-1.5 border-r border-border">{r.cy}</td>
                      <td className="px-2 py-1.5 border-r border-border">{r.reefer}</td>
                      <td className="px-2 py-1.5 border-r border-border text-right">{r.temp}</td>
                      <td className="px-2 py-1.5 border-r border-border text-right">{r.vent}</td>
                      <td className="px-2 py-1.5 border-r border-border text-right">{r.humidity}</td>
                      <td className="px-2 py-1.5 text-muted-foreground">{r.rmk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Cargo + Transportation side by side */}
          <div className="grid grid-cols-2 gap-4">
            <section className="bg-card border border-border rounded-sm">
              <div className="border-b border-border px-3 py-2 bg-muted/30">
                <span className="text-xs font-semibold text-foreground">Cargo</span>
              </div>
              <div className="p-3 space-y-1.5">
                <Field label="Commodity"><TinyInput value="ELECTRONICS" /></Field>
                <Field label="HS Code"><TinyInput value="8517.62.0090" /></Field>
                <Field label="Gross Weight">
                  <div className="flex items-center gap-1">
                    <TinyInput value="14,200" />
                    <TinySelect value="KGS" options={["LBS"]} className="w-16" />
                  </div>
                </Field>
                <Field label="Measurement">
                  <div className="flex items-center gap-1">
                    <TinyInput value="58.4" />
                    <TinySelect value="CBM" options={["CFT"]} className="w-16" />
                  </div>
                </Field>
                <Field label="Package">
                  <div className="flex items-center gap-1">
                    <TinyInput value="1,240" />
                    <TinySelect value="CTNS" options={["PLT", "PCS"]} className="w-16" />
                  </div>
                </Field>
                <Field label="DG"><TinySelect value="No" options={["Yes"]} /></Field>
                <Field label="Special INST Approved"><TinySelect value="Pending" options={["Yes", "No"]} /></Field>
              </div>
            </section>

            <section className="bg-card border border-border rounded-sm">
              <div className="border-b border-border px-3 py-2 bg-muted/30">
                <span className="text-xs font-semibold text-foreground">Transportation</span>
              </div>
              <div className="p-3 space-y-1.5">
                <Field label="Type of Carriage"><TinySelect value="CY-CY" /></Field>
                <Field label="Empty Pickup Date"><TinyInput value="2026-05-13" /></Field>
                <Field label="Empty Pickup Place"><TinyInput value="Port A · Terminal 1" /></Field>
                <Field label="Full Return Date"><TinyInput value="2026-05-16" /></Field>
                <Field label="Transport Mode"><TinySelect value="Truck" options={["Rail"]} /></Field>
                <Field label="Trucker Name"><TinyInput value="Island Transport" /></Field>
                <Field label="CFS Receiving Date"><TinyInput placeholder="—" /></Field>
                <Field label="Telephone"><TinyInput value="+1-555-0142" /></Field>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main scene ──────────────────────────────────────────────────────────────

export function LogisticsScene() {
  const [view, setView] = useState<ViewId>("bl");

  return (
    <div
      className="h-[860px] bg-background flex flex-col text-foreground border border-border rounded-lg overflow-hidden shadow-sm"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <GlobalHeader />
      <WindowTabs view={view} onChange={setView} />

      <div className="flex-1 overflow-hidden">
        {view === "agreement" && <AgreementView />}
        {view === "bl" && <BlCreationView />}
        {view === "booking" && <BookingCreationView />}
      </div>

      {/* Bottom status bar */}
      <div className="h-7 border-t border-border bg-card flex items-center px-4 text-[11px] text-muted-foreground gap-3 shrink-0">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-success" />
          <span className="text-foreground">Live</span>
        </span>
        <span className="text-border">|</span>
        <span>HQ · admin01</span>
        <div className="flex-1" />
        <span>v2.4.1</span>
      </div>
    </div>
  );
}
