import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BoardPostForm } from '@/components/board/BoardPostForm';
import { BOARD_LABELS, isBoardType } from '@/lib/board-constants';
import { createMainBoardPost } from '@/app/(main)/board/actions';

type PageProps = {
  params: Promise<{ board: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { board } = await params;
  if (!isBoardType(board)) return {};
  return { title: `${BOARD_LABELS.main[board].writeCta} | ${BOARD_LABELS.main[board].title}` };
}

export default async function MainBoardNewPostPage({ params }: PageProps) {
  const { board } = await params;
  if (!isBoardType(board)) notFound();

  const copy = BOARD_LABELS.main[board];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{copy.title}</h1>
        <p className="text-muted-foreground">{copy.description}</p>
      </div>
      <BoardPostForm action={createMainBoardPost.bind(null, board)} />
    </div>
  );
}
