import type { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/guides';
import { getAllCategories, getAllServices } from '@/lib/services';
import { getAllSiteCategories, getAllSites } from '@/lib/sites';
import { getSiteUrl } from '@/lib/site-url';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticRoutes = [
    '',
    '/about',
    '/guides',
    '/submit',
    '/privacy',
    '/terms',
    '/discover',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
  }));

  const categoryRoutes = getAllCategories().map((category) => ({
    url: `${siteUrl}/category/${category.slug}`,
  }));

  const guideRoutes = getAllGuides().map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified: guide.publishedAt,
  }));

  const services = await getAllServices();
  const serviceRoutes = services.map((service) => ({
    url: `${siteUrl}/service/${service.slug}`,
    lastModified: service.lastVerified,
  }));

  const discoverCategoryRoutes = getAllSiteCategories().map((category) => ({
    url: `${siteUrl}/discover/${category.slug}`,
  }));

  const sites = await getAllSites();
  const siteRoutes = sites.map((site) => ({
    url: `${siteUrl}/discover/site/${site.slug}`,
    lastModified: site.lastVerified,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...guideRoutes,
    ...serviceRoutes,
    ...discoverCategoryRoutes,
    ...siteRoutes,
  ];
}
