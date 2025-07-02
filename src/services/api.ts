import { Todo, TodoResponse } from '../entities/todo.ts';
import axios from 'axios';
import { apiClient, mainConfig } from './axios.ts';
import { Login } from '../entities/auth.ts';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await apiClient.get(`todos/`); // вынести base url как общий
  return response.data;
};

export const updateTodoCompleted = async (id: number, completed: boolean): Promise<Todo[]> => {
  const config = mainConfig();
  const response = await axios.patch(`http://localhost:3000/todos/${id}`, { completed }, config);
  return response.data;
};

export const addTodo = async (data: TodoResponse) => {
  const config = mainConfig();
  return await axios.post('http://localhost:3000/todos', data, config);
};

export const deleteTodo = async (id: number) => {
  const config = mainConfig();
  return await axios.delete(`http://localhost:3000/todos/${id}`, config);
};

export const loginApi = async (data: Login) => {
  const config = mainConfig();
  return await axios.post(import.meta.env.VITE_API_BASE_URL + 'auth/token/login/', data, config);
};
