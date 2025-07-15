import { useQuery } from '@tanstack/react-query';
import { fetchTodayTodos } from '@/features/today-todo-list/api/api.ts';

export const useTodayTodoQuery = (date: string) => {
  return useQuery({
    queryKey: ['todos', date],
    queryFn: () => fetchTodayTodos(date),
  });
};
