import { useState } from 'react';
import { TodoList } from '@/features/todo-list';
import Sidebar from '@/shared/ui/layout/sidebar/sidebar';
import { LogoutButton } from '@/shared/ui/logout-button.tsx';
import UserAvatar from '@/features/components/user-avatar.tsx';
import { Category } from '@/entities/todo.ts';
import { useGetTodoStatsQuery } from '@/shared/services/queries.ts';
import CategoryCards from '@/features/category-cards/ui/CategoryCards.tsx';

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { data: todoStats } = useGetTodoStatsQuery();
  const toggleSidebar = () => setSidebarOpen((p) => !p);

  const handleCategorySelect = (category: Category | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      <main
        className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} h-screen overflow-y-auto p-6 w-full`}
      >
        <div className="mb-6">
          <UserAvatar />
        </div>
        <CategoryCards
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
          todoStats={todoStats}
        />
        <TodoList selectedCategory={selectedCategory} />
        <div className="mt-8">
          <LogoutButton />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
