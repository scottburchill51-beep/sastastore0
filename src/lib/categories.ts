import { categories } from "@/data/categories";

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getFeaturedCategories() {
  return categories.filter((category) => category.featured);
}