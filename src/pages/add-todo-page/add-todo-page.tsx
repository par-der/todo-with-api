import { useState } from 'react';
import Sidebar from '@/shared/ui/layout/sidebar/sidebar';
import { AddTodoForm } from '@/features/add-todo';

const AddTodoPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      <main
        className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} h-screen overflow-y-auto p-6 w-full`}
      >
        <h1 className="text-2xl font-bold mb-6">Добавить новую задачу</h1>

        <div className="bg-white rounded shadow p-4 max-w-xl">
          <AddTodoForm />
        </div>
      </main>
    </div>
  );
};

export default AddTodoPage;
