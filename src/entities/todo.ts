export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface TodoResponse {
  completed: boolean;
  title: string;
  description: string;
}

export type TodoQueries = PaginatedResponse<Todo>;
