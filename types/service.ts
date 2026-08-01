export type Service = {
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
  hours: string;
  cost: 'free' | 'paid';
  badges: string[];
  source: string;
  affiliate: boolean;
  lastVerified: string;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  color: string;
};
