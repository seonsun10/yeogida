import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { BOARD_LABELS, BOARD_SHOWS_STATUS } from '@/lib/board-constants';
import type { BoardPost, BoardSite } from '@/types/board';

const STATUS_LABEL: Record<BoardPost['status'], string> = {
  open: '대기',
  resolved: '완료',
};

export function BoardPostDetail({
  site,
  basePath,
  post,
}: {
  site: BoardSite;
  basePath: string;
  post: BoardPost;
}) {
  const copy = BOARD_LABELS[site][post.board];
  const showsStatus = BOARD_SHOWS_STATUS[post.board];
  const listPath = `${basePath}/${post.board}`;

  return (
    <div className="flex flex-col gap-6">
      <Link
        href={listPath}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← {copy.title} 목록으로
      </Link>

      <div className="flex flex-col gap-2 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">{post.title}</h1>
          {showsStatus && (
            <Badge variant={post.status === 'resolved' ? 'secondary' : 'outline'}>
              {STATUS_LABEL[post.status]}
            </Badge>
          )}
        </div>
        <div className="flex gap-3 text-sm text-muted-foreground">
          <span>{post.authorName}</span>
          <span>{new Date(post.createdAt).toLocaleString('ko-KR')}</span>
        </div>
      </div>

      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
        {post.content}
      </p>
    </div>
  );
}
