import type { GuideTranslation } from '@/lib/guides';
import { guideTranslationsEnPart1 } from '@/lib/guide-i18n/part1';
import { guideTranslationsEnPart2 } from '@/lib/guide-i18n/part2';
import { guideTranslationsEnPart3 } from '@/lib/guide-i18n/part3';
import { guideTranslationsEnPart4 } from '@/lib/guide-i18n/part4';

export const guideTranslationsEn: Record<string, GuideTranslation> = {
  ...guideTranslationsEnPart1,
  ...guideTranslationsEnPart2,
  ...guideTranslationsEnPart3,
  ...guideTranslationsEnPart4,
};
