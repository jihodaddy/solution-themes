"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/registry/components/empty-state";
import { BadgePill } from "@/registry/components/badge-pill";
import { Button } from "@/components/ui/button";
import {
  Inbox,
  Search,
  Users,
  AlertTriangle,
  CloudOff,
  ServerCrash,
  FileQuestion,
  PackageOpen,
  ShieldAlert,
  Upload,
  RefreshCw,
  Home,
  ArrowLeft,
  Plus,
  Mail,
} from "lucide-react";

export function EmptyStatesScene() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Pattern catalog</p>
          <h1
            className="text-2xl font-semibold tracking-tight mt-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Empty &amp; error states
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            A complete catalog of the moments when a screen has nothing to show — from happy &quot;first
            visit&quot; states to broken pipes. Each uses the registry <code className="text-xs" style={{ fontFamily: "var(--font-mono)" }}>EmptyState</code>{" "}
            component with a different icon, tone, and CTA shape.
          </p>
        </div>
      </header>

      <main className="px-8 py-10 max-w-5xl mx-auto space-y-12">
        {/* Group 1: Happy empty (first encounter) */}
        <Group
          title="First encounter"
          hint="No data yet — invite the user to take action."
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Inbox className="size-4 text-primary" /> Inbox
                <BadgePill tone="neutral">0 messages</BadgePill>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Inbox}
                title="You're all caught up"
                description="No new messages. Come back later or compose a new thread to get started."
                action={{ label: "Compose", icon: Plus }}
                secondaryAction={{ label: "Browse archive" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="size-4 text-primary" /> Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Users}
                title="No teammates yet"
                description="Invite people from your domain. They get a magic link by email — no setup required."
                action={{ label: "Invite by email", icon: Mail }}
              />
            </CardContent>
          </Card>
        </Group>

        {/* Group 2: Search / filter empty */}
        <Group
          title="Search / filter empty"
          hint="Data exists, but the current filters return nothing."
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Search className="size-4 text-primary" /> Search results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Search}
                title="No matches for &lsquo;refund&rsquo;"
                description="Try removing a filter, broadening the date range, or searching by ticket ID instead."
                action={{ label: "Clear all filters" }}
                secondaryAction={{ label: "Search archive" }}
                variant="subtle"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <PackageOpen className="size-4 text-muted-foreground" /> Catalog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={PackageOpen}
                title="Nothing in this category"
                description="The catalog is empty for &lsquo;reefer containers&rsquo;. Switch category or check back later."
                action={{ label: "Switch category" }}
              />
            </CardContent>
          </Card>
        </Group>

        {/* Group 3: Loading / disconnected / errors */}
        <Group
          title="Errors &amp; disconnections"
          hint="Something went wrong — show a recovery action."
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <CloudOff className="size-4 text-warning" /> Connectivity
                <BadgePill tone="warning">offline</BadgePill>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={CloudOff}
                title="You appear to be offline"
                description="We&apos;ll keep retrying every 10 seconds. Your unsaved work is queued locally."
                action={{ label: "Retry now", icon: RefreshCw }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <ServerCrash className="size-4 text-destructive" /> System error
                <BadgePill tone="destructive">500</BadgePill>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={ServerCrash}
                title="Something went wrong on our end"
                description="A team member has been notified. Reference ID: 4f3a-9c12. Sorry about that."
                action={{ label: "Reload page", icon: RefreshCw }}
                secondaryAction={{ label: "Contact support" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <ShieldAlert className="size-4 text-destructive" /> Access
                <BadgePill tone="destructive">403</BadgePill>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={ShieldAlert}
                title="You don&apos;t have access to this resource"
                description="Ask a workspace admin to grant you permission, or switch to a workspace you have access to."
                action={{ label: "Request access" }}
                secondaryAction={{ label: "Switch workspace" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="size-4 text-warning" /> Validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={AlertTriangle}
                title="3 fields need your attention"
                description="Required fields are highlighted above. Fix them and try saving again."
                action={{ label: "Jump to first error" }}
                variant="subtle"
              />
            </CardContent>
          </Card>
        </Group>

        {/* Group 4: Full-page 404 */}
        <Group title="Full-page" hint="Standalone routes — 404, 500, maintenance.">
          <Card className="lg:col-span-2">
            <CardContent className="py-16">
              <div className="max-w-md mx-auto text-center">
                <div className="size-20 rounded-full bg-muted grid place-items-center mx-auto text-muted-foreground">
                  <FileQuestion className="size-10" />
                </div>
                <p
                  className="mt-6 text-6xl font-semibold tracking-tight tabular-nums"
                  style={{ fontFamily: "var(--font-numeric)" }}
                >
                  404
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">This page doesn&apos;t exist</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  The link may have moved, expired, or never been written down. Try one of these
                  instead.
                </p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <Button>
                    <Home className="size-4" />
                    Back to home
                  </Button>
                  <Button variant="outline">
                    <ArrowLeft className="size-4" />
                    Last page
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Group>

        {/* Group 5: Upload / drop zones */}
        <Group title="Upload zones" hint="Drag-and-drop empty states.">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Upload}
                title="Drop files here"
                description="Or click to browse — accepts PDF, PNG, JPG up to 10 MB."
                action={{ label: "Browse files" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">CSV import</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Upload}
                title="Start your import"
                description="Upload a CSV with columns: id, email, role. We&apos;ll preview before applying."
                action={{ label: "Upload CSV" }}
                secondaryAction={{ label: "Download template" }}
              />
            </CardContent>
          </Card>
        </Group>
      </main>
    </div>
  );
}

function Group({
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
        <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">{title}</h2>
        {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{children}</div>
    </section>
  );
}
