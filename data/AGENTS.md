<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-07-26 -->

# data

## Purpose
이 프로젝트의 **유일한 콘텐츠 저장소**. 별도 데이터베이스 없이 JSON 파일 두 개로 카테고리와 서비스 콘텐츠를 관리한다. 프로덕션에서는 읽기 전용으로 취급되고, 쓰기는 `/admin`(로컬 개발 전용, `lib/admin-write.ts`)을 통해서만 일어난다.

## Key Files
| File | Description |
|------|-------------|
| `categories.json` | 카테고리 정의 배열 — `Category` 타입(`slug`, `name`, `description`). 현재 6개: health, legal-admin, family, consumer, emergency, life-admin-tips |
| `services.json` | 서비스 콘텐츠 배열 — `Service` 타입 전체 필드. `/admin`에서 등록·수정 시 이 파일이 직접 갱신된다 |

## For AI Agents

### Working In This Directory
- **이 파일들을 직접 손으로 편집하지 말 것.** `services.json`은 `lib/admin-write.ts`의 `writeServices()`가 Prettier로 포맷팅하며 저장하므로, 수동 편집 시 포맷이 어긋나거나 `/admin` 통해 저장할 때 diff가 커질 수 있다. 콘텐츠를 늘리거나 고칠 때는 가능하면 `/admin` UI(로컬 개발 서버)를 사용한다.
- 정말 직접 편집해야 한다면(예: 대량 시드 데이터 추가) `Service` 타입(`types/service.ts`)의 모든 필드를 채우고, `slug`/`id`는 `^[a-z0-9]+(?:-[a-z0-9]+)*$` 패턴을 따르며 서로 유일해야 한다. `categorySlug`는 반드시 `categories.json`에 존재하는 slug여야 한다.
- `thumbnail`/`images` 경로는 `/uploads/<slug>/...` 형태로 `public/uploads/` 아래 실제 파일과 짝을 이뤄야 한다 — 파일 없이 경로만 추가하면 깨진 이미지가 된다.
- `lastVerified`는 `YYYY-MM-DD` 문자열이며 사이트맵의 `lastModified`로도 쓰인다(`app/sitemap.ts`).

### Testing Requirements
- JSON 수정 후 `npm run build` 또는 `npm run dev`로 파싱 오류(trailing comma, 따옴표 등)가 없는지 확인.

## Dependencies

### Internal
- `lib/admin-data.ts` (읽기), `lib/admin-write.ts` (쓰기), `lib/services.ts` (조회 헬퍼)
- `types/service.ts` (타입 정의 — 필드 추가/변경 시 이 파일과 반드시 동기화)

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
