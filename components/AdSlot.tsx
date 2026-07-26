/**
 * 애드센스 승인 전 자리표시자. 승인 후 이 위치에 <ins class="adsbygoogle" .../>와
 * (function(adsbygoogle = window.adsbygoogle || []).push({}))() 스크립트를 삽입한다.
 */
export function AdSlot({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true" data-slot="ad-placeholder" />
  );
}
