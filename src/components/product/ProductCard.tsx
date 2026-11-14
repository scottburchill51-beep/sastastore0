
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
  // Find the lowest-priced valid plan.
  const validPlans = product.plans
    .map((plan) => ({
      ...plan,
      numericPrice: Number(plan.price),
      numericOriginalPrice:
        plan.originalPrice == null
          ? null
          : Number(plan.originalPrice),
    }))
    .filter(
      (plan) =>
        Number.isFinite(plan.numericPrice) &&
        plan.numericPrice > 0,
    );

  const lowestPlan =
    validPlans.length > 0
      ? validPlans.reduce((lowest, current) =>
          current.numericPrice < lowest.numericPrice
            ? current
            : lowest,
        )
      : null;

  const lowestPrice = lowestPlan?.numericPrice ?? null;

  // Automatically calculate discount.
  const originalPrice =
    lowestPlan?.numericOriginalPrice ?? null;

  const hasDiscount =
    originalPrice !== null &&
    Number.isFinite(originalPrice) &&
    originalPrice > lowestPrice!;

  const discountPercent = hasDiscount
    ? Math.round(
        ((originalPrice! - lowestPrice!) / originalPrice!) *
          100,
      )
    : 0;

  const hasMultiplePlans = product.plans.length > 1;

  return (
    <Link
      href={`/products/${encodeURIComponent(product.slug)}`}
      aria-label={`View ${product.name} product details`}
      className="group block h-full min-w-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:rounded-[24px]"
    >
      <article className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#dce8df] bg-white p-3 shadow-[0_8px_30px_rgba(16,45,34,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9bc9ad] hover:shadow-[0_20px_55px_rgba(18,59,53,0.13)] sm:rounded-[24px] sm:p-6">

        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-100/70 to-[#f5ce78]/20 blur-3xl transition-transform duration-500 group-hover:scale-125" />

        {/* Product Logo and Badges */}
        <div className="relative flex min-h-[64px] items-start justify-between gap-1.5 sm:min-h-[76px] sm:gap-3">

          <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#dce8df] bg-gradient-to-br from-[#edf6f0] to-white p-1 shadow-sm sm:h-[76px] sm:w-[76px] sm:rounded-2xl sm:p-2">
            <ProductLogo
              name={product.name}
              logo={product.logo}
              priority={priority}
            />
          </div>

          <div className="flex max-w-[65%] flex-col items-end gap-1.5">

            {hasDiscount && (
              <span className="rounded-full border border-[#d8e9dc] bg-[#edf6f0] px-2 py-1 text-[9px] font-extrabold text-[#267253] sm:px-3 sm:py-1.5 sm:text-xs">
                {discountPercent}% OFF
              </span>
            )}

            {product.badge && (
              <span className="max-w-full break-words rounded-lg border border-[#e8d9ae] bg-[#fbf5e7] px-2 py-1 text-right text-[9px] font-bold leading-3 text-[#806022] sm:rounded-full sm:px-3 sm:py-1.5 sm:text-[11px] sm:leading-4">
                {product.badge}
              </span>
            )}

          </div>
        </div>

        {/* Product Name and Description */}
        <div className="relative mt-3 sm:mt-6">
          <h3 className="line-clamp-2 min-h-[40px] break-words text-[14px] font-extrabold leading-5 tracking-tight text-[#17372e] transition-colors group-hover:text-[#267253] sm:min-h-0 sm:text-lg sm:leading-normal">
            {product.name}
          </h3>

          <p className="mt-1.5 line-clamp-2 min-h-[36px] text-[11px] leading-[18px] text-slate-500 sm:mt-2 sm:min-h-[48px] sm:text-sm sm:leading-6">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing */}
        <div className="relative mt-3 sm:mt-6">

          <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs sm:tracking-wider">
            {hasMultiplePlans ? "Starting From" : "Price"}
          </p>

          {hasDiscount && (
            <p className="mt-1 text-xs font-semibold text-slate-400 line-through sm:text-sm">
              Rs. {formatPrice(originalPrice!)}
            </p>
          )}

          <p className={`break-words text-[18px] font-extrabold leading-6 tracking-tight sm:text-2xl sm:leading-normal ${
            hasDiscount ? "text-[#267253]" : "text-slate-900"
          }`}>
            {lowestPrice !== null
              ? `Rs. ${formatPrice(lowestPrice)}`
              : "See Details"}
          </p>

          {hasDiscount && (
            <p className="mt-1 text-[10px] font-semibold text-[#267253] sm:text-xs">
              Save Rs. {formatPrice(originalPrice! - lowestPrice!)}
            </p>
          )}

          {hasMultiplePlans ? (
            <span className="mt-2 inline-flex max-w-full items-center gap-1 rounded-full border border-[#dce8df] bg-[#edf6f0] px-2 py-1 text-[9px] font-semibold leading-4 text-[#267253] sm:mt-3 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#267253]" />
              {product.plans.length} Plans Available
            </span>
          ) : (
            <span className="mt-2 inline-flex max-w-full items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-[9px] font-semibold leading-4 text-[#267253] sm:mt-3 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#267253]" />
              Digital Product
            </span>
          )}
        </div>

        {/* View Details Button */}
        <div className="relative mt-auto pt-4 sm:pt-7">
          <div className="flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg bg-[#123b32] px-2 text-[11px] font-bold text-white shadow-sm transition-all duration-300 group-hover:bg-[#1c5746] sm:min-h-[46px] sm:justify-between sm:rounded-xl sm:px-4 sm:text-sm">
            <span>View Details</span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
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
