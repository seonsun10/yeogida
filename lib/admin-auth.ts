export function ensureAdmin() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('관리자 화면은 로컬 개발 환경에서만 사용할 수 있습니다.');
  }
}
