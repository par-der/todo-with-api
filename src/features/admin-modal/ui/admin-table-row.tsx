import { AdminTodo } from '@/entities/todo.ts';
import { Button } from '@/shared/ui';
import { Edit2 } from 'lucide-react';

interface AdminTableRowProps {
  row: AdminTodo & {
    ownerName: string;
    ownerEmail: string;
    ownerIsStaff: boolean;
  };
  onEdit: (todo: AdminTodo) => void;
  onDelete: (id: number) => void;
}

export const AdminTableRow = ({ row, onEdit, onDelete }: AdminTableRowProps) => {
  return (
    <tr className="border-b hover:bg-zinc-50">
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
        <Button size="sm" variant="outline" onClick={() => onEdit(row)}>
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onDelete(row.id)}>
          Удалить
        </Button>
      </td>
    </tr>
  );
};
