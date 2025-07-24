import { format, addDays, subDays, startOfWeek } from 'date-fns';

export const presets = [
  {
    label: 'Сегодня',
    range: () => {
      const d = format(new Date(), 'yyyy-MM-dd');
      return [d, d] as const;
    },
  },
  {
    label: 'Вчера',
    range: () => {
      const y = format(subDays(new Date(), 1), 'yyyy-MM-dd');
      return [y, y] as const;
    },
  },
  {
    label: 'Прошлая неделя',
    range: () => {
      const mon = startOfWeek(new Date(), { weekStartsOn: 1 });
      return [format(subDays(mon, 7), 'yyyy-MM-dd'), format(subDays(mon, 1), 'yyyy-MM-dd')] as const;
    },
  },
  {
    label: 'Следующая неделя',
    range: () => {
      const mon = startOfWeek(new Date(), { weekStartsOn: 1 });
      return [format(addDays(mon, 7), 'yyyy-MM-dd'), format(addDays(mon, 13), 'yyyy-MM-dd')] as const;
    },
  },
  {
    label: '30 дней назад',
    range: () => [format(subDays(new Date(), 29), 'yyyy-MM-dd'), format(new Date(), 'yyyy-MM-dd')] as const,
  },
  {
    label: '30 дней вперёд',
    range: () => [format(new Date(), 'yyyy-MM-dd'), format(addDays(new Date(), 29), 'yyyy-MM-dd')] as const,
  },
];
