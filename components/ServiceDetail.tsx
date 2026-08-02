'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { ShareButton } from '@/components/ShareButton';
import { getCategoryStyle } from '@/lib/category-style';
import { trackOutboundClick } from '@/lib/track';
import type { Category, Service } from '@/types/service';

export function ServiceDetail({
  service,
  category,
}: {
  service: Service;
  category?: Category;
}) {
  const style = getCategoryStyle(service.categorySlug);

  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}
            >
              {category.name}
            </span>
          )}
          {service.badges.map((badge) => (
            <Badge key={badge} variant="secondary">
              {badge}
            </Badge>
          ))}
        </div>
        <h1 className="text-2xl font-bold">{service.name}</h1>
        <p className="text-muted-foreground">{service.summary}</p>
      </div>

      {service.images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {service.images.map((image) => (
            <div
              key={image}
              className="relative aspect-video w-64 shrink-0 overflow-hidden rounded-md border"
            >
              <Image
                src={image}
                alt={service.name}
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <p className="leading-relaxed text-foreground">{service.description}</p>

      <dl className="grid grid-cols-1 gap-3 rounded-md border bg-muted/30 p-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">운영시간</dt>
          <dd>{service.hours}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">비용</dt>
          <dd>{service.cost === 'free' ? '무료' : '유료'}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">운영 주체</dt>
          <dd>{service.source}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href={service.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackOutboundClick(service)}
          className={buttonVariants({ size: 'lg', className: 'w-fit' })}
        >
          바로가기
        </a>
        <ShareButton title={service.name} text={service.summary} />
      </div>
    </article>
  );
}
