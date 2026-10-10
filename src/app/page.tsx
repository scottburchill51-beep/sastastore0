import Image from "next/image";
import Link from "next/link";

import { CategoryIcon } from "@/components/common/CategoryIcon";
import { Reveal } from "@/components/common/Reveal";
import { ShowreelVideo } from "@/components/media/ShowreelVideo";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedCategories } from "@/lib/categories";
import {
  getFeaturedProducts,
  getPopularProducts,
} from "@/lib/products";
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

const reviews = [
  {
    src: "/reviews/review-01.jpg",
    width: 702,
    height: 1600,
    name: "Kashif",
    quote: "I have trusted too you ❤️",
  },
  {
    src: "/reviews/review-02.jpg",
    width: 540,
    height: 1230,
    name: "E-commerce With Abdullah",
    quote: "Very good service bro keep it up 👍",
  },
  {
    src: "/reviews/review-03.jpg",
    width: 662,
    height: 880,
    name: "Ahtasham",
    quote: "You are the most trusted guy ever i found in this market ❤️",
  },
  {
    src: "/reviews/review-04.jpg",
    width: 504,
    height: 710,
    name: "Customer",
    quote:
      "Fantastic job! I needed a UK TikTok account and they delivered exactly what I asked for. The setup was smooth and the account is ready to go.",
  },
  {
    src: "/reviews/review-05.jpg",
    width: 504,
    height: 530,
    name: "Aizen",
    quote:
      "Thank you bro bht achi service dete hai ap bht trusted work hai apka mjai bht Pasand Aya.",
  },
  {
    src: "/reviews/review-06.jpg",
    width: 504,
    height: 590,
    name: "Customer",
    quote:
      "Thankyou Soo Much brother love you 101% trasted koi scam wala seen nahi h bro love you 101% satisfied ❤️",
  },
];

const digitalServices = [
  {
    short: "VE",
    title: "Video Editing",
    description:
      "Professional video editing for social media, advertisements, reels, shorts and other digital content.",
  },
  {
    short: "GD",
    title: "Graphic Designing",
    description:
      "Creative graphics, social media posts, banners, thumbnails and other custom design work.",
  },
  {
    short: "SH",
    title: "Shopify Store Designing",
    description:
      "Professional Shopify store setup and design built around your products and brand.",
  },
  {
    short: "WD",
    title: "Website Development",
    description:
      "Modern, responsive websites for businesses, brands, stores and online services.",
  },
  {
    short: "AD",
    title: "Agency Ad Accounts",
    description:
      "Contact us to discuss available agency advertising account services and requirements.",
  },
  {
    short: "DS",
    title: "Other Digital Services",
    description:
      "Need something that is not listed? Message us and tell us what digital service you need.",
  },
];

