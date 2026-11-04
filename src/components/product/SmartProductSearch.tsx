
"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { ProductLogo } from "@/components/product/ProductLogo";
import type { Product } from "@/types/product";

export function SmartProductSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch(
          "/api/store/products",
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Unable to fetch products");
        }

        const data: unknown = await response.json();

        if (
          !data ||
          typeof data !== "object" ||
          !("products" in data) ||
          !Array.isArray(data.products)
        ) {
          throw new Error("Invalid products response");
        }

        if (!controller.signal.aborted) {
          setProducts(data.products as Product[]);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => controller.abort();
  }, []);

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return products
      .filter((product) => {
        const searchable = [
          product.name,
          product.shortDescription,
          product.category,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchable.includes(query);
      })
      .slice(0, 6);
  }, [products, search]);

  const showResults =
    focused && search.trim().length > 0;

  return (
    <div
      className="relative mx-auto mt-8 w-full max-w-2xl text-left"
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget as Node | null,
          )
        ) {
          setFocused(false);
        }
      }}
    >
      <div className="relative rounded-2xl border border-[#B9D8CD] bg-white p-1.5 shadow-xl shadow-emerald-900/5 transition focus-within:border-[#123B35] focus-within:ring-2 focus-within:ring-[#123B35]/10">
        <div className="flex items-center gap-3 px-3">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-[#123B35]"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            onFocus={() => setFocused(true)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setFocused(false);
                event.currentTarget.blur();
              }
            }}
            placeholder="Search Canva, CapCut, Netflix..."
            aria-label="Search SastaStore products"
            aria-expanded={showResults}
            aria-controls="smart-product-results"
            autoComplete="off"
            className="h-12 min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {showResults && (
        <div
          id="smart-product-results"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[340px] overflow-y-auto rounded-2xl border border-emerald-100 bg-white p-2 shadow-2xl shadow-emerald-950/15"
        >
          {loading ? (
            <p
              role="status"
              className="px-4 py-5 text-center text-sm text-slate-500"
            >
              Searching products...
            </p>
          ) : error ? (
            <p
              role="alert"
              className="px-4 py-5 text-center text-sm text-red-600"
            >
              Products could not be loaded.
              Please try the catalog below.
            </p>
          ) : results.length === 0 ? (
            <p className="px-4 py-5 text-center text-sm text-slate-500">
              No matching products found.
            </p>
          ) : (
            <>
              <p className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Matching Products
              </p>

              {results.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${encodeURIComponent(
                    product.slug,
                  )}`}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-[#EDF6F2] focus-visible:bg-[#EDF6F2] focus-visible:outline-none"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-emerald-100 bg-white p-1">
                    <ProductLogo
                      name={product.name}
                      logo={product.logo}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-extrabold text-slate-900">
                      {product.name}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {product.shortDescription}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="font-bold text-[#123B35]"
                  >
                    →
                  </span>
                </Link>
              ))}
            </>
          )}

          <Link
            href="/products"
            className="mt-2 block rounded-xl bg-[#123B35] px-4 py-3 text-center text-xs font-extrabold text-white transition hover:bg-[#20594F]"
          >
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
