'use client';

import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SiteCategory } from '@/types/site';
import type { ActionState } from '../actions';

type SiteCategoryColorFormProps = {
  category: SiteCategory;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
};

export function SiteCategoryColorForm({
  category,
  action,
}: SiteCategoryColorFormProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    undefined,
  );
  const [color, setColor] = useState(category.color);

  return (
    <form action={formAction} className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          className="size-9 shrink-0 cursor-pointer rounded border border-zinc-300 p-0.5"
          aria-label={`${category.name} 색상 선택`}
        />
        <Input
          name="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          pattern="^#[0-9a-fA-F]{6}$"
          placeholder="#a1a1aa"
          className="w-28 font-mono"
        />
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? '저장 중...' : '저장'}
        </Button>
      </div>
      {state?.error && <p className="text-xs text-red-600">{state.error}</p>}
      {state?.message && (
        <p className="text-xs text-green-600">{state.message}</p>
      )}
    </form>
  );
}
