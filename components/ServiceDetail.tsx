'use client';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { trackOutboundClick } from '@/lib/track';
import type { Service } from '@/types/service';

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {service.badges.map((badge) => (
            <Badge key={badge} variant="secondary">
              {badge}
            </Badge>
          ))}
        </div>
        <h1 className="text-2xl font-bold">{service.name}</h1>
        <p className="text-zinc-600">{service.summary}</p>
      </div>

      <p className="leading-relaxed text-zinc-800">{service.description}</p>

      <dl className="grid grid-cols-1 gap-3 rounded-md border p-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-zinc-400">운영시간</dt>
          <dd>{service.hours}</dd>
        </div>
        <div>
          <dt className="text-zinc-400">비용</dt>
          <dd>{service.cost === 'free' ? '무료' : '유료'}</dd>
        </div>
        <div>
          <dt className="text-zinc-400">운영 주체</dt>
          <dd>{service.source}</dd>
        </div>
      </dl>

      <a
        href={service.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick(service)}
        className={buttonVariants({ size: 'lg', className: 'w-fit' })}
      >
        바로가기
      </a>
    </article>
  );
}
