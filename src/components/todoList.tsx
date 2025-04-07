import { useGetTodosQuery } from '../services/queries.ts';

const TodoList = () => {
  const { data: todos, isError, isLoading, error } = useGetTodosQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
   return <div>{error?.message || 'Что-то пошло не так'}</div>;
  }
  return (
    <>
      <div className="flex flex-col items-center pt-2.5">
        <ul className="w-full max-w-md space-y-2">{
          todos&&todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <span>{todo.description}</span>
            </li>
          ))
        }</ul>
      </div>
    </>
  );
};
export default TodoList;
