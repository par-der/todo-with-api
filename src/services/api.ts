import { Todo, TodoQueries, TodoResponse } from '../entities/todo.ts';
import axios from 'axios';
import { apiClient, mainConfig } from './axios.ts';
import { Login } from '../entities/auth.ts';

export const getTodos = async (page = 1, pageSize = 15): Promise<TodoQueries> => {
  const { data } = await apiClient.get('todos/', {
    params: { page, page_size: pageSize },
  });
  return data;
};

export const updateTodoCompleted = async (id: number, completed: boolean): Promise<Todo[]> => {
  const response = await apiClient.patch(`todos/${id}/`, { completed });
  return response.data;
};

export const addTodo = async (data: TodoResponse) => {
  return await apiClient.post('todos/', data);
};

export const deleteTodo = async (id: number) => {
  return await apiClient.delete(`todos/${id}/`);
};

export const loginApi = async (data: Login) => {
  const config = mainConfig();
  return await axios.post(import.meta.env.VITE_API_BASE_URL + 'auth/token/login/', data, config);
};
