import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-16 text-sm leading-relaxed text-zinc-700">
      <h1 className="text-2xl font-bold text-zinc-900">개인정보처리방침</h1>
      <p className="text-zinc-500">최종 수정일: 2026년 7월 25일</p>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-zinc-900">
          1. 수집하는 개인정보 항목
        </h2>
        <p>
          본 사이트는 별도의 회원가입 없이 이용할 수 있습니다. 다만 서비스 제보
          폼 이용 시 이용자가 자발적으로 입력한 연락처(이메일 등)를 수집할 수
          있으며, 이는 제보 검토 목적으로만 사용됩니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-zinc-900">
          2. 개인정보의 수집 및 이용 목적
        </h2>
        <p>제보 내용 검토 및 필요 시 제보자와의 확인 연락을 위해 사용합니다.</p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-zinc-900">
          3. 개인정보의 보유 및 이용 기간
        </h2>
        <p>
          수집한 정보는 제보 검토 완료 후 별도 요청이 없는 한 합리적인 기간 내에
          파기합니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-zinc-900">4. 쿠키 및 광고</h2>
        <p>
          본 사이트는 방문 통계 분석 및 광고 게재를 위해 쿠키를 사용할 수
          있습니다. 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-zinc-900">5. 문의</h2>
        <p>
          개인정보 관련 문의는 서비스 제보 폼을 통해 남겨주시면 확인 후
          답변드립니다.
        </p>
      </section>
    </div>
  );
}
