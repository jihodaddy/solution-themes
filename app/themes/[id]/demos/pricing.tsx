"use client";

import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgePill } from "@/registry/components/badge-pill";
import { Check, Minus, Sparkles, ArrowRight } from "lucide-react";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: 19, annual: 16 },
    description: "For solo builders and small teams just getting started.",
    seats: "Up to 5 seats",
    cta: "Start free",
    ctaVariant: "outline" as const,
    features: [
      "Core platform",
      "Email support",
      "5 GB storage",
      "Basic analytics",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: { monthly: 59, annual: 49 },
    description: "Best for growing teams that need integrations and priority support.",
    seats: "Up to 50 seats",
    cta: "Start 14-day trial",
    ctaVariant: "default" as const,
    recommended: true,
    features: [
      "Everything in Starter",
      "Integrations (Slack, GitHub, Linear)",
      "Priority support",
      "100 GB storage",
      "Advanced analytics",
      "SLA 99.9%",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    description: "Custom terms, dedicated success, and the strictest compliance posture.",
    seats: "Unlimited seats",
    cta: "Contact sales",
    ctaVariant: "outline" as const,
    features: [
      "Everything in Growth",
      "Dedicated CSM",
      "Custom SLA",
      "Data residency (EU / US / APAC)",
      "SSO + SCIM provisioning",
      "Custom legal terms",
    ],
  },
];

type FeatureCell = boolean | string;

const COMPARISON_ROWS: { section: string; items: { label: string; starter: FeatureCell; growth: FeatureCell; enterprise: FeatureCell }[] }[] = [
  {
    section: "Platform",
    items: [
      { label: "Core workflows", starter: true, growth: true, enterprise: true },
      { label: "Integrations marketplace", starter: false, growth: true, enterprise: true },
      { label: "Custom workflows", starter: false, growth: false, enterprise: true },
    ],
  },
  {
    section: "Security",
    items: [
      { label: "2FA", starter: true, growth: true, enterprise: true },
      { label: "SSO (SAML / OIDC)", starter: false, growth: true, enterprise: true },
      { label: "SCIM provisioning", starter: false, growth: false, enterprise: true },
      { label: "Audit log retention", starter: "30 days", growth: "1 year", enterprise: "Custom" },
    ],
  },
  {
    section: "Support",
    items: [
      { label: "Channel", starter: "Email", growth: "Email + chat", enterprise: "Dedicated CSM" },
      { label: "SLA", starter: "Best effort", growth: "99.9%", enterprise: "Custom" },
      { label: "Onboarding", starter: "Self-serve", growth: "Guided", enterprise: "White-glove" },
    ],
  },
];

const FAQS = [
  {
    q: "Can I switch plans later?",
    a: "Yes. Upgrade or downgrade any time — your billing is prorated to the day.",
  },
  {
    q: "Do you offer non-profit or education discounts?",
    a: "30% off any plan for accredited non-profits and academic institutions. Contact us with proof of status.",
  },
  {
    q: "What payment methods do you support?",
    a: "Credit card and ACH on Starter / Growth. Wire transfer and invoicing (Net 30) on Enterprise.",
  },
  {
    q: "Can I host this on-premise?",
    a: "Enterprise plan only. We support deployments to your VPC on AWS, GCP, and Azure.",
  },
];

export function PricingScene() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="px-6 pt-16 pb-10 text-center max-w-3xl mx-auto">
        <BadgePill tone="primary">
          <Sparkles className="size-3 inline -mt-0.5 mr-1" />
          New pricing for 2026
        </BadgePill>
        <h1
          className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Pricing that scales with you, not against you.
        </h1>
        <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
          Pick the plan that fits today. Switch any time — we charge you only for what you use.
        </p>

        {/* Billing toggle */}
        <div className="mt-8 inline-flex items-center gap-1 p-1 rounded-full border border-border bg-card">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
              !annual ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-1.5 text-sm rounded-full transition-colors inline-flex items-center gap-2 ${
              annual ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Annual
            <span className={`text-[10px] tabular-nums px-1.5 py-0.5 rounded-full ${annual ? "bg-primary-foreground/20" : "bg-success/15 text-success"}`}>
              Save 16%
            </span>
          </button>
        </div>
      </section>

      {/* Plan cards */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {PLANS.map((plan) => {
            const isRec = !!plan.recommended;
            const price = plan.price === null
              ? null
              : annual ? plan.price.annual : plan.price.monthly;
            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col ${
                  isRec ? "ring-2 ring-primary border-primary" : ""
                }`}
              >
                {isRec && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <BadgePill tone="primary">Most popular</BadgePill>
                  </div>
                )}
                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-5 flex-1 flex flex-col">
                  <div>
                    {price === null ? (
                      <div className="text-3xl font-semibold tracking-tight">Custom</div>
                    ) : (
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className="text-4xl font-semibold tracking-tight tabular-nums"
                          style={{ fontFamily: "var(--font-numeric)" }}
                        >
                          ${price}
                        </span>
                        <span className="text-sm text-muted-foreground">/ user / month</span>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {annual && price !== null ? "Billed annually · " : ""}{plan.seats}
                    </p>
                  </div>

                  <Button variant={plan.ctaVariant} className="w-full">
                    {plan.cta}
                    <ArrowRight className="size-4" />
                  </Button>

                  <Separator />

                  <ul className="space-y-2 text-sm flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="size-4 text-success shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Comparison table */}
      <section className="px-6 py-16 bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-2xl font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Compare every feature
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Detailed breakdown so you can pick the right plan with confidence.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Feature</th>
                  {PLANS.map((p) => (
                    <th key={p.id} className="text-center px-4 py-3 font-medium">
                      {p.name}
                      {p.recommended && <span className="ml-1 text-xs text-primary">★</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((section) => (
                  <Fragment key={section.section}>
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold bg-muted/30 border-y border-border"
                      >
                        {section.section}
                      </td>
                    </tr>
                    {section.items.map((row) => (
                      <tr key={row.label} className="border-b border-border last:border-0">
                        <td className="px-4 py-2.5">{row.label}</td>
                        {(["starter", "growth", "enterprise"] as const).map((p) => {
                          const v = row[p];
                          return (
                            <td key={p} className="px-4 py-2.5 text-center text-sm">
                              {typeof v === "boolean" ? (
                                v ? (
                                  <Check className="size-4 text-success inline" />
                                ) : (
                                  <Minus className="size-4 text-muted-foreground/50 inline" />
                                )
                              ) : (
                                <span className="text-muted-foreground">{v}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <h2
          className="text-2xl font-semibold tracking-tight mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Frequently asked
        </h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group border border-border rounded-lg bg-card">
              <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between font-medium text-sm">
                {f.q}
                <span className="text-muted-foreground group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
