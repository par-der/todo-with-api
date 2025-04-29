import { Todo, TodoResponse } from '../entities/todo.ts';
import axios from 'axios';
import { mainConfig } from './axios.ts';

export const getTodos = async (): Promise<Todo[]> => {
  const config = mainConfig();
  const response = await axios.get(`http://localhost:3000/todos/`, config);
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
