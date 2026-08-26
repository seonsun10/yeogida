import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { readServices } from '@/lib/admin-data';
import { getAllCategories } from '@/lib/services';

type AdminPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { category: selectedCategory } = await searchParams;
  const services = await readServices();
  const categories = getAllCategories();
  const categoryNameBySlug = new Map(
    categories.map((category) => [category.slug, category.name]),
  );

  const filteredServices = selectedCategory
    ? services.filter((service) => service.categorySlug === selectedCategory)
    : services;

  const countByCategory = new Map<string, number>();
  for (const service of services) {
    countByCategory.set(
      service.categorySlug,
      (countByCategory.get(service.categorySlug) ?? 0) + 1,
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">
            등록된 사이트 ({filteredServices.length}
            {selectedCategory ? ` / 전체 ${services.length}` : ''})
          </h1>
          <p className="text-sm text-zinc-500">
            등록, 수정, 삭제 및 상세페이지 이미지 관리를 할 수 있습니다.
          </p>
        </div>
        <Link href="/admin/new" className={buttonVariants()}>
          새 사이트 등록
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin"
          className={cn(
            'rounded-full border px-3 py-1 text-sm transition-colors',
            !selectedCategory
              ? 'border-zinc-900 bg-zinc-900 text-white'
              : 'border-zinc-200 text-zinc-600 hover:border-zinc-400',
          )}
        >
          전체 ({services.length})
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/admin?category=${category.slug}`}
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
              <th className="px-4 py-2 font-medium">비용</th>
              <th className="px-4 py-2 font-medium">이미지</th>
              <th className="px-4 py-2 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredServices.map((service) => (
              <tr key={service.slug}>
                <td className="px-4 py-2">
                  <div className="font-medium">{service.name}</div>
                  <div className="text-xs text-zinc-400">{service.slug}</div>
                </td>
                <td className="px-4 py-2 text-zinc-600">
                  {categoryNameBySlug.get(service.categorySlug) ??
                    service.categorySlug}
                </td>
                <td className="px-4 py-2 text-zinc-600">
                  {service.cost === 'free' ? '무료' : '유료'}
                </td>
                <td className="px-4 py-2 text-zinc-600">
                  {service.images.length}장
                </td>
                <td className="px-4 py-2 text-right">
                  <Link
                    href={`/admin/${service.slug}`}
                    className="text-zinc-600 hover:text-zinc-950 hover:underline"
                  >
                    수정
                  </Link>
                </td>
              </tr>
            ))}
            {filteredServices.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-400">
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
