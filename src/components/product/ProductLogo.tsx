
"use client";

import { useState } from "react";

type ProductLogoProps = {
  name: string;
  logo: string;
  size?: "small" | "large";
  priority?: boolean;
};

export function ProductLogo({
  name,
  logo,
  size = "small",
  priority = false,
}: ProductLogoProps) {
  const source =
    typeof logo === "string"
      ? logo.trim()
      : "";

  const [failedSource, setFailedSource] =
    useState<string | null>(null);

  const isLarge = size === "large";
  const dimensions = isLarge ? 64 : 48;

  const showImage =
    source.length > 0 &&
    failedSource !== source;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-blue-100 bg-white ${
        isLarge ? "h-16 w-16" : "h-12 w-12"
      }`}
    >
      {showImage ? (
        // Display original image URL directly.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={source}
          src={source}
          alt={`${name} logo`}
          width={dimensions}
          height={dimensions}
          loading="eager"
          fetchPriority={
            priority ? "high" : "auto"
          }
          decoding="async"
          onError={() => {
            setFailedSource(source);
          }}
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
