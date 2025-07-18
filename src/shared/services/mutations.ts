import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo, deleteTodo, loginApi, logoutApi, registerApi, updateTodo, updateTodoCompleted } from './api.ts';
import { Login, Register } from '@/entities/auth.ts';
import { Todo, TodoQueries, TodosResponse, TodoStats, TodoUpdateData } from '@/entities/todo';
import { useAuthStore } from '@/stores/auth-store.ts';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const FIRST_PAGE = 1;
const PAGE_SIZE = 15;

type Ctx = {
  prevPage: TodoQueries | undefined;
  prevStats: TodoStats | undefined;
};

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
    async onMutate(data): Promise<Ctx> {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      await queryClient.cancelQueries({ queryKey: ['todo-stats'] });

      const prevPage = queryClient.getQueryData<TodoQueries>(['todos', FIRST_PAGE, PAGE_SIZE, null]);
      const prevStats = queryClient.getQueryData<TodoStats>(['todo-stats']);

      const optimistic: Todo = {
        id: Date.now(),
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        remind_at: null,
        ...data,
      };

      if (prevPage) {
        queryClient.setQueryData<TodoQueries>(['todos', FIRST_PAGE, PAGE_SIZE, null], {
          ...prevPage,
          count: prevPage.count + 1,
          results: [optimistic, ...prevPage.results],
        });
      }

      if (prevStats) {
        queryClient.setQueryData<TodoStats>(['todo-stats'], {
          ...prevStats,
          total: prevStats.total + 1,
          pending: prevStats.pending + 1,
          by_category: {
            ...prevStats.by_category,
            [optimistic.category]: (prevStats.by_category[optimistic.category] ?? 0) + 1,
          },
        });
      }
      return { prevPage, prevStats };
    },
    onError(_e, _v, ctx) {
      if (ctx?.prevPage) queryClient.setQueryData(['todos', FIRST_PAGE, PAGE_SIZE, null], ctx.prevPage);
      if (ctx?.prevStats) queryClient.setQueryData(['todo-stats'], ctx.prevStats);
      toast.error('Не удалось добавить задачу');
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todo-stats'] });
    },
  });
};

export const useDeleteTodoMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return deleteTodo(id);
    },
    async onMutate(id): Promise<Ctx> {
      await qc.cancelQueries({ queryKey: ['todos'] });
      await qc.cancelQueries({ queryKey: ['todo-stats'] });

      const prevPage = qc.getQueryData<TodoQueries>(['todos', FIRST_PAGE, PAGE_SIZE, null]);
      const prevStats = qc.getQueryData<TodoStats>(['todo-stats']);

      /* ищем, какая это была задача, чтобы корректно уменьшить счётчики */
      const removed = prevPage?.results.find((t) => t.id === id);

      if (prevPage) {
        qc.setQueryData<TodoQueries>(['todos', FIRST_PAGE, PAGE_SIZE, null], {
          ...prevPage,
          count: prevPage.count - 1,
          results: prevPage.results.filter((t) => t.id !== id),
        });
      }

      if (prevStats && removed) {
        qc.setQueryData<TodoStats>(['todo-stats'], {
          ...prevStats,
          total: prevStats.total - 1,
          completed: removed.completed ? prevStats.completed - 1 : prevStats.completed,
          pending: removed.completed ? prevStats.pending : prevStats.pending - 1,
          by_category: {
            ...prevStats.by_category,
            [removed.category]: (prevStats.by_category[removed.category] ?? 1) - 1,
          },
        });
      }

      return { prevPage, prevStats };
    },

    onError(_e, _v, ctx) {
      if (ctx?.prevPage) qc.setQueryData(['todos', FIRST_PAGE, PAGE_SIZE, null], ctx.prevPage);
      if (ctx?.prevStats) qc.setQueryData(['todo-stats'], ctx.prevStats);
      toast.error('Не удалось удалить задачу');
    },

    onSettled() {
      qc.invalidateQueries({ queryKey: ['todos'] });
      qc.invalidateQueries({ queryKey: ['todo-stats'] });
    },
  });
};

export const useToggleCompletedMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: number; completed: boolean }) => updateTodoCompleted(vars.id, vars.completed),

    async onMutate({ id, completed }): Promise<Ctx> {
      await qc.cancelQueries({ queryKey: ['todos'] });
      await qc.cancelQueries({ queryKey: ['todo-stats'] });

      const prevPage = qc.getQueryData<TodoQueries>(['todos', FIRST_PAGE, PAGE_SIZE, null]);
      const prevStats = qc.getQueryData<TodoStats>(['todo-stats']);

      if (prevPage) {
        qc.setQueryData<TodoQueries>(['todos', FIRST_PAGE, PAGE_SIZE, null], {
          ...prevPage,
          results: prevPage.results.map((t) => (t.id === id ? { ...t, completed } : t)),
        });
      }

      if (prevStats) {
        qc.setQueryData<TodoStats>(['todo-stats'], {
          ...prevStats,
          completed: completed ? prevStats.completed + 1 : prevStats.completed - 1,
          pending: completed ? prevStats.pending - 1 : prevStats.pending + 1,
        });
      }

      return { prevPage, prevStats };
    },

    onError(_e, _v, ctx) {
      if (ctx?.prevPage) qc.setQueryData(['todos', FIRST_PAGE, PAGE_SIZE, null], ctx.prevPage);
      if (ctx?.prevStats) qc.setQueryData(['todo-stats'], ctx.prevStats);
      toast.error('Не удалось изменить статус задачи');
    },

    onSettled() {
      qc.invalidateQueries({ queryKey: ['todos'] });
      qc.invalidateQueries({ queryKey: ['todo-stats'] });
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

export const useUpdateTodoMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: TodoUpdateData) => updateTodo(data),

    async onMutate(data): Promise<Ctx> {
      await qc.cancelQueries({ queryKey: ['todos'] });

      const prevPage = qc.getQueryData<TodoQueries>(['todos', FIRST_PAGE, PAGE_SIZE, null]);

      if (prevPage) {
        qc.setQueryData<TodoQueries>(['todos', FIRST_PAGE, PAGE_SIZE, null], {
          ...prevPage,
          results: prevPage.results.map((t) =>
            t.id === data.id ? { ...t, ...data, updated_at: new Date().toISOString() } : t,
          ),
        });
      }

      return { prevPage, prevStats: undefined };
    },

    onError(_e, _v, ctx) {
      if (ctx?.prevPage) qc.setQueryData(['todos', FIRST_PAGE, PAGE_SIZE, null], ctx.prevPage);
      toast.error('Ошибка при обновлении задачи');
    },

    onSuccess() {
      toast.success('Задача обновлена');
    },

    onSettled() {
      qc.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
