"use client";

import Link from "next/link";
import { ProductLogo } from "@/components/product/ProductLogo";
import type { Product } from "@/types/product";

type FloatingToolsHeroProps = {
  products: Product[];
};

export function FloatingToolsHero({ products }: FloatingToolsHeroProps) {
  return (
    <div className="floating-tools-stage relative mx-auto h-[320px] w-full max-w-[460px] sm:h-[440px]">
      <div className="floating-tools-center">
        <span className="floating-tools-center-kicker">Your digital toolkit</span>
        <span className="floating-tools-center-title">Create. Work. Grow.</span>
        <span className="floating-tools-center-copy">Explore tools for every workflow</span>
      </div>
      {products.slice(0, 8).map((product, index) => (
        <Link
          key={product.slug}
          href={`/products/${encodeURIComponent(product.slug)}`}
          className={`floating-tool-card floating-tool-card-${index + 1}`}
          aria-label={`Explore ${product.name}`}
          style={{ animationDelay: `${index * -0.55}s` }}
        >
          <ProductLogo name={product.name} logo={product.logo} size="large" priority={index < 4} />
          <span className="floating-tool-label">{product.name}</span>
        </Link>
      ))}
      <div className="floating-tools-caption">
        <span className="floating-tools-caption-dot" />
        <span>AI · Design · Productivity · More</span>
      </div>
    </div>
  );
}
