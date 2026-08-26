import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * (main) 라우트는 app/[lang]/(main) 아래로 이동했지만, 기존에 색인된 한국어 URL은
 * 접두사 없이 그대로 유지해야 한다. 그래서 기본 로케일(ko)은 rewrite로만 내부적으로
 * /ko 접두사를 붙이고 브라우저 주소창은 원래 경로 그대로 보이게 한다.
 * /en/* 은 [lang] 세그먼트가 파일시스템에서 그대로 처리하므로 별도 rewrite가 필요 없다.
 * /ko/* 직접 접근은 중복 URL 방지를 위해 접두사 없는 정규 URL로 리다이렉트한다.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/ko' || pathname.startsWith('/ko/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/ko' ? '/' : pathname.slice('/ko'.length);
    return NextResponse.redirect(url, 308);
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/ko${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // (discover)·_next·api·정적 파일(점 포함 경로)은 (main)의 [lang] 라우팅 대상이 아니므로 제외.
  matcher: ['/((?!_next|api|discover|uploads|thumbnails|.*\\..*).*)'],
};
