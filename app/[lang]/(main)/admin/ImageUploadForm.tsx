'use client';

import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { uploadServiceImages, type ActionState } from './actions';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_TOTAL_SIZE_BYTES = 20 * 1024 * 1024;

export function ImageUploadForm({ slug }: { slug: string }) {
  const uploadAction = uploadServiceImages.bind(null, slug);
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    uploadAction,
    undefined,
  );
  const [clientError, setClientError] = useState<string | null>(null);

  function handleFilesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    const oversizedFile = files.find((file) => file.size > MAX_FILE_SIZE_BYTES);
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);

    if (oversizedFile) {
      setClientError(`파일 용량이 너무 큽니다: ${oversizedFile.name} (최대 5MB)`);
      event.target.value = '';
    } else if (totalSize > MAX_TOTAL_SIZE_BYTES) {
      setClientError('선택한 파일 합계 용량이 너무 큽니다 (최대 20MB, 나눠서 업로드해주세요)');
      event.target.value = '';
    } else {
      setClientError(null);
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input
        type="file"
        name="images"
        accept="image/png,image/jpeg,image/webp,image/gif"
        multiple
        required
        onChange={handleFilesChange}
        className="text-sm"
      />
      <p className="text-xs text-zinc-400">
        PNG, JPG, WEBP, GIF · 파일당 최대 5MB · 합계 최대 20MB
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
        {pending ? '업로드 중...' : '이미지 업로드'}
      </Button>
    </form>
  );
}
