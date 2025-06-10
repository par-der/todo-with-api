import { Todo } from '../entities/todo.ts';
import { useDeleteTodoMutation, useTodoSetCompletedMutation } from '../services/mutations.ts';
import { Button } from './ui/button.tsx';
import { Checkbox } from './ui/checkbox.tsx';
import * as React from 'react';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = (props: TodoItemProps) => {
  const { todo } = props;
  const { mutate } = useTodoSetCompletedMutation();
  const { mutate: deleteMutation, isPending: isDeletePending } = useDeleteTodoMutation();

  const handleDelete = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    deleteMutation(todo.id);
  };

  const handleCompleted = async (checked: boolean | string) => {
    mutate({ id: todo.id, completed: !!checked });
  };

  return (
    <div
      key={todo.id}
      className="flex justify-between items-center gap-4 border p-3 rounded-md shadow-sm bg-background"
    >
      <div className="flex items-center gap-3">
        <Checkbox checked={todo.completed} onCheckedChange={handleCompleted} />
        <div>
          <p className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>{todo.title}</p>
          {todo.description && <p className="text-sm text-muted-foreground">{todo.description}</p>}
        </div>
      </div>
      <Button size="sm" variant="outline" onClick={handleDelete} disabled={isDeletePending} type="button">
        Delete
      </Button>
    </div>
  );
};

export default TodoItem;
