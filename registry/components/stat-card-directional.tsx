import * as React from "react";
import { cn } from "@/lib/utils";

export type StatCardDirectionalProps = {
  label: string;
  value: string | number;
  delta?: number; // positive = up/success; negative = down/destructive
  className?: string;
};

export function StatCardDirectional({
  label,
  value,
  delta,
  className,
}: StatCardDirectionalProps) {
  const direction = delta === undefined ? "flat" : delta > 0 ? "up" : delta < 0 ? "down" : "flat";
  const deltaColor =
    direction === "up" ? "text-success" : direction === "down" ? "text-destructive" : "text-muted-foreground";
  const arrow = direction === "up" ? "▲" : direction === "down" ? "▼" : "·";

  return (
    <div
      className={cn(
        "border border-border bg-card text-card-foreground p-3",
        className
      )}
      style={{ borderRadius: "var(--radius)" }}
    >
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div
        className="mt-1 text-2xl font-semibold tabular-nums"
        style={{ fontFamily: "var(--font-numeric)" }}
      >
        {value}
      </div>
      {delta !== undefined && (
        <div
          className={cn("mt-1 text-xs tabular-nums", deltaColor)}
          style={{ fontFamily: "var(--font-numeric)" }}
        >
          {arrow} {delta > 0 ? "+" : ""}{delta}%
        </div>
      )}
    </div>
  );
}
