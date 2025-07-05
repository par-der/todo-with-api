import { useGetTodosQuery } from '../../services/queries.ts';
import AddTodoForm from '@components/addTodoForm.tsx';
import TodoItem from '@components/todoItem.tsx';
import Sidebar from '@components/sidebar/sidebar.tsx';
import { mapTodos } from '../../lib/todo-utils.ts';
import { useState } from 'react';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data: todos, isError, isLoading, error } = useGetTodosQuery(page);
  const { items, next, previous, count } = mapTodos(todos);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((p) => !p);

  if (isLoading) {
    return <div>Loader...</div>;
  }
  if (isError) {
    return <div>{error?.message || 'что то не так'}</div>;
  }

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
        <main
          className={`transition-all duration-300
+               ${sidebarOpen ? 'ml-64' : 'ml-16'}
+               h-screen overflow-y-auto
+               p-6
+               w-full`}
        >
          <h1 className="text-2xl font-bold mb-4">Мои задачи (всего: {count})</h1>
          <AddTodoForm />
          <div className="space-y-4 mt-4">{items && items.map((todo) => <TodoItem key={todo.id} todo={todo} />)}</div>
          <div className="flex justify-between pt-8">
            {previous && (
              <button
                disabled={!previous}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 border rounded"
              >
                Назад
              </button>
            )}
            {next && (
              <button disabled={!next} onClick={() => setPage((prev) => prev + 1)} className="px-4 py-2 border rounded">
                Далее
              </button>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;
