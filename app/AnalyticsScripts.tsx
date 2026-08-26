import Script from 'next/script';
import { Suspense } from 'react';
import { RouteChangeTracker } from '@/components/RouteChangeTracker';

// 애드센스 승인 후 발급받는 게시자 ID(예: ca-pub-1234567890123456)를 설정하면
// 사이트 소유 확인 메타 태그와 광고 스크립트가 자동으로 활성화된다.
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

// Google Analytics 측정 ID(예: G-XXXXXXXXXX)를 설정하면 방문 통계 수집이 활성화된다.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Google Tag Manager 컨테이너 ID
const GTM_ID = 'GTM-P5VWZPKK';

/**
 * `app/[lang]/layout.tsx`와 `app/(discover)/layout.tsx`가 각자 독립된 root layout이라
 * GTM/GA/AdSense 스크립트를 공유 컴포넌트로 뽑아 중복 유지 비용을 줄인다.
 */
export function AnalyticsScripts() {
  return (
    <>
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
    </>
  );
}
