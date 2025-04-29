import { useGetTodosQuery } from '../services/queries.ts';
import TodoItem from '../components/todoItem.tsx';
import AddTodoForm from '../components/addTodoForm.tsx';

const TodoList = () => {
  const { data: todos, isError, isLoading, error } = useGetTodosQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error?.message || 'что то не так'}</div>;
  }
  return (
    <div>
      <AddTodoForm />
      <div className="flex flex-col items-center pt-2.5">
        <div className="w-full max-w-md space-y-2">
          {todos && todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
