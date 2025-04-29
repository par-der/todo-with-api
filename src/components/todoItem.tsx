import { Todo } from '../entities/todo.ts';
import { useDeleteTodoMutation, useTodoSetCompletedMutation } from '../services/mutations.ts';
import { Button } from '../components/ui/button.tsx';
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

  const handleCompleted = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    mutate({ id: todo.id, completed: !todo.completed });
  };

  return (
    <div key={todo.id} className="flex justify-between items-center space-x-2 p-2 bg-white rounded shadow-sm">
      <input
        value={todo.id}
        type="checkbox"
        id={`todo-${todo.id}`}
        name={`todo-${todo.id}`}
        checked={todo.completed}
        onChange={handleCompleted}
        className="accent-blue-200 w-5 h-5"
      />
      <label className="font-medium text-lg">{todo.title}</label>
      {todo.description && <span className="text-gray-500 text-3xl">{todo.description}</span>}
      <Button onClick={handleDelete} disabled={isDeletePending} type="button" className="items-end">
        Delete
      </Button>
    </div>
  );
};

export default TodoItem;
