import { useGetAdminTodosQuery } from '@/shared/services/queries.ts';
import { useMemo, useState } from 'react';
import { AddTodoModal, FloatingActionButton } from '@/features/add-todo-modal';
import { Button, Pagination } from '@/shared/ui';
import { usePaginationParams } from '../../lib/usePaginationParams.ts';
import { AdminTodo, PaginatedAdminTodos, Todo } from '@/entities/todo.ts';
import { EditTodoModal } from '@/features/edit-todo-modal/ui/edit-todo-modal.tsx';
import { Edit2 } from 'lucide-react';
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

export default function AdminPage() {
  const { page, pageSize, setPage } = usePaginationParams(15);
  const { data, isLoading, isError } = useGetAdminTodosQuery({
    page,
    page_size: pageSize,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutate: deleteTodo } = useDeleteAdminTodoMutation();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<number | null>(null);

  interface TableRow extends AdminTodo {
    ownerName: string;
    ownerEmail: string;
    ownerIsStaff: boolean;
  }

  const tableRows = useMemo<TableRow[]>(() => {
    if (!data) return [];

    const adminData = data as PaginatedAdminTodos;

    return adminData.results.map((todo: AdminTodo) => ({
      ...todo,
      ownerName: todo.user_username,
      ownerEmail: todo.user_email,
      ownerIsStaff: todo.user_is_staff,
    }));
  }, [data]);

  const confirmDelete = () => {
    if (deletingTodo) {
      deleteTodo(deletingTodo, {
        onSuccess: () => {
          setDeletingTodo(null);
        },
      });
    }
  };

  if (isLoading) return <div className="p-6">Загрузка…</div>;
  if (isError || !data) return <div className="p-6">Ошибка загрузки</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Админская панель</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Добавить задачу</Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-200">
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-zinc-50">
            <tr>
              <th className="border-b px-3 py-2 text-left">ID</th>
              <th className="border-b px-3 py-2 text-left">Пользователь</th>
              <th className="border-b px-3 py-2 text-left">Задача</th>
              <th className="border-b px-3 py-2 text-left">Категория</th>
              <th className="border-b px-3 py-2 text-left">Выполнена</th>
              <th className="border-b px-3 py-2 text-left">Создана</th>
              <th className="border-b px-3 py-2 text-left">Действия</th>
            </tr>
          </thead>

          <tbody>
            {tableRows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-zinc-50">
                <td className="px-3 py-2">{row.id}</td>
                <td className="px-3 py-2">
                  {row.ownerName}
                  <br />
                  <span className="text-xs text-zinc-500">{row.ownerEmail}</span>
                  {row.ownerIsStaff && <span className="ml-1 text-[10px] text-blue-600">(admin)</span>}
                </td>
                <td className="px-3 py-2">{row.title}</td>
                <td className="px-3 py-2">{row.category}</td>
                <td className="px-3 py-2">{row.completed ? '✔️' : '—'}</td>
                <td className="px-3 py-2">{new Date(row.created_at).toLocaleDateString()}</td>
                <td className="px-3 py-2 space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingTodo(row);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setDeletingTodo(row.id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.count > pageSize && (
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
