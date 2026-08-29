# 영어 지원(i18n) 도입 방향

- 작성일: 2026-08-25 / 갱신일: 2026-08-26
- 상태: **5단계(카테고리 18개 + 서비스 178개 전량 `i18n.en` 번역, 공식/비공식 출처 분리) 완료 및 검증됨.** 사용자가 "카테고리·서비스 내용도 이제 영어로 바꿔야 한다, 공식 영문 페이지가 없으면 뱃지로 표시하고 일단 번역해 알아들을 수 있게 하라"고 명시적으로 요청해 4단계의 "공식 출처만" 원칙을 완화했다. 대신 색인 허용 범위는 그대로 좁게 유지했다(아래 "5단계에서 처리한 것" 참고). `lint`/`build`/프로덕션 서버 기동까지 로컬에서 확인 완료.
- 관련 배경: 현재 `여기다`는 순수 한글 서비스로, i18n 관련 패키지(next-intl 등)나 `proxy.ts`(구 middleware)가 전혀 없는 상태에서 시작한다. 콘텐츠는 `data/services.json`(178개)·`data/categories.json`(18개)에 한국어로만 저장돼 있고, 그중 다수가 한국 정부/지자체의 전화상담 등 "한국어 화자 전용" 채널이다.

## 핵심 전제: 두 트랙을 분리한다

이 작업은 성격이 완전히 다른 두 가지를 하나로 묶으면 반드시 지연된다.

1. **UI/화면 텍스트 i18n** — 범위가 명확하고 안전한 작업 (헤더/푸터/버튼/메타데이터 등).
2. **콘텐츠(서비스 178개) 번역** — 범위가 불명확하고 리스크가 있는 작업. 특히 `description`은 신청/이용 절차를 담은 필드라 [[절차 관련 내용 지어내기 금지]] 원칙이 그대로 적용된다 — 기계번역으로 "그럴듯하지만 틀린 절차"를 만들면 원칙 위반이다.

두 트랙을 같은 마일스톤에 묶지 않는다. UI 트랙은 v1으로 먼저 끝내고, 콘텐츠 트랙은 서비스별로 점진적으로 채운다.

## 라우팅 전략: 기존 한국어 URL은 절대 이동하지 않는다 — `[lang]` 세그먼트 + rewrite

`app/layout.tsx`에 이미 네이버/구글 서치콘솔 소유확인, AdSense, GTM이 살아있고 색인된 한국어 URL(`/service/[slug]`, `/category/[slug]`, `/guides/[slug]` 등)이 존재한다. 따라서 브라우저 주소창에 보이는 한국어 URL은 **1바이트도 바뀌면 안 된다.**

처음엔 "영어만 `/en` 접두사로 얹고 한국어는 그대로 두자"는 생각으로 `app/(main)/...`와 별도로 `app/en/...`를 만드는 방향을 검토했으나, 이러면 15개 이상의 페이지 파일을 두 벌 유지해야 해서 폐기. 대신 **Next.js 공식 i18n 가이드의 표준 패턴을 그대로 쓰되, "리다이렉트"가 아니라 "rewrite"로 적용**한다 — 라우트 트리는 `[lang]` 세그먼트 하나로 통합하고, 브라우저에는 원래 경로가 그대로 보이게 한다.

- `app/[lang]/layout.tsx`가 루트 레이아웃 역할(`<html lang={lang}>`, 폰트, GTM, AdSense). `generateStaticParams`가 `[{lang:'ko'},{lang:'en'}]` 반환해 두 로케일 모두 프리렌더.
- `(main)`(과 그 하위 `admin`)을 `[lang]` 아래로 이동. `app/ads.txt`는 Route Handler라 레이아웃이 필요 없으므로 그대로 바깥에 둔다.
- `proxy.ts`(구 middleware, Next.js 16.2.11부터 명칭 변경 확인됨)가 `/foo` 요청을 **rewrite**로 `/ko/foo`에 매핑하고, `/en/foo`는 그대로 통과시킨다 — **redirect 아님**, 브라우저 주소창은 계속 `/foo`로 보인다. matcher는 `_next`, `api`, `ads.txt`, `sitemap.xml`, `robots.txt`, `/uploads`, `/thumbnails`를 제외.
- **착수 전 반드시 검증할 것**: proxy rewrite로 접근한 프리렌더 라우트가 정적 응답으로 계속 서빙되는지, 아니면 트리 전체가 동적으로 강제되는지. 이건 정적 콘텐츠 사이트 전체 전략을 좌우하는 문제라 15개 페이지를 마이그레이션하기 전에 **테스트용 라우트 1개로 먼저 확인**한다. 만약 동적으로 강제된다면 이 접근을 접고 소규모 `/en` 라우트만 별도로 두는 쪽으로 축소.
- 내부 `<Link href="/service/x">`가 전부 `/ko/service/x`로 새지 않도록 **로케일 인지 href 헬퍼**가 필요 — 이 방식의 실질적인 비용.
- 번역 사전은 next-intl 같은 외부 패키지 대신 **Next.js 공식 가이드의 "얇은 dictionary 모듈" 패턴**(`dictionaries/en.json` + `getDictionary()`)을 채택 — 2개 로케일·복수형/날짜 포맷 요구 없는 디렉토리 사이트엔 이 정도로 충분하고 Next 16.2.11 서드파티 패키지 호환성 리스크도 피한다.
- `hreflang`(`alternates.languages`)은 **한/영 양쪽에 실제로 존재하는 페이지에만** 쌍으로 넣는다 (아래 "얇은 중복 페이지 방지" 참고). `x-default`는 한국어로.

