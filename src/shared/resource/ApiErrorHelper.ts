import axios from 'axios';

export interface ApiError {
  timestamp?: string;
  path?: string;
  error: string;
  status: number;
}

export default class ApiErrorHelper {
  public static from = (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { data } = error.response;
        return {
          timestamp: data.timestamp,
          path: data.path,
          error: data.error,
          status: data.status,
        };
      }
      return {
        error: error.message,
        status: 0,
      };
    }
    return {
      error: 'unexpected error: ',
      status: 0,
    };
  };
}
