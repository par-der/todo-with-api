import { useGetTodosQuery } from '../../services/queries.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card.tsx';
import AddTodoForm from '@components/addTodoForm.tsx';
import TodoItem from '@components/todoItem.tsx';
import { mapTodos } from '../../lib/todo-utils.ts';
import { useState } from 'react';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data: todos, isError, isLoading, error } = useGetTodosQuery(page);
  const { items, next, previous, count } = mapTodos(todos);

  if (isLoading) {
    return <div>Loader...</div>;
  }
  if (isError) {
    return <div>{error?.message || 'что то не так'}</div>;
  }

  return (
    <>
      <div className="px-4 md:px-8 max-w-6xl mx-auto mt-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Мои задачи (всего: {count})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AddTodoForm />
            <div className="space-y-2">{items && items.map((todo) => <TodoItem key={todo.id} todo={todo} />)}</div>
            <div className="flex justify-between pt-4">
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
                <button
                  disabled={!next}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-4 py-2 border rounded"
                >
                  Далее
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default HomePage;
