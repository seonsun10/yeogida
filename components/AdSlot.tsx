/**
 * 애드센스 승인 전 자리표시자. 승인 후 이 위치에 <ins class="adsbygoogle" .../>와
 * (function(adsbygoogle = window.adsbygoogle || []).push({}))() 스크립트를 삽입한다.
 */
export function AdSlot(props: { className?: string }) {
  void props;
  // 광고가 없는 동안에는 빈 테두리나 높이를 남기지 않는다.
  return null;
}
