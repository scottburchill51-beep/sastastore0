import type { HTMLAttributes } from "react";

type BadgeVariant = "default" | "success" | "muted";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "border border-brand/30 bg-brand/10 text-brand",
  success: "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  muted: "border border-border bg-surface-elevated text-muted-foreground",
};

export function Badge({
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}