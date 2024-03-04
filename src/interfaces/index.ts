export interface RegistrationFormData {
  username: string;
  firstname?: string;
  lastname?: string;
  password: string;
  age?: 29;
  currency?: string;
  country?: string;
  city?: string;
  email: string;
}

export interface LoginByUsernameFormData {
  username: string;
  password: string;
}
