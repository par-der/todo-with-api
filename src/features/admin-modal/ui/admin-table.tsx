import { AdminTodo, PaginatedAdminTodos } from '@/entities/todo.ts';
import { AdminTableRow } from '@/features/admin-modal/ui/admin-table-row.tsx';

interface AdminTableProps {
  data: PaginatedAdminTodos;
  isError: boolean;
  isLoading: boolean;
  toggleSort: (field: string) => void;
  renderSortIcon: (field: string) => string | null;
  onEdit: (todo: AdminTodo) => void;
  onDelete: (id: number) => void;
}

export const AdminTable = ({
  data,
  isLoading,
  isError,
  toggleSort,
  renderSortIcon,
  onEdit,
  onDelete,
}: AdminTableProps) => {
  if (isLoading) return <div className="p-6">Загрузка…</div>;
  if (isError || !data) return <div className="p-6">Ошибка загрузки</div>;

  const tableRows = data.results.map((todo) => ({
    ...todo,
    ownerName: todo.user_username,
    ownerEmail: todo.user_email,
    ownerIsStaff: todo.user_is_staff,
  }));

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200">
      <table className="w-full table-auto border-collapse text-sm">
        <thead className="bg-zinc-50">
          <tr>
            <th
              className="border-b px-3 py-2 text-left cursor-pointer hover:bg-zinc-100"
              onClick={() => toggleSort('id')}
            >
              ID {renderSortIcon('id')}
            </th>
            <th className="border-b px-3 py-2 text-left">Пользователь</th>
            <th
              className="border-b px-3 py-2 text-left cursor-pointer hover:bg-zinc-100"
              onClick={() => toggleSort('title')}
            >
              Задача {renderSortIcon('title')}
            </th>
            <th className="border-b px-3 py-2 text-left">Категория</th>
            <th className="border-b px-3 py-2 text-left">Выполнена</th>
            <th className="border-b px-3 py-2 text-left">Создана</th>
            <th className="border-b px-3 py-2 text-left">Действия</th>
          </tr>
        </thead>

        <tbody>
          {tableRows.map((row) => (
            <AdminTableRow key={row.id} row={row} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
