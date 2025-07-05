import { ChevronLeft, Plus, Search, Book } from 'lucide-react';

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

export default function Sidebar({ isOpen, toggle }: Props) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 bg-zinc-50 text-gray-700 border-r border-zinc-50
                  transition-all duration-300
                  ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <div className="flex items-center justify-between p-4">
        <button onClick={toggle} className="focus:outline-none" title="Переключить меню">
          <img src="/logo.svg" alt="Аватар" className="w-8 h-8 rounded-full object-cover" />
        </button>

        {isOpen && (
          <button onClick={toggle} className="text-white ml-2 hover:text-gray-300 focus:outline-none" title="Свернуть">
            <ChevronLeft size={20} />
          </button>
        )}
      </div>

      <nav className={`mt-4 px-2 flex flex-col ${isOpen ? '' : 'items-center'} gap-3`}>
        <SidebarButton icon={Plus} label="Новый чат" isOpen={isOpen} />
        <SidebarButton icon={Search} label="Поиск в чатах" isOpen={isOpen} />
        <SidebarButton icon={Book} label="Библиотека" isOpen={isOpen} />
      </nav>
    </aside>
  );
}

type BtnProps = { icon: any; label: string; isOpen: boolean };
function SidebarButton({ icon: Icon, label, isOpen }: BtnProps) {
  return (
    <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition">
      <Icon size={20} />
      {isOpen && <span>{label}</span>}
    </button>
  );
}
