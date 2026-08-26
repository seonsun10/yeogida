import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/lib/dictionaries';
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n';
import { jsonLdScriptProps } from '@/lib/json-ld';
import { getSiteUrl } from '@/lib/site-url';

export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: rawLang } = await params;
  const lang = isLocale(rawLang) ? rawLang : DEFAULT_LOCALE;
  const dict = await getDictionary(lang);

  const siteUrl = getSiteUrl();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: '여기다',
        url: siteUrl,
        description: dict.site.description,
        inLanguage: dict.site.htmlLang,
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
      <Header lang={lang} dict={dict} />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        {children}
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
