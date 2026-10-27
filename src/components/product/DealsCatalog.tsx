
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

type DealInfo = {
  discountPercent: number;
  savings: number;
  planName: string;
  currentPrice: number;
  originalPrice: number;
};

function getBestDeal(product: Product): DealInfo | null {
  let best: DealInfo | null = null;

  for (const plan of product.plans) {
    const currentPrice = Number(plan.price);
    const originalPrice = Number(plan.originalPrice);

    if (
      plan.originalPrice == null ||
      !Number.isFinite(currentPrice) ||
      !Number.isFinite(originalPrice) ||
      currentPrice <= 0 ||
      originalPrice <= currentPrice
    ) {
      continue;
    }

    const savings = originalPrice - currentPrice;

    const discountPercent = Math.round(
      (savings / originalPrice) * 100,
    );

    if (
      !best ||
      discountPercent > best.discountPercent
    ) {
      best = {
        discountPercent,
        savings,
        planName: plan.name,
        currentPrice,
        originalPrice,
      };
    }
  }

  return best;
}

function formatPKR(amount: number) {
  return `PKR ${amount.toLocaleString("en-PK", {
    maximumFractionDigits: 2,
  })}`;
}

export function DealsCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
            : "Unable to load deals.",
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
          : "Unable to load deals.",
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

    return () =>
      document.removeEventListener(
        "visibilitychange",
        refreshOnFocus,
      );
  }, [loadProducts]);

  const deals = useMemo(() => {
    return products
      .map((product) => ({
        product,
        deal: getBestDeal(product),
      }))
      .filter(
        (
          entry,
        ): entry is {
          product: Product;
          deal: DealInfo;
        } => entry.deal !== null,
      )
      .sort(
        (a, b) =>
          b.deal.discountPercent -
          a.deal.discountPercent,
      );
  }, [products]);

  const featuredProducts = useMemo(() => {
    const dealSlugs = new Set(
      deals.map((item) => item.product.slug),
    );

    return products.filter(
      (product) =>
        !dealSlugs.has(product.slug) &&
        (product.featured === true ||
          product.popular === true ||
          product.new === true),
    );
  }, [products, deals]);

  return (
    <div className="space-y-16">
      {/* Active Deals Heading */}
      <section aria-labelledby="deals-heading">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              Actual Configured Discounts
            </p>

            <h2
              id="deals-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Current Special Deals
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              These offers are calculated from
              the original and current prices
              configured in our live product catalog.
            </p>
          </div>

          {!loading && !error && (
            <span className="rounded-full border border-blue-200 bg-white px-5 py-2.5 text-sm font-extrabold text-blue-700 shadow-sm">
              {deals.length}{" "}
              {deals.length === 1
                ? "Active Deal"
                : "Active Deals"}
            </span>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div
            role="status"
            className="mt-8 rounded-2xl border border-blue-100 bg-white p-10 text-center text-slate-600"
          >
            Loading the latest deals...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            role="alert"
            className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
          >
            <h3 className="text-xl font-extrabold text-red-800">
              Unable to Load Deals
            </h3>

            <p className="mt-3 text-sm text-red-700">
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

        {/* Actual Deals */}
        {!loading && !error && deals.length > 0 && (
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {deals.map(({ product, deal }) => (
              <article
                key={product.slug}
                className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-blue-200 bg-white shadow-md shadow-blue-100/40"
              >
                {/* Discount Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-blue-600 to-sky-600 px-4 py-3 text-white">
                  <span className="text-xs font-extrabold uppercase tracking-wider">
                    Special Deal
                  </span>

                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-blue-700">
                    {deal.discountPercent}% OFF
                  </span>
                </div>

                {/* Existing Product Card */}
                <div className="min-w-0 flex-1">
                  <ProductCard product={product} />
                </div>

                {/* Actual Plan Discount */}
                <div className="border-t border-blue-100 bg-blue-50/70 px-4 py-4">
                  <p className="text-xs font-bold text-slate-700">
                    Offer on: {deal.planName}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-400 line-through">
                      {formatPKR(deal.originalPrice)}
                    </span>

                    <span className="text-sm font-extrabold text-blue-700">
                      {formatPKR(deal.currentPrice)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-bold text-emerald-700">
                    Save {formatPKR(deal.savings)}
                  </p>

                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-3 inline-flex text-xs font-extrabold text-blue-700 hover:underline"
                  >
                    View Plans & Buy →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* No Deals */}
        {!loading && !error && deals.length === 0 && (
          <div className="mt-8 rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl font-extrabold text-blue-600">
              %
            </div>

            <h3 className="mt-6 text-2xl font-extrabold">
              New Deals Coming Soon
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
              There are no separately configured
              discounts in the live catalog at
              the moment. Explore our featured
              products below or ask our team
              about new offers.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </section>

      {/* Featured and Popular */}
      {!loading &&
        !error &&
        featuredProducts.length > 0 && (
          <section aria-labelledby="featured-heading">
            <div className="mb-8">
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                Explore More
              </p>

              <h2
                id="featured-heading"
                className="mt-3 text-3xl font-extrabold sm:text-4xl"
              >
                Featured & Popular Picks
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Discover highlighted products
                from our catalog. These are not
                necessarily discounted items.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                />
              ))}
            </div>
          </section>
        )}

      {/* Refresh */}
      {!loading && !error && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-600">
            Product prices and offers may change.
            Check the selected plan before payment.
          </p>

          <button
            type="button"
            onClick={() => void loadProducts()}
            className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
          >
            Refresh Deals
          </button>
        </div>
      )}
    </div>
  );
}
