# 진행 로그

이 문서는 `lexical-weaving-sun.md` 개발 계획(`C:\Users\softo\.claude\plans\lexical-weaving-sun.md`)을 실행하며 진행 상황을 기록하는 로그다. 각 작업은 완료 시점, 한 일, 결정 사항/이슈를 남긴다.

---

## 2026-07-25

### Phase 0 — 프로젝트 셋업 (완료)

- 환경 확인: Node v24.14.0, npm 11.9.0, git 2.53.0
- 계획 문서(`lexical-weaving-sun.md`)와 `PRD.md` 재확인 완료. 계획대로 Phase 0부터 착수.
- **`create-next-app@latest`로 스캐폴딩 생성.** 옵션: TypeScript, App Router, Tailwind CSS, ESLint, `--turbopack`, import alias `@/*`, npm.
  - 프로젝트 디렉토리(`PRD.md`, `PROGRESS.md`, `.omc` 존재)가 완전히 비어있지 않아 `create-next-app`의 대화형 프롬프트를 피하기 위해 스크래치패드에서 먼저 생성 후 이동시키는 방식으로 진행함.
  - 실제 생성된 버전: **Next.js 16.2.11**, React 19.2.4 (계획서에는 "Next.js 15"로 적혀있었으나, 현재 npm 레지스트리 `latest`가 16.x — 최신 안정 버전으로 진행. 문제 시 알려달라고 안내 필요).
  - Tailwind는 **v4**로 설치됨 (postcss 플러그인 방식, `tailwind.config.js` 없이 `app/globals.css`에서 `@import "tailwindcss"` 사용).
  - `create-next-app`이 기본으로 `AGENTS.md`, `CLAUDE.md`, `README.md`를 자동 생성함. 현재는 그대로 둠 (필요시 프로젝트 설명으로 커스터마이즈 예정).
  - `create-next-app`이 자체적으로 git 저장소를 초기화하고 "Initial commit from Create Next App" 커밋을 만듦 — 이후 작업은 별도 커밋으로 분리해서 진행 중.
- **shadcn/ui 초기화**: `npx shadcn@latest init -d` (기본값), Tailwind v4 자동 감지. 이어서 `card`, `input`, `badge`, `sheet` 컴포넌트 추가 (`button`은 init 시 이미 생성됨).
- **폴더 구조 생성**: `data/`, `lib/`, `types/`, `components/layout/`, `public/thumbnails/` (계획서 2장 구조 기준).
- **Prettier 설정 추가**: `prettier` + `prettier-plugin-tailwindcss` 설치, `.prettierrc.json`/`.prettierignore` 작성, `package.json`에 `format`/`format:check` 스크립트 추가.
  - `.prettierignore`에 `PRD.md`, `PROGRESS.md`를 제외 목록으로 추가 — 최초 `npm run format` 실행 시 `PRD.md`의 마크다운 표 정렬이 자동으로 바뀌는 것을 확인했고(내용 손실은 없었음, 표 컬럼 공백 정규화만 발생), 사용자 원본 기획 문서가 도구에 의해 임의로 수정되지 않도록 이후 대상에서 제외함.
- `.gitignore`에 `.omc`(OMC 로컬 상태 디렉토리) 추가 — 커밋 대상 아님.
- **검증**: `npm run lint` 통과, `npm run build` 성공 (정적 페이지 `/`, `/_not-found` 생성 확인).
- **알려진 이슈 (조치 보류)**: `npm audit` 결과 12~15건의 취약점(대부분 high)이 보고되나, 전부 `--force`로만 수정 가능하고 그 수정안이 오히려 **구버전으로 다운그레이드**(next→9.3.3, eslint→10.8.0 등)를 요구함 — 실제 런타임이 아닌 devDependency 툴체인(eslint 서브디펜던시 `brace-expansion`/`minimatch`, `postcss`가 next 내부 node_modules에 중복 설치된 것, shadcn CLI가 물고 있는 `@modelcontextprotocol/sdk`/`@hono/node-server`) 문제라 적용하지 않음. 추후 각 패키지가 정식 마이너 업데이트로 해결되면 그때 반영.
- 아직 하지 않음: git 첫 커밋(스캐폴딩+shadcn+prettier 변경사항 커밋), Vercel 프로젝트 연결(계정 필요 — 사용자 확인 필요).

### Phase 1 — 데이터 모델 & 콘텐츠 골격 (완료)

