'use client';

import { useState } from 'react';
import { Check, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ShareButton({ title, text }: { title: string; text?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // 사용자가 공유 시트를 취소한 경우 — 별도 처리 불필요
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Button type="button" variant="outline" size="lg" onClick={handleShare}>
      {copied ? <Check /> : <Share2 />}
      {copied ? '링크 복사됨' : '공유하기'}
      <span role="status" className="sr-only">
        {copied && '링크가 복사되었습니다'}
      </span>
    </Button>
  );
}
