<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-07-26 -->

# app

## Purpose
Next.js App Router 루트. 두 개의 route group으로 나뉜다 — `(main)/`은 기존 공공서비스 디렉토리(홈/카테고리/서비스 상세/제보/약관/관리자), `(discover)/`은 민간·일반 사이트 모음(`/discover`, 완전히 다른 헤더/푸터/테마). route group은 URL 세그먼트에 나타나지 않으므로 기존 URL(`/`, `/category/...` 등)은 그대로다. `layout.tsx`(루트)는 두 그룹이 공유하는 얇은 shell(html/body, 폰트, GTM/GA/AdSense 스크립트)만 담당하고, Header/Footer/JSON-LD는 각 그룹의 `layout.tsx`에 있다. SEO 파일(`sitemap.ts`, `robots.ts`)은 route group 밖, 앱 루트에 그대로 둔다(Next.js 규약).

## Key Files
| File | Description |
|------|-------------|
| `layout.tsx` | 얇은 루트 shell — Geist 폰트, GTM/GA/AdSense 스크립트, skip-link. `<Header>`/`<Footer>`/JSON-LD는 없음(각 route group layout이 담당) |
| `globals.css` | Tailwind v4 전역 스타일. `:root`/`.dark`가 메인 사이트 테마, `[data-theme='discover']`가 `/discover` 전용 테마(같은 변수 이름을 재정의해 `components/ui/*`를 그대로 재스킨) |
| `sitemap.ts` | 정적 경로 + 카테고리 + 서비스 + discover 카테고리/사이트 슬러그로 사이트맵 생성 |
| `robots.ts` | robots.txt — `/api/`, `/admin` 크롤링 차단 |
| `not-found.tsx` | route group 밖의 진짜 미매칭 URL에 대한 최후 fallback (평소엔 `(main)/not-found.tsx` 또는 `(discover)/not-found.tsx`가 우선 렌더됨) |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `(main)/` | 기존 공공서비스 디렉토리 전체 — 홈, `category/`, `service/`, `admin/`(서비스+사이트+신고+게시판 관리 겸용), `guides/`, `about/`, `submit/`, `board/`(서비스 추가 요청·자유게시판·신고, DB 기반), `privacy/`, `terms/`. 각 하위 폴더의 `AGENTS.md` 참고 |
| `(discover)/` | 민간/일반 사이트 모음 섹션. `layout.tsx`가 `DiscoverHeader`/`DiscoverFooter`와 discover 전용 metadata(제목 템플릿 등)를 정의하고, `data-theme="discover"`로 테마를 스코프한다. `discover/page.tsx`(홈), `discover/[categorySlug]/page.tsx`, `discover/site/[slug]/page.tsx`, `discover/submit/page.tsx`(사이트 제보, `(main)/submit`과 동일하게 `NEXT_PUBLIC_SUBMIT_EMAIL` mailto 방식), `discover/board/`(사이트 추가 요청·자유게시판·신고, `(main)/board`와 같은 컴포넌트/DB 테이블을 쓰되 `site: 'discover'`로 구분), `discover/about/page.tsx`, `discover/privacy/page.tsx`, `discover/terms/page.tsx`(`(main)` 쪽과 내용은 유사하지만 두 섹션 간 상호 링크를 걸지 않기로 한 결정에 따라 완전히 별도 페이지로 존재) |

## For AI Agents

### Working In This Directory
- 새 공개 라우트를 추가할 때 `(main)/layout.tsx` 또는 `(discover)/layout.tsx`가 이미 각자의 Header/Footer를 감싸므로 각 `page.tsx`는 콘텐츠만 채우면 된다. 두 그룹 중 어디에 넣을지 헷갈리면: 공공기관 콘텐츠는 `(main)`, 민간/일반 사이트 콘텐츠는 `(discover)`.
- **route group 간 이동은 풀 페이지 리로드를 유발한다** (Next.js 공식 동작, `(main)`과 `(discover)`가 서로 다른 root-ish 레이아웃이기 때문). 지금은 두 섹션 간 상호 링크를 걸지 않기로 했으므로 문제 없지만, 나중에 링크를 추가한다면 이 점을 인지하고 있을 것. `components/board/*` 공유 컴포넌트는 이 원칙 때문에 `basePath` prop(`/board` 또는 `/discover/board`)을 반드시 받아 그 안에서만 링크를 만든다 — 하드코딩된 절대경로를 넣으면 다른 섹션으로 새 나간다. (예외: `/admin/board`는 관리자 전용 내부 도구라 두 섹션 상세페이지로 가는 링크를 `target="_blank"`로 둔다 — 공개 페이지 간 상호 링크 금지 원칙과 무관.)
- 동적 라우트(`[slug]`)는 Next.js 16 규약에 따라 `params`가 `Promise`이므로 반드시 `await params`로 풀어야 한다.
- `@/app/(main)/...`, `@/app/(discover)/...`처럼 route group을 포함한 절대 경로로 import해야 한다 — 괄호가 있다고 경로가 달라지지 않으니 주의(예: `components/ServiceDetail.tsx`가 `@/app/(main)/admin/actions`를 import).
- `privacy/`, `terms/`의 "최종 수정일"은 실제 내용 변경 시에만 갱신한다.

### Testing Requirements
- `npm run lint`, `npm run build`로 라우트 빌드/타입 오류 확인. 새 정적 라우트는 `npm run dev`로 직접 방문해 확인.
- route group 관련 변경(레이아웃 이동, 테마 등) 후에는 `/`, `/category/...`, `/service/...`, `/admin`, `/discover` 각각에서 Header/Footer/테마가 의도대로 렌더되는지 브라우저로 직접 확인할 것 — 빌드 통과가 이를 보장하지 않는다.

### Common Patterns
- 목록형 페이지(`category/[slug]`, `discover/[categorySlug]`)는 `generateStaticParams` + `generateMetadata`로 SSG + SEO 메타데이터를 함께 제공한다.
- 광고 자리(`AdSlot`)는 목록에 6개 간격(`IN_FEED_AD_INTERVAL`)으로, 상세 페이지엔 하단에 배치. `AdSlot`, `ServiceGrid`, `ShareButton`, `trackOutboundClick`은 도메인 독립적이라 `(discover)` 쪽에서도 그대로 재사용한다.

## Dependencies

### Internal
- `components/`, `components/discover/`, `components/board/` — 페이지에서 사용하는 UI 조각
- `lib/services.ts` / `lib/sites.ts` — 카테고리·서비스 / 사이트 조회
- `lib/board.ts` / `lib/board-submit.ts` / `lib/board-constants.ts` — 게시판 DB 조회·쓰기 / 서버 액션 공용 검증·등록 로직 / 라벨·상수
- `types/service.ts` / `types/site.ts` / `types/board.ts` — `Service`/`Category` / `Site`/`SiteCategory` / `BoardPost` 등 타입

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
