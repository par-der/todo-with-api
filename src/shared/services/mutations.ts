import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo, deleteTodo, loginApi, logoutApi, registerApi, updateTodoCompleted } from './api.ts';
import { Login, Register } from '@/entities/auth.ts';
import { TodosResponse } from '@/entities/todo';
import { useAuthStore } from '@/stores/auth-store.ts';
import { useNavigate } from 'react-router';

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

export const useLogoutTodoMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const clearAuth = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      navigate('/login', { replace: true });
    },
  });
};
