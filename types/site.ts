export type Site = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  categorySlug: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  url: string;
  badges: string[];
  source: string;
  lastVerified: string;
};

export type SiteCategory = {
  slug: string;
  name: string;
  description: string;
  color: string;
  /**
   * 카테고리 내 사이트들을 비교·큐레이션하는 편집 글(250~450자).
   * 얇은 링크 목록이 아니라 실제 판단 기준을 담은 콘텐츠로,
   * 아직 작성되지 않은 카테고리는 생략(optional)한다.
   */
  intro?: string;
};
