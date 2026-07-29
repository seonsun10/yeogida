<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-07-26 | Updated: 2026-07-26 -->

# public

## Purpose
정적 자산 루트. Next.js 기본 스캐폴딩 SVG 아이콘들과, `/admin`에서 업로드한 서비스 썸네일·상세 이미지가 저장되는 디렉토리를 포함한다.

## Key Files
| File | Description |
|------|-------------|
| `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | `create-next-app` 기본 아이콘 — 현재 앱에서 실사용되는지 확인 후 미사용이면 정리 가능 |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `uploads/` | `app/admin/actions.ts`의 `saveImageFile`이 `<slug>/` 하위에 저장하는 실제 업로드 이미지(썸네일·상세 이미지). Git에 커밋되는 런타임 데이터이므로 삭제 시 `data/services.json`의 참조도 깨진다 |
| `thumbnails/` | 썸네일 관련 예약 디렉토리 (현재 코드상 실제 쓰기는 `uploads/<slug>/thumbnail-*`에 이루어짐 — 이름 혼동 주의) |

## For AI Agents

### Working In This Directory
- `uploads/` 안의 파일을 임의로 삭제하지 말 것 — `data/services.json`의 `thumbnail`/`images` 필드가 이 경로들을 직접 참조한다. 삭제는 반드시 `/admin`의 삭제 액션(`deleteServiceImage`/`deleteServiceThumbnail`)을 통해 JSON과 함께 정리한다.
- `.gitignore`에 업로드 디렉토리가 포함되어 있는지 확인 후 작업할 것 — 로컬에만 있는 업로드 파일과 배포 환경의 파일이 다를 수 있다(서버리스/읽기전용 배포 환경에서는 `/admin` 자체가 프로덕션에서 비활성화되어 있으므로 실제 쓰기는 로컬 개발에서만 발생).

<!-- MANUAL: -->
