import { useQuery } from '@tanstack/react-query';
import { getTodos } from './api.ts';
import { TodoQueries } from '@/entities/todo';

export const useGetTodosQuery = (page: number, pageSize: number) => {
  return useQuery<TodoQueries, Error>({
    queryKey: ['todos', page, pageSize],
    queryFn: () => getTodos(page, pageSize),
  });
};
