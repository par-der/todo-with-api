import { TodoList } from '@/entities/todo.ts';
import { Checkbox } from '@/shared/ui';
import { format, parse } from 'date-fns';
import { Badge, ClockIcon } from 'lucide-react';
import { clsx } from 'clsx';

const CATEGORY_COLORS: Record<TodoList['category'], string> = {
  HEALTH: 'bg-blue-100 text-blue-600',
  WORK: 'bg-green-100 text-green-600',
  MENTAL_HEALTH: 'bg-purple-100 text-purple-600',
  STUDY: 'bg-red-100 text-white-600',
};

interface Props {
  todoList: TodoList;
  onToggle?: (id: number, completed: boolean) => void;
}

export const TodoItemToday = ({ todoList, onToggle }: Props) => {
  const timeLabel = todoList.remind_at && format(parse(todoList.remind_at, 'HH:mm:ss', new Date()), 'h:mm a');

  return (
    <li className="flex items-start gap-3 py-4">
      <Checkbox checked={todoList.completed} onCheckedChange={() => onToggle?.(todoList.id, !todoList.completed)} />
      <div className="flex-1">
        <p className={clsx('text-base font-medium', todoList.completed && 'line-through text-muted-foreground')}>
          {todoList.title}
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          <Badge className={CATEGORY_COLORS[todoList.category]}>{todoList.category.replace('_', ' ')}</Badge>

          {timeLabel && (
            <Badge className="gap-1">
              <ClockIcon className="w-3.5 h-3.5" />
              {timeLabel}
            </Badge>
          )}
        </div>
      </div>
    </li>
  );
};
