'use client';

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

const PAGE_SIZE = 12;

type StoredGridState = {
  visibleCount: number;
  scrollY: number;
};

function readStoredState(storageKey: string): StoredGridState | null {
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.visibleCount === 'number' &&
      typeof parsed?.scrollY === 'number'
    ) {
      return parsed;
    }
  } catch {
    // sessionStorage 접근 불가 또는 손상된 값 → 무시
  }
  return null;
}

function subscribeNoop() {
  return () => {};
}

function getServerSnapshot() {
  return 0;
}

export function ServiceGrid({
  cards,
  storageKey,
}: {
  cards: ReactNode[];
  storageKey: string;
}) {
  // 상세 페이지에서 돌아왔을 때 이전에 불러온 개수를 세션 스토리지에서 읽어온다.
  // getServerSnapshot은 서버 렌더링 결과와 동일하게 0을 반환해 하이드레이션 안전성을 지킨다.
  const storedVisibleCount = useSyncExternalStore(
    subscribeNoop,
    () => readStoredState(storageKey)?.visibleCount ?? 0,
    getServerSnapshot,
  );

  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(PAGE_SIZE, cards.length),
  );
  const displayCount = Math.min(
    Math.max(visibleCount, storedVisibleCount),
    cards.length,
  );

  const sentinelRef = useRef<HTMLDivElement>(null);

  // 카테고리 페이지로 돌아왔을 때 저장해둔 스크롤 위치를 한 번만 복원한다.
  // displayCount가 같은 렌더에서 이미 복원된 개수를 반영하므로 DOM 높이가 충분한 상태에서 실행된다.
  useLayoutEffect(() => {
    const stored = readStoredState(storageKey);
    if (stored) window.scrollTo(0, stored.scrollY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((count) => Math.min(count + PAGE_SIZE, cards.length));
        }
      },
      { rootMargin: '400px' },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [cards.length]);

  // 상세 페이지 등 다른 곳으로 이동할 때 현재 표시 개수와 스크롤 위치를 저장해 둔다.
  useEffect(() => {
    return () => {
      try {
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({ visibleCount: displayCount, scrollY: window.scrollY }),
        );
      } catch {
        // sessionStorage 접근 불가 시 조용히 무시
      }
    };
  }, [storageKey, displayCount]);

  const hasMore = displayCount < cards.length;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.slice(0, displayCount)}
      </div>
      {hasMore && <div ref={sentinelRef} aria-hidden className="h-1" />}
    </div>
  );
}
