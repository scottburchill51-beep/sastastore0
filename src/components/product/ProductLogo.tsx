
"use client";

import { useState } from "react";

type ProductLogoProps = {
  name: string;
  logo: string;
  size?: "small" | "large";
};

function normaliseLogo(value: string) {
  const source = (value || "").trim();

  if (!source) {
    return "";
  }

  // Keep original image formats and URLs.
  // Do not change .webp into .png.
  return source;
}

export function ProductLogo({
  name,
  logo,
  size = "small",
}: ProductLogoProps) {
  const source = normaliseLogo(logo);

  const [failedSource, setFailedSource] =
    useState<string | null>(null);

  const isLarge = size === "large";

  const dimensions = isLarge ? 64 : 48;

  const imageFailed =
    !source || failedSource === source;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-blue-100 bg-white ${
        isLarge
          ? "h-16 w-16"
          : "h-12 w-12"
      }`}
    >
      {!imageFailed ? (
        // Native image avoids Next.js remote-domain
        // restrictions for Supabase uploaded logos.
        //
        // Browser caching can reuse the image URL.
        //
        // No additional PNG retry requests.
        //
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={source}
          src={source}
          alt={`${name} logo`}
          width={dimensions}
          height={dimensions}
          loading="eager"
          decoding="async"
          fetchPriority="auto"
          referrerPolicy="no-referrer"
          onError={() => setFailedSource(source)}
          className={`h-full w-full object-contain ${
            isLarge ? "p-2" : "p-1.5"
          }`}
        />
      ) : (
        <span
          aria-label={`${name} logo unavailable`}
          className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50 font-extrabold text-blue-600 ${
            isLarge
              ? "text-2xl"
              : "text-lg"
          }`}
        >
          {name.trim().charAt(0).toUpperCase() || "S"}
        </span>
      )}
    </div>
  );
}
