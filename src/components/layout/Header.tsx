
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const announcements = [
  "Premium Digital Tools at Sasta Prices",
  "Explore AI & Creative Software",
  "Affordable Digital Subscriptions",
  "Friendly Customer Support",
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const whatsappUrl = createWhatsAppUrl(
    "Hello, I want to know more about SastaStore products and available subscriptions.",
  );

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
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
          animation: sastastore-marquee 28s linear infinite;
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

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 text-slate-900 shadow-sm shadow-blue-100/40 backdrop-blur-xl">
        {/* Announcement Bar */}
        <div className="sastastore-marquee overflow-hidden border-b border-blue-100 bg-gradient-to-r from-[#EAF4FF] via-[#F4FAFF] to-[#E5FBF3]">
          <div className="sastastore-marquee-track flex w-max">
            {[...announcements, ...announcements].map(
              (item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex shrink-0 items-center gap-3 px-7 py-2 sm:px-10"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />

                  <span className="whitespace-nowrap text-xs font-semibold tracking-wide text-slate-700 sm:text-sm">
                    {item}
                  </span>

                  <span className="text-sm text-emerald-500">
                    ✦
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Desktop & Mobile Header */}
        <Container>
          <div className="flex h-[76px] items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="group flex shrink-0 items-center gap-2.5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-xl font-black text-white shadow-md shadow-blue-200">
                S
              </span>

              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-slate-900">
                  Sasta
                </span>
                <span className="text-blue-600">
                  Store
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-5 lg:flex">
              <nav
                aria-label="Main navigation"
                className="flex items-center gap-6"
              >
                {siteConfig.navigation.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative py-2 text-sm font-semibold transition-colors duration-200 ${
                        active
                          ? "text-blue-600"
                          : "text-slate-600 hover:text-blue-600"
                      }`}
                    >
                      {item.label}

                      <span
                        className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-blue-600 transition-all duration-200 ${
                          active
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2 border-l border-slate-200 pl-5">
                <Link
                  href="/login"
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Get Started
                </Link>

                <Link
                  href="/account"
                  className="rounded-xl border border-blue-100 bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                >
                  Dashboard
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={
                menuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="sastastore-mobile-menu"
              onClick={() => setMenuOpen((current) => !current)}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 lg:hidden"
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
                  menuOpen
                    ? "scale-x-0 opacity-0"
                    : "opacity-100"
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

          {/* Mobile Navigation */}
          {menuOpen ? (
            <div
              id="sastastore-mobile-menu"
              className="animate-fade-up border-t border-slate-100 pb-5 pt-4 lg:hidden"
            >
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1"
              >
                {siteConfig.navigation.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        active
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-slate-200 py-3 text-center text-sm font-semibold text-slate-700"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white"
                >
                  Sign Up
                </Link>
              </div>

              <Link
                href="/account"
                onClick={() => setMenuOpen(false)}
                className="mt-3 flex w-full items-center justify-center rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-700"
              >
                Customer Dashboard
              </Link>
            </div>
          ) : null}
        </Container>
      </header>
    </>
  );
}
