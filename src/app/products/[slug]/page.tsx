
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { ProductCard } from "@/components/product/ProductCard";
import { ProductLogo } from "@/components/product/ProductLogo";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import type { Product } from "@/types/product";
import { backend, getSession } from "@/lib/store-backend";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProductRow = {
  payload: Product;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

const availabilityMap = {
  available: "https://schema.org/InStock",
  limited: "https://schema.org/LimitedAvailability",
  "out-of-stock": "https://schema.org/OutOfStock",
} as const;

// Load fresh products from Supabase.
// Never fall back to outdated static prices.
const getCurrentProducts = cache(
  async (): Promise<Product[]> => {
    const response = await backend(
      "/rest/v1/store_products?select=payload&order=created_at.desc",
      { method: "GET" },
    );

    if (!response.ok) {
      console.error(
        "Supabase catalog read failed:",
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

  const url =
    `${siteConfig.url}/products/${product.slug}`;

  return {
    title: product.seo?.title || `${product.name} | SastaStore`,
    description:
      product.seo?.description ||
      product.shortDescription ||
      product.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title:
        product.seo?.title ||
        `${product.name} | SastaStore`,
      description:
        product.seo?.description ||
        product.shortDescription ||
        product.description,
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
      title:
        product.seo?.title ||
        `${product.name} | SastaStore`,
      description:
        product.seo?.description ||
        product.shortDescription ||
        product.description,
      images: [
        `${siteConfig.url}/opengraph-image`,
      ],
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
    : `${siteConfig.url}${logo.startsWith("/") ? "" : "/"}${logo}`;

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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How do I order ${product.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Choose a plan, sign in, and complete payment through the secure checkout.",
        },
      },
      {
        "@type": "Question",
        name: `Is ${product.name} always available?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Availability depends on the product and selected plan.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen flex-1 bg-[#F8FAFC] text-slate-900">
      {/* Product structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd,
          ).replace(/</g, "\\u003c"),
        }}
      />

      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      {/* Breadcrumb */}
      <section className="border-b border-blue-100 bg-white">
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

            <span className="font-semibold text-blue-600">
              {product.name}
            </span>
          </nav>
        </Container>
      </section>

      {/* Main Product Section */}
      <section className="relative overflow-hidden py-12 sm:py-20">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />

        <Container>
          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            {/* Product Information */}
            <div>
              <div className="rounded-[30px] border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-emerald-50 p-7 shadow-sm sm:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-h-28 min-w-28 items-center justify-center rounded-3xl border border-blue-100 bg-white p-5 shadow-sm">
                    <ProductLogo
                      name={product.name}
                      logo={logo}
                      size="large"
                    />
                  </div>

                  {product.badge ? (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                      {product.badge}
                    </span>
                  ) : null}
                </div>

                <div className="mt-10">
                  <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-semibold capitalize text-blue-700">
                    {product.category.replace(
                      /-/g,
                      " ",
                    )}
                  </span>

                  <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    {product.name}
                  </h1>

                  <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                    {product.description}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-semibold text-blue-700">
                    Digital Product
                  </span>

                  <span className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold text-emerald-700">
                    Online Delivery
                  </span>

                  <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
                    {product.plans.length} Plan
                    {product.plans.length === 1
                      ? ""
                      : "s"}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-xl font-bold text-emerald-600">
                    ✓
                  </span>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      Product Benefits
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-900">
                      What You Get
                    </h2>
                  </div>
                </div>

                <ul className="mt-8 grid gap-4">
                  {(product.features || []).map(
                    (feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                          ✓
                        </span>

                        <span className="text-sm leading-6 text-slate-600">
                          {feature}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <Link
                href="/products"
                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
              >
                ← Back to Products
              </Link>
            </div>

            {/* Pricing Plans */}
            <div>
              <div className="rounded-[30px] border border-blue-100 bg-white p-6 shadow-[0_15px_60px_rgba(37,99,235,0.07)] sm:p-8">
                <div className="mb-7">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                    Choose Your Subscription
                  </p>

                  <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
                    Available Plans
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Select the plan that works best
                    for your needs.
                  </p>
                </div>

                <div className="space-y-4">
                  {product.plans.map((plan) => {
                    const checkoutPath =
                      `/checkout?product=${encodeURIComponent(product.slug)}` +
                      `&plan=${encodeURIComponent(String(plan.id))}`;

                    const buyNowHref = user
                      ? checkoutPath
                      : `/login?next=${encodeURIComponent(checkoutPath)}`;

                    return (
                      <div
                        key={plan.id}
                        className="group rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 transition duration-300 hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-md sm:p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">
                              {plan.name}
                            </h3>

                            {plan.duration ? (
                              <p className="mt-2 text-sm text-slate-500">
                                {plan.duration}
                              </p>
                            ) : null}
                          </div>

                          <div className="shrink-0 text-right">
                            <p className="text-xs font-semibold text-slate-400">
                              PKR
                            </p>

                            <p className="mt-1 text-2xl font-extrabold text-blue-600">
                              Rs.{" "}
                              {formatPrice(
                                Number(plan.price),
                              )}
                            </p>
                          </div>
                        </div>

                        {product.availability ===
                        "out-of-stock" ? (
                          <div className="mt-6 flex min-h-13 w-full items-center justify-center rounded-xl bg-slate-200 px-5 py-3.5 text-sm font-bold text-slate-600">
                            Currently Unavailable
                          </div>
                        ) : (
                          <Link
                            href={buyNowHref}
                            className="mt-6 flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm shadow-blue-200 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200"
                          >
                            Buy Now
                            <span aria-hidden="true">
                              →
                            </span>
                          </Link>
                        )}

                        <p className="mt-3 text-center text-xs text-slate-400">
                          Account required to complete
                          purchase
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Information */}
                <div className="mt-8 border-t border-slate-100 pt-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="h-5 w-5"
                      >
                        <path d="M3 7h11v10H3z" />
                        <path d="M14 10h4l3 3v4h-7z" />
                        <circle cx="7" cy="18" r="2" />
                        <circle cx="18" cy="18" r="2" />
                      </svg>
                    </span>

                    <h3 className="text-base font-bold text-slate-900">
                      Delivery Information
                    </h3>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    {product.deliveryInfo}
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-800">
                    Have questions before ordering?
                  </p>

                  <p className="mt-2 text-xs leading-6 text-emerald-700">
                    Visit our support page for help
                    choosing the right plan.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-3 inline-flex text-sm font-bold text-emerald-800 underline underline-offset-4"
                  >
                    Contact Support →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How Ordering Works */}
      <section className="border-y border-blue-100 bg-[#EFF7FF] py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Your Shopping Experience
            </p>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              How Ordering Works
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
              Choose a plan, submit payment details,
              and track your order after verification.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Choose Your Plan",
                description:
                  "Compare plans and select the right digital product.",
              },
              {
                number: "02",
                title: "Checkout & Payment",
                description:
                  "Submit your order and payment details through the checkout process.",
              },
              {
                number: "03",
                title: "Approval & Delivery",
                description:
                  "After payment verification, your digital order can be fulfilled.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm"
              >
                <span className="text-4xl font-black text-blue-200">
                  {step.number}
                </span>

                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 ? (
        <section className="bg-white py-20">
          <Container>
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  Discover More
                </p>

                <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  You May Also Like
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
                  Explore other digital tools and
                  subscriptions from SastaStore.
                </p>
              </div>

              <Link
                href="/products"
                className="text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                View All Products →
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map(
                (relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.slug}
                    product={relatedProduct}
                  />
                ),
              )}
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
