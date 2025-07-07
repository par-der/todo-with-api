import { useGetTodosQuery } from '../../services/queries.ts';
import { Loader } from 'lucide-react';
import TodoList from './todoList.tsx';

export default function TodoListContainer() {
  const { data, isError, isLoading, error } = useGetTodosQuery(page, pageSize);
  if (isLoading) return <Loader />;
  if (isError) return <div>{error?.message || 'что то не так'}</div>;
  return <TodoList todos={data ?? []} />;
}
