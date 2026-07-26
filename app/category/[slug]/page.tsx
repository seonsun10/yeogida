import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AdSlot } from '@/components/AdSlot';
import { FilterBar } from '@/components/FilterBar';
import { ServiceCard } from '@/components/ServiceCard';
import {
  filterServices,
  getAllCategories,
  getCategoryBySlug,
  getServicesByCategory,
} from '@/lib/services';

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

  let services = getServicesByCategory(slug);
  if (free === '1') {
    services = filterServices(services, { cost: 'free' });
  }
  if (hours24 === '1') {
    services = filterServices(services, { badge: '24시간' });
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{category.name}</h1>
        <p className="text-zinc-600">{category.description}</p>
      </div>

      <FilterBar />

      {services.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Fragment key={service.id}>
              <ServiceCard service={service} />
              {(index + 1) % IN_FEED_AD_INTERVAL === 0 && (
                <AdSlot className="min-h-[120px] rounded-md border border-dashed border-zinc-200 sm:col-span-2 lg:col-span-3" />
              )}
            </Fragment>
          ))}
        </div>
      ) : (
        <p className="text-zinc-500">조건에 맞는 서비스가 아직 없어요.</p>
      )}
    </div>
  );
}
