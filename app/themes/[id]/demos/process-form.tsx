"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BadgePill } from "@/registry/components/badge-pill";
import { StatusDot } from "@/registry/components/status-dot";
import { StepIndicator } from "@/registry/components/step-indicator";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  CircleDot,
  FileText,
  Briefcase,
  Users,
  Shield,
  DollarSign,
  Sparkles,
  HelpCircle,
  Building2,
  Plus,
  X,
} from "lucide-react";

// ─── Step definitions ────────────────────────────────────────────────────────

type StepId = "customer" | "contract" | "team" | "compliance" | "billing" | "review";

type Step = {
  id: StepId;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const STEPS: Step[] = [
  { id: "customer", title: "Customer", description: "Account & primary contact", icon: Building2 },
  { id: "contract", title: "Contract", description: "Terms & service window", icon: FileText },
  { id: "team", title: "Team", description: "Stakeholders & access", icon: Users },
  { id: "compliance", title: "Compliance", description: "Data residency & DPA", icon: Shield },
  { id: "billing", title: "Billing", description: "Payment & invoicing", icon: DollarSign },
  { id: "review", title: "Review", description: "Confirm & submit", icon: Sparkles },
];

// ─── Stakeholders sample ─────────────────────────────────────────────────────

const STAKEHOLDER_POOL = [
  { id: "u1", name: "Alex Morgan", role: "Account Exec", avatar: "AM", tone: "primary" as const },
  { id: "u2", name: "Priya Shah", role: "Solutions Eng", avatar: "PS", tone: "success" as const },
  { id: "u3", name: "Jordan Kim", role: "Customer Success", avatar: "JK", tone: "warning" as const },
  { id: "u4", name: "Sam Reyes", role: "Implementation", avatar: "SR", tone: "neutral" as const },
];

const PLAN_OPTIONS = [
  { id: "starter", label: "Starter", price: "$199/mo", seats: "10 seats", features: ["Core platform", "Email support"] },
  { id: "growth", label: "Growth", price: "$599/mo", seats: "50 seats", features: ["Core + Integrations", "Priority support", "SLA 99.9%"], recommended: true },
  { id: "enterprise", label: "Enterprise", price: "Custom", seats: "Unlimited", features: ["Everything in Growth", "Dedicated CSM", "Custom SLA", "Data residency"] },
];

// (StepIndicator now lives in registry/components/step-indicator.tsx)

// ─── Side panel: contextual content ──────────────────────────────────────────

function SidePanel({ stepId, selectedPlan, selectedTeam }: { stepId: StepId; selectedPlan: string; selectedTeam: string[] }) {
  if (stepId === "customer") {
    return (
      <SidePanelCard title="Why we ask" icon={HelpCircle}>
        <p>
          Customer details create the root tenant. The primary contact will receive the welcome email
          and become the initial account admin.
        </p>
        <Separator className="my-3" />
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Tip</p>
          <p>Use the legal entity name (not a DBA) — it appears on contracts and invoices.</p>
        </div>
      </SidePanelCard>
    );
  }

  if (stepId === "contract") {
    return (
      <SidePanelCard title="Choose a plan" icon={Sparkles}>
        <div className="space-y-2">
          {PLAN_OPTIONS.map((p) => (
            <label
              key={p.id}
              className={`block rounded-lg border p-3 cursor-pointer transition-colors ${
                selectedPlan === p.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:bg-muted/40"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <input
                  type="radio"
                  name="plan"
                  defaultChecked={selectedPlan === p.id}
                  className="mt-0.5 accent-primary shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium">{p.label}</span>
                    {p.recommended && <BadgePill tone="primary">Recommended</BadgePill>}
                  </div>
                  <div
                    className="text-xs text-muted-foreground tabular-nums mt-0.5"
                    style={{ fontFamily: "var(--font-numeric)" }}
                  >
                    {p.price} · {p.seats}
                  </div>
                  <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5">
                        <Check className="size-3 text-success shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </label>
          ))}
        </div>
      </SidePanelCard>
    );
  }

  if (stepId === "team") {
    return (
      <SidePanelCard title="Available team members" icon={Users}>
        <p className="text-xs text-muted-foreground mb-3">
          Click to add. Selected: <span className="font-medium text-foreground">{selectedTeam.length}</span>
        </p>
        <div className="space-y-1.5">
          {STAKEHOLDER_POOL.map((m) => {
            const selected = selectedTeam.includes(m.id);
            return (
              <div
                key={m.id}
                className={`flex items-center gap-2 p-2 rounded-md ${
                  selected ? "bg-primary/10" : "hover:bg-muted/40"
                }`}
              >
                <div className="size-7 rounded-full bg-muted grid place-items-center text-[10px] font-semibold">
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
                {selected ? (
                  <Check className="size-4 text-primary" />
                ) : (
                  <Plus className="size-4 text-muted-foreground" />
                )}
              </div>
            );
          })}
        </div>
      </SidePanelCard>
    );
  }

  if (stepId === "compliance") {
    return (
      <SidePanelCard title="Compliance presets" icon={Shield}>
        <p className="text-xs text-muted-foreground mb-3">
          Apply common configurations for your jurisdiction.
        </p>
        <div className="space-y-2">
          {[
            { label: "EU / GDPR", desc: "Frankfurt residency · DPA included" },
            { label: "US / HIPAA", desc: "Virginia residency · BAA available" },
            { label: "APAC", desc: "Sydney residency · standard terms" },
            { label: "Custom", desc: "Configure manually below" },
          ].map((p) => (
            <button
              key={p.label}
              className="w-full text-left p-2.5 rounded-md border border-border hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <div className="text-sm font-medium">{p.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{p.desc}</div>
            </button>
          ))}
        </div>
      </SidePanelCard>
    );
  }

  if (stepId === "billing") {
    return (
      <SidePanelCard title="Order summary" icon={DollarSign}>
        <div className="space-y-1.5 text-sm">
          <SummaryRow label="Plan" value={PLAN_OPTIONS.find((p) => p.id === selectedPlan)?.label ?? "—"} />
          <SummaryRow label="Seats" value={PLAN_OPTIONS.find((p) => p.id === selectedPlan)?.seats ?? "—"} />
          <SummaryRow label="Term" value="12 months" />
          <SummaryRow label="Start" value="2026-06-01" />
          <Separator className="my-2" />
          <SummaryRow label="Subtotal" value="$7,188" muted />
          <SummaryRow label="Tax (estimate)" value="$575" muted />
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total billed today</span>
            <span className="tabular-nums" style={{ fontFamily: "var(--font-numeric)" }}>
              $7,763
            </span>
          </div>
        </div>
      </SidePanelCard>
    );
  }

  return (
    <SidePanelCard title="Ready to submit" icon={Check}>
      <p className="text-sm">
        Review the entire submission on the left. Once submitted, the account is provisioned within
        2 minutes and stakeholders receive their invites.
      </p>
      <div className="mt-3 space-y-2">
        {STEPS.slice(0, -1).map((s) => (
          <div key={s.id} className="flex items-center gap-2 text-xs">
            <StatusDot tone="success" />
            <span className="flex-1">{s.title}</span>
            <span className="text-muted-foreground">Complete</span>
          </div>
        ))}
      </div>
    </SidePanelCard>
  );
}

function SidePanelCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Icon className="size-4 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground leading-relaxed">{children}</CardContent>
    </Card>
  );
}

function SummaryRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className={`flex justify-between ${muted ? "text-muted-foreground" : ""}`}>
      <span>{label}</span>
      <span className="tabular-nums" style={{ fontFamily: "var(--font-numeric)" }}>{value}</span>
    </div>
  );
}

// ─── Step bodies ─────────────────────────────────────────────────────────────

function CustomerStep() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Customer details</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Tell us about the organization that will own this account.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5 col-span-2">
          <Label htmlFor="company">Company name *</Label>
          <Input id="company" defaultValue="Northwind Trading Co." />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="industry">Industry</Label>
          <Select defaultValue="logistics">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="logistics">Logistics & Supply Chain</SelectItem>
              <SelectItem value="finance">Financial Services</SelectItem>
              <SelectItem value="health">Healthcare</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="size">Company size</Label>
          <Select defaultValue="medium">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">1–50</SelectItem>
              <SelectItem value="medium">51–500</SelectItem>
              <SelectItem value="large">501–5,000</SelectItem>
              <SelectItem value="enterprise">5,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-semibold">Primary contact</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Becomes the initial account admin.</p>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">First name *</Label>
            <Input id="firstName" defaultValue="Morgan" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName">Last name *</Label>
            <Input id="lastName" defaultValue="Reyes" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email *</Label>
            <Input id="email" type="email" defaultValue="morgan@northwind.example" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" defaultValue="+1 555 0144" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContractStep({ selectedPlan, onPlanChange }: { selectedPlan: string; onPlanChange: (id: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Contract & service window</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Pick a plan on the right, then set the term details below.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5 col-span-2">
          <Label>Selected plan</Label>
          <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/30">
            <CircleDot className="size-4 text-primary" />
            <span className="text-sm font-medium">{PLAN_OPTIONS.find((p) => p.id === selectedPlan)?.label}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{PLAN_OPTIONS.find((p) => p.id === selectedPlan)?.price}</span>
            <div className="flex-1" />
            <button
              onClick={() => onPlanChange(selectedPlan === "growth" ? "starter" : "growth")}
              className="text-xs text-primary hover:underline"
            >
              Switch plan
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Term</Label>
          <Select defaultValue="12">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12 months</SelectItem>
              <SelectItem value="24">24 months (10% off)</SelectItem>
              <SelectItem value="36">36 months (15% off)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Seats</Label>
          <Input type="number" defaultValue="50" min={1} />
        </div>
        <div className="space-y-1.5">
          <Label>Start date</Label>
          <Input type="date" defaultValue="2026-06-01" />
        </div>
        <div className="space-y-1.5">
          <Label>Auto-renewal</Label>
          <Select defaultValue="yes">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes, renew automatically</SelectItem>
              <SelectItem value="no">No, contact me 60 days before</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">Additional notes</Label>
        <textarea
          id="notes"
          rows={3}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          placeholder="Custom terms, special clauses, integration notes…"
        />
      </div>
    </div>
  );
}

function TeamStep({ selected, onToggle }: { selected: string[]; onToggle: (id: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Stakeholders & access</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Pick the internal team members assigned to this account.
        </p>
      </div>

      <div>
        <Label>Assigned team</Label>
        <div className="mt-2 flex flex-wrap gap-2 min-h-[40px] p-2 rounded-md border border-border bg-muted/20">
          {selected.length === 0 ? (
            <span className="text-sm text-muted-foreground self-center px-2">
              No one assigned yet. Pick from the panel on the right.
            </span>
          ) : (
            selected.map((id) => {
              const member = STAKEHOLDER_POOL.find((m) => m.id === id);
              if (!member) return null;
              return (
                <div
                  key={id}
                  className="flex items-center gap-2 px-2 py-1 rounded-full bg-card border border-border"
                >
                  <div className="size-5 rounded-full bg-primary/15 grid place-items-center text-[9px] font-semibold text-primary">
                    {member.avatar}
                  </div>
                  <span className="text-xs font-medium">{member.name}</span>
                  <button
                    onClick={() => onToggle(id)}
                    className="size-4 grid place-items-center rounded hover:bg-muted text-muted-foreground"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Primary owner</Label>
          <Select defaultValue="u1">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STAKEHOLDER_POOL.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name} — {m.role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Notification policy</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All assignees</SelectItem>
              <SelectItem value="owner">Primary owner only</SelectItem>
              <SelectItem value="none">No notifications</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function ComplianceStep() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Data residency & compliance</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Configure where data is stored and which agreements apply.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Data residency region *</Label>
          <Select defaultValue="eu-fra">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us-iad">US East (Virginia)</SelectItem>
              <SelectItem value="us-pdx">US West (Oregon)</SelectItem>
              <SelectItem value="eu-fra">EU (Frankfurt)</SelectItem>
              <SelectItem value="ap-syd">APAC (Sydney)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Encryption</Label>
          <Select defaultValue="aes256">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aes256">AES-256 (default)</SelectItem>
              <SelectItem value="cmk">Customer-managed keys (KMS)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>Agreements</Label>
        {[
          { label: "Master Services Agreement", required: true, checked: true },
          { label: "Data Processing Addendum (DPA)", required: true, checked: true },
          { label: "Business Associate Agreement (BAA)", required: false, checked: false },
          { label: "Standard Contractual Clauses (SCCs)", required: false, checked: true },
        ].map((a) => (
          <label
            key={a.label}
            className="flex items-center gap-3 p-2.5 rounded-md border border-border hover:bg-muted/40 cursor-pointer"
          >
            <input
              type="checkbox"
              defaultChecked={a.checked}
              disabled={a.required}
              className="accent-primary size-4 shrink-0"
            />
            <span className="flex-1 text-sm">{a.label}</span>
            {a.required && <BadgePill tone="warning">Required</BadgePill>}
          </label>
        ))}
      </div>
    </div>
  );
}

function BillingStep() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Billing & invoicing</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Where invoices are sent and how payment is processed.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Payment method</Label>
          <Select defaultValue="invoice">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="invoice">Invoice (Net 30)</SelectItem>
              <SelectItem value="card">Credit card</SelectItem>
              <SelectItem value="ach">ACH transfer</SelectItem>
              <SelectItem value="wire">International wire</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Billing cycle</Label>
          <Select defaultValue="annual">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="annual">Annual (one invoice)</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 col-span-2">
          <Label>Billing contact email *</Label>
          <Input type="email" defaultValue="ap@northwind.example" />
        </div>
        <div className="space-y-1.5 col-span-2">
          <Label>Billing address</Label>
          <textarea
            rows={3}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            defaultValue={"Northwind Trading Co.\n742 Evergreen Terrace\nSpringfield, OH 44101"}
          />
        </div>
        <div className="space-y-1.5 col-span-2">
          <Label>PO number (optional)</Label>
          <Input placeholder="e.g. PO-2026-NW-042" />
        </div>
      </div>
    </div>
  );
}

function ReviewStep() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Review & submit</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Confirm everything is correct. Submitting provisions the account immediately.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Customer", value: "Northwind Trading Co.", sub: "Logistics · 51–500 employees" },
          { label: "Primary contact", value: "Morgan Reyes", sub: "morgan@northwind.example" },
          { label: "Plan", value: "Growth — $599/mo", sub: "50 seats · 12 months · auto-renew" },
          { label: "Team", value: "3 assignees", sub: "Owner: Alex Morgan" },
          { label: "Compliance", value: "EU / Frankfurt", sub: "MSA, DPA, SCCs signed" },
          { label: "Billing", value: "Net 30 · Annual", sub: "ap@northwind.example" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className="text-sm font-medium mt-1">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 flex items-start gap-3">
        <Briefcase className="size-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Account will be provisioned within 2 minutes</p>
          <p className="text-xs text-muted-foreground mt-1">
            Stakeholders receive invitation emails. First invoice issues on the start date.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main scene ──────────────────────────────────────────────────────────────

export function ProcessFormScene() {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState<Set<number>>(new Set([0]));
  const [plan, setPlan] = useState("growth");
  const [team, setTeam] = useState<string[]>(["u1", "u2", "u3"]);

  const currentStep = STEPS[step];
  const isLast = step === STEPS.length - 1;

  function next() {
    setCompleted((prev) => new Set(prev).add(step));
    if (!isLast) setStep(step + 1);
  }

  function prev() {
    if (step > 0) setStep(step - 1);
  }

  function jump(i: number) {
    setStep(i);
  }

  function toggleTeam(id: string) {
    setTeam((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="max-w-7xl mx-auto px-8 pt-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">New customer onboarding</p>
            <h1 className="text-2xl font-semibold tracking-tight mt-0.5">Provision an account</h1>
          </div>
          <Button variant="ghost" size="sm">
            Save & exit
          </Button>
        </div>
      </div>

      <div className="mt-6 border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <StepIndicator steps={STEPS} current={step} completed={completed} onJump={jump} />
        </div>
      </div>

      {/* Scrollable body with extra bottom padding so content isn't hidden under sticky footer */}
      <div className="max-w-7xl mx-auto px-8 py-10 pb-32 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {currentStep.id === "customer" && <CustomerStep />}
          {currentStep.id === "contract" && <ContractStep selectedPlan={plan} onPlanChange={setPlan} />}
          {currentStep.id === "team" && <TeamStep selected={team} onToggle={toggleTeam} />}
          {currentStep.id === "compliance" && <ComplianceStep />}
          {currentStep.id === "billing" && <BillingStep />}
          {currentStep.id === "review" && <ReviewStep />}
        </div>

        <div className="space-y-4">
          <SidePanel stepId={currentStep.id} selectedPlan={plan} selectedTeam={team} />
        </div>
      </div>

      {/* Sticky navigation footer — pinned to viewport bottom while the scene is in view */}
      <div className="sticky bottom-0 z-10 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={prev}
            disabled={step === 0}
          >
            <ChevronLeft className="size-4" />
            Back
          </Button>

          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
              Step {step + 1} of {STEPS.length} · <span className="text-foreground font-medium">{currentStep.title}</span>
            </span>
          </div>

          <Button onClick={next}>
            {isLast ? "Submit & provision" : "Continue"}
            {!isLast && <ChevronRight className="size-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
