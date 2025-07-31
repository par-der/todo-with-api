import axios from 'axios';
import { apiClient, mainConfig } from './axios.ts';
import { Login, LogoutResponse, Register } from '@/entities/auth.ts';
import {
  PaginatedResponse,
  Todo,
  TodoAdmin,
  TodoFormData,
  TodoQueries,
  TodosResponse,
  TodoStats,
  TodoUpdateData,
} from '@/entities/todo';
import { CurrentUser } from '@/shared/types/user.ts';

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

export const getAdminTodos = async (params: Record<string, number>) => {
  const { data } = await apiClient.get<PaginatedResponse<TodoAdmin[]>>('admin/todos/', { params });
  return data;
};

export const addAdminTodo = async (data: TodoFormData) => {
  return await apiClient.post('admin/todos/', data);
};

export const updateAdminTodo = async (updateData: TodoUpdateData): Promise<Todo> => {
  const { id, ...data } = updateData;
  const { data: response } = await apiClient.patch(`admin/todos/${id}/`, data);
  return response;
};

export const deleteAdminTodo = async (id: number) => {
  return await apiClient.delete(`admin/todos/${id}/`);
};

export const getCurrentUser = async (): Promise<CurrentUser> => {
  const { data } = await apiClient.get<CurrentUser>('auth/users/me/');
  return data;
};

export const getAllUsers = async (): Promise<CurrentUser> => {
  const { data } = await apiClient.get<CurrentUser>(`auth/users/`);
  return data;
};
