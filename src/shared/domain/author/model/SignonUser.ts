export interface SignonUser {
  email: string;
  roles: [];
  fullName: string;
  credentialsExpired: boolean;
  token: string;
}
