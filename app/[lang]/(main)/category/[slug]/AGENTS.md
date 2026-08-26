<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-07-26 -->

# category/[slug]

## Purpose
카테고리 하나에 속한 서비스 목록을 카드 그리드로 보여주고, 쿼리 파라미터 기반 필터(`free=1`, `hours24=1`)를 적용한다. 존재하지 않는 카테고리는 `notFound()`.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | `generateStaticParams`로 전 카테고리 SSG, `generateMetadata`로 카테고리명/설명을 title/description에 반영, 목록을 `IN_FEED_AD_INTERVAL`(6개)마다 `AdSlot` 삽입 |

## For AI Agents

### Working In This Directory
- `params`, `searchParams` 모두 `Promise` — `await` 필수.
- 필터는 `lib/services.ts`의 `filterServices`를 순차 적용하는 방식(`free` → `hours24`)이다. 필터를 추가할 때도 이 체이닝 패턴을 따른다.
- 새 카테고리를 추가하려면 `data/categories.json`에 항목을 추가하면 `generateStaticParams`가 자동으로 인식한다.

### Testing Requirements
- `npm run dev` → `/category/<slug>?free=1&hours24=1` 조합으로 필터 동작 확인.

## Dependencies

### Internal
- `components/AdSlot`, `components/FilterBar`, `components/ServiceCard`
- `lib/services.ts` (`filterServices`, `getAllCategories`, `getCategoryBySlug`, `getServicesByCategory`)

<!-- MANUAL: -->
