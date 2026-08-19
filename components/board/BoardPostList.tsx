import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { BOARD_LABELS, BOARD_SHOWS_STATUS } from '@/lib/board-constants';
import type { BoardPost, BoardSite, BoardType } from '@/types/board';

const STATUS_LABEL: Record<BoardPost['status'], string> = {
  open: '대기',
  resolved: '완료',
};

export function BoardPostList({
  site,
  board,
  basePath,
  posts,
  page,
  hasMore,
}: {
  site: BoardSite;
  board: BoardType;
  basePath: string;
  posts: BoardPost[];
  page: number;
  hasMore: boolean;
}) {
  const copy = BOARD_LABELS[site][board];
  const showsStatus = BOARD_SHOWS_STATUS[board];
  const listPath = `${basePath}/${board}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{copy.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{copy.description}</p>
        </div>
        <Link href={`${listPath}/new`} className={buttonVariants()}>
          {copy.writeCta}
        </Link>
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-2 font-medium">제목</th>
              <th className="px-4 py-2 font-medium">작성자</th>
              {showsStatus && <th className="px-4 py-2 font-medium">상태</th>}
              <th className="px-4 py-2 font-medium">작성일</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="max-w-xs truncate px-4 py-2">
                  <Link
                    href={`${listPath}/${post.id}`}
                    className="font-medium text-foreground hover:underline"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-4 py-2 text-muted-foreground">{post.authorName}</td>
                {showsStatus && (
                  <td className="px-4 py-2">
                    <Badge variant={post.status === 'resolved' ? 'secondary' : 'outline'}>
                      {STATUS_LABEL[post.status]}
                    </Badge>
                  </td>
                )}
                <td className="px-4 py-2 whitespace-nowrap text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td
                  colSpan={showsStatus ? 4 : 3}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  등록된 글이 없습니다. 첫 글을 남겨보세요.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(page > 1 || hasMore) && (
        <nav className="flex items-center justify-between text-sm">
          {page > 1 ? (
            <Link
              href={`${listPath}?page=${page - 1}`}
              className="text-muted-foreground hover:text-foreground"
            >
              ← 이전
            </Link>
          ) : (
            <span />
          )}
          {hasMore && (
            <Link
              href={`${listPath}?page=${page + 1}`}
              className="text-muted-foreground hover:text-foreground"
            >
              다음 →
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
