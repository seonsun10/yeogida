import Link from 'next/link';
import { getAllCategories } from '@/lib/services';

export function Header() {
  const categories = getAllCategories();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          생활 서비스 디렉토리
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-600">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="hover:text-zinc-950"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
