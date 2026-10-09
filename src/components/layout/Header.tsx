"use client";

import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background/95">
      <Container>
        <div className="flex h-18 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            Sasta<span className="text-brand">Store</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen ? (
          <nav className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}