import { Todo } from '../../entities/todo.ts';
import AddTodoForm from '@components/addTodoForm.tsx';
import TodoItem from '@components/todoItem.tsx';

interface TodoListProps {
  todos: Todo[];
  title?: string;
}

const TodoList = ({ todos, title = 'Today' }: TodoListProps) => {
  return (
    <div className="mx-auto max-w-3xl py-6 px-4">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <AddTodoForm />
      <ul className="space-y-1">
        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
