import { Todo, TodosResponse } from '@/entities/todo';

export const mapTodos = (data: TodosResponse | undefined, pageSize: number) => {
  if (!data) {
    return { items: [], next: null, previous: null, count: 0, totalPages: 0 };
  }

  const totalPages = Math.ceil(data.count / pageSize);

  return {
    items: data.results,
    next: data.next,
    previous: data.previous,
    count: data.count,
    totalPages,
  };
};
