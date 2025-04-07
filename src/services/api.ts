import { Todo } from '../entities/todo.ts';
import axios from 'axios';
import { mainConfig } from './axios.ts';

export const getTodos = async (): Promise<Todo[]> => {
  const config = mainConfig();
  const response = await axios.get('http://localhost:3000/todos', config);
  return response.data;
};
