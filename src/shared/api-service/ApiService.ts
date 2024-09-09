import { api } from 'boot/axios';
import { ApiError } from './model/ApiError';
import ApiErrorHelper from './ApiErrorHelper';
import QueryParams from './model/QueryParams';

class ApiService {
  constructor(protected http = api) {}

  public getParams<R>(url: string, params: QueryParams) {
    return (
      onNormal: { (respond: R): void },
      onError: { (apiError?: ApiError): void }
    ) => {
      this.http
        .get(url, { params })
        .then((responed) => {
          const { data } = responed;
          onNormal(data as R);
        })
        .catch((error) => {
          const apiError = ApiErrorHelper.from(error);
          if (apiError) onError(apiError);
        });
    };
  }

  public get<T>(url: string) {
    return (
      onNormal: { (respond: T): void },
      onError: { (apiError?: ApiError): void }
    ) => {
      this.http
        .get(url)
        .then((responed) => {
          const { data } = responed;
          onNormal(data as T);
        })
        .catch((error) => {
          const apiError = ApiErrorHelper.from(error);
          if (apiError) onError(apiError);
        });
    };
  }

  public post<T, R>(url: string, t: T) {
    return (
      onNormal: { (respond: R): void },
      onError: { (apiError?: ApiError): void }
    ) => {
      this.http
        .post(url, t)
        .then((respond) => {
          const { data } = respond;
          onNormal(data as R);
        })
        .catch((error) => {
          const apiError = ApiErrorHelper.from(error);
          if (apiError) onError(apiError);
        });
    };
  }

  public put<T, R>(url: string, t: T) {
    return (
      onNormal: { (respond: R): void },
      onError: { (apiError?: ApiError): void }
    ) => {
      this.http
        .put(url, t)
        .then((respond) => {
          const { data } = respond;
          onNormal(data as R);
        })
        .catch((error) => {
          const apiError = ApiErrorHelper.from(error);
          if (apiError) onError(apiError);
        });
    };
  }

  public formPost<T, R>(url: string, t: T, files: File[] | null = null) {
    return (
      onNormal: { (respond: R): void },
      onError: { (apiError?: ApiError): void }
    ) => {
      const form = new FormData();
      form.append('json_data', JSON.stringify(t));
      if (files) {
        files.forEach((file) => {
          form.append('files', file);
        });
      }
      this.http
        .post(url, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((respond) => {
          const { data } = respond;
          onNormal(data as R);
        })
        .catch((error) => {
          const apiError = ApiErrorHelper.from(error);
          if (apiError) onError(apiError);
        });
    };
  }
}

export const apiService = new ApiService();
