export interface Login {
  password: string;
  username: string;
}

export interface Register {
  username: string;
  password: string;
  email?: string;
}

export type LogoutResponse = void;
