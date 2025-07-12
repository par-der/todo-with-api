import { format } from 'date-fns';
import { TodayTodoList } from '@/features/today-todo-list/ui/today-todo-list';

const TodayPage = () => {
  const today = new Date();

  return (
    <section className="max-w-md mx-auto px-4">
      <header className="pt-6 pb-2">
        <h1 className="text-4xl font-extrabold">Today</h1>
        <p className="text-xl text-muted-foreground">{format(today, 'd MMM')}</p>
      </header>

      <TodayTodoList />
    </section>
  );
};

export default TodayPage;
