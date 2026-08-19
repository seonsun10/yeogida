export type BoardSite = 'main' | 'discover';
export type BoardType = 'site-request' | 'free' | 'report';
export type BoardStatus = 'open' | 'resolved';

export type BoardPost = {
  id: number;
  site: BoardSite;
  board: BoardType;
  title: string;
  content: string;
  authorName: string;
  status: BoardStatus;
  createdAt: string;
};

export type BoardActionState =
  | { error?: string; message?: string; postId?: number }
  | undefined;
