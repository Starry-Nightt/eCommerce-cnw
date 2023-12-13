export interface RegisterDetail {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone?: string;
}

export interface LoginDetail {
  email: string;
  password: string;
}
