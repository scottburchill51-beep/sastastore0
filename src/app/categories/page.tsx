
import Link from "next/link";

import { CategoryIcon } from "@/components/common/CategoryIcon";
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

export default function CategoriesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-[#EFF8F4] via-white to-[#ECFDF5] text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-emerald-100 bg-[#123B35] py-10 text-white sm:bg-transparent sm:py-20 sm:text-slate-900">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl sm:bg-sky-200/40" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl sm:bg-emerald-200/40" />

        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-[#F5C76A] sm:border-blue-200 sm:bg-white sm:px-5 sm:text-xs sm:text-blue-600 sm:shadow-sm">
              Explore SastaStore
            </span>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:mt-7 sm:text-5xl">
              Find Your Next{" "}
              <span className="text-[#F5C76A] sm:text-blue-600">
                Digital Tool
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-xs leading-6 text-[#D5E8E1] sm:mt-5 sm:text-base sm:leading-8 sm:text-slate-600">
              Discover AI tools, creative software,
              productivity applications, premium
              subscriptions and more. Browse the
              categories that match your needs.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3">
              <Link
                href="/products"
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#F5C76A] px-4 py-2.5 text-xs font-extrabold text-[#123B35] transition hover:bg-[#FFE1A0] sm:bg-blue-600 sm:px-6 sm:py-3.5 sm:text-sm sm:text-white sm:hover:bg-blue-700"
              >
                Browse All Products
              </Link>

              <Link
                href="/deals"
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-white/20 sm:border-blue-200 sm:bg-white sm:px-6 sm:py-3.5 sm:text-sm sm:text-blue-700 sm:hover:bg-blue-50"
              >
                Explore Deals
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CATEGORIES */}
      <section className="py-9 sm:py-20">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-3 sm:mb-9 sm:gap-5">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#123B35] sm:text-xs sm:text-emerald-600">
                Product Categories
              </p>

              <h2 className="mt-2 text-xl font-extrabold tracking-tight sm:mt-3 sm:text-4xl">
                Browse by Category
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-7">
                Explore our digital products by
                category and find the tools
                you&apos;re looking for.
              </p>
            </div>

            <div className="shrink-0 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-[#123B35] sm:border-blue-100 sm:bg-white sm:px-5 sm:py-2.5 sm:text-sm sm:text-blue-700 sm:shadow-sm">
              {categories.length}{" "}
              <span className="hidden sm:inline">
                {categories.length === 1
                  ? "Category"
                  : "Categories"}
              </span>
            </div>
          </div>

          {categories.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-emerald-200 bg-white p-8 text-center sm:rounded-3xl sm:p-10">
              <h3 className="text-lg font-extrabold sm:text-xl">
                Categories Coming Soon
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                You can still browse all available
                digital products from our catalog.
              </p>

              <Link
                href="/products"
                className="mt-6 inline-flex rounded-xl bg-[#123B35] px-6 py-3 text-sm font-bold text-white hover:bg-[#20594F]"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((category) => {
                const productCount =
                  categoryCounts.get(category.slug) ?? 0;

                return (
                  <Link
                    key={category.slug}
                    href={`/categories/${encodeURIComponent(category.slug)}`}
                    aria-label={`Browse ${category.name}`}
                    className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3 shadow-[0_4px_16px_rgba(18,59,53,0.05)] transition-all duration-300 hover:border-emerald-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123B35] sm:rounded-3xl sm:border-blue-100 sm:p-6 sm:shadow-sm sm:hover:-translate-y-1 sm:hover:border-blue-300"
                  >
                    {/* Decorative glow */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-100/50 blur-2xl sm:-right-14 sm:-top-14 sm:h-44 sm:w-44 sm:bg-sky-100" />

                    {/* Icon and product count */}
                    <div className="relative flex items-start justify-between gap-1 sm:gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-[#EDF6F2] text-[#123B35] transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16 sm:rounded-2xl sm:border-blue-100 sm:bg-gradient-to-br sm:from-blue-50 sm:to-sky-100 sm:text-blue-600 sm:group-hover:scale-110">
                        <CategoryIcon slug={category.slug} />
                      </div>

                      <span className="max-w-[75px] rounded-full bg-emerald-50 px-1.5 py-1 text-center text-[9px] font-bold leading-3 text-[#123B35] sm:max-w-none sm:border sm:border-emerald-100 sm:px-3 sm:py-1.5 sm:text-xs sm:text-emerald-700">
                        {productCount}
                        <span className="hidden sm:inline">
                          {" "}
                          {productCount === 1
                            ? "Product"
                            : "Products"}
                        </span>
                      </span>
                    </div>

                    {/* Category title */}
                    <h3 className="relative mt-3 line-clamp-2 min-h-[38px] break-words text-[13px] font-extrabold leading-[19px] tracking-tight text-slate-900 transition-colors group-hover:text-[#123B35] sm:mt-6 sm:min-h-0 sm:text-xl sm:leading-normal sm:group-hover:text-blue-600">
                      {category.name}
                    </h3>

                    {/* Description: desktop and tablet only */}
                    <p className="relative mt-3 hidden flex-1 text-sm leading-7 text-slate-600 sm:line-clamp-3">
                      {category.description}
                    </p>

                    {/* Explore link */}
                    <div className="relative mt-auto flex items-center justify-between border-t border-emerald-50 pt-3 sm:mt-7 sm:border-blue-50 sm:pt-5">
                      <span className="text-[11px] font-extrabold text-[#123B35] sm:text-sm sm:text-blue-600">
                        Explore
                        <span className="hidden sm:inline">
                          {" "}Category
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-[#123B35] transition-all duration-300 group-hover:bg-[#123B35] group-hover:text-white sm:h-9 sm:w-9 sm:bg-blue-50 sm:text-lg sm:text-blue-600 sm:group-hover:translate-x-1 sm:group-hover:bg-blue-600"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* SHOPPING EXPERIENCE */}
      <section className="border-y border-blue-100 bg-white/70 py-10 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#123B35] sm:text-blue-600">
              Your Shopping Experience
            </p>

            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              Browse. Choose. Track.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:leading-8">
              Explore digital tools, select a
              suitable subscription plan and
              follow your order through your
              SastaStore account.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Browse Products",
                description:
                  "Discover tools and subscriptions across different categories.",
              },
              {
                number: "02",
                title: "Select Your Plan",
                description:
                  "Review plan information and continue to secure checkout.",
              },
              {
                number: "03",
                title: "Track Your Order",
                description:
                  "Check payment review and delivery progress from your account.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-white p-4 shadow-sm sm:block sm:rounded-2xl sm:border-blue-100 sm:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-extrabold text-[#123B35] sm:h-12 sm:w-12 sm:rounded-xl sm:bg-blue-100 sm:text-blue-700">
                  {step.number}
                </div>

                <div>
                  <h3 className="text-sm font-extrabold sm:mt-5 sm:text-lg">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-7">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-10 sm:py-16">
        <Container>
          <div className="rounded-2xl bg-[#123B35] p-5 text-white shadow-lg sm:rounded-3xl sm:bg-gradient-to-r sm:from-blue-600 sm:to-sky-600 sm:p-12 sm:shadow-blue-200/40">
            <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#F5C76A] sm:text-xs sm:text-blue-100">
                  Discover More
                </p>

                <h2 className="mt-3 text-xl font-extrabold sm:text-3xl">
                  Can&apos;t Find What You Need?
                </h2>

                <p className="mt-3 text-xs leading-6 text-[#D5E8E1] sm:text-sm sm:leading-7 sm:text-blue-50">
                  Browse our complete catalog or
                  contact SastaStore for product
                  availability and assistance.
                </p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-xs font-extrabold text-[#123B35] transition hover:bg-emerald-50 sm:py-3.5 sm:text-sm sm:text-blue-700"
                >
                  All Products
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/10 px-6 py-3 text-xs font-extrabold text-white transition hover:bg-white/20 sm:py-3.5 sm:text-sm"
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
