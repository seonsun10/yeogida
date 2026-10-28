import type { EditorialNotes as Notes } from '@/types/editorial';

export function EditorialNotes({ notes }: { notes: Notes }) {
  return (
    <section
      aria-label="이용 안내"
      className="flex flex-col gap-8 border-t pt-8"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">이용하기 전에</h2>
        <p className="leading-relaxed">{notes.audience}</p>
        <p className="text-muted-foreground text-xs">
          여기다 편집 · 공식 자료 확인{' '}
          <time dateTime={notes.reviewedAt}>{notes.reviewedAt}</time>
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-bold">미리 준비할 것</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
          {notes.preparation.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-bold">시작하는 순서</h3>
        <ol className="list-decimal space-y-3 pl-5 leading-relaxed">
          {notes.steps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>
      <div className="bg-muted/30 flex flex-col gap-3 rounded-lg border p-4">
        <h3 className="font-bold">헷갈리기 쉬운 점</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
          {notes.cautions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <h3 className="font-bold">확인한 공식 안내</h3>
        {notes.sources.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit underline underline-offset-4"
          >
            {source.label}
          </a>
        ))}
        <p className="text-muted-foreground">
          요금과 이용 조건은 바뀔 수 있어요. 신청·결제 전 공식 안내를 한 번 더
          확인해 주세요.
        </p>
      </div>
    </section>
  );
}
