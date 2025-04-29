import { useQuery } from '@tanstack/react-query';
import { Todo } from '../entities/todo.ts';
import { getTodos } from './api.ts';

export const useGetTodosQuery = () => {
  return useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
  });
};
