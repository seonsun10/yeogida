'use client';

import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { uploadSiteThumbnail, type ActionState } from './actions';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export function SiteThumbnailUploadForm({ slug }: { slug: string }) {
  const uploadAction = uploadSiteThumbnail.bind(null, slug);
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    uploadAction,
    undefined,
  );
  const [clientError, setClientError] = useState<string | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      setClientError(`파일 용량이 너무 큽니다: ${file.name} (최대 5MB)`);
      event.target.value = '';
    } else {
      setClientError(null);
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input
        type="file"
        name="thumbnail"
        accept="image/png,image/jpeg,image/webp,image/gif"
        required
        onChange={handleFileChange}
        className="text-sm"
      />
      <p className="text-xs text-zinc-400">
        PNG, JPG, WEBP, GIF · 최대 5MB · 목록/카드에 표시될 이미지 1장
      </p>
      {clientError && <p className="text-sm text-red-600">{clientError}</p>}
      {!clientError && state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
      {!clientError && state?.message && (
        <p className="text-sm text-green-600">{state.message}</p>
      )}
      <Button
        type="submit"
        disabled={pending || !!clientError}
        size="sm"
        className="w-fit"
      >
        {pending ? '업로드 중...' : '썸네일 업로드'}
      </Button>
    </form>
  );
}
