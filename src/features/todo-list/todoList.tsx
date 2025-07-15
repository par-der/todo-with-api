import { useGetTodosQuery } from '@/shared/services/queries';
import { usePaginationParams } from '@/shared/lib/usePaginationParams';
import { mapTodos } from '@/shared/lib/todo-utils';
import { TodoItem } from '@/entities/todo/ui/todo-item';
import { Pagination } from '@/shared/ui/pagination';
import { Category, CATEGORY_LABELS } from '@/entities/todo.ts';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TodoListProps {
  selectedCategory?: Category | null;
}

export const TodoList: React.FC<TodoListProps> = ({ selectedCategory }) => {
  const { page, pageSize, setPage } = usePaginationParams(15);
  const listRef = useRef<HTMLDivElement>(null);
  const { data: todos, isError, isLoading, error } = useGetTodosQuery(page, pageSize, selectedCategory);
  const { items, count, totalPages } = mapTodos(todos, pageSize);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    gsap.fromTo(
      list,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
    );
  }, [selectedCategory, items]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, setPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error?.message || 'Что-то пошло не так'}</p>
      </div>
    );
  }

  const getTitle = () => {
    if (selectedCategory) {
      return `${CATEGORY_LABELS[selectedCategory]} (${count})`;
    }
    return `Все задачи (${count})`;
  };

  return (
    <div ref={listRef} className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{getTitle()}</h1>
        {selectedCategory && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {CATEGORY_LABELS[selectedCategory]}
          </span>
        )}
      </div>

      {!items?.length ? (
        <div className="text-center py-8 text-gray-500">
          <p>{selectedCategory ? `Нет задач в категории "${CATEGORY_LABELS[selectedCategory]}"` : 'Нет задач'}</p>
          <p className="text-sm mt-1">Добавьте новую задачу, чтобы начать работать</p>
        </div>
      ) : (
        <>
          <ul className="space-y-2">
            {items.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
