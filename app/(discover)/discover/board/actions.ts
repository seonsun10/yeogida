'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { submitBoardPost } from '@/lib/board-submit';
import type { BoardActionState } from '@/types/board';

async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return headersList.get('x-real-ip') ?? 'unknown';
}

export async function createDiscoverBoardPost(
  board: string,
  _prevState: BoardActionState,
  formData: FormData,
): Promise<BoardActionState> {
  const authorIp = await getClientIp();
  const result = await submitBoardPost('discover', board, authorIp, formData);

  if (result?.postId) {
    redirect(`/discover/board/${board}/${result.postId}`);
  }
  return result;
}
