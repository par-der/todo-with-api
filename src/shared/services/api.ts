import axios from 'axios';
import { apiClient, mainConfig } from './axios.ts';
import { Login, LogoutResponse, Register } from '@/entities/auth.ts';
import { Category, Todo, TodoQueries, TodosResponse, TodoStats, TodoUpdateData } from '@/entities/todo';

export const getTodos = async (params: Record<string, string | number>): Promise<TodoQueries> => {
  const { data } = await apiClient.get('todos/', { params });
  return data;
};

export const updateTodoCompleted = async (id: number, completed: boolean): Promise<Todo[]> => {
  const response = await apiClient.patch(`todos/${id}/`, { completed });
  return response.data;
};

export const updateTodo = async (updateData: TodoUpdateData): Promise<Todo> => {
  const { id, ...data } = updateData;
  const { data: response } = await apiClient.patch(`todos/${id}/`, data);
  return response;
};

export const addTodo = async (data: TodosResponse) => {
  return await apiClient.post('todos/', data);
};

export const deleteTodo = async (id: number) => {
  return await apiClient.delete(`todos/${id}/`);
};

export const loginApi = async (data: Login) => {
  const config = mainConfig();
  return await axios.post(import.meta.env.VITE_API_BASE_URL + 'auth/token/login/', data, config);
};

export const registerApi = async (data: Register) => {
  const config = mainConfig();
  return await axios.post(import.meta.env.VITE_API_BASE_URL + 'auth/users/', data, config);
};

export const logoutApi = async (): Promise<LogoutResponse> => {
  return await apiClient.post('auth/token/logout/');
};

export const getTodosStats = async (): Promise<TodoStats> => {
  const { data } = await apiClient.get('todos/stats/');
  return data;
};
