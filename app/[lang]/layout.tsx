import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AnalyticsScripts } from '@/app/AnalyticsScripts';
import { getDictionary } from '@/lib/dictionaries';
import { fontVariables } from '@/lib/fonts';
import { DEFAULT_LOCALE, LOCALES, type Locale, isLocale } from '@/lib/i18n';
import { getAllCategories, resolveCategoryForLocale } from '@/lib/services';
import { getSiteUrl } from '@/lib/site-url';
import '../globals.css';

const SITE_KEYWORDS_BASE = [
  '여기다',
  'yeogida',
  'yeogida-life',
  '생활 서비스',
  '생활 정보',
  '무료 상담',
  '정부 지원 서비스',
  '복지 서비스',
  '숨은 지원 서비스',
];

// Google Search Console "HTML 태그" 인증 방식에서 발급되는 소유 확인 코드.
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang: Locale = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;
  const dict = await getDictionary(lang);
  const siteUrl = getSiteUrl();
  const keywords = [
    ...SITE_KEYWORDS_BASE,
    ...getAllCategories().map((c) => resolveCategoryForLocale(c, lang).name),
  ];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: '여기다',
      template: '%s | 여기다',
    },
    description: dict.site.description,
    keywords,
    alternates: {
      canonical: lang === DEFAULT_LOCALE ? '/' : `/${lang}`,
    },
    openGraph: {
      type: 'website',
      locale: dict.site.ogLocale,
      url: lang === DEFAULT_LOCALE ? siteUrl : `${siteUrl}/${lang}`,
      siteName: '여기다',
      title: '여기다',
      description: dict.site.description,
    },
    twitter: {
      card: 'summary',
      title: '여기다',
      description: dict.site.description,
    },
    // /en 콘텐츠 상당수가 아직 한국어 원문이라, 색인 대상은 v1에서는 ko만 허용한다.
    // (콘텐츠 번역이 채워지는 대로 페이지 단위로 해제할 예정 — I18N-PLAN.md 참고)
    ...(lang !== DEFAULT_LOCALE && { robots: { index: false, follow: true } }),
    verification: {
      ...(GOOGLE_SITE_VERIFICATION && { google: GOOGLE_SITE_VERIFICATION }),
    },
    other: {
      'naver-site-verification': 'bfdbd2f28fe6edec15b5a6ece122cb87d1a85ed1',
      ...(ADSENSE_CLIENT_ID && { 'google-adsense-account': ADSENSE_CLIENT_ID }),
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang;
  const dict = await getDictionary(lang);

  return (
    <html
      lang={dict.site.htmlLang}
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="absolute top-2 left-2 z-50 -translate-y-16 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-transform focus:translate-y-0"
        >
          {dict.skipToContent}
        </a>
        <AnalyticsScripts />
        {children}
      </body>
    </html>
  );
}
