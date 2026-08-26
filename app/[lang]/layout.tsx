import { notFound } from 'next/navigation';

export const LOCALES = ['ko', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LOCALES.includes(lang as Locale)) notFound();

  return children;
}
