/** 공개 자료에 근거한 이용 안내. 확인일은 링크 자동 점검일과 구분한다. */
export type EditorialNotes = {
  reviewedAt: string;
  audience: string;
  preparation: string[];
  steps: string[];
  cautions: string[];
  sources: { label: string; url: string }[];
};
