import Link from "next/link";
import type { ComponentProps } from "react";

type LinkButtonVariant = "primary" | "secondary";

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: LinkButtonVariant;
};

const baseClasses =
  "group/button relative inline-flex items-center justify-center overflow-hidden rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variantClasses: Record<LinkButtonVariant, string> = {
  primary:
    "bg-brand text-black hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/10",
  secondary:
    "border border-border bg-surface text-foreground hover:-translate-y-0.5 hover:border-brand/25 hover:bg-surface-elevated",
};

export function LinkButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {variant === "primary" ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-[-30%] w-[20%] skew-x-[-20deg] bg-white/20 opacity-0 transition-all duration-700 group-hover/button:left-[120%] group-hover/button:opacity-100"
        />
      ) : null}

      <span className="relative">{children}</span>
    </Link>
  );
}