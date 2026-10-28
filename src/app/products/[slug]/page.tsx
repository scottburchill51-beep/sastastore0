
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { ProductCard } from "@/components/product/ProductCard";
import { ProductLogo } from "@/components/product/ProductLogo";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { backend, getSession } from "@/lib/store-backend";
import type { Product } from "@/types/product";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

type ProductRow = {
  payload: Product;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const availabilityMap = {
  available: "https://schema.org/InStock",
  limited: "https://schema.org/LimitedAvailability",
  "out-of-stock": "https://schema.org/OutOfStock",
} as const;

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 2,
  }).format(value);
}

function getDiscount(
  priceValue: number,
  originalPriceValue: number | null | undefined,
) {
  const price = Number(priceValue);
  const originalPrice = Number(originalPriceValue);

  if (
    originalPriceValue == null ||
    !Number.isFinite(price) ||
    !Number.isFinite(originalPrice) ||
    price <= 0 ||
    originalPrice <= price
  ) {
    return null;
  }

  return {
    originalPrice,
    savings: originalPrice - price,
    percent: Math.round(
      ((originalPrice - price) / originalPrice) * 100,
    ),
  };
}

const getCurrentProducts = cache(
  async (): Promise<Product[]> => {
    const response = await backend(
      "/rest/v1/store_products?select=payload&order=created_at.desc",
      { method: "GET" },
    );

    if (!response.ok) {
      console.error(
        "Supabase product read failed:",
        response.status,
      );

      throw new Error(
        "Unable to load the current product catalog",
      );
    }

    const rows: unknown = await response.json();

    if (!Array.isArray(rows)) {
      throw new Error("Invalid product catalog response");
    }

    return (rows as ProductRow[])
      .map((row) => row?.payload)
      .filter(
        (product): product is Product =>
          product !== null &&
          typeof product === "object" &&
          typeof product.slug === "string" &&
          typeof product.name === "string" &&
          Array.isArray(product.plans),
      );
  },
);

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await getCurrentProducts();

  const product = products.find(
    (item) => item.slug === slug,
  );

  if (!product) {
    return {
      title: "Product Not Found | SastaStore",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = `${siteConfig.url}/products/${product.slug}`;

  const title =
    product.seo?.title ||
    `${product.name} | SastaStore`;

  const description =
    product.seo?.description ||
    product.shortDescription ||
    product.description;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: `${siteConfig.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${product.name} - SastaStore`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}/opengraph-image`],
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const products = await getCurrentProducts();

  const product = products.find(
    (item) => item.slug === slug,
  );

  if (!product) {
    notFound();
  }

  const { user } = await getSession();

  const productUrl =
    `${siteConfig.url}/products/${product.slug}`;

  const logo = product.logo || "/favicon.ico";

  const productImage = logo.startsWith("http")
    ? logo
    : `${siteConfig.url}${
        logo.startsWith("/") ? "" : "/"
      }${logo}`;

  const relatedProducts = [
    ...products.filter(
      (item) =>
        item.slug !== product.slug &&
        item.category === product.category,
    ),
    ...products.filter(
      (item) =>
        item.slug !== product.slug &&
        item.category !== product.category,
    ),
  ].slice(0, 4);

  const isOutOfStock =
    product.availability === "out-of-stock";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: productImage,
    category: product.category,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    sku: product.slug,
    offers: product.plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      url: productUrl,
      priceCurrency: "PKR",
      price: plan.price,
      availability:
        availabilityMap[product.availability],
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${siteConfig.url}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  const faqItems = [
    {
      question: `How do I order ${product.name}?`,
      answer:
        "Choose a plan, sign in and complete website checkout. Submit the required payment details and evidence for review.",
    },
    {
      question: "When will my subscription be activated?",
      answer:
        "Payment must be verified before delivery or activation. Processing time depends on the selected product and plan.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes. Sign in to your SastaStore account and use your tracking ID to view the available order status.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const structuredData = [
    productJsonLd,
    breadcrumbJsonLd,
    faqJsonLd,
  ];

  return (
    <main className="min-h-screen flex-1 overflow-hidden bg-gradient-to-b from-[#EFF8FF] via-white to-[#ECFDF5] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      {/* Breadcrumb */}
      <section className="border-b border-blue-100 bg-white/80">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 py-5 text-sm"
          >
            <Link
              href="/"
              className="text-slate-500 hover:text-blue-600"
            >
              Home
            </Link>

            <span className="text-slate-300">/</span>

            <Link
              href="/products"
              className="text-slate-500 hover:text-blue-600"
            >
              Products
            </Link>

            <span className="text-slate-300">/</span>

            <span className="font-semibold text-blue-700">
              {product.name}
            </span>
          </nav>
        </Container>
      </section>

      {/* Product Overview and Plans */}
      <section className="relative py-12 sm:py-20">
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />

        <Container>
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            {/* Left: Product Information */}
            <div className="min-w-0">
              <article className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-emerald-50 p-7 shadow-sm sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-h-28 min-w-28 items-center justify-center rounded-3xl border border-blue-100 bg-white p-5 shadow-sm">
                    <ProductLogo
                      name={product.name}
                      logo={logo}
                      size="large"
                    />
                  </div>

                  {product.badge && (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-extrabold text-emerald-700">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="mt-9">
                  <Link
                    href={`/categories/${product.category}`}
                    className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold capitalize text-blue-700 transition hover:border-blue-300"
                  >
                    {product.category.replace(/-/g, " ")}
                  </Link>

                  <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
                    {product.name}
                  </h1>

                  {product.shortDescription && (
                    <p className="mt-4 text-base font-semibold leading-7 text-blue-700">
                      {product.shortDescription}
                    </p>
                  )}

                  <p className="mt-5 whitespace-pre-line text-sm leading-8 text-slate-600 sm:text-base">
                    {product.description}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold text-blue-700">
                    Digital Product
                  </span>

                  <span className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-bold text-emerald-700">
                    Digital Delivery
                  </span>

                  <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600">
                    {product.plans.length}{" "}
                    {product.plans.length === 1
                      ? "Plan"
                      : "Plans"}
                  </span>

                  {isOutOfStock && (
                    <span className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700">
                      Currently Unavailable
                    </span>
                  )}
                </div>
              </article>

              {/* Features */}
              {product.features?.length > 0 && (
                <section className="mt-7 rounded-3xl border border-blue-100 bg-white p-7 shadow-sm sm:p-9">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                    Product Features
                  </p>

                  <h2 className="mt-3 text-2xl font-extrabold">
                    What You Get
                  </h2>

                  <ul className="mt-7 space-y-3">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                          ✓
                        </span>

                        <span className="text-sm leading-7 text-slate-600">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <Link
                href="/products"
                className="mt-7 inline-flex items-center rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                ← Back to Products
              </Link>
            </div>

            {/* Right: Pricing */}
            <div className="min-w-0">
              <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/30 sm:p-8">
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                  Plans & Pricing
                </p>

                <h2 className="mt-3 text-3xl font-extrabold">
                  Choose Your Plan
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Review the plan duration, price and
                  applicable conditions before checkout.
                </p>

                {product.plans.length > 0 ? (
                  <div className="mt-8 space-y-4">
                    {product.plans.map((plan) => {
                      const discount = getDiscount(
                        Number(plan.price),
                        plan.originalPrice,
                      );

                      const checkoutPath =
                        `/checkout?product=${encodeURIComponent(
                          product.slug,
                        )}` +
                        `&plan=${encodeURIComponent(
                          String(plan.id),
                        )}`;

                      const buyNowHref = user
                        ? checkoutPath
                        : `/login?next=${encodeURIComponent(
                            checkoutPath,
                          )}`;

                      return (
                        <article
                          key={plan.id}
                          className="overflow-hidden rounded-2xl border border-blue-100 bg-[#F8FBFF] p-5 transition hover:border-blue-300 hover:shadow-md sm:p-6"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              <h3 className="text-lg font-extrabold">
                                {plan.name}
                              </h3>

                              {plan.duration && (
                                <p className="mt-2 text-sm text-slate-500">
                                  {plan.duration}
                                </p>
                              )}

                              {discount && (
                                <span className="mt-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-700">
                                  {discount.percent}% OFF
                                </span>
                              )}
                            </div>

                            <div className="text-right">
                              {discount && (
                                <p className="text-xs text-slate-400 line-through">
                                  Rs.{" "}
                                  {formatPrice(
                                    discount.originalPrice,
                                  )}
                                </p>
                              )}

                              <p className="mt-1 text-2xl font-extrabold text-blue-600">
                                Rs.{" "}
                                {formatPrice(
                                  Number(plan.price),
                                )}
                              </p>

                              <p className="text-xs text-slate-500">
                                PKR
                              </p>
                            </div>
                          </div>

                          {discount && (
                            <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                              <p className="text-sm font-bold text-emerald-700">
                                You save Rs.{" "}
                                {formatPrice(
                                  discount.savings,
                                )}
                              </p>
                            </div>
                          )}

                          {isOutOfStock ? (
                            <div className="mt-6 flex min-h-12 items-center justify-center rounded-xl bg-slate-200 px-5 py-3 text-sm font-bold text-slate-600">
                              Currently Unavailable
                            </div>
                          ) : (
                            <Link
                              href={buyNowHref}
                              className="mt-6 flex min-h-12 items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700"
                            >
                              Buy Now
                              <span aria-hidden="true">
                                →
                              </span>
                            </Link>
                          )}

                          {!isOutOfStock && (
                            <p className="mt-3 text-center text-xs text-slate-500">
                              {user
                                ? "Continue to checkout"
                                : "Sign in to complete your purchase"}
                            </p>
                          )}
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-7 rounded-xl border border-blue-100 bg-blue-50 p-6 text-center">
                    <p className="text-sm font-semibold text-slate-700">
                      No plans are currently listed.
                    </p>
                  </div>
                )}

                {/* Delivery */}
                <div className="mt-8 border-t border-blue-100 pt-7">
                  <h3 className="text-lg font-extrabold">
                    Delivery Information
                  </h3>

                  <p className="mt-3 whitespace-pre-line text-sm leading-8 text-slate-600">
                    {product.deliveryInfo ||
                      "Digital delivery or activation is arranged after payment verification. Timing depends on the product."}
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                  <h3 className="font-extrabold text-emerald-900">
                    Need Help Choosing?
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-emerald-800">
                    Contact our team if you have
                    questions about plans,
                    compatibility or delivery.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-4 inline-flex text-sm font-extrabold text-emerald-800 underline underline-offset-4"
                  >
                    Contact Support →
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </section>

      {/* How Ordering Works */}
      <section className="border-y border-blue-100 bg-white/70 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
              Ordering Process
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Simple Steps to Get Started
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              From plan selection to delivery,
              you can follow your order progress.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Choose a Plan",
                description:
                  "Review the product details and choose your preferred subscription.",
              },
              {
                number: "02",
                title: "Checkout & Payment",
                description:
                  "Sign in, follow the payment instructions and submit payment evidence for review.",
              },
              {
                number: "03",
                title: "Verification & Delivery",
                description:
                  "Track the order while payment is reviewed and delivery or activation is arranged.",
              },
            ].map((step) => (
              <article
                key={step.number}
                className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm"
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
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/track"
              className="inline-flex rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
            >
              Track Your Order
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-center text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              Common Questions
            </p>

            <h2 className="mt-3 text-center text-3xl font-extrabold sm:text-4xl">
              Product FAQs
            </h2>

            <div className="mt-9 space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-sm font-bold [&::-webkit-details-marker]:hidden">
                    {item.question}

                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg text-blue-600 transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>

                  <p className="border-t border-blue-50 px-5 py-5 text-sm leading-8 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-blue-100 bg-white/70 py-16 sm:py-20">
          <Container>
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                  Discover More
                </p>

                <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                  You May Also Like
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Explore other digital products
                  available through SastaStore.
                </p>
              </div>

              <Link
                href="/products"
                className="text-sm font-extrabold text-blue-600 hover:underline"
              >
                View All Products →
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.slug}
                  product={item}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Bottom Support */}
      <section className="py-14">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-white sm:p-10 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-extrabold">
                Questions Before Ordering?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-blue-50">
                Our support team can help you
                understand product details,
                plan options and ordering.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-blue-700 hover:bg-blue-50"
              >
                Contact Support
              </Link>

              <Link
                href="/refund-policy"
                className="rounded-xl border border-white/50 bg-white/10 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/20"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
