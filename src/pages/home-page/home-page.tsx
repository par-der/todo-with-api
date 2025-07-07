import { useGetTodosQuery } from '../../services/queries.ts';
import AddTodoForm from '@components/addTodoForm.tsx';
import TodoItem from '@components/todoItem.tsx';
import { mapTodos } from '../../lib/todo-utils.ts';
import { useState } from 'react';
import { usePaginationParams } from '../../lib/usePaginationParams.ts';
import Sidebar from '@components/layout/sidebar/sidebar.tsx';

const HomePage = () => {
  const { page, pageSize, setPage, setSize } = usePaginationParams(15);
  const { data: todos, isError, isLoading, error } = useGetTodosQuery(page, pageSize);
  const { items, next, previous, count } = mapTodos(todos);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((p) => !p);
  const totalPages = Math.ceil(count / pageSize);

  if (isLoading) {
    return <div>Loader...</div>;
  }
  if (isError) {
    return <div>{error?.message || 'что то не так'}</div>;
  }

  const pages: (number | '...')[] =
    totalPages <= 5 ? Array.from({ length: totalPages }, (_, i) => i + 1) : [1, 2, 3, 4, '...', totalPages];

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
        <main
          className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} h-screen overflow-y-auto p-6 w-full`}
        >
          <h1 className="text-2xl font-bold mb-4">Мои задачи (всего: {count})</h1>
          <div className="space-y-4 mt-4">{items && items.map((todo) => <TodoItem key={todo.id} todo={todo} />)}</div>

          <div className="flex gap-2 pt-4 flex-wrap">
            {pages.map((p, idx) =>
              p === '...' ? (
                <span key={'ellipsis-' + idx} className="px-2">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 border rounded
                              ${page === p ? 'bg-gray-200 font-bold' : ''}`}
                >
                  {p}
                </button>
              ),
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;
