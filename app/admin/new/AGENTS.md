<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-07-26 -->

# admin/new

## Purpose
신규 서비스 등록 페이지. `ServiceForm`을 create 모드로 렌더링하고 `createService` 서버 액션을 연결한다.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | 카테고리 목록을 불러와 `ServiceForm mode="create"`에 전달, 성공 시 `../actions.ts`의 `createService`가 `/admin/[slug]`로 리다이렉트 |

## For AI Agents

### Working In This Directory
- 이 페이지는 Server Component이며 `params`가 없다 (동적 라우트 아님).
- 슬러그 중복/형식 검증은 `../actions.ts`의 `createService` 내부에서 이루어지므로 이 파일에는 검증 로직을 추가하지 않는다.

## Dependencies

### Internal
- `../actions.ts` (`createService`), `../ServiceForm.tsx`
- `lib/services.ts` (`getAllCategories`)

<!-- MANUAL: -->
