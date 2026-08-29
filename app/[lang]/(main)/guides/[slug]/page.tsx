import { Fragment } from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { ChevronLeft } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { ServiceCard } from '@/components/ServiceCard';
import { DEFAULT_CATEGORY_COLOR, getCategoryStyle } from '@/lib/category-style';
import { getDictionary } from '@/lib/dictionaries';
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
  const category = rawCategory ? resolveCategoryForLocale(rawCategory, lang) : undefined;
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

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-12">
      <Link
        href={localeHref(lang, '/guides')}
        className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
        <h1 className="text-2xl font-bold text-balance">{resolvedGuide.title}</h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          {resolvedGuide.summary}
        </p>
        <p className="text-xs text-muted-foreground/70">
          {dict.guides.publishedOnTemplate.replace('{date}', resolvedGuide.publishedAt)}
        </p>
      </div>

      {headingIndexes.length >= 3 && (
        <nav
          aria-label={dict.guides.tableOfContents}
          className="flex flex-col gap-2 rounded-lg border bg-muted/40 p-4"
        >
          <p className="text-xs font-semibold text-muted-foreground">
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

      <article className="flex flex-col text-foreground">
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
                {renderBlock(block, index, headingIndexes.indexOf(index), accentColor, lang)}
              </Fragment>
            ))}
          </section>
        ))}
      </article>

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
) {
  switch (block.type) {
    case 'heading':
      return (
        <h2
          id={`section-${index}`}
          className="flex scroll-mt-20 items-center gap-2 text-lg font-semibold text-foreground"
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
            <li key={item} className="flex items-start gap-2.5 leading-relaxed text-foreground/90">
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
        <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4">
          {block.intro && (
            <p className="text-sm font-semibold text-muted-foreground">
              {block.intro}
            </p>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {block.services.map((service) => (
              <ServiceCard key={service.id} service={service} lang={lang} />
            ))}
          </div>
        </div>
      );
  }
}
