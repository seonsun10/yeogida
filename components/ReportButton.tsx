'use client';

import { useActionState, useEffect, useId, useState } from 'react';
import { Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { submitReport } from '@/app/(main)/service/[slug]/actions';
import {
  REPORT_DETAIL_MAX_LENGTH,
  REPORT_REASON_OPTIONS,
} from '@/lib/report-constants';

export function ReportButton({ serviceSlug }: { serviceSlug: string }) {
  const detailId = useId();
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    submitReport.bind(null, serviceSlug),
    undefined,
  );

  useEffect(() => {
    if (!state?.message) return;
    const timer = setTimeout(() => setOpen(false), 1200);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button type="button" variant="outline" size="lg" />}>
        <Flag />
        정보가 틀렸어요
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>정보가 틀렸어요</SheetTitle>
          <SheetDescription>
            어떤 정보가 잘못됐는지 알려주시면 확인 후 반영하겠습니다.
          </SheetDescription>
        </SheetHeader>
        <form action={formAction} className="flex flex-col gap-4 px-4">
          <fieldset className="flex flex-col gap-2">
            <legend className="sr-only">신고 사유</legend>
            {REPORT_REASON_OPTIONS.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="reason"
                  value={option}
                  required
                  className="accent-foreground"
                />
                {option}
              </label>
            ))}
          </fieldset>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={detailId} className="text-sm text-muted-foreground">
              상세 내용 (선택)
            </label>
            <Textarea
              id={detailId}
              name="detail"
              maxLength={REPORT_DETAIL_MAX_LENGTH}
              placeholder="예: 운영시간이 평일 9-18시가 아니라 24시간이에요"
            />
          </div>
          {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
          {state?.message && (
            <p className="text-sm text-emerald-600">{state.message}</p>
          )}
          <SheetFooter>
            <Button type="submit" disabled={pending}>
              {pending ? '접수 중...' : '신고하기'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
