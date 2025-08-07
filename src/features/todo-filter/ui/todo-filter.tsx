import { presets } from '../lib/presets';
import { useFilterStore } from '@/stores/filter-store';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/popover';
import { CalendarIcon, CheckCircle2, Search, User } from 'lucide-react';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useLocation } from 'react-router';
import { useUsers } from '@/shared/services/queries.ts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select.tsx';
import React, { useEffect, useState } from 'react';
import { Input } from '@/shared/ui';

interface TodoFilterProps {
  withSearch?: boolean;
}

export const TodoFilter = ({ withSearch = false }: TodoFilterProps) => {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/admin');
  const { dateFrom, dateTo, completed, userId, search, set } = useFilterStore();
  const { data: usersData } = useUsers(isAdminPage);
  const [localSearch, setLocalSearch] = useState(search || '');

  useEffect(() => {
    setLocalSearch(search || '');
  }, [search]);

  const patch = (obj: Parameters<typeof set>[0]) => {
    if (obj.dateFrom === null && obj.dateTo === null && obj.completed === null && obj.userId === null) {
      set({ ...obj, search: null });
    } else {
      set(obj);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    const timeoutId = setTimeout(() => {
      set({ search: value || null });
    }, 10);
    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {withSearch && (
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Поиск задач..."
            value={localSearch}
            onChange={handleSearchChange}
            className="pl-10 w-full"
          />
        </div>
      )}
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

      {(dateFrom || dateTo || completed || userId || (withSearch && search)) && (
        <button
          type="button"
          className="flex items-center gap-1 border rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          onClick={() =>
            patch({
              dateFrom: null,
              dateTo: null,
              completed: null,
              userId: null,
              search: null,
            })
          }
        >
          Сбросить фильтры
        </button>
      )}
    </div>
  );
};
