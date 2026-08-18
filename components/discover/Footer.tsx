import { DISCOVER_SITE_NAME } from '@/lib/discover-constants';

export function DiscoverFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground">
        <p>
          이 섹션은 정보 제공을 목적으로 하며, 등록된 사이트의 실제 운영
          여부는 방문 전 다시 확인하시기 바랍니다.
        </p>
        <p className="text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} {DISCOVER_SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
