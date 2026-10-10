import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SastaStore",
    short_name: "SastaStore",
    description: "Premium Digital Tools at Sasta Prices",
    start_url: "/",
    display: "standalone",
    background_color: "#08090c",
    theme_color: "#22c55e",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}