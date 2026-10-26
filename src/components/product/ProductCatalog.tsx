
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ProductCard } from "@/components/product/ProductCard";
import { categories } from "@/data/categories";
import type { Product } from "@/types/product";

type SortOption =
  | "default"
  | "price-low"
  | "price-high"
  | "name";

type ProductTypeFilter =
  | "all"
  | "popular"
  | "featured"
  | "new";

function getLowestPrice(product: Product): number {
  const prices = product.plans
    .map((plan) => Number(plan.price))
    .filter(
      (price) =>
        Number.isFinite(price) && price > 0,
    );

  return prices.length
    ? Math.min(...prices)
    : Number.POSITIVE_INFINITY;
}

export function ProductCatalog() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [typeFilter, setTypeFilter] =
    useState<ProductTypeFilter>("all");

  const [sort, setSort] =
    useState<SortOption>("default");

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
          data.error || "Unable to load products.",
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

  // Refresh the catalog when the customer
  // returns to this browser tab.
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

  const availableCategories = useMemo(() => {
    const known = new Map(
      categories.map((item) => [
        item.slug,
        item.name,
      ]),
    );

    const actual = new Set(
      products
        .map((product) => product.category)
        .filter(
          (value): value is string =>
            typeof value === "string" &&
            value.length > 0,
        ),
    );

    return Array.from(actual).map((slug) => ({
      slug,
      name:
        known.get(slug) ||
        slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (letter) =>
            letter.toUpperCase(),
          ),
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const searchableText = [
        product.name,
        product.shortDescription,
        product.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesCategory =
        category === "all" ||
        product.category === category;

      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "popular" &&
          product.popular === true) ||
        (typeFilter === "featured" &&
          product.featured === true) ||
        (typeFilter === "new" &&
          product.new === true);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType
      );
    });

    return [...result].sort((a, b) => {
      if (sort === "price-low") {
        return getLowestPrice(a) - getLowestPrice(b);
      }

      if (sort === "price-high") {
        return getLowestPrice(b) - getLowestPrice(a);
      }

      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }

      // Supabase API returns newest products first.
      return 0;
    });
  }, [
    products,
    search,
    category,
    typeFilter,
    sort,
  ]);

  const hasActiveFilters =
    search !== "" ||
    category !== "all" ||
    typeFilter !== "all" ||
    sort !== "default";

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setTypeFilter("all");
    setSort("default");
  }

  return (
    <>
      {/* Search and Filter Controls */}
      <div className="mt-10 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Search */}
          <div className="relative">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
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
              placeholder="Search subscriptions..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-blue-500"
          >
            <option value="all">
              All Categories
            </option>

            {availableCategories.map((item) => (
              <option
                key={item.slug}
                value={item.slug}
              >
                {item.name}
              </option>
            ))}
          </select>

          {/* Type */}
          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(
                event.target.value as ProductTypeFilter,
              )
            }
            className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-blue-500"
          >
            <option value="all">All Products</option>
            <option value="popular">Popular</option>
            <option value="featured">Featured</option>
            <option value="new">New</option>
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(event) =>
              setSort(
                event.target.value as SortOption,
              )
            }
            className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-blue-500"
          >
            <option value="default">
              Newest First
            </option>
            <option value="price-low">
              Price: Low to High
            </option>
            <option value="price-high">
              Price: High to Low
            </option>
            <option value="name">
              Name: A to Z
            </option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            {loading
              ? "Loading latest subscriptions..."
              : (
                <>
                  Showing{" "}
                  <span className="font-bold text-slate-900">
                    {filteredProducts.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-900">
                    {products.length}
                  </span>{" "}
                  products
                </>
              )}
          </p>

          <div className="flex items-center gap-4">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                Clear Filters
              </button>
            )}

            <button
              type="button"
              onClick={() => void loadProducts()}
              disabled={loading}
              className="text-sm font-bold text-blue-600 hover:underline disabled:opacity-50"
            >
              Refresh Products
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && products.length === 0 && !error && (
        <div
          role="status"
          className="mt-8 rounded-2xl border border-blue-100 bg-white p-12 text-center text-slate-600"
        >
          Loading the latest subscriptions...
        </div>
      )}

      {/* Database Error */}
      {error && (
        <div
          role="alert"
          className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
        >
          <h2 className="text-lg font-extrabold text-red-800">
            Products Could Not Be Loaded
          </h2>

          <p className="mt-2 text-sm text-red-700">
            {error}
          </p>

          <button
            type="button"
            onClick={() => void loadProducts()}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Product Grid */}
      {!loading &&
        !error &&
        filteredProducts.length > 0 && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
              />
            ))}
          </div>
        )}

      {/* Empty State */}
      {!loading &&
        !error &&
        filteredProducts.length === 0 && (
          <div className="mt-8 rounded-2xl border border-blue-100 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-extrabold text-slate-900">
              No Products Found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              {products.length === 0
                ? "No subscriptions are currently listed."
                : "Try another search term or clear your filters."}
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
    </>
  );
}
