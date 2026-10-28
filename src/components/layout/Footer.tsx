
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Latest Deals", href: "/deals" },
];

const supportLinks = [
  { label: "Track Your Order", href: "/track" },
  { label: "My Account", href: "/account" },
  { label: "Help & FAQ", href: "/faq" },
  { label: "Contact Support", href: "/contact" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const companyLinks = [
  { label: "About SastaStore", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const telegramUrl = "https://t.me/Techboyy0";

const whatsappChannelUrl =
  "https://whatsapp.com/channel/0029Vb7BXu2B4hdMiWIlwY1v";

const facebookUrl =
  "https://www.facebook.com/share/1cbKHVxxJi/";

function FooterArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function Footer() {
  const whatsappSupportUrl = createWhatsAppUrl(
    "Hello SastaStore, I need help with my order, payment or subscription.",
  );

  return (
    <footer className="mt-auto border-t border-blue-100 bg-gradient-to-b from-[#F8FBFF] via-white to-[#F0FAF7] text-slate-900">
      {/* Support Banner */}
      <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-emerald-50">
        <Container>
          <div className="flex flex-col items-start justify-between gap-5 py-7 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                Customer Care
              </p>

              <h2 className="mt-2 text-xl font-extrabold text-slate-900 sm:text-2xl">
                Need help with your order?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Track your purchase or contact our support team.
              </p>
            </div>

            <div className="flex w-full flex-wrap gap-3 sm:w-auto">
              <Link
                href="/track"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                Track Order
                <FooterArrow />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Get Support
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer */}
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-xl font-black text-white shadow-md shadow-blue-100">
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

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-600">
              {siteConfig.tagline}
            </p>

            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-500">
              Discover premium AI tools, software,
              digital subscriptions and creative
              products in one convenient marketplace.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-semibold text-emerald-700">
                Made for Digital Shoppers
              </span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
              Shop
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {shopLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
              Customer Support
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {supportLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3">
              <a
                href={whatsappSupportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                WhatsApp Support
              </a>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-bold text-sky-700 transition hover:bg-sky-100"
              >
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                Telegram Support
              </a>

              <p className="text-xs text-slate-500">
                Telegram: @Techboyy0
              </p>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
              Company
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {companyLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <p className="text-sm font-extrabold text-slate-900">
                Need assistance?
              </p>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                Our team can help with orders,
                payments, subscriptions and services.
              </p>

              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700"
              >
                Contact Us
                <FooterArrow />
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Social Connections */}
      <div className="border-t border-blue-100 bg-white/70">
        <Container>
          <div className="flex flex-col justify-between gap-5 py-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-extrabold text-slate-900">
                Stay Connected With SastaStore
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Follow our latest products, deals and announcements.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
              >
                WhatsApp Channel
              </a>

              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
              >
                Facebook
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-blue-100 bg-white">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-slate-500 sm:text-sm">
              © {new Date().getFullYear()} SastaStore.
              All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/privacy"
                className="text-xs text-slate-500 transition hover:text-blue-600"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="text-xs text-slate-500 transition hover:text-blue-600"
              >
                Terms
              </Link>

              <Link
                href="/refund-policy"
                className="text-xs text-slate-500 transition hover:text-blue-600"
              >
                Refunds
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
