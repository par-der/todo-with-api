import Sidebar from '@/shared/ui/layout/sidebar/sidebar';
import { useEffect, useMemo, useState } from 'react';
import { Calendar, dateFnsLocalizer, View, DateRange } from 'react-big-calendar';
import {
  format,
  parse as dfParse,
  startOfWeek,
  getDay,
  parseISO,
  addDays,
  addMinutes,
  startOfMonth,
  endOfMonth,
  isBefore,
  set as setTime,
  min as dfMin,
  max as dfMax,
} from 'date-fns';
import ru from 'date-fns/locale/ru';
import { Todo } from '@/entities/todo.ts';
import { useGetTodosCalendarQuery, useGetTodosQuery } from '@/shared/services/queries.ts';

const locales = { ru };
const localizer = dateFnsLocalizer({
  format,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

type RbcEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: Todo;
  catClass?: string;
};

const isDateOnly = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) || /^\d{2}\.\d{2}\.\d{4}$/.test(s);

const parseDateLoose = (s: string) => {
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return parseISO(s);
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(s)) return dfParse(s, 'dd.MM.yyyy', new Date());
  return new Date(s);
};

const parseTimeLoose = (base: Date, s: string) => {
  const str = s.trim();

  if (/^\d{4}-\d{2}-\d{2}/.test(str)) return parseISO(str);

  const m = str.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/);
  if (m) {
    const [_, hh, mm, ss] = m;
    return setTime(base, {
      hours: Number(hh),
      minutes: Number(mm),
      seconds: ss ? Number(ss) : 0,
      milliseconds: 0,
    });
  }

  return base;
};

const mapTodoToEvent = (t: Todo): RbcEvent | null => {
  if (!t.due_date) return null;

  const day = parseDateLoose(t.due_date);
  if (isNaN(day.getTime())) return null;

  let start: Date;
  if (t.remind_at && t.remind_at.trim() !== '') {
    start = parseTimeLoose(day, t.remind_at);
  } else if (isDateOnly(t.due_date)) {
    start = setTime(day, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  } else {
    start = day;
  }

  const end = addMinutes(start, 10);
  return { id: t.id, title: t.title, start, end, resource: t };
};

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState<Date>(new Date());

  const [range, setRange] = useState<{ from: Date; to: Date }>(() => ({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  }));

  const { data } = useGetTodosCalendarQuery({
    from: format(range.from, 'yyyy-MM-dd'),
    to: format(range.to, 'yyyy-MM-dd'),
  });

  const events = useMemo<RbcEvent[]>(() => {
    return (data ?? []).map(mapTodoToEvent).filter(Boolean) as RbcEvent[];
  }, [data]);

  const eventPropGetter = (event: RbcEvent) => {
    const t = event.resource!;
    const overdue = !t.completed && isBefore(event.start, new Date());
    const classes = [t.completed ? 'opacity-60 line-through' : '', overdue ? 'ring-2 ring-red-400' : ''].join(' ');
    return { className: classes };
  };

  const handleRangeChange = (r: Date[] | DateRange) => {
    if (Array.isArray(r) && r.length) {
      setRange({ from: dfMin(r), to: dfMax(r) });
    } else if (!Array.isArray(r)) {
      setRange({ from: r.start, to: r.end });
    }
  };

  const messages = {
    date: 'Дата',
    time: 'Время',
    event: 'Событие',
    allDay: 'Весь день',
    week: 'Неделя',
    work_week: 'Раб. неделя',
    day: 'День',
    month: 'Месяц',
    previous: 'Назад',
    next: 'Вперёд',
    today: 'Сегодня',
    agenda: 'Все',
    noEventsInRange: 'Событий нет',
    showMore: (total: number) => `+${total} ещё`,
  };

  const views: View[] = ['month', 'week', 'day', 'agenda'];

  useEffect(() => {
    const rows = (data?.results ?? []).map((t) => ({
      id: t.id,
      due_date: t.due_date,
      remind_at: t.remind_at,
    }));
    console.table(rows);
  }, [data]);

  useEffect(() => {
    console.table(
      events
        .filter((e) => e.start.getDate() === 19 && e.start.getMonth() === 7) // 19 августа
        .map((e) => ({ id: e.id, title: e.title, start: e.start.toString() })),
    );
  }, [events]);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'md:ml-64' : 'md:ml-16'
        } ml-0 overflow-x-hidden`}
      >
        <div className="h-[100svh] p-4">
          <Calendar
            localizer={localizer}
            culture="ru"
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={views}
            date={date}
            onView={setView}
            onNavigate={(d, v) => {
              setDate(d);
              if (v) setView(v);
            }}
            view={view}
            messages={messages}
            popup
            step={30}
            timeslots={2}
            dayLayoutAlgorithm="no-overlap"
            onRangeChange={handleRangeChange}
            eventPropGetter={eventPropGetter}
          />
        </div>
      </main>
    </div>
  );
}
