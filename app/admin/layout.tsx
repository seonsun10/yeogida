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
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900">
          공개 사이트로 이동
        </Link>
      </div>
      {children}
    </div>
  );
}