## 순서 — 라우팅 마이그레이션을 콘텐츠와 분리해서 먼저 끝낸다

1. `[lang]` + rewrite + 로케일 인지 링크 헬퍼 + hreflang 골격만 작업. **영어 콘텐츠는 0건, 언어 스위처는 숨김.**
2. `npm run lint`, `npm run build` 통과 확인.
3. `npm run dev`로 `/`, `/service/[slug]`, `/category/[slug]`, `/admin`이 기존과 동일한 경로로 열리는지 직접 확인. 실제 서비스에 영향을 줄 수 있는 변경이므로 이 단계를 깨끗하게 끝낸 뒤에만 다음으로 넘어간다.
4. 그다음 dictionary + 언어 스위처.
5. 그다음 스키마 필드(`supportLanguages`, `i18n.en`).
6. 콘텐츠 파일럿은 맨 마지막.

### 2단계에서 처리한 것

- **`<html lang>` 고정 문제 해결.** 1단계 known gap의 (a)안(정석)을 그대로 채택 — `app/layout.tsx`(공유 루트)를 삭제하고 `app/[lang]/layout.tsx`와 `app/(discover)/layout.tsx`를 각각 독립된 root layout으로 승격했다(`<html lang>`·폰트·GTM/GA/AdSense 스크립트를 자체적으로 렌더링). 폰트(`lib/fonts.ts`)와 분석 스크립트(`app/AnalyticsScripts.tsx`)는 공유 모듈로 뽑아 두 root의 중복 유지 비용을 줄였다. `metadataBase`·네이버/애드센스 verification 메타 태그처럼 기존에 단일 루트에만 있던 항목은 두 root 모두에 명시적으로 복제했다(문서화 안 하면 조용히 깨지는 부분).
  - **복수 root layout의 부작용을 발견하고 해결함**: `[lang]`이 top-level dynamic segment로 root layout이 되면서, 완전히 매칭되지 않는 URL(예: `/asdkjaskjd`)에 대해 Next.js가 어느 root로 404를 합성할지 알 수 없어 기존 `app/not-found.tsx`가 조용히 무시되고 Next의 최소 기본 404(스타일 없음, `<html lang>` 없음)로 대체되는 회귀를 로컬에서 직접 재현했다. Next 16 문서가 권장하는 `experimental.globalNotFound` + `app/global-not-found.tsx`(자체 완결된 `<html>`/`<body>` 문서)를 도입해 해결. 라우트 안에서 명시적으로 `notFound()`를 호출하는 케이스(존재하지 않는 service slug 등)는 기존처럼 각 세그먼트의 `not-found.tsx`(`app/[lang]/(main)/not-found.tsx`, `app/(discover)/not-found.tsx`)가 그대로 처리하는 것도 확인함 — 전역 404와 세그먼트 404는 독립적으로 잘 동작한다.
