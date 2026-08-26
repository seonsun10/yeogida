import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /en은 아직 대부분 한국어 원문을 그대로 노출하는 중간 단계라 색인에서 제외한다.
      // 콘텐츠 번역이 채워지는 대로 페이지 단위로 해제할 예정(I18N-PLAN.md 참고).
      disallow: ['/api/', '/admin', '/en', '/en/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
