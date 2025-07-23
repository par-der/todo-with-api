import { useGetTodosQuery } from '@/shared/services/queries';
import { usePaginationParams } from '@/shared/lib/usePaginationParams';
import { mapTodos } from '@/shared/lib/todo-utils';
import { Pagination } from '@/shared/ui/pagination';
import { Category, CATEGORY_LABELS, Todo } from '@/entities/todo.ts';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  useDeleteTodoMutation,
  useToggleCompletedMutation,
  useToggleCompletedMutationSimple,
} from '@/shared/services/mutations.ts';
import { TodoItemToday } from '@/entities/todo/ui/todo-item-today.tsx';
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

interface TodoListProps {
  selectedCategory?: Category | null;
  onPageChange: (page: number) => void;
  params: Record<string, string | number>;
}

export const TodoList: React.FC<TodoListProps> = ({ selectedCategory, onPageChange, params }) => {
  const { page, pageSize, setPage } = usePaginationParams(15);
  const listRef = useRef<HTMLDivElement>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodoId, setDeletingTodoId] = useState<number | null>(null);
  // const filtersReady = dateFrom !== undefined && dateTo !== undefined && completed !== undefined;
  // const params = useTodoParams(page, pageSize, selectedCategory);

  const { data: todos, isLoading, isError } = useGetTodosQuery(params);
  const { items, count, totalPages } = mapTodos(todos, pageSize);

  const { mutate: toggleCompleted } = useToggleCompletedMutationSimple();
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

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    gsap.fromTo(
      list,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
    );
  }, [selectedCategory]);

  useEffect(() => {
    setPage(1);
    onPageChange(1);
  }, [selectedCategory, params.date_from, params.date_to, params.completed]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error?.message || 'Что-то пошло не так'}</p>
      </div>
    );
  }

  const getTitle = () => {
    if (selectedCategory) {
      return `${CATEGORY_LABELS[selectedCategory]} (${count})`;
    }
    return `Все задачи (${count})`;
  };

  return (
    <>
      <div ref={listRef} className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{getTitle()}</h1>
          {selectedCategory && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {CATEGORY_LABELS[selectedCategory]}
            </span>
          )}
        </div>

        {!items?.length ? (
          <div className="text-center py-8 text-gray-500">
            <p>{selectedCategory ? `Нет задач в категории "${CATEGORY_LABELS[selectedCategory]}"` : 'Нет задач'}</p>
            <p className="text-sm mt-1">Добавьте новую задачу, чтобы начать работать</p>
          </div>
        ) : (
          <>
            <ul className="space-y-2">
              {items.map((todo) => (
                <TodoItemToday
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </ul>

            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(newPage) => {
                    setPage(newPage);
                    onPageChange(newPage);
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>

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
