
import Link from "next/link";
import { notFound } from "next/navigation";

import { CategoryIcon } from "@/components/common/CategoryIcon";
import { CategoryProducts } from "@/components/product/CategoryProducts";
import { Container } from "@/components/ui/Container";
import { categories } from "@/data/categories";
import { getCategoryBySlug } from "@/lib/categories";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps) {
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

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#EFF8FF] via-white to-[#ECFDF5] text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-blue-100 py-12 sm:py-16">
        <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl" />

        <Container>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500"
          >
            <Link
              href="/"
              className="hover:text-blue-600"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/categories"
              className="hover:text-blue-600"
            >
              Categories
            </Link>

            <span>/</span>

            <span className="font-semibold text-blue-700">
              {category.name}
            </span>
          </nav>

          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-blue-200 bg-white text-blue-600 shadow-md shadow-blue-100">
              <CategoryIcon slug={category.slug} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                SastaStore Category
              </p>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                {category.name}
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
                {category.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Browse Products
              </p>

              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                Products in {category.name}
              </h2>
            </div>

            <Link
              href="/categories"
              className="rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              All Categories
            </Link>
          </div>

          <CategoryProducts
            categorySlug={category.slug}
            categoryName={category.name}
          />
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-blue-100 bg-white/60 py-14">
        <Container>
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-white shadow-lg shadow-blue-100 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-extrabold">
                  Explore More Digital Products
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-blue-50">
                  Discover more subscriptions and
                  digital tools across SastaStore.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
                >
                  All Products
                </Link>

                <Link
                  href="/contact"
                  className="rounded-xl border border-white/50 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/20"
                >
                  Need Help?
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
