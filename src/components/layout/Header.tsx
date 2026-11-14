
"use client";

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
  ...siteConfig.navigation,
];

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
            className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[#edf4ec] hover:text-[#24583d]"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-[#24583d] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#173d30]"
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
          className="rounded-xl border border-[#dfe8df] bg-[#edf4ec] px-4 py-2.5 text-sm font-bold text-[#24583d] transition hover:bg-emerald-100"
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
          background: rgba(13, 48, 41, 0.97) !important;
          border-color: rgba(200, 229, 218, 0.16) !important;
          color: #f7faf8 !important;
          box-shadow: 0 8px 30px rgba(5, 24, 19, 0.18) !important;
        }
        header.sticky .sastastore-marquee {
          background: linear-gradient(90deg, #0a2823, #17483b, #0a2823) !important;
          border-color: rgba(200, 229, 218, 0.13) !important;
        }
        header.sticky .sastastore-marquee span { color: #d6e9df !important; }
        header.sticky .sastastore-marquee span:first-child { background: #f5ce78 !important; }
        header.sticky a { color: #d6e9df; }
        header.sticky a:hover { color: #f5ce78; }
        header.sticky a[aria-current="page"] { color: #f5ce78 !important; }
        header.sticky a.group > span:first-child {
          background: linear-gradient(135deg, #f5ce78, #e9b94f) !important;
          color: #17372e !important;
          box-shadow: 0 6px 18px rgba(0,0,0,.2) !important;
        }
        header.sticky a.group > span:last-child { color: #fff !important; }
        header.sticky a.group > span:last-child span { color: #f5ce78 !important; }
        header.sticky nav a span { background: #f5ce78 !important; }
        header.sticky button {
          border-color: rgba(214,233,223,.2) !important;
          background-color: #17483b !important;
          color: #fff !important;
        }
        header.sticky button:hover { background-color: #205b49 !important; }
        header.sticky #sastastore-mobile-menu {
          border-color: rgba(214,233,223,.16) !important;
          background: #0d3029 !important;
        }
        @media (prefers-reduced-motion: reduce) {
          header.sticky .sastastore-marquee-track { animation: none !important; }
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 text-slate-900 shadow-sm shadow-emerald-100/40 backdrop-blur-xl">
        {/* Announcement Bar */}
        <div className="sastastore-marquee overflow-hidden border-b border-[#dfe8df] bg-gradient-to-r from-[#EAF4FF] via-[#F4FAFF] to-[#E5FBF3]">
          <div className="sastastore-marquee-track flex w-max">
            {[
              ...announcements,
              ...announcements,
            ].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex shrink-0 items-center gap-3 px-7 py-2 sm:px-10"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#edf4ec]0" />

                <span className="whitespace-nowrap text-xs font-semibold tracking-wide text-slate-700 sm:text-sm">
                  {item}
                </span>

                <span className="text-sm text-emerald-500">
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
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8c875] to-[#d7a94e] text-xl font-black text-white shadow-md shadow-emerald-200">
                S
              </span>

              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-slate-900">
                  Sasta
                </span>
                <span className="text-[#24583d]">
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
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  const isTracking =
                    item.href === "/track";

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
                                ? "border-emerald-500 bg-[#24583d] text-white"
                                : "border-emerald-200 bg-[#edf4ec] text-[#24583d] hover:bg-emerald-100"
                            }`
                          : `group relative py-2 text-sm font-semibold transition-colors duration-200 ${
                              active
                                ? "text-[#24583d]"
                                : "text-slate-600 hover:text-[#24583d]"
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
                          className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#24583d] transition-all duration-200 ${
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

              <div className="flex items-center gap-2 border-l border-slate-200 pl-5">
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
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-emerald-200 hover:bg-[#edf4ec] lg:hidden"
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
                                ? "border-emerald-600 bg-[#24583d] text-white"
                                : "border-emerald-200 bg-[#edf4ec] text-[#24583d]"
                            }`
                          : `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                              active
                                ? "bg-[#edf4ec] text-[#24583d]"
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
                      className="rounded-xl bg-[#24583d] py-3 text-center text-sm font-semibold text-white"
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
                      className="flex w-full items-center justify-center rounded-xl bg-[#edf4ec] py-3 text-sm font-bold text-[#24583d]"
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

