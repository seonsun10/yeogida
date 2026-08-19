import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BOARD_LABELS, BOARD_TYPES } from '@/lib/board-constants';
import type { BoardSite } from '@/types/board';

export function BoardIndexCards({
  site,
  basePath,
}: {
  site: BoardSite;
  basePath: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {BOARD_TYPES.map((board) => {
        const copy = BOARD_LABELS[site][board];
        return (
          <Link key={board} href={`${basePath}/${board}`} className="block">
            <Card className="h-full transition-colors hover:border-foreground/30">
              <CardHeader>
                <CardTitle>{copy.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {copy.description}
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
