
"use client";

import Link from "next/link";
import { CategoryIcon } from "@/components/common/CategoryIcon";

type CategoryItem = {
  slug: string;
  name: string;
  description: string;
  productCount: number;
};

type Props = {
  items: CategoryItem[];
};

export function CategoryCarousel({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-500">
          Explore our categories
        </p>

        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
          {items.length} Categories
        </span>
      </div>

      <div className="relative overflow-hidden py-3">
        <div
          className="sastastore-category-track flex w-max"
          style={{
            animationDuration: `${Math.max(
              items.length * 7,
              25,
            )}s`,
          }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 gap-4 pr-4"
              aria-hidden={copy === 1}
            >
              {items.map((item) => (
                <Link
                  key={`${copy}-${item.slug}`}
                  href={`/categories/${encodeURIComponent(
                    item.slug,
                  )}`}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="group relative flex w-[220px] shrink-0 flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition-colors hover:border-emerald-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:w-[270px] sm:rounded-3xl sm:p-6 lg:w-[290px]"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-blue-100 to-emerald-100 opacity-60 blur-3xl" />

                  <div className="relative flex items-start justify-between gap-2">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-emerald-50 text-blue-600">
                      <CategoryIcon slug={item.slug} />
                    </div>

                    <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                      {item.productCount}{" "}
                      {item.productCount === 1
                        ? "Product"
                        : "Products"}
                    </span>
                  </div>

                  <h3 className="relative mt-5 line-clamp-2 min-h-[48px] text-lg font-extrabold leading-6 text-slate-900 transition-colors group-hover:text-blue-600">
                    {item.name}
                  </h3>

                  <p className="relative mt-3 line-clamp-3 min-h-[72px] flex-1 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <div className="relative mt-5 flex items-center justify-between border-t border-blue-100 pt-4">
                    <span className="text-sm font-extrabold text-blue-600">
                      Explore Category
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sastastore-category-scroll {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        .sastastore-category-track {
          animation-name: sastastore-category-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: running;
          will-change: transform;
        }

        .sastastore-category-track:hover,
        .sastastore-category-track:focus-within {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .sastastore-category-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
