import { neon } from '@neondatabase/serverless';

let sqlClient: ReturnType<typeof neon> | null = null;

export function getDb() {
  if (!sqlClient) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL 환경변수가 설정되지 않았습니다.');
    }
    sqlClient = neon(process.env.DATABASE_URL);
  }
  return sqlClient;
}
