import { useFilterStore } from '@/stores/filter-store';
import { Category } from '@/entities/todo';

export const useTodoParams = (page: number, pageSize: number, selectedCategory: Category | null) => {
  const { dateFrom, dateTo, completed } = useFilterStore();
  return {
    page,
    page_size: pageSize,
    ...(selectedCategory && { category: selectedCategory }),
    ...(dateFrom && { date_from: dateFrom }),
    ...(dateTo && { date_to: dateTo }),
    ...(completed !== null && { completed: Number(completed) }),
  } as Record<string, string | number>;
};
