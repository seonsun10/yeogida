#!/usr/bin/env node
/**
 * data/services.json의 url이 살아있는지 점검하고, 문제가 있으면 GitHub 이슈를 생성/갱신한다.
 * GITHUB_TOKEN 환경변수가 없으면(로컬 실행) 콘솔에만 리포트를 출력하고 이슈 작업은 생략한다.
 */
import { readFile } from 'node:fs/promises';
import { constants as cryptoConstants } from 'node:crypto';
import { Agent, fetch } from 'undici';

const TIMEOUT_MS = 15000;
const CONCURRENCY = 8;
const ISSUE_TITLE = '🔗 링크 점검 리포트';
// 봇 UA를 차단하는 국내 기관 사이트가 많아 브라우저로 위장한다.
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

// 국내 공공기관 서버 상당수가 예전 방식(legacy) SSL 재협상을 쓰는데, Node 기본 OpenSSL 설정은
// 이를 보안상 차단해 멀쩡한 사이트도 "네트워크 오류"로 오탐된다. 응답만 확인하는 GET 요청이라
// (인증정보 없음) 허용해도 위험이 낮아 이 옵션으로 완화한다.
const agent = new Agent({
  connect: {
    secureOptions: cryptoConstants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
  },
});

async function loadServices() {
  const url = new URL('../data/services.json', import.meta.url);
  const raw = await readFile(url, 'utf8');
  return JSON.parse(raw);
}

