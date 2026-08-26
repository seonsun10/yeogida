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
 * 기계번역 금지 — 운영기관이 실제로 제공하는 공식 영어 콘텐츠가 있을 때만 채운다.
 * name/summary/description을 모두 채우지 못하면 얇은 중복 페이지가 생기므로 필수로 둔다.
 */
export type ServiceTranslation = {
  name: string;
  summary: string;
  description: string;
  hours?: string;
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

export type Category = {
  slug: string;
  name: string;
  description: string;
  color: string;
};
