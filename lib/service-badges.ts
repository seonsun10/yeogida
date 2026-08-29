import type { Locale } from '@/lib/i18n';

/**
 * 서비스 뱃지(Service.badges) 표시명. 필터링은 항상 원본(한국어) 값으로 매칭하므로
 * (lib/services.ts의 filterServices) 이 맵은 화면 표시용 번역만 담당하고
 * 데이터/필터 로직에는 영향을 주지 않는다 — getServiceLanguageName과 동일한 패턴.
 * 목록에 없는 값은 원문 그대로 반환한다(추측 번역 금지).
 */
const SERVICE_BADGE_NAMES: Record<string, Record<Locale, string>> = {
  '24시간': { ko: '24시간', en: '24/7' },
  공공기관: { ko: '공공기관', en: 'Public agency' },
  긴급: { ko: '긴급', en: 'Emergency' },
  다국어지원: { ko: '다국어지원', en: 'Multilingual support' },
  무료: { ko: '무료', en: 'Free' },
  민원발급: { ko: '민원발급', en: 'Civil document issuance' },
  의료비지원: { ko: '의료비지원', en: 'Medical expense support' },
  정부지원: { ko: '정부지원', en: 'Government support' },
  취약계층지원: { ko: '취약계층지원', en: 'Support for vulnerable groups' },
};

export function getServiceBadgeName(badge: string, lang: Locale): string {
  return SERVICE_BADGE_NAMES[badge]?.[lang] ?? badge;
}
