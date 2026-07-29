import type { Metadata } from 'next';
import { CopyEmailButton } from '@/components/CopyEmailButton';

const SUBMIT_EMAIL = process.env.NEXT_PUBLIC_SUBMIT_EMAIL ?? '';

export const metadata: Metadata = {
  title: '서비스 제보하기',
  description:
    '몰라서 못 쓰는 유용한 생활 서비스를 알고 계신가요? 여기다에 제보해주세요.',
};

const MAIL_SUBJECT = '[여기다] 서비스 제보';
const MAIL_BODY = [
  '서비스명: ',
  '서비스 링크: ',
  '어떤 서비스인지 간단한 설명: ',
  '(선택) 회신받을 연락처: ',
].join('\n');

export default function SubmitPage() {
  const mailtoHref = SUBMIT_EMAIL
    ? `mailto:${SUBMIT_EMAIL}?subject=${encodeURIComponent(
        MAIL_SUBJECT,
      )}&body=${encodeURIComponent(MAIL_BODY)}`
    : '';

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">서비스 제보하기</h1>
        <p className="text-zinc-600">
          몰라서 못 쓰는 유용한 생활 서비스를 알고 계신가요? 아래 이메일로
          알려주시면 검토 후 등록하겠습니다.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-6">
        <span className="text-sm font-medium text-zinc-500">제보 이메일</span>
        {SUBMIT_EMAIL ? (
          <>
            <a
              href={mailtoHref}
              className="text-lg font-semibold text-zinc-900 underline underline-offset-2"
            >
              {SUBMIT_EMAIL}
            </a>
            <div>
              <CopyEmailButton email={SUBMIT_EMAIL} />
            </div>
          </>
        ) : (
          <span className="text-zinc-400">
            제보 이메일이 아직 설정되지 않았습니다. 잠시 후 다시 시도해주세요.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 text-sm text-zinc-600">
        <p className="font-medium text-zinc-800">이런 내용을 포함해주세요</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>서비스명</li>
          <li>서비스 링크</li>
          <li>어떤 서비스인지 간단한 설명</li>
          <li>(선택) 회신받을 연락처</li>
        </ul>
        <p>
          위 이메일 링크를 누르면 메일 앱에서 제목과 항목이 자동으로
          채워집니다. 메일 앱이 연결되어 있지 않다면 이메일 주소를 복사해
          직접 보내주세요.
        </p>
        <p>
          검토 후 등록 여부를 결정하며, 별도 연락은 드리지 않을 수 있습니다.
        </p>
      </div>
    </div>
  );
}
