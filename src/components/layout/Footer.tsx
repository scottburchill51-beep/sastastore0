
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

// Example content for the design.
// Replace these with actual customer reviews before presenting
// the section as verified customer testimonials.
const reviews = [
  {
    name: "Ahmad",
    profession: "Video Editor",
    product: "CapCut Pro",
    review:
      "Amazing editing experience! All premium tools and effects make video creation much easier.",
  },
  {
    name: "Ayesha",
    profession: "Graphic Designer",
    product: "Canva Pro",
    review:
      "The premium templates and design resources are really useful for my creative projects.",
  },
  {
    name: "Hamza",
    profession: "Content Creator",
    product: "ChatGPT Plus",
    review:
      "A very useful tool for brainstorming scripts, planning content and improving productivity.",
  },
  {
    name: "Ali",
    profession: "Freelancer",
    product: "HeyGen",
    review:
      "AI video creation is so much easier with professional avatars and creative features.",
  },
  {
    name: "Sana",
    profession: "Social Media Manager",
    product: "Canva Business",
    review:
      "The brand tools and ready-made templates help streamline my social media workflow.",
  },
  {
    name: "Bilal",
    profession: "Video Creator",
    product: "CapCut Pro",
    review:
      "Premium transitions, effects and editing features are excellent for short-form videos.",
  },
  {
    name: "Hira",
    profession: "Student",
    product: "Gemini Pro",
    review:
      "Very helpful for exploring ideas, understanding difficult topics and organising research.",
  },
  {
    name: "Usman",
    profession: "YouTuber",
    product: "ElevenLabs",
    review:
      "The voice generation features are impressive and really useful for narration projects.",
  },
  {
    name: "Fatima",
    profession: "Digital Marketer",
    product: "Canva Pro",
    review:
      "Creating polished social posts and presentation designs feels much faster and easier.",
  },
  {
    name: "Zain",
    profession: "Content Creator",
    product: "Netflix",
    review:
      "A convenient subscription option with a great selection of entertainment content.",
  },
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

function ReviewStars() {
  return (
    <div className="flex items-center gap-1 text-[#F5C76A]">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="m12 2 3.1 6.3 7 1-5.1 5 .9 7-5.9-3.2-5.9 3.2.9-7-5.1-5 7-1L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
}: {
  review: (typeof reviews)[number];
}) {
  return (
    <article className="flex w-[290px] shrink-0 flex-col rounded-2xl border border-[#4B8274] bg-[#205047] p-5 shadow-lg shadow-black/10 sm:w-[340px]">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#6E9C87] bg-[#306458] text-xl font-black text-[#F5C76A]">
          {review.name.charAt(0)}
        </div>

        <div className="min-w-0">
          <h3 className="font-extrabold text-white">
            {review.name}
          </h3>

          <p className="mt-1 text-xs text-[#A7F3D0]">
            {review.profession}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <ReviewStars />
      </div>

      <p className="mt-4 text-xs font-bold text-[#F5C76A]">
        Purchased: {review.product}
      </p>

      <p className="mt-3 flex-1 text-sm leading-7 text-[#E2F2EB]">
        &ldquo;{review.review}&rdquo;
      </p>
    </article>
  );
}

export function Footer() {
  const whatsappSupportUrl = createWhatsAppUrl(
    "Hello SastaStore, I need help with my order, payment or subscription.",
  );

  return (
    <footer className="mt-auto overflow-hidden bg-[#123B35] text-white">
      {/* CUSTOMER SUPPORT BANNER */}
      <div className="border-b border-[#38675E] bg-[#16483F]">
        <Container>
          <div className="flex flex-col items-start justify-between gap-5 py-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#F5C76A]">
                Customer Care
              </p>

              <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">
                Need help with your order?
              </h2>

              <p className="mt-2 text-sm text-[#C8E5DA]">
                Track your purchase or contact our support team.
              </p>
            </div>

            <div className="flex w-full flex-wrap gap-3 sm:w-auto">
              <Link
                href="/track"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F5C76A] px-5 py-3 text-sm font-extrabold text-[#123B35] transition hover:bg-[#FFE09B]"
              >
                Track Order
                <FooterArrow />
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-[#609186] bg-[#205047] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2A6258]"
              >
                Get Support
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* MOVING REVIEW CARDS */}
      <section
        aria-labelledby="footer-review-heading"
        className="border-b border-[#38675E] bg-[#0E302B] py-12"
      >
        <Container>
          <div className="mb-8 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#F5C76A]">
              SastaStore
            </p>

            <h2
              id="footer-review-heading"
              className="mt-2 text-2xl font-extrabold text-white sm:text-3xl"
            >
              Customer Review Examples
            </h2>
          </div>
        </Container>

        <div className="overflow-hidden">
          <div className="sastastore-reviews-track flex w-max">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 gap-4 pr-4"
                aria-hidden={copy === 1}
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
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-16">
          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F5C76A] to-[#DCA447] text-2xl font-black text-[#123B35]">
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
                  className="w-fit text-sm text-[#C8E5DA] transition hover:text-[#F5C76A]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CUSTOMER SUPPORT */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#F5C76A]">
              Customer Support
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {supportLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-[#C8E5DA] transition hover:text-[#F5C76A]"
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
                  className="w-fit text-sm text-[#C8E5DA] transition hover:text-[#F5C76A]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-[#46796F] bg-[#205047] p-5">
              <p className="text-sm font-extrabold text-white">
                Need assistance?
              </p>

              <p className="mt-2 text-xs leading-6 text-[#C8E5DA]">
                Our team can help with orders,
                payments, subscriptions and services.
              </p>

              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#F5C76A] hover:text-[#FFE09B]"
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
                className="rounded-xl border border-[#528578] bg-[#205047] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#2B6459]"
              >
                WhatsApp Channel
              </a>

              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-[#528578] bg-[#205047] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#2B6459]"
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
                className="text-xs text-[#C8E5DA] hover:text-[#F5C76A]"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="text-xs text-[#C8E5DA] hover:text-[#F5C76A]"
              >
                Terms
              </Link>

              <Link
                href="/refund-policy"
                className="text-xs text-[#C8E5DA] hover:text-[#F5C76A]"
              >
                Refunds
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* SMOOTH INFINITE REVIEW SCROLL */}
      <style>{`
        @keyframes sastastore-reviews-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .sastastore-reviews-track {
          animation: sastastore-reviews-scroll
            90s linear infinite;
          will-change: transform;
        }

        .sastastore-reviews-track:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .sastastore-reviews-track {
            animation: none;
          }
        }
      `}</style>
    </footer>
  );
}
