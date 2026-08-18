'use client';

import { Button } from '@/components/ui/button';
import { deleteSite } from './actions';

export function DeleteSiteButton({ slug }: { slug: string }) {
  return (
    <form
      action={deleteSite.bind(null, slug)}
      onSubmit={(event) => {
        if (!confirm('정말 삭제하시겠습니까? 되돌릴 수 없습니다.')) {
          event.preventDefault();
        }
      }}
    >
      <Button type="submit" variant="destructive" size="sm">
        사이트 삭제
      </Button>
    </form>
  );
}
