import { getDb } from '@/lib/db';
import {
  REPORT_DETAIL_MAX_LENGTH,
  REPORT_RATE_LIMIT_HOURS,
  REPORT_REASON_MAX_LENGTH,
} from '@/lib/report-constants';
import type { Report, ReportStatus } from '@/types/report';

type ReportRow = {
  id: number;
  service_slug: string;
  reason: string;
  detail: string | null;
  status: ReportStatus;
  created_at: string | Date;
};

function mapRow(row: ReportRow): Report {
  return {
    id: row.id,
    serviceSlug: row.service_slug,
    reason: row.reason,
    detail: row.detail,
    status: row.status,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function createReport(input: {
  serviceSlug: string;
  reason: string;
  detail: string;
  reporterIp: string;
}): Promise<void> {
  const sql = getDb();
  const reason = input.reason.slice(0, REPORT_REASON_MAX_LENGTH);
  const detail = input.detail.slice(0, REPORT_DETAIL_MAX_LENGTH) || null;

  await sql`
    INSERT INTO reports (service_slug, reason, detail, reporter_ip)
    VALUES (${input.serviceSlug}, ${reason}, ${detail}, ${input.reporterIp})
  `;
}

export async function hasRecentReportFromIp(
  serviceSlug: string,
  reporterIp: string,
): Promise<boolean> {
  const sql = getDb();
  const rows = (await sql`
    SELECT 1 FROM reports
    WHERE service_slug = ${serviceSlug}
      AND reporter_ip = ${reporterIp}
      AND created_at > now() - (${REPORT_RATE_LIMIT_HOURS} || ' hours')::interval
    LIMIT 1
  `) as unknown[];
  return rows.length > 0;
}

export async function getAllReports(): Promise<Report[]> {
  const sql = getDb();
  const rows = (await sql`
    SELECT id, service_slug, reason, detail, status, created_at
    FROM reports
    ORDER BY created_at DESC
  `) as ReportRow[];

  return rows.map(mapRow);
}

export async function updateReportStatus(
  id: number,
  status: ReportStatus,
): Promise<void> {
  const sql = getDb();
  await sql`UPDATE reports SET status = ${status} WHERE id = ${id}`;
}
