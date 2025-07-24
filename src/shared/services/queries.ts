import { useQuery } from '@tanstack/react-query';
import { getAdminTodos, getCurrentUser, getTodos, getTodosStats } from './api.ts';
import { Category, PaginatedResponse, TodoAdmin, TodoQueries, TodoStats } from '@/entities/todo';
import { CurrentUser } from '@/shared/types/user.ts';

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

export const useGetAdminTodosQuery = (params: Record<string, number>) => {
  return useQuery<PaginatedResponse<TodoAdmin[]>, Error>({
    queryKey: ['admin-todos', params.page, params.page_size],
    queryFn: () => getAdminTodos(params),
  });
};

export const useCurrentUserQuery = () => {
  return useQuery<CurrentUser, Error>({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
  });
};
