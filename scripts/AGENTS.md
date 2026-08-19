<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-08-02 | Updated: 2026-08-13 -->

# scripts

## Purpose
Next.js 앱 실행 경로 밖에서 실행하는 유지보수/일회성 스크립트 모음. `check-links.mjs`는 `.github/workflows/`의 GitHub Actions가 정기 호출하고, `db-init.mjs`는 사람이 필요할 때 수동으로 1회 실행한다.

## Key Files
| File | Description |
|------|-------------|
| `check-links.mjs` | `data/services.json`의 모든 `url`에 요청을 보내 생존 여부를 점검하고, 문제(끊김/확인필요)가 있으면 GitHub 이슈를 생성·갱신한다. 매 실행마다(정상이어도) Discord 웹훅으로도 결과를 보내고, `data/link-check-status.json`에 점검 시각·건수 요약을 써서 사이트 푸터의 "마지막 전체 링크 점검" 표시에 쓴다. `.github/workflows/check-links.yml`이 매주 일요일 21시(KST) 자동 실행하며, `npm run check-links`로 로컬 실행도 가능하다(이 경우 `GITHUB_TOKEN`/`DISCORD_WEBHOOK_URL`이 없어 콘솔 출력만 하고 이슈·알림 작업은 생략되지만 상태 파일은 그대로 갱신됨). |
| `db-init.mjs` | Neon Postgres `reports`(사용자 상호작용 데이터 — "잘못된 정보 신고")와 `board_posts`(게시판 — 사이트/서비스 추가 요청·자유게시판·신고) 테이블을 생성/갱신하는 마이그레이션 스크립트. `npm run db:init`으로 실행하며, 내부적으로 `node --env-file=.env.local scripts/db-init.mjs`를 호출한다 — 일반 `node scripts/db-init.mjs`로 직접 실행하면 `.env.local`의 `DATABASE_URL`을 못 읽어 즉시 실패한다. `CREATE TABLE IF NOT EXISTS` + `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`(예: `reporter_ip`, IP 기반 중복 신고 차단용)라 여러 번 실행해도 안전 — 새 컬럼을 추가할 때는 `CREATE TABLE`의 컬럼 목록과 별도 `ALTER TABLE` 양쪽에 반영해야 신규 설치/기존 설치 모두 커버된다. `board_posts`는 여러 게시판을 테이블 하나로 관리하도록 `site`/`board` 구분 컬럼을 두는 방식을 택했다 — 새 게시판 종류를 추가할 때 테이블을 늘리지 말고 이 컬럼에 값을 추가하는 것으로 처리할 것. 스키마를 바꿀 일이 생기면(테이블이 늘어나면) 이 파일에 `ALTER TABLE`/새 `CREATE TABLE`을 추가하는 방식으로 계속 단일 진입점을 유지할 것 — Drizzle 등 마이그레이션 프레임워크는 이 프로젝트 규모(테이블 2개)에는 과함 |

## For AI Agents

### Working In This Directory
- Next.js 빌드/런타임과 무관한 독립 Node 스크립트다. `app/`, `lib/`의 서버 컴포넌트 관례(App Router, `'use client'` 등)는 적용되지 않는다.
- `check-links.mjs`는 국내 공공기관 사이트가 흔히 쓰는 legacy SSL 재협상을 허용하기 위해 전역 `fetch` 대신 `undici`의 커스텀 `Agent`를 명시적으로 사용한다 — 이 부분을 표준 `fetch`로 되돌리면 해당 사이트들이 다시 오탐(false positive)으로 잡힌다.
- GitHub 이슈 본문 끝에 `<!-- link-check-slugs: [...] -->` 형태의 숨은 마커를 남겨, 다음 실행 때 "새로 생긴 문제"만 골라 코멘트(=알림 발생)하고 나머지는 조용히 본문만 갱신한다. 이 마커를 지우거나 형식을 바꾸면 매번 전체가 "신규 문제"로 취급되어 알림이 과도하게 발생한다.
- `lastVerified`(서비스 데이터 필드, 사람이 내용까지 확인한 날짜)는 이 스크립트가 건드리지 않는다 — URL 응답 여부만으로 자동 덮어쓰면 의미가 왜곡되기 때문. 링크 문제 발견 시 실제 수정은 `/admin`에서 사람이 수동으로 한다.
- Discord 알림(`notifyDiscord`)은 `DISCORD_WEBHOOK_URL` secret이 있을 때만 동작하며, GitHub 이슈 로직과 독립적이다 — 이슈는 "문제가 새로 생겼을 때만" 알리는 지속형 트래커, Discord는 "매 실행마다" 결과를 알리는 즉시 알림이라 역할이 다르다. 메시지는 Discord 2000자 제한 때문에 1900자에서 자른다.
- `data/link-check-status.json`은 GitHub Actions 워크플로우(`.github/workflows/check-links.yml`)의 "점검 결과 커밋" 스텝이 `contents: write` 권한으로 매번 커밋·푸시한다 — 이 파일이 실제 배포(main 브랜치 push 트리거)에 반영되어야 사이트 푸터의 점검일 표시가 최신으로 갱신된다.

### Testing Requirements
- `node --check scripts/check-links.mjs`로 문법 확인, `npm run lint`로 확인.
- 전체 100여 건 URL을 실제로 훑는 흐름은 로컬에서 전부 검증하기 어렵다(느림, 샌드박스 환경에 따라 대량 외부 요청이 제한될 수 있음) — 워크플로우 변경 후에는 GitHub Actions 탭에서 `workflow_dispatch`로 수동 1회 실행해 이슈 생성/갱신까지 확인하는 것을 권장한다.

## Dependencies

### External
- **undici** — legacy TLS 재협상 허용 옵션을 쓰기 위해 devDependency로 명시 설치 (전역 `fetch`가 내부적으로 쓰는 것과 별개로 직접 import)
- **@neondatabase/serverless** — `db-init.mjs`가 `lib/db.ts`를 거치지 않고 직접 `neon()`을 호출 (Next.js 런타임 밖의 독립 스크립트라 lazy-init 래퍼가 필요 없음)

<!-- MANUAL: -->
