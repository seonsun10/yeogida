import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { jsonLdScriptProps } from '@/lib/json-ld';
import { getSiteUrl } from '@/lib/site-url';

const SITE_DESCRIPTION =
  '여기다(yeogida-life.com)는 사람들이 몰라서 못 쓰는, 실제로 도움이 되는 생활 밀착형 서비스를 카테고리별로 정리한 큐레이션 디렉토리입니다.';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: '여기다',
        url: siteUrl,
        description: SITE_DESCRIPTION,
        inLanguage: 'ko-KR',
      },
      {
        '@type': 'Organization',
        name: '여기다',
        url: siteUrl,
      },
    ],
  };

  return (
    <>
      <script {...jsonLdScriptProps(jsonLd)} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
