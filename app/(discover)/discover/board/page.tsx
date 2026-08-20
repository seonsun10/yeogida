import type { Metadata } from 'next';
import { BoardIndexCards } from '@/components/board/BoardIndexCards';

export const metadata: Metadata = {
  title: '게시판',
  description: '여기다 이용자들이 자유롭게 글을 남길 수 있는 게시판입니다.',
};

export default function DiscoverBoardIndexPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">게시판</h1>
        <p className="text-muted-foreground">
          사이트 추가 요청, 자유로운 이야기, 신고까지 — 이용자 누구나 글을
          남길 수 있습니다.
        </p>
      </div>
      <BoardIndexCards site="discover" basePath="/discover/board" />
    </div>
  );
}
