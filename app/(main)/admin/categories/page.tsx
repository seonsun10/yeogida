import { readCategories } from '@/lib/admin-data';
import { updateCategoryColor } from '../actions';
import { CategoryColorForm } from './CategoryColorForm';

export const metadata = {
  title: '카테고리 색상 관리',
};

export default async function AdminCategoriesPage() {
  const categories = await readCategories();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold">카테고리 색상 관리</h1>
        <p className="text-sm text-zinc-500">
          카드 상단과 헤더 카테고리 메뉴에 표시되는 강조색을 카테고리별로
          설정합니다.
        </p>
      </div>

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
            <CategoryColorForm
              category={category}
              action={updateCategoryColor.bind(null, category.slug)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
