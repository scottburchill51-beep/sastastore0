
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ProductLogo } from "@/components/product/ProductLogo";
import type { Product } from "@/types/product";

export function BrandLogoMarquee() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBrands() {
      try {
        const response = await fetch("/api/store/products", {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load brands.");
        }

        const data: unknown = await response.json();

        if (
          !data ||
          typeof data !== "object" ||
          !("products" in data) ||
          !Array.isArray(data.products)
        ) {
          throw new Error("Invalid product data.");
        }

        const allProducts = data.products as Product[];

        const uniqueProducts = Array.from(
          new Map(
            allProducts.map((product) => [
              product.slug,
              product,
            ]),
          ).values(),
        );

        if (!controller.signal.aborted) {
          setProducts(uniqueProducts);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Brand slider error:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadBrands();

    return () => controller.abort();
  }, []);

  const renderBrand = (product: Product, duplicate: boolean) => (
    <Link
      key={`${duplicate ? "copy" : "brand"}-${product.slug}`}
      href={`/products/${encodeURIComponent(product.slug)}`}
      tabIndex={duplicate ? -1 : undefined}
      className="group flex w-[145px] shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-[#437467] bg-[#205047] px-4 py-5 text-center shadow-sm transition-colors hover:border-[#F5C76A] hover:bg-[#2A6054] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76A] sm:w-[185px] sm:px-5 sm:py-6"
    >
      <div className="flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-sm sm:h-[90px] sm:w-[90px]">
        <ProductLogo
          name={product.name}
          logo={product.logo}
        />
      </div>

      <span className="line-clamp-2 min-h-[36px] text-xs font-bold leading-[18px] text-white sm:text-sm">
        {product.name}
      </span>
    </Link>
  );

  return (
    <section
      aria-labelledby="sastastore-brands-heading"
      className="overflow-hidden border-y border-[#38675E] bg-[#123B35] py-12 text-white sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#F5C76A]">
          Our Digital Ecosystem
        </p>

        <h2
          id="sastastore-brands-heading"
          className="mt-3 text-2xl font-extrabold tracking-tight sm:text-4xl"
        >
          Explore Popular Digital Brands
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#C8E5DA] sm:text-base">
          Discover AI tools, creative software and digital subscriptions.
        </p>
      </div>

      {loading ? (
        <div
          role="status"
          className="mt-10 text-center text-sm text-[#C8E5DA]"
        >
          Loading digital brands...
        </div>
      ) : products.length > 0 ? (
        <div className="relative mt-10 overflow-hidden py-2">
          {/* Soft fading edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#123B35] to-transparent sm:w-24" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#123B35] to-transparent sm:w-24" />

          <div
            className="sastastore-brand-track flex w-max"
            style={{
              animationDuration: `${Math.max(
                products.length * 5,
                30,
              )}s`,
            }}
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-stretch gap-4 pr-4 sm:gap-5 sm:pr-5"
                aria-hidden={copy === 1}
              >
                {products.map((product) =>
                  renderBrand(product, copy === 1),
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-8 text-center text-sm text-[#C8E5DA]">
          Browse our products to explore available brands.
        </p>
      )}

      <div className="mt-9 text-center">
        <Link
          href="/products"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#F5C76A] px-6 py-3 text-sm font-extrabold text-[#F5C76A] transition hover:bg-[#F5C76A] hover:text-[#123B35]"
        >
          Explore All Products
        </Link>
      </div>

      <style>{`
        @keyframes sastastore-brand-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .sastastore-brand-track {
          animation-name: sastastore-brand-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .sastastore-brand-track:hover,
        .sastastore-brand-track:focus-within {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .sastastore-brand-track {
            animation: none;
          }

          .sastastore-brand-track > div:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
