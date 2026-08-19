#!/usr/bin/env node
/**
 * data/sites.json에 등록된 각 사이트의 홈페이지에서 og:image(메인 화면 대표 이미지) 또는
 * 로고/파비콘을 실제로 가져와 public/uploads/sites/<slug>/thumbnail-auto.<ext>에 저장하고
 * thumbnail 필드를 채운다. thumbnail이 이미 채워진 사이트는 건너뛴다(재실행 안전).
 *
 * 우선순위: og:image > og:image:secure_url > twitter:image > apple-touch-icon > icon
 *          > Google 파비콘 서비스(마지막 폴백, 항상 PNG)
 * next/image 최적화가 기본적으로 SVG를 지원하지 않고 관리자 업로드 폼도 ico/svg를 허용하지
 * 않으므로(app/(main)/admin/sites/actions.ts의 ALLOWED_IMAGE_EXTENSIONS) 해당 형식은 건너뛴다.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { constants as cryptoConstants } from 'node:crypto';
import { Agent, fetch } from 'undici';
import prettier from 'prettier';

const TIMEOUT_MS = 10000;
const CONCURRENCY = 6;
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const ALLOWED_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);
// 카드 썸네일용 이미지치고 과도하게 큰 파일(예: 애니메이션 GIF 원본)은 건너뛰고 다음 후보로 넘어간다.
const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024;
const CONTENT_TYPE_EXT = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

const SITES_PATH = new URL('../data/sites.json', import.meta.url);
const UPLOADS_ROOT = new URL('../public/uploads/sites/', import.meta.url);

// 국내 사이트 중 구버전 SSL 재협상을 쓰는 서버가 있어(check-links.mjs와 동일한 이유) 완화한다.
const agent = new Agent({
  connect: {
    secureOptions: cryptoConstants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
  },
});

async function loadSites() {
  const raw = await readFile(SITES_PATH, 'utf8');
  return JSON.parse(raw);
}

async function saveSites(sites) {
  const formatted = await prettier.format(JSON.stringify(sites), {
    filepath: 'sites.json',
  });
  await writeFile(SITES_PATH, formatted, 'utf8');
}

function withTimeout(signal) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  if (signal) {
    signal.addEventListener('abort', () => controller.abort());
  }
  return { signal: controller.signal, cancel: () => clearTimeout(timer) };
}

async function fetchHtml(url) {
  const { signal, cancel } = withTimeout();
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal,
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html,*/*' },
      dispatcher: agent,
    });
    if (!res.ok) {
      await res.body?.cancel();
      return null;
    }
    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('text/html')) {
      await res.body?.cancel();
      return null;
    }
    const html = await res.text();
    return { html, finalUrl: res.url || url };
  } catch {
    return null;
  } finally {
    cancel();
  }
}

// 다운로드해서 유효한 래스터 이미지인지 확인한다. 성공 시 {buffer, ext}를 반환.
async function tryDownloadImage(imageUrl) {
  const { signal, cancel } = withTimeout();
  try {
    const res = await fetch(imageUrl, {
      method: 'GET',
      redirect: 'follow',
      signal,
      headers: { 'User-Agent': USER_AGENT, Accept: 'image/*' },
      dispatcher: agent,
    });
    if (!res.ok) {
      await res.body?.cancel();
      return null;
    }
    const contentType = (res.headers.get('content-type') ?? '').split(';')[0].trim();
    let ext = CONTENT_TYPE_EXT[contentType];
    if (!ext) {
      const urlExt = path.extname(new URL(res.url || imageUrl).pathname).toLowerCase();
      if (ALLOWED_EXT.has(urlExt)) ext = urlExt;
    }
    if (!ext) {
      await res.body?.cancel();
      return null;
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length < 64) return null; // 빈 파일/오류 페이지 방어
    if (buffer.length > MAX_IMAGE_BYTES) return null;
    return { buffer, ext };
  } catch {
    return null;
  } finally {
    cancel();
  }
}

function extractTags(html, tagName) {
  const re = new RegExp(`<${tagName}\\b[^>]*>`, 'gi');
  return html.match(re) ?? [];
}

function readAttr(tag, name) {
  const re = new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i');
  const m = tag.match(re);
  return m ? (m[1] ?? m[2] ?? '') : null;
}

function iconSizeScore(sizesAttr) {
  if (!sizesAttr) return 0;
  const match = sizesAttr.match(/(\d+)x\d+/i);
  return match ? Number(match[1]) : 0;
}

