import { useSearchParams } from 'react-router';

export function usePaginationParams(defaultSize = 15) {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get('page') ?? '1');
  const pageSize = Number(params.get('pageSize') ?? String(defaultSize));

  const apply = (p: number, s: number) => setParams({ page: String(p), page_size: String(s) }, { replace: true });

  const setPage = (p: number) => apply(p, pageSize);
  const setSize = (s: number) => apply(1, s);

  return { page, pageSize, setPage, setSize };
}
