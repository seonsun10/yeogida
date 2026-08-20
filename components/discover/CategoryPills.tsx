'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon, MenuIcon } from 'lucide-react';
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
import type { SiteCategory } from '@/types/site';

export function DiscoverCategoryPills({
  categories,
}: {
  categories: SiteCategory[];
}) {
  const pathname = usePathname();

  return (
    <>
      {/* 데스크톱: 카테고리를 드롭다운으로 묶어 헤더가 한 줄로 깔끔하게 보이도록 함 */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              className="hidden items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground outline-none transition-colors hover:border-primary/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:border-primary/40 data-popup-open:text-foreground md:inline-flex"
            />
          }
        >
          카테고리
          <ChevronDownIcon className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[22rem] p-2">
          <div className="grid grid-cols-2 gap-1">
            {categories.map((category) => {
              const href = `/discover/${category.slug}`;
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

      {/* 모바일: 햄버거 버튼으로 전체 카테고리를 시트에 담아 반응형으로 대응 */}
      <Sheet>
        <SheetTrigger
          render={<Button variant="outline" size="icon" />}
          className="md:hidden"
        >
          <MenuIcon className="size-5" />
          <span className="sr-only">카테고리 메뉴 열기</span>
        </SheetTrigger>
        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle>카테고리</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 overflow-y-auto px-4 pb-4 text-sm">
            {categories.map((category) => {
              const href = `/discover/${category.slug}`;
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
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
