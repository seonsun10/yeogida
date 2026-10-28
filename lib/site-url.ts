/**
 * 환경변수가 없어도 canonical·사이트맵은 실제 운영 도메인을 사용한다.
 * 임시 Vercel 주소나 localhost가 대표 URL로 검색에 노출되는 일을 막는다.
 */
export function getSiteUrl(): string {
  return new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yeogida-life.com')
    .origin;
}
