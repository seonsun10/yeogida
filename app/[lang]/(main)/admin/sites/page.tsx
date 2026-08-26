import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { readSites } from '@/lib/admin-data';
import { getAllSiteCategories } from '@/lib/sites';

export const metadata = {
  title: '민간/일반 사이트 관리',
};

type AdminSitesPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function AdminSitesPage({
  searchParams,
}: AdminSitesPageProps) {
  const { category: selectedCategory } = await searchParams;
  const sites = await readSites();
  const categories = getAllSiteCategories();
  const categoryNameBySlug = new Map(
    categories.map((category) => [category.slug, category.name]),
  );

  const filteredSites = selectedCategory
    ? sites.filter((site) => site.categorySlug === selectedCategory)
    : sites;

  const countByCategory = new Map<string, number>();
  for (const site of sites) {
    countByCategory.set(
      site.categorySlug,
      (countByCategory.get(site.categorySlug) ?? 0) + 1,
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">
            등록된 사이트 ({filteredSites.length}
            {selectedCategory ? ` / 전체 ${sites.length}` : ''})
          </h1>
          <p className="text-sm text-zinc-500">
            공공기관이 아닌 민간/일반 사이트 모음(/discover)을 관리합니다.
          </p>
        </div>
        <Link href="/admin/sites/new" className={buttonVariants()}>
          새 사이트 등록
        </Link>
      </div>

      {categories.length === 0 && (
        <p className="rounded-md border border-dashed p-4 text-sm text-zinc-500">
          아직 카테고리가 없습니다.{' '}
          <Link href="/admin/sites/categories" className="underline">
            카테고리를 먼저 추가
          </Link>
          해주세요.
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/sites"
          className={cn(
            'rounded-full border px-3 py-1 text-sm transition-colors',
            !selectedCategory
              ? 'border-zinc-900 bg-zinc-900 text-white'
              : 'border-zinc-200 text-zinc-600 hover:border-zinc-400',
          )}
        >
          전체 ({sites.length})
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/admin/sites?category=${category.slug}`}
            className={cn(
              'rounded-full border px-3 py-1 text-sm transition-colors',
              selectedCategory === category.slug
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-zinc-200 text-zinc-600 hover:border-zinc-400',
            )}
          >
            {category.name} ({countByCategory.get(category.slug) ?? 0})
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-zinc-500">
            <tr>
              <th className="px-4 py-2 font-medium">이름</th>
              <th className="px-4 py-2 font-medium">카테고리</th>
              <th className="px-4 py-2 font-medium">이미지</th>
              <th className="px-4 py-2 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredSites.map((site) => (
              <tr key={site.slug}>
                <td className="px-4 py-2">
                  <div className="font-medium">{site.name}</div>
                  <div className="text-xs text-zinc-400">{site.slug}</div>
                </td>
                <td className="px-4 py-2 text-zinc-600">
                  {categoryNameBySlug.get(site.categorySlug) ?? site.categorySlug}
                </td>
                <td className="px-4 py-2 text-zinc-600">
                  {site.images.length}장
                </td>
                <td className="px-4 py-2 text-right">
                  <Link
                    href={`/admin/sites/${site.slug}`}
                    className="text-zinc-600 hover:text-zinc-950 hover:underline"
                  >
                    수정
                  </Link>
                </td>
              </tr>
            ))}
            {filteredSites.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-400">
                  {selectedCategory
                    ? '이 카테고리에 등록된 사이트가 없습니다.'
                    : '등록된 사이트가 없습니다.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
