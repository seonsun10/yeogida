import Link from 'next/link';
import { getAllSiteCategories } from '@/lib/sites';
import { createSite } from '../actions';
import { SiteForm } from '../SiteForm';

export default function NewSitePage() {
  const categories = getAllSiteCategories();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/sites"
          className="text-sm text-zinc-500 hover:text-zinc-900"
        >
          ← 목록으로
        </Link>
      </div>
      <h1 className="text-xl font-bold">새 사이트 등록</h1>
      <SiteForm mode="create" categories={categories} action={createSite} />
    </div>
  );
}
