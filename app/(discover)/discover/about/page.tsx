import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSiteCategories, getAllSites } from '@/lib/sites';
import { DISCOVER_SITE_NAME } from '@/lib/discover-constants';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_SUBMIT_EMAIL ?? '';

export const metadata: Metadata = {
  title: '소개',
  description: `${DISCOVER_SITE_NAME}가 무엇을 하는 섹션인지 소개합니다.`,
  alternates: {
    canonical: '/discover/about',
  },
};

export default async function DiscoverAboutPage() {
  const categories = getAllSiteCategories();
  const sites = await getAllSites();

  return (
    <div className="text-foreground/90 mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-16 text-sm leading-relaxed">
      <div className="flex flex-col gap-2">
        <h1 className="text-foreground text-2xl font-bold">
          {DISCOVER_SITE_NAME} 소개
        </h1>
        <p className="text-muted-foreground">
          분야를 가리지 않고, 진짜 써볼 만한 사이트만 모아둔 곳
        </p>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="text-foreground text-lg font-semibold">
          {DISCOVER_SITE_NAME}는 무엇을 하나요
        </h2>
        <p>
          {DISCOVER_SITE_NAME}는 정부·공공기관 서비스를 넘어, 실제로 써볼 만한
          민간·일반 사이트를 분야별로 정리해 소개하는 큐레이션 섹션입니다.
          광고성 링크모음이 아니라, 실제로 유용하다고 판단한 사이트만 골라
          소개하는 것이 목표입니다. 현재 {categories.length}개 카테고리에 걸쳐{' '}
          {sites.length}개 사이트를 소개하고 있습니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-foreground text-lg font-semibold">
          {DISCOVER_SITE_NAME}는 무엇이 아닌가요
        </h2>
        <p>
          {DISCOVER_SITE_NAME}는 소개된 사이트를 운영하거나 소유하지 않으며,
          해당 사이트를 공식적으로 대행하거나 보증하지 않습니다. 각 사이트의
          실제 운영 여부와 이용 조건은 방문 전 해당 사이트에서 다시 확인하는
          것이 안전합니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-foreground text-lg font-semibold">
          콘텐츠는 어떻게 만드나요
        </h2>
        <p>
          각 항목은 해당 사이트의 공개된 정보를 바탕으로 AI를 활용해
          수집·요약하고, 이를 운영자가 검토해 작성합니다. 사이트 카드와 상세
          페이지에 쓰이는 이미지는 별도로 촬영·제작한 것이 아니라, 각 사이트의
          og:image(공유 시 노출되는 대표 이미지)를 기준으로 가져와 사용합니다.
          저작권 등의 사유로 이미지 삭제를 원하시면 아래 이메일로 연락해주세요.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-foreground text-lg font-semibold">
          사이트를 고르는 기준
        </h2>
        <p>
          분야별 목록에는 이용 목적에 따른 선택 기준을 함께 제공합니다.
          가입·결제·취소·공유 권한처럼 실제 이용에 영향을 주는 조건을 먼저
          확인하도록 안내하며, 확인하지 않은 이용 경험이나 성과를 후기처럼 쓰지
          않습니다. 기능과 조건의 근거를 확인한 이용 안내에는 공식 문서 링크와
          확인 날짜를 별도로 표시합니다. 등록 정보 확인일과 자동 링크 점검일은
          서로 다른 기록입니다.
        </p>
        <p>
          도구를 비교하는 글과 작업 순서는 여기다의 편집 제안이며, 특정 업체의
          공식 추천이나 순위가 아닙니다. 요금과 기능은 달라질 수 있으므로
          가입·결제 전 해당 사이트의 최신 안내를 확인해 주세요.
        </p>
        <Link
          href="/discover/guides"
          className="w-fit underline underline-offset-2"
        >
          사이트 선택·활용 가이드 읽기
        </Link>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-foreground text-lg font-semibold">운영 및 문의</h2>
        <p>
          {DISCOVER_SITE_NAME}는 개인이 운영하는 프로젝트입니다. 새로 소개하면
          좋을 사이트를 알고 계시거나, 잘못된 정보를 발견하셨다면{' '}
          <Link
            href="/discover/submit"
            className="underline underline-offset-2"
          >
            사이트 제보 페이지
          </Link>
          나 아래 이메일로 알려주세요. 사이트명·링크·간단한 설명을 함께
          보내주시면 검토 후 등록하며, 등록 여부와 무관하게 모든 제보를
          확인합니다.
        </p>
        {CONTACT_EMAIL && (
          <p className="text-foreground font-medium">{CONTACT_EMAIL}</p>
        )}
      </section>
    </div>
  );
}
