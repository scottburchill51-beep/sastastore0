
"use client";

import { useEffect, useState } from "react";

type ProductLogoProps = {
  name: string;
  logo: string;
  size?: "small" | "large";
  priority?: boolean;
};

const verifiedLogos: Record<string, string> = {
  "/products/canva-pro/logo.webp":
    "/products/canva-pro/logo.png",
};

function preferredSource(logo: string) {
  const original = (logo || "").trim();
  const preferred = verifiedLogos[original] || original;

  if (
    !preferred ||
    /^(https?:|data:|blob:)/i.test(preferred) ||
    preferred.startsWith("/")
  ) {
    return preferred;
  }

  // Older product records store only the uploaded filename.
  // Resolve those files from the public Supabase product-images bucket.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    return `/${preferred}`;
  }

  const objectPath = preferred
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  const baseUrl = supabaseUrl.endsWith("/") ? supabaseUrl.slice(0, -1) : supabaseUrl;\n  return `${baseUrl}/storage/v1/object/public/product-images/${objectPath}`;
}

function alternateSource(source: string) {
  // Never modify remote Supabase URLs.
  if (!source.startsWith("/")) {
    return null;
  }

  if (/\.webp(?=$|[?#])/i.test(source)) {
    return source.replace(
      /\.webp(?=$|[?#])/i,
      ".png",
    );
  }

  if (/\.png(?=$|[?#])/i.test(source)) {
    return source.replace(
      /\.png(?=$|[?#])/i,
      ".webp",
    );
  }

  return null;
}

function cacheKey(original: string) {
  return `ss-logo:${original}`;
}

function getRememberedSource(original: string) {
  const preferred = preferredSource(original);

  if (typeof window === "undefined") {
    return preferred;
  }

  try {
    const remembered = window.sessionStorage.getItem(
      cacheKey(original),
    );

    const alternate = alternateSource(preferred);

    if (
      remembered === preferred ||
      (alternate && remembered === alternate)
    ) {
      return remembered;
    }
  } catch {
    // Storage may be unavailable; image loading still works.
  }

  return preferred;
}

export function ProductLogo({
  name,
  logo,
  size = "small",
  priority = false,
}: ProductLogoProps) {
  const original = (logo || "").trim();
  const preferred = preferredSource(original);

  const [source, setSource] = useState(preferred);
  const [failed, setFailed] = useState(false);
  const [tried, setTried] = useState<string[]>([]);

  const isLarge = size === "large";
  const dimensions = isLarge ? 64 : 48;

  useEffect(() => {
    setSource(getRememberedSource(original));
    setFailed(false);
    setTried([]);
  }, [original]);

  function handleError() {
    const nextTried = [...tried, source];
    const alternate = alternateSource(source);

    if (
      alternate &&
      !nextTried.includes(alternate)
    ) {
      setTried(nextTried);
      setSource(alternate);
      return;
    }

    setFailed(true);

    try {
      window.sessionStorage.removeItem(
        cacheKey(original),
      );
    } catch {
      // Ignore disabled storage.
    }
  }

  function handleLoad() {
    try {
      window.sessionStorage.setItem(
        cacheKey(original),
        source,
      );
    } catch {
      // Browser storage is optional.
    }
  }

  const showImage = Boolean(source) && !failed;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#e2e9e2] bg-white ${
        isLarge ? "h-16 w-16" : "h-12 w-12"
      }`}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={source}
          src={source}
          alt={`${name} logo`}
          width={dimensions}
          height={dimensions}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`h-full w-full object-contain ${
            isLarge ? "p-2" : "p-1.5"
          }`}
        />
      ) : (
        <span
          aria-label={`${name} logo unavailable`}
          className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-[#edf5ed] to-[#f8f4e8] font-extrabold text-[#24583d] ${
            isLarge ? "text-2xl" : "text-lg"
          }`}
        >
          {name.trim().charAt(0).toUpperCase() || "S"}
        </span>
      )}
    </div>
  );
}
