import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BoardPostList } from '@/components/board/BoardPostList';
import { BOARD_LABELS, isBoardType } from '@/lib/board-constants';
import { getBoardPosts } from '@/lib/board';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ board: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { board } = await params;
  if (!isBoardType(board)) return {};
  return { title: BOARD_LABELS.discover[board].title };
}

export default async function DiscoverBoardListPage({ params, searchParams }: PageProps) {
  const { board } = await params;
  if (!isBoardType(board)) notFound();

  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1);

  let posts: Awaited<ReturnType<typeof getBoardPosts>>['posts'] = [];
  let hasMore = false;
  let loadError: string | null = null;

  try {
    const result = await getBoardPosts({ site: 'discover', board, page });
    posts = result.posts;
    hasMore = result.hasMore;
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : '게시글을 불러오지 못했습니다.';
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16">
      {loadError ? (
        <p className="rounded-md border border-dashed border-border p-6 text-sm text-muted-foreground">
          {loadError} (Neon DB 연동 전에는 게시글을 불러올 수 없습니다.)
        </p>
      ) : (
        <BoardPostList
          site="discover"
          board={board}
          basePath="/discover/board"
          posts={posts}
          page={page}
          hasMore={hasMore}
        />
      )}
    </div>
  );
}
