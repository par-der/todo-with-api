export interface PaginatedResponse<T> {
  count: number;
  page_size: number;
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

export interface TodosResponse {
  completed: boolean;
  title: string;
  description: string;
}

// export interface TodosResponse {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: Todo[];
// }

export type TodoFormData = Pick<Todo, 'title' | 'description' | 'completed'>;

export type TodoQueries = PaginatedResponse<Todo>;
