
import Link from "next/link";

import { Container } from "@/components/ui/Container";
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

const highlights = [
  {
    title: "AI Tools",
    subtitle: "Explore AI-powered productivity",
    symbol: "✦",
    href: "/categories",
  },
  {
    title: "Creative Software",
    subtitle: "Design, edit and create",
    symbol: "◈",
    href: "/categories",
  },
  {
    title: "Digital Subscriptions",
    subtitle: "Discover available plans",
    symbol: "★",
    href: "/products",
  },
  {
    title: "Special Deals",
    subtitle: "Browse current offers",
    symbol: "%",
    href: "/deals",
  },
  {
    title: "Order Tracking",
    subtitle: "Follow your purchase",
    symbol: "✓",
    href: "/track",
  },
  {
    title: "Customer Support",
    subtitle: "Get help when you need it",
    symbol: "☎",
    href: "/contact",
  },
];

type FooterLink = {
  label: string;
  href: string;
};

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#F5C76A]">
        {title}
      </h3>

      <nav
        aria-label={`${title} links`}
        className="mt-3 flex flex-col gap-2.5"
      >
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="w-fit text-xs leading-5 text-[#C8E5DA] transition hover:text-[#F5C76A] sm:text-sm"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function HighlightCard({
  item,
}: {
  item: (typeof highlights)[number];
}) {
  return (
    <Link
      href={item.href}
      className="group flex w-[205px] shrink-0 items-center gap-3 rounded-xl border border-[#427467] bg-[#205047] p-3 transition-colors hover:border-[#F5C76A] hover:bg-[#2A6054] sm:w-[260px]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#32695C] text-lg font-black text-[#F5C76A]">
        {item.symbol}
      </span>

      <span className="min-w-0">
        <span className="block text-xs font-extrabold text-white sm:text-sm">
          {item.title}
        </span>

        <span className="mt-1 block text-[10px] leading-4 text-[#C8E5DA] sm:text-xs">
          {item.subtitle}
        </span>
      </span>
    </Link>
  );
}

export function Footer() {
  const whatsappSupportUrl = createWhatsAppUrl(
    "Hello SastaStore, I need help with my order, payment or subscription.",
  );

  return (
    <footer className="mt-auto overflow-hidden bg-[#123B35] text-white">
      {/* MOVING DIGITAL TOOL HIGHLIGHTS */}
      <section
        aria-labelledby="footer-highlights-heading"
        className="border-b border-[#38675E] bg-[#0E302B] py-5"
      >
        <Container>
          <h2
            id="footer-highlights-heading"
            className="mb-3 text-sm font-extrabold text-white sm:text-base"
          >
            Explore More With SastaStore
          </h2>
        </Container>

        <div className="overflow-hidden">
          <div className="sastastore-footer-track flex w-max">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 gap-3 pr-3"
                aria-hidden={copy === 1}
                inert={copy === 1}
              >
                {highlights.map((item) => (
                  <HighlightCard
                    key={`${copy}-${item.title}`}
                    item={item}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <Container>
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 py-8 sm:grid-cols-4 sm:gap-7 sm:py-10">
          {/* BRAND */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              aria-label="SastaStore homepage"
              className="inline-flex items-center gap-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5C76A] text-lg font-black text-[#123B35]">
                S
              </span>

              <span className="text-xl font-extrabold tracking-tight">
                Sasta
                <span className="text-[#F5C76A]">
                  Store
                </span>
              </span>
            </Link>

            <p className="mt-3 max-w-xs text-xs leading-5 text-[#C8E5DA]">
              Your digital marketplace for premium
              tools, software and subscriptions.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={whatsappSupportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-[#4F8175] bg-[#205047] px-3 py-2 text-[11px] font-bold text-white transition hover:bg-[#2A6258]"
              >
                WhatsApp
              </a>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-[#4F8175] bg-[#205047] px-3 py-2 text-[11px] font-bold text-white transition hover:bg-[#2A6258]"
              >
                Telegram
              </a>
            </div>
          </div>

          <FooterLinks
            title="Shop"
            links={shopLinks}
          />

          <FooterLinks
            title="Support"
            links={supportLinks}
          />

          <FooterLinks
            title="Company"
            links={companyLinks}
          />
        </div>
      </Container>

      {/* SOCIAL AND COPYRIGHT */}
      <div className="border-t border-[#38675E] bg-[#0E302B]">
        <Container>
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-center text-[11px] text-[#B8D8CC] sm:text-left">
              © {new Date().getFullYear()} SastaStore.
              All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <a
                href={whatsappChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#C8E5DA] hover:text-[#F5C76A]"
              >
                WhatsApp Channel
              </a>

              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#C8E5DA] hover:text-[#F5C76A]"
              >
                Facebook
              </a>

              <Link
                href="/privacy"
                className="text-[11px] text-[#C8E5DA] hover:text-[#F5C76A]"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="text-[11px] text-[#C8E5DA] hover:text-[#F5C76A]"
              >
                Terms
              </Link>

              <Link
                href="/refund-policy"
                className="text-[11px] text-[#C8E5DA] hover:text-[#F5C76A]"
              >
                Refunds
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* CONTINUOUS MOVING HIGHLIGHTS */}
      <style>{`
        @keyframes sastastore-footer-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .sastastore-footer-track {
          animation: sastastore-footer-scroll
            45s linear infinite;
          will-change: transform;
        }

        .sastastore-footer-track:hover,
        .sastastore-footer-track:focus-within {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .sastastore-footer-track {
            animation: none;
          }

          .sastastore-footer-track > div:last-child {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
}
