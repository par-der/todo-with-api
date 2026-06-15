import { useState } from 'react';
import Sidebar from '@/shared/ui/layout/sidebar/sidebar';
import { UserForm } from '@/features/user-form/ui/user-form';
import { LogoutButton } from '@/shared/ui/logout-button.tsx';

const UserPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((p) => !p);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      <main
        className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} h-screen overflow-y-auto p-6 w-full`}
      >
        <div className="mx-auto w-full max-w-3xl space-y-6 pt-4">
          <UserForm />

          <section className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold">Сессия</h2>
                <p className="text-sm text-muted-foreground">Выйти из текущего аккаунта на этом устройстве.</p>
              </div>
              <LogoutButton className="w-full sm:w-auto" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserPage;
