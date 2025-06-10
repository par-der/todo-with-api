import Header from './frontend/components/header.tsx';
import TodoList from './frontend/components/todoList.tsx';

const App = () => {
  return (
    <main className="min-h-screen bg-muted text-foreground">
      <Header />
      <TodoList />
    </main>
  );
};

export default App;
