
"use client";

import { useEffect, useState } from "react";

import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

export function FeaturedToolsCarousel() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch("/api/store/products", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();

        if (
          !data ||
          typeof data !== "object" ||
          !("products" in data) ||
          !Array.isArray(data.products)
        ) {
          return;
        }

        const allProducts = data.products as Product[];

        const preferred = allProducts.filter(
          (product) =>
            product.featured === true ||
            product.popular === true,
        );

        // Use featured/popular products first.
        // Fill remaining slots from the live catalog.
        const selected = [
          ...preferred,
          ...allProducts.filter(
            (product) =>
              !preferred.some(
                (item) => item.slug === product.slug,
              ),
          ),
        ].slice(0, 8);

        setProducts(selected);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(
            "Featured tools could not be loaded:",
            error,
          );
        }
      }
    }

    void loadProducts();

    return () => controller.abort();
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="featured-tools-heading"
      className="border-y border-blue-100 bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
            Explore Digital Tools
          </p>

          <h2
            id="featured-tools-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            Popular & Featured Tools
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Discover digital tools and subscriptions
            from our live collection.
          </p>
        </div>
      </div>

      <div className="overflow-hidden py-3">
        <div
          className="sastastore-tools-track flex w-max"
          style={{
            animationDuration: `${Math.max(
              products.length * 8,
              40,
            )}s`,
          }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-stretch gap-4 pr-4 sm:gap-5 sm:pr-5"
              aria-hidden={copy === 1}
              inert={copy === 1}
            >
              {products.map((product) => (
                <div
                  key={`${copy}-${product.slug}`}
                  className="w-[230px] shrink-0 sm:w-[280px] lg:w-[300px]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sastastore-tools-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .sastastore-tools-track {
          animation-name: sastastore-tools-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .sastastore-tools-track:hover,
        .sastastore-tools-track:focus-within {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .sastastore-tools-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
