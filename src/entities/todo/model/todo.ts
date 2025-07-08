export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
  created_at?: string;
  updated_at?: string;
}

export interface TodosResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Todo[];
}

export type TodoFormData = Pick<Todo, 'title' | 'description' | 'completed'>;
