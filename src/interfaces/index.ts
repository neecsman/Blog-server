export enum Currency {
  RUB = 'RUB',
  EUR = 'EUR',
  USD = 'USD',
}

export enum Country {
  Russia = 'Russia',
  Belarus = 'Belarus',
  Kazakhstan = 'Kazakhstan',
  Armenia = 'Armenia',
}

export type Birthday = {
  day: string;
  month: string;
  year: string;
};

export interface RegistrationFormData {
  username: string;
  firstname?: string;
  lastname?: string;
  password: string;
  gender?: 'male' | 'female';
  birthday?: Birthday;
  currency?: Currency;
  country?: Country;
  city?: string;
  email: string;
}

export interface LoginByUsernameFormData {
  username: string;
  password: string;
}