- `types/service.ts`: 계획서 3장 스키마 그대로 `Service`/`Category` 타입 정의.
- `data/categories.json`: PRD 4장의 6개 MVP 카테고리 등록 (health, legal-admin, family, consumer, emergency, life-admin-tips).
- `data/services.json`: **개발/QA용 샘플 서비스 10건** 작성 (카테고리당 1~2건).
  - PRD에 예시로 언급된 실제 한국 공공 서비스 위주로 선정: 정신건강 위기상담전화(109), E-Gen 심야약국 찾기, 대한법률구조공단(132), 고용노동부 고객상담센터(1350), 아이돌봄서비스, 청소년상담 1388, 1372 소비자상담센터, 안전Dream 실종아동찾기(182), 119 안전신고, 정부24.
  - **URL/전화번호는 WebSearch로 검증 후 기입**(예: 정신건강상담전화 1577-0199와 자살예방상담전화가 2024.1.1부로 109로 통합된 사실 확인, 각 기관 공식 도메인 확인).
  - ⚠️ **주의**: 이 10건은 스키마 검증 및 화면 개발용 샘플 데이터다. 계획서 Phase 1 항목대로 "실 콘텐츠 30~50건 리서치·작성은 별도 트랙"이며, 여기 담긴 URL/운영시간/비용 정보도 **실제 서비스 등록 전 재검증이 필요**하다 (검색 시점: 2026-07-25 기준, 사이트 개편 가능성 있음).
  - 썸네일(`public/thumbnails/*.png`)은 아직 실제 파일이 없는 경로만 지정해둠 — Playwright 캡처는 Phase 3~4에서 진행 예정.
- `lib/services.ts`: `getAllCategories`, `getCategoryBySlug`, `getAllServices`, `getServicesByCategory`, `getServiceBySlug`, `filterServices` 유틸 작성.
  - 계획서 원안은 `filterServices({cost, badges})` 형태였으나, 실사용 편의를 위해 `filterServices(list, {cost, badge})`로 변경 — 카테고리 목록을 먼저 좁힌 뒤 그 결과에 필터를 적용하는 조합이 더 자연스러워서 시그니처를 조정함.
- **검증**: `node -e`로 JSON 파싱 및 `categorySlug` 참조 무결성 확인(불일치 0건), `npx tsc --noEmit` 타입 에러 없음, `npm run lint`/`npm run build` 모두 통과.

### Phase 2 — 핵심 페이지 퍼블리싱 (완료)

- `fuse.js` 설치, `lib/search.ts`: name(가중치 0.5)/summary(0.3)/tags(0.2) 기준 Fuse 인덱스 구성, `searchServices()` 헬퍼.
- `lib/track.ts`: 아웃바운드 클릭 트래킹 헬퍼. 애널리틱스 도구가 아직 미확정(계획서 6장 보류사항)이라 `window.gtag` 호출로 구현해두고, GA4/Vercel Analytics 중 무엇으로 정해지든 내부 구현만 교체하면 되도록 함. GA4로 정해지면 그대로 쓰면 되고, Vercel Analytics로 정해지면 `lib/track.ts`만 수정.
- `components/layout/Header.tsx`, `Footer.tsx`: Header에 카테고리 전체 네비게이션, Footer에 제보/개인정보처리방침/이용약관 링크 + 정보 정확성 안내 문구.
- `app/layout.tsx`: `lang="ko"`로 변경, 메타데이터를 실제 서비스 설명으로 교체(기존 "Create Next App" 플레이스홀더 제거), Header/Footer를 루트 레이아웃에 편입.
- `components/ServiceCard.tsx`, `CategoryNav.tsx`, `SearchBar.tsx`(검색 드롭다운, 클라이언트), `FilterBar.tsx`(URL 쿼리 파라미터 기반 토글, 클라이언트), `Disclaimer.tsx`, `ServiceDetail.tsx`(아웃바운드 클릭 트래킹 연결) 작성.
  - shadcn `Button`이 base-ui 기반이라 `asChild` prop이 없음을 확인 — `ServiceDetail`의 "바로가기" 링크는 `buttonVariants()` 클래스를 `<a>`에 직접 적용하는 방식으로 처리.
