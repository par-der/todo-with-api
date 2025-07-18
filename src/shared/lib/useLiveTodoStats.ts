import { Todo, TodoQueries, TodoStats } from '@/entities/todo.ts';
import { useQueryClient } from '@tanstack/react-query';
import { computeStats } from '@/shared/lib/computeStats.ts';
import { useMemo } from 'react';

export const useLiveTodoStats = (): TodoStats | undefined => {
  const qc = useQueryClient();
  const pages = qc.getQueriesData<TodoQueries>({ queryKey: ['todos'] });
  const allTodos: Todo[] = pages.flatMap(([, data]) => data?.results ?? []);

  return useMemo(() => (allTodos.length ? computeStats(allTodos) : undefined), [allTodos]);
};
