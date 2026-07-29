import Link from 'next/link';
import { CategoryNav } from '@/components/CategoryNav';
import { SearchBar } from '@/components/SearchBar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getAllGuides } from '@/lib/guides';
import { getAllCategories, getAllServices } from '@/lib/services';

const HOME_GUIDE_COUNT = 6;

export default async function Home() {
  const categories = getAllCategories();
  const services = await getAllServices();
  const guides = getAllGuides().slice(0, HOME_GUIDE_COUNT);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-16">
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          검색해도 잘 안 나오는, 진짜 도움되는 서비스
        </h1>
        <p className="max-w-xl text-zinc-600">
          급할 때 필요한 상담·법률·행정·육아 서비스를 한 곳에 모았습니다.
        </p>
        <SearchBar services={services} />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">실전 가이드</h2>
          <Link
            href="/guides"
            className="text-sm text-zinc-500 hover:text-zinc-800"
          >
            전체 가이드 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`}>
              <Card className="h-full transition-colors hover:border-zinc-400">
                <CardHeader>
                  <h3 className="text-base font-semibold">{guide.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600">{guide.summary}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">카테고리별로 둘러보기</h2>
        <CategoryNav categories={categories} />
      </section>
    </div>
  );
}
