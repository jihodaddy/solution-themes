import * as React from "react";
import { cn } from "@/lib/utils";

export type ToggleSwitchTone = "primary" | "success" | "warning" | "destructive";

export type ToggleSwitchProps = {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  tone?: ToggleSwitchTone;
  className?: string;
};

const TONE_STYLES: Record<ToggleSwitchTone, string> = {
  primary: "bg-primary/10 border-primary/40 text-primary",
  success: "bg-success/15 border-success/40 text-success",
  warning: "bg-warning/15 border-warning/40 text-warning",
  destructive: "bg-destructive/10 border-destructive/40 text-destructive",
};

/**
 * Filter pill with an integrated switch handle. Use for boolean filter facets
 * ("SLA at risk", "Has attachments", etc.) where the pill itself conveys both
 * label and on/off state.
 */
export function ToggleSwitch({
  active,
  onClick,
  label,
  icon: Icon,
  tone = "primary",
  className,
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-xs border transition-colors",
        active
          ? TONE_STYLES[tone]
          : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
        className,
      )}
    >
      {Icon && <Icon className="size-3" />}
      {label}
      <span
        aria-hidden
        className={cn(
          "ml-1 inline-flex h-3.5 w-6 rounded-full p-0.5 transition-colors",
          active ? "bg-current/30" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "size-2.5 rounded-full bg-background transition-transform",
            active ? "translate-x-2.5" : "translate-x-0",
          )}
        />
      </span>
    </button>
  );
}