- `app/page.tsx`(홈): 검색창 + 카테고리 하이라이트 그리드로 전면 교체.
- `app/category/[slug]/page.tsx`: `generateStaticParams` + `generateMetadata`, `free`/`hours24` 쿼리 파라미터로 필터링, 없는 슬러그는 `notFound()`.
- `app/service/[slug]/page.tsx`: `generateStaticParams` + `generateMetadata`(OG 포함), `health`/`legal-admin` 카테고리는 `Disclaimer` 자동 노출.
- **버그 발견 및 수정**: Chrome에서 실제로 필터 버튼을 클릭해보니 URL은 `router.push`로 바뀌는데 카테고리 목록 화면이 즉시 갱신되지 않는 문제 발견(Next.js 16 클라이언트 라우터 캐시 이슈로 추정 — 새로고침하면 정상 반영됨). `FilterBar.tsx`에서 `router.push()` 직후 `router.refresh()`를 추가로 호출해 해결. 실제 브라우저 재검증까지 마침.
- **검증**: `npm run dev`로 로컬 서버 구동 후 Chrome으로 직접 테스트 — 홈 → 검색("임대차" 입력 시 태그 매칭으로 대한법률구조공단 검색됨) → 상세 페이지(면책조항 배너 정상 노출) → 카테고리 페이지 → 필터 토글(무료만 클릭 시 유료 서비스인 아이돌봄서비스가 즉시 걸러짐, 재클릭 시 해제) 흐름 전부 수동 확인. `npm run lint`/`npx tsc --noEmit`/`npm run build` 모두 통과.
- **알려진 이슈(보류)**: `metadataBase`가 설정되지 않아 빌드 시 OG 이미지 경고가 남음 — 브랜드/도메인이 확정되지 않아(계획서 6장 보류사항) 아직 실제 값을 넣을 수 없음. 도메인 확정 시 `app/layout.tsx`의 `metadata`에 `metadataBase: new URL("https://실제도메인")` 추가 필요.

### Phase 3 — 부가 기능 & 신뢰성 (완료)

- `resend` 패키지 설치, `app/api/submit/route.ts`: 제보 폼 처리 라우트.
  - 필수 필드(serviceName/url/description) 검증, honeypot 필드(`website`) 방식 스팸 방지 — 계획서에서 "간단한 rate-limit 또는 honeypot" 중 honeypot 선택(서버리스 환경에서 in-memory rate-limit은 인스턴스별로 흩어져 효과가 제한적이라 honeypot이 더 확실하다고 판단).
  - `RESEND_API_KEY`/`SUBMIT_FROM_EMAIL`/`SUBMIT_TO_EMAIL` 환경변수 누락 시 500 에러 + 서버 로그 안내로 처리(계획서 6장 "Resend 발신/수신 이메일 확정 필요" 보류사항이 아직 해결되지 않았기 때문 — **사용자가 Resend 계정을 만들고 이 3개 환경변수를 채워야 실제 이메일 발송이 동작함**).
  - `.env.local.example` 추가로 필요한 환경변수 안내, `.gitignore`에 `!.env.local.example` 예외 추가(기존 `.env*` 무시 규칙 때문에 example 파일이 커밋에서 빠지는 것을 방지).
- `app/submit/page.tsx`: 클라이언트 폼(제출 중/성공/실패 상태 관리), honeypot 입력 필드는 시각적으로 숨김 처리(화면 밖으로 이동 + `tabIndex=-1`).
- `app/privacy/page.tsx`, `app/terms/page.tsx`: 애드센스 승인 요건 충족을 위한 정적 페이지. 사업자 정보 등 법적 확정 사항은 아직 없어 일반적인 문구로 작성 — **실제 운영 시작 전 법률 검토 권장**.
- `components/AdSlot.tsx`: 애드센스 승인 전 빈 자리표시자. PRD 7장 배치 원칙(목록 사이 인피드 광고, 상세페이지 하단)에 따라 `app/category/[slug]/page.tsx`에는 서비스 6개마다 인피드 슬롯을, `app/service/[slug]/page.tsx`에는 상세 내용 하단에 슬롯을 실제로 배치함.
- `app/sitemap.ts`, `app/robots.ts`: 정적/카테고리/서비스 페이지 전체 URL 포함, `NEXT_PUBLIC_SITE_URL` 환경변수로 도메인 주입(미설정 시 `localhost:3000` 폴백 — 도메인 확정 후 Vercel 환경변수로 설정 필요).
- **검증**: `npm run dev` 구동 후 Chrome으로 실제 테스트.
  - `/submit`에서 폼 작성 후 제출 → Resend 환경변수 미설정 상태이므로 예상대로 "제보 접수에 실패했습니다" 에러가 화면에 정상 표시됨 확인(에러 핸들링 자체는 정상 동작, 실제 이메일 발송은 사용자가 환경변수를 채운 뒤 별도 검증 필요).
  - `/privacy`, `/terms`, `/category/health`(AdSlot이 서비스 2건뿐이라 인피드 조건 미충족 상태) 렌더링 확인.
  - `npm run lint`/`npx tsc --noEmit`/`npm run build` 모두 통과, 빌드 결과에 `/api/submit`, `/privacy`, `/terms`, `/sitemap.xml`, `/robots.txt`, `/submit` 라우트 전부 생성 확인.
