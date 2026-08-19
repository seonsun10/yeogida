import type { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/guides';
import { getAllCategories, getAllServices } from '@/lib/services';
import { getAllSiteCategories, getAllSites } from '@/lib/sites';
import { getSiteUrl } from '@/lib/site-url';
import { BOARD_TYPES } from '@/lib/board-constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  // 게시글 개별 페이지는 이용자 작성 콘텐츠라 사이트맵에서 제외하고
  // 게시판 인덱스/목록(안정적인 정적 경로)만 포함한다.
  const boardRoutes = [
    '/board',
    ...BOARD_TYPES.map((board) => `/board/${board}`),
    '/discover/board',
    ...BOARD_TYPES.map((board) => `/discover/board/${board}`),
  ];

  const staticRoutes = [
    '',
    '/about',
    '/guides',
    '/submit',
    '/privacy',
    '/terms',
    '/discover',
    '/discover/submit',
    '/discover/about',
    '/discover/privacy',
    '/discover/terms',
    ...boardRoutes,
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
