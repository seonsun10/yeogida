import Link from 'next/link';
import type { Dictionary } from '@/lib/dictionaries';
import { localeHref, type Locale } from '@/lib/i18n';
import { getLinkCheckStatus } from '@/lib/link-check-status';

export async function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const status = await getLinkCheckStatus();

  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground">
        <p>{dict.footer.disclaimer}</p>
        <nav aria-label={dict.footer.navLabel} className="flex flex-wrap gap-4">
          <Link href={localeHref(lang, '/guides')} className="hover:text-foreground">
            {dict.footer.guides}
          </Link>
          <Link href={localeHref(lang, '/board')} className="hover:text-foreground">
            {dict.footer.board}
          </Link>
          <Link href={localeHref(lang, '/submit')} className="hover:text-foreground">
            {dict.footer.submit}
          </Link>
          <Link href={localeHref(lang, '/about')} className="hover:text-foreground">
            {dict.footer.about}
          </Link>
          <Link href={localeHref(lang, '/privacy')} className="hover:text-foreground">
            {dict.footer.privacy}
          </Link>
          <Link href={localeHref(lang, '/terms')} className="hover:text-foreground">
            {dict.footer.terms}
          </Link>
        </nav>
        {status && (
          <p className="text-xs text-muted-foreground/70">
            {dict.footer.lastChecked}: {status.checkedAt.slice(0, 10)}
          </p>
        )}
        <p className="text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} {dict.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
