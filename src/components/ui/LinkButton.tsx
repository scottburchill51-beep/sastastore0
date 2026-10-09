import Link from "next/link";
import type { ComponentProps } from "react";

type LinkButtonVariant = "primary" | "secondary";

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: LinkButtonVariant;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variantClasses: Record<LinkButtonVariant, string> = {
  primary: "bg-brand text-black hover:bg-brand-hover",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-surface-elevated",
};

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}