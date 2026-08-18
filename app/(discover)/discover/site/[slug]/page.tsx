import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AdSlot } from '@/components/AdSlot';
import { SiteCard } from '@/components/discover/SiteCard';
import { SiteDetail } from '@/components/discover/SiteDetail';
import { breadcrumbList, jsonLdScriptProps } from '@/lib/json-ld';
import {
  getAllSites,
  getSiteBySlug,
  getSiteCategoryBySlug,
  getSitesByCategory,
} from '@/lib/sites';
import { getSiteUrl } from '@/lib/site-url';

const RELATED_SITE_LIMIT = 3;

type DiscoverSitePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const sites = await getAllSites();
  return sites.map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({
  params,
}: DiscoverSitePageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSiteBySlug(slug);
  if (!site) return {};
  const ogImage = site.thumbnail || site.images[0];
  const category = getSiteCategoryBySlug(site.categorySlug);
  return {
    title: site.name,
    description: site.summary,
    keywords: [site.name, ...site.tags, ...(category ? [category.name] : [])],
    alternates: {
      canonical: `/discover/site/${slug}`,
    },
    openGraph: {
      title: site.name,
      description: site.summary,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function DiscoverSitePage({
  params,
}: DiscoverSitePageProps) {
  const { slug } = await params;
  const site = await getSiteBySlug(slug);
  if (!site) notFound();

  const categorySites = await getSitesByCategory(site.categorySlug);
  const relatedSites = categorySites
    .filter((item) => item.slug !== site.slug)
    .slice(0, RELATED_SITE_LIMIT);
  const category = getSiteCategoryBySlug(site.categorySlug);

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/discover/site/${site.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: site.name,
        description: site.summary,
        url: site.url,
      },
      breadcrumbList([
        { name: '여기다 발견', url: `${siteUrl}/discover` },
        ...(category
          ? [{ name: category.name, url: `${siteUrl}/discover/${category.slug}` }]
          : []),
        { name: site.name, url: pageUrl },
      ]),
    ],
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-12">
      <script {...jsonLdScriptProps(jsonLd)} />
      <SiteDetail site={site} category={category} />

      {relatedSites.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-border pt-6">
          <h2 className="text-sm font-medium text-muted-foreground">
            같은 카테고리의 다른 사이트
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {relatedSites.map((related) => (
              <SiteCard key={related.id} site={related} />
            ))}
          </div>
        </div>
      )}

      <AdSlot className="min-h-[120px] rounded-sm border border-dashed border-border" />
    </div>
  );
}
