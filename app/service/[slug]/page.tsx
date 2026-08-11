import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';
import { ServiceCard } from '@/components/ServiceCard';
import { ServiceDetail } from '@/components/ServiceDetail';
import { getGuidesByServiceSlug } from '@/lib/guides';
import { breadcrumbList, jsonLdScriptProps } from '@/lib/json-ld';
import {
  getAllServices,
  getCategoryBySlug,
  getServiceBySlug,
  getServicesByCategory,
} from '@/lib/services';
import { getSiteUrl } from '@/lib/site-url';

const RELATED_SERVICE_LIMIT = 3;

const DISCLAIMER_CATEGORIES = ['health', 'legal-admin'];

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  const ogImage = service.thumbnail || service.images[0];
  const category = getCategoryBySlug(service.categorySlug);
  return {
    title: service.name,
    description: service.summary,
    keywords: [
      service.name,
      ...service.tags,
      ...(category ? [category.name] : []),
      '여기다',
    ],
    alternates: {
      canonical: `/service/${slug}`,
    },
    openGraph: {
      title: service.name,
      description: service.summary,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const categoryServices = await getServicesByCategory(service.categorySlug);
  const relatedServices = categoryServices
    .filter((item) => item.slug !== service.slug)
    .slice(0, RELATED_SERVICE_LIMIT);
  const category = getCategoryBySlug(service.categorySlug);
  const relatedGuides = getGuidesByServiceSlug(service.slug);

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/service/${service.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.name,
        description: service.summary,
        url: pageUrl,
        serviceType: category?.name,
        areaServed: {
          '@type': 'Country',
          name: 'KR',
        },
        provider: {
          '@type': 'Organization',
          name: service.source,
          url: service.url,
        },
        ...(service.cost === 'free' && {
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'KRW',
          },
        }),
      },
      breadcrumbList([
        { name: '홈', url: siteUrl },
        ...(category
          ? [{ name: category.name, url: `${siteUrl}/category/${category.slug}` }]
          : []),
        { name: service.name, url: pageUrl },
      ]),
    ],
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-12">
      <script {...jsonLdScriptProps(jsonLd)} />
      {DISCLAIMER_CATEGORIES.includes(service.categorySlug) && <Disclaimer />}
      <ServiceDetail service={service} category={category} />

      {relatedGuides.length > 0 && (
        <div className="flex flex-col gap-3 border-t pt-6">
          <h2 className="text-sm font-medium text-muted-foreground">
            이 서비스가 등장하는 가이드
          </h2>
          <div className="flex flex-col gap-2">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
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
            같은 카테고리의 다른 서비스
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {relatedServices.map((related) => (
              <ServiceCard key={related.id} service={related} />
            ))}
          </div>
        </div>
      )}

      <AdSlot className="min-h-[120px] rounded-md border border-dashed" />
    </div>
  );
}
