import axios from 'axios';
import { ApiError } from './model/ApiError';
import { useAuthorStore } from 'src/stores/auth-store';

export default class ApiErrorHelper {
  public static invalidSession = () => {
    const authorStore = useAuthorStore();
    authorStore.invalidSession();
  };
  public static from = (error: unknown): ApiError | null => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { data } = error.response;
        if (error.response.status === 403) {
          ApiErrorHelper.invalidSession();
          return null;
        }
        return {
          message: data.error,
          status: data.status,
          path: data.path,
        };
      }
      return {
        message: error.message,
        status: 0,
      };
    }
    return {
      message: 'unexpcted error: ',
      status: 0,
    };
  };
}
