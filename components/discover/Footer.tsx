import Link from 'next/link';
import { DISCOVER_SITE_NAME } from '@/lib/discover-constants';
import { getAllSiteCategories } from '@/lib/sites';

export function DiscoverFooter() {
  const categories = getAllSiteCategories();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
        {categories.length > 0 && (
          <nav aria-label="카테고리" className="flex flex-wrap gap-x-5 gap-y-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/discover/${category.slug}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        )}
        <nav aria-label="바닥글" className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/discover/board" className="hover:text-foreground">
            게시판
          </Link>
          <Link href="/discover/submit" className="hover:text-foreground">
            사이트 제보하기
          </Link>
          <Link href="/discover/about" className="hover:text-foreground">
            소개
          </Link>
          <Link href="/discover/privacy" className="hover:text-foreground">
            개인정보처리방침
          </Link>
          <Link href="/discover/terms" className="hover:text-foreground">
            이용약관
          </Link>
        </nav>

        <div className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>
            이 섹션은 정보 제공을 목적으로 하며, 등록된 사이트의 실제 운영
            여부는 방문 전 다시 확인하시기 바랍니다.
          </p>
          <p>
            사이트 카드와 상세 페이지의 이미지는 각 사이트의 og:image를
            기준으로 가져와 사용합니다.
          </p>
          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} {DISCOVER_SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
