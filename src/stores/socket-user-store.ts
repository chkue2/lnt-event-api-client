import { defineStore } from 'pinia';
import { ApiError } from 'src/shared/api-service';
import { apiService } from 'src/shared/api-service/ApiService';
import { Search } from 'src/shared/model';
import {
  SocketUserState,
  DEFAULT_STATE,
  SocketUser,
} from 'src/shared/domain/socket';
import NotifyUtil from 'src/shared/resource/NotifyUtil';

interface SocketUsersResult {
  search: Search;
  total: number;
  list: SocketUser[];
}

export const useSocketUserStore = defineStore('socketUser', {
  state: (): SocketUserState => ({ ...DEFAULT_STATE }),
  getters: {
    getSocketUsers: (state) => state.socketUsers,
    getSocketUserSearch: (state) => state.socketUserSearch,
  },
  actions: {
    searchSocketUsers(searchForm: Search) {
      apiService.getParams<SocketUsersResult>('/socket-user/admin', searchForm)(
        (respond: SocketUsersResult) => {
          this.state = 'none';
          this.socketUserSearch = respond.search;
          this.socketUsers = respond.list;
        },
        (apiError?: ApiError) => {
          this.state = 'error';
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '유저 목록 오류';
          NotifyUtil.error(this.errorMessage);
        }
      );
    },
    searchSocketUsersAdd(searchForm: Search) {
      apiService.getParams<SocketUsersResult>('/socket-user/admin', searchForm)(
        (respond: SocketUsersResult) => {
          this.state = 'none';
          this.socketUserSearch = respond.search;
          this.socketUsers?.push(...respond.list);
        },
        (apiError?: ApiError) => {
          this.state = 'error';
          if (apiError) this.errorMessage = apiError.message;
          else this.errorMessage = '유저 목록 오류';
          NotifyUtil.error(this.errorMessage);
        }
      );
    },
  },
});
