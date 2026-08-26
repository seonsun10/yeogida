import type { Metadata } from 'next';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { fontVariables } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import './globals.css';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
};

/**
 * `[lang]`과 `(discover)`가 각각 독립된 root layout이라(복수 root layout),
 * Next.js가 완전히 매칭되지 않는 URL의 404를 어느 root로 합성할지 알 수 없다
 * (Next.js 문서: "multiple root layouts"·"top-level dynamic segments" 케이스).
 * 그래서 이 파일은 스스로 완전한 <html>/<body> 문서를 반환해야 하며, 어느
 * layout에도 의존하지 않는다. 라우트 안에서 명시적으로 notFound()를 호출하는
 * 케이스(예: 존재하지 않는 service slug)는 계속 각 세그먼트의 not-found.tsx가
 * 처리하고, 이 파일은 애초에 매칭되는 라우트 자체가 없는 URL만 잡는다.
 */
export default function GlobalNotFound() {
  return (
    <html lang="ko" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
          <p className="text-sm font-medium text-primary">404</p>
          <h1 className="text-2xl font-bold text-foreground">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-sm text-muted-foreground">
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
      </body>
    </html>
  );
}
