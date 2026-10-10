import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/data/products";

export const metadata = {
  title: "All Products | SastaStore",
  description:
    "Browse all available digital tools, AI subscriptions, premium apps and online services at SastaStore.",
};

export default function ProductsPage() {
  return (
    <main className="flex-1 bg-background text-foreground">
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Products"
            title="All digital tools"
            description="Browse all currently available digital tools, premium subscriptions, AI services and software from SastaStore."
          />

          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {products.length} products currently available
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}