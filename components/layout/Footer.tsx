import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground">
        <p>
          이 사이트는 정보 제공을 목적으로 하며, 등록된 서비스의 실제 운영
          여부는 방문 전 다시 확인하시기 바랍니다.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/guides" className="hover:text-foreground">
            가이드
          </Link>
          <Link href="/submit" className="hover:text-foreground">
            서비스 제보하기
          </Link>
          <Link href="/about" className="hover:text-foreground">
            소개
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            개인정보처리방침
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            이용약관
          </Link>
        </div>
        <p className="text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} 여기다
        </p>
      </div>
    </footer>
  );
}
