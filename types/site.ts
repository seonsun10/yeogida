export type Site = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  categorySlug: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  url: string;
  badges: string[];
  source: string;
  lastVerified: string;
};

export type SiteCategory = {
  slug: string;
  name: string;
  description: string;
  color: string;
};
