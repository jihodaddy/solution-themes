"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BadgePill } from "@/registry/components/badge-pill";
import { Field } from "@/registry/components/field";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Globe,
  Code2,
  ShieldCheck,
  Sparkles,
  Building2,
} from "lucide-react";

export function AuthScene() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground grid lg:grid-cols-[1fr_minmax(420px,520px)]">
      {/* Left brand panel — only on lg+ */}
      <aside className="hidden lg:flex flex-col justify-between p-12 bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-md bg-primary-foreground/15 grid place-items-center">
            <Sparkles className="size-5" />
          </div>
          <span className="text-base font-semibold tracking-tight">Acme Suite</span>
        </div>

        <div className="space-y-6 max-w-md">
          <h1
            className="text-4xl font-semibold tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Welcome back. <br />
            Pick up where you left off.
          </h1>
          <p className="text-sm opacity-85 leading-relaxed">
            Operations dashboards, customer pipelines, and onboarding flows — all wired to the same
            account, the same audit log, and the same compliance posture.
          </p>
          <ul className="space-y-2.5 text-sm opacity-90">
            {[
              { icon: ShieldCheck, label: "SOC 2 Type II — audited annually" },
              { icon: Building2, label: "EU / US data residency on Pro plan" },
              { icon: Sparkles, label: "5-minute setup, no credit card" },
            ].map((row) => (
              <li key={row.label} className="flex items-center gap-2.5">
                <row.icon className="size-4 opacity-80 shrink-0" />
                {row.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xs opacity-70">© 2026 Acme — All rights reserved</div>
      </aside>

      {/* Right form column */}
      <main className="flex flex-col">
        <header className="flex items-center justify-between px-8 py-5">
          <div className="lg:hidden flex items-center gap-2">
            <div className="size-7 rounded bg-primary/15 text-primary grid place-items-center">
              <Sparkles className="size-4" />
            </div>
            <span className="font-semibold tracking-tight">Acme Suite</span>
          </div>
          <span className="text-xs text-muted-foreground ml-auto">
            {tab === "signin" ? "Don't have an account?" : "Already have one?"}{" "}
            <button
              onClick={() => setTab(tab === "signin" ? "signup" : "signin")}
              className="text-primary hover:underline font-medium"
            >
              {tab === "signin" ? "Sign up" : "Sign in"}
            </button>
          </span>
        </header>

        <div className="flex-1 flex items-center justify-center px-8 pb-12">
          <div className="w-full max-w-sm space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {tab === "signin" ? "Sign in to your account" : "Create your account"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1.5">
                {tab === "signin"
                  ? "Enter your credentials to access your workspace."
                  : "Free trial · no credit card required · 14 days."}
              </p>
            </div>

            {/* OAuth */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-10">
                <Globe className="size-4" /> Google
              </Button>
              <Button variant="outline" className="h-10">
                <Code2 className="size-4" /> GitHub
              </Button>
            </div>

            <div className="relative">
              <Separator />
              <span className="absolute inset-0 -top-2 flex justify-center">
                <span className="bg-background px-2 text-xs text-muted-foreground">or with email</span>
              </span>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {tab === "signup" && (
                <Field label="Full name" required htmlFor="name">
                  <Input id="name" placeholder="Morgan Reyes" className="h-10" />
                </Field>
              )}

              <Field label="Work email" required htmlFor="email">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="h-10 pl-9"
                    defaultValue={tab === "signin" ? "morgan@northwind.example" : ""}
                  />
                </div>
              </Field>

              <Field
                label={
                  <span className="flex items-center justify-between w-full">
                    <span>Password</span>
                    {tab === "signin" && (
                      <a href="#" className="text-xs text-primary hover:underline font-normal">
                        Forgot?
                      </a>
                    )}
                  </span>
                }
                required
                htmlFor="password"
                description={tab === "signup" ? "Use at least 12 characters with a number and a symbol." : undefined}
              >
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-10 pl-9 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 size-7 grid place-items-center text-muted-foreground hover:text-foreground rounded"
                    aria-label="Toggle password visibility"
                  >
                    {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </Field>

              {tab === "signin" && (
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" className="accent-primary size-4" defaultChecked />
                  Keep me signed in on this device
                </label>
              )}

              {tab === "signup" && (
                <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="accent-primary size-3.5 mt-0.5" />
                  I agree to the{" "}
                  <a className="text-primary hover:underline" href="#">Terms</a> and{" "}
                  <a className="text-primary hover:underline" href="#">Privacy Policy</a>.
                </label>
              )}

              <Button type="submit" className="w-full h-10">
                {tab === "signin" ? "Sign in" : "Create account"}
              </Button>

              {tab === "signup" && (
                <div className="flex items-center justify-center gap-2 pt-1">
                  <BadgePill tone="success">SOC 2</BadgePill>
                  <BadgePill tone="primary">GDPR ready</BadgePill>
                  <BadgePill>SSO available</BadgePill>
                </div>
              )}
            </form>
          </div>
        </div>

        <footer className="px-8 py-4 border-t border-border text-[11px] text-muted-foreground flex items-center justify-between">
          <span>Need help? hello@acme.example</span>
          <div className="flex items-center gap-3">
            <a className="hover:text-foreground" href="#">Terms</a>
            <a className="hover:text-foreground" href="#">Privacy</a>
            <a className="hover:text-foreground" href="#">Status</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
