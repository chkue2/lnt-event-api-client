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
          errorCode: data.code,
          message: data.message,
          status: error.response.status,
        };
      }
      return {
        errorCode: '',
        message: error.message,
        status: 0,
      };
    }
    return {
      errorCode: '',
      message: 'unexpcted error: ',
      status: 0,
    };
  };
}
