import { apiClient } from '@/shared/services/axios.ts';
import { Todo } from '@/entities/todo.ts';

export const fetchTodayTodos = async (date: string): Promise<Todo[]> => {
  const { data } = await apiClient.get<{ results: Todo[] }>('todos/', { params: { date: date } });
  return data.results;
};
