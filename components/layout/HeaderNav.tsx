'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon, MenuIcon } from 'lucide-react';
import type { Category } from '@/types/service';
import type { Dictionary } from '@/lib/dictionaries';
import { localeHref, type Locale } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LangSwitcher } from './LangSwitcher';

export function HeaderNav({
  categories,
  lang,
  dict,
}: {
  categories: Category[];
  lang: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const guidesHref = localeHref(lang, '/guides');
  const isGuidesActive = pathname === guidesHref;

  return (
    <>
      {/* 데스크톱: 카테고리를 드롭다운으로 묶어서 상단 탭이 한 줄로 깔끔하게 보이도록 함 */}
      <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
        <Link
          href={guidesHref}
          aria-current={isGuidesActive ? 'page' : undefined}
          className="rounded-md px-3 py-2 outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground"
        >
          {dict.nav.guides}
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md px-3 py-2 outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:bg-accent data-popup-open:text-accent-foreground"
              />
            }
          >
            {dict.nav.categories}
            <ChevronDownIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[19rem] p-2">
            <div className="grid grid-cols-2 gap-1">
              {categories.map((category) => {
                const href = localeHref(lang, `/category/${category.slug}`);
                return (
                  <DropdownMenuItem
                    key={category.slug}
                    render={
                      <Link
                        href={href}
                        aria-current={pathname === href ? 'page' : undefined}
                      />
                    }
                    className="px-2 py-1.5"
                  >
                    {category.name}
                  </DropdownMenuItem>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {/* 모바일: 햄버거 버튼으로 전체 메뉴를 시트에 담아 반응형으로 대응 */}
      <Sheet>
        <SheetTrigger
          render={<Button variant="outline" size="icon" />}
          className="md:hidden"
        >
          <MenuIcon className="size-5" />
          <span className="sr-only">{dict.nav.openMenu}</span>
        </SheetTrigger>
        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle>{dict.nav.menu}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 overflow-y-auto px-4 pb-4 text-sm">
            <SheetClose
              render={
                <Link
                  href={guidesHref}
                  aria-current={isGuidesActive ? 'page' : undefined}
                />
              }
              nativeButton={false}
              className="rounded-md px-3 py-2 text-foreground outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:bg-accent"
            >
              {dict.nav.guides}
            </SheetClose>
            <p className="px-3 pt-4 pb-1 text-xs font-medium text-muted-foreground">
              {dict.nav.categories}
            </p>
            {categories.map((category) => {
              const href = localeHref(lang, `/category/${category.slug}`);
              return (
                <SheetClose
                  key={category.slug}
                  render={
                    <Link
                      href={href}
                      aria-current={pathname === href ? 'page' : undefined}
                    />
                  }
                  nativeButton={false}
                  className="rounded-md px-3 py-2 text-foreground outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:bg-accent"
                >
                  {category.name}
                </SheetClose>
              );
            })}
            <div className="mt-4 border-t px-3 pt-4">
              <LangSwitcher lang={lang} label={dict.languageSwitcher.label} />
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
