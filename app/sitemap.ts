import type { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/guides';
import { getAllCategories, getAllServices } from '@/lib/services';
import { getSiteUrl } from '@/lib/site-url';
import { BOARD_TYPES } from '@/lib/board-constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  // 게시글 개별 페이지는 이용자 작성 콘텐츠라 사이트맵에서 제외하고
  // 게시판 인덱스/목록(안정적인 정적 경로)만 포함한다.
  const boardRoutes = ['/board', ...BOARD_TYPES.map((board) => `/board/${board}`)];

  // /discover(민간 사이트 소개 섹션)는 robots.ts에서 통째로 disallow하는 중이라
  // 사이트맵에도 포함하지 않는다 — 애드센스 "가치 없는 콘텐츠" 판정 위험 때문
  // (data/AGENTS.md, 관련 memory 참고). 콘텐츠 보강 후 재포함 검토.
  const staticRoutes = ['', '/about', '/guides', '/submit', '/privacy', '/terms', ...boardRoutes].map(
    (path) => ({
      url: `${siteUrl}${path}`,
    }),
  );

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

  // i18n.en.official(공식 출처 번역)이라 robots.ts에서 개별 allow된 서비스만 포함(I18N-PLAN.md 참고).
  const translatedServiceRoutes = services
    .filter((service) => service.i18n?.en?.official)
    .map((service) => ({
      url: `${siteUrl}/en/service/${service.slug}`,
      lastModified: service.lastVerified,
    }));

  return [...staticRoutes, ...categoryRoutes, ...guideRoutes, ...serviceRoutes, ...translatedServiceRoutes];
}
