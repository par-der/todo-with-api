import { useQuery } from '@tanstack/react-query';
import { getAdminTodos, getAllUsers, getCurrentUser, getTodos, getTodosCalendar, getTodosStats } from './api.ts';
import { AdminSort, AdminTodo, PaginatedResponse, Todo, TodoQueries, TodoStats } from '@/entities/todo';
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

export const useGetAdminTodosQuery = (params: AdminSort) => {
  return useQuery<PaginatedResponse<AdminTodo>, Error>({
    queryKey: [
      'admin-todos',
      params.page,
      params.page_size,
      params.sort_field,
      params.sort_direction,
      params.date_to,
      params.date_from,
      params.completed,
      params.user_id,
      params.search,
    ],
    queryFn: () => getAdminTodos(params),
  });
};

export const useCurrentUserQuery = () => {
  return useQuery<CurrentUser, Error>({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
  });
};

export const useUsers = (asAdmin: boolean) => {
  return useQuery<PaginatedResponse<CurrentUser>, Error>({
    queryKey: ['all-users', asAdmin],
    queryFn: getAllUsers,
    enabled: asAdmin,
  });
};

export const useGetTodosCalendarQuery = (params: { from: string; to: string }) => {
  return useQuery<Todo[], Error>({
    queryKey: ['todo-calendar', params],
    queryFn: () => getTodosCalendar(params),
  });
};
