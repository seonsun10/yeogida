import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BoardPostDetail } from '@/components/board/BoardPostDetail';
import { isBoardType } from '@/lib/board-constants';
import { getBoardPostById } from '@/lib/board';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ board: string; id: string }>;
};

async function resolvePost(params: PageProps['params']) {
  const { board, id } = await params;
  if (!isBoardType(board)) return null;

  const postId = Number.parseInt(id, 10);
  if (Number.isNaN(postId)) return null;

  return getBoardPostById(postId, 'main', board);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await resolvePost(params).catch(() => null);
  if (!post) return {};
  return { title: post.title };
}

export default async function MainBoardPostDetailPage({ params }: PageProps) {
  const post = await resolvePost(params);
  if (!post) notFound();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-16">
      <BoardPostDetail site="main" basePath="/board" post={post} />
    </div>
  );
}
