import type { Metadata } from 'next';
import { DISCOVER_SITE_NAME } from '@/lib/discover-constants';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_SUBMIT_EMAIL ?? '';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  alternates: {
    canonical: '/discover/privacy',
  },
};

export default function DiscoverPrivacyPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-16 text-sm leading-relaxed text-foreground/90">
      <h1 className="text-2xl font-bold text-foreground">개인정보처리방침</h1>
      <p className="text-muted-foreground">최종 수정일: 2026년 8월 19일</p>

      <p>
        {DISCOVER_SITE_NAME}(이하 &quot;사이트&quot;)는 사이트명과 이메일로만
        운영자를 표기하는 개인 프로젝트입니다. 이 개인정보처리방침은 사이트를
        이용하는 방문자의 정보를 어떻게 다루는지 설명합니다.
      </p>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">
          1. 수집하는 개인정보 항목
        </h2>
        <p>
          본 사이트는 별도의 회원가입 없이 이용할 수 있습니다. 다만 사이트
          제보 시 이용자가 자발적으로 입력한 연락처(이메일 등)를 수집할 수
          있으며, 이는 제보 검토 목적으로만 사용됩니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">
          2. 개인정보의 수집 및 이용 목적
        </h2>
        <p>제보 내용 검토 및 필요 시 제보자와의 확인 연락을 위해 사용합니다.</p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">
          3. 개인정보의 보유 및 이용 기간
        </h2>
        <p>
          수집한 정보는 제보 검토 완료 후 별도 요청이 없는 한 합리적인 기간 내에
          파기합니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">
          4. 쿠키와 제3자 광고·분석 서비스
        </h2>
        <p>
          본 사이트는 방문 통계 분석을 위해 Google Analytics를, 광고 게재를 위해
          Google AdSense를 사용할 수 있습니다. Google을 포함한 제3자 광고 벤더는
          쿠키를 사용해 사용자가 이 사이트 또는 다른 사이트를 방문한 기록을
          바탕으로 광고를 게재할 수 있습니다.
        </p>
        <p>
          Google이 광고 게재에 쿠키를 사용하는 방식은{' '}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Google 광고 정책
          </a>
          에서 확인할 수 있습니다. 맞춤 광고를 원하지 않는 경우{' '}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Google 광고 설정
          </a>{' '}
          또는{' '}
          <a
            href="https://www.youronlinechoices.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Your Online Choices
          </a>
          에서 맞춤 광고를 거부할 수 있으며, 브라우저 설정을 통해 쿠키 저장 자체를
          거부할 수도 있습니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">
          5. 만 14세 미만 아동의 개인정보
        </h2>
        <p>
          본 사이트는 만 14세 미만 아동을 대상으로 하지 않으며, 아동으로부터
          알면서 개인정보를 수집하지 않습니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">6. 문의</h2>
        <p>
          개인정보 관련 문의는 사이트 제보 페이지 또는 아래 이메일로 남겨주시면
          확인 후 답변드립니다.
        </p>
        {CONTACT_EMAIL && (
          <p className="font-medium text-foreground">{CONTACT_EMAIL}</p>
        )}
      </section>
    </div>
  );
}
