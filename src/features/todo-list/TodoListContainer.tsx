import { TodoList } from '@/features/todo-list/todoList.tsx';
import { useGetTodosQuery } from '@/shared/services/queries.ts';

export default function TodoListContainer({
  params,
  setPage,
}: {
  params: Record<string, string | number>;
  setPage: (p: number) => void;
}) {
  const { data, isLoading, isError, error } = useGetTodosQuery(params);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="text-red-500">{error?.message}</div>;

  return (
    <TodoList
      todos={data?.results ?? []}
      pageCount={Math.ceil((data?.count ?? 0) / Number(params.page_size))}
      onPageChange={setPage}
    />
  );
}
