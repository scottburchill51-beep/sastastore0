
import Link from "next/link";

import { BrandLogoMarquee } from "@/components/product/BrandLogoMarquee";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "SastaStore | Your Digital World, Upgraded",
  description:
    "Shop digital subscriptions, AI tools, creative software and online services in Pakistan. Discover SastaStore products, deals and easy order tracking.",
};

const orderSteps = [
  {
    number: "01",
    title: "Explore & Choose",
    description:
      "Browse our digital catalog and select the product and plan that suit your needs.",
  },
  {
    number: "02",
    title: "Complete Checkout",
    description:
      "Sign in, enter your details and follow the available bank transfer payment instructions.",
  },
  {
    number: "03",
    title: "Submit Payment Proof",
    description:
      "Provide the transaction reference and screenshot for manual payment review.",
  },
  {
    number: "04",
    title: "Track & Receive",
    description:
      "Follow your order status while delivery or subscription activation is arranged.",
  },
];

function ArrowIcon() {
  return (
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen flex-1 overflow-hidden bg-[#F8FBFF] text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F0F8FF] to-[#E5FAF4]">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />

        <Container>
          <div className="relative mx-auto max-w-5xl pb-16 pt-20 text-center sm:pb-24 sm:pt-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Your Digital Marketplace
            </span>

            <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Everything Digital.
              <span className="mt-3 block bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
                One Smart Store.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-slate-600 sm:text-lg">
              Discover premium digital subscriptions,
              AI tools, creative apps and productivity
              software. Compare plans, shop online and
              track your orders with SastaStore.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#explore-products"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Explore Products
                <ArrowIcon />
              </a>

              <Link
                href="/deals"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-white px-8 py-3.5 text-sm font-extrabold text-blue-700 shadow-sm hover:bg-blue-50"
              >
                View Special Deals
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* MOVING BRAND LOGOS */}
      <BrandLogoMarquee />

      {/* CATEGORY NAVIGATION */}
      <section className="bg-white py-9">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                Looking for a Specific Category?
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Explore digital tools and subscriptions by category.
              </p>
            </div>

            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
            >
              Browse Categories
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </section>

      {/* DEALS PROMO */}
      <section className="border-y border-blue-100 bg-white py-14">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-white sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

            <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-100">
                  SastaStore Deals
                </p>

                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  Discover Better Digital Deals
                </h2>

                <p className="mt-4 text-sm leading-8 text-blue-50">
                  Explore special offers, featured
                  subscriptions and popular tools.
                  Any displayed discounts are based
                  on configured product prices.
                </p>
              </div>

              <Link
                href="/deals"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 hover:bg-blue-50"
              >
                Explore Deals
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ORIGINAL PRODUCT GRID */}
      <section
        id="explore-products"
        className="scroll-mt-24 bg-gradient-to-b from-[#F8FBFF] to-white py-16 sm:py-20"
      >
        <Container>
          <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
            Live Digital Collection
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Discover Your Next Favourite Tool
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600">
            Browse our live digital catalog,
            search products, compare available
            plans and discover current pricing.
          </p>

          <ProductCatalog />
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="scroll-mt-24 border-y border-blue-100 bg-[#EFF8FF] py-16 sm:py-20"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
              Simple Shopping Process
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              How SastaStore Works
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              From choosing a product to tracking
              your order, everything is designed
              to be straightforward.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {orderSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-sm font-extrabold text-blue-700">
                  {step.number}
                </div>

                <h3 className="mt-5 text-lg font-extrabold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-blue-200 bg-white p-5 text-center">
            <p className="text-sm leading-7 text-slate-600">
              Payments are reviewed manually.
              Digital delivery and subscription
              activation may require additional processing.
            </p>
          </div>
        </Container>
      </section>

      {/* ACCOUNT AND TRACKING */}
      <section className="border-y border-blue-100 bg-gradient-to-r from-sky-50 to-emerald-50 py-16">
        <Container>
          <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                Customer Dashboard
              </p>

              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                Your Orders, All in One Place
              </h2>

              <p className="mt-4 text-sm leading-8 text-slate-600">
                Sign in to review your orders,
                check payment and delivery status,
                and see available subscription dates.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto">
              <Link
                href="/account"
                className="rounded-xl bg-blue-600 px-6 py-3.5 text-center text-sm font-extrabold text-white hover:bg-blue-700"
              >
                My Account
              </Link>

              <Link
                href="/track"
                className="rounded-xl border border-blue-200 bg-white px-6 py-3.5 text-center text-sm font-extrabold text-blue-700 hover:bg-blue-50"
              >
                Track My Order
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-[#E8F3FF] to-[#DFFAF1] px-7 py-14 text-center sm:px-12 sm:py-20">
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-700">
              SastaStore 2.0
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
              Your Next Digital Upgrade Starts Here
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-slate-600 sm:text-base">
              Better tools, clear plan information
              and a convenient digital shopping experience.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-extrabold text-white hover:bg-blue-700"
              >
                Browse All Products
                <ArrowIcon />
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-blue-200 bg-white px-7 py-3.5 text-sm font-extrabold text-blue-700 hover:bg-blue-50"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
