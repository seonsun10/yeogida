import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getAllGuides } from '@/lib/guides';

export const metadata: Metadata = {
  title: '가이드',
  description: '상황별로 어떤 서비스를 먼저 써야 하는지 정리한 여기다의 실전 가이드',
  alternates: {
    canonical: '/guides',
  },
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">가이드</h1>
        <p className="text-muted-foreground">
          급한 상황에서 어떤 서비스부터 확인해야 하는지, 여기다가 등록한 서비스를
          엮어서 순서대로 정리했습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="block h-full">
            <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader>
                <h2 className="text-lg font-semibold">{guide.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {guide.summary}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
