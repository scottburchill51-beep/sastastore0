"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const announcements = [
  "Premium Digital Tools at Sasta Prices",
  "Fast Digital Delivery",
  "WhatsApp Support",
  "Clear Plans & Pricing",
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const whatsappUrl = createWhatsAppUrl(
    "Hello, I want to know more about SastaStore products and available subscriptions.",
  );

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <style jsx global>{`
        @keyframes sastastore-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .sastastore-marquee-track {
          animation: sastastore-marquee 24s linear infinite;
        }

        .sastastore-marquee:hover .sastastore-marquee-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .sastastore-marquee-track {
            animation: none;
          }
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        {/* Top Moving Announcement Bar */}
        <div className="sastastore-marquee overflow-hidden border-b border-white/5 bg-[#050607] text-white">
          <div className="sastastore-marquee-track flex w-max">
            {[...announcements, ...announcements].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex shrink-0 items-center gap-3 px-6 py-2 sm:px-10"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand shadow-[0_0_10px_rgba(34,197,94,0.8)]" />

                <span className="whitespace-nowrap text-xs font-semibold tracking-wide text-white/90 sm:text-sm">
                  {item}
                </span>

                <span className="text-sm text-brand">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Header */}
        <Container>
          <div className="flex h-18 items-center justify-between gap-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="group shrink-0 text-xl font-bold tracking-tight text-foreground"
            >
              <span className="transition-colors duration-300 group-hover:text-brand">
                Sasta
              </span>
              <span className="text-brand">Store</span>
            </Link>

            <div className="hidden items-center gap-7 md:flex">
              <nav className="flex items-center gap-7">
                {siteConfig.navigation.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative py-2 text-sm font-medium transition-colors duration-300 ${
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}

                      <span
                        className={`absolute bottom-0 left-0 h-px bg-brand transition-all duration-300 ${
                          active
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover"
              >
                WhatsApp Us
              </a>
            </div>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:border-brand/30 hover:bg-surface-elevated md:hidden"
            >
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  menuOpen
                    ? "translate-y-0 rotate-45"
                    : "-translate-y-1.5"
                }`}
              />

              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "scale-x-0 opacity-0" : "opacity-100"
                }`}
              />

              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  menuOpen
                    ? "translate-y-0 -rotate-45"
                    : "translate-y-1.5"
                }`}
              />
            </button>
          </div>

          {menuOpen ? (
            <div className="animate-fade-up border-t border-border py-4 md:hidden">
              <nav className="flex flex-col gap-1">
                {siteConfig.navigation.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                        active
                          ? "bg-brand/10 text-brand"
                          : "text-muted-foreground hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-brand-hover"
              >
                WhatsApp Us
              </a>
            </div>
          ) : null}
        </Container>
      </header>
    </>
  );
}