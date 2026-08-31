import type { MetadataRoute } from 'next';
import { getAllServices } from '@/lib/services';
import { getSiteUrl } from '@/lib/site-url';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = getSiteUrl();
  const services = await getAllServices();
  // i18n.en.official(공식 출처 번역)인 서비스만 /en/service/[slug]를 개별 allow한다 — 크롤러는
  // 가장 구체적인(긴) 규칙을 우선 적용하므로 아래처럼 /en 전체 disallow와 공존 가능.
  // 사람이 직접 옮긴(공식 출처 없는) 번역은 페이지는 보이되 색인은 허용하지 않는다(I18N-PLAN.md 참고).
  const translatedServiceAllows = services
    .filter((service) => service.i18n?.en?.official)
    .map((service) => `/en/service/${service.slug}`);

  return {
    rules: {
      userAgent: '*',
      allow: ['/', ...translatedServiceAllows],
      // /en은 아직 대부분 한국어 원문을 그대로 노출하는 중간 단계라 색인에서 제외한다.
      // 콘텐츠 번역이 채워지는 서비스부터 위 allow 목록에 페이지 단위로 추가한다(I18N-PLAN.md 참고).
      // /discover는 이미 잘 알려진 민간 사이트를 짧게 소개하는 섹션이라 애드센스 심사에서
      // "가치 없는 콘텐츠"로 오인될 위험이 있어, 콘텐츠를 더 보강할 때까지 색인에서 제외한다.
      disallow: ['/api/', '/admin', '/en', '/en/', '/discover', '/discover/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
