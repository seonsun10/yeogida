'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Next.js App Router는 `<Link>` 이동 시 풀 페이지 리로드가 없어 GA/GTM의 기본
 * page_view(로드 1회 발생)가 최초 진입 페이지 이후로는 다시 발생하지 않는다.
 * 라우트가 바뀔 때마다 page_view를 수동으로 재전송해 이를 보정한다.
 */
export function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    const pageLocation = window.location.href;
    const pageTitle = document.title;

    window.gtag?.('event', 'page_view', {
      page_path: pagePath,
      page_location: pageLocation,
      page_title: pageTitle,
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      page_path: pagePath,
      page_location: pageLocation,
      page_title: pageTitle,
    });
  }, [pathname, searchParams]);

  return null;
}
