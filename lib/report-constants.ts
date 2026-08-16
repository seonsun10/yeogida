export const REPORT_REASON_MAX_LENGTH = 100;
export const REPORT_DETAIL_MAX_LENGTH = 1000;
export const REPORT_RATE_LIMIT_HOURS = 24;

export const REPORT_REASON_OPTIONS = [
  '운영시간/연락처 정보가 틀렸어요',
  '비용 정보가 틀렸어요',
  '링크가 연결되지 않아요',
  '폐업했거나 서비스가 종료됐어요',
  '기타',
] as const;
