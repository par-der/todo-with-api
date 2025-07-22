import { useQuery } from '@tanstack/react-query';
import { getTodos, getTodosStats } from './api.ts';
import { Category, TodoQueries, TodoStats } from '@/entities/todo';

export const useGetTodosQuery = (params: Record<string, string | number>) => {
  return useQuery<TodoQueries, Error>({
    queryKey: ['todos', params],
    queryFn: () => getTodos(params),
  });
};

export const useGetTodoStatsQuery = () => {
  return useQuery<TodoStats, Error>({
    queryKey: ['todo-stats'],
    queryFn: getTodosStats,
  });
};
