
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
      (price) => Number.isFinite(price) && price > 0,
    );

  const lowestPrice =
    prices.length > 0 ? Math.min(...prices) : null;

  const hasMultiplePlans = product.plans.length > 1;

  return (
    <Link
      href={`/products/${encodeURIComponent(product.slug)}`}
      aria-label={`View ${product.name} product details`}
      className="group block h-full min-w-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123B35] focus-visible:ring-offset-2 sm:rounded-[24px]"
    >
      <article className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-lg sm:rounded-[24px] sm:p-6 sm:hover:-translate-y-1">

        {/* Product Image / Logo */}
        <div className="relative flex h-[100px] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#F0F8F5] to-[#F8FBFF] sm:h-auto sm:min-h-[76px] sm:justify-between sm:overflow-visible sm:bg-transparent">

          <div className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-sm sm:h-[76px] sm:w-[76px] sm:border sm:border-blue-100">
            <ProductLogo
              name={product.name}
              logo={product.logo}
              priority={priority}
            />
          </div>

          {product.badge ? (
            <span className="absolute right-1 top-1 max-w-[75px] rounded-md bg-[#123B35] px-1.5 py-1 text-center text-[8px] font-bold leading-3 text-white sm:static sm:max-w-[125px] sm:rounded-full sm:bg-emerald-50 sm:px-3 sm:py-1.5 sm:text-[11px] sm:leading-4 sm:text-emerald-700">
              {product.badge}
            </span>
          ) : null}
        </div>

        {/* Product Name */}
        <div className="mt-3 sm:mt-6">
          <h3 className="line-clamp-2 min-h-[38px] break-words text-[13px] font-extrabold leading-[19px] tracking-tight text-slate-900 transition-colors group-hover:text-[#123B35] sm:min-h-0 sm:text-lg sm:leading-normal">
            {product.name}
          </h3>

          {/* Description hidden on mobile for cleaner cards */}
          <p className="mt-2 hidden min-h-[48px] text-sm leading-6 text-slate-500 sm:line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        {/* Price */}
        <div className="mt-2.5 sm:mt-6">
          <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs sm:tracking-wider">
            {hasMultiplePlans ? "Starting From" : "Price"}
          </p>

          <p className="mt-1 break-words text-[17px] font-black leading-6 tracking-tight text-[#123B35] sm:text-2xl sm:leading-normal sm:text-slate-900">
            {lowestPrice !== null
              ? `Rs. ${formatPrice(lowestPrice)}`
              : "See Details"}
          </p>

          {hasMultiplePlans ? (
            <span className="mt-2 inline-flex max-w-full items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-[#123B35] sm:mt-3 sm:px-3 sm:py-1.5 sm:text-xs">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>
                {product.plans.length} Plans
                <span className="hidden sm:inline">
                  {" "}Available
                </span>
              </span>
            </span>
          ) : (
            <span className="mt-2 inline-flex max-w-full items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-[#123B35] sm:mt-3 sm:px-3 sm:py-1.5 sm:text-xs">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              Digital Product
            </span>
          )}
        </div>

        {/* View Details Button */}
        <div className="mt-auto pt-3 sm:pt-7">
          <div className="flex min-h-[38px] items-center justify-center gap-1 rounded-lg bg-[#123B35] px-2 text-[11px] font-bold text-white transition-colors group-hover:bg-[#20594F] sm:min-h-[46px] sm:justify-between sm:rounded-xl sm:px-4 sm:text-sm">
            <span>View Details</span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 sm:h-5 sm:w-5"
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
