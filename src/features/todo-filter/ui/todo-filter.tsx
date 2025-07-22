import { presets } from '../lib/presets';
import { useFilterStore } from '@/stores/filter-store';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/popover';
import { CalendarIcon, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { format } from 'date-fns';

export const TodoFilter = () => {
  const { dateFrom, dateTo, completed, patch } = useFilterStore((s) => ({
    dateFrom: s.dateFrom,
    dateTo: s.dateTo,
    completed: s.completed,
    patch: s.patch,
  }));

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
                  patch({ dateFrom: from, dateTo: to });
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
    </div>
  );
};
