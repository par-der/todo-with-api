export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  avatar?: string;
  date_joined?: string;
  last_login?: string | null;
}

export type UserInfo = Pick<User, 'id' | 'username' | 'email' | 'first_name' | 'last_name'>;

export interface UserStats {
  totalTodos: number;
  completedTodos: number;
  pendingTodos: number;
  todayTodos: number;
}

export interface CurrentUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  is_staff: boolean;
}
