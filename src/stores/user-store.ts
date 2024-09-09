import { defineStore } from 'pinia';
import { ApiError } from 'src/shared/api-service';
import { apiService } from 'src/shared/api-service/ApiService';
import {
  UserListItem,
  UserState,
  UserDetailItem,
} from 'src/shared/domain/user';
import { Search } from 'src/shared/model';
import NotifyUtil from 'src/shared/resource/NotifyUtil';

interface UserListResult {
  search: Search;
  total: number;
  list: UserListItem[];
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    state: 'none',
    errorMessage: '',
    active: false,
    userList: [],
    userListSearch: null,
    userDetail: {
      email: '',
      fullName: '',
      insCode: '',
      store: '',
      role: '',
      useFlag: '',
      accountExpired: false,
      lastLogonTime: '',
      createdAt: '',
      updatedAt: '',
    },
  }),
  getters: {
    getUserList: (state) => state.userList,
    getUserListSearch: (state) => state.userListSearch,
    getUserDetail: (state) => state.userDetail,
    getActive: (state) => state.active,
  },
  actions: {
    searchUserList(searchForm: Search) {
      apiService.getParams<UserListResult>('/user/admin', searchForm)(
        (respond: UserListResult) => {
          this.state = 'none';
          this.userList = respond.list;
          this.userListSearch = respond.search;
        },
        (apiError?: ApiError) => {
          this.state = 'error';
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '유저 목록 에러';
          NotifyUtil.error(this.errorMessage);
        }
      );
    },
    searchUserListAdd(searchForm: Search) {
      apiService.getParams<UserListResult>('/user/admin', searchForm)(
        (respond: UserListResult) => {
          this.state = 'none';
          this.userList.push(...respond.list);
          this.userListSearch = respond.search;
        },
        (apiError?: ApiError) => {
          this.state = 'error';
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '유저 목록 에러';
          NotifyUtil.error(this.errorMessage);
        }
      );
    },
    searchUserDetail(email: string) {
      this.active = false;
      apiService.get<UserDetailItem>(`/user/find/${email}`)(
        (respond: UserDetailItem) => {
          this.state = 'none';
          this.userDetail = respond;
          this.active = true;
        },
        (apiError?: ApiError) => {
          this.state = 'error';
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '유저 상세 에러';
          NotifyUtil.error(this.errorMessage);
        }
      );
    },
    updateUserDetail(form: any) {
      apiService.put('/user/admin', form)(
        (respond: any) => {
          NotifyUtil.info('유저 정보 업데이트 완료');
          // 완료 이후 새로고침..?
        },
        (apiError?: ApiError) => {
          this.state = 'error';
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '유저 정보 업데이트 에러';
          NotifyUtil.error(this.errorMessage);
        }
      );
    },
    cleanExpired(email: string) {
      apiService.get(`/user/admin/clean-expired/${email}`)(
        (respond: any) => {
          NotifyUtil.info('장기 미접속 해제 완료');
          // 완료 이후 새로고침..?
        },
        (apiError?: ApiError) => {
          this.state = 'error';
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '장기 미접속 해제 에러';
          NotifyUtil.error(this.errorMessage);
        }
      );
    },
  },
});
