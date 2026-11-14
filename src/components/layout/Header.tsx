
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

const announcements = [
  "Premium Digital Tools at Sasta Prices",
  "Explore AI & Creative Software",
  "Affordable Digital Subscriptions",
  "Friendly Customer Support",
];

type SessionState = {
  loggedIn: boolean;
  isAdmin: boolean;
};

type NavigationItem = {
  href: string;
  label: string;
};

// Widen navigation types so additional routes
// are supported without TypeScript errors.
const navigation: NavigationItem[] = [
  ...siteConfig.navigation.filter(
    (item) =>
      item.href !== "/deals" &&
      item.label.trim().toLowerCase() !== "deals",
  ),
];

if (!navigation.some((item) => item.href === "/about")) {
  navigation.push({
    href: "/about",
    label: "About",
  });
}

if (!navigation.some((item) => item.href === "/track")) {
  navigation.push({
    href: "/track",
    label: "Track Order",
  });
}

export function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [session, setSession] =
    useState<SessionState | null>(null);

  const [loggingOut, setLoggingOut] =
    useState(false);

  const loadSession = useCallback(async () => {
    try {
      const response = await fetch(
        "/api/store/session",
        {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Session unavailable");
      }

      const data: SessionState =
        await response.json();

      setSession({
        loggedIn: data.loggedIn === true,
        isAdmin: data.isAdmin === true,
      });
    } catch {
      setSession({
        loggedIn: false,
        isAdmin: false,
      });
    }
  }, []);

  useEffect(() => {
    void loadSession();
  }, [loadSession, pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const loggedIn =
    session?.loggedIn === true;

  const admin =
    loggedIn && session?.isAdmin === true;

  const accountHref = admin
    ? "/admin"
    : "/account";

  const accountLabel = admin
    ? "Admin Dashboard"
    : "My Account";

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  async function logout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch(
        "/api/auth/logout",
        {
          method: "POST",
          credentials: "same-origin",
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setSession({
        loggedIn: false,
        isAdmin: false,
      });

      window.location.replace("/");
    } catch {
      alert(
        "Unable to sign out. Please try again.",
      );

      setLoggingOut(false);
    }
  }

  const desktopAuth = () => {
    if (session === null) {
      return (
        <span
          className="text-xs text-slate-400"
          aria-label="Checking session"
        >
          Checking account...
        </span>
      );
    }

    if (!loggedIn) {
      return (
        <>
          <Link
            href="/login"
            className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[#eff6ff] hover:text-[#1d4ed8]"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-[#1d4ed8] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1e40af]"
          >
            Get Started
          </Link>
        </>
      );
    }

    return (
      <>
        <Link
          href={accountHref}
          className="rounded-xl border border-[#dbe5f5] bg-[#eff6ff] px-4 py-2.5 text-sm font-bold text-[#1d4ed8] transition hover:bg-blue-100"
        >
          {accountLabel}
        </Link>

        <button
          type="button"
          onClick={() => void logout()}
          disabled={loggingOut}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
        >
          {loggingOut
            ? "Signing Out..."
            : "Logout"}
        </button>
      </>
    );
  };

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

        .sastastore-marquee:hover
        .sastastore-marquee-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .sastastore-marquee-track {
            animation: none;
          }
        }
      `}</style>

      <style jsx global>{`
        header.sticky {
          background: rgba(30, 58, 138, 0.97) !important;
          border-color: rgba(219, 234, 254, 0.16) !important;
          color: #f7faf8 !important;
          box-shadow: 0 8px 30px rgba(30, 64, 175, 0.18) !important;
        }
        header.sticky .sastastore-marquee {
          background: linear-gradient(90deg, #1e3a8a, #1d4ed8, #1e3a8a) !important;
          border-color: rgba(219, 234, 254, 0.13) !important;
        }
        header.sticky .sastastore-marquee span { color: #dbeafe !important; }
        header.sticky .sastastore-marquee span:first-child { background: #60a5fa !important; }
        header.sticky a { color: #dbeafe; }
        header.sticky a:hover { color: #60a5fa; }
        header.sticky a[aria-current="page"] { color: #60a5fa !important; }
        header.sticky a.group > span:first-child {
          background: linear-gradient(135deg, #60a5fa, #3b82f6) !important;
          color: #1e3a8a !important;
          box-shadow: 0 6px 18px rgba(30,64,175,.12) !important;
        }
        header.sticky a.group > span:last-child { color: #fff !important; }
        header.sticky a.group > span:last-child span { color: #60a5fa !important; }
        header.sticky nav a span { background: #60a5fa !important; }
        header.sticky button {
          border-color: rgba(219,234,254,.2) !important;
          background-color: #1d4ed8 !important;
          color: #fff !important;
        }
        header.sticky button:hover { background-color: #1e40af !important; }
        header.sticky #sastastore-mobile-menu {
          border-color: rgba(219,234,254,.16) !important;
          background: #1e3a8a !important;
        }
        @media (prefers-reduced-motion: reduce) {
          header.sticky .sastastore-marquee-track { animation: none !important; }
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 text-slate-900 shadow-sm shadow-blue-100/40 backdrop-blur-xl">
        {/* Announcement Bar */}
        <div className="sastastore-marquee overflow-hidden border-b border-[#dbe5f5] bg-gradient-to-r from-[#EAF4FF] via-[#F4FAFF] to-[#EFF6FF]">
          <div className="sastastore-marquee-track flex w-max">
            {[
              ...announcements,
              ...announcements,
            ].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex shrink-0 items-center gap-3 px-7 py-2 sm:px-10"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#eff6ff]0" />

                <span className="whitespace-nowrap text-xs font-semibold tracking-wide text-slate-700 sm:text-sm">
                  {item}
                </span>

                <span className="text-sm text-blue-500">
                  ✦
                </span>
              </div>
            ))}
          </div>
        </div>

        <Container>
          <div className="flex h-[76px] items-center justify-between gap-4">
            {/* Site Logo */}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="group flex shrink-0 items-center gap-2.5"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/70 bg-white shadow-md">
                <Image
                  src="/images/sastastore-logo.jpg"
                  alt="SastaStore logo"
                  width={56}
                  height={56}
                  priority
                  unoptimized
                  className="h-full w-full object-contain"
                />
              </span>

              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-slate-900">
                  Sasta
                </span>
                <span className="text-[#1d4ed8]">
                  Store
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 lg:flex">
              <nav
                aria-label="Main navigation"
                className="flex min-w-0 items-center gap-3 xl:gap-5"
              >
                {navigation.filter((item) => item.href !== "/track").map((item) => {
                  const active = isActive(item.href);
                  const isTracking = false;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={
                        active ? "page" : undefined
                      }
                      className={
                        isTracking
                          ? `inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold transition ${
                              active
                                ? "border-blue-500 bg-[#1d4ed8] text-white"
                                : "border-blue-200 bg-[#eff6ff] text-[#1d4ed8] hover:bg-blue-100"
                            }`
                          : `group relative py-2 text-sm font-semibold transition-colors duration-200 ${
                              active
                                ? "text-[#1d4ed8]"
                                : "text-slate-600 hover:text-[#1d4ed8]"
                            }`
                      }
                    >
                      {isTracking && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                        </svg>
                      )}

                      {item.label}

                      {!isTracking && (
                        <span
                          className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#1d4ed8] transition-all duration-200 ${
                            active
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                          }`}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <Link href="/track" aria-current={isActive("/track") ? "page" : undefined} className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border-2 border-[#1d4ed8] bg-[#60a5fa] px-3 py-2.5 text-sm font-extrabold text-[#1e40af] shadow-sm transition hover:bg-[#93c5fd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60a5fa]">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg>
                Track Order
              </Link>
              <div className="flex shrink-0 items-center gap-2 border-l border-slate-200 pl-3">
                {desktopAuth()}
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
              onClick={() =>
                setMenuOpen((current) => !current)
              }
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-blue-200 hover:bg-[#eff6ff] lg:hidden"
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
          {menuOpen && (
            <div
              id="sastastore-mobile-menu"
              className="animate-fade-up border-t border-slate-100 pb-5 pt-4 lg:hidden"
            >
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1"
              >
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  const isTracking =
                    item.href === "/track";

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      aria-current={
                        active ? "page" : undefined
                      }
                      className={
                        isTracking
                          ? `mt-2 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-extrabold ${
                              active
                                ? "border-blue-600 bg-[#1d4ed8] text-white"
                                : "border-blue-200 bg-[#eff6ff] text-[#1d4ed8]"
                            }`
                          : `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                              active
                                ? "bg-[#eff6ff] text-[#1d4ed8]"
                                : "text-slate-700 hover:bg-slate-50"
                            }`
                      }
                    >
                      {isTracking && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                        </svg>
                      )}

                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                {session === null ? (
                  <p className="py-3 text-center text-sm text-slate-400">
                    Checking account...
                  </p>
                ) : !loggedIn ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/login"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="rounded-xl border border-slate-200 py-3 text-center text-sm font-semibold text-slate-700"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/register"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="rounded-xl bg-[#1d4ed8] py-3 text-center text-sm font-semibold text-white"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      href={accountHref}
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="flex w-full items-center justify-center rounded-xl bg-[#eff6ff] py-3 text-sm font-bold text-[#1d4ed8]"
                    >
                      {accountLabel}
                    </Link>

                    <button
                      type="button"
                      disabled={loggingOut}
                      onClick={() =>
                        void logout()
                      }
                      className="w-full rounded-xl border border-red-200 bg-red-50 py-3 text-sm font-semibold text-red-600 disabled:opacity-50"
                    >
                      {loggingOut
                        ? "Signing Out..."
                        : "Logout"}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </Container>
      </header>
    </>
  );
}

