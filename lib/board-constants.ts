import type { BoardSite, BoardType } from '@/types/board';

export const BOARD_TYPES = ['site-request', 'free', 'report'] as const;

export const BOARD_TITLE_MAX_LENGTH = 100;
export const BOARD_CONTENT_MAX_LENGTH = 2000;
export const BOARD_AUTHOR_NAME_MAX_LENGTH = 20;
export const BOARD_PAGE_SIZE = 20;
export const BOARD_POST_RATE_LIMIT_COUNT = 3;
export const BOARD_POST_RATE_LIMIT_HOURS = 1;

// 자유게시판은 "처리 상태" 개념이 없어 목록/상세에서 상태 배지를 숨긴다.
export const BOARD_SHOWS_STATUS: Record<BoardType, boolean> = {
  'site-request': true,
  free: false,
  report: true,
};

type BoardCopy = { title: string; description: string; writeCta: string };

export const BOARD_LABELS: Record<BoardSite, Record<BoardType, BoardCopy>> = {
  main: {
    'site-request': {
      title: '서비스 추가 요청',
      description: '여기다에 등록되면 좋을 생활 서비스를 추천해주세요.',
      writeCta: '서비스 추천하기',
    },
    free: {
      title: '자유게시판',
      description: '생활 정보나 하고 싶은 이야기를 자유롭게 나눠보세요.',
      writeCta: '글쓰기',
    },
    report: {
      title: '신고 게시판',
      description:
        '특정 서비스 정보 오류는 각 서비스 상세페이지의 "정보가 틀렸어요" 버튼을 이용해주세요. 그 외 사이트 운영 관련 문제나 부적절한 내용은 여기로 알려주세요.',
      writeCta: '신고 작성하기',
    },
  },
  discover: {
    'site-request': {
      title: '사이트 추가 요청',
      description: '여기다에 등록되면 좋을 사이트를 추천해주세요.',
      writeCta: '사이트 추천하기',
    },
    free: {
      title: '자유게시판',
      description: '생활 정보나 하고 싶은 이야기를 자유롭게 나눠보세요.',
      writeCta: '글쓰기',
    },
    report: {
      title: '신고 게시판',
      description: '사이트 정보 오류나 부적절한 내용을 신고해주세요.',
      writeCta: '신고 작성하기',
    },
  },
};

export function isBoardType(value: string): value is BoardType {
  return (BOARD_TYPES as readonly string[]).includes(value);
}
