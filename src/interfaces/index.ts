export interface RegistrationFormData {
  username: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
}

export interface LoginByUsernameFormData {
  username: string;
  password: string;
}
