<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-08-13 -->

# admin

## Purpose
로컬 개발 환경에서만 열리는 콘텐츠 관리 화면. 콘텐츠(services/categories)는 DB 없이 `data/services.json`을 직접 읽고 쓰며, 서비스 등록/수정/삭제, 이미지·썸네일 업로드/삭제 기능을 제공한다. `reports/`는 예외적으로 Neon Postgres(`lib/reports.ts`)를 읽는다 — 사용자 상호작용 데이터라 JSON에 없기 때문. `layout.tsx`에서 `NODE_ENV !== 'development'`이면 `notFound()`를 호출해 프로덕션에서는 완전히 비활성화된다.

## Key Files
| File | Description |
|------|-------------|
| `layout.tsx` | 관리자 레이아웃 — 프로덕션 접근 차단, 상단 네비게이션("사이트 관리" / "신고 관리" / "카테고리 색상" / "공개 사이트로 이동") |
| `page.tsx` | 등록된 서비스 목록 테이블 (이름/카테고리/비용/이미지 수 + 수정 링크) |
| `actions.ts` | 모든 Server Actions — `createService`, `updateService`, `deleteService`, `uploadServiceImages`, `deleteServiceImage`, `uploadServiceThumbnail`, `deleteServiceThumbnail`, `resolveReport`, `dismissReport`. 각 함수 최상단에서 `ensureAdmin()` 호출 |
| `ServiceForm.tsx` | 생성/수정 공용 폼 (`'use client'`, `useActionState`로 서버 액션 결과 표시) |
| `ImageUploadForm.tsx` | 상세페이지 이미지 다중 업로드 폼 (클라이언트 측 5MB/장, 20MB 합계 검증 후 서버 액션 호출) |
| `ThumbnailUploadForm.tsx` | 목록/카드용 썸네일 단일 업로드 폼 (클라이언트 측 5MB 검증) |
| `DeleteServiceButton.tsx` | 삭제 버튼, `confirm()`으로 브라우저 확인 후 서버 액션 호출 |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `[slug]/` | 특정 서비스 수정 페이지 (see `[slug]/AGENTS.md`) |
| `new/` | 신규 서비스 등록 페이지 (see `new/AGENTS.md`) |
| `reports/` | "잘못된 정보 신고" 목록 (`page.tsx`, `lib/reports.ts`의 `getAllReports()` 호출). `export const dynamic = 'force-dynamic'`로 캐시를 막는다 — 빼면 처리완료/반려 후에도 목록이 갱신되지 않을 수 있다. DB 조회 실패(예: `DATABASE_URL` 미설정) 시 500 대신 안내 문구를 보여주도록 try/catch로 감싸져 있다 |

## For AI Agents

### Working In This Directory
- **프로덕션 노출 금지가 최우선 규칙**이다. `ensureAdmin()` 체크를 우회하거나 제거하는 변경은 절대 하지 말 것 — 이 디렉토리 전체가 로컬 전용이라는 전제로 설계되어 있다.
- 이미지 업로드는 `public/uploads/<slug>/` 아래 슬러그별 디렉토리에 저장한다 (`actions.ts`의 `UPLOADS_DIR`, `saveImageFile`). 파일명은 `Date.now()` + 랜덤 문자열로 충돌을 방지한다.
- 이미지 삭제(`deleteServiceImage`)는 경로가 `/uploads/${slug}/`로 시작하고 `..`를 포함하지 않는지 검증한다 — path traversal 방지 로직이므로 유지할 것.
- 슬러그는 `SLUG_PATTERN` (`^[a-z0-9]+(?:-[a-z0-9]+)*$`)을 통과해야 하며 등록 후 수정 불가 (`ServiceForm`에서 edit 모드일 때 `slug` input `disabled`).
- 콘텐츠 변경 후 관련 페이지를 `revalidatePath`로 무효화해야 한다 (`/admin`, `/admin/[slug]`, `/`, `/service/[slug]`, `/category/[categorySlug]`) — 새 액션 추가 시 이 패턴을 따를 것.

### Testing Requirements
- 자동 테스트 없음. `npm run dev` 후 `/admin`에서 등록→수정→이미지 업로드→삭제 전체 플로우를 직접 확인.
- `NODE_ENV=production npm run build && npm run start` 후 `/admin` 접근 시 404가 뜨는지 확인하는 것이 회귀 방지에 중요하다.

### Common Patterns
- 모든 mutating 액션은 `'use server'` 파일(`actions.ts`) 안에 정의하고, 폼 컴포넌트에서 `useActionState` + `.bind(null, slug)`로 slug를 부분 적용한다.
- 폼 검증 실패 시 `{ error: string }`, 성공 시 `{ message: string }` 형태의 `ActionState`를 반환해 폼에서 조건부 렌더링.

## Dependencies

### Internal
- `lib/admin-data.ts` — `readServices`, `readServiceBySlug`
- `lib/admin-write.ts` — `writeServices` (Prettier 포맷 후 JSON 저장)
- `lib/services.ts` — `getAllCategories` (카테고리 select 옵션)
- `lib/reports.ts` — `getAllReports`, `updateReportStatus` (`reports/page.tsx`, `actions.ts`의 `resolveReport`/`dismissReport`)
- `types/service.ts` — `Service` 타입
- `types/report.ts` — `Report`, `ReportStatus` 타입

### External
- `next/cache`의 `revalidatePath`, `next/navigation`의 `redirect`/`notFound`

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
