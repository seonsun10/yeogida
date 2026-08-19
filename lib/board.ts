import { getDb } from '@/lib/db';
import {
  BOARD_PAGE_SIZE,
  BOARD_POST_RATE_LIMIT_COUNT,
  BOARD_POST_RATE_LIMIT_HOURS,
} from '@/lib/board-constants';
import type { BoardPost, BoardSite, BoardStatus, BoardType } from '@/types/board';

type BoardPostRow = {
  id: number;
  site: string;
  board: string;
  title: string;
  content: string;
  author_name: string;
  status: string;
  created_at: string | Date;
};

function mapRow(row: BoardPostRow): BoardPost {
  return {
    id: row.id,
    site: row.site as BoardSite,
    board: row.board as BoardType,
    title: row.title,
    content: row.content,
    authorName: row.author_name,
    status: row.status as BoardStatus,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function createBoardPost(input: {
  site: BoardSite;
  board: BoardType;
  title: string;
  content: string;
  authorName: string;
  authorIp: string;
}): Promise<number> {
  const sql = getDb();
  const rows = (await sql`
    INSERT INTO board_posts (site, board, title, content, author_name, author_ip)
    VALUES (${input.site}, ${input.board}, ${input.title}, ${input.content}, ${input.authorName}, ${input.authorIp})
    RETURNING id
  `) as { id: number }[];
  return rows[0].id;
}

// count(*) 대신 LIMIT으로 존재 여부만 확인 — neon 드라이버가 bigint 집계값을
// 문자열로 반환해 숫자 비교 시 조용히 틀릴 수 있는 함정을 피하기 위함.
export async function hasReachedPostRateLimit(authorIp: string): Promise<boolean> {
  const sql = getDb();
  const rows = (await sql`
    SELECT 1 FROM board_posts
    WHERE author_ip = ${authorIp}
      AND created_at > now() - (${BOARD_POST_RATE_LIMIT_HOURS} || ' hours')::interval
    LIMIT ${BOARD_POST_RATE_LIMIT_COUNT}
  `) as unknown[];
  return rows.length >= BOARD_POST_RATE_LIMIT_COUNT;
}

export async function getBoardPosts(params: {
  site: BoardSite;
  board: BoardType;
  page: number;
}): Promise<{ posts: BoardPost[]; hasMore: boolean }> {
  const sql = getDb();
  const offset = (params.page - 1) * BOARD_PAGE_SIZE;
  const rows = (await sql`
    SELECT id, site, board, title, content, author_name, status, created_at
    FROM board_posts
    WHERE site = ${params.site} AND board = ${params.board}
    ORDER BY created_at DESC
    LIMIT ${BOARD_PAGE_SIZE + 1} OFFSET ${offset}
  `) as BoardPostRow[];

  const hasMore = rows.length > BOARD_PAGE_SIZE;
  return { posts: rows.slice(0, BOARD_PAGE_SIZE).map(mapRow), hasMore };
}

export async function getBoardPostById(
  id: number,
  site: BoardSite,
  board: BoardType,
): Promise<BoardPost | null> {
  const sql = getDb();
  const rows = (await sql`
    SELECT id, site, board, title, content, author_name, status, created_at
    FROM board_posts
    WHERE id = ${id} AND site = ${site} AND board = ${board}
    LIMIT 1
  `) as BoardPostRow[];
  return rows[0] ? mapRow(rows[0]) : null;
}

export async function getAllBoardPostsForAdmin(): Promise<BoardPost[]> {
  const sql = getDb();
  const rows = (await sql`
    SELECT id, site, board, title, content, author_name, status, created_at
    FROM board_posts
    ORDER BY created_at DESC
  `) as BoardPostRow[];
  return rows.map(mapRow);
}

export async function updateBoardPostStatus(id: number, status: BoardStatus): Promise<void> {
  const sql = getDb();
  await sql`UPDATE board_posts SET status = ${status} WHERE id = ${id}`;
}

export async function deleteBoardPost(id: number): Promise<void> {
  const sql = getDb();
  await sql`DELETE FROM board_posts WHERE id = ${id}`;
}
