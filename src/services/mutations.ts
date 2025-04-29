import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo, deleteTodo, updateTodoCompleted } from './api.ts';
import { TodoResponse } from '../entities/todo.ts';

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
