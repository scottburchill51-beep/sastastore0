
"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";

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
  const pausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider || items.length === 0) return;

    const motion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let frame = 0;
    let previous = 0;

    function animate(time: number) {
      if (!slider) return;

      if (previous === 0) previous = time;

      const delta = Math.min(time - previous, 50);
      previous = time;

      if (
        !pausedRef.current &&
        !motion.matches &&
        document.visibilityState === "visible"
      ) {
        const half = slider.scrollWidth / 2;

        if (half > 0) {
          slider.scrollLeft += (delta / 1000) * 25;

          if (slider.scrollLeft >= half) {
            slider.scrollLeft -= half;
          }
        }
      }

      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [items.length]);

  function move(direction: number) {
    const slider = sliderRef.current;

    if (!slider) return;

    setIsPaused(true);

    slider.scrollBy({
      left: direction * 280,
      behavior: "smooth",
    });
  }

  if (items.length === 0) return null;

  return (
    <section className="w-full min-w-0">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-slate-500 sm:text-sm">
          Explore categories
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous categories"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-white font-bold text-blue-700 shadow-sm hover:bg-blue-50"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next categories"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-white font-bold text-blue-700 shadow-sm hover:bg-blue-50"
          >
            →
          </button>

          {isPaused && (
            <button
              type="button"
              onClick={() => setIsPaused(false)}
              className="rounded-full border border-emerald-200 bg-emerald-50 px-4 text-xs font-bold text-emerald-700"
            >
              Auto Play
            </button>
          )}
        </div>
      </div>

      <div
        ref={sliderRef}
        className="overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(
              event.relatedTarget as Node | null,
            )
          ) {
            setIsPaused(false);
          }
        }}
        aria-label="Product categories"
      >
        <div className="flex w-max gap-4">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 gap-4"
              aria-hidden={copy === 1}
              inert={copy === 1}
            >
              {items.map((item) => (
                <Link
                  key={`${copy}-${item.slug}`}
                  href={`/categories/${encodeURIComponent(item.slug)}`}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="group relative flex w-[220px] shrink-0 flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-lg sm:w-[280px]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-emerald-50 text-blue-600">
                      <CategoryIcon slug={item.slug} />
                    </div>

                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                      {item.productCount} Products
                    </span>
                  </div>

                  <h3 className="mt-5 line-clamp-2 text-lg font-extrabold text-slate-900 group-hover:text-blue-600">
                    {item.name}
                  </h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-xs leading-6 text-slate-600 sm:text-sm">
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
    </section>
  );
}
