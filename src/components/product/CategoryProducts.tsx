
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

type Props = {
  categorySlug: string;
  categoryName: string;
};

export function CategoryProducts({
  categorySlug,
  categoryName,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/store/products",
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Unable to load products.",
        );
      }

      if (!Array.isArray(data.products)) {
        throw new Error("Invalid product data.");
      }

      setProducts(data.products as Product[]);
    } catch (caught) {
      setProducts([]);

      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to load products.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    function refreshOnFocus() {
      if (document.visibilityState === "visible") {
        void loadProducts();
      }
    }

    document.addEventListener(
      "visibilitychange",
      refreshOnFocus,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        refreshOnFocus,
      );
    };
  }, [loadProducts]);

  const categoryProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.category === categorySlug,
      ),
    [products, categorySlug],
  );

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return categoryProducts;
    }

    return categoryProducts.filter((product) => {
      const text = [
        product.name,
        product.shortDescription,
        product.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(query);
    });
  }, [categoryProducts, search]);

  return (
    <section
      aria-label={`${categoryName} products`}
      className="mt-10"
    >
      {/* Search and product count */}
      <div className="flex flex-col gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
            Live Product Catalog
          </p>

          <p className="mt-2 text-sm text-slate-600">
            {loading
              ? "Loading category products..."
              : error
                ? "Product information unavailable"
                : `${categoryProducts.length} ${
                    categoryProducts.length === 1
                      ? "product"
                      : "products"
                  } in ${categoryName}`}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search this category..."
            aria-label={`Search ${categoryName} products`}
            className="h-11 min-w-0 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-60"
          />

          <button
            type="button"
            onClick={() => void loadProducts()}
            disabled={loading}
            className="h-11 rounded-xl border border-blue-200 bg-blue-50 px-4 text-sm font-bold text-blue-700 transition hover:bg-blue-100 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && !error && (
        <div
          role="status"
          className="mt-6 rounded-2xl border border-blue-100 bg-white p-10 text-center text-sm text-slate-600"
        >
          Loading the latest products...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div
          role="alert"
          className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
        >
          <h2 className="text-lg font-extrabold text-red-800">
            Products Could Not Be Loaded
          </h2>

          <p className="mt-3 text-sm text-red-700">
            {error}
          </p>

          <button
            type="button"
            onClick={() => void loadProducts()}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Products */}
      {!loading &&
        !error &&
        visibleProducts.length > 0 && (
          <>
            <p className="mt-6 text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {visibleProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900">
                {categoryProducts.length}
              </span>{" "}
              products
            </p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                />
              ))}
            </div>
          </>
        )}

      {/* Empty category */}
      {!loading &&
        !error &&
        visibleProducts.length === 0 && (
          <div className="mt-6 rounded-3xl border border-blue-100 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="7"
                  height="7"
                  rx="1"
                />
                <rect
                  x="14"
                  y="3"
                  width="7"
                  height="7"
                  rx="1"
                />
                <rect
                  x="3"
                  y="14"
                  width="7"
                  height="7"
                  rx="1"
                />
                <rect
                  x="14"
                  y="14"
                  width="7"
                  height="7"
                  rx="1"
                />
              </svg>
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-slate-900">
              {search.trim()
                ? "No Matching Products"
                : "More Products Coming Soon"}
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
              {search.trim()
                ? "Try another search term to find a product in this category."
                : "There are no products listed in this category right now. Browse the full catalog for other available subscriptions."}
            </p>

            {search.trim() && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
    </section>
  );
}
