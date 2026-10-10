import Link from "next/link";

import { CategoryIcon } from "@/components/common/CategoryIcon";
import { Reveal } from "@/components/common/Reveal";
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
    <main className="flex-1 overflow-hidden bg-background text-foreground">
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Categories"
              title="Browse by category"
              description="Find AI tools, creative software, productivity apps, entertainment subscriptions and more."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category, index) => {
              const productCount = products.filter(
                (product) => product.category === category.slug,
              ).length;

              return (
                <Reveal
                  key={category.slug}
                  delay={(index % 4) * 80}
                  className="h-full"
                >
                  <Link
                    href={`/categories/${category.slug}`}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:bg-surface-elevated hover:shadow-2xl hover:shadow-black/20"
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/5 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/15 bg-brand/10 text-brand transition-all duration-300 group-hover:scale-110 group-hover:border-brand/30">
                        <CategoryIcon slug={category.slug} />
                      </div>

                      <div className="rounded-full border border-border bg-surface-elevated px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        {productCount}{" "}
                        {productCount === 1 ? "product" : "products"}
                      </div>
                    </div>

                    <h2 className="relative mt-5 text-lg font-semibold text-foreground">
                      {category.name}
                    </h2>

                    <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
                      {category.description}
                    </p>

                    <div className="relative mt-6 flex items-center justify-between border-t border-border pt-4">
                      <p className="text-sm font-medium text-brand">
                        Explore category
                      </p>

                      <span className="text-sm font-semibold text-brand transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>
    </main>
  );
}