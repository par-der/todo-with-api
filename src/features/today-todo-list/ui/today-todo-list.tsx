import { formatISO } from 'date-fns';
import { useTodayTodoQuery } from '@/features/today-todo-list/api/queries.ts';
import { TodoItemToday } from '@/entities/todo/ui/todo-item-today.tsx';

export const TodayTodoList = () => {
  const todayIso = formatISO(new Date(), { representation: 'date' });
  const { data, isLoading } = useTodayTodoQuery(todayIso);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul className="divide-y divide-muted">{data?.map((todo) => <TodoItemToday key={todo.id} todoList={todo} />)}</ul>
  );
};
