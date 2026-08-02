<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-08-02 -->

# scripts

## Purpose
Next.js 앱 실행 경로 밖에서, `.github/workflows/`의 GitHub Actions가 호출하는 유지보수 스크립트 모음.

## Key Files
| File | Description |
|------|-------------|
| `check-links.mjs` | `data/services.json`의 모든 `url`에 요청을 보내 생존 여부를 점검하고, 문제(끊김/확인필요)가 있으면 GitHub 이슈를 생성·갱신한다. `.github/workflows/check-links.yml`이 매주 월요일 자동 실행하며, `npm run check-links`로 로컬 실행도 가능하다(이 경우 `GITHUB_TOKEN`이 없어 콘솔 출력만 하고 이슈 작업은 생략됨). |

## For AI Agents

### Working In This Directory
- Next.js 빌드/런타임과 무관한 독립 Node 스크립트다. `app/`, `lib/`의 서버 컴포넌트 관례(App Router, `'use client'` 등)는 적용되지 않는다.
- `check-links.mjs`는 국내 공공기관 사이트가 흔히 쓰는 legacy SSL 재협상을 허용하기 위해 전역 `fetch` 대신 `undici`의 커스텀 `Agent`를 명시적으로 사용한다 — 이 부분을 표준 `fetch`로 되돌리면 해당 사이트들이 다시 오탐(false positive)으로 잡힌다.
- GitHub 이슈 본문 끝에 `<!-- link-check-slugs: [...] -->` 형태의 숨은 마커를 남겨, 다음 실행 때 "새로 생긴 문제"만 골라 코멘트(=알림 발생)하고 나머지는 조용히 본문만 갱신한다. 이 마커를 지우거나 형식을 바꾸면 매번 전체가 "신규 문제"로 취급되어 알림이 과도하게 발생한다.
- `lastVerified`(서비스 데이터 필드, 사람이 내용까지 확인한 날짜)는 이 스크립트가 건드리지 않는다 — URL 응답 여부만으로 자동 덮어쓰면 의미가 왜곡되기 때문. 링크 문제 발견 시 실제 수정은 `/admin`에서 사람이 수동으로 한다.

### Testing Requirements
- `node --check scripts/check-links.mjs`로 문법 확인, `npm run lint`로 확인.
- 전체 100여 건 URL을 실제로 훑는 흐름은 로컬에서 전부 검증하기 어렵다(느림, 샌드박스 환경에 따라 대량 외부 요청이 제한될 수 있음) — 워크플로우 변경 후에는 GitHub Actions 탭에서 `workflow_dispatch`로 수동 1회 실행해 이슈 생성/갱신까지 확인하는 것을 권장한다.

## Dependencies

### External
- **undici** — legacy TLS 재협상 허용 옵션을 쓰기 위해 devDependency로 명시 설치 (전역 `fetch`가 내부적으로 쓰는 것과 별개로 직접 import)

<!-- MANUAL: -->
