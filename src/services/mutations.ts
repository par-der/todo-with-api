import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo, deleteTodo, loginApi, updateTodoCompleted } from './api.ts';
import { TodoResponse } from '../entities/todo.ts';
import { Login } from '../entities/auth.ts';

export const useTodoSetCompletedMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: number; completed: boolean }) => {
      return updateTodoCompleted(data.id, data.completed);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TodoResponse) => {
      return addTodo(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return deleteTodo(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useLoginTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Login) => {
      return loginApi(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
