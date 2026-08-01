import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getCategoryStyle } from '@/lib/category-style';
import type { Category } from '@/types/service';

export function CategoryNav({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const style = getCategoryStyle(category.slug);
        const Icon = style.icon;
        return (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <Card
              className="h-full border-t-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderTopColor: category.color }}
            >
              <CardHeader>
                <div
                  className={`flex size-10 items-center justify-center rounded-lg ${style.chip}`}
                >
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-2 text-base font-semibold">
                  {category.name}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
