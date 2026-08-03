import fs from 'node:fs/promises';
import path from 'node:path';

export const LINK_CHECK_STATUS_PATH = path.join(
  process.cwd(),
  'data',
  'link-check-status.json',
);

export type LinkCheckStatus = {
  checkedAt: string;
  total: number;
  ok: number;
  needsCheck: number;
  broken: number;
};

// scripts/check-links.mjs가 매주 실행 후 이 파일을 갱신·커밋한다 — 아직 한 번도
// 실행되지 않았거나(로컬 최초 클론) 파일이 없는 경우를 대비해 null로 처리한다.
export async function getLinkCheckStatus(): Promise<LinkCheckStatus | null> {
  try {
    const raw = await fs.readFile(LINK_CHECK_STATUS_PATH, 'utf-8');
    return JSON.parse(raw) as LinkCheckStatus;
  } catch {
    return null;
  }
}
