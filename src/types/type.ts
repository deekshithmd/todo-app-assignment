export interface TodoType {
  id: string;
  todo: string;
  completed: boolean;
  important: boolean;
}

export interface FilterType {
  id?: number;
  name?: string;
  value?: string;
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

export interface TextType {
  fontSize?: string;
  fontWeight?: string;
}

export interface IconType {
  width?: number;
  height?: number;
}

export interface ButtonType {
  width?: string;
  padding?: string;
  borderRadius?: string;
  border?: string;
  fontSize?: string;
  alignItems?: string;
  justifyContent?: string;
  hoverColor?: string;
  hoverTextColor?: string;
}

export interface FilterItemType {
  color?: string;
  background?: string;
}
