import { products } from "@/data/products";

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getPopularProducts() {
  return products.filter((product) => product.popular);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.category === categorySlug);
}

export function getAvailableProducts() {
  return products.filter(
    (product) => product.availability !== "out-of-stock",
  );
}

export function getLowestProductPrice(productSlug: string) {
  const product = getProductBySlug(productSlug);

  if (!product || product.plans.length === 0) {
    return null;
  }

  return Math.min(...product.plans.map((plan) => plan.price));
}