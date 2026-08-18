import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllReports } from '@/lib/reports';
import { dismissReport, resolveReport } from '@/app/(main)/admin/actions';
import type { Report, ReportStatus } from '@/types/report';

export const dynamic = 'force-dynamic';

const STATUS_LABEL: Record<ReportStatus, string> = {
  pending: '대기',
  resolved: '처리완료',
  dismissed: '반려',
};

const STATUS_VARIANT: Record<ReportStatus, 'default' | 'secondary' | 'outline'> = {
  pending: 'default',
  resolved: 'secondary',
  dismissed: 'outline',
};

export default async function AdminReportsPage() {
  let reports: Report[] = [];
  let loadError: string | null = null;

  try {
    reports = await getAllReports();
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : '신고 목록을 불러오지 못했습니다.';
  }

  if (loadError) {
    return (
      <div className="rounded-md border border-dashed p-6 text-sm text-zinc-500">
        {loadError} (Neon DB 연동 전에는 신고 목록을 불러올 수 없습니다.)
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold">잘못된 정보 신고 ({reports.length})</h1>
        <p className="text-sm text-zinc-500">
          방문자가 상세페이지에서 보낸 신고 내역입니다.
        </p>
      </div>

      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-zinc-500">
            <tr>
              <th className="px-4 py-2 font-medium">서비스</th>
              <th className="px-4 py-2 font-medium">사유</th>
              <th className="px-4 py-2 font-medium">상세</th>
              <th className="px-4 py-2 font-medium">상태</th>
              <th className="px-4 py-2 font-medium">접수일</th>
              <th className="px-4 py-2 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/${report.serviceSlug}`}
                    className="font-medium text-zinc-900 hover:underline"
                  >
                    {report.serviceSlug}
                  </Link>
                </td>
                <td className="px-4 py-2 text-zinc-600">{report.reason}</td>
                <td className="max-w-xs px-4 py-2 text-zinc-600">
                  {report.detail ?? '—'}
                </td>
                <td className="px-4 py-2">
                  <Badge variant={STATUS_VARIANT[report.status]}>
                    {STATUS_LABEL[report.status]}
                  </Badge>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-zinc-500">
                  {new Date(report.createdAt).toLocaleDateString('ko-KR')}
                </td>
                <td className="px-4 py-2 text-right whitespace-nowrap">
                  {report.status === 'pending' && (
                    <div className="flex justify-end gap-2">
                      <form action={resolveReport.bind(null, report.id)}>
                        <Button type="submit" size="sm" variant="outline">
                          처리완료
                        </Button>
                      </form>
                      <form action={dismissReport.bind(null, report.id)}>
                        <Button type="submit" size="sm" variant="ghost">
                          반려
                        </Button>
                      </form>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-zinc-400">
                  접수된 신고가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
