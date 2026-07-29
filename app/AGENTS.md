<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-07-26 -->

# app

## Purpose
Next.js App Router 루트. 공개 페이지(홈/카테고리/서비스 상세/제보/약관), 관리자 페이지(`admin/`), SEO 파일(`sitemap.ts`, `robots.ts`)을 포함한다.

## Key Files
| File | Description |
|------|-------------|
| `layout.tsx` | 루트 레이아웃 — Geist 폰트, `<Header>`/`<Footer>` 삽입, 기본 메타데이터(제목 템플릿 `%s \| 여기다`) |
| `page.tsx` | 홈 — 검색창(`SearchBar`) + 카테고리 하이라이트(`CategoryNav`) |
| `globals.css` | Tailwind v4 전역 스타일 |
| `sitemap.ts` | 정적 경로 + 카테고리 + 전체 서비스 슬러그로 사이트맵 생성 (`NEXT_PUBLIC_SITE_URL` 사용) |
| `robots.ts` | robots.txt — `/api/` 크롤링 차단 |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `admin/` | 로컬 개발 전용 콘텐츠 관리 화면 (see `admin/AGENTS.md`) |
| `category/[slug]/` | 카테고리별 서비스 목록 + 필터 (see `category/[slug]/AGENTS.md`) |
| `service/[slug]/` | 서비스 상세 페이지 (see `service/[slug]/AGENTS.md`) |
| `submit/` | 서비스 제보 안내 — 이메일 주소만 노출, 폼/API 없음 (see `submit/AGENTS.md`) |
| `privacy/` | 개인정보처리방침 (정적 콘텐츠) |
| `terms/` | 이용약관 (정적 콘텐츠) |

## For AI Agents

### Working In This Directory
- 새 공개 라우트를 추가할 때도 `layout.tsx`가 이미 `<Header>`/`<Footer>`를 감싸므로 각 `page.tsx`는 콘텐츠만 채우면 된다.
- 동적 라우트(`[slug]`)는 Next.js 16 규약에 따라 `params`가 `Promise`이므로 반드시 `await params`로 풀어야 한다 (기존 코드 패턴 참고: `category/[slug]/page.tsx`, `service/[slug]/page.tsx`, `admin/[slug]/page.tsx`).
- `privacy/`, `terms/`의 "최종 수정일"은 실제 내용 변경 시에만 갱신한다.

### Testing Requirements
- `npm run lint`, `npm run build`로 라우트 빌드/타입 오류 확인. 새 정적 라우트는 `npm run dev`로 직접 방문해 확인.

### Common Patterns
- 목록형 페이지(`category/[slug]`)는 `generateStaticParams` + `generateMetadata`로 SSG + SEO 메타데이터를 함께 제공한다.
- 광고 자리(`AdSlot`)는 목록에 6개 간격(`IN_FEED_AD_INTERVAL`)으로, 상세 페이지엔 하단에 배치.

## Dependencies

### Internal
- `components/` — 페이지에서 사용하는 UI 조각
- `lib/services.ts` — 카테고리/서비스 조회
- `types/service.ts` — `Service`, `Category` 타입

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