- **로케일 인지 링크 헬퍼 도입 및 적용.** `lib/i18n.ts`의 `localeHref(lang, path)` — ko는 접두사 없음(rewrite 방식 유지), en은 `/en` 접두사. Header/Footer/HeaderNav/CategoryNav/ServiceCard/HeroGuideCarousel과 about·terms·guides·guides/[slug]·service/[slug]·category/[slug]·board 관련 페이지에 적용. `admin/*`(개발 전용, 번역 대상 아님)과 `(discover)/*`(이번 범위 밖) 컴포넌트는 의도적으로 제외.
- **Dictionary + 언어 스위처.** `dictionaries/{ko,en}.json`은 헤더 내비/푸터 링크 라벨/스킵링크/사이트 설명 같은 순수 UI 텍스트만 담는다 — 카테고리명, 홈/about/가이드 등 페이지 본문 카피는 콘텐츠 트랙(3~4단계) 범위라 이번엔 그대로 한국어로 남겨뒀다. `components/layout/LangSwitcher.tsx`(클라이언트 컴포넌트, `usePathname()` 기반으로 현재 페이지를 유지한 채 반대 로케일 경로 계산)를 Header(데스크톱)와 모바일 시트 메뉴 양쪽에 배치.
- **`/en` 색인 방지(중복 콘텐츠 신호 차단).** `/en` 트리 전체는 아직 UI 텍스트만 번역되고 본문 콘텐츠는 한국어 그대로라, `app/[lang]/layout.tsx`의 `generateMetadata`에서 `lang !== 'ko'`일 때 `robots: { index: false, follow: true }`를 내려보내고, `app/robots.ts`에도 `/en` disallow를 추가했다(메타 태그 + robots.txt 이중 방어). `sitemap.ts`는 원래도 접두사 없는 한국어 URL만 포함하고 있어 추가 변경 불필요.
- **검색창 처리.** `lib/search.ts`가 한국어 인덱스만 지원하는 문제(계획서 원안) — en 카테고리 페이지에서는 `SearchBar`를 아예 렌더링하지 않고 대신 "Search currently only covers Korean-language content." 안내문을 보여준다(`dictionaries/en.json`의 `search.koOnlyNotice`).

### 남은 known gap (3단계 이후로 이월)

- `app/[lang]/(main)/not-found.tsx`(세그먼트 notFound() 케이스)는 `params`를 받지 않는 Next.js 파일 컨벤션이라 로케일 인지 링크를 못 만든다 — `/en/...`에서 존재하지 않는 slug에 접근하면 "홈으로"/"가이드 보기" 버튼이 한국어 URL로 이동한다. 엣지 케이스라 이번 단계에서는 보류.
- 홈/about/가이드 목록 등 페이지 본문 카피(h1/h2/문단)는 여전히 한국어 고정 — 이건 처음부터 스코프 밖(UI 트랙은 헤더/푸터/메타데이터, 본문 카피는 콘텐츠 트랙).

### 3단계에서 처리한 것

- **`Service` 타입 확장** (`types/service.ts`): `supportLanguages?: { language, evidenceUrl }[]`(둘 다 필수 — 근거 URL 없는 항목은 타입 레벨에서부터 만들 수 없게 막음, [[절차 관련 내용 지어내기 금지]] 적용) / `i18n?: { en?: { name, summary, description, hours? } }`(`name`/`summary`/`description`은 필수 — 셋 중 하나라도 비면 얇은 중복 페이지가 생기므로). `tags`/`badges`는 (3단계 당시) 의도적으로 번역 대상에서 제외했었음(검색·필터가 한국어 인덱스 전용이라 번역해도 못 씀). **단, 이후 사용자 요청으로 `badges`만 표시용 번역을 추가함** — `lib/service-badges.ts`의 `getServiceBadgeName(badge, lang)`이 9개 뱃지 값(24시간/공공기관/긴급/다국어지원/무료/민원발급/의료비지원/정부지원/취약계층지원)을 `getServiceLanguageName`과 동일한 패턴으로 화면 표시만 번역하고, 필터링(`lib/services.ts`의 `filterServices`)은 여전히 원본 한국어 값으로 매칭한다 — 데이터/필터 로직은 그대로 두고 `ServiceCard`/`ServiceDetail`에서만 번역된 라벨을 렌더링. `FilterBar`("무료만"/"24시간만")도 `dictionaries/*.json`의 `filterBar` 키로 옮겨 lang 인지하게 함. `tags`는 여전히 번역 대상 아님.
- **언어 표시명 헬퍼** (`lib/service-languages.ts`): `getServiceLanguageName(code, lang)` — ISO 639-1 코드 → ko/en 표시명. 목록에 없는 코드는 추측 대신 코드를 그대로 반환.
- **로케일별 표시용 서비스 해석** (`lib/services.ts`의 `resolveServiceForLocale(service, lang)`): en이고 `i18n.en`이 있을 때만 name/summary/description/hours를 대체, 없으면 원본(한국어) 그대로. `service/[slug]/page.tsx`가 `ServiceDetail`·`generateMetadata`·JSON-LD·관련 서비스 카드에 전부 이 함수의 결과를 넘기도록 정리해서 번역 분기가 한 곳에만 있다.
- **`/en/service/[slug]`의 "얇은 중복 페이지 방지" 실제 적용**:
  - `generateStaticParams`가 이제 `{ lang, slug }` 쌍을 직접 반환한다(기존엔 `{ slug }`만 반환해 부모 레이아웃의 `[{lang:'ko'},{lang:'en'}]`과 교차곱되어 모든 서비스가 `/en`에도 프리렌더되고 있었음) — ko는 전체 178건, en은 `i18n.en`이 있는 서비스만. Next 공식 문서의 "Generate params from the bottom up" 패턴(`node_modules/next/dist/docs/.../generate-static-params.md`)을 적용했고, **양방향으로 검증함**: (1) 무번역 상태 빌드에서 `.next/server/app/en/service`가 0건, `ko/service`는 178건 전부 생성됨을 확인. (2) 이것만으론 "자식이 부모의 교차곱을 대체한다"는 걸 증명하지 못한다는 지적을 받고(빈 배열 필터는 대체/병합 어느 쪽이든 결과가 같으므로) — `data/services.json`에 서비스 1건에 `i18n.en`+`supportLanguages`를 임시로 채워 넣고 다시 빌드해서 `.next/server/app/en/service/<slug>.html`이 실제로 생성되고 그 안에 번역된 name/summary/description/hours, 영어 라벨(Hours/Operated by/Visit site/Language support), `supportLanguages` pill의 근거 URL, `hreflang`(ko/en/x-default) 태그가 전부 들어있는 걸 확인한 뒤 `git checkout -- data/services.json`으로 되돌림.
  - 번역 없는 서비스로 `/en/service/[slug]`에 접근하면(빌드에 없어 `dynamicParams` 기본값 `true`로 런타임 렌더 진입) 페이지 컴포넌트 안에서 `redirect()`(307, `permanentRedirect` 아님 — 나중에 번역이 채워지면 이 분기가 안 타야 하는데 308은 브라우저/캐시에 영구 저장돼버림)로 접두사 없는 한국어 원문 URL로 보낸다. `curl -D-`로 `/en/service/<미번역slug>` → `307` → `location: /service/<slug>`(`/ko/service/...`가 아님) 확인.
  - `generateMetadata`의 `alternates.canonical`을 로케일 인지로 고치고(기존엔 `/en`에서도 한국어 URL을 canonical로 선언하고 있었음), `i18n.en`이 있을 때만 `alternates.languages`(ko/en/x-default 쌍, 계획 28행 "x-default는 한국어로")를 내려보낸다(계획 27행 "실제로 존재하는 페이지에만" 원칙 적용). 단, `app/robots.ts`가 `/en` 전체를 여전히 disallow 중이라 이 hreflang 쌍은 4단계에서 로봇 규칙을 페이지 단위로 풀기 전까지는 크롤러가 실제로 따라갈 수 없음 — "번역 채워지면 hreflang 자동으로 의미 생김"이 아니라 4단계의 robots 작업이 선행 조건.
