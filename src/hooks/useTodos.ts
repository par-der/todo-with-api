import { useEffect, useState } from 'react';
import { Todo } from '../entities/todo.ts';
import { getTodos } from '../services/api.ts';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]); //список постов использовал generic
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : error;
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { todos, error, loading };
}
