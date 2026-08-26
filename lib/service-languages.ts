import type { Locale } from '@/lib/i18n';

/**
 * 서비스 지원 언어(ServiceLanguageSupport.language) 표시명.
 * 국내 다문화가족지원센터·출입국 상담 등에서 실제로 자주 쓰이는 언어 위주로 구성 —
 * 목록에 없는 코드는 getServiceLanguageName이 코드 그대로 반환한다(추측 표시명을 만들지 않음).
 */
const SERVICE_LANGUAGE_NAMES: Record<string, Record<Locale, string>> = {
  en: { ko: '영어', en: 'English' },
  zh: { ko: '중국어', en: 'Chinese' },
  vi: { ko: '베트남어', en: 'Vietnamese' },
  ja: { ko: '일본어', en: 'Japanese' },
  ru: { ko: '러시아어', en: 'Russian' },
  th: { ko: '태국어', en: 'Thai' },
  mn: { ko: '몽골어', en: 'Mongolian' },
  km: { ko: '크메르어(캄보디아어)', en: 'Khmer (Cambodian)' },
  tl: { ko: '필리핀어(타갈로그어)', en: 'Filipino (Tagalog)' },
  ne: { ko: '네팔어', en: 'Nepali' },
  ur: { ko: '우르두어', en: 'Urdu' },
  uz: { ko: '우즈베크어', en: 'Uzbek' },
  id: { ko: '인도네시아어', en: 'Indonesian' },
  ar: { ko: '아랍어', en: 'Arabic' },
  fr: { ko: '프랑스어', en: 'French' },
  es: { ko: '스페인어', en: 'Spanish' },
};

export function getServiceLanguageName(code: string, lang: Locale): string {
  return SERVICE_LANGUAGE_NAMES[code]?.[lang] ?? code;
}
