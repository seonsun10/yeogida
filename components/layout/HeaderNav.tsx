'use client';

import Link from 'next/link';
import { ChevronDownIcon, MenuIcon } from 'lucide-react';
import type { Category } from '@/types/service';
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

export function HeaderNav({ categories }: { categories: Category[] }) {
  return (
    <>
      {/* 데스크톱: 카테고리를 드롭다운으로 묶어서 상단 탭이 한 줄로 깔끔하게 보이도록 함 */}
      <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
        <Link
          href="/guides"
          className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
        >
          가이드
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground"
              />
            }
          >
            카테고리
            <ChevronDownIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[19rem] p-2">
            <div className="grid grid-cols-2 gap-1">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.slug}
                  render={<Link href={`/category/${category.slug}`} />}
                  className="px-2 py-1.5"
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
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
          <span className="sr-only">메뉴 열기</span>
        </SheetTrigger>
        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle>메뉴</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 overflow-y-auto px-4 pb-4 text-sm">
            <SheetClose
              render={<Link href="/guides" />}
              nativeButton={false}
              className="rounded-md px-3 py-2 text-foreground hover:bg-accent"
            >
              가이드
            </SheetClose>
            <p className="px-3 pt-4 pb-1 text-xs font-medium text-muted-foreground">
              카테고리
            </p>
            {categories.map((category) => (
              <SheetClose
                key={category.slug}
                render={<Link href={`/category/${category.slug}`} />}
                nativeButton={false}
                className="rounded-md px-3 py-2 text-foreground hover:bg-accent"
              >
                {category.name}
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
