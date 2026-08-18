'use server';

import { headers } from 'next/headers';
import { getServiceBySlug } from '@/lib/services';
import { createReport, hasRecentReportFromIp } from '@/lib/reports';
import {
  REPORT_DETAIL_MAX_LENGTH,
  REPORT_RATE_LIMIT_HOURS,
  REPORT_REASON_OPTIONS,
} from '@/lib/report-constants';

export type ReportActionState = { error?: string; message?: string } | undefined;

async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return headersList.get('x-real-ip') ?? 'unknown';
}

export async function submitReport(
  serviceSlug: string,
  _prevState: ReportActionState,
  formData: FormData,
): Promise<ReportActionState> {
  const reason = String(formData.get('reason') ?? '').trim();
  const detail = String(formData.get('detail') ?? '').trim();

  if (!(await getServiceBySlug(serviceSlug))) {
    return { error: '존재하지 않는 서비스입니다.' };
  }
  if (!REPORT_REASON_OPTIONS.includes(reason as (typeof REPORT_REASON_OPTIONS)[number])) {
    return { error: '어떤 정보가 잘못됐는지 선택해주세요.' };
  }
  if (detail.length > REPORT_DETAIL_MAX_LENGTH) {
    return {
      error: `상세 내용은 ${REPORT_DETAIL_MAX_LENGTH}자 이내로 입력해주세요.`,
    };
  }

  const reporterIp = await getClientIp();

  try {
    if (await hasRecentReportFromIp(serviceSlug, reporterIp)) {
      return {
        error: `이미 신고하신 서비스입니다. ${REPORT_RATE_LIMIT_HOURS}시간 후에 다시 신고할 수 있어요.`,
      };
    }
    await createReport({ serviceSlug, reason, detail, reporterIp });
  } catch {
    return { error: '신고 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.' };
  }

  return { message: '신고가 접수되었습니다. 확인 후 반영하겠습니다.' };
}
