'use client';

import { Button } from '@/components/ui/button';
import { deleteService } from './actions';

export function DeleteServiceButton({ slug }: { slug: string }) {
  return (
    <form
      action={deleteService.bind(null, slug)}
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
