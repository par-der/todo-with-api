import { useState } from 'react';
import Sidebar from '@/shared/ui/layout/sidebar/sidebar';
import { UserForm } from '@/features/user-form/ui/user-form'; // уточни путь
import { useCurrentUserQuery } from '@/features/user-form/api/queries'; // путь, если хуки там

const UserPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((p) => !p);

  const { data: user } = useCurrentUserQuery();

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isOpen={sidebarOpen}
        toggle={toggleSidebar}
        userName={user?.username ?? 'Пользователь'}
        userAvatarUrl={user?.avatar}
      />

      <main
        className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} h-screen overflow-y-auto p-6 w-full`}
      >
        <div className="pt-4">
          <UserForm />
        </div>
      </main>
    </div>
  );
};

export default UserPage;
