import Link from 'next/link';
import { getAllCategories } from '@/lib/services';
import { createService } from '../actions';
import { ServiceForm } from '../ServiceForm';

export default function NewServicePage() {
  const categories = getAllCategories();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="text-sm text-zinc-500 hover:text-zinc-900">
          ← 목록으로
        </Link>
      </div>
      <h1 className="text-xl font-bold">새 사이트 등록</h1>
      <ServiceForm mode="create" categories={categories} action={createService} />
    </div>
  );
}
