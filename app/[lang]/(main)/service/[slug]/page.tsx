import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';
import { ServiceCard } from '@/components/ServiceCard';
import { ServiceDetail } from '@/components/ServiceDetail';
import { getDictionary } from '@/lib/dictionaries';
import { getGuidesByServiceSlug, resolveGuideForLocale } from '@/lib/guides';
import { DEFAULT_LOCALE, isLocale, localeHref } from '@/lib/i18n';
import { breadcrumbList, jsonLdScriptProps } from '@/lib/json-ld';
import {
  getAllServices,
  getCategoryBySlug,
  getServiceBySlug,
  getServicesByCategory,
  resolveCategoryForLocale,
  resolveServiceForLocale,
} from '@/lib/services';
import { getSiteUrl } from '@/lib/site-url';

const RELATED_SERVICE_LIMIT = 3;

const DISCLAIMER_CATEGORIES = ['health', 'legal-admin'];

type ServicePageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateStaticParams() {
  const services = await getAllServices();
  // 번역(i18n.en) 없는 서비스는 /en/service/[slug]를 프리렌더하지 않는다 —
  // 한국어 원문을 hreflang="en"으로 노출하는 얇은 중복 페이지 방지 (I18N-PLAN.md 참고).
  return [
    ...services.map((service) => ({ lang: 'ko', slug: service.slug })),
    ...services
      .filter((service) => service.i18n?.en)
      .map((service) => ({ lang: 'en', slug: service.slug })),
  ];
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  // 공식 출처 번역만 색인/hreflang 대상 — 사람이 옮긴(공식 아님) 번역은 페이지는 있지만
  // noindex 유지 + hreflang 미제공(크롤러에 noindex 페이지를 정식 대응 언어로 알리지 않기 위함).
  const isOfficialTranslation = Boolean(service.i18n?.en?.official);
  const resolved = resolveServiceForLocale(service, lang);
  const ogImage = resolved.thumbnail || resolved.images[0];
  const category = getCategoryBySlug(resolved.categorySlug);
  const resolvedCategory = category ? resolveCategoryForLocale(category, lang) : undefined;
  return {
    title: resolved.name,
    description: resolved.summary,
    keywords: [
      resolved.name,
      ...resolved.tags,
      ...(resolvedCategory ? [resolvedCategory.name] : []),
      '여기다',
    ],
    alternates: {
      canonical: localeHref(lang, `/service/${slug}`),
      ...(isOfficialTranslation && {
        languages: {
          ko: `/service/${slug}`,
          en: `/en/service/${slug}`,
          'x-default': `/service/${slug}`,
        },
      }),
    },
    // 부모(app/[lang]/layout.tsx)가 lang !== 'ko'를 전부 noindex 처리하지만,
    // 공식 출처 번역이 있는 페이지는 이 값으로 덮어써 색인을 허용한다(robots는 세그먼트 간
    // 얕은 병합이라 자식이 정의하면 부모 값을 완전히 대체함 — Next.js 공식 문서
    // "Merging > Overwriting fields" 참고). robots.ts도 같은 slug만 개별 allow 처리한다.
    ...(lang === 'en' && isOfficialTranslation && { robots: { index: true, follow: true } }),
    openGraph: {
      title: resolved.name,
      description: resolved.summary,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { lang: rawLang, slug } = await params;
  const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  // 번역 없는 서비스는 /en에서 얇은 한국어 그대로 노출 대신 원문 URL로 보낸다.
  // permanentRedirect가 아니라 redirect(307)를 쓰는 이유: 번역이 채워지면
  // 이 분기가 더 이상 안 타야 하는데, 308은 브라우저/캐시에 영구 저장되어 버린다.
  if (lang === 'en' && !service.i18n?.en) {
    redirect(localeHref(DEFAULT_LOCALE, `/service/${slug}`));
  }

  const resolvedService = resolveServiceForLocale(service, lang);
  const dict = await getDictionary(lang);

  const categoryServices = await getServicesByCategory(service.categorySlug);
  const relatedServices = categoryServices
    .filter((item) => item.slug !== service.slug)
    .slice(0, RELATED_SERVICE_LIMIT)
    .map((item) => resolveServiceForLocale(item, lang));
  const category = getCategoryBySlug(service.categorySlug);
  const relatedGuides = getGuidesByServiceSlug(service.slug).map((guide) =>
    resolveGuideForLocale(guide, lang),
  );
  const resolvedCategory = category ? resolveCategoryForLocale(category, lang) : undefined;

  const siteUrl = getSiteUrl();
  const localizedSiteUrl = `${siteUrl}${localeHref(lang, '/')}`;
  const pageUrl = `${siteUrl}${localeHref(lang, `/service/${service.slug}`)}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: resolvedService.name,
        description: resolvedService.summary,
        url: pageUrl,
        inLanguage: dict.site.htmlLang,
        serviceType: resolvedCategory?.name,
        areaServed: {
          '@type': 'Country',
          name: 'KR',
        },
        provider: {
          '@type': 'Organization',
          name: resolvedService.source,
          url: resolvedService.url,
        },
        ...(resolvedService.cost === 'free' && {
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'KRW',
          },
        }),
      },
      breadcrumbList([
        { name: dict.home, url: localizedSiteUrl },
        ...(resolvedCategory
          ? [
              {
                name: resolvedCategory.name,
                url: `${siteUrl}${localeHref(lang, `/category/${resolvedCategory.slug}`)}`,
              },
            ]
          : []),
        { name: resolvedService.name, url: pageUrl },
      ]),
    ],
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-12">
      <script {...jsonLdScriptProps(jsonLd)} />
      {DISCLAIMER_CATEGORIES.includes(service.categorySlug) && <Disclaimer />}
      <ServiceDetail
        service={resolvedService}
        category={resolvedCategory}
        lang={lang}
        dict={dict.service}
      />

      {relatedGuides.length > 0 && (
        <div className="flex flex-col gap-3 border-t pt-6">
          <h2 className="text-sm font-medium text-muted-foreground">
            {dict.service.relatedGuidesHeading}
          </h2>
          <div className="flex flex-col gap-2">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={localeHref(lang, `/guides/${guide.slug}`)}
                className="group flex items-start justify-between gap-4 rounded-lg border p-4 outline-none transition-colors hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm leading-snug font-medium text-foreground">
                    {guide.title}
                  </h3>
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {guide.summary}
                  </p>
                </div>
                <ArrowRight className="mt-1 size-3.5 shrink-0 text-muted-foreground/70 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {relatedServices.length > 0 && (
        <div className="flex flex-col gap-3 border-t pt-6">
          <h2 className="text-sm font-medium text-muted-foreground">
            {dict.service.relatedServicesHeading}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {relatedServices.map((related) => (
              <ServiceCard key={related.id} service={related} lang={lang} />
            ))}
          </div>
        </div>
      )}

      <AdSlot className="min-h-[120px] rounded-md border border-dashed" />
    </div>
  );
}
