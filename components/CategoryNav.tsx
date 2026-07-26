import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Category } from '@/types/service';

export function CategoryNav({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <Card className="h-full transition-colors hover:border-zinc-400">
            <CardHeader>
              <h3 className="text-base font-semibold">{category.name}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600">{category.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
