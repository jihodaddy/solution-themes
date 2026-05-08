"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableCompact } from "@/registry/components/table-compact";
import { BadgePill } from "@/registry/components/badge-pill";
import { StatusDot } from "@/registry/components/status-dot";
import { StatCardDirectional } from "@/registry/components/stat-card-directional";
import {
  Package,
  Users,
  Boxes,
  Receipt,
  BarChart3,
  Search,
  Plus,
  Printer,
  Mail,
} from "lucide-react";

type OrderRow = {
  id: string;
  customer: string;
  date: string;
  items: number;
  amount: number;
  status: "shipped" | "pending" | "cancelled";
};

const ORDERS: OrderRow[] = [
  { id: "A-2841", customer: "Ardent Co.", date: "May 1", items: 4, amount: 12480, status: "shipped" },
  { id: "A-2842", customer: "Northwind", date: "May 2", items: 2, amount: 4120, status: "pending" },
  { id: "A-2843", customer: "Globex", date: "May 2", items: 8, amount: 28000, status: "shipped" },
  { id: "A-2844", customer: "Initech", date: "May 3", items: 1, amount: 980, status: "cancelled" },
  { id: "A-2845", customer: "Acme", date: "May 4", items: 3, amount: 7320, status: "shipped" },
  { id: "A-2846", customer: "Soylent", date: "May 4", items: 5, amount: 16400, status: "pending" },
  { id: "A-2847", customer: "Umbrella", date: "May 5", items: 2, amount: 5200, status: "shipped" },
  { id: "A-2848", customer: "Hooli", date: "May 5", items: 6, amount: 19800, status: "shipped" },
  { id: "A-2849", customer: "Pied Piper", date: "May 6", items: 1, amount: 1200, status: "pending" },
  { id: "A-2850", customer: "Dunder Mifflin", date: "May 6", items: 3, amount: 8750, status: "shipped" },
  { id: "A-2851", customer: "Massive Dynamic", date: "May 7", items: 7, amount: 24100, status: "shipped" },
  { id: "A-2852", customer: "Virtucon", date: "May 8", items: 2, amount: 3600, status: "cancelled" },
];

const TONE_BY_STATUS = {
  shipped: "success",
  pending: "warning",
  cancelled: "destructive",
} as const;

type LineItem = { sku: string; name: string; qty: number; unitPrice: number; lineTotal: number };

const LINE_ITEMS: LineItem[] = [
  { sku: "SKU-001", name: "Enterprise license (annual)", qty: 1, unitPrice: 18000, lineTotal: 18000 },
  { sku: "SKU-044", name: "Pro add-on pack", qty: 2, unitPrice: 3500, lineTotal: 7000 },
  { sku: "SKU-110", name: "Priority support", qty: 1, unitPrice: 2000, lineTotal: 2000 },
  { sku: "SKU-210", name: "Data export module", qty: 1, unitPrice: 1000, lineTotal: 1000 },
];

type ActivityItem = { label: string; time: string; tone: "success" | "warning" | "neutral" | "primary" };

const ACTIVITY: ActivityItem[] = [
  { label: "Order placed", time: "May 2, 09:14", tone: "neutral" },
  { label: "Payment confirmed", time: "May 2, 09:15", tone: "success" },
  { label: "Shipped via FedEx", time: "May 4, 14:32", tone: "primary" },
];

const NAV_ITEMS = [
  { label: "Orders", icon: Package },
  { label: "Customers", icon: Users },
  { label: "Inventory", icon: Boxes },
  { label: "Invoices", icon: Receipt },
  { label: "Reports", icon: BarChart3 },
];

