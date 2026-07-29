import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AdSlot } from '@/components/AdSlot';
import { ServiceCard } from '@/components/ServiceCard';
import { getAllGuides, getGuideBySlug, type GuideBlock } from '@/lib/guides';
import { getServiceBySlug } from '@/lib/services';
import type { Service } from '@/types/service';

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.summary,
    openGraph: { title: guide.title, description: guide.summary },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const resolvedBlocks = await Promise.all(
    guide.blocks.map(async (block) => {
      if (block.type !== 'services') return block;
      const services = await Promise.all(
        block.slugs.map((serviceSlug) => getServiceBySlug(serviceSlug)),
      );
      return {
        ...block,
        services: services.filter((service): service is Service => !!service),
      };
    }),
  );

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{guide.title}</h1>
        <p className="text-sm text-zinc-500">
          작성일 {guide.publishedAt} · 여기다
        </p>
      </div>

      <article className="flex flex-col gap-5 text-zinc-800">
        {resolvedBlocks.map((block, index) => (
          <Fragment key={index}>{renderBlock(block)}</Fragment>
        ))}
      </article>

      <AdSlot className="min-h-[120px] rounded-md border border-dashed border-zinc-200" />
    </div>
  );
}

type ResolvedBlock =
  | Exclude<GuideBlock, { type: 'services' }>
  | (Extract<GuideBlock, { type: 'services' }> & { services: Service[] });

function renderBlock(block: ResolvedBlock) {
  switch (block.type) {
    case 'heading':
      return <h2 className="text-lg font-semibold text-zinc-900">{block.text}</h2>;
    case 'paragraph':
      return <p className="leading-relaxed">{block.text}</p>;
    case 'list':
      return (
        <ul className="list-disc space-y-1 pl-5 leading-relaxed">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'services':
      return (
        <div className="flex flex-col gap-3 border-t pt-5">
          {block.intro && (
            <p className="text-sm font-medium text-zinc-500">{block.intro}</p>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {block.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      );
  }
}
