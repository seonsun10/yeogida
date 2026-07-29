// NEXT_PUBLIC_ADSENSE_CLIENT_ID(예: ca-pub-1234567890123456)가 설정된 경우에만
// ads.txt를 응답한다. 미설정 상태에서 빈 파일을 내보내면 오히려 "판매자 미확인"
// 경고를 유발할 수 있어 404로 응답한다.
export async function GET() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  if (!clientId) {
    return new Response('Not found', { status: 404 });
  }

  const publisherId = clientId.replace(/^ca-/, '');
  const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
