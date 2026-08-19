import { createBoardPost, hasReachedPostRateLimit } from '@/lib/board';
import {
  BOARD_AUTHOR_NAME_MAX_LENGTH,
  BOARD_CONTENT_MAX_LENGTH,
  BOARD_POST_RATE_LIMIT_COUNT,
  BOARD_POST_RATE_LIMIT_HOURS,
  BOARD_TITLE_MAX_LENGTH,
  isBoardType,
} from '@/lib/board-constants';
import type { BoardActionState, BoardSite } from '@/types/board';

// next/headers 등 라우팅 계층 의존성은 각 route의 actions.ts(getClientIp)에 남겨두고
// 이 함수는 site/authorIp를 파라미터로만 받는다 — lib/reports.ts와 동일한 경계.
export async function submitBoardPost(
  site: BoardSite,
  board: string,
  authorIp: string,
  formData: FormData,
): Promise<BoardActionState> {
  if (!isBoardType(board)) {
    return { error: '잘못된 게시판입니다.' };
  }

  const title = String(formData.get('title') ?? '').trim();
  const content = String(formData.get('content') ?? '').trim();
  const authorName = String(formData.get('authorName') ?? '').trim() || '익명';

  if (!title) return { error: '제목을 입력해주세요.' };
  if (!content) return { error: '내용을 입력해주세요.' };
  if (title.length > BOARD_TITLE_MAX_LENGTH) {
    return { error: `제목은 ${BOARD_TITLE_MAX_LENGTH}자 이내로 입력해주세요.` };
  }
  if (content.length > BOARD_CONTENT_MAX_LENGTH) {
    return { error: `내용은 ${BOARD_CONTENT_MAX_LENGTH}자 이내로 입력해주세요.` };
  }
  if (authorName.length > BOARD_AUTHOR_NAME_MAX_LENGTH) {
    return { error: `이름은 ${BOARD_AUTHOR_NAME_MAX_LENGTH}자 이내로 입력해주세요.` };
  }

  try {
    if (await hasReachedPostRateLimit(authorIp)) {
      return {
        error: `같은 IP에서는 ${BOARD_POST_RATE_LIMIT_HOURS}시간에 ${BOARD_POST_RATE_LIMIT_COUNT}건까지만 글을 등록할 수 있어요. 잠시 후 다시 시도해주세요.`,
      };
    }
    const postId = await createBoardPost({ site, board, title, content, authorName, authorIp });
    return { message: '등록되었습니다.', postId };
  } catch {
    return { error: '등록 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.' };
  }
}
