import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '@/shared/ui/layout/sidebar/sidebar';
import { AddTodoForm } from '@/features/add-todo';
import { Button } from '@/shared/ui/button';
import { NAVIGATION_ROUTES } from '@/shared/constants/routes';

const AddTodoPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-16'
        } h-screen overflow-y-auto w-full px-4 sm:px-6 md:px-8 py-6`}
      >
        <div className="mx-auto w-full max-w-xl md:max-w-2xl">
          <header className="flex items-center gap-4 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Добавить новую задачу</h1>
          </header>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <AddTodoForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddTodoPage;
