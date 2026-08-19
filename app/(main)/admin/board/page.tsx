import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllBoardPostsForAdmin } from '@/lib/board';
import { BOARD_LABELS } from '@/lib/board-constants';
import { deleteBoardPostAction, resolveBoardPost } from '@/app/(main)/admin/actions';
import type { BoardPost } from '@/types/board';

export const dynamic = 'force-dynamic';

const SITE_LABEL: Record<BoardPost['site'], string> = {
  main: '메인',
  discover: '발견',
};

const STATUS_LABEL: Record<BoardPost['status'], string> = {
  open: '대기',
  resolved: '완료',
};

export default async function AdminBoardPage() {
  let posts: BoardPost[] = [];
  let loadError: string | null = null;

  try {
    posts = await getAllBoardPostsForAdmin();
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : '게시글을 불러오지 못했습니다.';
  }

  if (loadError) {
    return (
      <div className="rounded-md border border-dashed p-6 text-sm text-zinc-500">
        {loadError} (Neon DB 연동 전에는 게시글을 불러올 수 없습니다.)
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold">게시판 관리 ({posts.length})</h1>
        <p className="text-sm text-zinc-500">
          메인/발견 두 사이트의 추가 요청·자유게시판·신고 게시글을 한 곳에서
          관리합니다.
        </p>
      </div>

      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-zinc-500">
            <tr>
              <th className="px-4 py-2 font-medium">사이트</th>
              <th className="px-4 py-2 font-medium">게시판</th>
              <th className="px-4 py-2 font-medium">제목</th>
              <th className="px-4 py-2 font-medium">작성자</th>
              <th className="px-4 py-2 font-medium">상태</th>
              <th className="px-4 py-2 font-medium">작성일</th>
              <th className="px-4 py-2 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {posts.map((post) => {
              const detailHref =
                post.site === 'main'
                  ? `/board/${post.board}/${post.id}`
                  : `/discover/board/${post.board}/${post.id}`;
              return (
                <tr key={post.id}>
                  <td className="px-4 py-2 text-zinc-600">{SITE_LABEL[post.site]}</td>
                  <td className="px-4 py-2 text-zinc-600">
                    {BOARD_LABELS[post.site][post.board].title}
                  </td>
                  <td className="max-w-xs truncate px-4 py-2">
                    <Link
                      href={detailHref}
                      target="_blank"
                      className="font-medium text-zinc-900 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-zinc-600">{post.authorName}</td>
                  <td className="px-4 py-2">
                    <Badge variant={post.status === 'resolved' ? 'secondary' : 'outline'}>
                      {STATUS_LABEL[post.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-zinc-500">
                    {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-4 py-2 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      {post.status !== 'resolved' && (
                        <form action={resolveBoardPost.bind(null, post.id)}>
                          <Button type="submit" size="sm" variant="outline">
                            처리완료
                          </Button>
                        </form>
                      )}
                      <form action={deleteBoardPostAction.bind(null, post.id)}>
                        <Button type="submit" size="sm" variant="ghost">
                          삭제
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
            {posts.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-zinc-400">
                  등록된 게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
