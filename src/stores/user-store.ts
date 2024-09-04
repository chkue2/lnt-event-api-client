import { defineStore } from 'pinia';
import { ApiError } from 'src/shared/api-service';
import { apiService } from 'src/shared/api-service/ApiService';
import { UserListItem, UserState } from 'src/shared/domain/user';
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
  }),
  getters: {
    getUserList: (state) => state.userList,
    getUserListSearch: (state) => state.userListSearch,
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
  },
});
