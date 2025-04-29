export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface TodoResponse {
  completed: boolean;
  title: string;
  description: string;
}
