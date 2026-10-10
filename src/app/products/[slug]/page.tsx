import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Section } from "@/components/ui/Section";
import { products } from "@/data/products";
import { getProductBySlug } from "@/lib/products";
import {
  createProductOrderMessage,
  createWhatsAppUrl,
} from "@/lib/whatsapp";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | SastaStore",
    };
  }

  return {
    title: product.seo.title,
    description: product.seo.description,
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex-1 bg-background text-foreground">
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface text-2xl font-bold text-brand">
                  {product.name.charAt(0)}
                </div>

                <div>
                  {product.badge ? <Badge>{product.badge}</Badge> : null}

                  <p className="mt-2 text-sm text-muted-foreground">
                    {product.category
                      .split("-")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() + word.slice(1),
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
                <h2 className="text-lg font-semibold">What you get</h2>

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
                <LinkButton href="/products" variant="secondary">
                  ← Back to Products
                </LinkButton>
              </div>
            </div>

            <div>
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <p className="text-sm font-medium text-muted-foreground">
                  Choose your plan
                </p>

                <div className="mt-5 space-y-4">
                  {product.plans.map((plan) => {
                    const whatsappMessage = createProductOrderMessage({
                      productName: product.name,
                      planName: plan.name,
                      price: plan.price,
                    });

                    const whatsappUrl =
                      createWhatsAppUrl(whatsappMessage);

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
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-brand-hover"
                        >
                          Order on WhatsApp
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
                    Need help choosing a plan? Message SastaStore on WhatsApp
                    before ordering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}