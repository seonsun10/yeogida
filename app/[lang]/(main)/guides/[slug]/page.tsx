import { Fragment } from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { ChevronLeft } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { ServiceCard } from '@/components/ServiceCard';
import { DEFAULT_CATEGORY_COLOR, getCategoryStyle } from '@/lib/category-style';
import { getDictionary } from '@/lib/dictionaries';
import type { Dictionary } from '@/lib/dictionaries';
import {
  getAllGuides,
  getGuideBySlug,
  getGuideTranslation,
  resolveGuideForLocale,
  type GuideBlock,
} from '@/lib/guides';
import { DEFAULT_LOCALE, isLocale, localeHref, type Locale } from '@/lib/i18n';
import {
  getCategoryBySlug,
  getServiceBySlug,
  resolveCategoryForLocale,
  resolveServiceForLocale,
} from '@/lib/services';
import { cn } from '@/lib/utils';
import type { Service } from '@/types/service';
import { getGuideReview, getGuideReviewSources } from '@/lib/guide-reviews';
import { breadcrumbList, jsonLdScriptProps } from '@/lib/json-ld';
import { getSiteUrl } from '@/lib/site-url';

type GuidePageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export function generateStaticParams() {
  const guides = getAllGuides();
  // 번역 없는 가이드는 /en/guides/[slug]를 프리렌더하지 않는다 — service 페이지와 동일한 패턴.
  return [
    ...guides.map((guide) => ({ lang: 'ko', slug: guide.slug })),
    ...guides
      .filter((guide) => getGuideTranslation(guide.slug))
      .map((guide) => ({ lang: 'en', slug: guide.slug })),
  ];
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  const resolved = resolveGuideForLocale(guide, lang);
  return {
    title: resolved.title,
    description: resolved.summary,
    authors: [
      {
        name: lang === 'en' ? 'Yeogida editorial' : '여기다 편집',
        url: localeHref(lang, '/about'),
      },
    ],
    alternates: {
      canonical: localeHref(lang, `/guides/${slug}`),
    },
    openGraph: { title: resolved.title, description: resolved.summary },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { lang: rawLang, slug } = await params;
  const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  // 번역 없는 가이드는 /en에서 얇은 한국어 그대로 노출 대신 원문 URL로 보낸다.
  if (lang === 'en' && !getGuideTranslation(slug)) {
    redirect(localeHref(DEFAULT_LOCALE, `/guides/${slug}`));
  }

  const resolvedGuide = resolveGuideForLocale(guide, lang);
  const dict = await getDictionary(lang);

  const rawCategory = getCategoryBySlug(guide.categorySlug);
  const category = rawCategory
    ? resolveCategoryForLocale(rawCategory, lang)
    : undefined;
  const style = getCategoryStyle(guide.categorySlug);
  const Icon = style.icon;
  const accentColor = category?.color ?? DEFAULT_CATEGORY_COLOR;

  const headingIndexes = resolvedGuide.blocks
    .map((block, index) => (block.type === 'heading' ? index : -1))
    .filter((index) => index !== -1);

  const resolvedBlocks = await Promise.all(
    resolvedGuide.blocks.map(async (block) => {
      if (block.type !== 'services') return block;
      const services = await Promise.all(
        block.slugs.map((serviceSlug) => getServiceBySlug(serviceSlug)),
      );
      return {
        ...block,
        services: services
          .filter((service): service is Service => !!service)
          .map((service) => resolveServiceForLocale(service, lang)),
      };
    }),
  );

  const sections = groupBlocksIntoSections(resolvedBlocks);
  const review = lang === 'ko' ? getGuideReview(slug) : undefined;
  const referencedServices = resolvedBlocks.flatMap((block) =>
    block.type === 'services' ? block.services : [],
  );
  const sources = [
    ...new Map(
      [
        ...(review ? getGuideReviewSources(review) : []),
        ...referencedServices.map((service) => ({
          label: `${service.source} · ${service.name}`,
          url: service.url,
        })),
      ].map((source) => [source.url, source]),
    ).values(),
  ];
  const relatedGuides = getAllGuides()
    .filter(
      (item) =>
        item.slug !== slug &&
        item.categorySlug === guide.categorySlug &&
        (lang === 'ko' || getGuideTranslation(item.slug)),
    )
    .slice(0, 3)
    .map((item) => resolveGuideForLocale(item, lang));
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${localeHref(lang, `/guides/${slug}`)}`;
  const article = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: resolvedGuide.title,
        description: resolvedGuide.summary,
        inLanguage: lang,
        datePublished: guide.publishedAt,
        dateModified:
          review?.reviewedAt ?? guide.updatedAt ?? guide.publishedAt,
        mainEntityOfPage: pageUrl,
        author: {
          '@type': 'Organization',
          name: lang === 'en' ? 'Yeogida editorial' : '여기다 편집',
          url: `${siteUrl}${localeHref(lang, '/about')}`,
        },
        citation: sources.map((source) => source.url),
      },
      breadcrumbList([
        { name: dict.home, url: `${siteUrl}${localeHref(lang, '/')}` },
        {
          name: lang === 'en' ? 'Guides' : '이용 가이드',
          url: `${siteUrl}${localeHref(lang, '/guides')}`,
        },
        { name: resolvedGuide.title, url: pageUrl },
      ]),
    ],
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-12">
      <script {...jsonLdScriptProps(article)} />
      <Link
        href={localeHref(lang, '/guides')}
        className="text-muted-foreground hover:text-foreground inline-flex w-fit items-center gap-1 text-sm transition-colors"
      >
        <ChevronLeft className="size-4" />
        {dict.guides.backToList}
      </Link>

      <div className="flex flex-col gap-4 border-b pb-8">
        {category && (
          <span
            className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}
          >
            <Icon className="size-3" />
            {category.name}
          </span>
        )}
        <h1 className="text-2xl font-bold text-balance">
          {resolvedGuide.title}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          {resolvedGuide.summary}
        </p>
        <p className="text-muted-foreground/70 text-xs">
          {dict.guides.publishedOnTemplate.replace(
            '{date}',
            resolvedGuide.publishedAt,
          )}
          {resolvedGuide.updatedAt && (
            <>
              {' '}
              ·{' '}
              {dict.guides.updatedOnTemplate.replace(
                '{date}',
                resolvedGuide.updatedAt,
              )}
            </>
          )}
        </p>
        <p className="text-muted-foreground text-xs">
          {lang === 'en' ? 'Yeogida editorial' : '여기다 편집'} ·{' '}
          <Link
            href={localeHref(lang, '/about')}
            className="underline underline-offset-4"
          >
            {lang === 'en'
              ? 'How we prepare our guides'
              : '콘텐츠 작성·확인 기준'}
          </Link>
        </p>
      </div>

      {review && (
        <section className="bg-muted/30 flex flex-col gap-3 rounded-lg border p-4">
          <h2 className="font-bold">시작하기 전에 준비하세요</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {review.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-muted-foreground text-xs">
            준비 목록·공식 근거 확인{' '}
            <time dateTime={review.reviewedAt}>{review.reviewedAt}</time>
          </p>
        </section>
      )}

      {headingIndexes.length >= 3 && (
        <nav
          aria-label={dict.guides.tableOfContents}
          className="bg-muted/40 flex flex-col gap-2 rounded-lg border p-4"
        >
          <p className="text-muted-foreground text-xs font-semibold">
            {dict.guides.tableOfContents}
          </p>
          <ol className="flex flex-col gap-1.5">
            {headingIndexes.map((blockIndex, order) => {
              const block = resolvedGuide.blocks[blockIndex];
              if (block.type !== 'heading') return null;
              return (
                <li key={blockIndex} className="flex items-start gap-2 text-sm">
                  <span
                    className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    {order + 1}
                  </span>
                  <a
                    href={`#section-${blockIndex}`}
                    className="text-foreground/80 hover:text-foreground hover:underline"
                  >
                    {block.text}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      <article className="text-foreground flex flex-col">
        {sections.map((section, sectionIndex) => (
          <section
            key={sectionIndex}
            className={cn(
              'flex flex-col gap-3',
              sectionIndex > 0 && 'mt-8 border-t pt-8 sm:mt-10 sm:pt-9',
            )}
          >
            {section.map(({ block, index }) => (
              <Fragment key={index}>
                {renderBlock(
                  block,
                  index,
                  headingIndexes.indexOf(index),
                  accentColor,
                  lang,
                  dict.service,
                )}
              </Fragment>
            ))}
          </section>
        ))}
      </article>

      {sources.length > 0 && (
        <section className="flex flex-col gap-3 border-t pt-8">
          <h2 className="text-lg font-bold">
            {lang === 'en'
              ? 'Official information and further reading'
              : '공식 안내와 관련 기관'}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {lang === 'en'
              ? 'Check the official guidance for current eligibility, fees, documents and deadlines before applying. Automated link checks do not verify the accuracy of application requirements.'
              : '신청 대상·수수료·구비서류·기한은 아래 공식 안내에서 최종 확인해 주세요. 자동 링크 점검은 신청 조건이나 안내 내용이 최신임을 보장하지 않아요.'}
          </p>
          <ul className="space-y-3 text-sm">
            {sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      {relatedGuides.length > 0 && (
        <section className="flex flex-col gap-3 border-t pt-8">
          <h2 className="text-lg font-bold">
            {lang === 'en' ? 'Related guides' : '함께 읽을 가이드'}
          </h2>
          {relatedGuides.map((item) => (
            <Link
              key={item.slug}
              href={localeHref(lang, `/guides/${item.slug}`)}
              className="text-sm underline underline-offset-4"
            >
              {item.title}
            </Link>
          ))}
        </section>
      )}
      <AdSlot className="min-h-[120px] rounded-md border border-dashed" />
    </div>
  );
}

type ResolvedBlock =
  | Exclude<GuideBlock, { type: 'services' }>
  | (Extract<GuideBlock, { type: 'services' }> & { services: Service[] });

type BlockGroup = { block: ResolvedBlock; index: number };

/**
 * 헤딩이 나올 때마다 새 섹션으로 묶어, 섹션 사이는 넓게(hairline 구분),
 * 같은 섹션 안 문단·목록은 촘촘하게 유지해서 글이 한 덩어리로 이어지지 않게 한다.
 */
function groupBlocksIntoSections(blocks: ResolvedBlock[]): BlockGroup[][] {
  const sections: BlockGroup[][] = [];
  blocks.forEach((block, index) => {
    if (block.type === 'heading' || sections.length === 0) {
      sections.push([]);
    }
    sections[sections.length - 1].push({ block, index });
  });
  return sections;
}

function renderBlock(
  block: ResolvedBlock,
  index: number,
  headingOrder: number,
  accentColor: string,
  lang: Locale,
  serviceDict: Dictionary['service'],
) {
  switch (block.type) {
    case 'heading':
      return (
        <h2
          id={`section-${index}`}
          className="text-foreground flex scroll-mt-20 items-center gap-2 text-lg font-semibold"
        >
          {headingOrder >= 0 && (
            <span
              className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: accentColor }}
            >
              {headingOrder + 1}
            </span>
          )}
          {block.text}
        </h2>
      );
    case 'paragraph':
      return (
        <p
          className={cn(
            'leading-[1.75]',
            index === 0 ? 'text-foreground' : 'text-foreground/90',
          )}
        >
          {block.text}
        </p>
      );
    case 'list':
      return (
        <ul className="flex flex-col gap-2.5 pl-1">
          {block.items.map((item) => (
            <li
              key={item}
              className="text-foreground/90 flex items-start gap-2.5 leading-relaxed"
            >
              <span
                className="mt-2.5 size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              {item}
            </li>
          ))}
        </ul>
      );
    case 'services':
      return (
        <div className="bg-muted/30 flex flex-col gap-3 rounded-lg border p-4">
          {block.intro && (
            <p className="text-muted-foreground text-sm font-semibold">
              {block.intro}
            </p>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {block.services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                lang={lang}
                dict={serviceDict}
              />
            ))}
          </div>
        </div>
      );
  }
}
