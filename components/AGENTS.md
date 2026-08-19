<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-08-13 -->

# components

## Purpose
페이지 조합에 쓰이는 도메인 컴포넌트(카드, 검색, 필터, 상세, 광고 자리 등)와 shadcn/ui 프리미티브(`ui/`), 레이아웃 조각(`layout/`)을 모아둔다. 별도 barrel export(`index.ts`) 없이 각 페이지에서 개별 파일을 직접 import한다.

## Key Files
| File | Description |
|------|-------------|
| `ServiceCard.tsx` | 목록용 카드 — 썸네일, 배지, 요약, 운영시간. `/service/[slug]`로 링크 |
| `ServiceDetail.tsx` | 상세 페이지 본문 — 배지, 이미지 갤러리, 설명, 정보 표(`dl`), 바로가기 버튼(`trackOutboundClick` 호출), `ShareButton`/`ReportButton` |
| `ReportButton.tsx` | `'use client'` — "정보가 틀렸어요" 버튼. `Sheet`(하단 시트)에 신고 사유 라디오 + 상세 textarea, `app/service/[slug]/actions.ts`의 `submitReport` 서버 액션을 `useActionState`로 호출. 사유 옵션/길이 제한은 `lib/report-constants.ts`에서 가져옴(DB 의존 없는 순수 상수라 클라이언트에서 안전하게 import 가능) |
| `CategoryNav.tsx` | 홈에서 카테고리 카드 그리드 |
| `SearchBar.tsx` | `'use client'`, Fuse.js 기반 실시간 검색 드롭다운 (`lib/search.ts`) |
| `FilterBar.tsx` | `'use client'`, URL 쿼리 파라미터(`free`, `hours24`) 토글 필터 |
| `Disclaimer.tsx` | 건강/법률 카테고리 상세 페이지에 표시하는 법적 고지 배너 |
| `AdSlot.tsx` | 애드센스 승인 전 자리표시자 — 승인 후 실제 광고 스크립트로 교체 예정 |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `layout/` | `Header`, `Footer` — 루트 레이아웃 전용 (see `layout/AGENTS.md`) |
| `ui/` | shadcn/ui 생성 프리미티브 — badge, button, card, input, sheet (see `ui/AGENTS.md`) |
| `board/` | 게시판(사이트/서비스 추가 요청·자유게시판·신고) UI — `BoardIndexCards`(인덱스 카드 3종), `BoardPostList`(목록+페이지네이션), `BoardPostForm`(`'use client'`, 글쓰기 폼), `BoardPostDetail`(상세). 전부 `site`(`'main'`\|`'discover'`)와 `basePath`(`/board` 또는 `/discover/board`)를 prop으로 받아 `(main)/board`·`(discover)/discover/board` 양쪽에서 그대로 재사용 — `data-theme='discover'` CSS 변수 스코프 덕분에 컴포넌트를 나누지 않고도 테마가 자동으로 바뀐다 |

## For AI Agents

### Working In This Directory
- 서버/클라이언트 경계에 주의: `SearchBar`, `FilterBar`, `ReportButton`, `board/BoardPostForm`은 `'use client'`가 필요(각각 상태·URL 훅·`useActionState` 사용)하지만, `ServiceCard`, `CategoryNav`, `Disclaimer`, `AdSlot`, `board/BoardIndexCards`, `board/BoardPostList`, `board/BoardPostDetail`은 서버 컴포넌트로 유지 가능하다. 새 컴포넌트를 만들 때 불필요하게 `'use client'`를 붙이지 않는다.
- `'use client'` 컴포넌트에서 `lib/db.ts`, `lib/reports.ts`, `lib/board.ts`, `lib/board-submit.ts`를 직접 import하지 말 것 — `@neondatabase/serverless`가 브라우저 번들에 끼어든다. `ReportButton.tsx`/`board/BoardPostForm.tsx`처럼 DB 호출은 서버 액션(`app/service/[slug]/actions.ts`, `app/(main)/board/actions.ts`, `app/(discover)/discover/board/actions.ts`)에 맡기고, 클라이언트는 공유 상수/타입(`lib/report-constants.ts`, `lib/board-constants.ts`, `types/board.ts`)만 가져온다.
- `board/*` 공유 컴포넌트에 새 링크를 추가할 때는 절대 절대경로(`/board/...`)를 하드코딩하지 말고 반드시 받은 `basePath` prop을 통해서만 만든다 — `(main)`과 `(discover)`는 상호 링크를 걸지 않기로 한 원칙이 있고(`app/AGENTS.md` 참고), 하드코딩하면 discover 쪽에서 렌더링될 때 메인 사이트로 새 나가 풀 페이지 리로드가 발생한다.
- `AdSlot.tsx`은 애드센스 승인 전 임시 플레이스홀더임을 주석으로 명시하고 있다 — 승인 후 실제 스크립트 삽입이 예정된 작업이므로, 지금 단계에서 광고 로직을 채워 넣지 않는다.
- 아이콘은 `lucide-react`, 클래스 조합은 `cn()`(`lib/utils.ts`) 사용.

### Testing Requirements
- 자동 테스트 없음. 컴포넌트 변경 시 해당 컴포넌트를 사용하는 페이지를 `npm run dev`로 직접 확인 (예: `ServiceCard` 변경 → 홈/카테고리 페이지 확인).

### Common Patterns
- 카드류 컴포넌트는 `components/ui/card`(`Card`, `CardHeader`, `CardContent`)를 조합해서 만든다.
- 외부 링크 클릭 트래킹은 `lib/track.ts`의 `trackOutboundClick`을 `onClick`에서 호출하는 패턴(`ServiceDetail.tsx` 참고).

## Dependencies

### Internal
- `components/ui/*`, `lib/services.ts`, `lib/search.ts`, `lib/track.ts`, `lib/utils.ts`, `types/service.ts`, `lib/board-constants.ts`, `types/board.ts`

### External
- `lucide-react`, `clsx`, `tailwind-merge`, `next/image`, `next/link`

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
