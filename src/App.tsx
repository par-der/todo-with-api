import Header from './components/header.tsx';
import Feature from './components/features.tsx';

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Header />
      <Feature />
    </main>
  );
};

export default App;
