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
