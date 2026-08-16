// 신고(reports) 테이블 최초 생성 스크립트. DATABASE_URL이 준비된 뒤 1회 실행한다.
// 실행: node --env-file=.env.local scripts/db-init.mjs
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL 환경변수가 없습니다. .env.local을 확인하세요.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    service_slug TEXT NOT NULL,
    reason TEXT NOT NULL,
    detail TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    reporter_ip TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

// 기존에 테이블이 있던 환경(reporter_ip 도입 전) 대비 — 재실행해도 안전
await sql`
  ALTER TABLE reports ADD COLUMN IF NOT EXISTS reporter_ip TEXT
`;

await sql`
  CREATE INDEX IF NOT EXISTS reports_service_slug_idx ON reports (service_slug)
`;

await sql`
  CREATE INDEX IF NOT EXISTS reports_slug_ip_idx ON reports (service_slug, reporter_ip)
`;

console.log('reports 테이블 준비 완료.');