export function TableScene() {
  const [view, setView] = useState("orders");

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground">
      {/* Top app bar */}
      <header className="h-14 border-b border-border flex items-center px-4 gap-3 shrink-0">
        <span
          className="text-base font-semibold tracking-tight w-44 shrink-0"
          style={{ fontFamily: "var(--font-mono, monospace)" }}
        >
          Terminal ERP
        </span>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            className="w-full h-8 pl-8 pr-3 text-sm border border-border rounded-md bg-muted placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Search…"
          />
        </div>
        <div className="flex-1" />
        <span className="hidden sm:inline text-xs text-muted-foreground border border-border rounded px-2 py-1 font-mono">
          ⌘K
        </span>
        <div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold shrink-0 text-muted-foreground">
          TK
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 border-r border-border shrink-0 flex flex-col overflow-y-auto">
          <nav className="p-3 space-y-0.5">
            {NAV_ITEMS.map((item, i) => {
              const Icon = item.icon;
              const isActive = (i === 0 && view === "orders") || (i === 0 && view !== "detail"
                ? view === "orders"
                : false);
              return (
                <button
                  key={item.label}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center gap-2.5 transition-colors ${
                    i === 0 && (view === "orders" || view === "detail")
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => i === 0 && setView("orders")}
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
          <Tabs defaultValue="orders" value={view} onValueChange={setView} className="h-full">
            <div className="border-b border-border px-6 pt-4">
              <TabsList variant="line">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="detail">Order #A-2843</TabsTrigger>
              </TabsList>
            </div>

            {/* View A: Orders */}
            <TabsContent value="orders">
              <div className="px-6 py-6 space-y-4">
                {/* Page header */}
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold tracking-tight">Orders</h1>
                  <Button size="sm">
                    <Plus className="size-3.5" />
                    New order
                  </Button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <StatCardDirectional label="Revenue this month" value="₩128,150" delta={6.2} />
                  <StatCardDirectional label="Open orders" value="14" delta={-2.4} />
                  <StatCardDirectional label="Avg. fulfillment" value="1.8 days" delta={0.3} />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { label: "All 248", active: true },
                    { label: "Pending 12", active: false },
                    { label: "Shipped 220", active: false },
                    { label: "Cancelled 16", active: false },
                  ].map((f) => (
                    <BadgePill key={f.label} tone={f.active ? "primary" : "neutral"}>
                      {f.label}
                    </BadgePill>
                  ))}
                  <div className="flex-1" />
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                    <input
                      className="h-7 pl-7 pr-2 text-xs border border-border rounded-md bg-muted focus:outline-none focus:ring-1 focus:ring-ring"
                      placeholder="Filter orders…"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger size="sm" className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All dates</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This week</SelectItem>
                      <SelectItem value="month">This month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Table */}
                <div className="border border-border rounded-md overflow-hidden">
                  <TableCompact
                    columns={[
                      { key: "id", header: "Order" },
                      { key: "customer", header: "Customer" },
                      { key: "date", header: "Date" },
                      { key: "items", header: "Items", align: "right", numeric: true },
                      {
                        key: "amount",
                        header: "Amount",
                        align: "right",
                        numeric: true,
                        render: (r) => `₩ ${(r as unknown as OrderRow).amount.toLocaleString()}`,
                      },
                      {
                        key: "status",
                        header: "Status",
                        render: (r) => (
                          <BadgePill tone={TONE_BY_STATUS[(r as unknown as OrderRow).status]}>
                            {(r as unknown as OrderRow).status}
                          </BadgePill>
                        ),
                      },
                    ]}
                    data={ORDERS as unknown as Record<string, React.ReactNode>[]}
                  />
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>1–12 of 248</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* View B: Order detail */}
            <TabsContent value="detail">
              <div className="px-6 py-6 space-y-6">
                {/* Breadcrumb + actions */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <button
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setView("orders")}
                    >
                      Orders
                    </button>
                    <span className="text-muted-foreground">/</span>
                    <span className="font-medium">#A-2843</span>
                    <BadgePill tone="success">Shipped</BadgePill>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Printer className="size-3.5" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="size-3.5" />
                      Email
                    </Button>
                    <Button variant="destructive" size="sm">Refund</Button>
                  </div>
                </div>

                {/* 2-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  {/* Items (60%) */}
                  <div className="lg:col-span-3 space-y-3">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Items</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="border border-border rounded-md overflow-hidden">
                          <TableCompact
                            columns={[
                              { key: "sku", header: "SKU", numeric: true },
                              { key: "name", header: "Product" },
                              { key: "qty", header: "Qty", align: "right", numeric: true },
                              {
                                key: "unitPrice",
                                header: "Unit",
                                align: "right",
                                numeric: true,
                                render: (r) => `₩ ${(r as unknown as LineItem).unitPrice.toLocaleString()}`,
                              },
                              {
                                key: "lineTotal",
                                header: "Total",
                                align: "right",
                                numeric: true,
                                render: (r) => `₩ ${(r as unknown as LineItem).lineTotal.toLocaleString()}`,
                              },
                            ]}
                            data={LINE_ITEMS as unknown as Record<string, React.ReactNode>[]}
                          />
                        </div>
                        {/* Totals footer */}
                        <div className="mt-3 space-y-1 text-sm">
                          {[
                            { label: "Subtotal", value: "₩ 28,000" },
                            { label: "Tax (10%)", value: "₩ 2,800" },
                          ].map((row) => (
                            <div key={row.label} className="flex justify-between text-muted-foreground">
                              <span>{row.label}</span>
                              <span className="tabular-nums" style={{ fontFamily: "var(--font-numeric)" }}>{row.value}</span>
                            </div>
                          ))}
                          <div className="flex justify-between font-semibold border-t border-border pt-1 mt-1">
                            <span>Total</span>
                            <span className="tabular-nums" style={{ fontFamily: "var(--font-numeric)" }}>₩ 30,800</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right (40%) */}
                  <div className="lg:col-span-2 space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Customer</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1.5 text-sm">
                        <p className="font-medium">Globex Corporation</p>
                        <p className="text-muted-foreground">procurement@globex.example</p>
                        <p className="text-muted-foreground">+1 (555) 800-4200</p>
                        <div className="pt-2 border-t border-border text-muted-foreground leading-relaxed">
                          742 Evergreen Terrace<br />
                          Springfield, OH 44101<br />
                          United States
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Activity</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {ACTIVITY.map((a) => (
                          <div key={a.label} className="flex items-start gap-2.5">
                            <StatusDot tone={a.tone} className="mt-1 shrink-0" />
                            <div>
                              <p className="text-sm">{a.label}</p>
                              <p className="text-xs text-muted-foreground">{a.time}</p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
