export type ReportStatus = 'pending' | 'resolved' | 'dismissed';

export type Report = {
  id: number;
  serviceSlug: string;
  reason: string;
  detail: string | null;
  status: ReportStatus;
  createdAt: string;
};
