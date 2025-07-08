import axios from 'axios';
import { apiClient, mainConfig } from './axios.ts';
import { Login, Register } from '@/entities/auth.ts';
import { Todo, TodosResponse } from '@/entities/todo';

export const getTodos = async (page = 1, pageSize = 15): Promise<TodosResponse> => {
  const { data } = await apiClient.get('todos/', {
    params: { page, page_size: pageSize },
  });
  return data;
};

export const updateTodoCompleted = async (id: number, completed: boolean): Promise<Todo[]> => {
  const response = await apiClient.patch(`todos/${id}/`, { completed });
  return response.data;
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
