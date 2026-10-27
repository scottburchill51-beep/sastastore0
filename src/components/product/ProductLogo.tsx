
"use client";

import { useEffect, useState } from "react";

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
  const [imageSource, setImageSource] = useState(
    logo?.trim() || "",
  );

  const [fallbackUsed, setFallbackUsed] =
    useState(false);

  const [hasError, setHasError] = useState(false);

  const isLarge = size === "large";

  // Reset image whenever the admin updates the logo.
  useEffect(() => {
    setImageSource(logo?.trim() || "");
    setFallbackUsed(false);
    setHasError(false);
  }, [logo]);

  function handleImageError() {
    // Try original WebP URL first.
    // Only try PNG if the original image fails.
    if (
      !fallbackUsed &&
      /\.webp(?=$|[?#])/i.test(imageSource)
    ) {
      const pngSource = imageSource.replace(
        /\.webp(?=$|[?#])/i,
        ".png",
      );

      setFallbackUsed(true);
      setImageSource(pngSource);
      return;
    }

    setHasError(true);
  }

  const showImage =
    imageSource.length > 0 && !hasError;

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-blue-100 bg-white ${
        isLarge ? "h-16 w-16" : "h-12 w-12"
      }`}
    >
      {showImage ? (
        // Using a native image supports dynamic Supabase
        // storage hosts without Next image hostname config.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={imageSource}
          src={imageSource}
          alt={`${name} logo`}
          width={isLarge ? 64 : 48}
          height={isLarge ? 64 : 48}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className={`h-full w-full object-contain ${
            isLarge ? "p-2" : "p-1.5"
          }`}
        />
      ) : (
        <span
          className={`font-extrabold text-blue-600 ${
            isLarge ? "text-2xl" : "text-lg"
          }`}
        >
          {name.trim().charAt(0).toUpperCase() || "S"}
        </span>
      )}
    </div>
  );
}
