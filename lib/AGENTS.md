<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-07-26 -->

# lib

## Purpose
`data/` JSON 파일에 대한 유일한 접근 경로(읽기/쓰기)와 검색, 트래킹, 클래스 유틸 등 도메인 로직을 모은다. 컴포넌트/페이지는 `data/*.json`을 직접 import하지 않고 이 디렉토리의 함수를 통해서만 콘텐츠에 접근해야 한다.

## Key Files
| File | Description |
|------|-------------|
| `services.ts` | 공개 조회 API — `getAllCategories`, `getCategoryBySlug`(동기, `categories.json` 직접 import), `getAllServices`/`getServicesByCategory`/`getServiceBySlug`(비동기, `admin-data.ts` 경유), `filterServices`(`cost`/`badge` 필터) |
| `admin-data.ts` | `services.json`을 `fs/promises`로 읽는 저수준 함수 — `SERVICES_PATH` 상수, `readServices`, `readServiceBySlug`. **읽기 전용** |
| `admin-write.ts` | `writeServices` — Prettier로 포맷팅 후 `services.json`에 씀. `/admin` 서버 액션(`app/admin/actions.ts`)에서만 호출됨 |
| `search.ts` | Fuse.js 검색 인덱스 생성(`createServiceSearchIndex`) 및 `searchServices` — name(0.5)/summary(0.3)/tags(0.2) 가중치, threshold 0.35 |
| `track.ts` | `trackOutboundClick` — `window.gtag`가 있으면 GA 이벤트(`outbound_click`) 전송, SSR 환경에서는 안전하게 no-op |
| `utils.ts` | `cn()` — `clsx` + `tailwind-merge` 조합 |

## For AI Agents

### Working In This Directory
- `admin-data.ts`(읽기)와 `admin-write.ts`(쓰기)가 분리되어 있는 이유는 파일 쓰기 권한이 필요한 코드 경로를 명확히 구분하기 위함이다 — 새 읽기 전용 헬퍼는 `admin-data.ts`(또는 `services.ts`)에, 쓰기 로직은 `admin-write.ts`에 추가한다.
- `services.ts`의 함수들은 모두 서버 환경(Node.js `fs`)에 의존하므로 클라이언트 컴포넌트에서 직접 호출할 수 없다 — 클라이언트에서 필요하면 서버 컴포넌트/서버 액션에서 데이터를 받아 props로 내려준다(`SearchBar`가 `services` 배열을 서버에서 받는 패턴 참고).
- `search.ts`의 검색 가중치/threshold를 바꾸면 홈 검색창(`SearchBar`) 체감 품질에 직접 영향을 준다 — 변경 시 실제 검색어로 테스트할 것.

### Testing Requirements
- 자동 테스트 없음. `getAllServices`/`filterServices` 등 순수 로직을 바꾸면 해당 함수를 사용하는 페이지(홈, 카테고리, 서비스 상세)를 `npm run dev`로 확인.

## Dependencies

### Internal
- `data/categories.json`, `data/services.json`
- `types/service.ts`

### External
- `fuse.js`, `prettier`(프로그래매틱 API), `clsx`, `tailwind-merge`, Node `fs/promises`/`path`

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