- **`ServiceDetail` 라벨 다국어화**: "운영시간/비용/무료·유료/운영 주체/바로가기"가 하드코딩 한글이었던 것을 `dictionaries/{ko,en}.json`의 신설 `service.*` 키로 교체(`ServiceDetail`은 클라이언트 컴포넌트라 `dict.service` 슬라이스를 props로 전달). 완전히 번역된 영어 페이지에서 이 라벨만 한글로 남는 걸 막기 위함 — 페이지 본문 카피(h2 섹션 제목 등)는 이번에도 스코프 밖으로 남겨둠.
- **`supportLanguages` UI 노출**: 값이 있는 서비스는 상세 페이지에 "다국어 지원"(en: "Language support") pill을 렌더링하고, 각 pill이 근거 URL(`evidenceUrl`)로 바로 연결되도록 함(번역 없이도 즉시 가치를 준다는 계획의 우선순위 1번 원칙 그대로 구현). 현재 178개 서비스 전부 이 필드가 비어 있어 화면엔 아직 아무 것도 안 뜸(정상 — 근거 URL 확인 전엔 채우지 않음).
- **JSON-LD 지역화**: `service/[slug]/page.tsx`의 breadcrumb `'홈'` 하드코딩을 `dict.home`으로, `Service.inLanguage`를 `dict.site.htmlLang`으로 채워 영어 페이지의 구조화 데이터가 한국어 리터럴을 안 갖도록 함. (같은 문제가 있는 `category/[slug]/page.tsx`는 이번 스코프 밖이라 손대지 않음 — 필요시 후속 작업.)
- **admin 저장 경로 안전성 확인**: `updateService`가 `Object.assign(service, fields)`를 쓰는데 `fields`(`buildFieldsFromForm` 반환값)엔 `i18n`/`supportLanguages` 키가 없어서, `/admin/[slug]`에서 저장해도 두 필드는 그대로 보존됨을 코드로 확인(관리자 폼 자체는 이번 단계에서 확장하지 않음 — 4단계 파일럿에서 실제로 값을 채울 방법을 정할 때 같이 결정).

## UI 트랙에서 실제로 손대야 할 지점

