export interface ApiError {
  message: string;
  status: number;
  path?: string;
}
