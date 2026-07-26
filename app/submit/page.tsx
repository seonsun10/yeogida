'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function SubmitPage() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(event.currentTarget);
    const payload = {
      serviceName: formData.get('serviceName'),
      url: formData.get('url'),
      description: formData.get('description'),
      contact: formData.get('contact'),
      website: formData.get('website'),
    };

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? '제보 접수에 실패했습니다.');
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : '제보 접수에 실패했습니다.',
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-4 px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">제보해주셔서 감사합니다!</h1>
        <p className="text-zinc-600">
          검토 후 등록 여부를 결정하며, 별도 연락은 드리지 않을 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-8 px-4 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">서비스 제보하기</h1>
        <p className="text-zinc-600">
          몰라서 못 쓰는 유용한 생활 서비스를 알고 계신가요? 알려주시면 검토 후
          등록하겠습니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          <label htmlFor="website">웹사이트 (입력하지 마세요)</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="serviceName" className="text-sm font-medium">
            서비스명 *
          </label>
          <Input id="serviceName" name="serviceName" required />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="url" className="text-sm font-medium">
            서비스 링크 *
          </label>
          <Input id="url" name="url" type="url" required />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm font-medium">
            어떤 서비스인가요? *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact" className="text-sm font-medium">
            연락처 (선택)
          </label>
          <Input id="contact" name="contact" placeholder="이메일 등" />
        </div>

        {status === 'error' && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}

        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? '제출 중...' : '제보하기'}
        </Button>
      </form>
    </div>
  );
}
