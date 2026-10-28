
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { DealsCatalog } from "@/components/product/DealsCatalog";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Deals & Special Offers | SastaStore",
  description:
    "Discover SastaStore digital subscription deals, real discounts, featured products and popular software subscriptions in Pakistan.",
};

export const dynamic = "force-dynamic";

const whatsappChannelUrl =
  "https://whatsapp.com/channel/0029Vb7BXu2B4hdMiWIlwY1v";

const telegramUrl = "https://t.me/Techboyy0";

export default function DealsPage() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello SastaStore, I would like to know about your latest subscription deals and special offers.",
  );

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#EFF8FF] via-white to-[#ECFDF5] text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-blue-100 py-16 sm:py-24">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />

        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              SastaStore Special Offers
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Premium Digital Tools.
              <span className="block text-blue-600">
                Better Deals.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
              Explore genuine discounts, featured
              subscriptions and popular digital
              products. Find an option that works
              for your needs and budget.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#active-deals"
                className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Explore Deals
              </a>

              <Link
                href="/products"
                className="rounded-xl border border-blue-200 bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
              >
                All Products
              </Link>
            </div>

            <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
              {[
                "Verified Price Comparisons",
                "PKR Subscription Pricing",
                "Order Tracking",
              ].map((label) => (
                <div
                  key={label}
                  className="rounded-2xl border border-blue-100 bg-white/80 px-4 py-4 text-center text-xs font-bold text-slate-700 shadow-sm"
                >
                  <span className="mr-2 text-emerald-600">
                    ✓
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Live Deals */}
      <section
        id="active-deals"
        className="scroll-mt-28 py-14 sm:py-20"
      >
        <Container>
          <DealsCatalog />
        </Container>
      </section>

      {/* How Deals Work */}
      <section className="border-y border-blue-100 bg-white/70 py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              Shop with Clarity
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              How Our Offers Work
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Clear prices, simple checkout and
              customer order tracking.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <article className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 font-extrabold text-blue-700">
                01
              </div>

              <h3 className="mt-5 text-xl font-extrabold">
                Compare Prices
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Review the available product plans.
                When a real discount is configured,
                the original and current prices
                are shown together.
              </p>
            </article>

            <article className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 font-extrabold text-sky-700">
                02
              </div>

              <h3 className="mt-5 text-xl font-extrabold">
                Choose a Plan
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Select your product and plan,
                then complete website checkout
                using the supported payment methods.
              </p>
            </article>

            <article className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 font-extrabold text-emerald-700">
                03
              </div>

              <h3 className="mt-5 text-xl font-extrabold">
                Track Your Order
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Submit your payment evidence
                for review and use your tracking
                ID to check order progress.
              </p>
            </article>
          </div>
        </Container>
      </section>

      {/* Updates and Support */}
      <section className="py-16">
        <Container>
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-white shadow-xl shadow-blue-200/40 sm:p-12">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-100">
                  More Offers & Updates
                </p>

                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  Looking for a Special Offer?
                </h2>

                <p className="mt-4 text-sm leading-8 text-blue-50">
                  Follow our WhatsApp Channel
                  for product announcements or
                  ask our team about the latest
                  available offers.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto">
                <a
                  href={whatsappChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white px-6 py-3.5 text-center text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                >
                  WhatsApp Channel
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/50 bg-white/10 px-6 py-3.5 text-center text-sm font-extrabold text-white transition hover:bg-white/20"
                >
                  Ask About Deals
                </a>

                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/50 bg-white/10 px-6 py-3.5 text-center text-sm font-extrabold text-white transition hover:bg-white/20"
                >
                  Telegram @Techboyy0
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