export default function Home() {
  const featuredCategories = getFeaturedCategories();

  const featuredProducts = Array.from(
    new Map(
      [...getFeaturedProducts(), ...getPopularProducts()].map(
        (product) => [product.slug, product],
      ),
    ).values(),
  ).slice(0, 8);

  const whatsappUrl = createWhatsAppUrl(
    "Hello, I want to know more about SastaStore products and available subscriptions.",
  );

  const digitalServicesWhatsappUrl = createWhatsAppUrl(
    "Hello, I need a digital service from SastaStore. Please share more details with me.",
  );

  const facebookUrl =
    "https://www.facebook.com/share/1cbKHVxxJi/";

  return (
    <main className="flex-1 overflow-hidden bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand/5 blur-3xl" />

        <Container>
          <div className="relative py-20 sm:py-24 lg:py-28">
            <Reveal>
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1.5">
                  <span className="status-dot h-2 w-2 rounded-full bg-brand" />

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                    SastaStore
                  </p>
                </div>

                <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Premium Digital Tools
                  <span className="text-brand">
                    {" "}
                    at Sasta Prices.
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Affordable AI tools, premium subscriptions, productivity
                  apps, creative software and digital services — all in one
                  place.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <LinkButton href="/products">
                    Explore Products
                  </LinkButton>

                  <LinkButton
                    href="/categories"
                    variant="secondary"
                  >
                    Browse Categories
                  </LinkButton>
                </div>

                <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-brand">✓</span>
                    Digital Delivery
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-brand">✓</span>
                    WhatsApp Support
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-brand">✓</span>
                    Clear Pricing
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Categories"
              title="Find the tools you need"
              description="Browse SastaStore by category and quickly find the right digital product for your needs."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCategories.map((category, index) => (
              <Reveal
                key={category.slug}
                delay={index * 80}
                className="h-full"
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:bg-surface-elevated hover:shadow-2xl hover:shadow-black/20"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand/5 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="premium-icon relative flex h-12 w-12 items-center justify-center rounded-xl border border-brand/15 bg-brand/10 text-brand">
                    <CategoryIcon slug={category.slug} />
                  </div>

                  <h3 className="relative mt-5 text-lg font-semibold text-foreground">
                    {category.name}
                  </h3>

                  <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>

                  <p className="relative mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand">
                    Explore category

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Products */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Popular"
                title="Featured digital tools"
                description="Some of the most popular tools and subscriptions currently available at SastaStore."
              />

              <Link
                href="/products"
                className="shrink-0 text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
              >
                View all products →
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product, index) => (
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

      {/* Customer Reviews */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Customer Reviews"
                title="Trusted by real customers"
                description="Real feedback shared by customers after using SastaStore products and services."
              />

              <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
                <span className="status-dot h-2 w-2 rounded-full bg-brand" />
                Real Customer Feedback
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Swipe or scroll to see more reviews
              </p>

              <span className="text-sm font-medium text-brand">
                Scroll →
              </span>
            </div>
          </Reveal>

          <div className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5">
            {reviews.map((review, index) => (
              <Reveal
                key={review.src}
                delay={(index % 3) * 80}
                className="min-w-[86%] snap-start sm:min-w-[410px] lg:min-w-[calc((100%-2.5rem)/3)]"
              >
                <article className="group premium-card flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
                  <a
                    href={review.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block overflow-hidden border-b border-border bg-surface-elevated"
                  >
                    <Image
                      src={review.src}
                      alt={`${review.name} SastaStore customer review`}
                      width={review.width}
                      height={review.height}
                      className="h-[390px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025] sm:h-[430px]"
                      sizes="(max-width: 640px) 86vw, (max-width: 1024px) 410px, 33vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-50" />

                    <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                      View Screenshot ↗
                    </div>
                  </a>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand/20 bg-brand/10 text-sm font-bold text-brand">
                        {review.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-foreground">
                          {review.name}
                        </p>

                        <p className="mt-0.5 text-xs text-brand">
                          ✓ Customer Feedback
                        </p>
                      </div>
                    </div>

                    <blockquote className="mt-5 text-sm leading-7 text-muted-foreground">
                      “{review.quote}”
                    </blockquote>

                    <div className="mt-auto pt-5">
                      <div className="h-px bg-border transition-colors duration-300 group-hover:bg-brand/25" />

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Shared via customer chat
                        </span>

                        <span className="text-lg text-brand">
                          ★
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Digital Services */}
      <Section className="relative overflow-hidden border-t border-border">
        <div className="pointer-events-none absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-brand/5 blur-3xl" />

        <Container>
          <Reveal>
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Digital Services"
                title="More than just digital tools"
                description="Need professional digital work for your business, brand or online project? SastaStore also provides a range of digital services."
              />

              <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
                <span className="status-dot h-2 w-2 rounded-full bg-brand" />
                Custom Projects Welcome
              </div>
            </div>
          </Reveal>

          <div className="relative mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {digitalServices.map((service, index) => (
              <Reveal
                key={service.title}
                delay={(index % 3) * 80}
                className="h-full"
              >
                <div className="group premium-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-sm font-bold text-brand transition-all duration-300 group-hover:scale-110 group-hover:border-brand/40">
                    {service.short}
                  </div>

                  <h3 className="relative mt-5 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-brand">
                    {service.title}
                  </h3>

                  <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="relative mt-auto pt-6">
                    <a
                      href={digitalServicesWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
                    >
                      Ask on WhatsApp

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>

                  <div className="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Digital Services CTA */}
          <Reveal>
            <div className="relative mt-8 overflow-hidden rounded-3xl border border-brand/20 bg-surface p-7 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />

              <div className="relative max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  Need Something Else?
                </p>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Tell us what digital service you need.
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  If your required service is not listed above, message us on
                  WhatsApp with your requirements and we&apos;ll discuss the
                  available options with you.
                </p>
              </div>

              <div className="relative mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
                <a
                  href={digitalServicesWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover"
                >
                  Message on WhatsApp
                </a>

                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-elevated px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:text-brand"
                >
                  Visit Facebook Page
                  <span>↗</span>
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ShowreelVideo />

      {/* Why SastaStore */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why SastaStore"
              title="Simple, affordable and easy to order"
              description="We keep the buying process straightforward so you can quickly find the digital tool you need."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.title}
                delay={index * 70}
                className="h-full"
              >
                <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:bg-surface-elevated">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/20 bg-brand/10 text-sm font-bold text-brand transition-transform duration-300 group-hover:scale-110">
                    ✓
                  </div>

                  <h3 className="mt-5 font-semibold text-foreground">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How It Works"
              title="Order in three simple steps"
              description="No complicated checkout. Pick your product and complete your order directly through WhatsApp."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {orderSteps.map((step, index) => (
              <Reveal
                key={step.number}
                delay={index * 100}
                className="h-full"
              >
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-brand/25 hover:bg-surface-elevated">
                  <p className="text-sm font-semibold text-brand">
                    {step.number}
                  </p>

                  <h3 className="mt-4 text-lg font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>

                  <div className="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* WhatsApp CTA */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-surface p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />

              <div className="relative max-w-2xl">
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
                className="relative mt-7 inline-flex w-full items-center justify-center rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/10 sm:w-auto lg:mt-0"
              >
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}