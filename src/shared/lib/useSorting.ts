import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router';

export const useSorting = (defaultField = 'created_at') => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortField = searchParams.get('sort_field') || defaultField;
  const sortDirection = (searchParams.get('sort_direction') as 'asc' | 'desc') || 'desc';

  const toggleSort = useCallback(
    (field: string) => {
      setSearchParams((prev) => {
        const newDirection = prev.get('sort_field') === field && prev.get('sort_direction') === 'asc' ? 'desc' : 'asc';

        const newParams = new URLSearchParams(prev);
        newParams.set('sort_field', field);
        newParams.set('sort_direction', newDirection);
        newParams.set('page', '1');

        return newParams;
      });
    },
    [setSearchParams],
  );

  return {
    sortField,
    sortDirection,
    toggleSort,
    getSortingParams: () => ({
      sort_field: sortField,
      sort_direction: sortDirection,
    }),
  };
};
