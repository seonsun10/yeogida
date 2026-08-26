import { notFound } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: '관리자',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between gap-4 border-b pb-4">
        <Link href="/admin" className="text-lg font-bold">
          사이트 관리
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/reports"
            className="text-sm text-zinc-500 hover:text-zinc-900"
          >
            신고 관리
          </Link>
          <Link
            href="/admin/board"
            className="text-sm text-zinc-500 hover:text-zinc-900"
          >
            게시판 관리
          </Link>
          <Link
            href="/admin/categories"
            className="text-sm text-zinc-500 hover:text-zinc-900"
          >
            카테고리 색상
          </Link>
          <Link
            href="/admin/sites"
            className="text-sm text-zinc-500 hover:text-zinc-900"
          >
            민간/일반 사이트
          </Link>
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900">
            공개 사이트로 이동
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
