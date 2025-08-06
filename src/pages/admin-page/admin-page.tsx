import { useGetAdminTodosQuery } from '@/shared/services/queries.ts';
import { useEffect, useState } from 'react';
import { AddTodoModal, FloatingActionButton } from '@/features/add-todo-modal';
import { Button, Pagination } from '@/shared/ui';
import { usePaginationParams } from '../../lib/usePaginationParams.ts';
import { PaginatedAdminTodos, Todo } from '@/entities/todo.ts';
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
import { useDeleteAdminTodoMutation } from '@/shared/services/mutations.ts';
import { useSorting } from '@/shared/lib/useSorting.ts';
import { useFilterStore } from '@/stores/filter-store.ts';
import { TodoFilter } from '@/features/todo-filter/ui/todo-filter.tsx';
import { AdminTable } from '@/features/admin-modal';
import { format } from 'date-fns';

export default function AdminPage() {
  const { page, pageSize, setPage } = usePaginationParams(15);
  const { sortField, sortDirection, toggleSort, getSortingParams } = useSorting('id');
  const { dateFrom, dateTo, completed, userId } = useFilterStore();
  useEffect(() => {
    console.log(sortDirection);
  }, [sortDirection]);
  const { data, isLoading, isError } = useGetAdminTodosQuery({
    page: page,
    page_size: pageSize,
    sort_field: sortField,
    sort_direction: sortDirection,
    date_to: dateTo,
    date_from: dateFrom,
    completed: completed,
    user_id: userId,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutate: deleteTodo } = useDeleteAdminTodoMutation();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<number | null>(null);

  const confirmDelete = () => {
    if (deletingTodo) {
      deleteTodo(deletingTodo, {
        onSuccess: () => {
          setDeletingTodo(null);
        },
      });
    }
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Админская панель</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Добавить задачу</Button>
      </div>

      <TodoFilter />

      <AdminTable
        data={data}
        isLoading={isLoading}
        isError={isError}
        toggleSort={toggleSort}
        renderSortIcon={renderSortIcon}
        onEdit={(todo) => {
          setEditingTodo(todo);
          setIsEditModalOpen(true);
        }}
        onDelete={(id) => {
          setDeletingTodo(id);
          setIsDeleteModalOpen(true);
        }}
      />

      {data && data.count > pageSize && (
        <div className="mt-6 flex justify-center">
          <Pagination currentPage={page} totalPages={Math.ceil(data.count / pageSize)} onPageChange={setPage} />
        </div>
      )}

      <EditTodoModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTodo(null);
        }}
        todo={editingTodo}
        asAdmin={true}
      />

      <FloatingActionButton onClick={() => setIsAddModalOpen(true)} />
      <AddTodoModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} asAdmin />

      <AlertDialog open={!!deletingTodo} onOpenChange={() => setDeletingTodo(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить задачу?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя будет отменить. Задача будет удалена навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingTodo(null)}>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
