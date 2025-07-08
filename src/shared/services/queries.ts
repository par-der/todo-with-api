import { useQuery } from '@tanstack/react-query';
import { TodoQueries } from '../entities/todo.ts';
import { getTodos } from './api.ts';

export const useGetTodosQuery = (page: number, pageSize: number) => {
  return useQuery<TodoQueries, Error>({
    queryKey: ['todos', page, pageSize],
    queryFn: () => getTodos(page, pageSize),
  });
};
