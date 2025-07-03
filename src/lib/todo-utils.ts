import { Todo, TodoQueries } from '../entities/todo.ts';

export const mapTodos = (
  data?: TodoQueries,
): { items: Todo[]; next: string | null; previous: string | null; count: number } => {
  return {
    items: data?.results ?? [],
    next: data?.next ?? null,
    previous: data?.previous ?? null,
    count: data?.count ?? 0,
  };
};
