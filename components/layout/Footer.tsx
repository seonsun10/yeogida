import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-zinc-500">
        <p>
          이 사이트는 정보 제공을 목적으로 하며, 등록된 서비스의 실제 운영
          여부는 방문 전 다시 확인하시기 바랍니다.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/submit" className="hover:text-zinc-800">
            서비스 제보하기
          </Link>
          <Link href="/privacy" className="hover:text-zinc-800">
            개인정보처리방침
          </Link>
          <Link href="/terms" className="hover:text-zinc-800">
            이용약관
          </Link>
        </div>
        <p className="text-xs text-zinc-400">
          © {new Date().getFullYear()} 여기다
        </p>
      </div>
    </footer>
  );
}