- `app/layout.tsx` — `lang="ko"` 하드코딩(96행), title/description/keywords/OG `locale: 'ko_KR'`, `alternates.canonical`, 스킵링크 텍스트("본문으로 바로가기"). `SITE_KEYWORDS`가 모듈 스코프에서 `getAllCategories()`를 호출(39행)하므로 로케일 의존적으로 바뀐다.
- `app/(main)/layout.tsx` — JSON-LD `inLanguage: 'ko-KR'`, `name: '여기다'`.
- `components/layout/Header.tsx`, `Footer.tsx` — 내비 라벨 + 언어 스위처 UI 자체를 여기에 추가.
- `lib/search.ts` — Fuse.js가 한국어 `name`/`summary`/`tags`를 인덱싱한다. 라틴 문자 쿼리로 한국어 인덱스를 검색하면 "결과가 나쁨"이 아니라 **결과가 0건**이라 검색창 자체가 고장난 것처럼 보인다. v1(번역된 서비스가 소수인 단계)에서는 영어 페이지에서 검색 기능 자체를 빼거나, "한국어 콘텐츠를 검색합니다"라고 명시한다 — 비어있는 검색 결과를 그대로 내보내지 않는다.
- sitemap/robots — 로케일별 엔트리 추가.
- `types/`, `lib/admin-data.ts`/`lib/admin-write.ts`, admin 폼 — 번역 입력 지점. `/admin`은 `ensureAdmin()`으로 개발 환경 전용이라 여기 손대는 건 리스크가 낮다.

## 콘텐츠 트랙: 번역이 아니라 "지원 언어 표시"가 먼저

178개 서비스를 전부 영어로 번역하는 건 큰 작업일 뿐 아니라, 상당수가 전화상담 등 실질적으로 한국어 화자만 이용 가능한 채널이라 번역해도 실사용 가치가 낮다. 반대로 외국인 주민 입장에서 더 값진 정보는 "이 서비스가 영어(또는 다른 언어)로 실제 응대되는가"다.

제안하는 우선순위:

1. **`supportLanguages` 같은 필드를 서비스 스키마에 추가** — 예: 출입국·다문화가족지원센터·관광안내 등 실제 다국어 지원 채널에 표시. 번역 없이도 즉시 가치를 준다.
   - **이 필드도 "절차 지어내기 금지" 원칙이 그대로 적용된다.** "아마 영어 될 것 같다"는 추측이 기계번역보다 위험하다 — 위기 상황에 119나 출입국 상담을 영어로 걸었다가 안 되면 번역 오류보다 실질적 피해가 크다. **운영기관이 공식적으로 명시한 경우에만 채우고, 근거 URL을 항목별로 같이 저장한다.** 근거를 못 찾으면 값을 비워둔다(추측으로 채우지 않음).
2. **번역은 서비스 운영기관이 실제로 제공하는 공식 영어 페이지가 있을 때만** 그 내용을 옮긴다 — 기계번역 절대 금지(위 원칙).
   - **번역이 없는 서비스는 `/en` 라우트 자체를 만들지 않는다** (한국어 원문 + "영어 정보 없음" 폴백 페이지를 찍어내지 않음). `i18n.en`이 있는 서비스만 `generateStaticParams`에 포함시켜 `/en/service/[slug]`가 존재하게 한다. 그 외 slug로 `/en/service/...`에 접근하면 한국어 원문 URL로 리다이렉트. 이유: 한국어 본문을 `hreflang="en"`으로 대량 노출하면 이미 서치콘솔/애드센스가 붙어 있는 도메인에서 중복 콘텐츠 신호가 된다.
3. 스키마는 `services.en.json`처럼 별도 파일을 만들지 않고 **기존 항목에 `i18n: { en: { name, summary, description, ... } }` 형태로 중첩** — id 드리프트 방지, "이 필드가 번역됐는가"를 항목 단위로 바로 확인 가능.

## 결정 사항 (2026-08-25 확정)

- **범위: `(main)`(공공) 섹션만.** `(discover)`(민간 사이트 모음)는 이번 범위에서 제외 — 사용자 확인 완료("discover말고").
- **쓰기 기능(게시판/신고/사이트제안) 영어화는 보류.** v1은 읽기 전용(콘텐츠 열람+검색)으로 진행, 쓰기 폼은 계속 한국어만.
- **번역 전략은 위 3번 원칙대로 진행**: `supportLanguages`(근거 URL 필수) 먼저 채우고, 번역은 공식 영어 페이지가 있는 소수 핵심 서비스부터 파일럿.

### 4단계에서 처리한 것

