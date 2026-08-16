# Neon Postgres 도입 계획

- 작성일: 2026-08-10 / 갱신일: 2026-08-14
- 상태: **"잘못된 정보 신고" 기능 로컬에서 end-to-end 검증 완료 (Neon 프로비저닝 + 신고 제출 → admin 처리완료/반려까지 확인). 남은 건 프로덕션 배포 확인뿐.**
- 관련 배경: 이 프로젝트는 콘텐츠(`data/services.json`, `data/categories.json`)를 DB 없이 JSON 파일 + git으로 관리한다(`AGENTS.md` 참고). 다만 사용자 상호작용성 동적 데이터(좋아요, 즐겨찾기, 신고, 평점 등)는 프로덕션 환경(Vercel)의 파일시스템이 읽기 전용이라 JSON 파일로는 구현이 불가능 — 이 문제를 풀기 위해 Neon Postgres를 하이브리드로 도입하기로 논의함.

## 왜 Neon인가

- 콘텐츠(services/categories)는 계속 JSON+git 유지 — 변경 빈도 낮고 git 이력 추적 가치가 있음.
- **사용자 상호작용 데이터만** DB로 분리하는 하이브리드 전략이 현재 구조를 가장 덜 깨는 전환 경로.
- Vercel Marketplace를 통해 자동으로 계정 프로비저닝 + 환경변수 주입되는 게 장점 (`vercel integration add neon` 또는 대시보드).

## 무료 티어로 시작 가능 (Neon 공식 Free Plan, 확인일 2026-08-10 기준 — 재검증 필요)

| 항목 | 무료 한도 |
|------|-----------|
| 컴퓨트 | 프로젝트당 월 100 CU-hour (0.25 CU 기준 약 400시간 가동 분) |
| 스토리지 | 프로젝트당 0.5GB |
| 프로젝트 수 | 계정당 최대 100개 |
| 브랜치 수 | 프로젝트당 최대 10개 (Vercel Preview 배포마다 자동 브랜치 생성 가능) |
| 네트워크 전송 | 프로젝트당 월 5GB |
| 오토 서스펜드 | 5분 미활동 시 자동 스케일다운, 그동안 컴퓨트 시간 미소모 |

> 출처: https://neon.com/faqs/free-plan-limits-and-quotas , https://neon.com/docs/introduction/plans — **실제 프로비저닝 직전에 최신 수치로 재확인할 것** (요금제는 자주 바뀜).

이 프로젝트의 목표 트래픽(3개월 내 월 1만, 6개월 내 월 5만 방문자) 규모에서는 위 무료 한도 안에서 상당 기간 운영 가능할 것으로 판단.

## Vercel 프로젝트 연결 상태 (확인 완료)

- `.vercel/project.json` 존재 — `projectName: "yeogida"`, 이미 Vercel 프로젝트와 연결돼 있음.
- Vercel CLI 설치 확인됨 (v58.4.4) — `vercel integration add neon` 바로 실행 가능한 상태.

## 후보 기능 4개 (우선순위 논의만 함, 최종 선택 안 함)

사용자가 다음 세션에서 이어서 결정할 예정. 논의 당시 제안했던 순서:

1. **연관 서비스 추천** — DB 불필요, 정적 데이터로 구현 가능 (참고용, Neon과 무관).
2. **잘못된 정보 신고** — 상세페이지에 "정보가 틀렸어요" 신고 버튼, DB에 신고 내용 저장 후 admin에서 확인. 콘텐츠 정확도 유지에 직접 도움.
3. **좋아요/도움됐어요 카운트** — 계정 없이 익명 카운트만 저장하는 가장 가벼운 기능.
4. **즐겨찾기(서버 저장)** — 로그인 없이 기기 식별자로 서버 동기화. 로컬스토리지보다 무겁지만 더 견고.
5. **평점/리뷰** — 스팸/어뷰징 방지, 모더레이션 UI까지 필요해 셋 중 가장 큰 작업. (애초 이 프로젝트 성격상 우선순위 낮다고 판단했던 항목 — PRD v2 항목이긴 함.)

