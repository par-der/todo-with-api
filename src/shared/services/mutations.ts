import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo, deleteTodo, loginApi, registerApi, updateTodoCompleted } from './api.ts';
import { Login, Register } from '@/entities/auth.ts';
import { TodosResponse } from '@/entities/todo';

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
    mutationFn: (data: TodosResponse) => {
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

export const useAuthTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Register) => {
      return registerApi(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
