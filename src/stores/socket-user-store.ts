import { defineStore } from 'pinia';
import { ApiError } from 'src/shared/api-service';
import { apiService } from 'src/shared/api-service/ApiService';
import {
  SocketUserState,
  DEFAULT_STATE,
  SearchSocketUserState,
  SocketUser,
} from 'src/shared/domain/socket';
import NotifyUtil from 'src/shared/resource/NotifyUtil';

interface SocketUsersResult {
  search: SearchSocketUserState;
  total: number;
  list: SocketUser[];
}

export const useSocketUserStore = defineStore('socketUser', {
  state: (): SocketUserState => ({ ...DEFAULT_STATE }),
  getters: {
    getSocketUsers: (state) => state.socketUsers,
  },
  actions: {
    searchSocketUsers(searchForm: SearchSocketUserState) {
      apiService.getParams<SocketUsersResult>('/socket-user/admin', searchForm)(
        (respond: SocketUsersResult) => {
          this.state = 'none';
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
  },
});
