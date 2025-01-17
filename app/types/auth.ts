export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
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

export interface resetInputEmail {
  email: string;
}

export interface resetInputsPassword {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
}

export interface activation {
  uid: string;
  token: string;
}