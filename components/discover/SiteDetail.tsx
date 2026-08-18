'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { ShareButton } from '@/components/ShareButton';
import { trackOutboundClick } from '@/lib/track';
import { deleteSiteThumbnail } from '@/app/(main)/admin/sites/actions';
import { SiteThumbnailUploadForm } from '@/app/(main)/admin/sites/SiteThumbnailUploadForm';
import type { Site, SiteCategory } from '@/types/site';

const IS_LOCAL_DEV = process.env.NODE_ENV === 'development';

export function SiteDetail({
  site,
  category,
}: {
  site: Site;
  category?: SiteCategory;
}) {
  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {category && <Badge variant="secondary">{category.name}</Badge>}
          {site.badges.map((badge) => (
            <Badge key={badge} variant="outline">
              {badge}
            </Badge>
          ))}
        </div>
        <h1 className="text-2xl font-bold">{site.name}</h1>
        <p className="text-muted-foreground">{site.summary}</p>
      </div>

      {IS_LOCAL_DEV && (
        <section className="flex flex-col gap-3 rounded-sm border border-dashed border-amber-400 bg-amber-50 p-4 dark:bg-amber-950/20">
          <h2 className="text-sm font-semibold text-amber-700 dark:text-amber-400">
            썸네일 관리 (로컬 전용)
          </h2>
          {site.thumbnail && (
            <div className="flex flex-col gap-2">
              <div className="relative aspect-video w-48 overflow-hidden rounded-sm border border-border">
                <Image
                  src={site.thumbnail}
                  alt=""
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
              <form action={deleteSiteThumbnail.bind(null, site.slug)}>
                <button
                  type="submit"
                  className="w-fit text-xs text-red-600 hover:underline"
                >
                  썸네일 삭제
                </button>
              </form>
            </div>
          )}
          {!site.thumbnail && (
            <p className="text-sm text-zinc-500">등록된 썸네일이 없습니다.</p>
          )}
          <SiteThumbnailUploadForm slug={site.slug} />
        </section>
      )}

      {site.images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {site.images.map((image, index) => (
            <div
              key={image}
              className="relative aspect-video w-64 shrink-0 overflow-hidden rounded-sm border border-border"
            >
              <Image
                src={image}
                alt={`${site.name} 이미지 ${index + 1}`}
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <p className="leading-relaxed text-foreground">{site.description}</p>

      <dl className="grid grid-cols-1 gap-3 rounded-sm border border-border bg-muted/30 p-4 text-sm">
        <div>
          <dt className="text-muted-foreground">운영 주체</dt>
          <dd>{site.source}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackOutboundClick(site)}
          className={buttonVariants({ size: 'lg', className: 'w-fit' })}
        >
          바로가기
        </a>
        <ShareButton title={site.name} text={site.summary} />
      </div>
    </article>
  );
}
