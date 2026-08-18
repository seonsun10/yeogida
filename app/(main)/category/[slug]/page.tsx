import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AdSlot } from '@/components/AdSlot';
import { FilterBar } from '@/components/FilterBar';
import { SearchBar } from '@/components/SearchBar';
import { ServiceCard } from '@/components/ServiceCard';
import { ServiceGrid } from '@/components/ServiceGrid';
import { breadcrumbList, jsonLdScriptProps } from '@/lib/json-ld';
import {
  filterServices,
  getAllCategories,
  getCategoryBySlug,
  getServicesByCategory,
} from '@/lib/services';
import { getSiteUrl } from '@/lib/site-url';

const IN_FEED_AD_INTERVAL = 6;

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ free?: string; hours24?: string }>;
};

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
    keywords: [category.name, `${category.name} 서비스`, '여기다'],
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: category.name,
      description: category.description,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { free, hours24 } = await searchParams;

  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryServices = await getServicesByCategory(slug);
  let services = categoryServices;
  if (free === '1') {
    services = filterServices(services, { cost: 'free' });
  }
  if (hours24 === '1') {
    services = filterServices(services, { badge: '24시간' });
  }

  const siteUrl = getSiteUrl();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbList([
        { name: '홈', url: siteUrl },
        { name: category.name, url: `${siteUrl}/category/${category.slug}` },
      ]),
      {
        '@type': 'ItemList',
        itemListElement: services.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${siteUrl}/service/${service.slug}`,
          name: service.name,
        })),
      },
    ],
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-12">
      <script {...jsonLdScriptProps(jsonLd)} />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground">{category.description}</p>
      </div>

      <SearchBar services={categoryServices} />

      <FilterBar />

      {services.length > 0 ? (
        <ServiceGrid
          key={`${free ?? ''}-${hours24 ?? ''}`}
          storageKey={`service-grid:${slug}:${free ?? ''}:${hours24 ?? ''}`}
          cards={services.map((service, index) => (
            <Fragment key={service.id}>
              <ServiceCard service={service} hideCategoryBadge />
              {(index + 1) % IN_FEED_AD_INTERVAL === 0 && (
                <AdSlot className="min-h-[120px] rounded-md border border-dashed sm:col-span-2 lg:col-span-3" />
              )}
            </Fragment>
          ))}
        />
      ) : (
        <p className="text-muted-foreground">
          조건에 맞는 서비스가 아직 없어요.
        </p>
      )}
    </div>
  );
}
