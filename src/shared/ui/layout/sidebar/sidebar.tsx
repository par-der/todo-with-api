import { Calendar, ChevronLeft } from 'lucide-react';
import { NavLink } from 'react-router';
import { NAVIGATION_ROUTES } from '../../../constants/routes.ts';

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

export default function Sidebar({ isOpen, toggle }: Props) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 bg-zinc-50 text-gray-700 border-r border-zinc-50
                  transition-[width] duration-300
                  ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <div className="flex items-center justify-between p-4">
        <button onClick={toggle} className="relative flex items-center focus:outline-none" title="Открыть / закрыть">
          <img src="/logo.svg" alt="Аватар" className="w-8 h-8 rounded-full object-cover" />
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

      <nav className={`mt-4 px-2 flex flex-col gap-3`}>
        {/*<SidebarButton to={NAVIGATION_ROUTES.ADD_TODO} icon={Plus} label="Новый чат" isOpen={isOpen} />*/}
        <SidebarButton to={NAVIGATION_ROUTES.ADD_TODO} icon={Calendar} label="Сегодня" isOpen={isOpen} />
        {/*<SidebarButton icon={Search} label="Поиск в чатах" isOpen={isOpen} />*/}
        {/*<SidebarButton icon={Book} label="Библиотека" isOpen={isOpen} />*/}
      </nav>
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
