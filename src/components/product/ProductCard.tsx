import Link from "next/link";

import type { Product } from "@/types/product";
import { ProductLogo } from "@/components/product/ProductLogo";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

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
      <Card className="flex h-full flex-col transition-all duration-200 group-hover:-translate-y-1 group-hover:border-brand/30 group-hover:bg-surface-elevated">
        <div className="flex items-start justify-between gap-4">
          <ProductLogo
            name={product.name}
            logo={product.logo}
          />

          {product.badge ? (
            <Badge>{product.badge}</Badge>
          ) : null}
        </div>

        <div className="mt-5">
          <p className="text-lg font-semibold tracking-tight text-foreground">
            {product.name}
          </p>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {hasMultiplePlans ? "Starting from" : "Price"}
          </p>

          <p className="mt-1 text-2xl font-bold text-foreground">
            Rs. {formatPrice(lowestPrice)}
          </p>
        </div>

        {hasMultiplePlans ? (
          <p className="mt-3 text-xs text-muted-foreground">
            {product.plans.length} plans available
          </p>
        ) : null}

        <div className="mt-auto pt-6">
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                View product details
              </p>

              <span className="text-sm font-semibold text-brand transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}