import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteCard } from '@/components/discover/SiteCard';
import { DiscoverGuideLinks } from '@/components/discover/GuideLinks';
import {
  getDiscoverGuide,
  getDiscoverGuides,
  getDiscoverGuideSources,
} from '@/lib/discover-guides';
import { breadcrumbList, jsonLdScriptProps } from '@/lib/json-ld';
import { getAllSites } from '@/lib/sites';
import { getSiteUrl } from '@/lib/site-url';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return getDiscoverGuides().map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getDiscoverGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.summary,
    authors: [{ name: '여기다 편집', url: '/discover/about' }],
    alternates: { canonical: `/discover/guides/${slug}` },
    openGraph: {
      type: 'article',
      title: guide.title,
      description: guide.summary,
      publishedTime: guide.publishedAt,
      url: `/discover/guides/${slug}`,
    },
  };
}
export default async function DiscoverGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getDiscoverGuide(slug);
  if (!guide) notFound();
  const sites = (await getAllSites()).filter((site) =>
    guide.siteSlugs.includes(site.slug),
  );
  const sources = getDiscoverGuideSources(guide);
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/discover/guides/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: guide.title,
        description: guide.summary,
        datePublished: guide.publishedAt,
        inLanguage: 'ko',
        mainEntityOfPage: url,
        author: {
          '@type': 'Organization',
          name: '여기다 편집',
          url: `${siteUrl}/discover/about`,
        },
        citation: sources.map((source) => source.url),
      },
      breadcrumbList([
        { name: '사이트 둘러보기', url: `${siteUrl}/discover` },
        { name: '선택·활용 가이드', url: `${siteUrl}/discover/guides` },
        { name: guide.title, url },
      ]),
    ],
  };
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-12">
      <script {...jsonLdScriptProps(jsonLd)} />
      <Link
        href="/discover/guides"
        className="w-fit text-sm underline underline-offset-4"
      >
        가이드 전체 보기
      </Link>
      <header className="flex flex-col gap-3 border-b pb-8">
        <h1 className="text-2xl font-bold text-balance">{guide.title}</h1>
        <p className="text-muted-foreground leading-relaxed">{guide.summary}</p>
        <p className="text-muted-foreground text-xs">
          여기다 편집 · 작성{' '}
          <time dateTime={guide.publishedAt}>{guide.publishedAt}</time> ·{' '}
          <Link href="/discover/about" className="underline underline-offset-4">
            편집 기준
          </Link>
        </p>
      </header>
      <p className="leading-relaxed">{guide.introduction}</p>
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">목적별로 먼저 비교해 보세요</h2>
        <p className="text-muted-foreground text-xs sm:hidden">
          표를 좌우로 밀면 확인할 조건까지 볼 수 있어요.
        </p>
        <div
          role="region"
          aria-label="목적별 비교표"
          tabIndex={0}
          className="focus-visible:ring-ring overflow-x-auto rounded-lg border outline-none focus-visible:ring-2"
        >
          <table className="w-full text-left text-sm leading-relaxed">
            <caption className="sr-only">목적에 따른 선택과 확인사항</caption>
            <thead className="bg-muted/30">
              <tr>
                {['하려는 일', '먼저 살펴볼 곳', '확인할 것'].map((label) => (
                  <th
                    key={label}
                    scope="col"
                    className="min-w-36 p-3 font-bold"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.comparison.map((row) => (
                <tr key={row.need} className="border-t">
                  <th scope="row" className="p-3 font-normal">
                    {row.need}
                  </th>
                  <td className="p-3">{row.choice}</td>
                  <td className="p-3">{row.check}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {guide.sections.map((section) => (
        <section key={section.title} className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">{section.title}</h2>
          <p className="leading-relaxed">{section.text}</p>
        </section>
      ))}
      <section className="bg-muted/30 flex flex-col gap-3 rounded-lg border p-4">
        <h2 className="font-bold">시작 전 확인 목록</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
          {guide.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-3 border-t pt-8">
        <h2 className="text-xl font-bold">확인한 공식 자료</h2>
        <p className="text-muted-foreground text-sm">
          기능·이용 조건의 근거예요. 도구를 고르는 기준과 작업 순서는 여기다의
          편집 제안이에요. 요금과 기능은 도입 전에 다시 확인해 주세요.
        </p>
        <ul className="space-y-3 text-sm">
          {sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">이 글에서 살펴본 사이트</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {sites.map((site) => (
            <SiteCard key={site.slug} site={site} />
          ))}
        </div>
      </section>
      <DiscoverGuideLinks
        guides={getDiscoverGuides().filter((item) => item.slug !== slug)}
      />
    </article>
  );
}
