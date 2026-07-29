import Link from 'next/link';
import { getAllCategories } from '@/lib/services';
import { HeaderNav } from './HeaderNav';

export function Header() {
  const categories = getAllCategories();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="shrink-0 text-lg font-bold tracking-tight">
          여기다
        </Link>
        <HeaderNav categories={categories} />
      </div>
    </header>
  );
}
