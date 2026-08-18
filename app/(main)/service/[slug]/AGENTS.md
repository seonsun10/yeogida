<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-08-13 -->

# service/[slug]

## Purpose
서비스 1건의 상세 정보를 보여주는 공개 페이지. 건강/법률 카테고리는 전문가 상담 대체 불가 고지(`Disclaimer`)를 표시한다.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | `generateStaticParams`로 전 서비스 SSG, `generateMetadata`로 OG 이미지(썸네일 우선, 없으면 첫 이미지) 포함 메타데이터 생성, `DISCLAIMER_CATEGORIES = ['health', 'legal-admin']`일 때 `Disclaimer` 렌더링 |
| `actions.ts` | `'use server'` — 공개(비로그인) 방문자용 `submitReport`. `app/admin/actions.ts`와 분리된 이유: `ensureAdmin()`이 `NODE_ENV==='development'`에서만 통과하는데, 신고 제출은 프로덕션 방문자가 호출해야 하므로 같은 파일에 두면 안 됨. `serviceSlug`는 클라이언트 바인딩 값이라 신뢰하지 않고 `getServiceBySlug`로 존재 여부를 검증하고, `reason`은 `REPORT_REASON_OPTIONS` 화이트리스트로 검증한다. `getClientIp()`가 `next/headers`의 `headers()`로 `x-forwarded-for`/`x-real-ip`를 읽어 IP를 얻고, `hasRecentReportFromIp`로 같은 서비스에 24시간 내 같은 IP 신고가 있었는지 확인해 있으면 insert 전에 차단 (`lib/reports.ts` 참고). DB 오류는 500을 던지지 않고 `{ error }`로 잡아 반환 |

## For AI Agents

### Working In This Directory
- `DISCLAIMER_CATEGORIES` 목록에 새 카테고리(예: 새로운 전문 상담 분야)를 추가할지는 법률/의료적 민감도를 고려해 판단한다 — 이 목록은 법적 고지 표시 여부를 결정하므로 임의로 축소하지 않는다.
- `params`는 `Promise` — `await` 필수.
- `actions.ts`는 인증 없는 공개 엔드포인트다. 새 필드를 추가할 때도 서버 액션 안에서 반드시 길이 제한/화이트리스트 검증을 거칠 것 — 클라이언트(`components/ReportButton.tsx`)의 검증은 UX용일 뿐 신뢰할 수 없다.

## Dependencies

### Internal
- `components/AdSlot`, `components/Disclaimer`, `components/ServiceDetail`(`ReportButton` 포함)
- `lib/services.ts` (`getAllServices`, `getServiceBySlug`)
- `lib/reports.ts` (`createReport`), `lib/report-constants.ts`

<!-- MANUAL: -->
