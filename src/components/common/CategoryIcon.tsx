import type { SVGProps } from "react";

type CategoryIconProps = {
  slug: string;
  className?: string;
};

const commonProps: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function CategoryIcon({
  slug,
  className = "",
}: CategoryIconProps) {
  const classes = `h-6 w-6 ${className}`;

  switch (slug) {
    case "ai-tools":
      return (
        <svg {...commonProps} className={classes}>
          <path d="M12 3v3" />
          <path d="M12 18v3" />
          <path d="M3 12h3" />
          <path d="M18 12h3" />
          <path d="m5.6 5.6 2.1 2.1" />
          <path d="m16.3 16.3 2.1 2.1" />
          <path d="m18.4 5.6-2.1 2.1" />
          <path d="m7.7 16.3-2.1 2.1" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );

    case "design-creative":
      return (
        <svg {...commonProps} className={classes}>
          <path d="M12 3a9 9 0 1 0 0 18h1.4a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h3a6 6 0 0 0-3-10Z" />
          <circle cx="7.5" cy="10" r=".8" />
          <circle cx="9.5" cy="6.7" r=".8" />
          <circle cx="14" cy="6.3" r=".8" />
        </svg>
      );

    case "productivity-business":
      return (
        <svg {...commonProps} className={classes}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
          <path d="M10 12v2h4v-2" />
        </svg>
      );

    case "education":
      return (
        <svg {...commonProps} className={classes}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
          <path d="M8 7h8" />
          <path d="M8 11h6" />
        </svg>
      );

    case "entertainment":
      return (
        <svg {...commonProps} className={classes}>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m10 9 5 3-5 3Z" />
        </svg>
      );

    case "vpn-cloud":
      return (
        <svg {...commonProps} className={classes}>
          <path d="M12 3 5 6v5c0 4.7 2.9 8 7 10 4.1-2 7-5.3 7-10V6l-7-3Z" />
          <path d="M9 12.5 11 15l4-5" />
        </svg>
      );

    case "software-keys":
      return (
        <svg {...commonProps} className={classes}>
          <circle cx="8" cy="15" r="4" />
          <path d="m11 12 8-8" />
          <path d="m15 8 2 2" />
          <path d="m17 6 2 2" />
        </svg>
      );

    case "accounts-services":
    default:
      return (
        <svg {...commonProps} className={classes}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M15 14.5a5 5 0 0 1 6 4.5" />
        </svg>
      );
  }
}