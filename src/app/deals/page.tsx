import Link from "next/link";

import { Reveal } from "@/components/common/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProducts, getPopularProducts } from "@/lib/products";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Deals & Popular Tools | SastaStore",
  description:
    "Explore SastaStore deals, popular digital tools, premium subscriptions and featured products.",
};

export default function DealsPage() {
  const products = Array.from(
    new Map(
      [...getFeaturedProducts(), ...getPopularProducts()].map((product) => [
        product.slug,
        product,
      ]),
    ).values(),
  );

  const dealProducts = products.filter((product) =>
    product.plans.some(
      (plan) =>
        typeof plan.originalPrice === "number" &&
        plan.originalPrice > plan.price,
    ),
  );

  const regularProducts = products.filter(
    (product) =>
      !dealProducts.some(
        (dealProduct) => dealProduct.slug === product.slug,
      ),
  );

  const whatsappUrl = createWhatsAppUrl(
    "Hello, I want to know about the latest SastaStore deals and discounted digital products.",
  );

  const whatsappChannelUrl =
    "https://whatsapp.com/channel/0029Vb7BXu2B4hdMiWIlwY1v";

  return (
    <main className="flex-1 overflow-hidden bg-background text-foreground">
      {/* Hero */}
      <Section>
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-surface p-7 sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />

            <Reveal>
              <div className="relative max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  <span className="status-dot h-2 w-2 rounded-full bg-brand" />
                  SastaStore Deals
                </div>

                <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Premium tools at even better prices.
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Browse current discounted products, featured subscriptions
                  and some of the most popular digital tools available at
                  SastaStore.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover"
                  >
                    Ask About Latest Deals
                  </a>

                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-surface-elevated px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:text-brand"
                  >
                    Browse All Products
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Active Deals */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Current Offers"
                title="Deals available right now"
                description="Only products with an actual configured discount are shown in this section."
              />

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
                <span className="status-dot h-2 w-2 rounded-full bg-brand" />
                {dealProducts.length} Active Deal
                {dealProducts.length === 1 ? "" : "s"}
              </div>
            </div>
          </Reveal>

          {dealProducts.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {dealProducts.map((product, index) => (
                <Reveal
                  key={product.slug}
                  delay={(index % 4) * 70}
                  className="h-full"
                >
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mt-10 rounded-3xl border border-brand/15 bg-brand/5 p-7 text-center sm:p-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-xl text-brand">
                  %
                </div>

                <h2 className="mt-5 text-xl font-semibold">
                  New deals are coming
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                  There are no separately marked discounted offers at the
                  moment. Follow our WhatsApp Channel to receive new deal and
                  product updates.
                </p>

                <a
                  href={whatsappChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover"
                >
                  Follow WhatsApp Channel
                  <span>↗</span>
                </a>
              </div>
            </Reveal>
          )}
        </Container>
      </Section>

      {/* Popular Products */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Popular Picks"
              title="Customer-favorite digital tools"
              description="Explore popular and featured products currently available through SastaStore."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(regularProducts.length > 0
              ? regularProducts
              : products
            ).map((product, index) => (
              <Reveal
                key={product.slug}
                delay={(index % 4) * 70}
                className="h-full"
              >
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Deal Updates */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-surface p-7 sm:p-9 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />

              <div className="relative max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  Deal Updates
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Don&apos;t miss new SastaStore offers.
                </h2>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Follow our official WhatsApp Channel for new products,
                  discounts, availability updates and announcements.
                </p>
              </div>

              <div className="relative mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
                <a
                  href={whatsappChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover"
                >
                  Follow WhatsApp Channel
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-surface-elevated px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:text-brand"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}