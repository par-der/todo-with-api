import { Loader } from 'lucide-react';
import { usePaginationParams } from '@/shared/lib/usePaginationParams.ts';
import { useGetTodosQuery } from '@/shared/services/queries.ts';
import { TodoList } from '@/features/todo-list/todoList.tsx';

export default function TodoListContainer() {
  const { page, pageSize } = usePaginationParams(15);
  const { data, isError, isLoading, error } = useGetTodosQuery(page, pageSize);

  if (isLoading) return <Loader />;
  if (isError) return <div>{error?.message || 'что то не так'}</div>;

  return <TodoList todos={data ?? []} />;
}
