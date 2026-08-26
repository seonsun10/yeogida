import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '25mb',
    },
    // [lang]과 (discover)가 각각 독립된 root layout(복수 root layout)이라
    // Next가 완전히 매칭되지 않는 URL에 대해 어느 root로 404를 합성할지 알 수 없다.
    // 이 플래그로 전역 404 전용 파일(app/global-not-found.tsx)을 사용한다.
    globalNotFound: true,
  },
};

export default nextConfig;
