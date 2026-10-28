import type { Metadata } from 'next';
import Link from 'next/link';
import { DEFAULT_LOCALE, isLocale, localeHref } from '@/lib/i18n';
import { getAllCategories, getAllServices } from '@/lib/services';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_SUBMIT_EMAIL ?? '';

export const metadata: Metadata = {
  title: '소개',
  description: '여기다가 무엇을 하는 사이트인지, 누가 운영하는지 소개합니다.',
  alternates: {
    canonical: '/about',
  },
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;
  const categories = getAllCategories();
  const services = await getAllServices();

  return (
    <div className="text-foreground/90 mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-16 text-sm leading-relaxed">
      <div className="flex flex-col gap-2">
        <h1 className="text-foreground text-2xl font-bold">여기다 소개</h1>
        <p className="text-muted-foreground">
          사람들이 몰라서 못 쓰는 서비스를 모아둔 곳
        </p>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="text-foreground text-lg font-semibold">
          여기다는 무엇을 하나요
        </h2>
        <p>
          여기다는 건강, 법률/행정, 육아/가족, 소비자보호, 긴급상황, 생활행정,
          주거/부동산, 취업/창업, 교통/자동차 등 실제로 도움이 되지만 잘
          알려지지 않은 정부·공공기관 서비스를 카테고리별로 정리해 소개하는
          큐레이션 디렉토리입니다. 존재는 하지만 검색해도 잘 나오지 않거나,
          이름을 몰라서 못 찾는 서비스를 한곳에 모으는 것이 목표입니다. 현재{' '}
          {categories.length}개 카테고리에 걸쳐 {services.length}개 서비스를
          소개하고 있으며, 실제 상황에서 어떤 순서로 서비스를 이용해야 하는지
          정리한 가이드도 함께 제공합니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-foreground text-lg font-semibold">
          여기다는 무엇이 아닌가요
        </h2>
        <p>
          여기다는 정부기관이 아니며, 각 서비스를 공식적으로 대행하거나 보증하지
          않습니다. 소개된 서비스의 운영 주체는 각 페이지에 표시된 기관이며,
          실제 이용 조건과 운영 여부는 방문 전 해당 기관을 통해 다시 확인하는
          것이 안전합니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-foreground text-lg font-semibold">
          콘텐츠는 어떻게 관리하나요
        </h2>
        <p>
          서비스 소개는 운영기관의 공식 홈페이지와 공개 자료를 바탕으로
          작성하며, 초안 작성과 자료 정리에 AI를 보조 도구로 활용합니다. 실제로
          이용하지 않은 서비스를 이용 후기처럼 소개하거나, 확인되지 않은
          자격·혜택을 만들어 쓰지 않는 것을 편집 기준으로 삼습니다. 각
          서비스에는 등록 정보 확인일을, 공식 문서를 확인해 추가한 이용 안내에는
          근거 링크와 별도의 확인일을 표시합니다. 사이트 하단의 자동 링크
          점검일은 URL 접속 여부를 확인한 날짜이며, 신청 조건·요금·지원 내용이
          최신이라는 뜻은 아닙니다. 잘못된 정보는 상세 페이지의 신고 기능이나
          제보 창구로 알려주시면 수정할 수 있습니다. 특히 실제 상황에서 어떤
          순서로 서비스를 이용해야 하는지 정리한{' '}
          <Link
            href={localeHref(lang, '/guides')}
            className="underline underline-offset-2"
          >
            가이드
          </Link>
          는 상황에 따라 필요한 서비스를 연결해 무엇부터 확인할지 안내합니다.
          작성 주체와 관련 기관 링크를 함께 표시하며, 일부 글에는 공식 근거를
          확인한 준비 목록을 덧붙였습니다. 개별 사건의 의료·법률·금융 판단이나
          신청 자격은 해당 기관과 전문가에게 최종 확인해 주세요.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-foreground text-lg font-semibold">운영 및 문의</h2>
        <p>
          여기다는 개인이 운영하는 프로젝트입니다. 오래되었거나 잘못된 정보를
          발견하셨거나, 새로 등록하면 좋을 서비스를 알고 계시다면{' '}
          <Link
            href={localeHref(lang, '/submit')}
            className="underline underline-offset-2"
          >
            서비스 제보 페이지
          </Link>
          나 아래 이메일로 알려주세요. 서비스명·링크·간단한 설명을 함께
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
