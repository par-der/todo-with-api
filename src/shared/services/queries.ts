import { useQuery } from '@tanstack/react-query';
import { getTodos, getTodosStats } from './api.ts';
import { Category, TodoQueries, TodoStats } from '@/entities/todo';

export const useGetTodosQuery = (page: number, pageSize: number, category?: Category | null) => {
  return useQuery<TodoQueries, Error>({
    queryKey: ['todos', page, pageSize, category],
    queryFn: () => getTodos(page, pageSize, category),
  });
};

export const useGetTodoStatsQuery = () => {
  return useQuery<TodoStats, Error>({
    queryKey: ['todo-stats'],
    queryFn: getTodosStats,
  });
};