async function fetchOnce(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html,*/*' },
      dispatcher: agent,
    });
    // 상태 코드만 필요하므로 본문은 바로 취소한다 — 안 하면 undici가 연결을 계속 붙들고 있어
    // (풀 커넥션 미반환) 101건 순회가 눈에 띄게 느려진다.
    await res.body?.cancel();
    return { ok: true, status: res.status };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}

// 일시적 오류로 인한 오탐을 줄이기 위해 실패 시 1회 재시도한다.
async function checkUrl(url) {
  let result = await fetchOnce(url);
  if (!result.ok || result.status >= 400) {
    result = await fetchOnce(url);
  }
  if (!result.ok) {
    return { status: 'needs-check', detail: `네트워크 오류: ${result.error}` };
  }
  if (result.status >= 200 && result.status < 400) {
    return { status: 'ok', detail: `HTTP ${result.status}` };
  }
  if (result.status === 403 || result.status === 429) {
    return {
      status: 'needs-check',
      detail: `HTTP ${result.status} (봇 차단일 수 있음, 직접 확인 필요)`,
    };
  }
  return { status: 'broken', detail: `HTTP ${result.status}` };
}

async function checkAll(services) {
  const results = [];
  for (let i = 0; i < services.length; i += CONCURRENCY) {
    const batch = services.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(async (service) => ({
        service,
        ...(await checkUrl(service.url)),
      })),
    );
    results.push(...batchResults);
  }
  return results;
}

const SLUG_MARKER_RE = /<!-- link-check-slugs: (.*?) -->/;

function buildReportBody(results, checkedAt, problemSlugs) {
  const broken = results.filter((r) => r.status === 'broken');
  const needsCheck = results.filter((r) => r.status === 'needs-check');
  const okCount = results.length - broken.length - needsCheck.length;

  const section = (title, items) => {
    if (items.length === 0) return '';
    const lines = items.map(
      (r) => `- **${r.service.name}** (\`${r.service.slug}\`) — ${r.detail}\n  - ${r.service.url}`,
    );
    return `\n### ${title} (${items.length}건)\n${lines.join('\n')}\n`;
  };

  return (
    `점검 시각: ${checkedAt}\n` +
    `전체 ${results.length}건 중 정상 ${okCount}건` +
    section('⛔ 끊김 — URL 교체 필요', broken) +
    section('⚠️ 확인 필요 — 접속 차단일 수도, 진짜 다운일 수도 있음', needsCheck) +
    `\n\`/admin/{slug}\` 경로에서 해당 서비스를 찾아 수정하세요.\n` +
    `\n<!-- link-check-slugs: ${JSON.stringify([...problemSlugs])} -->\n`
  );
}

// 이슈 본문 수정만으로는 GitHub이 알림을 보내지 않는다(코멘트/열기/닫기만 알림 발생).
// 그래서 지난 점검 대비 "새로 문제가 생긴" 항목이 있을 때만 코멘트를 남겨 알림을 발생시키고,
// 기존 문제가 그대로거나 줄었을 뿐이면 본문만 조용히 갱신한다.
function previousProblemSlugs(issueBody) {
  const match = issueBody?.match(SLUG_MARKER_RE);
  if (!match) return null;
  try {
    return new Set(JSON.parse(match[1]));
  } catch {
    return null;
  }
}

async function githubRequest(path, options = {}) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  const res = await fetch(`https://api.github.com/repos/${repo}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub API ${path} 실패: ${res.status} ${await res.text()}`);
  }
  return res.status === 204 ? null : res.json();
}

// 존재하지 않는 레이블을 issues API에 넘겼을 때의 동작이 공식 문서상 불명확해
// (자동 생성/무시/에러가 문서마다 다르게 설명됨) 레이블 없이 제목만으로 찾는다.
async function findOpenIssue() {
  const issues = await githubRequest('/issues?state=open&per_page=30');
  return issues.find((issue) => issue.title === ISSUE_TITLE) ?? null;
}

async function reportToGitHub(results, checkedAt) {
  const problems = results.filter((r) => r.status !== 'ok');
  const problemSlugs = new Set(problems.map((r) => r.service.slug));
  const existing = await findOpenIssue();

  if (problems.length === 0) {
    if (existing) {
      await githubRequest(`/issues/${existing.number}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          body: `모두 정상으로 확인되어 자동으로 닫습니다. (${checkedAt})`,
        }),
      });
      await githubRequest(`/issues/${existing.number}`, {
        method: 'PATCH',
        body: JSON.stringify({ state: 'closed' }),
      });
      console.log(`이슈 #${existing.number} 자동 종료`);
    } else {
      console.log('모든 링크 정상, 열린 리포트 없음 — 조치 없음');
    }
    return;
  }

  const body = buildReportBody(results, checkedAt, problemSlugs);

  if (!existing) {
    const created = await githubRequest('/issues', {
      method: 'POST',
      body: JSON.stringify({ title: ISSUE_TITLE, body }),
    });
    console.log(`이슈 #${created.number} 생성`);
    return;
  }

  const previousSlugs = previousProblemSlugs(existing.body);
  // 마커를 못 읽으면(예전 형식 등) 안전하게 "전부 새 문제"로 취급해 알림이 누락되지 않게 한다.
  const newlyBroken = previousSlugs
    ? problems.filter((r) => !previousSlugs.has(r.service.slug))
    : problems;

  await githubRequest(`/issues/${existing.number}`, {
    method: 'PATCH',
    body: JSON.stringify({ body }),
  });

  if (newlyBroken.length > 0) {
    const lines = newlyBroken.map(
      (r) => `- **${r.service.name}** (\`${r.service.slug}\`) — ${r.detail}`,
    );
    await githubRequest(`/issues/${existing.number}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        body: `새로 문제가 발견됐습니다 (${checkedAt}):\n${lines.join('\n')}`,
      }),
    });
    console.log(`이슈 #${existing.number} 업데이트 + 신규 문제 ${newlyBroken.length}건 코멘트`);
  } else {
    console.log(`이슈 #${existing.number} 업데이트 (신규 문제 없음, 조용히 갱신)`);
  }
}

const DISCORD_CONTENT_LIMIT = 1900; // Discord 메시지 2000자 제한에 여유를 둔 값

function buildDiscordMessage(results, checkedAt) {
  const broken = results.filter((r) => r.status === 'broken');
  const needsCheck = results.filter((r) => r.status === 'needs-check');
  const okCount = results.length - broken.length - needsCheck.length;

  if (broken.length === 0 && needsCheck.length === 0) {
    return `🔗 **링크 점검 완료** (${checkedAt})\n전체 ${results.length}건 모두 정상 ✅`;
  }

  const lines = [
    `🔗 **링크 점검 완료** (${checkedAt})`,
    `정상 ${okCount} / 확인필요 ${needsCheck.length} / 끊김 ${broken.length}`,
    '',
  ];
  for (const r of [...broken, ...needsCheck]) {
    const icon = r.status === 'broken' ? '⛔' : '⚠️';
    lines.push(`${icon} ${r.service.name} (\`${r.service.slug}\`) — ${r.detail}`);
  }

  let content = lines.join('\n');
  if (content.length > DISCORD_CONTENT_LIMIT) {
    content = `${content.slice(0, DISCORD_CONTENT_LIMIT)}\n… (내용이 길어 일부 생략)`;
  }
  return content;
}

// DISCORD_WEBHOOK_URL이 없으면(로컬 실행 등) 조용히 건너뛴다.
async function notifyDiscord(results, checkedAt) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: buildDiscordMessage(results, checkedAt) }),
  });
  if (!res.ok) {
    console.error(`Discord 알림 실패: ${res.status} ${await res.text()}`);
    return;
  }
  console.log('Discord 알림 전송 완료');
}

async function main() {
  const services = await loadServices();
  const checkedAt = new Date().toISOString();
  console.log(`${services.length}개 서비스 URL 점검 시작...`);
  const results = await checkAll(services);

  const broken = results.filter((r) => r.status === 'broken');
  const needsCheck = results.filter((r) => r.status === 'needs-check');
  console.log(
    `정상 ${results.length - broken.length - needsCheck.length}건 / 확인필요 ${needsCheck.length}건 / 끊김 ${broken.length}건`,
  );
  [...broken, ...needsCheck].forEach((r) => {
    console.log(`  [${r.status}] ${r.service.name} (${r.service.slug}) — ${r.detail}`);
  });

  if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPOSITORY) {
    await reportToGitHub(results, checkedAt);
  } else {
    console.log('\n(GITHUB_TOKEN 없음 — 로컬 실행으로 간주, 이슈 생성/갱신 생략)');
  }

  await notifyDiscord(results, checkedAt);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