- **모바일 반응형 확인 관련 제약**: Chrome 자동화 도구의 `resize_window`로 뷰포트를 390×844로 줄여봤으나 스크린샷 해상도가 그대로 유지되어(환경 제약으로 추정) 실제 좁은 화면 렌더링을 직접 캡처하지는 못함. 대신 코드상 Tailwind 반응형 클래스(`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`)가 홈/카테고리 그리드에 일관되게 적용된 것을 확인함 — **실기기/브라우저 반응형 모드에서의 육안 확인은 아직 미완료 상태로 남아있음**.

### 리뷰(advisor) 지적 사항 및 후속 수정 — 2026-07-26

Phase 3 완료 보고 전 코드 리뷰를 받은 결과, 실사용에 영향을 주는 버그 1건과 검증 공백 1건이 확인되어 즉시 수정·재검증했다.

1. **[치명적, 수정 완료] `/submit` 성공 경로가 실제로는 크래시나는 버그**: `app/submit/page.tsx`에서 `await fetch(...)` 이후 `event.currentTarget.reset()`을 호출하고 있었는데, React가 이벤트 핸들러의 동기 구간이 끝나면 `event.currentTarget`을 `null`로 되돌리기 때문에 비동기 처리 후 이 값에 접근하면 `TypeError`가 발생한다. 이 에러가 같은 `try` 블록의 `catch`에 잡혀 `setStatus('error')`로 덮어써지면서, 사용자에게는 성공 대신 "Cannot read properties of null" 같은 원본 JS 에러 문구가 노출되는 상황이었다.
   - 이전 브라우저 테스트에서 이 버그를 놓친 이유: Resend 환경변수가 없어 매번 서버가 500을 반환했고, 그 경우 `reset()` 줄에 도달하기 전에 이미 `catch`로 빠졌기 때문에 유일하게 동작 확인이 됐던 경로가 우연히 이 버그를 우회하는 경로였다.
   - 성공 상태에서는 폼 자체가 언마운트되므로 `reset()` 호출이 애초에 불필요한 코드였음 — 해당 줄을 삭제해서 해결.
   - **재검증**: Resend 키 없이도 성공 경로를 확인할 수 있도록, honeypot 필드(`website`)에 값을 채워 넣으면 API가 스팸으로 간주해 곧장 `{ok:true}`를 반환하는 점을 이용 — 브라우저 콘솔에서 `document.querySelector('input[name=website]').value = 'spam'`으로 채운 뒤 제출 → "제보해주셔서 감사합니다!" 성공 화면이 에러 없이 정상 표시됨을 확인.
2. **[검증 공백, 재검증 완료] FilterBar 수정이 `next dev`에서만 확인됨**: 앞서 Phase 2에서 고친 `router.refresh()`는 개발 서버에서만 검증했는데, Next.js의 클라이언트 라우터 캐시 동작이 dev와 prod에서 다르게 작동할 수 있어 dev 통과가 prod 정상 동작의 증거가 되지 못한다는 지적을 받음.
   - **재검증**: `npm run build && npm start`로 실제 프로덕션 서버를 띄운 뒤 `/category/family`에서 "무료만" 필터를 다시 클릭 — 유료 서비스(아이돌봄서비스)가 즉시 걸러지고 URL도 `?free=1`로 정상 반영되는 것을 확인. prod 환경에서도 문제없이 동작함.
3. **sitemap.xml / robots.txt 실물 확인**: 빌드 로그의 라우트 목록만 보고 넘어갔던 것을 `curl`로 직접 응답을 확인 — `sitemap.xml`에 카테고리 6개 + 서비스 10개 + 정적 페이지(홈/submit/privacy/terms) 전부 포함, `robots.txt`도 `/api/` 차단 + sitemap 참조가 올바르게 생성됨을 확인.
4. **품질 재확인**: 수정 후 `npm run lint` / `npx tsc --noEmit` / `npm run build` 모두 재통과.

### Git 커밋

- 사용자 확인 후, `create-next-app`의 최초 커밋(`119de0c`) 이후 Phase 0~3의 모든 변경사항(스캐폴딩, shadcn, prettier, 데이터, 페이지, 컴포넌트, 제보 폼, SEO 파일 등 45개 파일)을 커밋 `3a5e5f2`로 한 번에 커밋함.
- 커밋 전 `git status`로 스테이징 대상을 확인 — 실제 비밀값이 담긴 `.env.local`은 목록에 없고(`.gitignore`로 제외됨) 값이 비어있는 `.env.local.example`만 포함된 것을 확인 후 진행.
