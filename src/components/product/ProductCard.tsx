
import Link from "next/link";

import { ProductLogo } from "@/components/product/ProductLogo";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  const prices = product.plans
    .map((plan) => Number(plan.price))
    .filter(
      (price) =>
        Number.isFinite(price) && price > 0,
    );

  const lowestPrice =
    prices.length > 0
      ? Math.min(...prices)
      : null;

  const hasMultiplePlans =
    product.plans.length > 1;

  return (
    <Link
      href={`/products/${encodeURIComponent(product.slug)}`}
      aria-label={`View ${product.name} product details`}
      className="group block h-full rounded-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_5px_25px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_20px_55px_rgba(37,99,235,0.12)] sm:p-6">
        {/* Decorative gradient */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-blue-100/70 to-emerald-100/40 blur-3xl transition-transform duration-500 group-hover:scale-125" />

        {/* Logo and Badge */}
        <div className="relative flex items-start justify-between gap-3">
          <div className="flex min-h-[72px] min-w-[72px] items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-2 shadow-sm">
            <ProductLogo
              name={product.name}
              logo={product.logo}
              priority={priority}
            />
          </div>

          {product.badge ? (
            <span className="max-w-[125px] rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-center text-[11px] font-bold leading-4 text-emerald-700">
              {product.badge}
            </span>
          ) : null}
        </div>

        {/* Product Name and Description */}
        <div className="relative mt-6">
          <h3 className="line-clamp-2 text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
            {product.name}
          </h3>

          <p className="mt-2 line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-500">
            {product.shortDescription}
          </p>
        </div>

        {/* Price */}
        <div className="relative mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {hasMultiplePlans
              ? "Starting From"
              : "Price"}
          </p>

          <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            {lowestPrice !== null
              ? `Rs. ${formatPrice(lowestPrice)}`
              : "See Details"}
          </p>

          {hasMultiplePlans ? (
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              {product.plans.length} Plans Available
            </span>
          ) : (
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Digital Product
            </span>
          )}
        </div>

        {/* View Details Button */}
        <div className="relative mt-auto pt-7">
          <div className="flex min-h-[46px] items-center justify-between rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-sm shadow-blue-100 transition-all duration-300 group-hover:bg-blue-700 group-hover:shadow-md group-hover:shadow-blue-200">
            <span>View Details</span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
