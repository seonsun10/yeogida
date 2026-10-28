import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // 앱 소스가 아닌 로컬 에이전트 도구와 생성된 상태 파일.
    '.agents/**',
    '.claude/**',
    '.codex/**',
    '.cursor/**',
    '.omd/**',
    '.omx/**',
    '.serena/**',
  ]),
]);

export default eslintConfig;
