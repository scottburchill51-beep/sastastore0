
import Link from "next/link";

import { ProductCatalog } from "@/components/product/ProductCatalog";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Digital Products & Subscriptions | SastaStore",
  description:
    "Browse digital products, AI tools, creative software and premium subscriptions at SastaStore. Compare prices and plans in Pakistan.",
  alternates: {
    canonical: "/products",
  },
};

const highlights = [
  {
    number: "01",
    title: "Browse Digital Tools",
    description:
      "Explore software, subscriptions and useful digital services in one place.",
  },
  {
    number: "02",
    title: "Compare Available Plans",
    description:
      "Review product information and select the subscription plan that suits your needs.",
  },
  {
    number: "03",
    title: "Track Your Order",
    description:
      "Follow payment verification and delivery progress through your account.",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen flex-1 overflow-hidden bg-gradient-to-b from-[#EFF8FF] via-white to-[#ECFDF5] text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-blue-100 py-14 sm:py-20">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              SastaStore Digital Marketplace
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Explore Premium
              <span className="block bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
                Digital Products
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
              Find digital subscriptions, AI tools,
              creative software and productivity
              apps. Search our catalog, compare
              available plans and choose what
              works for you.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#product-catalog"
                className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Browse Products
              </a>

              <Link
                href="/deals"
                className="rounded-xl border border-blue-200 bg-white px-7 py-3.5 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
              >
                Special Deals
              </Link>

              <Link
                href="/categories"
                className="rounded-xl border border-blue-200 bg-white px-7 py-3.5 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
              >
                Categories
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="border-b border-blue-100 bg-white/70 py-10 sm:py-12">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.number}
                className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-extrabold text-blue-700">
                  {item.number}
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Live Supabase Product Catalog */}
      <section
        id="product-catalog"
        className="scroll-mt-24 py-14 sm:py-20"
      >
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Our Product Collection
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Browse All Products
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Discover available products and
                use the search, category and
                sorting options to narrow down
                your choices.
              </p>
            </div>

            <Link
              href="/contact"
              className="rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Need Help?
            </Link>
          </div>

          <ProductCatalog />
        </Container>
      </section>

      {/* Important Shopping Information */}
      <section className="border-y border-blue-100 bg-white/70 py-14">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl border border-blue-100 bg-white p-7 shadow-sm sm:p-10">
            <div className="grid items-center gap-7 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                  Before You Purchase
                </p>

                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  Choose the Right Plan for You
                </h2>

                <p className="mt-4 text-sm leading-8 text-slate-600">
                  Review product descriptions,
                  subscription duration, account
                  requirements and applicable plan
                  conditions before checkout.
                  Payment submissions are reviewed
                  manually, and delivery or activation
                  may require additional processing.
                </p>
              </div>

              <Link
                href="/faq"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-blue-700"
              >
                Read FAQs
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Customer Dashboard */}
      <section className="py-16">
        <Container>
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-white shadow-xl shadow-blue-200/40 sm:p-12">
            <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-100">
                  SastaStore Customer Experience
                </p>

                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  Your Orders, One Convenient Place
                </h2>

                <p className="mt-4 text-sm leading-8 text-blue-50">
                  Access your SastaStore account
                  to review purchases, check order
                  status and view applicable
                  subscription information.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto">
                <Link
                  href="/account"
                  className="rounded-xl bg-white px-6 py-3.5 text-center text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                >
                  My Account
                </Link>

                <Link
                  href="/track"
                  className="rounded-xl border border-white/50 bg-white/10 px-6 py-3.5 text-center text-sm font-extrabold text-white transition hover:bg-white/20"
                >
                  Track an Order
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
