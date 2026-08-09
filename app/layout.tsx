import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_KR } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RouteChangeTracker } from '@/components/RouteChangeTracker';
import { jsonLdScriptProps } from '@/lib/json-ld';
import { getAllCategories } from '@/lib/services';
import { getSiteUrl } from '@/lib/site-url';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoSansKr = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const SITE_DESCRIPTION =
  '여기다(yeogida-life.com)는 사람들이 몰라서 못 쓰는, 실제로 도움이 되는 생활 밀착형 서비스를 카테고리별로 정리한 큐레이션 디렉토리입니다.';

const SITE_KEYWORDS = [
  '여기다',
  'yeogida',
  'yeogida-life',
  '생활 서비스',
  '생활 정보',
  '무료 상담',
  '정부 지원 서비스',
  '복지 서비스',
  '숨은 지원 서비스',
  ...getAllCategories().map((category) => category.name),
];

// 애드센스 승인 후 발급받는 게시자 ID(예: ca-pub-1234567890123456)를 설정하면
// 사이트 소유 확인 메타 태그와 광고 스크립트가 자동으로 활성화된다.
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

// Google Analytics 측정 ID(예: G-XXXXXXXXXX)를 설정하면 방문 통계 수집이 활성화된다.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Google Search Console "HTML 태그" 인증 방식에서 발급되는 소유 확인 코드.
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

// Google Tag Manager 컨테이너 ID
const GTM_ID = 'GTM-P5VWZPKK';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: '여기다',
    template: '%s | 여기다',
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: getSiteUrl(),
    siteName: '여기다',
    title: '여기다',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: '여기다',
    description: SITE_DESCRIPTION,
  },
  verification: {
    ...(GOOGLE_SITE_VERIFICATION && { google: GOOGLE_SITE_VERIFICATION }),
  },
  other: {
    'naver-site-verification': 'bfdbd2f28fe6edec15b5a6ece122cb87d1a85ed1',
    ...(ADSENSE_CLIENT_ID && { 'google-adsense-account': ADSENSE_CLIENT_ID }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: '여기다',
        url: siteUrl,
        description: SITE_DESCRIPTION,
        inLanguage: 'ko-KR',
      },
      {
        '@type': 'Organization',
        name: '여기다',
        url: siteUrl,
      },
    ],
  };

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansKr.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script {...jsonLdScriptProps(jsonLd)} />
        <Script id="gtm-script" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
                window.gtag = gtag;
              `}
            </Script>
          </>
        )}
        <Suspense fallback={null}>
          <RouteChangeTracker />
        </Suspense>
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
