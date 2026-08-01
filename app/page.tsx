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
    <div className="flex flex-1 flex-col">
      <section className="border-b bg-gradient-to-b from-primary/10 via-primary/5 to-transparent">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            몰라서 못 쓰는 서비스를 찾아드립니다
          </span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            검색해도 잘 안 나오는, 진짜 도움되는 서비스
          </h1>
          <p className="max-w-xl text-muted-foreground">
            급할 때 필요한 상담·법률·행정·육아 서비스를 한 곳에 모았습니다.
          </p>
          <SearchBar services={services} />
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-16">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">카테고리별로 둘러보기</h2>
            <p className="text-sm text-muted-foreground">
              건강부터 교통까지, 여기다가 정리한 서비스를 카테고리별로 한눈에
              살펴보세요.
            </p>
          </div>
          <CategoryNav categories={categories} />
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">실전 가이드</h2>
            <Link
              href="/guides"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              전체 가이드 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {guides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <CardHeader>
                    <h3 className="text-base font-semibold">{guide.title}</h3>
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
        </section>
      </div>
    </div>
  );
}
