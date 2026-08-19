import type { Metadata } from 'next';
import Link from 'next/link';
import { DISCOVER_SITE_NAME } from '@/lib/discover-constants';

export const metadata: Metadata = {
  title: '이용약관',
  alternates: {
    canonical: '/discover/terms',
  },
};

export default function DiscoverTermsPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-16 text-sm leading-relaxed text-foreground/90">
      <h1 className="text-2xl font-bold text-foreground">이용약관</h1>
      <p className="text-muted-foreground">최종 수정일: 2026년 8월 19일</p>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">1. 목적</h2>
        <p>
          이 약관은 {DISCOVER_SITE_NAME}(이하 &quot;사이트&quot;)가 제공하는
          정보 서비스의 이용 조건 및 절차를 규정함을 목적으로 합니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">
          2. 정보 제공의 성격
        </h2>
        <p>
          사이트에 게재된 정보는 이용자의 이해를 돕기 위한 참고용 정보이며,
          소개된 각 사이트의 실제 운영 여부·이용 조건은 방문 전 해당
          사이트에서 다시 확인해야 합니다. 사이트는 게재된 정보의 정확성을
          위해 노력하지만 이를 완전히 보증하지 않습니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">
          3. 이미지 출처
        </h2>
        <p>
          사이트 카드와 상세 페이지에 사용되는 이미지는 소개된 각 사이트의
          og:image(공유 시 노출되는 대표 이미지)를 기준으로 가져와
          사용하며, 해당 이미지의 저작권은 원 사이트 또는 원저작자에게
          있습니다. 이미지 사용에 이의가 있으신 경우{' '}
          <Link href="/discover/submit" className="underline underline-offset-2">
            제보 페이지
          </Link>
          를 통해 알려주시면 확인 후 신속히 삭제 또는 교체하겠습니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">
          4. 전문가 상담 대체 불가
        </h2>
        <p>
          의료·법률 등 전문 분야 정보는 정보 제공 목적으로만 제공되며, 전문가
          상담을 대체하지 않습니다. 중요한 판단은 반드시 해당 분야 전문가와 상담
          후 내리시기 바랍니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">5. 책임의 제한</h2>
        <p>
          사이트는 게재된 외부 링크로 인해 발생하는 문제, 또는 정보의 오류나
          변경으로 인해 발생하는 손해에 대해 책임을 지지 않습니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">6. 광고 게재</h2>
        <p>
          사이트는 Google AdSense 등 제3자 광고 네트워크를 통해 광고를 게재해
          운영 비용을 충당할 수 있습니다. 광고는 사이트가 직접 작성하거나
          검증한 콘텐츠가 아니며, 광고주의 상품·서비스에 대해 사이트가 어떠한
          보증도 하지 않습니다. 쿠키 및 광고 개인정보 처리에 대한 자세한 내용은{' '}
          <Link href="/discover/privacy" className="underline underline-offset-2">
            개인정보처리방침
          </Link>
          을 참고하시기 바랍니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-foreground">7. 약관의 변경</h2>
        <p>
          본 약관은 필요 시 사전 고지 없이 개정될 수 있으며, 개정된 약관은
          사이트에 게시함으로써 효력이 발생합니다.
        </p>
      </section>
    </div>
  );
}