- **데이터 편집 방식 결정: (a) `data/services.json` 직접 편집.** `ServiceForm.tsx`에 `supportLanguages`/`i18n.en` 입력 UI를 새로 만드는 (b)안은 파일럿 2건 규모에는 과한 스코프라 보류 — 폼 UI는 파일럿이 몇 건 이상으로 늘어나 반복 편집 비용이 커질 때 다시 고려한다. 직접 편집 후 `npx prettier --write data/services.json`으로 포맷 정합성 확인(관리자 저장 시 재포맷 diff 방지).
- **파일럿 대상 2건 선정 및 근거 조사.** 긴급상황·법률/행정 카테고리에서 외국인 수요가 높은 서비스 다수(112·119·여성긴급전화1366·고용노동부1350·보건복지상담센터129 등)를 조사했으나, "운영기관이 공식적으로 명시" 기준을 충족하는 안정적 근거 URL을 못 찾은 건은 이번엔 제외했다(예: 119는 "9개 외국어 지원 앱"·"영어 통역 가능" 등 출처가 엇갈리고 1차 출처를 못 찾아 보류, 여성긴급전화1366은 다누리콜센터(1577-1366, 다문화가족 대상)와 번호가 비슷해 혼동 위험이 있고 1366 자체의 다국어 근거를 못 찾아 보류, 1350/129도 언어 목록이 불명확해 보류). 최종 반영 2건:
  - **`hikorea-immigration`**: `supportLanguages`(en, zh — hikorea.go.kr 자체 언어 선택 UI를 직접 fetch해 `lang_en`/`lang_ch` 존재 확인), `i18n.en`(name/summary/description/hours — hikorea.go.kr 영문판(`?locale=en`)에서 직접 확인한 문구·메뉴명 기반으로만 작성, 기계번역·절차 추정 없음).
  - **`police-112`**: `supportLanguages`(en, zh — korea.net(문화체육관광부 산하 대한민국 정부 공식 영문 뉴스) 기사 "Interpretation service for 112 police hotline expanded to 24/7" 근거). `i18n.en`은 미채움 — 112 전용 공식 영문 안내 페이지 원문을 직접 확인하지 못해 번역 텍스트를 새로 작성하지 않음(향후 `police.go.kr/eng` 등에서 원문 확보 시 추가).
- **robots.txt 페이지 단위 allow 전환.** `app/robots.ts`를 async로 바꿔 `getAllServices()`에서 `i18n.en`이 있는 서비스만 `/en/service/[slug]`를 개별 `allow`에 추가(크롤러는 가장 구체적인 규칙을 우선 적용하므로 `/en` 전체 `disallow`와 공존 가능). 나머지 `/en`은 여전히 disallow.
- **`generateMetadata`의 `robots` 페이지 단위 override.** `app/[lang]/(main)/service/[slug]/page.tsx`에 `lang === 'en' && hasEnTranslation`일 때만 `robots: { index: true, follow: true }`를 반환하도록 추가 — Next.js 메타데이터는 세그먼트 간 얕은 병합이라 자식이 `robots`를 정의하면 부모(`app/[lang]/layout.tsx`)의 `index:false`를 완전히 대체한다(공식 문서 "Merging > Overwriting fields" 확인). 번역 없는 en 페이지는 그대로 부모의 `noindex` 유지.
- **sitemap.ts에 번역 페이지 추가.** `i18n.en`이 있는 서비스의 `/en/service/[slug]`만 sitemap에 포함 — robots.txt allow 대상과 정확히 일치시켜 "색인 허용했는데 sitemap엔 없음" 불일치 방지.
- **빌드 산출물로 실제 동작 검증**: `.next/server/app/en/service`에 `hikorea-immigration.html` 1건만 생성(ko는 178건 그대로), 해당 HTML의 `<meta name="robots">`가 `index, follow`이고 다른 en 페이지(`/en/about` 등)는 여전히 `noindex, follow`임을 확인. `hreflang`(ko/en/x-default) 태그 정상 확인. `robots.txt` 산출물이 `Allow: /en/service/hikorea-immigration`을 `Disallow: /en`과 함께 내보내는 것 확인. `sitemap.xml`에 해당 URL 1건 포함 확인. 프로덕션 서버(`npm run start`) 기동 후 `curl`로 `/en/service/hikorea-immigration` → 200, `/en/service/police-112`(미번역) → 307 → `/service/police-112`(ko 접두사 없음) 확인. `/service/police-112`(ko) 페이지에 112의 언어 지원 pill과 근거 링크(korea.net)가 렌더링되는 것도 확인(번역 없이도 즉시 가치를 준다는 우선순위 1번 원칙 적용 사례).
- **⚠️ 이 변경은 크롤링 동작에 영향을 준다.** `/en/service/hikorea-immigration` 1개 URL이 이번에 처음으로 색인 허용 대상이 되며, 이미 서치콘솔·애드센스가 연결된 도메인이라는 점을 감안해 페이지 단위로만(전체 `/en` 해제 아님) 신중하게 넓혔다.

