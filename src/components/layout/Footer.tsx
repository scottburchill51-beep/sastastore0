
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Latest Deals", href: "/deals" },
];

const supportLinks = [
  { label: "Help & FAQ", href: "/faq" },
  { label: "Contact Support", href: "/contact" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const companyLinks = [
  { label: "About SastaStore", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-blue-100 bg-[#F8FBFF] text-slate-900">
      {/* Main Footer */}
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">

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

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-500">
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
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Shop
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {shopLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-slate-500 transition-colors duration-200 hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Customer Support
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {supportLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-slate-500 transition-colors duration-200 hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Company
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {companyLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-slate-500 transition-colors duration-200 hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-4">
              <p className="text-sm font-bold text-slate-900">
                Need assistance?
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Our support page is here to help
                with your questions.
              </p>

              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700"
              >
                Contact Us
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>

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
