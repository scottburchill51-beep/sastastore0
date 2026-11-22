"use client";

import { useState, type PointerEvent, type CSSProperties } from "react";
import Link from "next/link";
import { ProductLogo } from "@/components/product/ProductLogo";
import type { Product } from "@/types/product";

type FloatingToolsHeroProps = {
  products: Product[];
};

export function FloatingToolsHero({ products }: FloatingToolsHeroProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
    });
  }

  const pointerStyle = { "--pointer-x": pointer.x, "--pointer-y": pointer.y } as CSSProperties;

  return (
    <div
      className="floating-tools-stage relative mx-auto h-[320px] w-full max-w-[460px] sm:h-[440px]"
      style={pointerStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div
        className="floating-tools-center"
        style={{ transform: `translate(calc(-50% + ${pointer.x * -3}px), calc(-50% + ${pointer.y * -3}px))` }}
      >
        <span className="floating-tools-center-kicker">Your digital toolkit</span>
        <span className="floating-tools-center-title">Create. Work. Grow.</span>
        <span className="floating-tools-center-copy">Explore tools for every workflow</span>
      </div>
      <div className="floating-tools-rotating-ring" aria-label="Featured tools orbit">
      {products.slice(0, 10).map((product, index) => {
        const depth = 5 + (index % 4) * 2;
        return (
          <Link
            key={product.slug}
            href={`/products/${encodeURIComponent(product.slug)}`}
            className={`floating-tool-card floating-tool-card-${index + 1}`}
            style={{ "--pointer-depth": depth } as CSSProperties}
            aria-label={`Explore ${product.name}`}
          >
            <span className="floating-tool-card-content">
              <ProductLogo name={product.name} logo={product.logo} size="large" priority={index < 4} />
              <span className="floating-tool-label">{product.name}</span>
            </span>
          </Link>
        );
      })}
      </div>
      <div className="floating-tools-caption">
        <span className="floating-tools-caption-dot" />
        <span>AI · Design · Productivity · More</span>
      </div>
    </div>
  );
}
