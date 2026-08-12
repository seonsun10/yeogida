import type { Metadata } from 'next';
import { getAllCategories, getAllServices } from '@/lib/services';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_SUBMIT_EMAIL ?? '';

export const metadata: Metadata = {
  title: '소개',
  description: '여기다가 무엇을 하는 사이트인지, 누가 운영하는지 소개합니다.',
  alternates: {
    canonical: '/about',
  },
};

export default async function AboutPage() {
  const categories = getAllCategories();
  const services = await getAllServices();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-16 text-sm leading-relaxed text-foreground/90">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">여기다 소개</h1>
        <p className="text-muted-foreground">사람들이 몰라서 못 쓰는 서비스를 모아둔 곳</p>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">여기다는 무엇을 하나요</h2>
        <p>
          여기다는 건강, 법률/행정, 육아/가족, 소비자보호, 긴급상황, 생활행정,
          주거/부동산, 취업/창업, 교통/자동차 등 실제로 도움이 되지만 잘 알려지지
          않은 정부·공공기관 서비스를 카테고리별로 정리해 소개하는 큐레이션
          디렉토리입니다. 존재는 하지만 검색해도 잘 나오지 않거나, 이름을 몰라서
          못 찾는 서비스를 한곳에 모으는 것이 목표입니다. 현재 {categories.length}개
          카테고리에 걸쳐 {services.length}개 서비스를 소개하고 있으며, 실제 상황에서
          어떤 순서로 서비스를 이용해야 하는지 정리한 가이드도 함께 제공합니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">
          여기다는 무엇이 아닌가요
        </h2>
        <p>
          여기다는 정부기관이 아니며, 각 서비스를 공식적으로 대행하거나 보증하지
          않습니다. 소개된 서비스의 운영 주체는 각 페이지에 표시된 기관이며, 실제
          이용 조건과 운영 여부는 방문 전 해당 기관을 통해 다시 확인하는 것이
          안전합니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">콘텐츠는 어떻게 만드나요</h2>
        <p>
          각 항목은 해당 기관의 공식 홈페이지와 공개 자료를 바탕으로 AI를 활용해
          수집·요약하고, 이를 운영자가 검토해 작성합니다. 매주 일요일 밤, 등록된
          모든 서비스의 링크 상태를 자동으로
          점검하는 절차를 거칩니다 — 접속이 안 되거나 오류가 발생하는 링크가
          발견되면 즉시 관리자에게 보고되어 빠르게 확인·수정합니다. 각 서비스
          페이지에는 정보를 마지막으로 확인한 날짜(최종 확인일)를 표시하며, 사이트
          하단에서 전체 링크를 마지막으로 점검한 날짜도 확인할 수 있습니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">운영 및 문의</h2>
        <p>
          여기다는 개인이 운영하는 프로젝트입니다. 오래되었거나 잘못된 정보를
          발견하셨거나, 새로 등록하면 좋을 서비스를 알고 계시다면{' '}
          <a href="/submit" className="underline underline-offset-2">
            서비스 제보 페이지
          </a>
          나 아래 이메일로 알려주세요. 서비스명·링크·간단한 설명을 함께 보내주시면
          검토 후 등록하며, 등록 여부와 무관하게 모든 제보를 확인합니다.
        </p>
        {CONTACT_EMAIL && (
          <p className="font-medium text-foreground">{CONTACT_EMAIL}</p>
        )}
      </section>
    </div>
  );
}
