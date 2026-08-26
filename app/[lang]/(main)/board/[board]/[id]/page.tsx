import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BoardPostDetail } from '@/components/board/BoardPostDetail';
import { isBoardType } from '@/lib/board-constants';
import { getBoardPostById } from '@/lib/board';
import { DEFAULT_LOCALE, isLocale, localeHref } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ lang: string; board: string; id: string }>;
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

  const { lang: rawLang } = await params;
  const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-16">
      <BoardPostDetail site="main" basePath={localeHref(lang, '/board')} post={post} />
    </div>
  );
}
