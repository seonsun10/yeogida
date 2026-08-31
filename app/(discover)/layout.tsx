import type { Metadata } from 'next';
import { AnalyticsScripts } from '@/app/AnalyticsScripts';
import { DiscoverHeader } from '@/components/discover/Header';
import { DiscoverFooter } from '@/components/discover/Footer';
import { fontVariables } from '@/lib/fonts';
import { getAllSiteCategories } from '@/lib/sites';
import { getSiteUrl } from '@/lib/site-url';
import {
  DISCOVER_SITE_DESCRIPTION,
  DISCOVER_SITE_NAME,
} from '@/lib/discover-constants';
import '../globals.css';

const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: DISCOVER_SITE_NAME,
    template: `%s | ${DISCOVER_SITE_NAME}`,
  },
  description: DISCOVER_SITE_DESCRIPTION,
  alternates: {
    canonical: '/discover',
  },
  // 이미 잘 알려진 민간 사이트를 짧게 소개하는 섹션이라 애드센스 심사에서
  // "가치 없는 콘텐츠"로 오인될 위험이 있어, 콘텐츠를 더 보강할 때까지 검색 노출에서 제외한다.
  // robots.txt의 /discover disallow와 함께 이중으로 막아둔다.
  robots: { index: false, follow: true },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: `${getSiteUrl()}/discover`,
    siteName: DISCOVER_SITE_NAME,
    title: DISCOVER_SITE_NAME,
    description: DISCOVER_SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: DISCOVER_SITE_NAME,
    description: DISCOVER_SITE_DESCRIPTION,
  },
  verification: {
    ...(GOOGLE_SITE_VERIFICATION && { google: GOOGLE_SITE_VERIFICATION }),
  },
  other: {
    'naver-site-verification': 'bfdbd2f28fe6edec15b5a6ece122cb87d1a85ed1',
    ...(ADSENSE_CLIENT_ID && { 'google-adsense-account': ADSENSE_CLIENT_ID }),
  },
};

export default function DiscoverLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = getAllSiteCategories();

  return (
    <html lang="ko" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="absolute top-2 left-2 z-50 -translate-y-16 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-transform focus:translate-y-0"
        >
          본문으로 바로가기
        </a>
        <AnalyticsScripts />
        <div data-theme="discover" className="flex min-h-screen flex-1 flex-col bg-background text-foreground">
          <DiscoverHeader categories={categories} />
          <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
            {children}
          </main>
          <DiscoverFooter />
        </div>
      </body>
    </html>
  );
}
