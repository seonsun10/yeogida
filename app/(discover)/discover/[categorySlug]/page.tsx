import { Fragment } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ChevronLeft } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { ServiceGrid } from '@/components/ServiceGrid';
import { DiscoverSearchBar } from '@/components/discover/SearchBar';
import { SiteCard } from '@/components/discover/SiteCard';
import { DiscoverGuideLinks } from '@/components/discover/GuideLinks';
import { getDiscoverGuidesForCategory } from '@/lib/discover-guides';
import { discoverSelectionCriteria } from '@/lib/discover-selection-criteria';
import { DiscoverCategoryIcon } from '@/lib/discover-icons';
import { breadcrumbList, jsonLdScriptProps } from '@/lib/json-ld';
import {
  getAllSiteCategories,
  getSiteCategoryBySlug,
  getSitesByCategory,
} from '@/lib/sites';
import { getSiteUrl } from '@/lib/site-url';

const IN_FEED_AD_INTERVAL = 6;

type DiscoverCategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export function generateStaticParams() {
  return getAllSiteCategories().map((category) => ({
    categorySlug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: DiscoverCategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getSiteCategoryBySlug(categorySlug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
    alternates: {
      canonical: `/discover/${categorySlug}`,
    },
    openGraph: {
      title: category.name,
      description: category.description,
    },
  };
}

export default async function DiscoverCategoryPage({
  params,
}: DiscoverCategoryPageProps) {
  const { categorySlug } = await params;

  const category = getSiteCategoryBySlug(categorySlug);
  if (!category) notFound();

  const sites = await getSitesByCategory(categorySlug);

  const siteUrl = getSiteUrl();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbList([
        { name: '여기다', url: `${siteUrl}/discover` },
        { name: category.name, url: `${siteUrl}/discover/${category.slug}` },
      ]),
      {
        '@type': 'ItemList',
        itemListElement: sites.map((site, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${siteUrl}/discover/site/${site.slug}`,
          name: site.name,
        })),
      },
    ],
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-12">
      <script {...jsonLdScriptProps(jsonLd)} />

      <Link
        href="/discover"
        className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1 text-sm transition-colors"
      >
        <ChevronLeft aria-hidden className="size-4" />
        전체 카테고리
      </Link>

      <div className="flex flex-col gap-3">
        <div
          aria-hidden
          className="flex size-12 items-center justify-center rounded-sm"
          style={{
            backgroundColor: `${category.color}1a`,
            color: category.color,
          }}
        >
          <DiscoverCategoryIcon
            categorySlug={category.slug}
            className="size-6"
            strokeWidth={1.75}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-bold sm:text-3xl">{category.name}</h1>
          <p className="text-muted-foreground">{category.description}</p>
          <p className="text-muted-foreground/70 text-sm font-medium">
            사이트 {sites.length}개
          </p>
        </div>
      </div>

      {category.intro && (
        <p className="bg-muted/30 text-foreground/90 max-w-3xl rounded-sm border p-4 text-sm leading-relaxed">
          {category.intro}
        </p>
      )}

      <DiscoverSearchBar sites={sites} />
      {discoverSelectionCriteria[categorySlug] && (
        <section className="flex max-w-3xl flex-col gap-3 border-t pt-8">
          <h2 className="text-lg font-bold">이 카테고리에서 고를 때</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {discoverSelectionCriteria[categorySlug].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}
      <DiscoverGuideLinks guides={getDiscoverGuidesForCategory(categorySlug)} />

      {sites.length > 0 ? (
        <ServiceGrid
          storageKey={`discover-grid:${categorySlug}`}
          cards={sites.map((site, index) => (
            <Fragment key={site.id}>
              <SiteCard site={site} hideCategoryBadge />
              {(index + 1) % IN_FEED_AD_INTERVAL === 0 && (
                <AdSlot className="border-border min-h-[120px] rounded-sm border border-dashed sm:col-span-2 lg:col-span-3" />
              )}
            </Fragment>
          ))}
        />
      ) : (
        <p className="text-muted-foreground">
          아직 이 카테고리에 등록된 사이트가 없어요.
        </p>
      )}
    </div>
  );
}
