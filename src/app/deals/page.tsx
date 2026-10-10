import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProducts, getPopularProducts } from "@/lib/products";

export const metadata = {
  title: "Deals & Popular Tools | SastaStore",
  description:
    "Explore popular digital tools and selected subscriptions available at SastaStore.",
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

  return (
    <main className="flex-1 bg-background text-foreground">
      <Section>
        <Container>
          <SectionHeading
            eyebrow="SastaStore Picks"
            title="Popular tools & subscriptions"
            description="Browse some of our most popular and featured digital products. Special offers and discounted pricing will be added here when available."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}