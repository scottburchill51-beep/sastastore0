"use client";

type ProductLogoProps = {
  name: string;
  logo: string;
  size?: "small" | "large";
  priority?: boolean;
};

// The catalog stores .webp paths, but the repository's verified assets
// are PNG files. Resolve the correct file immediately instead of making
// the browser request a missing .webp file first.
const exactLogoPaths: Record<string, string> = {
  "/products/muse-ai/logo.webp": "/products/muse-ai/Logo.png",
  "/products/outlook-hotmail-pva/logo.webp": "/products/outlook-hotmail-pva/Logo.png",
  "/products/telegram-pva/logo.webp": "/products/telegram-pva/Logo.png",
};

function resolveLogoPath(path: string) {
  const value = (path || "").trim();
  if (exactLogoPaths[value]) return exactLogoPaths[value];
  if (value.startsWith("/") && /\.webp(?=$|[?#])/i.test(value)) {
    return value.replace(/\.webp(?=$|[?#])/i, ".png");
  }
  return value;
}

function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return (words.length > 1
    ? words.slice(0, 2).map((word) => word[0]).join("")
    : (words[0] || "S").slice(0, 2)).toUpperCase();
}

export function ProductLogo({ name, logo, size = "small", priority = false }: ProductLogoProps) {
  const dimensions = size === "large" ? 64 : 48;
  const src = resolveLogoPath(logo);

  return (
    <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#dce8df] bg-white ${size === "large" ? "h-16 w-16" : "h-12 w-12"}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${name} logo`}
          width={dimensions}
          height={dimensions}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className={`h-full w-full object-contain ${size === "large" ? "p-2" : "p-1.5"}`}
          onError={(event) => {
            event.currentTarget.style.display = "none";
            const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = "flex";
          }}
        />
      ) : null}
      <span
        aria-label={`${name} logo`}
        className="hidden h-full w-full items-center justify-center bg-gradient-to-br from-[#e8f5ed] to-[#c8ead5] font-extrabold text-[#176344]"
      >
        {initials(name)}
      </span>
    </div>
  );
}
