
import Link from "next/link";

import { CategoryCarousel } from "@/components/category/CategoryCarousel";
import { Container } from "@/components/ui/Container";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const metadata = {
  title: "Browse Categories | SastaStore",
  description:
    "Explore SastaStore digital product categories, including AI tools, creative software, productivity apps, entertainment, subscriptions and more.",
};

const categoryCounts = new Map<string, number>();

for (const product of products) {
  categoryCounts.set(
    product.category,
    (categoryCounts.get(product.category) ?? 0) + 1,
  );
}

const categoryItems = categories.map((category) => ({
  slug: category.slug,
  name: category.name,
  description: category.description,
  productCount:
    categoryCounts.get(category.slug) ?? 0,
}));

export default function CategoriesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#EFF8FF] via-white to-[#ECFDF5] text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-blue-100 py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />

        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-600 shadow-sm">
              Explore SastaStore
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Find Your Next{" "}
              <span className="text-blue-600">
                Digital Tool
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
              Discover AI tools, creative software,
              productivity applications, premium
              subscriptions and more. Browse the
              categories that match your needs.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Browse All Products
              </Link>

              <Link
                href="/deals"
                className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
              >
                Explore Deals
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* MOVING CATEGORIES */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Product Categories
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Browse by Category
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                Explore our digital products by
                category and find the tools
                you&apos;re looking for.
              </p>
            </div>

            <div className="rounded-full border border-blue-100 bg-white px-5 py-2.5 text-sm font-bold text-blue-700 shadow-sm">
              {categories.length}{" "}
              {categories.length === 1
                ? "Category"
                : "Categories"}
            </div>
          </div>

          {categoryItems.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-blue-200 bg-white p-10 text-center">
              <h3 className="text-xl font-extrabold">
                Categories Coming Soon
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                You can still browse all available
                digital products from our catalog.
              </p>

              <Link
                href="/products"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <CategoryCarousel items={categoryItems} />
          )}
        </Container>
      </section>

      {/* SHOPPING EXPERIENCE */}
      <section className="border-y border-blue-100 bg-white/70 py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
              Your Shopping Experience
            </p>

            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              Browse. Choose. Track.
            </h2>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              Explore digital tools, select a
              suitable subscription plan and
              follow your order through your
              SastaStore account.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-lg font-extrabold text-blue-700">
                01
              </div>

              <h3 className="mt-5 text-lg font-extrabold">
                Browse Products
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Discover tools and subscriptions
                across different categories.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-lg font-extrabold text-sky-700">
                02
              </div>

              <h3 className="mt-5 text-lg font-extrabold">
                Select Your Plan
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Review plan information and
                continue to secure checkout.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-lg font-extrabold text-emerald-700">
                03
              </div>

              <h3 className="mt-5 text-lg font-extrabold">
                Track Your Order
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Check payment review and
                delivery progress from your account.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16">
        <Container>
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-white shadow-xl shadow-blue-200/40 sm:p-12">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-100">
                  Discover More
                </p>

                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  Can&apos;t Find What You Need?
                </h2>

                <p className="mt-3 text-sm leading-7 text-blue-50">
                  Browse our complete catalog or
                  contact SastaStore for product
                  availability and assistance.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
                >
                  All Products
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/10 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/20"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
