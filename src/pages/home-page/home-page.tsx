import { useCallback, useState } from 'react';
import { TodoList } from '@/features/todo-list';
import Sidebar from '@/shared/ui/layout/sidebar/sidebar';
import { LogoutButton } from '@/shared/ui/logout-button.tsx';
import { Category } from '@/entities/todo.ts';
import { useGetTodoStatsQuery } from '@/shared/services/queries.ts';
import CategoryCards from '@/features/category-cards/ui/CategoryCards.tsx';
import { FloatingActionButton } from '@/features/add-todo-modal/ui/floating-action-button.tsx';
import { AddTodoModal } from '@/features/add-todo-modal/ui/add-todo-modal.tsx';
import { TodoFilter } from '@/features/todo-filter/ui/todo-filter.tsx';
import { useTodoParams } from '@/shared/lib/buildParams.ts';
import { usePaginationParams } from '../../lib/usePaginationParams.ts';

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: todoStats } = useGetTodoStatsQuery();
  const toggleSidebar = () => setSidebarOpen((p) => !p);
  const { page, pageSize, setPage } = usePaginationParams(15);
  const params = useTodoParams(page, pageSize, selectedCategory);

  const handleCategorySelect = (category: Category | null) => {
    setSelectedCategory(category);
  };

  const handleAddTodo = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      <main
        className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} h-screen overflow-y-auto p-6 w-full`}
      >
        <TodoFilter />
        <CategoryCards
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
          todoStats={todoStats}
        />
        <TodoList selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} params={params} />

        <FloatingActionButton onClick={handleAddTodo} />
        <AddTodoModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} />
        <LogoutButton />
      </main>
    </div>
  );
};

export default HomePage;
