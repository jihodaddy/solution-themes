import * as React from "react";
import { cn } from "@/lib/utils";

export type TableCompactColumn<T> = {
  key: keyof T & string;
  header: string;
  align?: "left" | "right";
  numeric?: boolean;
  render?: (row: T) => React.ReactNode;
};

export type TableCompactProps<T> = {
  columns: TableCompactColumn<T>[];
  data: T[];
  className?: string;
};

export function TableCompact<T extends Record<string, React.ReactNode>>({
  columns,
  data,
  className,
}: TableCompactProps<T>) {
  return (
    <table className={cn("w-full border-collapse text-sm", className)}>
      <thead>
        <tr className="border-b border-border bg-muted">
          {columns.map((c) => (
            <th
              key={c.key}
              className={cn(
                "px-2 py-1 text-left text-[10px] uppercase tracking-wide text-muted-foreground font-medium",
                c.align === "right" && "text-right"
              )}
            >
              {c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/40">
            {columns.map((c) => (
              <td
                key={c.key}
                className={cn(
                  "px-2 py-1",
                  c.align === "right" && "text-right",
                  c.numeric && "tabular-nums"
                )}
                style={c.numeric ? { fontFamily: "var(--font-numeric)" } : undefined}
              >
                {c.render ? c.render(row) : row[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
