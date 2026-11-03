
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

const tickerMessages = [
  "Premium Digital Products",
  "Affordable Subscription Plans",
  "Easy Order Tracking",
  "Dedicated Customer Support",
  "Explore AI Tools & Software",
  "Manage Your Subscriptions",
];

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

function FooterStar() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m12 2 3.1 6.3 7 1-5.1 5 .9 7-5.9-3.2-5.9 3.2.9-7-5.1-5 7-1L12 2Z" />
    </svg>
  );
}

export function Footer() {
  const whatsappSupportUrl = createWhatsAppUrl(
    "Hello SastaStore, I need help with my order, payment or subscription.",
  );

  return (
    <footer className="mt-auto overflow-hidden bg-[#123B35] text-white">
      {/* SUPPORT BANNER */}
      <div className="border-b border-[#38675E] bg-[#16483F]">
        <Container>
          <div className="flex flex-col items-start justify-between gap-5 py-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#F5C76A]">
                Customer Care
              </p>

              <h2 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
                Need help with your order?
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#C8E5DA]">
                Track your purchase or contact our support team.
              </p>
            </div>

            <div className="flex w-full flex-wrap gap-3 sm:w-auto">
              <Link
                href="/track"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F5C76A] px-5 py-3 text-sm font-extrabold text-[#123B35] transition hover:bg-[#FFE09B]"
              >
                Track Order
                <FooterArrow />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-[#609186] bg-[#205047] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2A6258]"
              >
                Get Support
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* MOVING PROMOTIONAL TICKER */}
      <div
        className="overflow-hidden border-b border-[#38675E] bg-[#0E302B] py-4"
        aria-label="SastaStore marketplace highlights"
      >
        <div className="sastastore-footer-marquee flex w-max">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-10 pr-10"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {tickerMessages.map((message, index) => (
                <div
                  key={`${copy}-${index}`}
                  className="flex shrink-0 items-center gap-3"
                >
                  <span className="text-[#F5C76A]">
                    <FooterStar />
                  </span>

                  <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.12em] text-[#E4F5ED] sm:text-sm">
                    {message}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN FOOTER */}
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-16">
          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F5C76A] to-[#DCA447] text-2xl font-black text-[#123B35] shadow-lg shadow-black/10">
                S
              </span>

              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-white">
                  Sasta
                </span>

                <span className="text-[#F5C76A]">
                  Store
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[#E2F2EB]">
              {siteConfig.tagline}
            </p>

            <p className="mt-4 max-w-xs text-sm leading-7 text-[#B8D8CC]">
              Discover premium AI tools, software,
              digital subscriptions and creative
              products in one convenient marketplace.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#467C6F] bg-[#205047] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#A7F3D0]" />

              <span className="text-xs font-semibold text-[#D6F5E6]">
                Made for Digital Shoppers
              </span>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#F5C76A]">
              Shop
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {shopLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-[#C8E5DA] transition-colors hover:text-[#F5C76A]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#F5C76A]">
              Customer Support
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {supportLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-[#C8E5DA] transition-colors hover:text-[#F5C76A]"
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
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#528578] bg-[#205047] px-4 py-2.5 text-sm font-bold text-[#D6F5E6] transition hover:bg-[#2B6459]"
              >
                <span className="h-2 w-2 rounded-full bg-[#6EE7B7]" />
                WhatsApp Support
              </a>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#528578] bg-[#205047] px-4 py-2.5 text-sm font-bold text-[#D6F5E6] transition hover:bg-[#2B6459]"
              >
                <span className="h-2 w-2 rounded-full bg-[#7DD3FC]" />
                Telegram Support
              </a>

              <p className="text-xs text-[#A9CEC0]">
                Telegram: @Techboyy0
              </p>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#F5C76A]">
              Company
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {companyLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-[#C8E5DA] transition-colors hover:text-[#F5C76A]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-[#46796F] bg-[#205047] p-5 shadow-lg shadow-black/10">
              <p className="text-sm font-extrabold text-white">
                Need assistance?
              </p>

              <p className="mt-2 text-xs leading-6 text-[#C8E5DA]">
                Our team can help with orders,
                payments, subscriptions and services.
              </p>

              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#F5C76A] transition hover:text-[#FFE09B]"
              >
                Contact Us
                <FooterArrow />
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* SOCIAL CONNECTIONS */}
      <div className="border-t border-[#38675E] bg-[#16483F]">
        <Container>
          <div className="flex flex-col justify-between gap-5 py-7 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-extrabold text-white">
                Stay Connected With SastaStore
              </p>

              <p className="mt-1 text-xs text-[#C8E5DA]">
                Follow our latest products, deals and announcements.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-[#528578] bg-[#205047] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#2B6459]"
              >
                WhatsApp Channel
              </a>

              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-[#528578] bg-[#205047] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#2B6459]"
              >
                Facebook
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="border-t border-[#38675E] bg-[#0E302B]">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-[#B8D8CC] sm:text-sm">
              © {new Date().getFullYear()} SastaStore.
              All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/privacy"
                className="text-xs text-[#C8E5DA] transition hover:text-[#F5C76A]"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="text-xs text-[#C8E5DA] transition hover:text-[#F5C76A]"
              >
                Terms
              </Link>

              <Link
                href="/refund-policy"
                className="text-xs text-[#C8E5DA] transition hover:text-[#F5C76A]"
              >
                Refunds
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* SMOOTH MOVING TEXT ANIMATION */}
      <style>{`
        @keyframes sastastore-footer-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .sastastore-footer-marquee {
          animation: sastastore-footer-scroll 35s linear infinite;
          will-change: transform;
        }

        .sastastore-footer-marquee:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .sastastore-footer-marquee {
            animation: none;
          }
        }
      `}</style>
    </footer>
  );
}
