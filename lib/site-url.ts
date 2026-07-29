/**
 * NEXT_PUBLIC_SITE_URL이 없으면 Vercel이 자동으로 심어주는 배포 도메인으로 대체한다.
 * 커스텀 도메인을 아직 연결하지 않은 상태에서도 sitemap/robots/OG가 깨지지 않게 하기 위함.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}
