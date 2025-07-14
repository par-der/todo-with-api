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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      <main
        className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} h-screen overflow-y-auto p-6 w-full`}
      >
        <div className="max-w-2xl mx-auto">
          <header className="flex items-center gap-4 mb-6">
            <Link to={NAVIGATION_ROUTES.TODAY}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Назад
              </Button>
            </Link>
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
