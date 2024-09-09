export interface SignupUser {
  email: string;
  password: string;
  passwordConfirm: string;
  store: string;
  insCode: string;
  fullName: string;
}

export interface SignupUserResepond {
  email: string;
  insCode: string;
  store: string;
  fullName: string;
}

export interface SignupCallback {
  (): void;
}
