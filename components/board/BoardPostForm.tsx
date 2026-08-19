'use client';

import { useActionState, useId } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  BOARD_AUTHOR_NAME_MAX_LENGTH,
  BOARD_CONTENT_MAX_LENGTH,
  BOARD_TITLE_MAX_LENGTH,
} from '@/lib/board-constants';
import type { BoardActionState } from '@/types/board';

type BoardFormAction = (
  prevState: BoardActionState,
  formData: FormData,
) => Promise<BoardActionState>;

export function BoardPostForm({ action }: { action: BoardFormAction }) {
  const authorNameId = useId();
  const titleId = useId();
  const contentId = useId();
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={authorNameId} className="text-sm text-muted-foreground">
          이름 (선택, 비워두면 &quot;익명&quot;)
        </label>
        <Input
          id={authorNameId}
          name="authorName"
          maxLength={BOARD_AUTHOR_NAME_MAX_LENGTH}
          placeholder="익명"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={titleId} className="text-sm text-muted-foreground">
          제목
        </label>
        <Input id={titleId} name="title" required maxLength={BOARD_TITLE_MAX_LENGTH} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={contentId} className="text-sm text-muted-foreground">
          내용
        </label>
        <Textarea
          id={contentId}
          name="content"
          required
          maxLength={BOARD_CONTENT_MAX_LENGTH}
          rows={10}
        />
      </div>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <Button type="submit" disabled={pending}>
        {pending ? '등록 중...' : '등록하기'}
      </Button>
    </form>
  );
}
