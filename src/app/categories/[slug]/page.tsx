import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";
import { getCategoryBySlug } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | SastaStore",
    };
  }

  return {
    title: category.seo.title,
    description: category.seo.description,
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(slug);

  return (
    <main className="flex-1 bg-background text-foreground">
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Category"
            title={category.name}
            description={category.description}
          />

          <p className="mt-8 text-sm text-muted-foreground">
            {categoryProducts.length}{" "}
            {categoryProducts.length === 1 ? "product" : "products"} available
          </p>

          {categoryProducts.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-border bg-surface p-8">
              <p className="font-medium text-foreground">
                More products coming soon.
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;ll add more products to this category as they become
                available.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}