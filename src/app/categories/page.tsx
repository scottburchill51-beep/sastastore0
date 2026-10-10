import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const metadata = {
  title: "Categories | SastaStore",
  description:
    "Browse SastaStore digital tools and premium subscriptions by category.",
};

export default function CategoriesPage() {
  return (
    <main className="flex-1 bg-background text-foreground">
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Categories"
            title="Browse by category"
            description="Find AI tools, creative software, productivity apps, entertainment subscriptions and more."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => {
              const productCount = products.filter(
                (product) => product.category === category.slug,
              ).length;

              return (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:bg-surface-elevated"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-elevated text-xl font-bold text-brand">
                    {category.name.charAt(0)}
                  </div>

                  <h2 className="mt-5 text-lg font-semibold">
                    {category.name}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>

                  <p className="mt-5 text-sm font-medium text-brand">
                    {productCount} {productCount === 1 ? "product" : "products"} →
                  </p>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </main>
  );
}