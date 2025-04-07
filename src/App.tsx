import Header from './components/header.tsx';
import TodoList from './components/todoList.tsx';

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Header />
      <TodoList />
    </main>
  );
};

export default App;