## 진행 상황 (2026-08-13)

**선택된 기능**: 후보 2번 "잘못된 정보 신고" — 상세페이지에 신고 버튼, DB 저장, `/admin/reports`에서 확인.

### 완료된 작업 (코드는 다 짜여 있고 로컬에서 UI까지 검증함, DB만 없는 상태)

- `npm install @neondatabase/serverless` 완료, `npx shadcn add textarea`로 Textarea 컴포넌트 추가.
- `types/report.ts` — `Report`/`ReportStatus` 타입.
- `lib/db.ts` — `getDb()` lazy initialization (계획서 원안대로, top-level `neon()` 호출 없음).
- `lib/reports.ts` — `createReport`/`getAllReports`/`updateReportStatus`, raw SQL 태그드 템플릿 사용 (Drizzle 등 ORM 도입 안 함 — 테이블 1개·쿼리 3개 규모라 과한 추상화로 판단해 보류).
- `scripts/db-init.mjs` — `reports` 테이블 최초 생성 스크립트 (`npm run db:init`, 내부적으로 `node --env-file=.env.local scripts/db-init.mjs` 실행).
- `app/service/[slug]/actions.ts` — 공개용 `submitReport` 서버 액션 (admin `ensureAdmin()`과 분리된 별도 파일, DB 오류 시 500 대신 사용자에게 친절한 에러 메시지 반환하도록 try/catch 처리).
- `components/ReportButton.tsx` — 상세페이지의 "정보가 틀렸어요" 버튼 (Sheet + 라디오 사유 선택 + 상세 textarea), `components/ServiceDetail.tsx`에 연결 완료.
- `app/admin/actions.ts`에 `resolveReport`/`dismissReport` 추가, `app/admin/reports/page.tsx` 신설 (신고 목록 테이블 + 처리완료/반려 버튼, `dynamic = 'force-dynamic'`으로 캐시 방지), `app/admin/layout.tsx`에 "신고 관리" 내비 링크 추가.
- `.env.local.example`에 `DATABASE_URL` 항목 추가.
- `lib/report-constants.ts`로 신고 사유 옵션/길이 제한을 분리 — `lib/reports.ts`(서버, `@neondatabase/serverless` 의존)를 클라이언트 컴포넌트(`ReportButton.tsx`)가 직접 import하지 않도록 하기 위함.
- 보안 검증 보강: `submitReport`가 클라이언트가 보내는 `serviceSlug`를 `getServiceBySlug`로 실존 여부 검증하고, `reason`은 `REPORT_REASON_OPTIONS` 화이트리스트로 검증 (둘 다 폼 값이 클라이언트에서 조작 가능하다는 점을 반영).
- `lib/reports.ts`의 `created_at`은 Neon 드라이버가 `timestamptz`를 JS `Date`로 파싱해서 반환하는 걸 반영해 `ReportRow.created_at: string | Date` → `mapRow`에서 `new Date(...).toISOString()`으로 명시적 정규화.
- `npm run lint`, `npm run build` 통과 확인. 개발 서버로 실제 브라우저에서 신고 버튼 클릭 → 폼 제출 → (DB 미연결 상태이므로) 에러 메시지 정상 표시, `/admin/reports`도 "DB 연동 전" 안내 문구를 깨지지 않고 보여주는 것까지 확인함.
- 관련 `AGENTS.md` 6개(루트, `lib/`, `types/`, `components/`, `app/admin/`, `app/service/[slug]/`, `scripts/`) 모두 이번 변경을 반영해 갱신함 — 특히 루트 `AGENTS.md`의 "DB가 없다" 문구를 "콘텐츠는 DB 없이, 상호작용 데이터는 Neon"으로 정정.

### IP 기반 중복 신고 차단 (2026-08-14 추가)

