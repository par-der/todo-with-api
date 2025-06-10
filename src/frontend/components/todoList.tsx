import { useGetTodosQuery } from '../services/queries.ts';
import TodoItem from './todoItem.tsx';
import AddTodoForm from './addTodoForm.tsx';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card.tsx';

const TodoList = () => {
  const { data: todos, isError, isLoading, error } = useGetTodosQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error?.message || 'что то не так'}</div>;
  }
  return (
    <div className="flex justify-center mt-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Мои задачи</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AddTodoForm />
          <div className="space-y-2">{todos && todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoList;
