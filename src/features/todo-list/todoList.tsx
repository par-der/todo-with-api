import { useGetTodosQuery } from '@/shared/services/queries';
import { usePaginationParams } from '@/shared/lib/usePaginationParams';
import { mapTodos } from '@/shared/lib/todo-utils';
import { TodoItem } from '@/entities/todo';
import { Pagination } from '@/shared/ui/pagination';

export const TodoList = () => {
  const { page, pageSize, setPage } = usePaginationParams(15);
  const { data: todos, isError, isLoading, error } = useGetTodosQuery(page, pageSize);
  const { items, count, totalPages } = mapTodos(todos, pageSize);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error?.message || 'Something went wrong'}</div>;
  }

  return (
    <div className="mx-auto max-w-3xl py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">My Todos ({count})</h1>
      <ul className="space-y-2 mt-4">{items && items.map((todo) => <TodoItem key={todo.id} todo={todo} />)}</ul>
      <div className="mt-4">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
};
