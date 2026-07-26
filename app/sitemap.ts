import type { MetadataRoute } from 'next';
import { getAllCategories, getAllServices } from '@/lib/services';

// TODO: 브랜드/도메인 확정 후 실제 도메인으로 교체 (계획서 6장 보류사항)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/submit', '/privacy', '/terms'].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const categoryRoutes = getAllCategories().map((category) => ({
    url: `${SITE_URL}/category/${category.slug}`,
  }));

  const serviceRoutes = getAllServices().map((service) => ({
    url: `${SITE_URL}/service/${service.slug}`,
    lastModified: service.lastVerified,
  }));

  return [...staticRoutes, ...categoryRoutes, ...serviceRoutes];
}
