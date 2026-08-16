<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-08-13 -->

# types

## Purpose
프로젝트 전역에서 공유하는 TypeScript 타입 정의. 콘텐츠(services/categories)는 DB 스키마 없이 JSON으로만 존재하므로, `service.ts`가 사실상 콘텐츠의 스키마 역할을 한다. `report.ts`는 Neon Postgres `reports` 테이블(사용자 상호작용 데이터)의 애플리케이션 레벨 스키마다.

## Key Files
| File | Description |
|------|-------------|
| `service.ts` | `Service` 타입(`id`, `slug`, `name`, `summary`, `description`, `categorySlug`, `tags`, `thumbnail`, `images`, `url`, `hours`, `cost: 'free' \| 'paid'`, `badges`, `source`, `affiliate`, `lastVerified`)과 `Category` 타입(`slug`, `name`, `description`) |
| `report.ts` | `Report` 타입(`id`, `serviceSlug`, `reason`, `detail`, `status`, `createdAt`)과 `ReportStatus`(`'pending' \| 'resolved' \| 'dismissed'`) — `lib/reports.ts`가 Neon 쿼리 결과를 이 타입으로 매핑해서 반환 |

## For AI Agents

### Working In This Directory
- **이 타입을 바꾸면 `data/*.json`의 모든 항목, `lib/services.ts`, `app/admin/actions.ts`(폼 필드 파싱), `app/admin/ServiceForm.tsx`(입력 필드)를 함께 갱신해야 한다** — 이 프로젝트엔 스키마 검증(zod 등)이 없으므로 타입과 실제 JSON 데이터의 불일치는 런타임에야 드러난다.
- 필드를 추가할 때 optional(`?`)로 할지 필수로 할지는 `data/services.json`의 기존 항목 전체에 그 필드를 채울 수 있는지에 따라 결정한다.

## Dependencies

### Internal
- 이 타입은 `lib/`, `components/`, `app/` 전역에서 import됨 — 사실상 프로젝트 전체가 이 파일의 소비자다.

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