### 5단계에서 처리한 것

사용자 요청("내용들에 대해서도 이제 영어로 바꿔야해... 공식 영문 페이지가 없다면 없다고 별도의 뱃지같은걸로 표시를 해두면 되고")에 따라 4단계의 "공식 출처 있는 서비스만 번역" 원칙을 완화하고, 나머지 176개 서비스도 이 세션에서 직접(사람이) 한국어 원문을 영어로 옮겼다. 절차·사실 정보(전화번호, URL, 운영시간, 신청 절차 순서)는 원문에서 바꾸지 않았고, 존재하지 않는 정보를 새로 지어내지 않았다 — 이 점에서 [[절차 관련 내용 지어내기 금지]] 원칙과 충돌하지 않는다고 판단했다. 다만 자동 색인 확대라는 부작용을 advisor 상담으로 먼저 짚어내 별도로 차단했다.

- **번역 출처를 `official` 플래그로 분리** (`types/service.ts`의 `ServiceTranslation.official?: boolean`). `hikorea-immigration`(4단계에서 공식 영문 페이지 기반으로 작성)만 `official: true`로 명시하고, 이번에 새로 채운 177건(police-112 포함)은 플래그를 넣지 않아 "비공식(사람이 옮긴 번역)"이 기본값이 되도록 했다.
- **"번역 있음"과 "색인 허용"을 완전히 분리.** 필두 지적: `i18n.en` 존재 여부 하나로 프리렌더·robots·sitemap·hreflang을 전부 걸어버리면 177개 서비스가 한 번에 색인 허용 대상이 되어 버린다(4단계 경고문의 "1개 URL"이 조용히 177개가 됨) — 서치콘솔·애드센스가 붙은 도메인에서 얇은 콘텐츠 대량 노출 위험. 그래서:
  - **번역 존재 여부**(`i18n.en` 있음)로 게이팅: `generateStaticParams`(프리렌더), `resolveServiceForLocale`(화면 표시), 미번역 리다이렉트 분기 — 즉 178개 서비스 모두 `/en/service/[slug]`가 실제로 렌더링되고 사람이 읽을 수 있다.
  - **공식 출처 여부**(`i18n.en.official`)로 게이팅: `app/robots.ts`의 개별 `Allow`, `app/sitemap.ts` 포함 여부, `service/[slug]/page.tsx`의 `generateMetadata` robots 오버라이드, `alternates.languages`(hreflang) — 즉 여전히 `hikorea-immigration` 1건만 색인 허용·hreflang 대상이고 나머지 177건은 `noindex` 그대로 유지된다.
  - 빌드 산출물로 검증: `/en/service/` 177건 모두 `.next` 프리렌더 목록에 포함, `robots.txt`의 `Allow`는 여전히 1줄, `sitemap.xml`의 en 서비스 URL도 1건.
- **번역 신뢰도 뱃지 2종을 `ServiceDetail`에 추가** — 하나로 합치지 않고 조건을 분리:
  1. `unofficialTranslationNotice`: `i18n.en`은 있지만 `official`이 아닐 때(177건) — "이 영문은 여기다가 직접 옮긴 참고용 번역이며 운영기관의 공식 자료가 아니다. 중요한 내용은 한국어 원문에서 다시 확인하라"는 안내.
  2. `koreanOnlyContactNotice`: `supportLanguages`에 `en` 항목이 없을 때 — "이 서비스의 실제 전화·대면 상담이 영어로 되는지 확인된 바 없다"는 안내. `police-112`처럼 `supportLanguages`에 `en`이 있는 서비스는 이 문구가 안 뜬다. 두 조건 다 해당하면 두 문구가 함께 표시된다(예: `mental-health-crisis-109`). 번역이 실제 전화 응대 가능 언어를 보장하는 것으로 오인되지 않도록 하는 것이 목적 — `supportLanguages`(근거 URL 필수)는 이번에도 손대지 않았다.
