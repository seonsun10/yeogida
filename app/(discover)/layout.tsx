import type { Metadata } from 'next';
import { DiscoverHeader } from '@/components/discover/Header';
import { DiscoverFooter } from '@/components/discover/Footer';
import { getAllSiteCategories } from '@/lib/sites';
import { getSiteUrl } from '@/lib/site-url';
import {
  DISCOVER_SITE_DESCRIPTION,
  DISCOVER_SITE_NAME,
} from '@/lib/discover-constants';

export const metadata: Metadata = {
  title: {
    default: DISCOVER_SITE_NAME,
    template: `%s | ${DISCOVER_SITE_NAME}`,
  },
  description: DISCOVER_SITE_DESCRIPTION,
  alternates: {
    canonical: '/discover',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: `${getSiteUrl()}/discover`,
    siteName: DISCOVER_SITE_NAME,
    title: DISCOVER_SITE_NAME,
    description: DISCOVER_SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: DISCOVER_SITE_NAME,
    description: DISCOVER_SITE_DESCRIPTION,
  },
};

export default function DiscoverLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = getAllSiteCategories();

  return (
    <div data-theme="discover" className="flex min-h-screen flex-1 flex-col bg-background text-foreground">
      <DiscoverHeader categories={categories} />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        {children}
      </main>
      <DiscoverFooter />
    </div>
  );
}
