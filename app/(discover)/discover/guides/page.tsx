import type { Metadata } from 'next';
import Link from 'next/link';
import { DiscoverGuideLinks } from '@/components/discover/GuideLinks';
import { getDiscoverGuides } from '@/lib/discover-guides';

export const metadata: Metadata = {
  title: '사이트 선택·활용 가이드',
  description:
    '디자인 도구 선택부터 팀 협업과 첫 프로젝트 공유까지, 목적에 맞는 사이트를 고르고 시작하는 방법을 정리했어요.',
  alternates: { canonical: '/discover/guides' },
};

export default function DiscoverGuidesPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-12">
      <Link
        href="/discover"
        className="w-fit text-sm underline underline-offset-4"
      >
        사이트 둘러보기
      </Link>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">사이트 선택·활용 가이드</h1>
        <p className="text-muted-foreground leading-relaxed">
          어떤 사이트를 골라야 할지, 어디서 시작해야 할지 정리했어요. 공식 기능
          안내와 여기다의 선택 기준을 함께 읽어보세요.
        </p>
      </div>
      <DiscoverGuideLinks guides={getDiscoverGuides()} />
    </div>
  );
}
