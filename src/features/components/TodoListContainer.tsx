import { useGetTodosQuery } from '../../services/queries.ts';
import { Loader } from 'lucide-react';
import TodoList from './todoList.tsx';
import { usePaginationParams } from '../../lib/usePaginationParams.ts';

export default function TodoListContainer() {
  const { page, pageSize } = usePaginationParams(15);
  const { data, isError, isLoading, error } = useGetTodosQuery(page, pageSize);

  if (isLoading) return <Loader />;
  if (isError) return <div>{error?.message || 'что то не так'}</div>;

  return <TodoList todos={data ?? []} />;
}
