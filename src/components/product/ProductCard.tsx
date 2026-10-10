import Link from "next/link";

import { ProductLogo } from "@/components/product/ProductLogo";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const lowestPrice = Math.min(
    ...product.plans.map((plan) => plan.price),
  );

  const hasMultiplePlans = product.plans.length > 1;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="premium-card relative flex h-full overflow-hidden flex-col">
        {/* Hover glow */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand/10 opacity-0 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />

        {/* Top */}
        <div className="relative flex items-start justify-between gap-4">
          <div className="premium-icon rounded-xl">
            <ProductLogo
              name={product.name}
              logo={product.logo}
            />
          </div>

          {product.badge ? (
            <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
              <Badge>{product.badge}</Badge>
            </div>
          ) : null}
        </div>

        {/* Product info */}
        <div className="relative mt-5">
          <p className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-brand">
            {product.name}
          </p>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {product.shortDescription}
          </p>
        </div>

        {/* Price */}
        <div className="relative mt-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {hasMultiplePlans ? "Starting from" : "Price"}
          </p>

          <div className="mt-1 flex items-end gap-2">
            <p className="text-2xl font-bold tracking-tight text-foreground">
              Rs. {formatPrice(lowestPrice)}
            </p>
          </div>
        </div>

        {hasMultiplePlans ? (
          <div className="relative mt-3">
            <span className="inline-flex rounded-full border border-border bg-surface-elevated px-2.5 py-1 text-xs text-muted-foreground transition-colors duration-300 group-hover:border-brand/20">
              {product.plans.length} plans available
            </span>
          </div>
        ) : null}

        {/* Bottom */}
        <div className="relative mt-auto pt-6">
          <div className="border-t border-border pt-4 transition-colors duration-300 group-hover:border-brand/20">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                View product details
              </p>

              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-elevated text-sm font-semibold text-brand transition-all duration-300 group-hover:translate-x-1 group-hover:border-brand/30 group-hover:bg-brand group-hover:text-black">
                →
              </span>
            </div>
          </div>
        </div>

        {/* Animated bottom accent */}
        <div className="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-500 group-hover:w-full" />
      </Card>
    </Link>
  );
}