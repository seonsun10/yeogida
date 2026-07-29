<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-07-26 -->

# components/ui

## Purpose
`shadcn/ui` CLI로 생성된 프리미티브 컴포넌트. `components.json` 설정에 따라 관리되며, 컴포넌트 자체를 손으로 대폭 리팩터링하기보다 shadcn 컨벤션(variant/size via `class-variance-authority`, `cn()` 병합)을 유지한다.

## Key Files
| File | Description |
|------|-------------|
| `badge.tsx` | 배지 (서비스 태그·배지 표시용, `default`/`secondary`/`outline` 등 variant) |
| `button.tsx` | 버튼 + `buttonVariants` export (다른 곳에서 `<Link>`에 버튼 스타일 입힐 때 사용, 예: `admin/page.tsx`, `ServiceDetail.tsx`) |
| `card.tsx` | `Card`, `CardHeader`, `CardContent` 등 카드 프리미티브 |
| `input.tsx` | 텍스트 입력 |
| `sheet.tsx` | 사이드 시트/드로어 (base-ui 기반) |

## For AI Agents

### Working In This Directory
- 새 shadcn 컴포넌트가 필요하면 직접 손으로 작성하기보다 shadcn CLI로 추가하는 것이 컨벤션과 일치한다 (`components.json` 참고).
- 이 디렉토리의 컴포넌트는 여러 페이지/컴포넌트에서 광범위하게 재사용된다 — 여기서 스타일/동작을 바꾸면 사이트 전역에 영향을 준다.
- `buttonVariants`처럼 컴포넌트가 아닌 variant 함수를 export하는 패턴은 `<a>`/`<Link>`에 버튼 룩을 입히기 위한 것 — 실제 `<button>`이 필요 없는 곳에서 이 패턴을 유지한다.

## Dependencies

### External
- `class-variance-authority`, `@base-ui/react`(sheet), `clsx`, `tailwind-merge`

<!-- MANUAL: -->
