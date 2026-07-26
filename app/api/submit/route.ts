import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type SubmitPayload = {
  serviceName: string;
  url: string;
  description: string;
  contact?: string;
  website?: string; // honeypot — 비어있어야 정상 제출
};

function isValidPayload(body: unknown): body is SubmitPayload {
  if (typeof body !== 'object' || body === null) return false;
  const { serviceName, url, description } = body as Record<string, unknown>;
  return (
    typeof serviceName === 'string' &&
    serviceName.trim().length > 0 &&
    typeof url === 'string' &&
    url.trim().length > 0 &&
    typeof description === 'string' &&
    description.trim().length > 0
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: '필수 항목을 모두 입력해주세요.' },
      { status: 400 },
    );
  }

  // honeypot 필드가 채워져 있으면 스팸으로 간주 — 봇에게 성공처럼 응답
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.SUBMIT_FROM_EMAIL;
  const toEmail = process.env.SUBMIT_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error(
      '제보 폼 이메일 발송 설정 누락: RESEND_API_KEY / SUBMIT_FROM_EMAIL / SUBMIT_TO_EMAIL 환경변수를 확인하세요.',
    );
    return NextResponse.json(
      { error: '제보 접수에 실패했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const { serviceName, url, description, contact } = body;

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject: `[서비스 제보] ${serviceName}`,
    text: [
      `서비스명: ${serviceName}`,
      `링크: ${url}`,
      `설명: ${description}`,
      `제보자 연락처: ${contact || '미입력'}`,
    ].join('\n'),
  });

  if (error) {
    console.error('Resend 이메일 발송 실패:', error);
    return NextResponse.json(
      { error: '제보 접수에 실패했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
