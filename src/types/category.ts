export type Category = {
  name: string;
  slug: string;
  description: string;

  icon?: string;
  image?: string;

  featured?: boolean;

  seo: {
    title: string;
    description: string;
  };
};