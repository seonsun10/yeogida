<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-07-26 -->

# service/[slug]

## Purpose
서비스 1건의 상세 정보를 보여주는 공개 페이지. 건강/법률 카테고리는 전문가 상담 대체 불가 고지(`Disclaimer`)를 표시한다.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | `generateStaticParams`로 전 서비스 SSG, `generateMetadata`로 OG 이미지(썸네일 우선, 없으면 첫 이미지) 포함 메타데이터 생성, `DISCLAIMER_CATEGORIES = ['health', 'legal-admin']`일 때 `Disclaimer` 렌더링 |

## For AI Agents

### Working In This Directory
- `DISCLAIMER_CATEGORIES` 목록에 새 카테고리(예: 새로운 전문 상담 분야)를 추가할지는 법률/의료적 민감도를 고려해 판단한다 — 이 목록은 법적 고지 표시 여부를 결정하므로 임의로 축소하지 않는다.
- `params`는 `Promise` — `await` 필수.

## Dependencies

### Internal
- `components/AdSlot`, `components/Disclaimer`, `components/ServiceDetail`
- `lib/services.ts` (`getAllServices`, `getServiceBySlug`)

<!-- MANUAL: -->
