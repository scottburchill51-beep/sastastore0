"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/product/ProductCard";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

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

function getLowestPrice(product: (typeof products)[number]) {
  return Math.min(...product.plans.map((plan) => plan.price));
}

export function ProductCatalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [typeFilter, setTypeFilter] =
    useState<ProductTypeFilter>("all");
  const [sort, setSort] =
    useState<SortOption>("default");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" ||
        product.category === category;

      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "popular" && product.popular) ||
        (typeFilter === "featured" && product.featured) ||
        (typeFilter === "new" && product.new);

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

      return 0;
    });
  }, [search, category, typeFilter, sort]);

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
      {/* Search & Filters */}
      <div className="mt-10 rounded-2xl border border-border bg-surface p-4 sm:p-5">
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
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
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
              placeholder="Search products..."
              className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-brand/50 focus:ring-2 focus:ring-brand/10"
            />
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all focus:border-brand/50 focus:ring-2 focus:ring-brand/10"
          >
            <option value="all">
              All Categories
            </option>

            {categories.map((item) => (
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
            className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all focus:border-brand/50 focus:ring-2 focus:ring-brand/10"
          >
            <option value="all">
              All Products
            </option>
            <option value="popular">
              Popular
            </option>
            <option value="featured">
              Featured
            </option>
            <option value="new">
              New
            </option>
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(event) =>
              setSort(
                event.target.value as SortOption,
              )
            }
            className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all focus:border-brand/50 focus:ring-2 focus:ring-brand/10"
          >
            <option value="default">
              Sort: Default
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

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredProducts.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {products.length}
            </span>{" "}
            products
          </p>

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-border bg-surface px-6 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-brand/20 bg-brand/10 text-brand">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </div>

          <h2 className="mt-5 text-lg font-semibold text-foreground">
            No products found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Try another search term or clear your
            filters to see all available products.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-brand-hover"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}