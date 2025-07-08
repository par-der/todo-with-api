import { Todo } from '@/entities/todo';
import { useDeleteTodoMutation, useTodoSetCompletedMutation } from '@/shared/services/mutations.ts';
import { Button } from '@/shared/ui/button.tsx';
import { Checkbox } from '@/shared/ui/checkbox.tsx';
import * as React from 'react';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
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
    <div key={todo.id} className="flex justify-between items-start gap-4 border p-4 rounded-lg bg-background shadow-sm">
      <div className="flex items-center gap-3">
        <Checkbox checked={todo.completed} onCheckedChange={handleCompleted} />
        <div className="flex flex-col">
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
