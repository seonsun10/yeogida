import Link from 'next/link';
import type { DiscoverGuide } from '@/lib/discover-guides';

export function DiscoverGuideLinks({ guides }: { guides: DiscoverGuide[] }) {
  if (!guides.length) return null;
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">고르기 전에 읽어보세요</h2>
      <div className="flex flex-col divide-y rounded-lg border">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/discover/guides/${guide.slug}`}
            className="hover:bg-muted/30 focus-visible:ring-ring flex flex-col gap-2 p-4 outline-none focus-visible:ring-2"
          >
            <h3 className="font-bold">{guide.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {guide.summary}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
