<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- Generated: 2026-07-26 | Updated: 2026-08-13 -->

# 여기다 (life-service-directory)

## Purpose
사람들이 몰라서 못 쓰는, 실제로 도움이 되는 생활 밀착형 서비스(건강·법률/행정·가족·소비자·응급·생활팁)를 카테고리별로 정리해 검색·탐색할 수 있게 해주는 큐레이션 디렉토리 웹사이트. Next.js App Router 기반이며 콘텐츠(services/categories)는 별도 DB 없이 저장소 내 JSON 파일(`data/`)로 관리한다. **단, 사용자 상호작용 데이터("잘못된 정보 신고" 등)는 Vercel 프로덕션 파일시스템이 읽기 전용이라 JSON으로 저장할 수 없어 Neon Postgres에 저장한다** (`lib/db.ts`, `lib/reports.ts` 경유 — 자세한 배경/계획은 `NEON-PLAN.md` 참고). 자세한 기획 배경은 `PRD.md`, 개발 진행 기록은 `PROGRESS.md` 참고.

## Key Files
| File | Description |
|------|-------------|
| `package.json` | 의존성 및 스크립트 (`dev`/`build`/`start`/`lint`/`format`/`db:init`) |
| `next.config.ts` | Server Actions 바디 크기 제한(25mb, 이미지 업로드용) 설정 |
| `tsconfig.json` | TypeScript 설정, `@/*` 경로 별칭 |
| `components.json` | shadcn/ui 설정 |
| `.env.local.example` | 필요 환경변수 템플릿 (`NEXT_PUBLIC_SUBMIT_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`) |
| `NEON-PLAN.md` | Neon Postgres 도입 배경, 진행 상황, 남은 프로비저닝 절차 |
| `PRD.md` | 제품 기획 문서 |
| `PROGRESS.md` | 개발 진행 기록 |
| `README.md` | 사용자 대상 프로젝트 설명 (한글) |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js App Router 라우트 — 공개 페이지, 관리자 페이지 (see `app/AGENTS.md`) |
| `components/` | 재사용 React 컴포넌트 + shadcn/ui 프리미티브 (see `components/AGENTS.md`) |
| `data/` | JSON 기반 콘텐츠 저장소 — `categories.json`, `services.json` (see `data/AGENTS.md`) |
| `lib/` | 데이터 조회/검색/유틸 함수 (see `lib/AGENTS.md`) |
| `types/` | 공유 TypeScript 타입 정의 (see `types/AGENTS.md`) |
| `public/` | 정적 파일 + 관리자 업로드 이미지 저장 위치 (`public/uploads`, `public/thumbnails`) |
| `scripts/` | 앱 외부에서 실행하는 유지보수 스크립트 — 링크 점검 등 (see `scripts/AGENTS.md`) |
| `.github/workflows/` | GitHub Actions 워크플로우 — `check-links.yml`(매주 링크 점검) |

## For AI Agents

### Working In This Directory
- **콘텐츠(services/categories)는 DB 없이 JSON+git으로 관리한다.** `data/services.json`, `data/categories.json`에 저장되며 `lib/admin-data.ts`(읽기)와 `lib/admin-write.ts`(쓰기, Prettier로 포맷 후 저장)를 통해서만 접근한다.
- **사용자 상호작용 데이터(신고 등)는 Neon Postgres에 저장한다.** `lib/db.ts`의 `getDb()`(lazy init)로 얻은 클라이언트를 `lib/reports.ts`에서 감싸 사용 — 새 상호작용 기능(좋아요, 즐겨찾기 등)을 추가할 때도 이 패턴을 따른다. DB 접근 코드는 서버 전용이므로 클라이언트 컴포넌트에서 직접 import하지 말 것(공유 상수는 `lib/report-constants.ts`처럼 별도 파일로 분리).
- `/admin` 관리자 화면과 그 Server Actions(`app/admin/actions.ts`)는 `ensureAdmin()`으로 `NODE_ENV === 'development'`일 때만 동작하도록 막혀 있다 — 프로덕션에서 열리는 변경은 절대 하지 말 것. 신고 목록(`app/admin/reports/`)도 이 제약을 그대로 따르므로, 로컬 `DATABASE_URL`이 프로덕션과 다른 Neon 브랜치를 가리키면 실제 신고가 안 보일 수 있다 — 자세한 건 `NEON-PLAN.md` 참고.
- 코드 내 문자열(에러 메시지, UI 텍스트)은 한글이 기본 컨벤션. 새 UI 텍스트도 한글로 작성한다.
- Node.js 16.x 미만이 아니라 **Next.js 16.2.11**을 쓰는 최신 프로젝트다 — 오래된 Pages Router/구버전 API 패턴을 가정하지 말고, 필요하면 `node_modules/next/dist/docs/`를 확인한다.

### Testing Requirements
- 자동화된 테스트 스위트는 없다. 변경 후 `npm run lint`와 `npm run build`로 타입/빌드 오류를 확인한다.
- UI 변경은 `npm run dev`로 로컬에서 직접 확인 권장.

### Common Patterns
- 데이터 조회는 항상 `lib/services.ts`의 헬퍼(`getAllServices`, `getServiceBySlug`, `getServicesByCategory`, `filterServices`)를 통해서 하고, `data/*.json`을 직접 import하지 않는다 (카테고리는 예외적으로 동기 조회).
- 서버 컴포넌트에서 데이터 페칭, 클라이언트 컴포넌트는 `'use client'` 명시 + 최소 범위로 분리 (예: `SearchBar`, `FilterBar`, `ServiceForm`).
- Tailwind CSS v4 유틸리티 클래스 직접 사용, `cn()`(`lib/utils.ts`)으로 조건부 클래스 병합.

## Dependencies

### External
- **Next.js 16 (App Router, Turbopack)** + React 19 + TypeScript
- **Tailwind CSS v4** + shadcn/ui (`components/ui/`)
- **Fuse.js** — 클라이언트 사이드 퍼지 검색 (`lib/search.ts`)
- **Prettier** — `lib/admin-write.ts`에서 JSON 저장 시 포맷팅에도 사용
- **@neondatabase/serverless** — 사용자 상호작용 데이터(신고 등)용 Neon Postgres 드라이버 (`lib/db.ts`)

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
