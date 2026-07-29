import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-sm font-medium text-zinc-400">404</p>
      <h1 className="text-2xl font-bold text-zinc-900">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-sm text-zinc-600">
        주소가 바뀌었거나 삭제된 페이지일 수 있습니다. 아래에서 원하는 정보를
        다시 찾아보세요.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <Link href="/" className={cn(buttonVariants({ variant: 'default' }))}>
          홈으로
        </Link>
        <Link href="/guides" className={cn(buttonVariants({ variant: 'outline' }))}>
          가이드 보기
        </Link>
      </div>
    </div>
  );
}
