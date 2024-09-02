import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { SessionStorage } from 'quasar';
import { ACCESS_TOKEN } from 'src/shared';
import ApiErrorHelper from 'src/shared/resource/ApiErrorHelper';
import NotifyUtil from 'src/shared/resource/NotifyUtil';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

axios.defaults.baseURL = '/lnt-event-api';
axios.defaults.timeout = 60 * 1000;

const api = axios.create({ headers: { 'Content-Type': 'application/json' } });

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const accessToken = SessionStorage.getItem(ACCESS_TOKEN) as string;
  config.headers = config.headers ?? {};
  config.headers.Authorization = !!accessToken ? `Bearer ${accessToken}` : '';
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config } = error;
    const apiError = ApiErrorHelper.from(error);
    if (apiError.error == 'EXPIRED_TOKEN') {
      const authorization = config.headers.Authorization;
      // refresh api call
      const response = api.get('/refresh').catch((e) => {
        NotifyUtil.error(e);
      });
      console.log(response);
      const accessToken = SessionStorage.getItem(ACCESS_TOKEN) as string;
      if (accessToken) {
        const bearer = `Bearer ${accessToken}`;
        if (authorization != bearer) {
          config.headers.Authorization = bearer;
          return api(config);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
