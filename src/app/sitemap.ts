
import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/products",
    "/categories",
    "/services",
    "/deals",
    "/faq",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/refund-policy",
  ];

  const staticRoutes: MetadataRoute.Sitemap =
    staticPages.map((path) => ({
      url: new URL(path, siteConfig.url).toString(),
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
    }));

  const productRoutes: MetadataRoute.Sitemap =
    products.map((product) => ({
      url: new URL(
        `/products/${encodeURIComponent(product.slug)}`,
        siteConfig.url
      ).toString(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  const categoryRoutes: MetadataRoute.Sitemap =
    categories.map((category) => ({
      url: new URL(
        `/categories/${encodeURIComponent(category.slug)}`,
        siteConfig.url
      ).toString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Prevent duplicate URLs.
  const uniqueRoutes = new Map(
    [...staticRoutes, ...productRoutes, ...categoryRoutes].map(
      (route) => [route.url, route]
    )
  );

  return Array.from(uniqueRoutes.values());
}
