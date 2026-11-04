
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CategoryIcon } from "@/components/common/CategoryIcon";

type CategoryItem = {
  slug: string;
  name: string;
  description: string;
  productCount: number;
};

type CategoryCarouselProps = {
  items: CategoryItem[];
};

export function CategoryCarousel({
  items,
}: CategoryCarouselProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const pausedUntilRef = useRef(0);
  const touchingRef = useRef(false);

  useEffect(() => {
    const slider = sliderRef.current;
    const group = groupRef.current;

    if (!slider || !group || items.length === 0) {
      return;
    }

    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let frameId = 0;
    let lastTime = 0;

    function animate(time: number) {
      if (!slider || !group) return;

      if (lastTime === 0) {
        lastTime = time;
      }

      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      if (
        !media.matches &&
        !touchingRef.current &&
        time >= pausedUntilRef.current &&
        document.visibilityState === "visible"
      ) {
        const groupWidth = group.offsetWidth;

        if (groupWidth > 0) {
          slider.scrollLeft +=
            (delta / 1000) * 35;

          if (slider.scrollLeft >= groupWidth) {
            slider.scrollLeft -= groupWidth;
          }
        }
      }

      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [items.length]);

  function move(direction: number) {
    const slider = sliderRef.current;
    if (!slider) return;

    pausedUntilRef.current = performance.now() + 2500;

    slider.scrollBy({
      left: direction * 280,
      behavior: "smooth",
    });
  }

  if (items.length === 0) return null;

  return (
    <div className="w-full min-w-0">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          Explore categories
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous categories"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-white font-bold text-blue-600 shadow-sm"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next categories"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-white font-bold text-blue-600 shadow-sm"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="w-full overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onTouchStart={() => {
          touchingRef.current = true;
        }}
        onTouchEnd={() => {
          touchingRef.current = false;
          pausedUntilRef.current =
            performance.now() + 2000;
        }}
        onTouchCancel={() => {
          touchingRef.current = false;
        }}
        onFocusCapture={() => {
          pausedUntilRef.current = Infinity;
        }}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(
              event.relatedTarget as Node | null,
            )
          ) {
            pausedUntilRef.current =
              performance.now() + 1000;
          }
        }}
        aria-label="Product categories"
      >
        <div className="flex w-max">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              ref={copy === 0 ? groupRef : undefined}
              className="flex shrink-0 gap-4 pr-4"
              aria-hidden={copy === 1}
              inert={copy === 1}
            >
              {items.map((item) => (
                <Link
                  key={`${copy}-${item.slug}`}
                  href={`/categories/${encodeURIComponent(item.slug)}`}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="group flex w-[220px] shrink-0 flex-col rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-lg sm:w-[280px]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-emerald-50 text-blue-600">
                      <CategoryIcon slug={item.slug} />
                    </div>

                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                      {item.productCount} Products
                    </span>
                  </div>

                  <h3 className="mt-5 line-clamp-2 text-lg font-extrabold text-slate-900">
                    {item.name}
                  </h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-xs leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-blue-100 pt-4">
                    <span className="text-sm font-bold text-blue-600">
                      Explore Category
                    </span>

                    <span className="font-bold text-blue-600">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
