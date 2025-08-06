import { presets } from '../lib/presets';
import { useFilterStore } from '@/stores/filter-store';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/popover';
import { CalendarIcon, CheckCircle2, User } from 'lucide-react';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useLocation } from 'react-router';
import { useUsers } from '@/shared/services/queries.ts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select.tsx';

export const TodoFilter = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/admin');
  const { dateFrom, dateTo, completed, userId, set } = useFilterStore();
  const { data: usersData } = useUsers(isAdminPage);

  const patch = (obj: Parameters<typeof set>[0]) => set(obj);
  const users = Array.isArray(usersData) ? usersData : [];

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <button
        type="button"
        onClick={() => patch({ completed: completed ? null : true })}
        className={clsx(
          'flex items-center gap-1 border rounded-md px-3 py-2 text-sm',
          completed ? 'bg-green-100 text-green-700 border-green-300' : 'text-muted-foreground hover:bg-muted',
        )}
      >
        <CheckCircle2 className={clsx('w-4 h-4', completed ? 'text-green-600' : 'text-muted-foreground')} />
        Выполненные
      </button>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={clsx(
              'flex items-center gap-1 border rounded-md px-3 py-2 text-sm min-w-[180px]',
              !(dateFrom && dateTo) && 'text-muted-foreground hover:bg-muted',
            )}
          >
            <CalendarIcon className="w-4 h-4 shrink-0" />
            {dateFrom && dateTo
              ? `${format(new Date(dateFrom), 'dd.MM.yyyy')} – ${format(new Date(dateTo), 'dd.MM.yyyy')}`
              : 'Любая дата'}
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-56">
          <div className="grid gap-2">
            {presets.map(({ label, range }) => (
              <button
                key={label}
                type="button"
                className="px-3 py-1 text-sm hover:bg-muted rounded-md text-left"
                onClick={() => {
                  const [from, to] = range();
                  patch({
                    dateFrom: format(new Date(from), 'yyyy-MM-dd'),
                    dateTo: format(new Date(to), 'yyyy-MM-dd'),
                  });
                }}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              className="px-3 py-1 text-sm text-red-600 hover:bg-muted rounded-md text-left"
              onClick={() => patch({ dateFrom: null, dateTo: null })}
            >
              Сбросить дату
            </button>
          </div>
        </PopoverContent>
      </Popover>

      {isAdminPage && usersData && (
        <div className="min-w-[200px]">
          <Select
            value={userId ? String(userId) : 'all'}
            onValueChange={(value) => patch({ userId: value === 'all' ? null : Number(value) })}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <SelectValue placeholder="Все пользователи" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все пользователи</SelectItem>
              {usersData.results.map((user) => (
                <SelectItem key={user.id} value={String(user.id)}>
                  {user.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {(dateFrom || dateTo || completed || userId) && (
        <button
          type="button"
          className="flex items-center gap-1 border rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          onClick={() =>
            patch({
              dateFrom: null,
              dateTo: null,
              completed: null,
              userId: null,
            })
          }
        >
          Сбросить фильтры
        </button>
      )}
    </div>
  );
};
