'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createSiteCategory, type ActionState } from '../actions';

export function NewSiteCategoryForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    createSiteCategory,
    undefined,
  );

  return (
    <form
      action={formAction}
      className="flex flex-col gap-3 rounded-md border border-dashed p-4"
    >
      <p className="text-sm font-medium">새 카테고리 추가</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          name="slug"
          placeholder="슬러그 (예: shopping)"
          pattern="^[a-z0-9]+(-[a-z0-9]+)*$"
          required
        />
        <Input name="name" placeholder="이름 (예: 쇼핑/할인)" required />
      </div>
      <Input name="description" placeholder="설명" required />
      <div className="flex items-center gap-2">
        <Input
          name="color"
          placeholder="#a1a1aa"
          pattern="^#[0-9a-fA-F]{6}$"
          defaultValue="#a1a1aa"
          className="w-28 font-mono"
        />
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? '추가 중...' : '추가하기'}
        </Button>
      </div>
      {state?.error && <p className="text-xs text-red-600">{state.error}</p>}
      {state?.message && (
        <p className="text-xs text-green-600">{state.message}</p>
      )}
    </form>
  );
}
