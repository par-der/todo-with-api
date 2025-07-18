import { Todo } from '@/entities/todo.ts';
import { TodoItem } from '@/entities/todo/ui/todo-item';

interface TodoListProps {
  todos: Todo[];
  title?: string;
}

const TodoList = ({ todos, title = 'Today' }: TodoListProps) => {
  return (
    <div className="mx-auto max-w-3xl py-6 px-4">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>

      <ul className="space-y-1">
        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
