
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product/ProductCard";
import { ProductLogo } from "@/components/product/ProductLogo";
import { Reveal } from "@/components/common/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";
import { getProductBySlug } from "@/lib/products";
import { getSession } from "@/lib/store-backend";
import {
  createProductOrderMessage,
  createWhatsAppUrl,
} from "@/lib/whatsapp";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

const availabilityMap = {
  available: "https://schema.org/InStock",
  limited: "https://schema.org/LimitedAvailability",
  "out-of-stock": "https://schema.org/OutOfStock",
} as const;

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | SastaStore",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productUrl = `${siteConfig.url}/products/${product.slug}`;

  return {
    title: product.seo.title,
    description: product.seo.description,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      type: "website",
      url: productUrl,
      siteName: siteConfig.name,
      title: product.seo.title,
      description: product.seo.description,
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
      title: product.seo.title,
      description: product.seo.description,
      images: [`${siteConfig.url}/opengraph-image`],
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const { user } = await getSession();

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productUrl = `${siteConfig.url}/products/${product.slug}`;

  const logoPath = product.logo.replace(/\.webp$/i, ".png");

  const sameCategoryProducts = products.filter(
    (item) =>
      item.slug !== product.slug &&
      item.category === product.category,
  );

  const otherProducts = products.filter(
    (item) =>
      item.slug !== product.slug &&
      item.category !== product.category,
  );

  const relatedProducts = [
    ...sameCategoryProducts,
    ...otherProducts,
  ].slice(0, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${siteConfig.url}${logoPath}`,
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
      availability: availabilityMap[product.availability],
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    })),
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
          text: "Choose your preferred plan and click Order on WhatsApp. Our team will confirm availability, payment details and delivery information.",
        },
      },
      {
        "@type": "Question",
        name: `Is ${product.name} available all the time?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Availability can change depending on the product and plan. Please confirm availability with SastaStore before ordering.",
        },
      },
      {
        "@type": "Question",
        name: "How is delivery completed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Digital products are delivered after order confirmation. Exact delivery details are shared through WhatsApp support.",
        },
      },
    ],
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

  return (
    <main className="flex-1 bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      {/* Product Details */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex items-center gap-4">
                <ProductLogo
                  name={product.name}
                  logo={product.logo}
                  size="large"
                />

                <div>
                  {product.badge ? (
                    <Badge>{product.badge}</Badge>
                  ) : null}

                  <p className="mt-2 text-sm text-muted-foreground">
                    {product.category
                      .split("-")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1),
                      )
                      .join(" ")}
                  </p>
                </div>
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                {product.name}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                {product.description}
              </p>

              <div className="mt-8">
                <h2 className="text-lg font-semibold">
                  What you get
                </h2>

                <ul className="mt-4 space-y-3">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                        ✓
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <LinkButton
                  href="/products"
                  variant="secondary"
                >
                  ← Back to Products
                </LinkButton>
              </div>
            </div>

            {/* Plans */}
            <div>
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <p className="text-sm font-medium text-muted-foreground">
                  Choose your plan
                </p>

                <div className="mt-5 space-y-4">
                  {product.plans.map((plan) => {
                    const whatsappMessage =
                      createProductOrderMessage({
                        productName: product.name,
                        planName: plan.name,
                        price: plan.price,
                      });

                    const whatsappUrl =
                      createWhatsAppUrl(whatsappMessage);

                    // Preserve selected product and plan.
                    const returnTo =
                      `/products/${encodeURIComponent(product.slug)}` +
                      `?plan=${encodeURIComponent(String(plan.id))}`;

                    const orderUrl = user
                      ? whatsappUrl
                      : `/login?next=${encodeURIComponent(returnTo)}`;

                    return (
                      <div
                        key={plan.id}
                        className="rounded-xl border border-border bg-surface-elevated p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h2 className="font-semibold text-foreground">
                              {plan.name}
                            </h2>

                            {plan.duration ? (
                              <p className="mt-1 text-sm text-muted-foreground">
                                {plan.duration}
                              </p>
                            ) : null}
                          </div>

                          <p className="text-xl font-bold text-foreground">
                            Rs. {formatPrice(plan.price)}
                          </p>
                        </div>

                        <a
                          href={orderUrl}
                          target={user ? "_blank" : undefined}
                          rel={
                            user
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover"
                        >
                          {user
                            ? "Order on WhatsApp"
                            : "Login to Order"}
                        </a>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-sm font-medium text-foreground">
                    Delivery information
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {product.deliveryInfo}
                  </p>
                </div>

                <div className="mt-6 rounded-xl border border-brand/20 bg-brand/5 p-4">
                  <p className="text-sm leading-6 text-muted-foreground">
                    Need help choosing a plan? Message SastaStore on
                    WhatsApp before ordering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Products */}
      {relatedProducts.length > 0 ? (
        <Section className="border-t border-border">
          <Container>
            <Reveal>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading
                  eyebrow="You May Also Like"
                  title="Related products"
                  description={`Explore more digital tools and subscriptions similar to ${product.name}.`}
                />

                <LinkButton
                  href="/products"
                  variant="secondary"
                >
                  View All Products →
                </LinkButton>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct, index) => (
                <Reveal
                  key={relatedProduct.slug}
                  delay={index * 80}
                  className="h-full"
                >
                  <ProductCard product={relatedProduct} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
