import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';
import { ServiceDetail } from '@/components/ServiceDetail';
import { getAllServices, getServiceBySlug } from '@/lib/services';

const DISCLAIMER_CATEGORIES = ['health', 'legal-admin'];

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.summary,
    openGraph: {
      title: service.name,
      description: service.summary,
      images: [service.thumbnail],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-12">
      {DISCLAIMER_CATEGORIES.includes(service.categorySlug) && <Disclaimer />}
      <ServiceDetail service={service} />
      <AdSlot className="min-h-[120px] rounded-md border border-dashed border-zinc-200" />
    </div>
  );
}
