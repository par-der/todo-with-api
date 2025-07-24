import { useGetAdminTodosQuery } from '@/shared/services/queries.ts';
import { useMemo, useState } from 'react';
import { AddTodoModal, FloatingActionButton } from '@/features/add-todo-modal';
import { Button, Pagination } from '@/shared/ui';
import { usePaginationParams } from '../../lib/usePaginationParams.ts';
import { Todo, TodoAdmin } from '@/entities/todo.ts';

export default function AdminPage() {
  const { page, pageSize, setPage } = usePaginationParams(15);
  const { data, isLoading, isError } = useGetAdminTodosQuery({
    page,
    page_size: pageSize,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const admins: TodoAdmin[] = useMemo(() => {
    if (!data) return [];
    const byUser = new Map<number, TodoAdmin>();

    data.results.forEach((todo: any) => {
      const { user, user_username, user_email, user_is_staff, ...todoFields } = todo;

      if (!byUser.has(user)) {
        byUser.set(user, {
          user,
          user_username,
          user_email,
          user_is_staff,
          todos: [],
        });
      }
      byUser.get(user)!.todos.push(todoFields as Todo);
    });

    return Array.from(byUser.values());
  }, [data]);

  const tableRows = useMemo(
    () =>
      admins.flatMap((a) =>
        a.todos.map((t) => ({
          ...t,
          ownerName: a.user_username,
          ownerEmail: a.user_email,
          ownerIsStaff: a.user_is_staff,
        })),
      ),
    [admins],
  );

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
                  <Button size="sm" variant="outline">
                    Изменить
                  </Button>
                  <Button size="sm" variant="destructive">
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

      <FloatingActionButton onClick={() => setIsAddModalOpen(true)} />
      <AddTodoModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} asAdmin />
    </div>
  );
}