// og:image류, apple-touch-icon, icon 순으로 후보 이미지 URL 목록을 만든다.
function extractCandidates(html, baseUrl) {
  const candidates = [];

  const metaTags = extractTags(html, 'meta');
  const metaOrder = ['og:image:secure_url', 'og:image', 'twitter:image'];
  for (const key of metaOrder) {
    for (const tag of metaTags) {
      const prop = readAttr(tag, 'property') ?? readAttr(tag, 'name');
      if (prop?.toLowerCase() === key) {
        const content = readAttr(tag, 'content');
        if (content) candidates.push(content);
      }
    }
  }

  const linkTags = extractTags(html, 'link');
  const appleTouch = linkTags
    .filter((tag) => (readAttr(tag, 'rel') ?? '').toLowerCase().includes('apple-touch-icon'))
    .sort((a, b) => iconSizeScore(readAttr(b, 'sizes')) - iconSizeScore(readAttr(a, 'sizes')));
  for (const tag of appleTouch) {
    const href = readAttr(tag, 'href');
    if (href) candidates.push(href);
  }

  const icons = linkTags
    .filter((tag) => {
      const rel = (readAttr(tag, 'rel') ?? '').toLowerCase();
      return rel === 'icon' || rel === 'shortcut icon';
    })
    .sort((a, b) => iconSizeScore(readAttr(b, 'sizes')) - iconSizeScore(readAttr(a, 'sizes')));
  for (const tag of icons) {
    const href = readAttr(tag, 'href');
    if (href) candidates.push(href);
  }

  return candidates
    .map((href) => {
      try {
        return new URL(href, baseUrl).toString();
      } catch {
        return null;
      }
    })
    .filter((url) => url && !url.toLowerCase().endsWith('.svg') && !url.toLowerCase().endsWith('.ico'));
}

function googleFaviconFallback(siteUrl) {
  const host = new URL(siteUrl).hostname;
  return `https://www.google.com/s2/favicons?sz=128&domain=${encodeURIComponent(host)}`;
}

async function resolveThumbnail(site) {
  const attempts = [];
  const homepage = await fetchHtml(site.url);
  const candidates = homepage ? extractCandidates(homepage.html, homepage.finalUrl) : [];

  for (const candidateUrl of candidates.slice(0, 5)) {
    attempts.push(candidateUrl);
    const result = await tryDownloadImage(candidateUrl);
    if (result) return { ...result, source: candidateUrl, method: 'site' };
  }

  const fallbackUrl = googleFaviconFallback(site.url);
  attempts.push(fallbackUrl);
  const fallbackResult = await tryDownloadImage(fallbackUrl);
  if (fallbackResult) return { ...fallbackResult, source: fallbackUrl, method: 'google-favicon' };

  return { failed: true, attempts };
}

async function processSite(site) {
  const result = await resolveThumbnail(site);
  if (result.failed) {
    console.log(`  [실패] ${site.name} (${site.slug}) — 이미지 후보 없음`);
    return { slug: site.slug, status: 'failed' };
  }

  const dir = new URL(`${site.slug}/`, UPLOADS_ROOT);
  await mkdir(dir, { recursive: true });
  const fileName = `thumbnail-auto${result.ext}`;
  await writeFile(new URL(fileName, dir), result.buffer);

  site.thumbnail = `/uploads/sites/${site.slug}/${fileName}`;
  console.log(
    `  [완료] ${site.name} (${site.slug}) — ${result.method === 'google-favicon' ? 'Google 파비콘 폴백' : '사이트 이미지'}: ${result.source}`,
  );
  return { slug: site.slug, status: 'ok', method: result.method };
}

async function main() {
  const sites = await loadSites();
  const targets = sites.filter((site) => !site.thumbnail);
  console.log(
    `전체 ${sites.length}개 중 썸네일 미등록 ${targets.length}개 처리 시작 (동시 ${CONCURRENCY})...`,
  );

  const results = [];
  for (let i = 0; i < targets.length; i += CONCURRENCY) {
    const batch = targets.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map((site) => processSite(site)));
    results.push(...batchResults);
    await saveSites(sites); // 중간에 중단돼도 지금까지의 진행분은 보존
  }

  const ok = results.filter((r) => r.status === 'ok');
  const googleFallback = ok.filter((r) => r.method === 'google-favicon');
  const failed = results.filter((r) => r.status === 'failed');
  console.log(
    `\n완료: 성공 ${ok.length}건 (그중 Google 폴백 ${googleFallback.length}건) / 실패 ${failed.length}건`,
  );
  if (failed.length > 0) {
    console.log('실패 목록:', failed.map((r) => r.slug).join(', '));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
