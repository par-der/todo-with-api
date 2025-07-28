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
  due_date: string;
  remind_at: string | null;
  category: Category;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TodosResponse {
  completed: boolean;
  title: string;
  description: string;
}

export interface TodoList extends Todo {
  user: string;
}

export interface TodoFormData {
  title: string;
  description: string;
  due_date: string;
  remind_at?: string;
  category: Category;
  completed?: boolean;
  user_id?: number;
}

export interface TodoUpdateData extends Partial<TodoFormData> {
  id: number;
}

export type Category = 'HEALTH' | 'WORK' | 'MENTAL_HEALTH' | 'STUDY';

export type TodoQueries = PaginatedResponse<Todo>;

export const CATEGORY_LABELS: Record<Category, string> = {
  HEALTH: 'Здоровье',
  WORK: 'Работа',
  MENTAL_HEALTH: 'Ментальное здоровье',
  STUDY: 'Учеба',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  HEALTH: 'bg-blue-100 text-blue-600 border-blue-200',
  WORK: 'bg-green-100 text-green-600 border-green-200',
  MENTAL_HEALTH: 'bg-purple-100 text-purple-600 border-purple-200',
  STUDY: 'bg-orange-100 text-orange-600 border-orange-200',
};

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  today: number;
  by_category: Record<string, number>;
}

export interface TodoListPublicProps {
  todos: Todo[];
  total: number;
  pageCount: number;
  onPageChange: (p: number) => void;
}

export interface TodoAdmin {
  todos: Todo[];
  user: number;
  user_username: string;
  user_email: string;
  user_is_staff: boolean;
}

export interface AdminTodo extends Todo {
  user_username: string;
  user_email: string;
  user_is_staff: boolean;
}

export interface PaginatedAdminTodos extends PaginatedResponse<AdminTodo> {}
