import { readSiteCategories } from '@/lib/admin-data';
import { updateSiteCategoryColor } from '../actions';
import { SiteCategoryColorForm } from './SiteCategoryColorForm';
import { NewSiteCategoryForm } from './NewSiteCategoryForm';

export const metadata = {
  title: '민간/일반 사이트 카테고리 관리',
};

export default async function AdminSiteCategoriesPage() {
  const categories = await readSiteCategories();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold">카테고리 관리</h1>
        <p className="text-sm text-zinc-500">
          /discover 섹션에서 사용할 카테고리를 추가하고 강조색을 설정합니다.
        </p>
      </div>

      {categories.length > 0 && (
        <div className="divide-y overflow-hidden rounded-md border">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="flex flex-wrap items-center justify-between gap-4 px-4 py-3"
            >
              <div>
                <p className="font-medium">{category.name}</p>
                <p className="text-xs text-zinc-400">{category.slug}</p>
              </div>
              <SiteCategoryColorForm
                category={category}
                action={updateSiteCategoryColor.bind(null, category.slug)}
              />
            </div>
          ))}
        </div>
      )}

      <NewSiteCategoryForm />
    </div>
  );
}
