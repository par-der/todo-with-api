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

export interface TodoList {
  id: number;
  title: string;
  description: string;
  due_date: string;
  remind_at: string | null;
  category: Category;
  completed: boolean;
}

export type Category = 'HEALTH' | 'WORK' | 'MENTAL_HEALTH' | 'STUDY';

export type TodoFormData = Pick<Todo, 'title' | 'description' | 'completed'>;

export type TodoQueries = PaginatedResponse<Todo>;
