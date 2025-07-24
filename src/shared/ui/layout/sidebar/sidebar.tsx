import { Calendar, ChevronLeft, Clock11, Files, Search, Shield, User, UserIcon } from 'lucide-react';
import { NavLink } from 'react-router';
import { NAVIGATION_ROUTES } from '../../../constants/routes.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar.tsx';
import { useCurrentUserQuery } from '@/features/user-form/api/queries.ts';

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

export default function Sidebar({ isOpen, toggle }: Props) {
  const { data: user, isLoading } = useCurrentUserQuery();
  const displayName =
    user?.first_name || user?.last_name
      ? [user?.first_name, user?.last_name].filter(Boolean).join(' ')
      : (user?.username ?? user?.email ?? 'Гость');

  const avatarUrl = user?.avatar ?? '/logo.svg';

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 bg-zinc-50 text-gray-700 border-r border-zinc-50
                  transition-[width] duration-300 flex flex-col
                  ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <div className="flex items-center justify-between p-4">
        <button onClick={toggle} className="relative flex items-center focus:outline-none" title="Открыть / закрыть">
          <img src="/logo1.svg" alt="Аватар" className="w-8 h-8 rounded-full object-cover" />
        </button>
        <div
          className={`
            relative transition-all duration-300
            ${isOpen ? 'w-6 h-6' : 'w-0 h-0'}
          `}
        >
          <button
            onClick={toggle}
            className={`
              absolute top-0 right-0 transition-all duration-300
              ${isOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-2 pointer-events-none'}
            `}
            title="Свернуть"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
      </div>

      <nav className="mt-4 px-2 flex flex-col gap-3 flex-1">
        {user?.is_staff && <SidebarButton to={NAVIGATION_ROUTES.ADMIN} icon={Shield} label="Админка" isOpen={isOpen} />}{' '}
        <SidebarButton to={NAVIGATION_ROUTES.HOME} icon={Files} label="Главная" isOpen={isOpen} />
        {/*<SidebarButton to={NAVIGATION_ROUTES.ADD_TODO} icon={Search} label="Поиск" isOpen={isOpen} />*/}
        <SidebarButton to={NAVIGATION_ROUTES.TODAY} icon={Clock11} label="Сегодня" isOpen={isOpen} />
      </nav>

      <div className="mt-auto p-2">
        <NavLink
          to={NAVIGATION_ROUTES.USER}
          className="flex items-center p-2 rounded hover:bg-zinc-100 transition-colors"
        >
          <div className="w-6 flex justify-center">
            <Avatar className="h-6 w-6">
              <AvatarImage src={avatarUrl} alt="Avatar" />
              <AvatarFallback>
                <UserIcon size={16} />
              </AvatarFallback>
            </Avatar>
          </div>
          <span
            className={`
              overflow-hidden whitespace-nowrap
              transition-[max-width,opacity,margin-left] duration-300
              ${isOpen ? 'ml-3 max-w-xs opacity-100' : 'ml-0 max-w-0 opacity-0'}
            `}
          >
            {isLoading ? '…' : displayName}
          </span>
        </NavLink>
      </div>
    </aside>
  );
}

type BtnProps = { to: string; icon: any; label: string; isOpen: boolean };
function SidebarButton({ to, icon: Icon, label, isOpen }: BtnProps) {
  return (
    <NavLink to={to} className="flex items-center p-2 rounded hover:bg-zinc-100 transition-colors">
      <div className="w-6 flex justify-center">
        <Icon size={24} />
      </div>
      <span
        className={`
          overflow-hidden whitespace-nowrap
          transition-[max-width,opacity,margin-left] duration-300
          ${isOpen ? 'ml-3 max-w-xs opacity-100' : 'ml-0 max-w-0 opacity-0'}
        `}
      >
        {label}
      </span>
    </NavLink>
  );
}
