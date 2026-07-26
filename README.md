# 여기다

사람들이 몰라서 못 쓰는, 실제로 도움이 되는 생활 밀착형 서비스(건강·법률/행정·가족·소비자·응급·생활팁)를 카테고리별로 정리해 검색·탐색할 수 있게 해주는 큐레이션 디렉토리 웹사이트입니다.

자세한 기획 배경은 [`PRD.md`](./PRD.md), 개발 진행 기록은 [`PROGRESS.md`](./PROGRESS.md)를 참고하세요.

## 기술 스택

- [Next.js](https://nextjs.org) (App Router, Turbopack) + React + TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com)
- [Fuse.js](https://www.fusejs.io) — 클라이언트 사이드 검색
- [Resend](https://resend.com) — 서비스 제보 폼 이메일 발송
- 콘텐츠는 별도 DB 없이 저장소 내 JSON 파일(`data/`)로 관리

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 환경변수

제보 폼(`/submit`)과 사이트맵/OG 이미지 절대 경로 생성을 위해 환경변수가 필요합니다. `.env.local.example`을 복사해 `.env.local`을 만들고 값을 채워주세요.

```bash
cp .env.local.example .env.local
```

| 변수                    | 설명                                          |
| ----------------------- | --------------------------------------------- |
| `RESEND_API_KEY`        | 제보 폼 발송용 Resend API 키                  |
| `SUBMIT_FROM_EMAIL`     | 발신 이메일 (Resend에 검증된 도메인 필요)     |
| `SUBMIT_TO_EMAIL`       | 제보를 받을 운영자 이메일                     |
| `NEXT_PUBLIC_SITE_URL`  | 배포 도메인 (사이트맵/OG 절대 URL 생성용)     |

값이 없어도 로컬 개발은 가능하지만, `/submit` 제출은 500 에러가 발생합니다.

## 스크립트

```bash
npm run dev           # 개발 서버 실행 (Turbopack)
npm run build         # 프로덕션 빌드
npm run start         # 프로덕션 서버 실행
npm run lint          # ESLint 검사
npm run format        # Prettier로 전체 포맷팅
npm run format:check  # Prettier 포맷 검사만
```

## 프로젝트 구조

```
app/
  page.tsx                  # 홈 (검색창 + 카테고리 하이라이트)
  category/[slug]/page.tsx  # 카테고리별 목록 + 필터
  service/[slug]/page.tsx   # 서비스 상세
  submit/page.tsx           # 서비스 제보 폼
  api/submit/route.ts       # 제보 폼 처리 (Resend 발송)
  privacy/, terms/          # 개인정보처리방침, 이용약관
  sitemap.ts, robots.ts     # SEO

components/
  layout/                   # Header, Footer
  ui/                        # shadcn/ui 컴포넌트
  ServiceCard, CategoryNav, SearchBar, FilterBar, ServiceDetail, Disclaimer, AdSlot

data/
  categories.json           # 카테고리 정의
  services.json             # 서비스 콘텐츠

lib/
  services.ts                # 카테고리/서비스 조회 유틸
  search.ts                   # Fuse.js 검색 인덱스
  track.ts                    # 아웃바운드 클릭 트래킹

types/service.ts             # Service, Category 타입 정의
```

## 배포

[Vercel](https://vercel.com)에 배포하는 것을 기준으로 설계되었습니다. 배포 전 위 환경변수를 Vercel 프로젝트 설정에도 등록해야 합니다.
