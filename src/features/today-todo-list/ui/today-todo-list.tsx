import { formatISO } from 'date-fns';
import { useTodayTodoQuery } from '@/features/today-todo-list/api/queries.ts';
import { TodoItemToday } from '@/entities/todo/ui/todo-item-today.tsx';
import { Todo } from '@/entities/todo.ts';
import { useState } from 'react';
import { useDeleteTodoMutation, useTodoSetCompletedMutation } from '@/shared/services/mutations.ts';
import { EditTodoModal } from '@/features/edit-todo-modal/ui/edit-todo-modal.tsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog.tsx';

export const TodayTodoList = () => {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodoId, setDeletingTodoId] = useState<number | null>(null);

  const todayIso = formatISO(new Date(), { representation: 'date' });
  const { data, isLoading } = useTodayTodoQuery(todayIso);

  const { mutate: toggleCompleted } = useTodoSetCompletedMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const handleToggle = (id: number, completed: boolean) => {
    toggleCompleted({ id, completed });
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleDelete = (id: number) => {
    setDeletingTodoId(id);
  };

  const confirmDelete = () => {
    if (deletingTodoId) {
      deleteTodo(deletingTodoId, {
        onSuccess: () => {
          setDeletingTodoId(null);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>На сегодня задач нет</p>
        <p className="text-sm mt-1">Добавьте новую задачу, чтобы начать работать</p>
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-2">
        {data.map((todo) => (
          <TodoItemToday
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      <EditTodoModal todo={editingTodo} isOpen={!!editingTodo} onClose={() => setEditingTodo(null)} />

      <AlertDialog open={!!deletingTodoId} onOpenChange={() => setDeletingTodoId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить задачу?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя будет отменить. Задача будет удалена навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingTodoId(null)}>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
