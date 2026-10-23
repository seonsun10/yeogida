'use client';

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

const PAGE_SIZE = 12;

type StoredGridState = {
  page: number;
  scrollY: number;
};

type PaginationLabels = {
  navigation: string;
  previous: string;
  next: string;
  pageLabelTemplate: string;
  statusTemplate: string;
};

const DEFAULT_PAGINATION_LABELS: PaginationLabels = {
  navigation: '목록 페이지',
  previous: '이전',
  next: '다음',
  pageLabelTemplate: '{page}페이지',
  statusTemplate: '{current} / {total}페이지',
};

function readStoredState(storageKey: string): StoredGridState | null {
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    if (
      Number.isInteger(parsed?.page) &&
      parsed.page > 0 &&
      typeof parsed?.scrollY === 'number'
    ) {
      return { page: parsed.page, scrollY: parsed.scrollY };
    }

    // 이전 무한 스크롤 버전에서 저장한 위치가 있으면 해당 페이지를 열되,
    // 예전 긴 목록의 스크롤 위치는 복원하지 않는다.
    if (Number.isInteger(parsed?.visibleCount) && parsed.visibleCount > 0) {
      return {
        page: Math.ceil(parsed.visibleCount / PAGE_SIZE),
        scrollY: 0,
      };
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
  return 1;
}

function getPageItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages]);
  for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
    if (page > 1 && page < totalPages) pages.add(page);
  }

  return [...pages].sort((a, b) => a - b);
}

export function ServiceGrid({
  cards,
  storageKey,
  paginationLabels = DEFAULT_PAGINATION_LABELS,
}: {
  cards: ReactNode[];
  storageKey: string;
  paginationLabels?: PaginationLabels;
}) {
  const storedPage = useSyncExternalStore(
    subscribeNoop,
    () => readStoredState(storageKey)?.page ?? 1,
    getServerSnapshot,
  );
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridId = useId();
  const totalPages = Math.max(1, Math.ceil(cards.length / PAGE_SIZE));
  const page = Math.min(selectedPage ?? storedPage, totalPages);
  const pageItems = getPageItems(page, totalPages);

  useLayoutEffect(() => {
    const stored = readStoredState(storageKey);
    if (!stored) return;

    window.scrollTo(0, stored.scrollY);
  }, [storageKey]);

  useEffect(() => {
    const saveState = () => {
      try {
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({ page, scrollY: window.scrollY }),
        );
      } catch {
        // sessionStorage 접근 불가 시 조용히 무시
      }
    };

    saveState();
    return saveState;
  }, [storageKey, page]);

  const goToPage = (nextPage: number) => {
    const targetPage = Math.min(Math.max(nextPage, 1), totalPages);
    setSelectedPage(targetPage);
    requestAnimationFrame(() => {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try {
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({ page: targetPage, scrollY: 0 }),
        );
      } catch {
        // sessionStorage 접근 불가 시 페이지 이동은 계속 가능
      }
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div
        id={gridId}
        ref={gridRef}
        className="grid scroll-mt-24 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cards.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label={paginationLabels.navigation}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <button
              type="button"
              aria-controls={gridId}
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="focus-visible:ring-ring hover:bg-muted inline-flex min-h-10 items-center rounded-md border px-3 text-sm transition-colors outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-40"
            >
              {paginationLabels.previous}
            </button>

            {pageItems.map((pageNumber, index) => {
              const previousPage = pageItems[index - 1];
              const hasGap =
                previousPage !== undefined && pageNumber - previousPage > 1;

              return (
                <span key={pageNumber} className="contents">
                  {hasGap && (
                    <span
                      aria-hidden="true"
                      className="text-muted-foreground px-1"
                    >
                      …
                    </span>
                  )}
                  <button
                    type="button"
                    aria-label={paginationLabels.pageLabelTemplate.replace(
                      '{page}',
                      String(pageNumber),
                    )}
                    aria-current={page === pageNumber ? 'page' : undefined}
                    aria-controls={gridId}
                    onClick={() => goToPage(pageNumber)}
                    className={`focus-visible:ring-ring inline-flex size-10 items-center justify-center rounded-md border text-sm transition-colors outline-none focus-visible:ring-2 ${
                      page === pageNumber
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {pageNumber}
                  </button>
                </span>
              );
            })}

            <button
              type="button"
              aria-controls={gridId}
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="focus-visible:ring-ring hover:bg-muted inline-flex min-h-10 items-center rounded-md border px-3 text-sm transition-colors outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-40"
            >
              {paginationLabels.next}
            </button>
          </div>
          <p
            className="text-muted-foreground text-sm"
            role="status"
            aria-live="polite"
          >
            {paginationLabels.statusTemplate
              .replace('{current}', String(page))
              .replace('{total}', String(totalPages))}
          </p>
        </nav>
      )}
    </div>
  );
}
