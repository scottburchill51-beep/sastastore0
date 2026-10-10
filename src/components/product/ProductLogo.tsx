"use client";

import Image from "next/image";
import { useState } from "react";

type ProductLogoProps = {
  name: string;
  logo: string;
  size?: "small" | "large";
};

export function ProductLogo({
  name,
  logo,
  size = "small",
}: ProductLogoProps) {
  const [hasError, setHasError] = useState(false);

  const logoSrc = logo.replace(/\.webp$/i, ".png");

  const isLarge = size === "large";

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-elevated ${
        isLarge ? "h-16 w-16" : "h-12 w-12"
      }`}
    >
      {!hasError ? (
        <Image
          src={logoSrc}
          alt={`${name} logo`}
          width={isLarge ? 64 : 48}
          height={isLarge ? 64 : 48}
          className={`h-full w-full object-contain ${
            isLarge ? "p-3" : "p-2"
          }`}
          onError={() => setHasError(true)}
        />
      ) : (
        <span
          className={`font-bold text-brand ${
            isLarge ? "text-2xl" : "text-lg"
          }`}
        >
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}