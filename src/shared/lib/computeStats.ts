import { Todo, TodoStats } from '@/entities/todo.ts';
import { isBefore, isToday } from 'date-fns';

export const emptyStats: TodoStats = {
  total: 0,
  completed: 0,
  pending: 0,
  overdue: 0,
  today: 0,
  by_category: { HEALTH: 0, WORK: 0, MENTAL_HEALTH: 0, STUDY: 0 },
};

export const computeStats = (todos: Todo[]): TodoStats => {
  const s = structuredClone(emptyStats);
  const now = new Date();

  for (const t of todos) {
    t.completed ? (s.completed += 1) : (s.pending += 1);
    if (!t.completed && isBefore(new Date(t.due_date), now)) s.overdue += 1;
    if (isToday(new Date(t.due_date))) s.today += 1;
    s.by_category[t.category] = (s.by_category[t.category] ?? 0) + 1;
  }
  s.total = todos.length;
  return s;
};
