<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-07-26 -->

# components/layout

## Purpose
사이트 전체에 공통으로 표시되는 헤더/푸터. `app/layout.tsx`에서만 사용된다.

## Key Files
| File | Description |
|------|-------------|
| `Header.tsx` | 로고("여기다") + `getAllCategories()` 기반 카테고리 네비게이션 |
| `Footer.tsx` | 정보 제공 목적 고지 문구, `/submit`·`/privacy`·`/terms` 링크, 저작권 표시, 마지막 링크 점검일 표시 |

## For AI Agents

### Working In This Directory
- `Header`는 서버 컴포넌트에서 `getAllCategories()`를 직접 호출한다 — 카테고리가 늘어나도 이 컴포넌트 코드는 수정할 필요 없이 `data/categories.json`만 바뀌면 된다.
- `Footer`도 async 서버 컴포넌트로, `getLinkCheckStatus()`가 `data/link-check-status.json`을 읽어 "마지막 전체 링크 점검" 문구를 표시한다. 파일이 없으면(로컬 최초 클론 등) 조용히 해당 줄만 생략된다.
- 헤더/푸터는 전 페이지에 렌더링되므로 여기 변경은 사이트 전체 시각적 영향을 준다. 변경 후 여러 페이지를 확인할 것.

## Dependencies

### Internal
- `lib/services.ts` (`getAllCategories`), `lib/link-check-status.ts` (`getLinkCheckStatus`)

<!-- MANUAL: -->
