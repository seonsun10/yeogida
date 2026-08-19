<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-08-13 -->

# lib

## Purpose
`data/` JSON 파일(콘텐츠)에 대한 유일한 접근 경로(읽기/쓰기)와 검색, 트래킹, 클래스 유틸 등 도메인 로직을 모은다. 컴포넌트/페이지는 `data/*.json`을 직접 import하지 않고 이 디렉토리의 함수를 통해서만 콘텐츠에 접근해야 한다. **사용자 상호작용 데이터(신고, 게시판 글 등)는 JSON이 아니라 Neon Postgres에 저장하며, 이 디렉토리의 `db.ts`/`reports.ts`/`board.ts`가 그 접근 경로다.**

## Key Files
| File | Description |
|------|-------------|
| `services.ts` | 공개 조회 API — `getAllCategories`, `getCategoryBySlug`(동기, `categories.json` 직접 import), `getAllServices`/`getServicesByCategory`/`getServiceBySlug`(비동기, `admin-data.ts` 경유), `filterServices`(`cost`/`badge` 필터) |
| `admin-data.ts` | `services.json`을 `fs/promises`로 읽는 저수준 함수 — `SERVICES_PATH` 상수, `readServices`, `readServiceBySlug`. **읽기 전용** |
| `admin-write.ts` | `writeServices` — Prettier로 포맷팅 후 `services.json`에 씀. `/admin` 서버 액션(`app/admin/actions.ts`)에서만 호출됨 |
| `search.ts` | Fuse.js 검색 인덱스 생성(`createServiceSearchIndex`) 및 `searchServices` — name(0.5)/summary(0.3)/tags(0.2) 가중치, threshold 0.35 |
| `track.ts` | `trackOutboundClick` — `window.gtag`가 있으면 GA 이벤트(`outbound_click`) 전송, SSR 환경에서는 안전하게 no-op |
| `utils.ts` | `cn()` — `clsx` + `tailwind-merge` 조합 |
| `db.ts` | Neon Postgres 클라이언트. `getDb()` — **lazy initialization** 패턴(`DATABASE_URL` 없으면 호출 시점에 에러를 던짐, 모듈 최상위에서 `neon()`을 호출하지 않음 — 빌드 타임에 env var가 없어도 크래시하지 않게 하기 위함). 서버 전용, 클라이언트 컴포넌트에서 import 금지 |
| `reports.ts` | "잘못된 정보 신고" 기능의 DB 접근 계층 — `createReport`/`getAllReports`/`updateReportStatus`/`hasRecentReportFromIp`(IP+서비스 기준 최근 `REPORT_RATE_LIMIT_HOURS`시간 내 중복 신고 여부 확인, `submitReport`가 insert 전에 호출). `getDb()`로 얻은 client의 태그드 템플릿(`` sql\`...\` ``)으로 자동 파라미터화된 쿼리만 사용 — 문자열 concat 금지. 테이블 1개·쿼리 규모라 ORM(Drizzle 등) 없이 raw SQL로 충분하다고 판단해 도입 안 함. 서버 전용. `reporter_ip`는 남용 방지용 내부 필드라 `Report` 타입/`mapRow`에는 노출하지 않음(관리자 UI에 표시 안 함) |
| `report-constants.ts` | 신고 사유 옵션(`REPORT_REASON_OPTIONS`), 길이 제한(`REPORT_REASON_MAX_LENGTH`/`REPORT_DETAIL_MAX_LENGTH`), 중복 신고 차단 기간(`REPORT_RATE_LIMIT_HOURS`, 기본 24) — `reports.ts`(서버)와 `components/ReportButton.tsx`(클라이언트) 양쪽에서 공유. **DB 의존성이 없는 순수 상수 파일**이라 클라이언트 컴포넌트에서도 안전하게 import 가능 — 이 경계 때문에 `reports.ts`와 분리되어 있다 |
| `board.ts` | 게시판(사이트/서비스 추가 요청·자유게시판·신고) DB 접근 계층 — `createBoardPost`(반환값은 `RETURNING id`로 받은 새 글 id, 서버 액션이 등록 직후 상세페이지로 `redirect`하는 데 씀)/`hasReachedPostRateLimit`(IP 기준 최근 `BOARD_POST_RATE_LIMIT_HOURS`시간 내 게시글 수가 `BOARD_POST_RATE_LIMIT_COUNT` 이상인지 `LIMIT`으로만 확인 — `count(*)`를 안 쓰는 이유는 neon 드라이버가 bigint 집계값을 문자열로 반환해 숫자 비교가 조용히 틀릴 수 있어서)/`getBoardPosts`(페이지네이션, `LIMIT pageSize+1`로 `hasMore` 판단해 별도 COUNT 쿼리 없이 처리)/`getBoardPostById`/`getAllBoardPostsForAdmin`/`updateBoardPostStatus`/`deleteBoardPost`. `reports.ts`와 동일하게 raw SQL 태그드 템플릿만 사용, 테이블 1개(`board_posts`)로 `site`/`board` 컬럼을 구분값으로 써서 여러 게시판을 나눠 관리(테이블을 board마다 늘리지 않음). 서버 전용 |
| `board-submit.ts` | `submitBoardPost(site, board, authorIp, formData)` — 게시글 등록의 검증+요청 제한 확인+insert를 한 번에 처리하는 공용 함수. `(main)/board/actions.ts`와 `(discover)/discover/board/actions.ts` 양쪽의 서버 액션이 이 함수를 감싸서 쓴다(사이트별로 다른 건 `site` 인자와 `redirect` 경로뿐). **`next/headers` 등 라우팅 계층 의존성을 갖지 않는다** — `authorIp`는 호출자(각 라우트의 `getClientIp`)가 구해서 넘긴다. `redirect()`는 이 함수 밖(각 라우트 액션)에서 호출해야 한다 — 이 함수 내부의 `try/catch`가 Next.js의 `NEXT_REDIRECT` throw를 삼켜버리기 때문 |
| `board-constants.ts` | 게시판 타입(`BOARD_TYPES`), 길이 제한, 요청 제한(`BOARD_POST_RATE_LIMIT_COUNT`=3/`BOARD_POST_RATE_LIMIT_HOURS`=1, IP당 전체 게시판·사이트 합산 기준), 사이트별/게시판별 제목·설명·CTA 문구(`BOARD_LABELS`), 목록에 상태 배지를 보여줄지 여부(`BOARD_SHOWS_STATUS`, 자유게시판은 숨김) — `board.ts`/`board-submit.ts`(서버)와 `components/board/*`(클라이언트 포함) 양쪽에서 공유. **DB 의존성이 없는 순수 상수 파일**이라 클라이언트 컴포넌트에서도 안전 |

## For AI Agents

### Working In This Directory
- `admin-data.ts`(읽기)와 `admin-write.ts`(쓰기)가 분리되어 있는 이유는 파일 쓰기 권한이 필요한 코드 경로를 명확히 구분하기 위함이다 — 새 읽기 전용 헬퍼는 `admin-data.ts`(또는 `services.ts`)에, 쓰기 로직은 `admin-write.ts`에 추가한다.
- `services.ts`의 함수들은 모두 서버 환경(Node.js `fs`)에 의존하므로 클라이언트 컴포넌트에서 직접 호출할 수 없다 — 클라이언트에서 필요하면 서버 컴포넌트/서버 액션에서 데이터를 받아 props로 내려준다(`SearchBar`가 `services` 배열을 서버에서 받는 패턴 참고).
- `search.ts`의 검색 가중치/threshold를 바꾸면 홈 검색창(`SearchBar`) 체감 품질에 직접 영향을 준다 — 변경 시 실제 검색어로 테스트할 것.
- `db.ts`/`reports.ts`는 `@neondatabase/serverless`를 import하므로 **절대 `'use client'` 컴포넌트에서 직접 import하지 말 것** — 브라우저 번들에 서버 전용 코드가 끼어들거나 빌드가 깨진다. 클라이언트에서 신고 사유 목록 등 상수만 필요하면 `report-constants.ts`를 쓴다.
- Neon 드라이버는 `timestamptz` 컬럼을 JS `Date` 객체로 파싱해서 반환한다 — `reports.ts`의 `ReportRow.created_at`은 `string | Date`로 타입을 잡고 `mapRow`에서 `new Date(...).toISOString()`으로 명시적으로 정규화한다. 새 테이블/컬럼을 추가할 때도 동일하게 처리할 것(타입을 `string`이라고 그냥 우기지 말 것) — `board.ts`의 `BoardPostRow`도 동일 패턴.
- `board.ts`/`board-submit.ts`도 `db.ts`와 마찬가지로 `@neondatabase/serverless`에 (간접) 의존하므로 클라이언트 컴포넌트에서 직접 import 금지 — 클라이언트(`components/board/*`)는 `board-constants.ts`의 상수와 `types/board.ts`의 타입만 가져온다.

### Testing Requirements
- 자동 테스트 없음. `getAllServices`/`filterServices` 등 순수 로직을 바꾸면 해당 함수를 사용하는 페이지(홈, 카테고리, 서비스 상세)를 `npm run dev`로 확인.
- `reports.ts`/`board.ts`는 Neon DB가 실제로 연결돼 있어야 동작을 검증할 수 있다(`DATABASE_URL` 필요, `npm run db:init`으로 테이블 생성). DB 미연결 상태에서는 `getDb()`가 명시적 에러를 던지고 `/admin/reports`·`/admin/board`와 신고/게시글 제출 폼 모두 이를 잡아 사용자에게 안내 문구를 보여준다 — 이 fallback 경로도 회귀 확인 대상. 게시판 요청 제한(IP당 1시간 3건)을 브라우저로 직접 확인할 때는 로컬 개발 환경에서 `getClientIp()`가 매번 `'unknown'`을 반환해 모든 테스트 등록이 한 버킷에 몰린다는 점을 감안할 것(정상 동작, 버그 아님).

## Dependencies

### Internal
- `data/categories.json`, `data/services.json`
- `types/service.ts`, `types/report.ts`, `types/board.ts`

### External
- `fuse.js`, `prettier`(프로그래매틱 API), `clsx`, `tailwind-merge`, Node `fs/promises`/`path`
- `@neondatabase/serverless` — Neon Postgres 서버리스 드라이버 (`db.ts`)

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
