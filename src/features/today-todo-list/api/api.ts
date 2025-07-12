import { apiClient } from '@/shared/services/axios.ts';
import { TodoList } from '@/entities/todo.ts';

export const fetchTodayTodos = async (date: string): Promise<TodoList[]> => {
  const { data } = await apiClient.get<{ results: TodoList[] }>('todos/', { params: { date: date } });
  return data.results;
};
