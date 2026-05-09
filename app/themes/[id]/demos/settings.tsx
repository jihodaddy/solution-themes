"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BadgePill } from "@/registry/components/badge-pill";
import {
  User,
  Bell,
  Lock,
  Shield,
  Globe,
  LogOut,
  Settings,
  Search,
  Check,
} from "lucide-react";

// ─── Inline Switch component ────────────────────────────────────────────────

function SwitchToggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-muted"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
          checked ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

// ─── Nav items ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Profile", icon: User },
  { label: "Notifications", icon: Bell },
  { label: "Security", icon: Lock },
  { label: "Privacy", icon: Shield },
  { label: "Language", icon: Globe },
  { label: "Sign out", icon: LogOut },
];

// ─── Notification row ────────────────────────────────────────────────────────

function NotifRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <SwitchToggle checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

// ─── Days of week ─────────────────────────────────────────────────────────────

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── Main component ──────────────────────────────────────────────────────────

export function SettingsScene() {
  const [tab, setTab] = useState("profile");

  // Profile form state
  const [firstName, setFirstName] = useState("Jordan");
  const [lastName, setLastName] = useState("Harper");
  const [displayName, setDisplayName] = useState("jordan.harper");
  const [email] = useState("jordan.harper@acme.io");
  const [bio, setBio] = useState(
    "Product designer at Acme. Focused on design systems and component-driven development. Previously at Meridian and Lightpath."
  );

  // Email notification toggles
  const [emailToggles, setEmailToggles] = useState({
    productUpdates: true,
    securityAlerts: true,
    billingReceipts: true,
    marketing: false,
  });

  // Push notification toggles
  const [pushToggles, setPushToggles] = useState({
    newMentions: true,
    directMessages: true,
    taskAssigned: true,
    dailyDigest: false,
  });

  // Notification frequency
  const [frequency, setFrequency] = useState<"realtime" | "hourly" | "daily">("realtime");

  // Quiet hours
  const [quietHours, setQuietHours] = useState(true);
  const [quietFrom, setQuietFrom] = useState("22:00");
  const [quietTo, setQuietTo] = useState("07:00");
  const [quietDays, setQuietDays] = useState({
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: false,
    Sun: false,
  });

  const bioMax = 280;

  function toggleDay(day: string) {
    setQuietDays((prev) => ({ ...prev, [day]: !prev[day as keyof typeof prev] }));
  }

  const HOUR_OPTIONS = [
    "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground">
      {/* Top app bar */}
      <header className="h-14 border-b border-border flex items-center px-4 gap-3 shrink-0">
        <span className="text-base font-semibold tracking-tight w-44 shrink-0 flex items-center gap-1.5">
          <Settings className="size-4" />
          Account
        </span>
        <div className="flex-1 flex justify-center">
          <div className="relative w-80">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              className="w-full h-8 pl-8 pr-3 text-sm border border-border rounded-md bg-muted placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Search settings…"
            />
          </div>
        </div>
        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground">
          <Bell className="size-4" />
        </button>
        <div className="size-8 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
          JH
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 border-r border-border shrink-0 flex flex-col overflow-y-auto">
          <nav className="p-3 space-y-0.5">
            {NAV_ITEMS.map((item, i) => {
              const Icon = item.icon;
              const isActive =
                (i === 0 && tab === "profile") || (i === 1 && tab === "notifications");
              return (
                <button
                  key={item.label}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center gap-2.5 transition-colors ${
                    isActive
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => {
                    if (i === 0) setTab("profile");
                    if (i === 1) setTab("notifications");
                  }}
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
          <Tabs defaultValue="profile" value={tab} onValueChange={setTab} className="h-full">
            <div className="border-b border-border px-6 pt-4">
              <TabsList variant="line">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
            </div>

            {/* ─── View A: Profile ──────────────────────────────────── */}
            <TabsContent value="profile">
              <div className="px-6 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Left column — main form */}
                  <div className="lg:col-span-3 space-y-6">
                    <div>
                      <h2 className="text-base font-semibold tracking-tight">Personal information</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">Update your name, avatar, and bio.</p>
                    </div>

                    {/* Avatar row */}
                    <div className="flex items-center gap-4">
                      <div className="size-16 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xl font-semibold shrink-0">
                        JH
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Change avatar</Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>

                    {/* Name fields — 2-column grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Display name */}
                    <div className="space-y-1.5">
                      <Label htmlFor="displayName">Display name</Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="email">Email</Label>
                        <BadgePill tone="success">verified</BadgePill>
                      </div>
                      <Input id="email" type="email" value={email} readOnly className="bg-muted" />
                    </div>

                    {/* Bio */}
                    <div className="space-y-1.5">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value.slice(0, bioMax))}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                        placeholder="Tell your team a bit about yourself…"
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {bio.length}/{bioMax} chars
                      </p>
                    </div>

                    <Separator />

                    {/* Action row */}
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">Cancel</Button>
                      <Button size="sm">Save changes</Button>
                    </div>
                  </div>

                  {/* Right column — sidebar cards */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Account status card */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Account status</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                          <BadgePill tone="primary">Pro plan</BadgePill>
                          <span className="text-xs text-muted-foreground">Member since Jan 2025</span>
                        </div>
                        <div className="space-y-3">
                          {/* Storage */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Storage</span>
                              <span className="tabular-nums">12.4 / 50 GB</span>
                            </div>
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "24.8%" }} />
                            </div>
                          </div>
                          {/* API calls */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">API calls</span>
                              <span className="tabular-nums">8,420 / 100k</span>
                            </div>
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "8.4%" }} />
                            </div>
                          </div>
                          {/* Team members */}
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Team members</span>
                            <span className="tabular-nums">4 / 10</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Linked accounts card */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Linked accounts</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {[
                          { name: "Google", linked: true },
                          { name: "GitHub", linked: true },
                          { name: "Slack", linked: false },
                        ].map((acct) => (
                          <div key={acct.name} className="flex items-center justify-between">
                            <span className="text-sm">{acct.name}</span>
                            {acct.linked ? (
                              <span className="flex items-center gap-1 text-xs text-success">
                                <Check className="size-3.5" />
                                Connected
                              </span>
                            ) : (
                              <Button variant="outline" size="sm" className="h-6 text-xs px-2">
                                Connect
                              </Button>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ─── View B: Notifications ────────────────────────────── */}
            <TabsContent value="notifications">
              <div className="px-6 py-6 max-w-2xl space-y-6">
                {/* Email notifications card */}
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm">Email</CardTitle>
                  </CardHeader>
                  <CardContent className="divide-y divide-border">
                    <NotifRow
                      label="Product updates"
                      description="Monthly newsletter and feature releases"
                      checked={emailToggles.productUpdates}
                      onChange={() => setEmailToggles((p) => ({ ...p, productUpdates: !p.productUpdates }))}
                    />
                    <NotifRow
                      label="Security alerts"
                      description="Sign-ins from new devices, password changes"
                      checked={emailToggles.securityAlerts}
                      onChange={() => setEmailToggles((p) => ({ ...p, securityAlerts: !p.securityAlerts }))}
                    />
                    <NotifRow
                      label="Billing receipts"
                      description="Payment confirmations and invoices"
                      checked={emailToggles.billingReceipts}
                      onChange={() => setEmailToggles((p) => ({ ...p, billingReceipts: !p.billingReceipts }))}
                    />
                    <NotifRow
                      label="Marketing"
                      description="Promotional offers and surveys"
                      checked={emailToggles.marketing}
                      onChange={() => setEmailToggles((p) => ({ ...p, marketing: !p.marketing }))}
                    />
                  </CardContent>
                </Card>

                {/* Push notifications card */}
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm">Push</CardTitle>
                  </CardHeader>
                  <CardContent className="divide-y divide-border">
                    <NotifRow
                      label="New mentions"
                      description="When someone @mentions you in a comment"
                      checked={pushToggles.newMentions}
                      onChange={() => setPushToggles((p) => ({ ...p, newMentions: !p.newMentions }))}
                    />
                    <NotifRow
                      label="Direct messages"
                      description="Messages sent directly to you"
                      checked={pushToggles.directMessages}
                      onChange={() => setPushToggles((p) => ({ ...p, directMessages: !p.directMessages }))}
                    />
                    <NotifRow
                      label="Task assigned to me"
                      description="When a task is assigned to you"
                      checked={pushToggles.taskAssigned}
                      onChange={() => setPushToggles((p) => ({ ...p, taskAssigned: !p.taskAssigned }))}
                    />
                    <NotifRow
                      label="Daily digest"
                      description="Summary of activity from the past 24 hours"
                      checked={pushToggles.dailyDigest}
                      onChange={() => setPushToggles((p) => ({ ...p, dailyDigest: !p.dailyDigest }))}
                    />
                  </CardContent>
                </Card>

                {/* Notification frequency card */}
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm">Notification frequency</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {(
                      [
                        { value: "realtime", label: "Real time", desc: "Notify immediately as events occur" },
                        { value: "hourly", label: "Hourly digest", desc: "Batch notifications into hourly summaries" },
                        { value: "daily", label: "Daily summary", desc: "One summary email at the end of your day" },
                      ] as const
                    ).map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                          frequency === opt.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        <input
                          type="radio"
                          name="frequency"
                          value={opt.value}
                          checked={frequency === opt.value}
                          onChange={() => setFrequency(opt.value)}
                          className="mt-0.5 accent-primary shrink-0"
                        />
                        <div>
                          <p className="text-sm font-medium">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </CardContent>
                </Card>

                {/* Quiet hours card */}
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm">Quiet hours</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Quiet hours toggle */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Mute notifications during quiet hours</p>
                        <p className="text-xs text-muted-foreground">Silence all notifications in the selected window</p>
                      </div>
                      <SwitchToggle
                        checked={quietHours}
                        onChange={() => setQuietHours((v) => !v)}
                        label="Quiet hours"
                      />
                    </div>

                    {/* From / To selects */}
                    <div className={`grid grid-cols-2 gap-4 transition-opacity ${quietHours ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
                      <div className="space-y-1.5">
                        <Label>From</Label>
                        <Select value={quietFrom} onValueChange={(v) => { if (v !== null) setQuietFrom(v); }}>
                          <SelectTrigger size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {HOUR_OPTIONS.map((h) => (
                              <SelectItem key={h} value={h}>{h}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label>To</Label>
                        <Select value={quietTo} onValueChange={(v) => { if (v !== null) setQuietTo(v); }}>
                          <SelectTrigger size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {HOUR_OPTIONS.map((h) => (
                              <SelectItem key={h} value={h}>{h}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Days of week */}
                    <div className={`space-y-2 transition-opacity ${quietHours ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
                      <Label>Active days</Label>
                      <div className="flex flex-wrap gap-2">
                        {DAYS.map((day) => (
                          <label key={day} className="flex items-center gap-1.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={quietDays[day as keyof typeof quietDays]}
                              onChange={() => toggleDay(day)}
                              className="accent-primary h-3.5 w-3.5 rounded border-border"
                            />
                            <span className="text-sm">{day}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Separator />

                {/* Bottom save row */}
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button size="sm">Save changes</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
