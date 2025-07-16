import { useSearchParams } from 'react-router';
import { useCallback } from 'react';

export function usePaginationParams(defaultSize = 15) {
  const [params, setParams] = useSearchParams();

  const page = Number(params.get('page') ?? '1');
  const pageSize = Number(params.get('pageSize') ?? String(defaultSize));

  const apply = useCallback(
    (p: number, s: number) => {
      setParams({ page: String(p), pageSize: String(s) }, { replace: true });
    },
    [setParams],
  );

  const setPage = useCallback((p: number) => apply(p, pageSize), [apply, pageSize]);
  const setSize = useCallback((s: number) => apply(1, s), [apply]);

  return { page, pageSize, setPage, setSize };
}
