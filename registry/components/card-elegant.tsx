import * as React from "react";
import { cn } from "@/lib/utils";

export type CardElegantProps = React.HTMLAttributes<HTMLDivElement> & {
  caption?: string;
};

export const CardElegant = React.forwardRef<HTMLDivElement, CardElegantProps>(
  ({ className, caption, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "border border-border bg-card text-card-foreground",
        "px-6 py-5",
        "[&>h3]:font-[family-name:var(--font-display)] [&>h3]:text-xl [&>h3]:tracking-tight",
        className
      )}
      style={{ borderRadius: "var(--radius)" }}
      {...props}
    >
      {children}
      {caption && (
        <p
          className="mt-3 text-sm text-muted-foreground italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {caption}
        </p>
      )}
    </div>
  )
);
CardElegant.displayName = "CardElegant";
