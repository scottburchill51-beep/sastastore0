"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const WHATSAPP_CHANNEL_URL =
  "https://whatsapp.com/channel/0029Vb7BXu2B4hdMiWIlwY1v";

const SESSION_KEY = "sastastore-welcome-seen";

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem(SESSION_KEY);

    if (!hasSeenPopup) {
      const timer = window.setTimeout(() => {
        setIsOpen(true);
      }, 450);

      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closePopup();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function closePopup() {
    sessionStorage.setItem(SESSION_KEY, "true");
    setIsOpen(false);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closePopup();
        }
      }}
    >
      <div className="animate-fade-up relative w-full max-w-lg overflow-hidden rounded-3xl border border-brand/20 bg-surface shadow-[0_25px_100px_rgba(0,0,0,0.65)]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-brand/5 blur-3xl" />

        <button
          type="button"
          onClick={closePopup}
          aria-label="Close welcome message"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-xl text-muted-foreground transition-all duration-300 hover:rotate-90 hover:border-brand/30 hover:text-foreground"
        >
          ×
        </button>

        <div className="relative p-6 sm:p-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-brand/20 bg-background shadow-lg shadow-brand/5">
            <Image
              src="/icon.svg"
              alt="SastaStore"
              width={80}
              height={80}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-6 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              <span className="status-dot h-2 w-2 rounded-full bg-brand" />
              Welcome
            </div>

            <h2
              id="welcome-title"
              className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Welcome to{" "}
              <span className="text-brand">SastaStore</span>
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              Your destination for affordable digital tools, AI subscriptions,
              premium apps and professional digital services.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-border bg-surface-elevated p-3 text-center text-muted-foreground">
              AI & Premium Tools
            </div>

            <div className="rounded-xl border border-border bg-surface-elevated p-3 text-center text-muted-foreground">
              Digital Services
            </div>

            <div className="rounded-xl border border-border bg-surface-elevated p-3 text-center text-muted-foreground">
              Fast Delivery
            </div>

            <div className="rounded-xl border border-border bg-surface-elevated p-3 text-center text-muted-foreground">
              WhatsApp Support
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/5 p-5">
            <p className="text-center text-sm font-semibold text-foreground">
              Follow our WhatsApp Channel
            </p>

            <p className="mt-2 text-center text-xs leading-5 text-muted-foreground">
              Get product updates, new deals, service announcements and the
              latest SastaStore offers.
            </p>

            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                sessionStorage.setItem(SESSION_KEY, "true")
              }
              className="button-shine mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20bd5a]"
            >
              <svg
                viewBox="0 0 32 32"
                aria-hidden="true"
                className="h-5 w-5 fill-current"
              >
                <path d="M16.02 3C8.84 3 3 8.74 3 15.8c0 2.48.72 4.9 2.08 6.97L3 29l6.47-2.02a13.2 13.2 0 0 0 6.54 1.74h.01C23.2 28.72 29 22.98 29 15.9 29 8.84 23.2 3 16.02 3Zm0 23.55a10.9 10.9 0 0 1-5.57-1.52l-.4-.24-3.83 1.2 1.25-3.72-.26-.42a10.6 10.6 0 0 1-1.7-5.95c0-5.88 4.72-10.66 10.53-10.66 5.81 0 10.52 4.78 10.52 10.66 0 5.88-4.72 10.65-10.54 10.65Z" />
              </svg>
              Follow SastaStore Channel
            </a>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              onClick={closePopup}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-border bg-surface-elevated px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-brand/30 hover:text-brand"
            >
              Explore Products
            </Link>

            <button
              type="button"
              onClick={closePopup}
              className="inline-flex flex-1 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              Continue to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
