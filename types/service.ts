/**
 * 서비스가 실제로 응대 가능한 언어. "아마 될 것 같다"는 추측 금지 —
 * 운영기관이 공식적으로 명시한 근거(evidenceUrl)가 있을 때만 채운다.
 * (I18N-PLAN.md "콘텐츠 트랙" 참고, [[절차 관련 내용 지어내기 금지]])
 */
export type ServiceLanguageSupport = {
  /** ISO 639-1 코드 (예: 'en', 'zh', 'vi') — 표시명은 lib/service-languages.ts 참고 */
  language: string;
  evidenceUrl: string;
};

/**
 * 운영기관의 공식 영어 콘텐츠를 옮긴 경우 official: true.
 * 공식 영문 자료가 없어 한국어 원문을 사람이 직접 번역한 경우 official을 생략(또는 false) —
 * 이 경우 화면에 "공식 자료 아님" 안내를 표시하고 robots.ts/sitemap.ts 색인 허용 대상에서도 제외한다
 * (I18N-PLAN.md "5단계: 콘텐츠 전면 번역" 참고). name/summary/description을 모두 채우지 못하면
 * 얇은 중복 페이지가 생기므로 필수로 둔다. 두 경우 모두 사실(전화번호·URL·운영시간·절차 순서)은
 * 원문에서 바꾸지 않는다 — [[절차 관련 내용 지어내기 금지]].
 */
export type ServiceTranslation = {
  name: string;
  summary: string;
  description: string;
  hours?: string;
  official?: boolean;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  categorySlug: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  url: string;
  hours: string;
  cost: 'free' | 'paid';
  badges: string[];
  source: string;
  affiliate: boolean;
  lastVerified: string;
  supportLanguages?: ServiceLanguageSupport[];
  i18n?: {
    en?: ServiceTranslation;
  };
};

/** 카테고리명/설명은 사이트 자체 안내문이라 절차 지어내기 원칙과 무관 — 직접 번역 가능. */
export type CategoryTranslation = {
  name: string;
  description: string;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  color: string;
  i18n?: {
    en?: CategoryTranslation;
  };
};
