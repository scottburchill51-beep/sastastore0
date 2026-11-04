
"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
};

export function ScrollReveal({
  children,
  delay = 0,
  distance = 24,
  duration = 650,
  className = "",
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (
      reducedMotion.matches ||
      typeof IntersectionObserver === "undefined" ||
      typeof element.animate !== "function"
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          observer.unobserve(entry.target);

          const animation = element.animate(
            [
              {
                opacity: 0,
                transform: `translateY(${distance}px)`,
              },
              {
                opacity: 1,
                transform: "translateY(0)",
              },
            ],
            {
              duration,
              delay,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "none",
            }
          );

          animation.finished.catch(() => {
            // Animation may be interrupted during navigation.
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      element.getAnimations().forEach((animation) => {
        animation.cancel();
      });
    };
  }, [delay, distance, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