- **카테고리 18개도 `i18n.en`(name/description) 전량 번역.** `types/service.ts`에 `Category.i18n?.en` 추가, `lib/services.ts`에 `resolveCategoryForLocale()` 신설(서비스 쪽 `resolveServiceForLocale`과 동일 패턴). 카테고리명·설명은 사이트 자체 안내문(예: "법률/행정 상담 서비스 모음")이라 관공서 절차를 서술하는 게 아니므로 공식 출처 없이도 직접 번역해도 원칙 위반이 아니라고 판단, `official` 플래그 없이 전량 적용.
- **카테고리 이름이 노출되는 모든 지점을 로케일 인지로 정리** — 이전엔 `service/[slug]`의 `generateMetadata` 번역 로직만 있었고, 카테고리명은 `ServiceCard`(서비스 카드 뱃지), `CategoryNav`(홈 화면 카테고리 목록), `Header`/`HeaderNav`(상단 카테고리 드롭다운·모바일 메뉴), `service/[slug]`의 `keywords`/JSON-LD `serviceType`·breadcrumb, `app/[lang]/layout.tsx`의 `SITE_KEYWORDS`, `category/[slug]` 페이지 자체(h1/설명/메타데이터/JSON-LD) 등 곳곳에 한국어로 하드코딩돼 있었다. 전부 `resolveCategoryForLocale()`을 거치도록 고쳐서 en 페이지에 한국어 카테고리명이 섞여 나오는 걸 막았다.
- **`category/[slug]/page.tsx` 부수 수정**: (a) 이 페이지가 `getServicesByCategory()`가 반환한 원본(한국어) 서비스 배열을 그대로 `ServiceCard`에 넘기고 있어서, en 카테고리 목록 페이지에 번역된 서비스명이 아니라 한국어 원문이 그대로 노출되는 버그가 있었다 — `resolveServiceForLocale()`을 통과시키도록 수정. (b) `generateMetadata`가 `lang`을 아예 안 받고 있어 en 페이지의 canonical이 항상 한국어 URL(`/category/...`, `/en` 접두사 없음)을 가리키던 버그도 함께 고침(`localeHref` 적용). (c) JSON-LD breadcrumb의 `'홈'` 하드코딩을 `dict.home`으로 정리 — 3단계에서 service 페이지에 적용한 것과 동일한 정리라 4단계 문서의 "다음 단계 6번"에 있던 항목이 이걸로 완료됨.
- **범위 밖으로 남긴 것(의도적)**: 가이드(`guides/[slug]`, `guides` 목록) 본문은 이번에도 번역하지 않았다 — 서비스 178개와 별개로 가이드 글 자체가 큰 콘텐츠 트랙이라 사용자가 요청한 "서비스 카테고리나 안에 내용들"의 범위로 보지 않았다. 가이드 페이지의 `generateStaticParams`도 여전히 `{slug}`만 반환해 3단계 이전 서비스 페이지와 같은 방식으로 모든 가이드가 en에도 크로스곱 프리렌더되는 상태이며(부모 layout의 `noindex`로 색인은 막혀 있음), 번역 없는 한국어 그대로 노출된다 — 후속 작업이 필요하면 별도로 다룬다.
  - `lib/search.ts`가 한국어 인덱스 전용이라 en 카테고리 페이지의 검색창은 여전히 "한국어 콘텐츠만 검색합니다" 안내로 대체돼 있다(2단계 결정) — 이제 178개 서비스 모두 영문 name/summary가 있으니 이 안내가 다소 낡았지만, 검색 인덱스 다국어화는 이번 스코프 밖.

## 다음 단계

1. ~~라우팅 마이그레이션~~ — 완료 (1단계).
2. ~~Dictionary + Header 언어 스위처~~ — 완료 (2단계).
3. ~~서비스 스키마에 `supportLanguages`(근거 URL 포함), `i18n.en` 필드 추가 + `/en/service/[slug]` `generateStaticParams`/redirect 분기~~ — 완료 (3단계).
4. ~~핵심 카테고리 서비스 2건(`hikorea-immigration`, `police-112`) `supportLanguages`/`i18n.en` 파일럿 + robots 페이지 단위 해제~~ — 완료 (4단계).
5. ~~카테고리 18개 + 서비스 178개 전량 `i18n.en` 번역(공식/비공식 분리, 색인은 공식만 허용) + 카테고리명 로케일 인지 전면 적용~~ — 완료 (5단계).
6. (선택) `lib/search.ts` 다국어 검색 인덱스 — en 페이지 검색창의 "한국어만 검색됩니다" 안내가 이제 178개 서비스 전부 영문명이 있는 상태와 안 맞음. Fuse.js 인덱스를 로케일별로 분리하거나 name/summary(en) 필드까지 포함하도록 확장 검토.
7. (선택) 가이드(`guides/`) 콘텐츠 번역 — 서비스와 별개의 콘텐츠 트랙. 번역하기로 하면 `guides/[slug]/page.tsx`의 `generateStaticParams`를 서비스 3단계와 동일하게 `{lang, slug}` 쌍 반환 + 번역 없는 slug만 필터링하는 방식으로 먼저 고쳐야 한다(현재는 무조건 크로스곱 프리렌더).
8. (선택) 이번에 채운 177건 중 실제로 공식 영문 자료를 찾을 수 있는 서비스는 조사해서 `official: true`로 승격하고 robots.ts/sitemap.ts 허용 대상에 추가 — 4단계 파일럿 확대의 연장선.
