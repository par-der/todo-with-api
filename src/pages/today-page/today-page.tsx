import { format } from 'date-fns';
import { TodayTodoList } from '@/features/today-todo-list/ui/today-todo-list';
import Sidebar from '@/shared/ui/layout/sidebar/sidebar.tsx';
import { useState } from 'react';

const TodayPage = () => {
  const today = new Date();
  const toggleSidebar = () => setSidebarOpen((p) => !p);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Сегодня</h1>
            <p className="text-xl text-gray-600 mt-1">{format(today, 'd MMM')}</p>
          </div>

          <div className="bg-white overflow-hidden">
            <TodayTodoList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TodayPage;
