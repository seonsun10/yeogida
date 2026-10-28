import type { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/guides';
import { getAllCategories, getAllServices } from '@/lib/services';
import { getSiteUrl } from '@/lib/site-url';
import { getAllSiteCategories, getAllSites } from '@/lib/sites';
import { getDiscoverGuides } from '@/lib/discover-guides';
import { serviceNotes, siteNotes } from '@/lib/editorial-notes';
import { getGuideReview } from '@/lib/guide-reviews';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  // 편집 콘텐츠를 포함하고, noindex인 게시판과 제보 양식은 제외한다.
  const staticRoutes = [
    '',
    '/about',
    '/guides',
    '/privacy',
    '/terms',
    '/discover',
    '/discover/about',
    '/discover/guides',
    '/discover/privacy',
    '/discover/terms',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
  }));

  const categoryRoutes = getAllCategories().map((category) => ({
    url: `${siteUrl}/category/${category.slug}`,
  }));

  const guideRoutes = getAllGuides().map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified:
      getGuideReview(guide.slug)?.reviewedAt ??
      guide.updatedAt ??
      guide.publishedAt,
  }));

  const services = await getAllServices();
  const serviceRoutes = services.map((service) => ({
    url: `${siteUrl}/service/${service.slug}`,
    lastModified: [
      service.lastVerified,
      serviceNotes[service.slug]?.reviewedAt ?? '',
    ]
      .sort()
      .at(-1),
  }));

  // 영어 페이지 중 페이지별 메타데이터로 색인을 허용한 공식 출처 번역만 포함한다.
  const translatedServiceRoutes = services
    .filter((service) => service.i18n?.en?.official)
    .map((service) => ({
      url: `${siteUrl}/en/service/${service.slug}`,
      lastModified: service.lastVerified,
    }));

  const sites = await getAllSites();
  const discoverCategories = getAllSiteCategories()
    .filter((category) =>
      sites.some((site) => site.categorySlug === category.slug),
    )
    .map((category) => ({ url: `${siteUrl}/discover/${category.slug}` }));
  const discoverSites = sites.map((site) => ({
    url: `${siteUrl}/discover/site/${site.slug}`,
    lastModified: [site.lastVerified, siteNotes[site.slug]?.reviewedAt ?? '']
      .sort()
      .at(-1),
  }));
  const discoverGuides = getDiscoverGuides().map((guide) => ({
    url: `${siteUrl}/discover/guides/${guide.slug}`,
    lastModified: guide.publishedAt,
  }));
  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...guideRoutes,
    ...serviceRoutes,
    ...translatedServiceRoutes,
    ...discoverCategories,
    ...discoverSites,
    ...discoverGuides,
  ];
}