- `reports` 테이블에 `reporter_ip` 컬럼 추가 (`scripts/db-init.mjs`가 `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`로 기존 테이블에도 안전하게 적용), `(service_slug, reporter_ip)` 인덱스도 추가.
- `app/service/[slug]/actions.ts`의 `getClientIp()`가 `next/headers`의 `headers()`로 `x-forwarded-for`(우선)/`x-real-ip`를 읽어 요청자 IP를 얻음 (Vercel 프로덕션에서는 항상 존재, 로컬 dev는 값이 다를 수 있음).
- `lib/reports.ts`의 `hasRecentReportFromIp(serviceSlug, ip)`가 같은 서비스에 같은 IP로 최근 `REPORT_RATE_LIMIT_HOURS`(=24)시간 내 신고가 있었는지 확인, 있으면 `submitReport`가 DB insert 전에 `{ error: '이미 신고하신 서비스입니다. 24시간 후에 다시 신고할 수 있어요.' }`를 반환.
- 브라우저로 직접 검증 완료 (같은 서비스에 재신고 시도 → 에러 메시지 노출 확인).
- 참고: IP만으로 막는 방식이라 IP가 자주 바뀌는 사용자(모바일 네트워크, VPN)는 우회 가능하고, 반대로 같은 공유 IP(회사망, 공공 와이파이)의 서로 다른 사용자는 서로의 신고에 막힐 수 있음 — 완벽한 차단이 아니라 "무의미한 반복 클릭 스팸" 정도를 막는 가벼운 장치로 의도됨.

### 완료된 프로비저닝 (2026-08-14)

1. ~~Neon 프로비저닝~~ — `vercel integration add neon` 완료. Neon 프로젝트 `neon-aqua-island` 생성, `yeogida` Vercel 프로젝트에 연결됨. (진행 중 Vercel 계정 2FA 설정 화면이 떴는데, 이건 Neon과 무관한 계정 보안 단계였음 — 인증 앱으로 정상 완료.)
2. ~~`.env.local` 동기화~~ — `vercel integration add neon`이 자동으로 `.env.local`에 `DATABASE_URL` 등을 추가·병합함 (`NEXT_PUBLIC_*` 등 기존 로컬 전용 값은 그대로 유지됨, 별도 `vercel env pull` 불필요했음).
3. ~~Development/Production 브랜치 일치 확인~~ — `vercel env ls` 결과 `DATABASE_URL` 등 Neon 관련 변수가 Production/Preview/Development 전체에 **동일한 값**으로 한 번에 등록되어 있음 (환경별로 분리된 행이 아님) → 브랜치 불일치 문제 없음, 로컬과 프로덕션이 같은 Neon DB를 봄.
4. ~~`npm run db:init`~~ — `reports` 테이블 생성 완료.
5. ~~end-to-end 검증~~ — `npm run dev` 후 브라우저로 실제 신고 제출(`/service/mental-health-crisis-109`) → `/admin/reports`에 정상 표시 확인 → "처리완료" 버튼 클릭 시 상태가 `대기`→`처리완료`로 바뀌고 액션 버튼이 사라지는 것까지 확인.

### 남은 작업 (사용자가 직접 실행해야 하는 부분)

1. Vercel에 배포해서 프로덕션 환경에서도 신고 제출이 되는지 확인 (프로덕션 `DATABASE_URL`은 이미 자동 주입돼 있음 — 배포 후 실제 신고 제출 1건으로 확인 권장). 단, `/admin/reports`는 `ensureAdmin()` 때문에 프로덕션에서는 열리지 않으므로, 프로덕션에 쌓인 신고 확인은 로컬 `npm run dev`(같은 Neon DB를 보므로 로컬 admin에서 조회 가능)로 한다.

## 참고: Hobby 플랜과 수익화의 관계

Vercel Hobby 플랜은 비상업적 이용 조건이 있고, "애드센스가 상업적 이용에 해당하는지"에 대해 Vercel 문서 내에서도 상충하는 안내가 있음(2026-08-10 기준). 실제 광고 수익이 발생하는 시점에는 Pro 플랜($20/월) 전환을 기본 시나리오로 잡아두는 게 안전 — Neon 무료 티어와는 별개 이슈지만 같은 인프라 예산 계획에 포함해야 함.
