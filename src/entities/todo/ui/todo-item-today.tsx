import { Todo, CATEGORY_COLORS, CATEGORY_LABELS } from '@/entities/todo.ts';
import { Checkbox } from '@/shared/ui';
import { Button } from '@/shared/ui/button';
import { format, parse } from 'date-fns';
import { ClockIcon, Edit2, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';
import { Badge } from '@/shared/ui/badge.tsx';

interface Props {
  todo: Todo;
  onToggle?: (id: number, completed: boolean) => void;
  onEdit?: (todo: Todo) => void;
  onDelete?: (id: number) => void;
}

export const TodoItemToday = ({ todo, onToggle, onEdit, onDelete }: Props) => {
  const timeLabel = todo.remind_at && format(parse(todo.remind_at, 'HH:mm:ss', new Date()), 'HH:mm');

  return (
    <li className="group flex items-start gap-3 py-4 px-3 hover:bg-gray-50 rounded-lg transition-colors">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle?.(todo.id, !todo.completed)}
        className="mt-1"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p
              className={clsx(
                'text-base font-medium leading-relaxed',
                todo.completed && 'line-through text-muted-foreground',
              )}
            >
              {todo.title}
            </p>

            {todo.description && (
              <p className={clsx('text-sm text-gray-600 mt-1', todo.completed && 'line-through text-muted-foreground')}>
                {todo.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" onClick={() => onEdit?.(todo)} className="h-8 w-8 p-0">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete?.(todo.id)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className={clsx('text-xs font-medium border', CATEGORY_COLORS[todo.category])}>
            {CATEGORY_LABELS[todo.category]}
          </Badge>

          {timeLabel && (
            <Badge variant="outline" className="text-xs font-medium gap-1">
              <ClockIcon className="w-3 h-3" />
              {timeLabel}
            </Badge>
          )}
        </div>
      </div>
    </li>
  );
};
