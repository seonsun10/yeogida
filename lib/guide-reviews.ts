import { serviceNotes } from '@/lib/editorial-notes';

type GuideReview = {
  reviewedAt: string;
  checklist: string[];
  serviceSlugs: string[];
};

const reviewedAt = '2026-10-28';
const reviews: Record<string, GuideReview> = {
  'workplace-rights-violation-guide': {
    reviewedAt,
    serviceSlugs: ['moel-labor-counsel-1350', 'legal-aid-corporation-132'],
    checklist: [
      '근무 기간·약속한 급여일·실제 지급액을 시간순으로 적어 두세요.',
      '근로계약서·급여명세서·입금 내역처럼 상황을 설명할 자료를 모아 두세요.',
      '1350 전화는 통화요금이 부과돼요. 상담과 진정 등 정식 접수는 구분하고 담당기관·신청 방법을 물어보세요.',
    ],
  },
  'gov24-certificate-and-administration-guide': {
    reviewedAt,
    serviceSlugs: ['gov24-portal'],
    checklist: [
      '제출기관이 요구하는 서류 이름과 제출 형태를 먼저 확인하세요.',
      '민원안내 화면에서 신청 대상·구비서류·수수료·처리기간을 살펴보세요.',
      '비회원 신청도 본인인증이 필요할 수 있어요. 발급 뒤에는 문서의 내용과 수령·제출 방법을 확인하세요.',
    ],
  },
  'moving-admin-checklist': {
    reviewedAt,
    serviceSlugs: ['gov24-portal', 'waste-appliance-free-pickup'],
    checklist: [
      '이사 전후 처리할 행정 업무를 나누고 각 민원의 신고 기한과 신청 조건을 공식 안내에서 확인하세요.',
      '버릴 가전의 품목·수량·설치 상태를 확인한 뒤 무상방문수거 가능 여부를 조회하세요.',
      '가구와 수거 불가 품목은 지자체 배출 방법을 별도로 확인하세요.',
    ],
  },
  'teen-part-time-work-rights-guide': {
    reviewedAt,
    serviceSlugs: ['moel-labor-counsel-1350', 'legal-aid-corporation-132'],
    checklist: [
      '근무일·근무시간·약속한 보수와 지급일을 기록해 두세요.',
      '상담에서 확인할 질문과 관련 자료를 미리 정리하세요. 나이와 근무 형태에 따라 확인할 조건이 달라질 수 있어요.',
      '1350의 전화요금·상담시간을 확인하고, 지원 신청은 상담 후 안내받은 정식 창구에서 진행하세요.',
    ],
  },
  'divorce-and-family-legal-support-guide': {
    reviewedAt,
    serviceSlugs: ['legal-aid-corporation-132'],
    checklist: [
      '확인하고 싶은 문제와 이미 진행 중인 절차를 나눠 적어 두세요.',
      '법률 상담을 예약하고 사건별로 필요한 자료와 기한을 공식 창구에 물어보세요.',
      '무료 상담과 소송 지원의 조건은 달라요. 상담 결과만으로 소송 대리가 확정됐다고 생각하지 마세요.',
    ],
  },
};

export function getGuideReview(slug: string) {
  return reviews[slug];
}
export function getGuideReviewSources(review: GuideReview) {
  return [
    ...new Map(
      review.serviceSlugs
        .flatMap((slug) => serviceNotes[slug]?.sources ?? [])
        .map((source) => [source.url, source]),
    ).values(),
  ];
}
