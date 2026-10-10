export type ProductAvailability = "available" | "limited" | "out-of-stock";

export type ProductPlan = {
  id: string;
  name: string;
  duration?: string;
  price: number;
  originalPrice?: number;
};

export type Product = {
  name: string;
  slug: string;

  category: string;

  shortDescription: string;
  description: string;

  logo: string;
 logoReady?: boolean;
  coverImage: string;

  plans: ProductPlan[];

  features: string[];

  availability: ProductAvailability;

  featured?: boolean;
  popular?: boolean;
  new?: boolean;

  badge?: string;

  deliveryInfo?: string;

  whatsappMessage?: string;

  seo: {
    title: string;
    description: string;
  };
};