import Link from 'next/link';
import type { Metadata } from 'next';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DISCOVER_SITE_NAME } from '@/lib/discover-constants';

export const metadata: Metadata = {
  title: { absolute: `페이지를 찾을 수 없습니다 | ${DISCOVER_SITE_NAME}` },
};

export default function DiscoverNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="text-2xl font-bold text-foreground">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-sm text-muted-foreground">
        주소가 바뀌었거나 삭제된 페이지일 수 있습니다.
      </p>
      <Link
        href="/discover"
        className={cn(buttonVariants({ variant: 'default' }), 'mt-2')}
      >
        홈으로
      </Link>
    </div>
  );
}
