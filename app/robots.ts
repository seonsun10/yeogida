import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 공개 페이지를 크롤링할 수 있어야 페이지별 noindex 지시도 읽을 수 있다.
      disallow: ['/api/', '/admin', '/ko/admin', '/en/admin'],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
