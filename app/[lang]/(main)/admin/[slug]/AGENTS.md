<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-07-26 -->

# admin/[slug]

## Purpose
특정 서비스 1건을 수정하는 관리자 페이지. 기본 정보 수정 폼, 썸네일 관리, 상세 이미지 관리, 삭제를 한 화면에서 처리한다.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | `readServiceBySlug`로 서비스 로드(없으면 `notFound()`), `ServiceForm`(수정 모드) + `ThumbnailUploadForm` + `ImageUploadForm` + `DeleteServiceButton` 조합 |

## For AI Agents

### Working In This Directory
- `params`는 `Promise<{ slug: string }>` — 반드시 `await params`.
- 이 페이지는 `../actions.ts`, `../ServiceForm`, `../ImageUploadForm`, `../ThumbnailUploadForm`, `../DeleteServiceButton`를 상대 경로로 import한다. 형제 컴포넌트를 옮기면 이 import들도 함께 수정해야 한다.
- 썸네일/이미지 삭제 폼은 `deleteServiceThumbnail.bind(null, slug)` / `deleteServiceImage.bind(null, slug, image)`처럼 인라인 `<form action={...}>`으로 직접 바인딩한다 (별도 컴포넌트화되어 있지 않음).

### Testing Requirements
- `npm run dev` → `/admin/<기존 slug>`에서 수정 저장, 썸네일/이미지 업로드·삭제가 정상 반영되는지 확인.

## Dependencies

### Internal
- `../actions.ts`, `../ServiceForm.tsx`, `../ImageUploadForm.tsx`, `../ThumbnailUploadForm.tsx`, `../DeleteServiceButton.tsx`
- `lib/admin-data.ts` (`readServiceBySlug`), `lib/services.ts` (`getAllCategories`)

<!-- MANUAL: -->
