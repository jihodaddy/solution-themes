import * as React from "react";
import { cn } from "@/lib/utils";

export type EmptyStateAction = {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  href?: string;
};

export type EmptyStateProps = {
  icon?: React.ComponentType<{ className?: string }>;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Primary CTA — emphasized button. */
  action?: EmptyStateAction;
  /** Optional secondary CTA — neutral button alongside the primary. */
  secondaryAction?: EmptyStateAction;
  /** Visual treatment. `default` uses a dashed bordered card; `subtle` is borderless. */
  variant?: "default" | "subtle";
  className?: string;
};

/**
 * Empty-state pattern — icon + heading + description + optional CTAs.
 *
 * Use whenever a list, search, or section has no data yet (vs an error). Provides a
 * consistent layout so users see the same "first encounter" treatment across the app.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  variant = "default",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "text-center px-6 py-10",
        variant === "default" && "rounded-lg border border-dashed border-border bg-muted/10",
        className,
      )}
    >
      {Icon && (
        <div className="mx-auto mb-3 size-10 rounded-full bg-muted grid place-items-center text-muted-foreground">
          <Icon className="size-5" />
        </div>
      )}
      <p className="text-sm font-medium">{title}</p>
      {description && (
        <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {action && <ActionButton action={action} variant="primary" />}
          {secondaryAction && <ActionButton action={secondaryAction} variant="secondary" />}
        </div>
      )}
    </div>
  );
}

function ActionButton({
  action,
  variant,
}: {
  action: EmptyStateAction;
  variant: "primary" | "secondary";
}) {
  const Icon = action.icon;
  const className = cn(
    "h-8 px-3 text-xs rounded-md font-medium inline-flex items-center gap-1.5 transition-colors",
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:opacity-90"
      : "border border-border bg-card text-foreground hover:bg-muted",
  );
  if (action.href) {
    return (
      <a href={action.href} className={className}>
        {Icon && <Icon className="size-3.5" />}
        {action.label}
      </a>
    );
  }
  return (
    <button type="button" onClick={action.onClick} className={className}>
      {Icon && <Icon className="size-3.5" />}
      {action.label}
    </button>
  );
}
