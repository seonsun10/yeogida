import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Service } from '@/types/service';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/service/${service.slug}`} className="block h-full">
      <Card className="h-full transition-colors hover:border-zinc-400">
        {service.thumbnail && (
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image
              src={service.thumbnail}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            {service.badges.map((badge) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
          <h3 className="text-base font-semibold">{service.name}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-600">{service.summary}</p>
          <p className="mt-2 text-xs text-zinc-400">{service.hours}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
