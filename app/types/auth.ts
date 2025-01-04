export interface User {
  id: number;
  email: string;
  username: string;
}

export interface LoginInputs {
  email: string;
  password: string;
}

export interface RegisterInputs extends LoginInputs {
  first_name: string;
  last_name: string;
  re_password: string;
}