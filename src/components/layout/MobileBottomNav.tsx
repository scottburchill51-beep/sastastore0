
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    label: "Home",
    href: "/",
    icon: "home",
  },
  {
    label: "Categories",
    href: "/categories",
    icon: "categories",
  },
  {
    label: "Products",
    href: "/products",
    icon: "products",
  },
  {
    label: "Track",
    href: "/track",
    icon: "track",
  },
  {
    label: "Account",
    href: "/account",
    icon: "account",
  },
] as const;

type IconName =
  (typeof navigation)[number]["icon"];

function NavigationIcon({
  name,
  active,
}: {
  name: IconName;
  active: boolean;
}) {
  const className = "h-[21px] w-[21px]";

  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: active ? 2.3 : 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v12h14V9" />
          <path d="M9 21v-7h6v7" />
        </svg>
      );

    case "categories":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );

    case "products":
      return (
        <svg {...common}>
          <path d="M5 8h14l1 13H4L5 8Z" />
          <path d="M9 9V6a3 3 0 0 1 6 0v3" />
        </svg>
      );

    case "track":
      return (
        <svg {...common}>
          <path d="m3 7 9-4 9 4v10l-9 4-9-4V7Z" />
          <path d="m3 7 9 4 9-4" />
          <path d="M12 11v10" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      );

    case "account":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );
  }
}

export function MobileBottomNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  return (
    <nav
      aria-label="Mobile primary navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#38675E] bg-[#123B35] shadow-[0_-5px_25px_rgba(18,59,53,0.15)] md:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="mx-auto grid h-[66px] max-w-lg grid-cols-5 items-center px-1">
        {navigation.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`mx-0.5 flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76A] ${
                active
                  ? "bg-[#F5C76A] text-[#123B35]"
                  : "text-[#E0EEE9] hover:bg-[#205047] hover:text-white"
              }`}
            >
              <NavigationIcon
                name={item.icon}
                active={active}
              />

              <span
                className={`whitespace-nowrap text-[10px] leading-3 ${
                  active
                    ? "font-extrabold"
                    : "font-semibold"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
