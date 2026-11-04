
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

// These are illustrative review examples, not verified
// customer testimonials. Replace with real customer
// feedback before labelling them as actual reviews.
const reviews = [
  {
    name: "Ahmad",
    profession: "Video Editor",
    product: "CapCut Pro",
    review: "Great tools for editing videos.",
  },
  {
    name: "Ayesha",
    profession: "Graphic Designer",
    product: "Canva Pro",
    review: "Helpful templates for my designs.",
  },
  {
    name: "Hamza",
    profession: "Content Creator",
    product: "ChatGPT Plus",
    review: "Useful for planning and writing.",
  },
  {
    name: "Ali",
    profession: "Freelancer",
    product: "HeyGen",
    review: "Makes AI video creation easier.",
  },
  {
    name: "Sana",
    profession: "Social Media Manager",
    product: "Canva Business",
    review: "Excellent branding features.",
  },
  {
    name: "Bilal",
    profession: "Video Creator",
    product: "CapCut Pro",
    review: "Really useful editing features.",
  },
  {
    name: "Hira",
    profession: "Student",
    product: "Gemini Pro",
    review: "Helpful for research and ideas.",
  },
  {
    name: "Usman",
    profession: "YouTuber",
    product: "ElevenLabs",
    review: "Useful voice generation tools.",
  },
  {
    name: "Fatima",
    profession: "Digital Marketer",
    product: "Canva Pro",
    review: "Makes content design much easier.",
  },
  {
    name: "Zain",
    profession: "Content Creator",
    product: "Netflix",
    review: "A convenient entertainment option.",
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

function ReviewCard({
  review,
}: {
  review: (typeof reviews)[number];
}) {
  return (
    <div className="flex w-[210px] shrink-0 items-start gap-2.5 rounded-xl border border-[#427467] bg-[#205047] p-3 sm:w-[250px]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#32695C] text-sm font-black text-[#F5C76A]">
        {review.name.charAt(0)}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-extrabold text-white">
          {review.name}
        </p>

        <p className="mt-0.5 truncate text-[10px] text-[#ACD9C7]">
          {review.profession}
        </p>

        <p className="mt-1.5 text-[11px] font-bold text-[#F5C76A]">
          {review.product}
        </p>

        <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[#DFEEE7]">
          {review.review}
        </p>
      </div>
    </div>
  );
}

export function Footer() {
  const whatsappSupportUrl = createWhatsAppUrl(
    "Hello SastaStore, I need help with my order, payment or subscription.",
  );

  return (
    <footer className="mt-auto overflow-hidden bg-[#123B35] text-white">
      {/* COMPACT REVIEW STRIP */}
      <section
        aria-labelledby="footer-reviews-heading"
        className="border-b border-[#38675E] bg-[#0E302B] py-5"
      >
        <Container>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2
              id="footer-reviews-heading"
              className="text-sm font-extrabold text-white sm:text-base"
            >
              Customer Review Examples
            </h2>

            <span className="text-[10px] font-medium text-[#B8D8CC]">
              Illustrative feedback
            </span>
          </div>
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
                {reviews.map((review, index) => (
                  <ReviewCard
                    key={`${copy}-${index}`}
                    review={review}
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
            65s linear infinite;
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
