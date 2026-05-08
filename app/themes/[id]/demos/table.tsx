import { TableCompact } from "@/registry/components/table-compact";
import { BadgePill } from "@/registry/components/badge-pill";

type OrderRow = {
  id: string;
  customer: string;
  amount: number;
  status: "shipped" | "pending" | "cancelled";
};

const ORDERS: OrderRow[] = [
  { id: "A-2841", customer: "Ardent Co.", amount: 12480, status: "shipped" },
  { id: "A-2842", customer: "Northwind", amount: 4120, status: "pending" },
  { id: "A-2843", customer: "Globex", amount: 28000, status: "shipped" },
  { id: "A-2844", customer: "Initech", amount: 980, status: "cancelled" },
  { id: "A-2845", customer: "Acme", amount: 7320, status: "shipped" },
  { id: "A-2846", customer: "Soylent", amount: 16400, status: "pending" },
];

const TONE_BY_STATUS = {
  shipped: "success",
  pending: "warning",
  cancelled: "destructive",
} as const;

export function TableScene() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Recent orders</h1>
      <div className="border border-border rounded-md overflow-hidden">
        <TableCompact
          columns={[
            { key: "id", header: "Order" },
            { key: "customer", header: "Customer" },
            { key: "amount", header: "Amount", align: "right", numeric: true,
              render: (r) => `₩ ${(r.amount as number).toLocaleString()}` },
            { key: "status", header: "Status",
              render: (r) => <BadgePill tone={TONE_BY_STATUS[r.status as "shipped" | "pending" | "cancelled"]}>{r.status}</BadgePill> },
          ]}
          data={ORDERS as unknown as Record<string, React.ReactNode>[]}
        />
      </div>
    </div>
  );
}
