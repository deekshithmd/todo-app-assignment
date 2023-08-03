export interface TodoType {
  id: string;
  todo: string;
  completed: boolean;
  important: boolean;
}

export interface FilterType {
  id: number;
  name: string;
  value: string;
}

export interface LoginDataType {
  username: string;
  password: string;
}

export interface SignupDataType {
  username: string;
  password: string;
  confirm: string;
}
