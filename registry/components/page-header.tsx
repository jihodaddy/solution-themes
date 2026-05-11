import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type PageHeaderAction = {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  href?: string;
};

export type PageHeaderBreadcrumbItem = {
  label: string;
  onClick?: () => void;
};

export type PageHeaderProps = {
  /** Small uppercase label rendered above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Breadcrumb trail rendered above the title. Last item is rendered as the current page. */
  breadcrumb?: PageHeaderBreadcrumbItem[];
  /** Destructive action (e.g. Delete) — rendered isolated on the left of the action group. */
  destructiveAction?: PageHeaderAction;
  /** Secondary actions (Print, History, …) — neutral buttons. */
  secondaryActions?: PageHeaderAction[];
  /** Primary action (Save, Submit) — emphasized button on the right. */
  primaryAction?: PageHeaderAction;
  className?: string;
};

/**
 * Page or section header with eyebrow / breadcrumb / title / description on the left
 * and a structured action row on the right (destructive → secondary → primary, with
 * dividers between groups).
 *
 * Use as the top of any list / detail / form page to keep typography + button hierarchy
 * consistent across the app.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
  destructiveAction,
  secondaryActions = [],
  primaryAction,
  className,
}: PageHeaderProps) {
  const hasActions = !!destructiveAction || secondaryActions.length > 0 || !!primaryAction;

  return (
    <div className={cn("flex items-start justify-between gap-6", className)}>
      <div className="min-w-0 space-y-1.5">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {breadcrumb.map((b, i) => {
              const isLast = i === breadcrumb.length - 1;
              return (
                <React.Fragment key={`${b.label}-${i}`}>
                  {b.onClick && !isLast ? (
                    <button onClick={b.onClick} className="hover:text-foreground transition-colors">
                      {b.label}
                    </button>
                  ) : (
                    <span className={isLast ? "text-foreground font-medium" : undefined}>{b.label}</span>
                  )}
                  {!isLast && <ChevronRight className="size-3" />}
                </React.Fragment>
              );
            })}
          </nav>
        ) : eyebrow ? (
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{eyebrow}</p>
        ) : null}

        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>

        {description && (
          <p className="text-sm text-muted-foreground max-w-2xl">{description}</p>
        )}
      </div>

      {hasActions && (
        <div className="flex items-center gap-1.5 shrink-0">
          {destructiveAction && (
            <ActionButton action={destructiveAction} variant="destructive" />
          )}
          {secondaryActions.length > 0 && (
            <>
              {destructiveAction && <span className="w-px h-5 bg-border mx-1" />}
              {secondaryActions.map((a) => (
                <ActionButton key={a.label} action={a} variant="secondary" />
              ))}
            </>
          )}
          {primaryAction && (
            <>
              {(destructiveAction || secondaryActions.length > 0) && (
                <span className="w-px h-5 bg-border mx-1" />
              )}
              <ActionButton action={primaryAction} variant="primary" />
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ActionButton({
  action,
  variant,
}: {
  action: PageHeaderAction;
  variant: "primary" | "secondary" | "destructive";
}) {
  const Icon = action.icon;
  const className = cn(
    "h-8 px-3 text-xs rounded-md font-medium inline-flex items-center gap-1.5 transition-colors",
    variant === "primary" && "bg-primary text-primary-foreground hover:opacity-90",
    variant === "secondary" && "border border-border bg-card text-foreground hover:bg-muted",
    variant === "destructive" && "border border-border text-destructive hover:bg-destructive/10",
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
