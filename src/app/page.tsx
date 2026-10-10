import Link from "next/link";

import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedCategories } from "@/lib/categories";
import { getFeaturedProducts, getPopularProducts } from "@/lib/products";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const benefits = [
  {
    title: "Sasta Pricing",
    description:
      "Premium digital tools and subscriptions at affordable prices.",
  },
  {
    title: "Fast Digital Delivery",
    description:
      "Order details and expected delivery are confirmed directly on WhatsApp.",
  },
  {
    title: "WhatsApp Support",
    description:
      "Ask questions, confirm availability and get help before placing an order.",
  },
  {
    title: "Clear Plan Options",
    description:
      "See available plans, durations and prices before contacting us.",
  },
];

const orderSteps = [
  {
    number: "01",
    title: "Choose your tool",
    description:
      "Browse SastaStore and open the product you want to purchase.",
  },
  {
    number: "02",
    title: "Select a plan",
    description:
      "Choose the plan, duration or package that matches your requirements.",
  },
  {
    number: "03",
    title: "Order on WhatsApp",
    description:
      "Tap the WhatsApp button and your product details will already be included.",
  },
];

export default function Home() {
  const featuredCategories = getFeaturedCategories();

  const featuredProducts = Array.from(
    new Map(
      [...getFeaturedProducts(), ...getPopularProducts()].map((product) => [
        product.slug,
        product,
      ]),
    ).values(),
  ).slice(0, 8);

  const whatsappUrl = createWhatsAppUrl(
    "Hello, I want to know more about SastaStore products and available subscriptions.",
  );

  return (
    <main className="flex-1 bg-background text-foreground">
      {/* Hero */}
      <section className="border-b border-border">
        <Container>
          <div className="py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand">
                SastaStore
              </p>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Premium Digital Tools
                <span className="text-brand"> at Sasta Prices.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Affordable AI tools, premium subscriptions, productivity apps,
                creative software and digital services — all in one place.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/products">
                  Explore Products
                </LinkButton>

                <LinkButton href="/categories" variant="secondary">
                  Browse Categories
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Categories"
            title="Find the tools you need"
            description="Browse SastaStore by category and quickly find the right digital product for your needs."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:bg-surface-elevated"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-elevated text-lg font-bold text-brand">
                  {category.name.charAt(0)}
                </div>

                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {category.description}
                </p>

                <p className="mt-5 text-sm font-medium text-brand">
                  Explore category →
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Products */}
      <Section className="border-t border-border">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Popular"
              title="Featured digital tools"
              description="Some of the most popular tools and subscriptions currently available at SastaStore."
            />

            <Link
              href="/products"
              className="shrink-0 text-sm font-semibold text-brand hover:text-brand-hover"
            >
              View all products →
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Why SastaStore */}
      <Section className="border-t border-border">
        <Container>
          <SectionHeading
            eyebrow="Why SastaStore"
            title="Simple, affordable and easy to order"
            description="We keep the buying process straightforward so you can quickly find the digital tool you need."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                  ✓
                </div>

                <h3 className="mt-5 font-semibold text-foreground">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section className="border-t border-border">
        <Container>
          <SectionHeading
            eyebrow="How It Works"
            title="Order in three simple steps"
            description="No complicated checkout. Pick your product and complete your order directly through WhatsApp."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {orderSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <p className="text-sm font-semibold text-brand">
                  {step.number}
                </p>

                <h3 className="mt-4 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* WhatsApp CTA */}
      <Section className="border-t border-border">
        <Container>
          <div className="rounded-3xl border border-brand/20 bg-surface p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
                Need Help?
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Can&apos;t find the tool you&apos;re looking for?
              </h2>

              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Message SastaStore on WhatsApp and ask about availability,
                plans or any digital service you need.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-brand-hover sm:w-auto lg:mt-0"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
}