<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-07-27 -->

# submit

## Purpose
서비스 제보 안내 페이지. 폼이나 API 없이 `NEXT_PUBLIC_SUBMIT_EMAIL` 환경변수에 설정된 이메일 주소를 노출해, 제보자가 직접 메일 클라이언트로 보내도록 한다.

## Key Files
| File | Description |
|------|-------------|
| `page.tsx` | 서버 컴포넌트. `NEXT_PUBLIC_SUBMIT_EMAIL`이 없으면 안내 문구만 표시하고, 있으면 `mailto:` 링크로 이메일을 노출 |

## For AI Agents

### Working In This Directory
- 과거에는 클라이언트 폼 + `app/api/submit/route.ts`(Resend 발송)로 구현했으나, 별도 이메일 발송 인프라 없이 사용자가 직접 메일을 보내는 방식으로 단순화했다. 폼/API를 다시 추가하지 말 것 — 의도된 변경이다.
- 이메일 주소는 `.env.local`의 `NEXT_PUBLIC_SUBMIT_EMAIL`로 설정한다 (`NEXT_PUBLIC_` 접두사이므로 클라이언트에도 노출됨 — 공개해도 되는 주소만 넣을 것).

## Dependencies

### Internal
- 없음 (외부 컴포넌트/API 의존 없음)

<!-- MANUAL: -->
