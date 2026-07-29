'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Category, Service } from '@/types/service';
import type { ActionState } from './actions';

type ServiceFormProps = {
  mode: 'create' | 'edit';
  categories: Category[];
  service?: Service;
  action: (
    prevState: ActionState,
    formData: FormData,
  ) => Promise<ActionState>;
};

export function ServiceForm({
  mode,
  categories,
  service,
  action,
}: ServiceFormProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="slug" className="text-sm font-medium">
          슬러그(URL 식별자) *
        </label>
        <Input
          id="slug"
          name="slug"
          defaultValue={service?.slug}
          placeholder="예: mental-health-crisis-109"
          pattern="^[a-z0-9]+(-[a-z0-9]+)*$"
          required
          disabled={mode === 'edit'}
        />
        <p className="text-xs text-zinc-400">
          영문 소문자, 숫자, 하이픈(-)만 사용하며 등록 후 변경할 수 없습니다.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          서비스명 *
        </label>
        <Input id="name" name="name" defaultValue={service?.name} required />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="summary" className="text-sm font-medium">
          한줄 요약 *
        </label>
        <Input
          id="summary"
          name="summary"
          defaultValue={service?.summary}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium">
          상세 설명 *
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={service?.description}
          required
          rows={6}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="categorySlug" className="text-sm font-medium">
            카테고리 *
          </label>
          <select
            id="categorySlug"
            name="categorySlug"
            defaultValue={service?.categorySlug ?? categories[0]?.slug}
            required
            className="h-8 rounded-lg border border-zinc-300 bg-transparent px-2.5 text-sm outline-none focus:border-zinc-500"
          >
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="cost" className="text-sm font-medium">
            비용 *
          </label>
          <select
            id="cost"
            name="cost"
            defaultValue={service?.cost ?? 'free'}
            required
            className="h-8 rounded-lg border border-zinc-300 bg-transparent px-2.5 text-sm outline-none focus:border-zinc-500"
          >
            <option value="free">무료</option>
            <option value="paid">유료</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="url" className="text-sm font-medium">
          서비스 링크 *
        </label>
        <Input
          id="url"
          name="url"
          type="url"
          defaultValue={service?.url}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="hours" className="text-sm font-medium">
            운영시간 *
          </label>
          <Input
            id="hours"
            name="hours"
            defaultValue={service?.hours}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="source" className="text-sm font-medium">
            운영 주체 *
          </label>
          <Input
            id="source"
            name="source"
            defaultValue={service?.source}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="tags" className="text-sm font-medium">
            태그 (쉼표로 구분)
          </label>
          <Input
            id="tags"
            name="tags"
            defaultValue={service?.tags.join(', ')}
            placeholder="예: 정신건강, 상담전화"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="badges" className="text-sm font-medium">
            배지 (쉼표로 구분)
          </label>
          <Input
            id="badges"
            name="badges"
            defaultValue={service?.badges.join(', ')}
            placeholder="예: 24시간, 무료"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="lastVerified" className="text-sm font-medium">
          최종 확인일
        </label>
        <Input
          id="lastVerified"
          name="lastVerified"
          type="date"
          defaultValue={
            service?.lastVerified ?? new Date().toISOString().slice(0, 10)
          }
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          name="affiliate"
          defaultChecked={service?.affiliate}
          className="size-4"
        />
        제휴 링크입니다
      </label>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.message && (
        <p className="text-sm text-green-600">{state.message}</p>
      )}

      <Button type="submit" disabled={pending} className="w-fit">
        {pending ? '저장 중...' : mode === 'create' ? '등록하기' : '저장하기'}
      </Button>
    </form>
  );
}
