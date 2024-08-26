import { SigninUser } from 'src/shared/domain/author/model/SigninUser';
import {
  SignupUser,
  SignupUserResepond,
  SignupCallback,
} from 'src/shared/domain/author/model/SignupUser';
import { defineStore } from 'pinia';
import { ApiError } from 'src/shared/api-service';
import { apiService } from 'src/shared/api-service/ApiService';
import {
  AuthorState,
  DEFAULT_STATE,
  SignonUser,
} from 'src/shared/domain/author';
import NotifyUtil from 'src/shared/resource/NotifyUtil';
import { useWebview } from 'src/shared/resource/useWebview';

export const useAuthorStore = defineStore('Author', {
  state: (): AuthorState => ({ ...DEFAULT_STATE }),
  getters: {
    getState: (state) => state.state,
    getSignonUser: (state) => {
      return state.signonUser;
    },
    getErrorMessage: (state) => state.errorMessage,
    inAuthorize: () => true,
    inActive: (state) => state.active,
  },
  actions: {
    setActive(active: boolean) {
      this.active = active;
    },
    invalidSession() {
      if (this.signonUser) {
        NotifyUtil.error('세션이 종료되어 로그인 페이지로 이동합니다.');
        this.signonUser = null;
        const { appResize } = useWebview();
        appResize('default');
        this.router.push('/signin');
      }
    },
    login(signUser: SigninUser) {
      this.state = 'loading';
      apiService.post<SigninUser, SignonUser>('signin', signUser)(
        (respond: SignonUser) => {
          this.signonUser = respond;
          this.state = 'none';
          const { appResize } = useWebview();
          appResize('max');
          this.router.push('/home');
        },
        (apiError?: ApiError) => {
          this.state = 'error';
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '접속오류';
        }
      );
    },
    signup(signupUser: SignupUser, callback: SignupCallback) {
      this.state = 'loading';
      apiService.post<SignupUser, SignupUserResepond>('signup', signupUser)(
        () => {
          alert('관리자 승인 후 로그인 가능합니다.');
          callback();
        },
        (apiError?: ApiError) => {
          this.state = 'error';
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '가입오류';
        }
      );
    },
  },
});
