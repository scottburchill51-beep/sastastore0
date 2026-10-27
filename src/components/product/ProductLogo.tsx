
"use client";

import { useEffect, useState } from "react";

type ProductLogoProps = {
  name: string;
  logo: string;
  size?: "small" | "large";
  priority?: boolean;
};

function getPngFallback(source: string): string | null {
  // Only try PNG fallback for local WebP images.
  // Never modify external Supabase storage URLs.

  if (!source.startsWith("/")) {
    return null;
  }

  if (!/\.webp(?=$|[?#])/i.test(source)) {
    return null;
  }

  return source.replace(
    /\.webp(?=$|[?#])/i,
    ".png",
  );
}

export function ProductLogo({
  name,
  logo,
  size = "small",
  priority = false,
}: ProductLogoProps) {
  const originalSource =
    typeof logo === "string" ? logo.trim() : "";

  const [currentSource, setCurrentSource] =
    useState(originalSource);

  const [hasError, setHasError] = useState(false);

  const [fallbackAttempted, setFallbackAttempted] =
    useState(false);

  const isLarge = size === "large";

  const dimensions = isLarge ? 64 : 48;

  // Reset image when Admin changes a product logo.
  useEffect(() => {
    setCurrentSource(originalSource);
    setHasError(false);
    setFallbackAttempted(false);
  }, [originalSource]);

  function handleImageError() {
    if (!fallbackAttempted) {
      const pngFallback = getPngFallback(
        currentSource,
      );

      if (pngFallback) {
        setFallbackAttempted(true);
        setCurrentSource(pngFallback);
        return;
      }
    }

    setHasError(true);
  }

  const showImage =
    currentSource.length > 0 && !hasError;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-blue-100 bg-white ${
        isLarge ? "h-16 w-16" : "h-12 w-12"
      }`}
    >
      {showImage ? (
        // Native image supports local and Supabase URLs.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={currentSource}
          src={currentSource}
          alt={`${name} logo`}
          width={dimensions}
          height={dimensions}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={handleImageError}
          className={`h-full w-full object-contain ${
            isLarge ? "p-2" : "p-1.5"
          }`}
        />
      ) : (
        <span
          className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50 font-extrabold text-blue-600 ${
            isLarge ? "text-2xl" : "text-lg"
          }`}
          aria-label={`${name} logo unavailable`}
        >
          {name.trim().charAt(0).toUpperCase() || "S"}
        </span>
      )}
    </div>
  );
}
